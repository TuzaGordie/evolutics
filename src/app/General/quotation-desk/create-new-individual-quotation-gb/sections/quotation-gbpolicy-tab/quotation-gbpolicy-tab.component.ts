import { Component, OnInit, ViewChild } from '@angular/core';
import { BuildingComponent } from '../../modals/covers/building/building.component';
import { DefenseRecourseComponent } from '../../modals/covers/defense-recourse/defense-recourse.component';
import { LifeInsuranceComponent } from '../../modals/covers/life-insurance/life-insurance.component';
import { MotorAccessoriesComponent } from '../../modals/covers/motor-accessories/motor-accessories.component';
import { MotorThirdPartyComponent } from '../../modals/covers/motor-third-party/motor-third-party.component';
import { SavingsComponent } from '../../modals/covers/savings/savings.component';
import { PropertyContentComponent } from '../../modals/covers/property-content/property-content.component';
import { MarineCargoComponent } from '../../modals/covers/marine-cargo/marine-cargo.component';
import { MarineHullComponent } from '../../modals/covers/marine-hull/marine-hull.component';
import { BondComponent } from '../../modals/covers/bond/bond.component';
import { LifeRiskComponent } from '../../modals/covers/life-risk/life-risk.component';
import { LifeCreditComponent } from '../../modals/covers/life-credit/life-credit.component';
import { EndowmentComponent } from '../../modals/covers/endowment/endowment.component';
import { LifeAnnuityComponent } from '../../modals/covers/life-annuity/life-annuity.component';
import {
  IBenefitPaymentFreq,
  IClientDetails,
  ICoversDetails,
  ICurrency,
  IDiscountCode,
  IPremiumFrequency,
  IPremiumPaymentMethod,
  ITargetContributionFreq,
} from '../../../../services/quotation.interface';
import { Observable, of, throwError } from 'rxjs';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { QuotationService } from '../../../../services/quotation-service.service';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { FindQuotationService } from '../../../service/find-quotation.service';

@Component({
  selector: 'app-quotation-gbpolicy-tab',
  templateUrl: './quotation-gbpolicy-tab.component.html',
  styleUrls: ['./quotation-gbpolicy-tab.component.scss'],
})
export class QuotationGBPolicyTabComponent implements OnInit {
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
  freq: Set<any> | any[] = new Set();
  defaultPremFreq: any;
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
  maxPolicyYear: any = '';
  minPolicyYear: any = '';
  maxPolicyMonth: any = '';
  minPolicyMonth: any = '';
  termList: boolean = false;
  premtermList: boolean = false;
  termDisabled: boolean = false;
  premtermDisabled: boolean = true;
  premfreqDisabled: boolean = false;
  freqList: boolean = true;
  default: any;
  defaultPremTerm: any;
  defaultPremMonths: any;
  quoteNo: any;

  product: {
    code: string;
    description: string;
  };

  paymentMethod: any;
  systemSelect: string = 'motor';
  isRp1Check: boolean = false;
  queryParams: any;
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

  ngOnInit(): void {
    const queryParams = (this.queryParams = this.route.snapshot.queryParamMap);

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
    // console.log(this.currencyOptions$);

    this.todate = new Date(Date.now());

    this.product = {
      code: queryParams.get('pcd'),
      description: queryParams.get('pdsc'),
    };

    this.createItem();
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
    if (quoteNo) this.getQuoteInfo(quoteNo);
  }

  async getQuoteInfo(quoteNo: string) {
    const quote = await this.fQS.getQuote(quoteNo);
    const covers = await this.fQS.getQuoteCover(quoteNo).toPromise();
    this.coverDetailsForm.patchValue({
      applicationDate: formatDate(quote.applDate, 'yyyy-MM-dd', 'en'),
      commencementDate: formatDate(quote.commenceDate, 'yyyy-MM-dd', 'en'),
      currency: quote.currency,
      premiumPaymentMethod: quote.payinMethod,
      discountCode: covers[0].discCode,
      discountRate: quote.discountRate,
      payAsYouGo: quote.payG,
      policyTermYears: quote.policyTermDays
        ? Math.floor(Number(quote.policyTermDays) / 365)
        : null,
      policyTermMonths: quote.policyTermDays
        ? Math.floor((Number(quote.policyTermDays) % 365) / 12)
        : null,
      policyTermDays: quote.policyTermDays
        ? (Number(quote.policyTermDays) % 365) % 12
        : null,
      premiumPaymentTermYears: quote.premPayTermMo
        ? Math.floor(Number(quote.premPayTermMo) / 365)
        : null,
      premiumPaymentTermMonths: quote.premPayTermMo
        ? Math.floor((Number(quote.premPayTermMo) % 365) / 12)
        : null,
      premiumPaymentTermDays: quote.premPayTermMo
        ? (Number(quote.premPayTermMo) % 365) % 12
        : null,
      premiumPayFreq: quote.payinFreq,
    });
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
    await this.stuff(this.product.code).then(async () => {
      const queryParams = this.route.snapshot.queryParamMap;
      const baseCover = this.coverScreens.find(({ info }) => info.base);
      this.freq = await this.getPremiumFrequency(baseCover.info.coverCode);
      console.log(this.freq);
      const policyTerm = await this.getPolicyTerms(
        baseCover.info.coverCode,
        queryParams.get('pcd')
      );
      console.log('policyterm', policyTerm);
      if (policyTerm.defaultPolicyTerm) {
        this.termList = false;
        this.termDisabled = true;
        this.coverDetailsForm.patchValue({
          policyTermMonths: policyTerm.defaultPolicyTerm % 12,
          policyTermYears: Math.floor(policyTerm.defaultPolicyTerm / 12),
        });
      }
      if (
        policyTerm.allowedPolicyTermMonths ||
        policyTerm.allowedPolicyTermYears
      ) {
        this.termList = true;
        this.allowedPolicyTermMonths = policyTerm.allowedPolicyTermMonths;
        this.allowedPolicyTermYears = policyTerm.allowedPolicyTermYears;
      }
      if (policyTerm.fixedMonths || policyTerm.fixedYears) {
        this.termList = false;
        this.termDisabled = true;
        this.coverDetailsForm.patchValue({
          policyTermMonths: policyTerm.fixedMonths,
          policyTermYears: policyTerm.fixedYears,
        });
      }
      if (
        policyTerm.maximumMonths ||
        policyTerm.minimumMonths ||
        policyTerm.maximumYears ||
        policyTerm.minimumYears
      ) {
        this.maxPolicyMonth = policyTerm.maximumMonths;
        this.minPolicyMonth = policyTerm.minimumMonths;
        this.maxPolicyYear = policyTerm.maximumYears;
        this.minPolicyYear = policyTerm.minimumYears;
        this.termList = false;
        this.termDisabled = false;
      }
      if (!policyTerm) {
        this.termList = false;
        this.termDisabled = false;
      }
      this.coverScreens.forEach(async (cov) => {
        if (cov.info.base) {
          this.quotationService
            .getPolicyTerms(cov.info.coverCode)
            .subscribe((data) => {
              if (Array.isArray(data)) {
                if (
                  data[0]?.allowedPremPayTermYear ||
                  data[0]?.allowedPremPayTermMonth
                ) {
                  this.premtermList = true;
                  this.premtermDisabled = false;
                  this.defaultPremTerm = data;
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
                if (data?.fixedPremPayTermMonth || data?.FixedPremPayTermYear) {
                  this.premtermList = false;
                  this.premtermDisabled = true;
                  this.defaultPremTerm = data;
                  data.fixedPremPayTermMonth
                    ? this.coverDetailsForm.patchValue({
                        premiumPaymentTermMonths: data.fixedPremPayTermMonth,
                      })
                    : '';
                  data.fixedPremPayTermYear
                    ? this.coverDetailsForm.patchValue({
                        premiumPaymentTermYears: data.fixedPremPayTermYear,
                      })
                    : '';
                }
              }
            });
          //this.premiumPaymentFreqOptions$ = this.quotationService.getPremiumFrequencyOptions(cov.info.coverCode
        }
      });
    });
  }
  get assetId() {
    return this.coverDetailsForm.get('assetNo');
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
          }
          // err => console.log(err),
          // () => console.log('finished')
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
          }
          // err => console.log(err),
          // () => console.log('finished')
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

  async getPolicyTerms(coverCode, productCode) {
    const defaults = await this.quotationService
      .getDefaultOptions(productCode)
      .toPromise();
    if (defaults?.policyTerm)
      return {
        defaultPolicyTerm: defaults.policyTerm,
      };
    let terms = await this.quotationService
      .getPolicyTerms(coverCode)
      .toPromise();
    if (terms) {
      terms = terms.filter(
        (option) => option.policyTermMonth || option.allowedPolicyTermYear
      );
      if (terms.length) {
        let [months, years] = [[], []];
        terms.map(
          ({ policyTermMonth }) =>
            policyTermMonth && months.push(policyTermMonth)
        );
        terms.map(
          ({ allowedPolicyTermYear }) =>
            allowedPolicyTermYear && years.push(allowedPolicyTermYear)
        );
        if (months.length || years.length)
          return {
            allowedPolicyTermMonths: months,
            allowedPolicyTermYears: years,
          };
      }
    }
    terms = (await this.quotationService.getMoreTerms(coverCode).toPromise())
      .coversTerms;
    if (terms?.fixedPolicyTermYears || terms?.fixedPolicyTermMonths)
      return {
        fixedYears: terms.fixedPolicyTermYears,
        fixedMonths: terms.fixedPolicyTermMonths,
      };
    if (
      terms?.minimumPolicyTermYears ||
      terms?.maximumPolicyTermYears ||
      terms?.minimumPolicyTermMonths ||
      terms?.maximumPolicyTermMonths
    )
      return {
        minimumYears: terms?.minimumPolicyTermYears,
        maximumYears: terms?.maximumPolicyTermYears,
        minimumMonths: terms?.minimumPolicyTermMonths,
        maximumMonths: terms?.maximumPolicyTermMonths,
      };
    return {};
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

  async getPremiumFrequency(
    coverCode,
    productCode = this.queryParams.get('pcd')
  ) {
    let frequencies = await this.quotationService
      .getPremiumFrequencyOptions(coverCode)
      .toPromise();
    const descriptions = await this.quotationService
      .getFrequencyDescriptions()
      .toPromise();
    const defaults = await this.quotationService
      .getDefaultOptions(productCode)
      .toPromise();
    if (defaults?.premiumFrequency) {
      return [
        {
          freq: defaults.premiumFrequency,
          desc: descriptions.find(
            ({ premFreq }) => premFreq == defaults.premiumFrequency
          ).description,
        },
      ];
    }
    let frequencs = new Set(frequencies.map((f) => f.frequency));
    let frequency = [...frequencs];
    let results = [];
    results = frequency.map((f) => {
      return {
        freq: f,
        desc: descriptions.find(({ premFreq }) => premFreq == f).description,
      };
    });
    return results;
  }
}
