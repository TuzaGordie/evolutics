import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Observable, of, throwError } from 'rxjs';
import { map, tap, catchError, mergeMap } from 'rxjs/operators';
import { QuotationService } from 'src/app/Life/services/quotation-service.service';
import {
  ICurrency,
  IPremiumPaymentMethod,
  IDiscountCode,
  IPremiumFrequency,
  IBenefitPaymentFreq,
  ITargetContributionFreq,
  IClientDetails,
  ICoversDetails,
  CoverCode,
} from 'src/app/Life/services/quotation.interface';
import { BuildingComponent } from '../../modals/covers/building/building.component';
import { DefenseRecourseComponent } from '../../modals/covers/defense-recourse/defense-recourse.component';
import { LifeInsuranceComponent } from '../../modals/covers/life-insurance/life-insurance.component';
import { MotorAccessoriesComponent } from '../../modals/covers/motor-accessories/motor-accessories.component';
import { MotorThirdPartyComponent } from '../../modals/covers/motor-third-party/motor-third-party.component';
import { PropertyContentComponent } from '../../modals/covers/property-content/property-content.component';
import { MarineCargoComponent } from '../../modals/covers/marine-cargo/marine-cargo.component';
import { MarineHullComponent } from '../../modals/covers/marine-hull/marine-hull.component';
import { SavingsComponent } from '../../modals/covers/savings/savings.component';
import { BondComponent } from '../../modals/covers/bond/bond.component';
import { LifeRiskComponent } from '../../modals/covers/life-risk/life-risk.component';
import { LifeCreditComponent } from '../../modals/covers/life-credit/life-credit.component';
import { EndowmentComponent } from '../../modals/covers/endowment/endowment.component';
import { LifeAnnuityComponent } from '../../modals/covers/life-annuity/life-annuity.component';
import { HttpErrorResponse } from '@angular/common/http';
import { IndividualSavingsComponent } from '../../modals/covers/individual-savings/individual-savings.component';
import { AnnuitiesCertainComponent } from '../../modals/covers/annuities-certain/annuities-certain.component';
import { SimpleLifeComponent } from '../../modals/covers/simple-life/simple-life.component';
import { FindQuotationService } from '../../../service/find-quotation.service';
import { DeferredLifeAnnuityComponent } from '../../modals/covers/deferred-life-annuity/deferred-life-annuity.component';

declare let $;

@Component({
  selector: 'q-individual-cover-details',
  templateUrl: './cover-details.component.html',
  styleUrls: ['./cover-details.component.scss'],
})
export class CoverDetailsComponent implements OnInit {
  @ViewChild('bl_modal', { static: true }) bl_modal: BuildingComponent;
  @ViewChild('dr_modal', { static: true }) dr_modal: DefenseRecourseComponent;
  @ViewChild('lil_modal', { static: true }) lil_modal: LifeInsuranceComponent;
  @ViewChild('acc_modal', { static: true })
  acc_modal: MotorAccessoriesComponent;
  @ViewChild('ac_modal', { static: true }) ac_modal: AnnuitiesCertainComponent;
  @ViewChild('tp_modal', { static: true }) tp_modal: MotorThirdPartyComponent;
  @ViewChild('sav_modal', { static: true }) sav_modal: SavingsComponent;
  @ViewChild('pc_modal', { static: true }) pc_modal: PropertyContentComponent;
  @ViewChild('mc_modal', { static: true }) mc_modal: MarineCargoComponent;
  @ViewChild('mh_modal', { static: true }) mh_modal: MarineHullComponent;
  @ViewChild('bond_modal', { static: true }) bond_modal: BondComponent;
  @ViewChild('lir_modal', { static: true }) lir_modal: LifeRiskComponent;
  @ViewChild('lic_modal', { static: true }) lic_modal: LifeCreditComponent;
  @ViewChild('end_modal', { static: true }) end_modal: EndowmentComponent;
  @ViewChild('lia_modal', { static: true }) lia_modal: LifeAnnuityComponent;
  @ViewChild('is_modal', { static: true }) is_modal: IndividualSavingsComponent;
  @ViewChild('sl_modal', { static: true }) sl_modal: SimpleLifeComponent;
  @ViewChild('dlia_modal', { static: true })
  dlia_modal: DeferredLifeAnnuityComponent;

  @Input() policyTerm: string = '';
  @Input() premiumTerm: string = '';

  quoteNo: any = null;
  modal: any[] = [];
  selected: boolean[] = [];
  clientNo: string;
  assuredRelToOwner$: string[] = [];
  currencyOptions$: Observable<ICurrency[]>;
  premiumPaymentMethodOptions$: Observable<IPremiumPaymentMethod[]>;
  discountCodeOptions$: Observable<IDiscountCode[]> =
    this.quotationService.getDiscountCodeOptions();
  premiumPaymentFreqOptions$: Observable<IPremiumFrequency[]>;
  benefitPaymentFreqOptions$: Observable<IBenefitPaymentFreq[]> =
    this.quotationService.getBenefitPaymentFreqOptions();
  targetContributionFreqOptions$: Observable<ITargetContributionFreq[]> =
    this.quotationService.getTargetContributionFreqOptions();
  redgNoFromCheck: string;
  redgNo$: string;
  client: any[] = [];
  purchaseValue: any = { purValue: '', mvClient: '', mvAdj: '' };
  checked: boolean[];
  isDependent: boolean[] = [];
  frq: any[] = [];
  frqDesc: any[] = [];
  freq: Set<any> = new Set();
  defaultPremFreq: any;
  allowedPolicyTermYears: any[] = [];
  allowedPolicyTermMonths: any[] = [];
  allowedPremPayTermMonths: any[] = [];
  allowedPremPayTermYears: any[] = [];
  coverDisabled: boolean[] = [];
  coverCodes: any[] = [];

  coverDetailsForm: FormGroup;
  covers: FormArray | any = { controls: '' };
  coverScreens: ICoversDetails[];
  newCoverScreens: ICoversDetails[] = [];
  complete: any[] = [];
  termList: boolean = false;
  termDisabled: boolean = false;
  default: any;
  defaultPremTerm: any;
  defaultPremMonths: any;

  product: {
    code: string;
    description: string;
  };

  paymentMethod: any;
  systemSelect: string = 'motor';
  isRp1Check: boolean = false;
  get formValue() {
    return this.coverDetailsForm.value;
  }

  constructor(
    private quotationService: QuotationService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private fQS: FindQuotationService
  ) {}
  async getCoverScreen(code): Promise<ICoversDetails[]> {
    let result;
    result = await this.quotationService.getCoverScreens(code).toPromise();
    return result;
  }
  async stuff(code) {
    this.coverScreens = await this.getCoverScreen(code);
  }

  async ngOnInit(): Promise<void> {
    this.clientNo = this.route.snapshot.queryParams['clientNo'];

    const queryParams = this.route.snapshot.queryParamMap;

    this.product = {
      code: queryParams.get('pcd'),
      description: queryParams.get('pdsc'),
    };

    this.coverDetailsForm = this.fb.group({
      covers: this.fb.array([]),
    });
    const quoteNo = queryParams.get('quoteNo');
    await this.createItem().then(() => {
      if (quoteNo) this.getQuoteInfo(quoteNo);
    });
  }

  async getQuoteInfo(quoteNo: string) {
    const covers = await this.fQS.getQuoteCover(quoteNo).toPromise();
    console.log('covers', covers);

    covers.forEach((cover) => {
      let index = this.newCoverScreens.findIndex(
        ({ info }) => (info.coverCode || info.riderCoverCode) === cover.code
      );
      this.selected[index] = true;
      $(`#checkbox_${index}`).prop('checked', true);
      this.modal[index] = {
        ...cover,
        basis: cover.premiumToBen ? 'PB' : 'BP',
        assured: cover.aggSumAssured,
        limit: cover.aggSumAssured,
        target_amount: cover.aggSumAssured,
        target_frequency: cover.coverPremFreq,
        benPaymentFreq: cover.benPayFreq,
        loan_rate: cover.loanIntRate,
        loan_freq: cover.loanRepayFreq,
        escalation_before: cover.saEscalRate,
      };
    });
  }

  createItems() {
    return this.fb.group({
      assuredNo: new FormControl(this.clientNo, Validators.required),
      assuredName: new FormControl(null, Validators.required),
      assuredRel: new FormControl('Self', Validators.required),
    });
  }

  saveStuff(state: string) {
    $(`#checkbox_${state}`).prop('checked', true);
  }

  async createItem(): Promise<void> {
    await this.stuff(this.product.code).then(() => {
      let cover = this.coverDetailsForm.get('covers') as FormArray;
      const queryParams = this.route.snapshot.queryParamMap;
      let i = 0;

      this.coverScreens.forEach((cov) => {
        let loop = cov.info.maxNo ? Number(cov.info.maxNo) : 1;
        for (const key of [...Array(loop).keys()]) {
          if (cov.info.base == '1') {
            this.newCoverScreens.splice(0, 0, cov);
            cover.push(this.createItems());
            this.selected.splice(0, 0, true);
            this.coverDisabled.splice(0, 0, true);
            this.quotationService
              .getCoverCode(cov)
              .then((data) => this.coverCodes.splice(0, 0, data.code));
            this.modal.push(null);
            this.isDependent.splice(0, 0, false);
            this.complete.splice(0, 0, true);
            this.quotationService
              .getClientDetails(this.clientNo)
              .subscribe((data) => {
                const value = data ? data : { fullName: '' };
                this.client.splice(0, 0, value);
              });
            this.assuredRelToOwner$.splice(0, 0, 'Self');
          } else {
            this.newCoverScreens.push(cov);
            cover.push(this.createItems());
            if (cov.info.base || cov.info.mandatory) {
              this.selected.push(true);
              this.coverDisabled.push(true);
            } else {
              this.selected.push(false);
              this.coverDisabled.push(false);
            }
            this.modal.push(null);
            this.quotationService
              .getCoverCode(cov)
              .then((data) =>
                this.coverCodes.splice(
                  this.newCoverScreens.indexOf(cov),
                  0,
                  data.code
                )
              );
            this.isDependent.push(false);
            this.complete.push(true);
            this.quotationService
              .getClientDetails(this.clientNo)
              .subscribe((data) => {
                const value = data ? data : { fullName: '' };
                this.client.push(value);
              });
            this.assuredRelToOwner$.push('Self');
          }
        }

        if (cov.info.base == '1' || cov.info.mandatory == true) {
          this.quotationService
            .getDependentCovers(cov.info.coverCode)
            .subscribe(
              (data) => {
                i = 0;
                let supindex = this.newCoverScreens.indexOf(cov);

                data.forEach((element, index) => {
                  let loop = element.info.maxNo
                    ? Number(element.info.maxNo)
                    : 1;
                  for (const key of [...Array(loop).keys()]) {
                    i = key + 1;
                    this.newCoverScreens.splice(
                      supindex + index + i,
                      0,
                      element
                    );
                    this.isDependent.splice(supindex + index + i, 0, true);
                    this.coverScreens.splice(supindex + index + i, 0, element);
                    if (
                      (element.info.base || element.info.mandatory) &&
                      key == 0
                    ) {
                      this.selected.splice(supindex + index + i, 0, true);
                      this.coverDisabled.splice(supindex + index + i, 0, true);
                    } else if (element.info.base || element.info.mandatory) {
                      this.selected.splice(supindex + index + i, 0, false);
                      this.coverDisabled.splice(supindex + index + i, 0, false);
                    } else {
                      this.selected.splice(supindex + index + i, 0, false);
                      this.coverDisabled.splice(supindex + index + 1, 0, false);
                    }
                    this.quotationService
                      .getCoverCode(element)
                      .then((data) =>
                        this.coverCodes.splice(
                          supindex + index + i,
                          0,
                          data.code
                        )
                      );
                    this.modal.push(null);
                    this.complete.push(true);
                    this.quotationService
                      .getClientDetails(this.clientNo)
                      .subscribe((data) => {
                        const value = data ? data : { fullName: '' };
                        this.client.push(value);
                      });
                    cover.push(this.createItems());

                    this.assuredRelToOwner$.push('Self');
                  }
                });
              },
              (err) => console.log(err)
            );
        }
      });
    });
  }

  setSelected(i) {
    this.selected[i] = this.selected[i] ? false : true;
    let cov = this.newCoverScreens[i];
    let cover = this.coverDetailsForm.get('covers') as FormArray;
    if (this.selected[i]) {
      if (cov.info.coverCode) {
        this.quotationService.getDependentCovers(cov.info.coverCode).subscribe(
          (data) => {
            let supindex = this.coverScreens.indexOf(cov);
            data.forEach((element, index) => {
              this.newCoverScreens.splice(supindex + index + 1, 0, element);
              this.coverScreens.push(element);
              if (element.info.base || element.info.mandatory) {
                this.selected.splice(supindex + index + 1, 0, true);
              } else this.selected.splice(supindex + index + 1, 0, false);
              this.modal.push(null);
              this.complete.push(true);
              this.quotationService
                .getClientDetails(this.clientNo)
                .subscribe((data) => {
                  const value = data ? data : { fullName: '' };
                  this.client.push(value);
                });
              cover.push(this.createItems());

              this.assuredRelToOwner$.splice(supindex + index + 1, 0, 'Self');
            });
          },
          (err) => console.log(err)
        );
      }
    } else {
      if (cov.info.coverCode) {
        let supindex = this.newCoverScreens.indexOf(cov);
        this.quotationService.getDependentCovers(cov.info.coverCode).subscribe(
          (data) => {
            this.newCoverScreens.splice(supindex + 1, data.length);
            this.selected.splice(supindex + 1, data.length);
            this.modal.splice(supindex + 1, data.length);
            this.complete.splice(supindex + 1, data.length);
            this.client.splice(supindex + 1, data.length);
            this.assuredRelToOwner$.splice(supindex + 1, data.length);
            data.forEach((element, index) => {
              // let sindex = this.newCoverScreens.indexOf(element)

              // this.newCoverScreens.splice(supindex, 1)
              // this.coverScreens.push(element)
              // this.selected.splice(sindex, 1)
              // this.modal.splice(sindex, 1)
              // this.complete.splice(sindex, 1)
              // this.client.splice(sindex, 1)
              cover.removeAt(supindex + 1);

              // this.assuredRelToOwner$.splice(sindex, 1)
            });
          },
          (err) => console.log(err)
        );
      }
    }
  }

  findAssured(i, value) {
    this.quotationService.getClientDetails(value).subscribe((data) => {
      this.client[i] = data ? data : { fullName: '' };
      const covers = this.coverDetailsForm.get('covers');
      covers.value.forEach((element, index) => {
        if (index == i) {
          element.assuredName = this.client[i].fullName;
        }
      });
    });
    if (value == this.clientNo) {
      this.assuredRelToOwner$[i] = 'Self';
    } else {
      this.quotationService
        .getAssuredRelToOwner(this.clientNo, value)
        .subscribe((data) => {
          this.assuredRelToOwner$[i] = data ? data.relationship : '';
        });
    }
  }

  validateAssuredId(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    //return null
    return this.quotationService.getClientDetails(control?.value).pipe(
      tap((data) => {
        this.clientNo = data.clientNo;
      }),
      map((data) => {
        return data ? null : { valid: false };
      }),
      catchError(() => {
        return of({ valid: false });
      })
    );
  }

  async showCoverScreen(e: Event, cover, i: number) {
    e.preventDefault();
    console.log(this.modal[i]);
    const coverCode = (await this.quotationService.getCoverCode(cover)).code;
    let description;
    this.bl_modal.complete = null;
    this.dr_modal.complete = null;
    this.lil_modal.complete = null;
    this.acc_modal.complete = null;
    this.tp_modal.complete = null;
    this.pc_modal.complete = null;
    this.sav_modal.complete = null;
    this.mh_modal.complete = null;
    this.lir_modal.complete = null;
    this.lia_modal.complete = null;
    this.lic_modal.complete = null;
    this.mc_modal.complete = null;
    this.bond_modal.complete = null;
    this.end_modal.complete = null;
    let cov =
      this.newCoverScreens[i].info.coverCode ||
      this.newCoverScreens[i].info.riderCoverCode;
    switch (coverCode) {
      case 'BL':
        //this.modal[i] = this.bl_modal.buildingForm.
        this.bl_modal.buildingForm.reset();
        this.bl_modal.code = coverCode;
        this.quotationService
          .getCoverScreenDescriptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            description = data.description;
            this.bl_modal.description = description;
          });
        if (this.modal[i]) this.bl_modal.buildingForm.patchValue(this.modal[i]);
        this.bl_modal.show();
        this.modal[i] = this.bl_modal.buildingForm.value;
        this.bl_modal.complete = i;
        this.bl_modal.buildingForm.valueChanges.subscribe((val) => {
          if (i == this.bl_modal.complete) {
            this.modal[i] = val;
          }
        });
        break;
      case 'BO':
        //this.modal[i] = this.bl_modal.buildingForm.value
        this.quotationService
          .getCoverScreenDescriptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            description = data.description;
            this.bond_modal.description = description;
          });
        if (this.modal[i]) this.bond_modal.bondForm.patchValue(this.modal[i]);
        this.bond_modal.show();
        this.modal[i] = this.bond_modal.bondForm.value;
        this.bond_modal.complete = i;
        this.bond_modal.bondForm.valueChanges.subscribe((val) => {
          if (i == this.bond_modal.complete) {
            this.modal[i] = val;
          }
        });
        break;
      case 'DR':
        //this.modal[i] = this.dr_modal.defenseForm.value
        this.quotationService
          .getCoverScreenDescriptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            description = data.description;
            this.dr_modal.description = description;
          });
        if (this.modal[i]) this.dr_modal.defenseForm.patchValue(this.modal[i]);
        this.dr_modal.show();
        this.dr_modal.complete = i;
        this.dr_modal.defenseForm.valueChanges.subscribe((val) => {
          if (i == this.dr_modal.complete) {
            this.modal[i] = val;
          }
        });
        break;
      case 'LIL':
        //this.modal[i] = this.lil_modal.lifeForm.value
        this.quotationService
          .getCoverScreenDescriptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            description = data.description;
            this.lil_modal.description = description;
          });
        if (this.newCoverScreens[i].info.blankSumAssured) {
          this.lil_modal.assured_disabled = true;
        }
        this.quotationService
          .getSumAssured(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode,
            this.coverDetailsForm.value.assetNo
          )
          .subscribe((data) => {
            if (data.length < 2) {
              let result = data[0];
              if (result.minSumAssured || result.maxSumAssured) {
                this.lil_modal.assured_min = result.minSumAssured;
                this.lil_modal.assured_max = result.maxSumAssured;
                this.lil_modal.assured = '';
              } else {
                this.lil_modal.assured = result || result.AllowedSumAssured;
              }
            } else {
            }
          });
        if (this.modal[i]) this.lil_modal.lifeForm.patchValue(this.modal[i]);
        this.lil_modal.show();
        this.lil_modal.complete = i;
        this.lil_modal.lifeForm.valueChanges.subscribe((val) => {
          if (i == this.lil_modal.complete) {
            this.modal[i] = val;
          }
        });
        break;
      case 'AC':
        //this.modal[i] = this.acc_modal.accessoriesForm.value
        this.quotationService
          .getCoverScreenDescriptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            description = data.description;
            this.ac_modal.description = description;
          });

        this.quotationService
          .getEscalationValue(cov)
          .subscribe(
            (data) => (this.ac_modal.annuity_escalation_value_options = data)
          );
        this.quotationService
          .getAnnuityFrequency(cov)
          .subscribe(
            (data) => (this.ac_modal.annuity_frequency_options = data)
          );
        this.quotationService.getAnnuityTerm(cov).subscribe((data) => {
          // data = data.filter((item) => item.annuityGuarPeriod);
          this.ac_modal.annuity_term_options = [...new Set(data)];
        });
        if (this.modal[i]) this.ac_modal.lifeForm.patchValue(this.modal[i]);
        this.ac_modal.show();
        this.ac_modal.complete = i;
        this.ac_modal.lifeForm.valueChanges.subscribe((val) => {
          if (i == this.ac_modal.complete) {
            this.modal[i] = val;
          }
        });
        break;
      case 'TP':
        this.tp_modal.thirdPartyForm.reset();
        this.tp_modal.thirdPartyForm.patchValue({
          value: this.coverDetailsForm.get('marketValueBySystem').value,
        });
        this.tp_modal.mvAdj = this.coverDetailsForm.get(
          'marketValueBySystem'
        ).value;
        this.quotationService
          .getCoverScreenDescriptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            description = data.description;
            this.tp_modal.description = description;
          });
        this.tp_modal.deductible_display = '';
        this.tp_modal.deductible_min = null;
        this.tp_modal.deductible_max = null;
        this.tp_modal.excess_max = null;
        this.tp_modal.excess_min = null;
        this.tp_modal.excess_display = null;
        this.tp_modal.assured_min = null;
        this.tp_modal.assured_max = null;
        this.tp_modal.assured = null;
        //this.modal[i] = this.tp_modal.thirdPartyForm.value
        this.tp_modal.code = coverCode;
        this.quotationService
          .getSumAssured(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode,
            this.coverDetailsForm.value.assetNo
          )
          .subscribe((data) => {
            if (
              !Array.isArray(data) ||
              (Array.isArray(data) && data.length < 2)
            ) {
              let result = Array.isArray(data) ? data[0] : data;
              this.tp_modal.assured_value_disabled = false;
              if (result?.minSumAssured || result?.maxSumAssured) {
                this.tp_modal.assured_min = result?.minSumAssured;
                this.tp_modal.assured_max = result?.maxSumAssured;
                this.tp_modal.assured = '';
              } else {
                this.tp_modal.thirdPartyForm.patchValue({
                  limit: result || result?.AllowedSumAssured,
                });
                this.tp_modal.assured = result || result?.AllowedSumAssured;
              }
            } else if (Array.isArray(data) && data.length >= 2) {
              this.tp_modal.assured_value_disabled = true;
              this.tp_modal.assured_options = data;
            }
          });
        if (this.modal[i])
          this.tp_modal.thirdPartyForm.patchValue(this.modal[i]);
        this.tp_modal.show();
        this.tp_modal.complete = i;
        this.tp_modal.thirdPartyForm.valueChanges.subscribe((val) => {
          if (i == this.tp_modal.complete) {
            this.modal[i] = val;
          }
        });
        break;
      case 'PC':
        this.quotationService
          .getCoverScreenDescriptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            description = data.description;
            this.pc_modal.description = description;
          });
        //this.modal[i] = this.pc_modal.propertyForm.value
        if (this.modal[i]) this.pc_modal.propertyForm.patchValue(this.modal[i]);
        this.pc_modal.show();
        this.pc_modal.complete = i;
        this.pc_modal.propertyForm.valueChanges.subscribe((val) => {
          if (i == this.pc_modal.complete) {
            this.modal[i] = val;
          }
        });
        break;
      case 'SAV':
        this.quotationService
          .getCoverScreenDescriptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            description = data.description;
            this.is_modal.description = description;
          });
        console.log(this.policyTerm, 'policy term');
        this.is_modal.savingsForm.patchValue({
          conTerm: Math.floor(Number(this.policyTerm) / 365),
          conMonths: Math.floor((Number(this.policyTerm) % 365) / 12),
          conDays: (Number(this.policyTerm) % 365) % 12,
        });
        //this.modal[i] = this.sav_modal.savingsForm.value
        if (this.modal[i]) this.is_modal.savingsForm.patchValue(this.modal[i]);
        this.is_modal.show();
        this.is_modal.complete = i;
        this.is_modal.savingsForm.valueChanges.subscribe((val) => {
          if (i == this.is_modal.complete) {
            this.modal[i] = val;
          }
        });
        break;
      case 'MH':
        this.quotationService
          .getCoverScreenDescriptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            description = data.description;
            this.mh_modal.description = description;
          });
        //this.modal[i] = this.bl_modal.buildingForm.value
        if (this.modal[i])
          this.mh_modal.marineHullForm.patchValue(this.modal[i]);
        this.mh_modal.show();
        this.modal[i] = this.mh_modal.marineHullForm.value;
        this.mh_modal.complete = i;
        this.mh_modal.marineHullForm.valueChanges.subscribe((val) => {
          if (i == this.mh_modal.complete) {
            this.modal[i] = val;
          }
        });
        break;
      case 'SL':
        this.quotationService
          .getCoverScreenDescriptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            description = data.description;
            this.sl_modal.description = description;
          });
        //this.modal[i] = this.bl_modal.buildingForm.value
        if (this.modal[i]) this.sl_modal.lifeForm.patchValue(this.modal[i]);
        this.sl_modal.show();
        this.modal[i] = this.sl_modal.lifeForm.value;
        this.sl_modal.complete = i;
        this.sl_modal.lifeForm.valueChanges.subscribe((val) => {
          if (i == this.sl_modal.complete) {
            this.modal[i] = val;
          }
        });
        break;
      case 'MC':
        this.quotationService
          .getCoverScreenDescriptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            description = data.description;
            this.mc_modal.description = description;
          });
        //this.modal[i] = this.bl_modal.buildingForm.value
        if (this.modal[i])
          this.mc_modal.marineCargoForm.patchValue(this.modal[i]);
        this.mc_modal.show();
        this.modal[i] = this.mc_modal.marineCargoForm.value;
        this.mc_modal.complete = i;
        this.mc_modal.marineCargoForm.valueChanges.subscribe((val) => {
          if (i == this.mc_modal.complete) {
            this.modal[i] = val;
          }
        });
        break;
      case 'ILR': // is this right or should it be LIR?
        this.quotationService
          .getCoverScreenDescriptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            description = data.description;
            this.lir_modal.description = description;
          });
        this.lir_modal.assured_min = null;
        this.lir_modal.assured_max = null;
        this.lir_modal.assured = null;

        const sequence = async () => {
          this.quotationService
            .getSumAssured(
              this.newCoverScreens[i].info.coverCode ||
                this.newCoverScreens[i].info.riderCoverCode,
              this.coverDetailsForm.value.assetNo
            )
            .subscribe((data) => {
              if (
                !Array.isArray(data) ||
                (Array.isArray(data) && data.length < 2)
              ) {
                let result = Array.isArray(data) ? data[0] : data;
                this.lir_modal.assured_value_disabled = false;
                if (result?.minSumAssured || result?.maxSumAssured) {
                  this.lir_modal.assured_min = result?.minSumAssured;
                  this.lir_modal.assured_max = result?.maxSumAssured;
                  this.lir_modal.assured = '';
                } else {
                  this.lir_modal.lifeForm.patchValue({
                    assured: result || result?.AllowedSumAssured,
                  });
                  this.lir_modal.assured = result || result?.AllowedSumAssured;
                }
              } else if (Array.isArray(data) && data.length >= 2) {
                this.lir_modal.assured_value_disabled = true;
                this.lir_modal.assured_options = data;
              }
            });

          if (this.defaultPremTerm) {
            this.lir_modal.termList = this.termList;
            this.lir_modal.termDisabled = this.termDisabled;
            if (Array.isArray(this.defaultPremTerm)) {
              this.defaultPremTerm.forEach((element) => {
                element.allowedPremPayTermMonth
                  ? this.lir_modal.allowedPremPayTermMonths.push(
                      element.allowedPremPayTermMonth
                    )
                  : '';
                element.allowedPremPayTermYear
                  ? this.lir_modal.allowedPremPayTermYears.push(
                      element.allowedPremPayTermYear
                    )
                  : '';
              });
            } else {
              this.defaultPremTerm.fixedPremPayTermMonth
                ? this.lir_modal.lifeForm.patchValue({
                    premMonths: this.defaultPremTerm.fixedPremPayTermMonth,
                  })
                : '';
              this.defaultPremTerm.fixedPremPayTermYear
                ? this.lir_modal.lifeForm.patchValue({
                    premTerm: this.defaultPremTerm.fixedPremPayTermYear,
                  })
                : '';
            }
          }
        };
        if (!this.modal[i]) {
          if (Number(this.premiumTerm) !== 0) {
            this.lir_modal.lifeForm.patchValue({
              premTerm: this.premiumTerm
                ? Math.floor(Number(this.premiumTerm) / 365)
                : null,
              premMonths: this.premiumTerm
                ? Math.floor((Number(this.premiumTerm) % 365) / 12)
                : null,
              premDays: this.premiumTerm
                ? (Number(this.premiumTerm) % 365) % 12
                : null,
            });
          }
          await sequence().finally(() => {
            this.lir_modal.show();
            this.modal[i] = this.lir_modal.lifeForm.value;
            this.lir_modal.complete = i;
            this.lir_modal.lifeForm.valueChanges.subscribe((val) => {
              if (i == this.lir_modal.complete) {
                this.modal[i] = val;
              }
            });
          });
        } else {
          this.lir_modal.lifeForm.patchValue(this.modal[i]);
        }
        const benFreqOptions = this.quotationService
          .getSBenefitPaymentFreqOptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .toPromise();
        await benFreqOptions.then(async (data) => {
          data = data.filter((value) => value.benPayFreq != null);
          const fdescriptions = await this.quotationService
            .getFrequencyDescriptions()
            .toPromise();
          data.forEach(async (item, index) => {
            let desc = { description: '' };
            if (item.benPayFreq === 'S')
              data[index] = { ...item, description: 'Semi-Annual' };
            else {
              desc = await fdescriptions.find(
                ({ premFreq }) => premFreq == item.benPayFreq
              );
              data[index] = { ...item, description: desc?.description };
            }
          });
          this.lir_modal.benfreq_options = data;
        });
        this.quotationService
          .getBenTermOptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe(
            (data) =>
              (this.lir_modal.benterm_options = data.filter(
                (option) => option.benPayTermMonth
              ))
          );
        this.quotationService
          .getBenEscalOptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            data = data.filter((value) => value.rate != null);
            this.lir_modal.escal_options = data;
          });
        this.lir_modal.show();
        this.modal[i] = this.lir_modal.lifeForm.value;
        this.lir_modal.complete = i;
        this.lir_modal.lifeForm.valueChanges.subscribe((val) => {
          if (i == this.lir_modal.complete) {
            this.modal[i] = val;
          }
        });

        //this.modal[i] = this.bl_modal.buildingForm.value

        break;
      case 'AL':
        this.quotationService
          .getCoverScreenDescriptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            description = data.description;
            this.lir_modal.description = description;
          });
        //this.modal[i] = this.bl_modal.buildingForm.value
        if (this.modal[i]) this.lir_modal.lifeForm.patchValue(this.modal[i]);
        this.lir_modal.show();
        this.modal[i] = this.lir_modal.lifeForm.value;
        this.lir_modal.complete = i;
        this.lir_modal.lifeForm.valueChanges.subscribe((val) => {
          if (i == this.lir_modal.complete) {
            this.modal[i] = val;
          }
        });
        break;
      case 'LA':
        this.quotationService
          .getCoverScreenDescriptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            description = data.description;
            this.lia_modal.description = description;
          });
        this.lia_modal.cover_code = cov;
        this.quotationService
          .getEscalationValue(cov)
          .subscribe(
            (data) => (this.lia_modal.annuity_escalation_value_options = data)
          );
        this.quotationService
          .getPaymentMethods(cov)
          .subscribe((data) => (this.lia_modal.payment_options = data));
        this.quotationService
          .getReversionaryProportion(cov)
          .subscribe(
            (data) =>
              (this.lia_modal.spouse_reversionary_proportion_options = data)
          );
        this.quotationService
          .getGuaranteePeriod(cov)
          .subscribe(
            (data) => (this.lia_modal.guarantee_period_options = data)
          );
        this.quotationService
          .getAnnuityFrequency(cov)
          .subscribe(
            (data) => (this.lia_modal.annuity_frequency_options = data)
          );
        //this.modal[i] = this.bl_modal.buildingForm.value
        if (this.modal[i]) this.lia_modal.lifeForm.patchValue(this.modal[i]);
        this.lia_modal.show();
        this.modal[i] = this.lia_modal.lifeForm.value;
        this.lia_modal.complete = i;
        this.lia_modal.lifeForm.valueChanges.subscribe((val) => {
          if (i == this.lia_modal.complete) {
            this.modal[i] = val;
          }
        });
        break;
      case 'DA':
        this.quotationService
          .getCoverScreenDescriptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            description = data.description;
            this.dlia_modal.description = description;
          });
        this.dlia_modal.cover_code = cov;
        this.quotationService
          .getEscalationValue(cov)
          .subscribe(
            (data) => (this.dlia_modal.annuity_escalation_value_options = data)
          );
        this.quotationService
          .getPaymentMethods(cov)
          .subscribe((data) => (this.dlia_modal.payment_options = data));
        this.quotationService
          .getReversionaryProportion(cov)
          .subscribe(
            (data) =>
              (this.dlia_modal.spouse_reversionary_proportion_options = data)
          );
        this.quotationService
          .getGuaranteePeriod(cov)
          .subscribe(
            (data) => (this.dlia_modal.guarantee_period_options = data)
          );
        this.quotationService
          .getAnnuityFrequency(cov)
          .subscribe(
            (data) => (this.dlia_modal.annuity_frequency_options = data)
          );
        //this.modal[i] = this.bl_modal.buildingForm.value
        if (this.modal[i]) this.dlia_modal.lifeForm.patchValue(this.modal[i]);
        this.dlia_modal.show();
        this.modal[i] = this.dlia_modal.lifeForm.value;
        this.dlia_modal.complete = i;
        this.dlia_modal.lifeForm.valueChanges.subscribe((val) => {
          if (i == this.dlia_modal.complete) {
            this.modal[i] = val;
          }
        });
        break;
      case 'ICL':
        this.quotationService
          .getCoverScreenDescriptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            description = data.description;
            this.lic_modal.description = description;
          });
        this.lic_modal.assured_min = null;
        this.lic_modal.assured_max = null;
        this.lic_modal.assured = null;

        const sequence_icl = async () => {
          this.quotationService
            .getLoanRate(
              this.newCoverScreens[i].info.coverCode ||
                this.newCoverScreens[i].info.riderCoverCode
            )
            .subscribe((data) => {
              data.filter((value) => value.loanIntRate != null);
              this.lic_modal.loan_options = data;
            });
          this.quotationService
            .getSumAssured(
              this.newCoverScreens[i].info.coverCode ||
                this.newCoverScreens[i].info.riderCoverCode,
              this.coverDetailsForm.value.assetNo
            )
            .subscribe((data) => {
              if (
                !Array.isArray(data) ||
                (Array.isArray(data) && data.length < 2)
              ) {
                let result = Array.isArray(data) ? data[0] : data;
                this.lic_modal.assured_value_disabled = false;
                if (result?.minSumAssured || result?.maxSumAssured) {
                  this.lic_modal.assured_min = result?.minSumAssured;
                  this.lic_modal.assured_max = result?.maxSumAssured;
                  this.lic_modal.assured = '';
                } else {
                  this.lic_modal.lifeForm.patchValue({
                    assured: result || result?.AllowedSumAssured,
                  });
                  this.lic_modal.assured = result || result?.AllowedSumAssured;
                }
              } else if (Array.isArray(data) && data.length >= 2) {
                this.lic_modal.assured_value_disabled = true;
                this.lic_modal.assured_options = data;
              }
            });

          if (this.defaultPremTerm) {
            this.lic_modal.termList = this.termList;
            this.lic_modal.termDisabled = this.termDisabled;
            if (Array.isArray(this.defaultPremTerm)) {
              this.defaultPremTerm.forEach((element) => {
                element.allowedPremPayTermMonth
                  ? this.lic_modal.allowedPremPayTermMonths.push(
                      element.allowedPremPayTermMonth
                    )
                  : '';
                element.allowedPremPayTermYear
                  ? this.lic_modal.allowedPremPayTermYears.push(
                      element.allowedPremPayTermYear
                    )
                  : '';
              });
            } else {
              this.defaultPremTerm.fixedPremPayTermMonth
                ? this.lic_modal.lifeForm.patchValue({
                    premMonths: this.defaultPremTerm.fixedPremPayTermMonth,
                  })
                : '';
              this.defaultPremTerm.fixedPremPayTermYear
                ? this.lic_modal.lifeForm.patchValue({
                    premTerm: this.defaultPremTerm.fixedPremPayTermYear,
                  })
                : '';
            }
          }
        };
        if (!this.modal[i]) {
          this.lic_modal.lifeForm.patchValue({
            loanTerm: Math.floor(Number(this.policyTerm) / 365),
            loanMonths: Math.floor((Number(this.policyTerm) % 365) / 12),
            loanDays: (Number(this.policyTerm) % 365) % 12,
          });
          if (Number(this.premiumTerm) !== 0) {
            this.lic_modal.lifeForm.patchValue({
              premTerm: this.premiumTerm
                ? Math.floor(Number(this.premiumTerm) / 365)
                : null,
              premMonths: this.premiumTerm
                ? Math.floor((Number(this.premiumTerm) % 365) / 12)
                : null,
              premDays: this.premiumTerm
                ? (Number(this.premiumTerm) % 365) % 12
                : null,
            });
          }
          await sequence_icl().finally(() => {
            this.lic_modal.show();
            this.modal[i] = this.lic_modal.lifeForm.value;
            this.lic_modal.complete = i;
            this.lic_modal.lifeForm.valueChanges.subscribe((val) => {
              if (i == this.lic_modal.complete) {
                this.modal[i] = val;
              }
            });
          });
        } else {
          this.lic_modal.lifeForm.patchValue(this.modal[i]);
          this.quotationService
            .getLoanRate(
              this.newCoverScreens[i].info.coverCode ||
                this.newCoverScreens[i].info.riderCoverCode
            )
            .subscribe((data) => {
              data.filter((value) => value.loanIntRate != null);
              this.lic_modal.loan_options = data;
            });
          this.lic_modal.show();
          this.modal[i] = this.lic_modal.lifeForm.value;
          this.lic_modal.complete = i;
          this.lic_modal.lifeForm.valueChanges.subscribe((val) => {
            if (i == this.lic_modal.complete) {
              this.modal[i] = val;
            }
          });
        }
        break;
      case 'IS':
        this.quotationService
          .getCoverScreenDescriptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            description = data.description;
            this.is_modal.description = description;
          });
        if (this.defaultPremFreq) {
          this.is_modal.defaultPremFreq = this.defaultPremFreq;
        }
        //this.modal[i] = this.bl_modal.buildingForm.value
        if (this.modal[i]) this.is_modal.savingsForm.patchValue(this.modal[i]);
        this.is_modal.show();
        this.modal[i] = this.is_modal.savingsForm.value;
        this.is_modal.complete = i;
        this.is_modal.savingsForm.valueChanges.subscribe((val) => {
          if (i == this.is_modal.complete) {
            this.modal[i] = val;
          }
        });
        break;
      case 'END':
        this.quotationService
          .getCoverScreenDescriptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            description = data.description;
            this.end_modal.description = description;
          });
        this.end_modal.assured_min = null;
        this.end_modal.assured_max = null;
        this.end_modal.assured = null;

        if (this.defaultPremTerm) {
          this.end_modal.termList = this.termList;
          this.end_modal.termDisabled = this.termDisabled;
          if (Array.isArray(this.defaultPremTerm)) {
            this.defaultPremTerm.forEach((element) => {
              element.allowedPremPayTermMonth
                ? this.end_modal.allowedPremPayTermMonths.push(
                    element.allowedPremPayTermMonth
                  )
                : '';
              element.allowedPremPayTermYear
                ? this.end_modal.allowedPremPayTermYears.push(
                    element.allowedPremPayTermYear
                  )
                : '';
            });
          } else {
            this.defaultPremTerm.fixedPremPayTermMonth
              ? this.end_modal.endowmentForm.patchValue({
                  premMonths: this.defaultPremTerm.fixedPremPayTermMonth,
                })
              : '';
            this.defaultPremTerm.fixedPremPayTermYear
              ? this.end_modal.endowmentForm.patchValue({
                  premTerm: this.defaultPremTerm.fixedPremPayTermYear,
                })
              : '';
          }
        }

        this.quotationService
          .getSumAssured(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode,
            this.coverDetailsForm.value.assetNo
          )
          .subscribe((data) => {
            if (
              !Array.isArray(data) ||
              (Array.isArray(data) && data.length < 2)
            ) {
              let result = Array.isArray(data) ? data[0] : data;
              this.lir_modal.assured_value_disabled = false;
              if (result?.minSumAssured || result?.maxSumAssured) {
                this.end_modal.assured_min = result?.minSumAssured;
                this.end_modal.assured_max = result?.maxSumAssured;
                this.end_modal.assured = '';
              } else {
                this.end_modal.endowmentForm.patchValue({
                  target: result || result?.AllowedSumAssured,
                });
                this.end_modal.assured = result || result?.AllowedSumAssured;
              }
            } else if (Array.isArray(data) && data.length >= 2) {
              this.end_modal.assured_value_disabled = true;
              this.end_modal.assured_options = data;
            }
          });
        if (this.modal[i])
          this.end_modal.endowmentForm.patchValue(this.modal[i]);
        this.end_modal.show();
        this.modal[i] = this.end_modal.endowmentForm.value;
        this.end_modal.complete = i;
        this.end_modal.endowmentForm.valueChanges.subscribe((val) => {
          if (i == this.end_modal.complete) {
            this.modal[i] = val;
          }
        });
        break;
      case 'GLR':
        this.quotationService
          .getCoverScreenDescriptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            description = data.description;
            this.lir_modal.description = description;
          });
        //this.modal[i] = this.bl_modal.buildingForm.value
        if (this.modal[i]) this.lir_modal.lifeForm.patchValue(this.modal[i]);
        this.lir_modal.show();
        this.modal[i] = this.lir_modal.lifeForm.value;
        this.lir_modal.complete = i;
        this.lir_modal.lifeForm.valueChanges.subscribe((val) => {
          if (i == this.lir_modal.complete) {
            this.modal[i] = val;
          }
        });
        break;
      default:
        break;
    }
  }
}
