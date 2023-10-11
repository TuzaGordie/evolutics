import { ConfigForms } from './../../../../../Shared/models/form.class';
import { UtilityService } from './../../../../../Services/utility.service';
import { ApiService } from './../../../../../Services/api.service';
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
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
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
  ICodes,
} from 'src/app/General/services/quotation.interface';

import { BuildingComponent } from '../../../create-new-individual-quotation-gb/modals/covers/building/building.component';
import { DefenseRecourseComponent } from '../../../create-new-individual-quotation-gb/modals/covers/defense-recourse/defense-recourse.component';
import { LifeInsuranceComponent } from '../../../create-new-individual-quotation-gb/modals/covers/life-insurance/life-insurance.component';
import { MotorAccessoriesComponent } from '../../../create-new-individual-quotation-gb/modals/covers/motor-accessories/motor-accessories.component';
import { MotorThirdPartyComponent } from '../../../create-new-individual-quotation-gb/modals/covers/motor-third-party/motor-third-party.component';
import { MarineCargoComponent } from '../../../create-new-individual-quotation-gb/modals/covers/marine-cargo/marine-cargo.component';
import { MarineHullComponent } from '../../../create-new-individual-quotation-gb/modals/covers/marine-hull/marine-hull.component';
import { PropertyContentComponent } from '../../../create-new-individual-quotation-gb/modals/covers/property-content/property-content.component';
import { BondComponent } from '../../../create-new-individual-quotation-gb/modals/covers/bond/bond.component';
import { LifeRiskComponent } from '../../../create-new-individual-quotation-gb/modals/covers/life-risk/life-risk.component';
import { LifeCreditComponent } from '../../../create-new-individual-quotation-gb/modals/covers/life-credit/life-credit.component';
import { EndowmentComponent } from '../../../create-new-individual-quotation-gb/modals/covers/endowment/endowment.component';
import { LifeAnnuityComponent } from '../../../create-new-individual-quotation-gb/modals/covers/life-annuity/life-annuity.component';
import { configForms } from 'src/app/Shared/models/form.class';
import { environment } from 'src/environments/environment';
import { SavingsComponent } from '../../../create-new-individual-quotation-gb/modals/covers/savings/savings.component';
import { exists } from 'fs';
import { DeferredLifeAnnuityComponent } from '../../../create-new-individual-quotation-gb/modals/covers/deferred-life-annuity/deferred-life-annuity.component';
import { CoinsurerFinderComponent } from '../../../shared/coinsurer-finder/coinsurer-finder.component';

declare let $;

@Component({
  selector: 'g-cover-details',
  templateUrl: './cover-details.component.html',
  styleUrls: ['./cover-details.component.scss'],
})
export class GroupCoverDetailsComponent implements OnInit {
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

  @Input() premiumTerm: string = '';
  private nbofAgent: number = 1;
  quoteNo: any;
  isRp1Check: boolean = false;
  toggleClass: boolean = false;
  toggleClass2: boolean = false;
  paymentMethod: any;
  disabled: boolean[] = [];
  selected: boolean[] = [];
  coverDisabled: boolean[] = [];
  isSubGroup: boolean = false;
  isCoinsured: boolean = false;
  IsSelectCover: boolean = false;
  private nbofCoin: number = 1;
  private nbofSg: number = 1;
  private nbofRsa: number = 1;
  private nbofMember: number = 1;
  clientFullName: string;
  providerResult: any[];
  modal: any[] = [];
  clientDetails: IClientDetails;
  assuredRelToOwner$: string[] = [];
  currencyOptions$: Observable<ICurrency[]>;
  premiumPaymentMethodOptions$: Observable<any[]>;
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
  subGroupOptions: ICodes[] = [];
  // isCoinsuredForm: FormGroup;
  newCoverScreens: ICoversDetails[] = [];
  subGroupsList: FormArray;
  subGroupL: string[] = [''];
  checked: boolean[];
  coinsurersList: FormArray;
  coinsurer: string[] = [''];
  coinsurerNo: string[] = [''];
  isDependent: boolean[] = [];
  frq: any[] = [];
  frqDesc: any[] = [];
  freq: any[] = [];
  coverDetailsForm: FormGroup;
  covers: FormArray | any = { controls: '' };
  coverScreens: ICoversDetails[];
  complete: any[] = [];
  basisDisabled: boolean[] = [];
  userCode: string;

  product: {
    code: string;
    description: string;
  };
  checkArray = [];
  isLead: boolean[] = [];
  isSelf: boolean[] = [];
  validResult: any = '';
  subgroup_no;

  providerForm = new FormGroup({
    clientNo: configForms.required(),
    providerName: configForms.default(),
    providerCategory: configForms.default(),
    providerSubCategory: configForms.default(),
    externalRef: configForms.default(),
  });

  // paymentMethod: any;
  systemSelect: string = 'motor';
  coverCodes: any[] = [];
  //isRp1Check: boolean = false;
  get formValue() {
    return this.coverDetailsForm.value;
  }

  @ViewChild('closeModal') closeModal;
  constructor(
    public quotationService: QuotationService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
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

  ngOnInit(): void {
    this.clientDetails = this.route.snapshot.data['ownerDetails'];
    this.userCode = environment.user?.code;
    this.premiumPaymentMethodOptions$ =
      this.quotationService.getPremiumPaymentMethods();
    this.premiumPaymentMethodOptions$.subscribe((res) => {});
    const queryParams = this.route.snapshot.queryParamMap;
    this.currencyOptions$ = this.quotationService.getCurrencyOptions(
      queryParams.get('pcd')
    );
    this.todate = new Date(Date.now());
    this.product = {
      code: queryParams.get('pcd'),
      description: queryParams.get('pdsc'),
    };

    this.quotationService.getCodes().subscribe((data) => {
      data.forEach((code) => {
        if (code.codeSubgroup === 'GROUP_SA_BASIS') {
          this.subGroupOptions.push(code);
        }
      });
    });

    this.createItem();
    this.premiumPaymentFreqOptions$ =
      this.quotationService.getPremiumFrequencyOptions(queryParams.get('pcd'));
    this.premiumPaymentFreqOptions$.subscribe((res) => {});

    this.coinsurersList = this.fb.array([
      new FormGroup({
        providerNo: new FormControl(null, Validators.required),
        providerFullName: new FormControl(null, Validators.required),
        lead: new FormControl(null, Validators.required),
        self: new FormControl(null, Validators.required),
        share: new FormControl(100, [
          Validators.required,
          Validators.max(100),
          Validators.min(1),
        ]),
      }),
    ]);

    this.subGroupsList = this.fb.array([
      new FormGroup({
        subGroupNo: new FormControl(1, Validators.required),
        subGroupName: new FormControl(null, Validators.required),
      }),
    ]);
    this.coverDetailsForm = this.fb.group({
      applicationDate: [
        formatDate(this.todate, 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],
      commencementDate: [
        formatDate(this.todate, 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],
      coverPeriod: new FormControl(null, Validators.required),
      coverMonths: new FormControl(null, Validators.required),
      coverDays: new FormControl(null, Validators.required),
      currency: new FormControl(null, Validators.required),
      premiumPaymentMethod: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      discountCode: new FormControl(null, Validators.required),
      discountRate: new FormControl(null, Validators.required),
      payAsYouGo: new FormControl(null, Validators.required),
      policyTerm: new FormControl(null, Validators.required),
      premiumPaymentTerm: new FormControl(null, Validators.required),
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
      isCoinsured: new FormControl(null, Validators.required),
      isSubGroup: new FormControl(null, Validators.required),
      covers: this.fb.array([]),
      coinsurersList: this.coinsurersList,
      subGroupValue: new FormControl(null, Validators.required),
      subGroupsList: this.subGroupsList,
      subGroupNoSingle: new FormControl(null, Validators.required),
      subGroupNameSingle: new FormControl(null, Validators.required),
    });
    this.disableCoverPeriod();
    this.getLeadProvider();
  }

  getSubGroups() {
    //this.coverDetailsForm.value?.subGroupValue.setValue(this.coverDetailsForm.value?.subgroupsList[0].subgroupNo);
    // this.coverDetailsForm.value?.subGroups[0].subgroupNo;
    // this.coverDetailsForm.value?.subGroups[0].subgroupNo;
  }

  disableCoverPeriod() {
    this.coverDetailsForm.controls['coverPeriod'].disable();
    this.coverDetailsForm.controls['coverMonths'].disable();
    this.coverDetailsForm.controls['coverDays'].disable();
  }

  saveCoinsured() {
    $('#checkbox_coinsured').prop('checked', true);
  }

  getDaysBetweenStartEndDate() {
    let months, years, days;
    let startDate = new Date(this.coverDetailsForm?.value?.commencementDate);
    let endDate = new Date(this.coverDetailsForm?.value?.endDate);

    years = endDate.getFullYear() - startDate.getFullYear();
    months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    months -= startDate.getMonth();
    months += endDate.getMonth();
    days = this.dateDifferenceInDays(endDate, startDate);

    this.coverDetailsForm.patchValue({
      coverPeriod: `${years} Years`,
      coverMonths: `${months} Mnth`,
      coverDays: `${days} Days`,
    });
  }

  dateDifferenceInDays(date2, date1) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(
      date1.getFullYear(),
      date1.getMonth(),
      date1.getDate()
    );
    const utc2 = Date.UTC(
      date2.getFullYear(),
      date2.getMonth(),
      date2.getDate()
    );

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  getClientName() {
    if (!this.providerForm.value.clientNo) {
    } else {
      this.quotationService
        .getClientDetails(this.providerForm?.value?.clientNo)
        .subscribe(
          (res) => {
            if (res !== null) {
              this.clientFullName = res?.fullName;
            } else {
              this.utilityService.notify('not found', 0);
            }
          },
          (err) => {
            this.utilityService.notify('not found', 0);
          }
        );
    }
  }

  search() {
    this.closeModal.nativeElement.click();
    let searchForm: any = this.providerForm.value;
    this.quotationService
      .searchProvider(this.providerForm.value?.providerName)
      .subscribe((res) => {
        let result: any = this.quotationService.findMatchingValue(res, {
          searchForm,
        });
        this.providerResult = result?.page?.content;
      });
  }

  openCoinsurerFinderModal(i: number) {
    this.utilityService.dialogOpener(
      CoinsurerFinderComponent,
      { width: '60vw' },
      (coupon) => {
        this.coinsurersList.controls[i].patchValue({ providerNo: coupon.no });
        this.getProviderFullname(i);
      }
    );
  }

  getProviderValues() {
    this.quotationService
      .searchProvider(this.providerForm.value?.providerName)
      .subscribe((res) => {
        if (res.length > 0) {
          this.validResult = 'true';
        } else {
          this.validResult = 'false';
        }
      });
  }

  saveStuff(state: string) {
    $(`.checkbox_${state}`).prop('checked', true);
  }

  saveSubGroup() {
    $(`#checkbox_subgroup_${this.subgroup_no}`).prop('checked', true);
  }

  getLeadProvider() {
    this.quotationService.getLeadProvider(this.userCode).subscribe(
      (res) => {
        console.log('Provider', res);
        const coinsurersList = <FormArray>(
          this.coverDetailsForm.get('coinsurersList')
        );
        coinsurersList.controls[0]
          .get('providerNo')
          .setValue(res?.coInsuranceIdentity);
        this.getProviderFullname(0);
      },
      () => {
        this.getProviderFullname(0);
      }
    );
  }

  providerHolder: String[] = [];
  getProviderFullname(i) {
    const num = this.coverDetailsForm?.value?.coinsurersList[i]?.providerNo;
    this.quotationService.getProviderNo(num).subscribe((data) => {
      this.coinsurer[i] = data?.fullName;
      if (this.providerHolder.length < i + 1) {
        this.providerHolder.push(data?.fullName);
      } else {
        this.providerHolder[i] = data?.fullName;
      }
    });
    console.log('begin');
    if (this.providerHolder.length <= 1) {
      if (this.providerHolder.length < 1) {
        console.log('here');
        this.providerHolder.push(null);
        this.getProviderFullname(0);
      }
      if (i >= this.providerHolder.length) {
        console.log('first case', this.providerHolder);
        this.isLead.push(true);
        $(`#isLead_${i}`).prop('checked', true);
        this.isSelf.push(true);
        $(`#isSelf_${i}`).prop('checked', true);
      } else {
        console.log('second case', this.providerHolder);
        this.isLead[i] = true;
        $(`#isLead_0`).prop('checked', true);
        console.log(document.getElementById('isLead_0'));
        this.isSelf[i] = true;
        $(`#isSelf_0`).prop('checked', true);
      }
    } else {
      console.log('length is not 1');
      if (i >= this.providerHolder.length) {
        if (i != 0) {
          console.log('first case', this.providerHolder);
          this.isLead.push(false);
          $(`#isLead_${i}`).prop('checked', false);
          this.isSelf.push(false);
          $(`#isSelf_${i}`).prop('checked', false);
        } else {
          console.log('second case', i);
          this.isLead[i] = true;
          $(`#isLead_0`).prop('checked', true);
          console.log(this.isLead[i], $(`#isLead_0`));
          this.isSelf[i] = true;
          $(`#isSelf_0`).prop('checked', true);
        }
      } else {
        console.log('third case');
        this.isLead[i] = true;
        $(`#isLead_${i}`).prop('checked', true);
        this.isSelf[i] = true;
        $(`#isSelf_${i}`).prop('checked', true);
      }
    }
  }

  createItems() {
    return this.fb.group({
      sa_basis: new FormControl(null, Validators.required),
      assuredName: new FormControl(null, Validators.required),
      assuredRel: new FormControl(null, Validators.required),
    });
  }

  async createItem(): Promise<void> {
    await this.stuff(this.product.code).then(() => {
      let cover = this.coverDetailsForm.get('covers') as FormArray;
      let i = 0;
      this.coverScreens.forEach((cov) => {
        if (cov.info.base == '1') {
          this.quotationService
            .getPremiumFrequencyOptions(cov.info.coverCode)
            .subscribe((data) => {
              this.quotationService
                .getFrequencyDescriptions()
                .subscribe((ele) => {
                  this.frqDesc = ele;
                  data.forEach((element) => {
                    this.frqDesc.forEach((desc) => {
                      if (element.frequency == desc.premFreq) {
                        this.freq.push({
                          freq: element.frequency,
                          desc: desc.description || 'null',
                        });
                      }
                    });
                  });
                });
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
          this.modal.push(null);
          this.isDependent.push(false);
          this.complete.push(true);
          this.basisDisabled.push(false);
          this.quotationService
            .getClientDetails(this.clientDetails.clientNo)
            .subscribe((data) => {
              const value = data ? data : { fullName: '' };
              this.client.push(value);
            });
          this.assuredRelToOwner$.push('Self');
        }

        if (cov.info.base == '1' || cov.info.mandatory == true) {
          this.quotationService
            .getDependentCovers(cov.info.coverCode)
            .subscribe((data) => {
              i = 0;
              let supindex = this.newCoverScreens.indexOf(cov);
              data.forEach((element, index) => {
                let loop = element?.info?.maxNo
                  ? Number(element.info.maxNo)
                  : 1;
                for (const key of [...Array(loop).keys()]) {
                  i++;
                  this.newCoverScreens.splice(supindex + index + i, 0, element);
                  this.isDependent.splice(supindex + index + i, 0, true);
                  this.coverScreens.splice(supindex + index + i, 0, element);
                  if ((element.info.base || element.info.mandatory) && i == 1) {
                    this.selected.splice(supindex + index + i, 0, true);
                  } else this.selected.splice(supindex + index + i, 0, false);
                  this.quotationService
                    .getCoverCode(element)
                    .then((data) =>
                      this.coverCodes.splice(supindex + index + i, 0, data.code)
                    );
                  this.modal.push(null);
                  this.complete.push(true);
                  this.basisDisabled.push(false);
                  this.quotationService
                    .getClientDetails(this.clientDetails.clientNo)
                    .subscribe((data) => {
                      const value = data ? data : { fullName: '' };
                      this.client.push(value);
                    });
                  cover.push(this.createItems());
                  this.assuredRelToOwner$.push('Self');
                }
              });
            });
        }
      });
    });
  }
  get assetId() {
    return this.coverDetailsForm.get('assetNo');
  }

  checkBasisDisabled(i) {
    if (this.coverDetailsForm.get('covers').value[i].sa_basis == 1) {
      this.basisDisabled[i] = true;
    } else {
      this.basisDisabled[i] = false;
    }
  }

  SgetSubGroupChecked(e, i) {
    console.log(
      `event checked${i}` + e.target.checked,
      this.coverDetailsForm.get('subGroupsList')
    );
    this.coverDetailsForm.get('subGroupsList').value[0].subGroupNo;
    if (e.target.checked) {
      let subGroupNo =
        this.coverDetailsForm.get('subGroupsList').value[i].subGroupNo;
      let subGroupName =
        this.coverDetailsForm.get('subGroupsList').value[i].subGroupName;
      this.coverDetailsForm.patchValue({
        subGroupNoSingle: subGroupNo,
        subGroupNameSingle: subGroupName,
      });
    }
  }

  setSelected(i) {
    this.selected[i] = this.selected[i] ? false : true;
    let cov = this.newCoverScreens[i];
    let cover = this.coverDetailsForm.get('covers') as FormArray;
    if (this.selected[i]) {
      if (cov.info.coverCode) {
        this.quotationService
          .getDependentCovers(cov.info.coverCode)
          .subscribe((data) => {
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
                .getClientDetails(this.clientDetails.clientNo)
                .subscribe((data) => {
                  const value = data ? data : { fullName: '' };
                  this.client.push(value);
                });
              cover.push(this.createItems());
              this.assuredRelToOwner$.splice(supindex + index + 1, 0, 'Self');
            });
          });
      }
    } else {
      if (cov.info.coverCode) {
        let supindex = this.newCoverScreens.indexOf(cov);
        this.quotationService
          .getDependentCovers(cov.info.coverCode)
          .subscribe((data) => {
            this.newCoverScreens.splice(supindex + 1, data.length);
            this.selected.splice(supindex + 1, data.length);
            this.modal.splice(supindex + 1, data.length);
            this.complete.splice(supindex + 1, data.length);
            this.client.splice(supindex + 1, data.length);
            this.assuredRelToOwner$.splice(supindex + 1, data.length);
            data.forEach((element, index) => {
              cover.removeAt(supindex + 1);
            });
          });
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

  changeDiscCode() {
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

  async showCoverScreen(e: Event, cover: any, i: number) {
    e.preventDefault();
    const coverCode = (await this.quotationService.getCoverCode(cover)).code;
    let description;
    let assured;
    this.quotationService
      .getSumAssured(
        this.newCoverScreens[i]?.info?.coverCode ||
          this.newCoverScreens[i]?.info?.riderCoverCode,
        this.coverDetailsForm?.value?.assetNo
      )
      .subscribe((data) => {
        assured = data;
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
            description = data.description;
            this.bl_modal.description = description;
          });
        this.quotationService
          .getExcessOptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            this.bl_modal.excess = data;
            if (data.defaultExcessAmount && data.defaultExcessRate) {
              this.bl_modal.excess_disabled = true;
              this.bl_modal.excess_display = `max(${data.defaultExcessRate}% Loss Amount, ${data.defaultExcessAmount})`;
            } else if (data.defaultExcessAmount) {
              this.bl_modal.excess_disabled = true;
              this.bl_modal.excess_display = data.defaultExcessAmount;
            } else if (data.defaultExcessRate) {
              this.bl_modal.excess_disabled = true;
              this.bl_modal.excess_display = data.defaultExcessRate;
            } else {
              this.bl_modal.excess_disabled = false;
              this.bl_modal.excess_display = '';
              this.bl_modal.excess_min = data.minExcess;
              this.bl_modal.excess_max = data.maxExcess;
            }
          });
        this.quotationService
          .getDeductibleOptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            this.bl_modal.deductible = data;
            if (data.defaultDeductibleAmount && data.defaultDeductibleRate) {
              this.bl_modal.deductible_disabled = true;
              this.bl_modal.deductible_display = `max(${data.defaultDeductibleRate}% Loss Amount, ${data.defaultExcessAmount})`;
            } else if (data.defaultDeductibleAmount) {
              this.bl_modal.deductible_disabled = true;
              this.bl_modal.deductible_display = data.defaultDeductibleAmount;
            } else if (data.defaultDeductibleRate) {
              this.bl_modal.deductible_disabled = true;
              this.bl_modal.deductible_display = data.defaultDeductibleRate;
            } else {
              this.bl_modal.deductible_disabled = false;
              this.bl_modal.deductible_display = '';
              this.bl_modal.deductible_min = data.minDeductible;
              this.bl_modal.deductible_max = data.maxDeductible;
            }
          });
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
        this.quotationService
          .getExcessOptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            this.dr_modal.excess = data;
            if (data.defaultExcessAmount && data.defaultExcessRate) {
              this.dr_modal.excess_disabled = true;
              this.dr_modal.excess_display = `max(${data.defaultExcessRate}% Loss Amount, ${data.defaultExcessAmount})`;
            } else if (data.defaultExcessAmount) {
              this.dr_modal.excess_disabled = true;
              this.dr_modal.excess_display = data.defaultExcessAmount;
            } else if (data.defaultExcessRate) {
              this.dr_modal.excess_disabled = true;
              this.dr_modal.excess_display = data.defaultExcessRate;
            } else {
              this.dr_modal.excess_disabled = false;
              this.dr_modal.excess_display = '';
              this.dr_modal.excess_min = data.minExcess;
              this.dr_modal.excess_max = data.maxExcess;
            }
          });
        this.quotationService
          .getDeductibleOptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            this.dr_modal.deductible = data;
            if (data.defaultDeductibleAmount && data.defaultDeductibleRate) {
              this.dr_modal.deductible_disabled = true;
              this.dr_modal.deductible_display = `max(${data.defaultDeductibleRate}% Loss Amount, ${data.defaultExcessAmount})`;
            } else if (data.defaultDeductibleAmount) {
              this.dr_modal.deductible_disabled = true;
              this.dr_modal.deductible_display = data.defaultDeductibleAmount;
            } else if (data.defaultDeductibleRate) {
              this.dr_modal.deductible_disabled = true;
              this.dr_modal.deductible_display = data.defaultDeductibleRate;
            } else {
              this.dr_modal.deductible_disabled = false;
              this.dr_modal.deductible_display = '';
              this.dr_modal.deductible_min = data.minDeductible;
              this.dr_modal.deductible_max = data.maxDeductible;
            }
          });
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
                this.lil_modal.assured = result.AllowedSumAssured;
              }
            } else {
            }
          });
        if (Array.isArray(assured)) {
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
            description = data.description;
            this.acc_modal.description = description;
          });
        this.quotationService
          .getExcessOptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            this.acc_modal.excess = data;
            if (data.defaultExcessAmount && data.defaultExcessRate) {
              this.acc_modal.excess_disabled = true;
              this.acc_modal.excess_display = `max(${data.defaultExcessRate}% Loss Amount, ${data.defaultExcessAmount})`;
            } else if (data.defaultExcessAmount) {
              this.acc_modal.excess_disabled = true;
              this.acc_modal.excess_display = data.defaultExcessAmount;
            } else if (data.defaultExcessRate) {
              this.acc_modal.excess_disabled = true;
              this.acc_modal.excess_display = data.defaultExcessRate;
            } else {
              this.acc_modal.excess_disabled = false;
              this.acc_modal.excess_display = '';
              this.acc_modal.excess_min = data.minExcess;
              this.acc_modal.excess_max = data.maxExcess;
            }
          });
        this.quotationService
          .getDeductibleOptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            this.acc_modal.deductible = data;
            if (data.defaultDeductibleAmount && data.defaultDeductibleRate) {
              this.acc_modal.deductible_disabled = true;
              this.acc_modal.deductible_display = `max(${data.defaultDeductibleRate}% Loss Amount, ${data.defaultExcessAmount})`;
            } else if (data.defaultDeductibleAmount) {
              this.acc_modal.deductible_disabled = true;
              this.acc_modal.deductible_display = data.defaultDeductibleAmount;
            } else if (data.defaultDeductibleRate) {
              this.acc_modal.deductible_disabled = true;
              this.acc_modal.deductible_display = data.defaultDeductibleRate;
            } else {
              this.acc_modal.deductible_disabled = false;
              this.acc_modal.deductible_display = '';
              this.acc_modal.deductible_min = data.minDeductible;
              this.acc_modal.deductible_max = data.maxDeductible;
            }
          });
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
        this.quotationService
          .getCoverScreenDescriptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            description = data.description;
            this.tp_modal.description = description;
          });
        //this.modal[i] = this.tp_modal.thirdPartyForm.value
        this.tp_modal.code = coverCode;
        this.tp_modal.mvAdj = this.coverDetailsForm.get(
          'marketValueBySystem'
        ).value;
        this.quotationService
          .getExcessOptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            this.tp_modal.excess = data;
            if (data.defaultExcessAmount && data.defaultExcessRate) {
              this.tp_modal.excess_disabled = true;
              this.tp_modal.excess_display = `max(${data.defaultExcessRate}% Loss Amount, ${data.defaultExcessAmount})`;
            } else if (data.defaultExcessAmount) {
              this.tp_modal.excess_disabled = true;
              this.tp_modal.excess_display = data.defaultExcessAmount;
            } else if (data.defaultExcessRate) {
              this.tp_modal.excess_disabled = true;
              this.tp_modal.excess_display = data.defaultExcessRate;
            } else {
              this.tp_modal.excess_disabled = false;
              this.tp_modal.excess_display = '';
              this.tp_modal.excess_min = data.minExcess;
              this.tp_modal.excess_max = data.maxExcess;
            }
          });
        this.quotationService
          .getDeductibleOptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            this.tp_modal.deductible = data;
            if (data.defaultDeductibleAmount && data.defaultDeductibleRate) {
              this.tp_modal.deductible_disabled = true;
              this.tp_modal.deductible_display = `max(${data.defaultDeductibleRate}% Loss Amount, ${data.defaultExcessAmount})`;
            } else if (data.defaultDeductibleAmount) {
              this.tp_modal.deductible_disabled = true;
              this.tp_modal.deductible_display = data.defaultDeductibleAmount;
              this.tp_modal.thirdPartyForm
                .get('deductible')
                .setValue(data.defaultDeductibleAmount);
            } else if (data.defaultDeductibleRate) {
              this.tp_modal.deductible_disabled = true;
              this.tp_modal.deductible_display = data.defaultDeductibleRate;
              this.tp_modal.thirdPartyForm
                .get('deductible')
                .setValue(data.defaultDeductibleRate);
            } else {
              this.tp_modal.deductible_disabled = false;
              this.tp_modal.deductible_display = '';
              this.tp_modal.deductible_min = data.minDeductible;
              this.tp_modal.deductible_max = data.maxDeductible;
            }
          });
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
        this.quotationService
          .getExcessOptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            this.pc_modal.excess = data;
            if (data.defaultExcessAmount && data.defaultExcessRate) {
              this.pc_modal.excess_disabled = true;
              this.pc_modal.excess_display = `max(${data.defaultExcessRate}% Loss Amount, ${data.defaultExcessAmount})`;
            } else if (data.defaultExcessAmount) {
              this.pc_modal.excess_disabled = true;
              this.pc_modal.excess_display = data.defaultExcessAmount;
            } else if (data.defaultExcessRate) {
              this.pc_modal.excess_disabled = true;
              this.pc_modal.excess_display = data.defaultExcessRate;
            } else {
              this.pc_modal.excess_disabled = false;
              this.pc_modal.excess_display = '';
              this.pc_modal.excess_min = data.minExcess;
              this.pc_modal.excess_max = data.maxExcess;
            }
          });
        this.quotationService
          .getDeductibleOptions(
            this.newCoverScreens[i].info.coverCode ||
              this.newCoverScreens[i].info.riderCoverCode
          )
          .subscribe((data) => {
            this.pc_modal.deductible = data;
            if (data.defaultDeductibleAmount && data.defaultDeductibleRate) {
              this.pc_modal.deductible_disabled = true;
              this.pc_modal.deductible_display = `max(${data.defaultDeductibleRate}% Loss Amount, ${data.defaultExcessAmount})`;
            } else if (data.defaultDeductibleAmount) {
              this.pc_modal.deductible_disabled = true;
              this.pc_modal.deductible_display = data.defaultDeductibleAmount;
            } else if (data.defaultDeductibleRate) {
              this.pc_modal.deductible_disabled = true;
              this.pc_modal.deductible_display = data.defaultDeductibleRate;
            } else {
              this.pc_modal.deductible_disabled = false;
              this.pc_modal.deductible_display = '';
              this.pc_modal.deductible_min = data.minDeductible;
              this.pc_modal.deductible_max = data.maxDeductible;
            }
          });
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
            this.sav_modal.description = description;
          });
        //this.modal[i] = this.sav_modal.savingsForm.value
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
        };
        if (!this.modal[i]) {
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
          this.lic_modal.lifeForm.setValue(this.modal[i]);
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

  showRp1Modal() {
    $('#rt1modal').modal('show');
  }

  showRp2Modal() {
    $('#rt2modal').modal('show');
  }

  showRp3Modal() {
    $('#rt3modal').modal('show');
  }

  showRp4Modal() {
    $('#rt4modal').modal('show');
  }

  showRp5Modal() {
    $('#rt5modal').modal('show');
  }

  showRp6Modal() {
    $('#rt6modal').modal('show');
  }

  uncheckrp1() {
    this.isRp1Check = false;
  }

  checkrp1() {
    this.isRp1Check = true;
  }

  hideRp1Modal() {
    $('#rt1modal').modal('hide');
  }

  setPlan(element: any) {
    if (element.value == 'DDebit') {
      $('#paymentMethodModal').modal('show');
    }
  }

  coinCounter() {
    return new Array(this.nbofCoin);
  }

  coiInc() {
    this.nbofCoin = this.nbofCoin + 1;
  }

  coinInc() {
    const value = 100 / (this.coinsurersList.length + 1);
    const b = new FormGroup({
      providerNo: new FormControl(null, Validators.required),
      providerFullName: new FormControl(null, [
        Validators.required,
        Validators.max(100),
        Validators.min(1),
      ]),
      lead: new FormControl(null, [Validators.required]),
      self: new FormControl(null, [Validators.required]),
      share: new FormControl(value, [Validators.required]),
    });
    const coinsurersList = <FormArray>(
      this.coverDetailsForm.get('coinsurersList')
    );
    for (let i = 0; i < this.coinsurersList.length; i++) {
      coinsurersList.controls[i].get('share').setValue(value);
    }

    this.coinsurer.push('');
    this.isLead.push(false);
    $(`#isLead_${this.isLead.length - 1}`).prop('checked', false);
    this.isSelf.push(false);
    this.coinsurersList.push(b);
  }

  coinDel(i) {
    if (
      this.coinsurersList.length > 1 &&
      this.isLead.includes(true) &&
      this.isSelf.includes(true) &&
      i != 0 &&
      !this.isLead[i] &&
      !this.isSelf[i]
    ) {
      this.coinsurersList.removeAt(i);
      this.coinsurer.splice(i, 1);
      this.isLead.splice(i, 1);
      this.isSelf.splice(i, 1);

      const value = 100 / this.coinsurersList.length;
      const coinsurersList = <FormArray>(
        this.coverDetailsForm.get('coinsurersList')
      );
      for (let j = 0; j < this.coinsurersList.length; j++) {
        coinsurersList.controls[j].get('share').setValue(value);
      }
    }
  }

  getCheckedItemList() {}

  onCheckboxChange(e, c) {
    const coinsurersList = <FormArray>(
      this.coverDetailsForm.get('coinsurersList')
    );
    for (let i = 0; i < this.coinsurersList.length; i++) {
      if (e.target.checked[i] === true) {
        if ((this.checkArray.length = 1)) {
          this.checkArray[i] = e.target.checked[i];
        } else {
          let cValue = coinsurersList.controls[i].get('lead')?.value;
          cValue = true;
          this.checkArray.push(cValue);
        }
      }
    }
  }

  sgCounter() {
    return new Array(this.nbofSg);
  }

  sgInc() {
    const b = new FormGroup({
      subGroupNo: new FormControl(
        this.subGroupsList.length + 1,
        Validators.required
      ),
      subGroupName: new FormControl(null, [
        Validators.required,
        Validators.max(100),
        Validators.min(1),
      ]),
    });
    this.subGroupL.push('');
    this.subGroupsList.push(b);
  }

  sgDel(i) {
    if (this.subGroupsList.length < 1) {
      this.subGroupsList.removeAt(i);
      this.subGroupL.splice(i, 1);
    }
  }

  getSubGroupChecked(e, i) {
    e.preventDefault();
    this.subgroup_no = i;
    this.coverDetailsForm.get('subGroupsList').value[0].subGroupNo;
    if (e.target.checked) {
      let subGroupNo =
        this.coverDetailsForm.get('subGroupsList').value[i].subGroupNo;
      let subGroupName =
        this.coverDetailsForm.get('subGroupsList').value[i].subGroupName;
      this.coverDetailsForm.patchValue({
        subGroupNoSingle: subGroupNo,
        subGroupNameSingle: subGroupName,
      });
    }
  }

  checkLead(event: Event, i) {
    if (this.isLead.length > 1) {
      if (this.isLead.includes(true)) {
        if (this.isLead.indexOf(true) == i) {
          this.isLead[i] = !this.isLead[i];
          $(`#isLead_${i}`).prop('checked', this.isLead[i]);
        } else {
          event.preventDefault();
          this.isLead[i] = false;
          $(`#isLead_${i}`).prop('checked', this.isLead[i]);
        }
      } else {
        this.isLead[i] = !this.isLead[i];
        $(`#isLead_${i}`).prop('checked', this.isLead[i]);
      }
    } else if (this.isLead.includes(true)) {
      event.preventDefault();
    }
  }

  checkSelf(event: Event, i) {
    if (i == 0) {
      // if (this.isSelf.includes(true)){
      //   if (this.isSelf.indexOf(true) == i){
      //     this.isSelf[i] = !this.isSelf[i]
      //     $(`#isSelf_${i}`).prop('checked', this.isSelf[i])
      //   } else {
      //     event.preventDefault()
      //     this.isSelf[i] = false
      //     $(`#isSelf_${i}`).prop('checked', this.isSelf[i])
      //   }
      // } else {
      //   this.isSelf[i] = !this.isSelf[i]
      $(`#isSelf_${i}`).prop('checked', true);
    } else {
      // if (this.isSelf.includes(true))
      event.preventDefault();
      $(`#isSelf_${i}`).prop('checked', false);
    }
  }

  rsaCounter() {
    return new Array(this.nbofRsa);
  }

  rsaInc() {
    this.nbofRsa = this.nbofRsa + 1;
  }

  memberCounter() {
    return new Array(this.nbofMember);
  }

  memberInc() {
    this.nbofMember = this.nbofMember + 1;
  }
}
