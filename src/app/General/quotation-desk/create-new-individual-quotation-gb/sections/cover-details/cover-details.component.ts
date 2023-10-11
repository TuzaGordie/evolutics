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
import { QuotationService } from 'src/app/General/services/quotation-service.service';
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
} from 'src/app/General/services/quotation.interface';
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
import { DeferredLifeAnnuityComponent } from '../../modals/covers/deferred-life-annuity/deferred-life-annuity.component';
import { FindQuotationService } from '../../../service/find-quotation.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { AssetFinderComponent } from '../../../shared/asset-finder/asset-finder.component';

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
  @ViewChild('dlia_modal', { static: true })
  dlia_modal: DeferredLifeAnnuityComponent;

  @Input() policyTerm: string = '';
  @Input() premiumTerm: string = '';
  modal: any[] = [];
  selected: boolean[] = [];
  clientDetails: IClientDetails;
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
  todate: Date;
  client: any[] = [];
  purchaseValue: any = { purValue: '', mvClient: '', mvAdj: '' };
  checked: boolean[];
  isDependent: boolean[] = [];
  frq: any[] = [];
  frqDesc: any[] = [];
  freq: any[] = [];
  allowedPolicyTermYears: any[] = [];
  allowedPolicyTermMonths: any[] = [];
  allowedPremPayTermMonths: any[] = [];
  allowedPremPayTermYears: any[] = [];
  coverDisabled: boolean[] = [];

  coverDetailsForm: FormGroup;
  covers: FormArray | any = { controls: '' };
  coverScreens: ICoversDetails[];
  newCoverScreens: ICoversDetails[] = [];
  complete: any[] = [];
  termList: boolean = false;
  termDisabled: boolean = false;
  default: any;

  product: {
    code: string;
    description: string;
  };

  paymentMethod: any;
  systemSelect: string = 'motor';
  isRp1Check: boolean = false;
  quoteNo: any;
  coverCodes: any[] = [];
  get formValue() {
    return this.coverDetailsForm.value;
  }

  constructor(
    private quotationService: QuotationService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private fQS: FindQuotationService,
    private utilityService: UtilityService
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
    const queryParams = this.route.snapshot.queryParamMap;

    this.product = {
      code: queryParams.get('pcd'),
      description: queryParams.get('pdsc'),
    };
    this.clientDetails = this.route.snapshot.data['clientDetails'];
    this.premiumPaymentMethodOptions$ =
      this.quotationService.getPremiumPaymentMethods();

    this.currencyOptions$ = this.quotationService.getCurrencyOptions(
      queryParams.get('pcd')
    );
    console.log(this.currencyOptions$);

    this.todate = new Date(Date.now());

    this.product = {
      code: queryParams.get('pcd'),
      description: queryParams.get('pdsc'),
    };

    this.coverDetailsForm = this.fb.group({
      applicationDate: [
        formatDate(this.todate, 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],
      commencementDate: [
        formatDate(this.todate, 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],
      currency: new FormControl(null, Validators.required),
      premiumPaymentMethod: new FormControl(null, Validators.required),
      discountCode: new FormControl(null, Validators.required),
      discountRate: new FormControl(null, Validators.required),
      payAsYouGo: new FormControl(null, Validators.required),
      policyTermYears: new FormControl(null, Validators.required),
      policyTermMonths: new FormControl(null, Validators.required),
      policyTermDays: new FormControl(null, Validators.required),
      premiumPaymentTermYears: new FormControl(null, Validators.required),
      premiumPaymentTermMonths: new FormControl(null, Validators.required),
      premiumPaymentTermDays: new FormControl(null, Validators.required),
      premiumPayFreq: new FormControl(null, Validators.required),
      assetNo: new FormControl(
        null,
        Validators.required,
        this.validateAssetId.bind(this)
      ),
      redgNo: new FormControl(null, Validators.required),
      purchaseValue: new FormControl(null, Validators.required),
      marketValueByClient: new FormControl(null, Validators.required),
      marketValueBySystem: new FormControl(null, Validators.required),
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
    this.coverDetailsForm.patchValue({
      assetNo: covers[0].assetId,
    });
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
        slimit: cover.aggSumAssured,
        target_amount: cover.aggSumAssured,
        amount: cover.aggSumAssured,
        target: cover.aggSumAssured,
        target_frequency: cover.coverPremFreq,
        benPaymentFreq: cover.benPayFreq,
        loan_rate: cover.loanIntRate,
        loan_freq: cover.loanRepayFreq,
        escalation_before: cover.saEscalRate,
      };
    });
  }

  createAsset() {
    this.router.navigate(['general/asset-desk/create']);
  }

  openCoinsurerFinderModal(i: number) {}

  findAsset() {
    this.utilityService.dialogOpener(
      AssetFinderComponent,
      { width: '80vw' },
      (coupon) => {
        this.coverDetailsForm.patchValue({ assetNo: coupon.assetNo });
        this.validateAssetId(this.coverDetailsForm.controls.assetNo);
        // this.coinsurersList.controls[i].patchValue({ providerNo: coupon.no });
        // this.getProviderFullname(i);
      }
    );
    // if (this.coverDetailsForm.value.assetNo) {
    //   this.router.navigate([`general/asset-desk/view`], {
    //     queryParams: { assetNo: this.coverDetailsForm.value.assetNo },
    //   });
    // } else {
    //   this.router.navigate(['/general/asset-desk/find']);
    // }
  }

  createItems() {
    return this.fb.group({
      assuredNo: new FormControl(
        this.clientDetails.clientNo,
        Validators.required
      ),
      assuredName: new FormControl(null, Validators.required),
      assuredRel: new FormControl('Self', Validators.required),
    });
  }

  async createItem(): Promise<void> {
    await this.stuff(this.product.code).then(() => {
      let cover = this.coverDetailsForm.get('covers') as FormArray;
      const queryParams = this.route.snapshot.queryParamMap;
      let i = 0;
      this.coverScreens.forEach((cov) => {
        // if (cov.info.base == '1' || cov.info.mandatory) {
        //   this.coverDisabled.push(true)
        // } else {
        //   this.coverDisabled.push(false)
        // }
        // console.log(cov)
        if (cov.info.base == '1') {
          //this.premiumPaymentFreqOptions$ = this.quotationService.getPremiumFrequencyOptions(cov.info.coverCode)
          this.quotationService
            .getDefaultOptions(queryParams.get('pcd'))
            .subscribe((data) => {
              // console.log(queryParams.get('pcd'))
              // console.log(data)
              if (data?.defaultPolicyTerm) {
                this.termList = false;
                this.termDisabled = true;
                this.coverDetailsForm.patchValue({
                  policyTermMonths: data.defaultPolicyTerm % 12,
                });
                this.coverDetailsForm.patchValue({
                  policyTermYears: Math.floor(data.fixedPolicyTermMonth / 12),
                });
              } else {
                try {
                  this.quotationService
                    .getPolicyTerms(cov.info.coverCode)
                    .subscribe((data) => {
                      //console.log(data)
                      if (Array.isArray(data)) {
                        if (
                          data[0]?.allowedPolicyTermYear ||
                          data[0]?.allowedPolicyTermMonth
                        ) {
                          this.termList = true;
                          data.forEach((element) => {
                            element.allowedPolicyTermMonth
                              ? this.allowedPolicyTermMonths.push(
                                  element.allowedPolicyTermMonth
                                )
                              : '';
                            element.allowedPolicyTermYear
                              ? this.allowedPolicyTermYears.push(
                                  element.allowedPolicyTermYear
                                )
                              : '';
                          });
                        }
                        if (
                          data[0]?.allowedPremPayTermYear ||
                          data[0]?.allowedPremPayTermMonth
                        ) {
                          this.termList = true;
                          this.termDisabled = false;
                          data.forEach((element) => {
                            element.allowedPremPayTermMonth
                              ? this.allowedPremPayTermMonths.push(
                                  element.allowedPremPayTermMonth
                                )
                              : '';
                            element.allowedPremPayTermYear
                              ? this.allowedPremPayTermYears.push(
                                  element.allowedPremPayTermYear
                                )
                              : '';
                          });
                        }
                      } else {
                        if (
                          data?.fixedPolicyTermMonth ||
                          data?.FixedPolicyTermYear
                        ) {
                          this.termList = false;
                          this.termDisabled = true;
                          data?.fixedPolicyTermMonth
                            ? this.coverDetailsForm.patchValue({
                                policyTermMonths: data.fixedPolicyTermMonth,
                              })
                            : '';
                          data.fixedPolicyTermYear
                            ? this.coverDetailsForm.patchValue({
                                policyTermYears: data.fixedPolicyTermYear,
                              })
                            : '';
                        }
                        if (
                          data?.fixedPremPayTermMonth ||
                          data?.FixedPremPayTermYear
                        ) {
                          this.termList = false;
                          this.termDisabled = true;
                          data.fixedPremPayTermMonth
                            ? this.coverDetailsForm.patchValue({
                                premiumPaymentTermMonths:
                                  data.fixedPremPayTermMonth,
                              })
                            : '';
                          data.fixedPremPayTermYear
                            ? this.coverDetailsForm.patchValue({
                                premiumPaymentTermYears:
                                  data.fixedPremPayTermYear,
                              })
                            : '';
                        }
                      }
                    });
                } catch (error) {
                  console.log(error);
                  try {
                    this.quotationService
                      .getMoreTerms(cov.info.coverCode)
                      .subscribe((data) => {
                        console.log(data);
                      });
                  } catch (error) {
                    console.log(error);
                  }
                }
              }
              if (data?.DefaultPremFreq) {
                this.freq = [
                  { freq: data.DefaultPremFreq, desc: data.DefaultPremFreq },
                ];
              } else {
                this.quotationService
                  .getPremiumFrequencyOptions(cov.info.coverCode)
                  .subscribe((data) => {
                    this.quotationService
                      .getFrequencyDescriptions()
                      .subscribe((ele) => {
                        this.frqDesc = ele;
                        //console.log(this.frqDesc)
                        data.forEach((element) => {
                          //console.log(element)
                          this.frqDesc.forEach((desc) => {
                            // console.log('desc: ', desc)
                            if (element.frequency == desc.premFreq) {
                              this.freq.push({
                                freq: element.frequency,
                                desc: desc.description || 'null',
                              });
                            }
                          });
                        });
                        //console.log(this.freq)
                      });
                  });
              }
            });
        }
        let loop = cov.info.maxNo ? Number(cov.info.maxNo) : 1;
        for (const key of [...Array(loop).keys()]) {
          this.newCoverScreens.push(cov);
          cover.push(this.createItems());
          if (cov.info.base || cov.info.mandatory) {
            this.selected.push(true);
            this.coverDisabled.push(true);
            this.quotationService
              .getCoverCode(cov)
              .then((data) => this.coverCodes.splice(0, 0, data.code));
          } else {
            this.selected.push(false);
            this.coverDisabled.push(false);
            this.quotationService
              .getCoverCode(cov)
              .then((data) =>
                this.coverCodes.splice(
                  this.newCoverScreens.indexOf(cov),
                  0,
                  data.code
                )
              );
          }
          this.modal.push({});
          this.isDependent.push(false);
          this.complete.push(true);
          this.quotationService
            .getClientDetails(this.clientDetails.clientNo)
            .subscribe((data) => {
              const value = data ? data : { fullName: '' };
              this.client.push(value);
            });
          this.assuredRelToOwner$.push('Self');
        }

        // this.quotationService.getPremiumFrequencyOptions(cov.info.coverCode).subscribe(data=>console.log(data))

        if (cov.info.base == '1' || cov.info.mandatory == true) {
          // console.log(cov)
          this.quotationService
            .getDependentCovers(cov.info.coverCode)
            .subscribe(
              (data) => {
                i = 0;
                let supindex = this.newCoverScreens.indexOf(cov);
                //console.log(supindex)
                data.forEach((element, index) => {
                  // console.log(element)
                  let loop = element.info.maxNo
                    ? Number(element.info.maxNo)
                    : 1;
                  for (const key of [...Array(loop).keys()]) {
                    // console.log(key, element)
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
                      console.log(true);
                      this.selected.splice(supindex + index + i, 0, true);
                      this.coverDisabled.splice(supindex + index + i, 0, true);
                    } else if (element.info.base || element.info.mandatory) {
                      this.selected.splice(supindex + index + i, 0, false);
                      this.coverDisabled.splice(supindex + index + i, 0, false);
                    } else {
                      this.selected.splice(supindex + index + i, 0, false);
                      this.coverDisabled.splice(supindex + index + 1, 0, false);
                    }

                    this.modal.push({});
                    this.complete.push(true);
                    this.quotationService
                      .getClientDetails(this.clientDetails.clientNo)
                      .subscribe((data) => {
                        const value = data ? data : { fullName: '' };
                        this.client.push(value);
                      });
                    cover.push(this.createItems());
                    //console.log(true)
                    this.assuredRelToOwner$.push('Self');
                    //console.log(this.newCoverScreens)
                  }
                });
              },
              (err) => console.log(err),
              () => console.log('finished')
            );
        }
      });
    });
  }
  get assetId() {
    return this.coverDetailsForm.get('assetNo');
  }

  saveStuff(state: string) {
    $(`#checkbox_${state}`).prop('checked', true);
  }

  setSelected(i) {
    this.selected[i] = this.selected[i] ? false : true;
    let cov = this.newCoverScreens[i];
    let cover = this.coverDetailsForm.get('covers') as FormArray;
    if (this.selected[i]) {
      //console.log('checked')
      if (cov.info.coverCode) {
        console.log('process started');
        this.quotationService.getDependentCovers(cov.info.coverCode).subscribe(
          (data) => {
            //console.log('data:', data)
            let supindex = this.coverScreens.indexOf(cov);
            data.forEach((element, index) => {
              this.newCoverScreens.splice(supindex + index + 1, 0, element);
              this.coverScreens.push(element);
              if (element.info.base || element.info.mandatory) {
                this.selected.splice(supindex + index + 1, 0, true);
              } else this.selected.splice(supindex + index + 1, 0, false);
              this.quotationService
                .getCoverCode(element)
                .then((data) =>
                  this.coverCodes.splice(supindex + index + i, 0, data.code)
                );
              this.modal.push({});
              this.complete.push(true);
              this.quotationService
                .getClientDetails(this.clientDetails.clientNo)
                .subscribe((data) => {
                  const value = data ? data : { fullName: '' };
                  this.client.push(value);
                });
              cover.push(this.createItems());
              //console.log(true)
              this.assuredRelToOwner$.splice(supindex + index + 1, 0, 'Self');
              //console.log(this.newCoverScreens)
            });
          },
          (err) => console.log(err),
          () => console.log('finished')
        );
      }
    } else {
      //console.log('unchecked')
      if (cov.info.coverCode) {
        let supindex = this.newCoverScreens.indexOf(cov);
        this.quotationService.getDependentCovers(cov.info.coverCode).subscribe(
          (data) => {
            //console.log('data:', data)
            this.newCoverScreens.splice(supindex + 1, data.length);
            this.selected.splice(supindex + 1, data.length);
            this.modal.splice(supindex + 1, data.length);
            this.complete.splice(supindex + 1, data.length);
            this.client.splice(supindex + 1, data.length);
            this.assuredRelToOwner$.splice(supindex + 1, data.length);
            data.forEach((element, index) => {
              // let sindex = this.newCoverScreens.indexOf(element)
              // console.log(sindex)
              // this.newCoverScreens.splice(supindex, 1)
              // this.coverScreens.push(element)
              // this.selected.splice(sindex, 1)
              // this.modal.splice(sindex, 1)
              // this.complete.splice(sindex, 1)
              // this.client.splice(sindex, 1)
              cover.removeAt(supindex + 1);
              //console.log(true)
              // this.assuredRelToOwner$.splice(sindex, 1)
              // console.log(this.newCoverScreens)
            });
          },
          (err) => console.log(err),
          () => console.log('finished')
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
    if (value == this.clientDetails.clientNo) {
      this.assuredRelToOwner$[i] = 'Self';
    } else {
      this.quotationService
        .getAssuredRelToOwner(this.clientDetails.clientNo, value)
        .subscribe((data) => {
          this.assuredRelToOwner$[i] = data ? data.relationship : '';
        });
    }
  }

  validateAssetId(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    this.redgNoFromCheck = '';
    return this.quotationService.getAssetDetails(control?.value).pipe(
      tap((data) => {
        this.redgNoFromCheck = data ? data.registrationNo : '';
        this.coverDetailsForm.get('redgNo').setValue(this.redgNoFromCheck);
        this.quotationService
          .getPurchaseValue(control?.value)
          .subscribe((data) => {
            this.purchaseValue = data
              ? data
              : { purValue: '', mvClient: '', mvAdj: '' };
            this.coverDetailsForm
              .get('purchaseValue')
              .setValue(this.purchaseValue.purValue);
            this.coverDetailsForm
              .get('marketValueByClient')
              .setValue(this.purchaseValue.mvClient);
            this.coverDetailsForm
              .get('marketValueBySystem')
              .setValue(this.purchaseValue.mvAdj);
          });
      }),
      map((data) => {
        return data ? null : { valid: false };
      }),
      catchError(() => {
        this.redgNoFromCheck = '';
        return of({ valid: false });
      })
    );
  }

  validateAssuredId(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    //return null
    return this.quotationService.getClientDetails(control?.value).pipe(
      tap((data) => {
        this.clientDetails = data;
      }),
      map((data) => {
        return data ? null : { valid: false };
      }),
      catchError(() => {
        return of({ valid: false });
      })
    );
  }

  changeDiscCode() {
    // console.log(this.coverDetailsForm.value.discountCode)
    // console.log(formatDate(this.coverDetailsForm.get('applicationDate').value, 'dd/MM/yyyy', 'en'))
    let data = {
      applicationDate: formatDate(
        this.coverDetailsForm.get('applicationDate').value,
        'dd/MM/yyyy',
        'en'
      ),
      discountCode: this.coverDetailsForm.value.discountCode,
    };
    this.quotationService
      .getDiscountRate(data)
      .subscribe((data) =>
        this.coverDetailsForm.patchValue({ discountRate: data.response.rate })
      );
  }

  async showCoverScreen(e: Event, cover, i: number) {
    //console.log(coverCode)
    e.preventDefault();
    const coverCode = (await this.quotationService.getCoverCode(cover)).code;
    console.log('cover code', coverCode);
    let description;
    let assured;
    console.log('Showing. coverCode: ' + coverCode);
    this.quotationService
      .getSumAssured(
        this.newCoverScreens[i].info.coverCode ||
          this.newCoverScreens[i].info.riderCoverCode,
        this.coverDetailsForm.value.assetNo
      )
      .subscribe((data) => {
        console.log(
          'assured ',
          this.newCoverScreens[i].info.coverCode ||
            this.newCoverScreens[i].info.riderCoverCode,
          data
        );
        assured = data;
        console.log(Array.isArray(data));
      });
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
            console.log(data);
            description = data.description;
            this.bl_modal.description = description;
          });
        this.setupExcessModal(i, this.bl_modal);
        this.setupDeductibleModal(i, this.bl_modal);
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
            console.log(data);
            description = data.description;
            this.bond_modal.description = description;
          });
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
            console.log(data);
            description = data.description;
            this.dr_modal.description = description;
          });
        this.setupExcessModal(i, this.dr_modal);
        this.setupDeductibleModal(i, this.dr_modal);
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
            console.log(data);
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
            // console.log(data)
            if (data.length < 2) {
              let result = data[0];
              if (result.minSumAssured || result.maxSumAssured) {
                console.log(result.minSumAssured);
                this.lil_modal.assured_min = result.minSumAssured;
                this.lil_modal.assured_max = result.maxSumAssured;
                this.lil_modal.assured = '';
              } else {
                this.lil_modal.assured = result || result.AllowedSumAssured;
              }
            } else {
            }
          });
        // console.log(assured)
        // console.log(Array.isArray(assured))
        if (Array.isArray(assured)) {
          // console.log(assured.length)
        }
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
            console.log(data);
            description = data.description;
            this.acc_modal.description = description;
          });
        this.setupExcessModal(i, this.acc_modal);
        this.setupDeductibleModal(i, this.acc_modal);
        this.acc_modal.show();
        this.acc_modal.complete = i;
        this.acc_modal.accessoriesForm.valueChanges.subscribe((val) => {
          if (i == this.acc_modal.complete) {
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
            console.log(data);
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
        console.log(this.coverDetailsForm.get('marketValueBySystem').value);
        this.quotationService
          .getSumAssured(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode,
            this.coverDetailsForm.value.assetNo
          )
          .subscribe((data) => {
            // console.log(data)
            if (
              !Array.isArray(data) ||
              (Array.isArray(data) && data.length < 2)
            ) {
              console.log('here');
              let result = Array.isArray(data) ? data[0] : data;
              console.log(result);
              this.tp_modal.assured_value_disabled = false;
              if (result?.minSumAssured || result?.maxSumAssured) {
                console.log(result?.minSumAssured);
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
        let [excess, deductible] = await Promise.all([
          this.quotationService
            .getExcessOptions(
              this.newCoverScreens[i].info.coverCode ||
                this.newCoverScreens[i].info.riderCoverCode
            )
            .toPromise(),
          this.quotationService
            .getDeductibleOptions(
              this.newCoverScreens[i].info.coverCode ||
                this.newCoverScreens[i].info.riderCoverCode
            )
            .toPromise(),
        ]);
        if (!excess)
          excess = await this.quotationService
            .getMoreExcessOPtions(
              this.newCoverScreens[i].info.coverCode ||
                this.newCoverScreens[i].info.riderCoverCode
            )
            .toPromise();
        if (!deductible)
          deductible = await this.quotationService
            .getMoreDeductibleOptions(
              this.newCoverScreens[i].info.coverCode ||
                this.newCoverScreens[i].info.riderCoverCode
            )
            .toPromise();
        console.log(excess, deductible);
        if (!Array.isArray(excess)) {
          [
            this.tp_modal.excess_min,
            this.tp_modal.excess_max,
            this.tp_modal.excess_disabled,
          ] = [excess.minExcess, excess.maxExcess, false][
            (this.tp_modal.excessAmount,
            this.tp_modal.excessRate,
            this.tp_modal.excess_display)
          ] = [
            excess.defaultExcessAmount,
            excess.defaultExcessRate,
            `max(${excess.defaultExcessRate}% Loss Amount, ${excess.defaultExcessAmount})`,
          ];
        } else {
          [this.tp_modal.excess_options, this.tp_modal.excess_disabled] = [
            excess,
            false,
          ];
        }

        if (!Array.isArray(deductible)) {
          [
            this.tp_modal.deductible_min,
            this.tp_modal.deductible_max,
            this.tp_modal.deductible_disabled,
          ] = [deductible.mindeductible, deductible.maxDeductible, false][
            (this.tp_modal.deductibleAmount,
            this.tp_modal.deductibleRate,
            this.tp_modal.deductible_display)
          ] = [
            deductible.defaultDeductibleAmount,
            deductible.defaultDeductibleRate,
            `max(${deductible.defaultDeductibleRate}% Loss Amount, ${deductible.defaultDeductibleAmount})`,
          ];
        } else {
          [
            this.tp_modal.deductible_options,
            this.tp_modal.deductible_disabled,
          ] = [deductible, false];
        }

        // this.setupExcessModal(i, this.tp_modal)
        // this.setupDeductibleModal(i, this.tp_modal)
        if (this.modal[i])
          this.tp_modal.thirdPartyForm.patchValue(this.modal[i]);
        console.log(this.modal[i]);
        console.log(this.tp_modal.thirdPartyForm.value);
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
            console.log(data);
            description = data.description;
            this.pc_modal.description = description;
          });
        //this.modal[i] = this.pc_modal.propertyForm.value
        this.setupExcessModal(i, this.pc_modal);
        this.setupDeductibleModal(i, this.pc_modal);
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
            console.log(data);
            description = data.description;
            this.sav_modal.description = description;
          });
        if (this.policyTerm) {
          this.sav_modal.savingsForm.patchValue({
            conTerm: Math.floor(Number(this.policyTerm) / 365),
            conMonths: Math.floor((Number(this.policyTerm) % 365) / 12),
            conDays: (Number(this.policyTerm) % 365) % 12,
          });
        }
        //this.modal[i] = this.sav_modal.savingsForm.value
        if (this.modal[i]) this.sav_modal.savingsForm.patchValue(this.modal[i]);
        this.sav_modal.show();
        this.sav_modal.complete = i;
        this.sav_modal.savingsForm.valueChanges.subscribe((val) => {
          if (i == this.sav_modal.complete) {
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
            console.log(data);
            description = data.description;
            this.mh_modal.description = description;
          });
        //this.modal[i] = this.bl_modal.buildingForm.value
        this.mh_modal.show();
        this.modal[i] = this.mh_modal.marineHullForm.value;
        this.mh_modal.complete = i;
        this.mh_modal.marineHullForm.valueChanges.subscribe((val) => {
          if (i == this.mh_modal.complete) {
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
            console.log(data);
            description = data.description;
            this.mc_modal.description = description;
          });
        //this.modal[i] = this.bl_modal.buildingForm.value
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
            .getBenEscalOptions(
              this.newCoverScreens[i].info.coverCode ||
                this.newCoverScreens[i].info.riderCoverCode
            )
            .subscribe((data) => {
              data = data.filter((value) => value.rate != null);
              this.lir_modal.escal_options = data;
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
          this.lir_modal.lifeForm.setValue(this.modal[i]);
          this.lir_modal.show();
          this.modal[i] = this.lir_modal.lifeForm.value;
          this.lir_modal.complete = i;
          this.lir_modal.lifeForm.valueChanges.subscribe((val) => {
            if (i == this.lir_modal.complete) {
              this.modal[i] = val;
            }
          });
        }

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
            this.lia_modal.description = description;
            console.log('description', this.lia_modal.description);
          });
        //this.modal[i] = this.bl_modal.buildingForm.value
        this.lia_modal.show();
        this.modal[i] = this.lia_modal.lifeForm.value;
        this.lia_modal.complete = i;
        this.lia_modal.lifeForm.valueChanges.subscribe((val) => {
          if (i == this.lia_modal.complete) {
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
            console.log(data);
            description = data.description;
            this.lia_modal.description = description;
          });
        //this.modal[i] = this.bl_modal.buildingForm.value
        this.lia_modal.show();
        this.modal[i] = this.lia_modal.lifeForm.value;
        this.lia_modal.complete = i;
        this.lia_modal.lifeForm.valueChanges.subscribe((val) => {
          if (i == this.lia_modal.complete) {
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
            console.log(data);
            description = data.description;
            this.lic_modal.description = description;
          });
        //this.modal[i] = this.bl_modal.buildingForm.value
        this.lic_modal.show();
        this.modal[i] = this.lic_modal.lifeForm.value;
        this.lic_modal.complete = i;
        this.lic_modal.lifeForm.valueChanges.subscribe((val) => {
          if (i == this.lic_modal.complete) {
            this.modal[i] = val;
          }
        });
        break;
      case 'IS':
        this.quotationService
          .getCoverScreenDescriptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            console.log(data);
            description = data.description;
            this.lir_modal.description = description;
          });
        //this.modal[i] = this.bl_modal.buildingForm.value
        this.lir_modal.show();
        this.modal[i] = this.lir_modal.lifeForm.value;
        this.lir_modal.complete = i;
        this.lir_modal.lifeForm.valueChanges.subscribe((val) => {
          if (i == this.lir_modal.complete) {
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
            console.log(data);
            description = data.description;
            this.end_modal.description = description;
          });
        //this.modal[i] = this.bl_modal.buildingForm.value
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
            console.log(data);
            description = data.description;
            this.lir_modal.description = description;
          });
        //this.modal[i] = this.bl_modal.buildingForm.value
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

  setupExcessModal(i, modal) {
    console.log('setupExcessModal running');
    this.quotationService
      .getExcessOptions(
        this.newCoverScreens[i].info.coverCode ||
          this.newCoverScreens[i].info.riderCoverCode
      )
      .pipe(
        mergeMap((data) =>
          !data ? throwError('No "excess" payload returned') : of(data)
        )
      )
      .subscribe(
        (data: any) => {
          console.log('excess endpoint return data: ', data);
          if (data) {
            if (data.minExcess || data.maxExcess) {
              modal.excess_type = 'number';
              modal.excess_display = '';
              modal.excess_min = data.minExcess || 0;
              modal.excess_max = data.maxExcess || Number.MAX_SAFE_INTEGER;
              modal.excess_disabled = false;
              modal.excessAmount = null;
            } else if (data.defaultExcessAmount && data.defaultExcessRate) {
              modal.excess_type = 'text';
              modal.excess_display = `max(${data.defaultExcessRate}% Loss Amount, ${data.defaultExcessAmount})`;
              modal.excess_disabled = true;
              modal.excessAmount = data.defaultExcessAmount;
              modal.excessRate = data.defaultExcessRate;
            } else {
              this.handleNoExcess(modal);
            }
          }
          modal.excess = data;
        },
        (err: HttpErrorResponse) => {
          console.log('Error from getExcess endpoint', err);
          this.quotationService
            .getMoreExcessOPtions(
              this.newCoverScreens[i].info.coverCode ||
                this.newCoverScreens[i].info.riderCoverCode
            )
            .subscribe(
              (data) => {
                if (data && Array.isArray(data)) {
                  modal.excess_type = 'select';
                  modal.excess_options = data;
                  modal.excess_disabled = false;
                } else {
                  this.handleNoExcess(modal);
                }
              },
              (err) => {
                this.handleNoExcess(modal);
                console.log('Error from getMoreExcess Options endpoint', err);
              }
            );
        }
      );
  }
  handleNoExcess(modal) {
    console.log('excess error handler ran');
    modal.excess_disabled = true;
    modal.excess_display = 0;
    modal.excessAmount = 0;
    modal.excess_type = 'number';
  }

  setupDeductibleModal(i, modal) {
    console.log('setupDeductibleModal running');
    this.quotationService
      .getDeductibleOptions(
        this.newCoverScreens[i].info.coverCode ||
          this.newCoverScreens[i].info.riderCoverCode
      )
      .pipe(
        mergeMap((data) =>
          !data ? throwError('No "Deductible" payload returned') : of(data)
        )
      )
      .subscribe(
        (data: any) => {
          console.log('deductible endpoint return data: ', data);
          if (data) {
            if (data.minDeductible || data.maxDeductible) {
              modal.deductible_type = 'number';
              modal.deductible_display = '';
              modal.deductibleAmount = '';
              modal.deductible_min = data.minDeductible || 0;
              modal.deductible_max =
                data.maxDeductible || Number.MAX_SAFE_INTEGER;
              modal.deductible_disabled = false;
              return;
            } else if (
              data.defaultDeductibleAmount &&
              data.defaultDeductibleRate
            ) {
              modal.deductible_type = 'text';
              modal.deductible_display = `max(${data.defaultDeductibleRate}% Loss Amount, ${data.defaultDeductibleAmount})`;
              modal.deductibleAmount = data.defaultDeductibleAmount;
              modal.deductibleRate = data.defaultDeductibleRate;
              modal.deductible_disabled = true;
            } else {
              this.handleNoDeductible(modal);
            }
          }
          // modal.deductible = data
        },
        (err: HttpErrorResponse) => {
          console.log('Error from getDeductible endpoint', err);
          this.quotationService
            .getMoreDeductibleOptions(
              this.newCoverScreens[i].info.coverCode ||
                this.newCoverScreens[i].info.riderCoverCode
            )
            .subscribe(
              (data) => {
                if (data && Array.isArray(data)) {
                  modal.deductible_type = 'select';
                  modal.deductible_options = data;
                  modal.deductible_disabled = false;
                } else {
                  this.handleNoDeductible(modal);
                }
              },
              (err) => {
                this.handleNoDeductible(modal);
                console.log(
                  'Error from getMoredeductible Options endpoint',
                  err
                );
              }
            );
        }
      );
  }
  handleNoDeductible(modal) {
    console.log('deductible error handler ran');
    modal.deductible_type = 'number';
    modal.deductible_display = 0;
    modal.deductibleAmount = 0;
    modal.deductible_disabled = true;
  }
}
