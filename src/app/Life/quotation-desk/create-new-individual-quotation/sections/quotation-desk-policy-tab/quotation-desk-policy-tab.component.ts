import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IBenefitPaymentFreq,
  ICoversDetails,
  ICurrency,
  IDiscountCode,
  IPremiumFrequency,
  IPremiumPaymentMethod,
  ITargetContributionFreq,
} from '../../../../services/quotation.interface';
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
import { Quote } from '@angular/compiler';

@Component({
  selector: 'app-quotation-desk-policy-tab',
  templateUrl: './quotation-desk-policy-tab.component.html',
  styleUrls: ['./quotation-desk-policy-tab.component.scss'],
})
export class QuotationDeskPolicyTabComponent implements OnInit {
  clientNo: string;
  currencyOptions$: Set<any>;
  premiumPaymentMethodOptions$: Observable<IPremiumPaymentMethod[]>;
  discountCodeOptions$: Observable<IDiscountCode[]> =
    this.quotationService.getDiscountCodeOptions();
  premiumPaymentFreqOptions$: Observable<IPremiumFrequency[]>;
  benefitPaymentFreqOptions$: Observable<IBenefitPaymentFreq[]> =
    this.quotationService.getBenefitPaymentFreqOptions();
  todate: Date;
  client: any[] = [];
  frq: any[] = [];
  frqDesc: any[] = [];
  freq: Set<any> | any[] = new Set();
  defaultPremFreq: any;
  allowedPolicyTermYears: any[] = [];
  allowedPolicyTermMonths: any[] = [];
  allowedPremPayTermMonths: any[] = [];
  allowedPremPayTermYears: any[] = [];

  policyForm: FormGroup;

  coverScreens: ICoversDetails[];

  termList: boolean = false;
  premtermList: boolean = false;
  termDisabled: boolean = false;
  premtermDisabled: boolean = true;
  premfreqDisabled: boolean = false;
  freqList: boolean = true;
  default: any;
  defaultPremTerm: any;
  defaultPremMonths: any;
  maxPolicyYear: any = '';
  minPolicyYear: any = '';
  maxPolicyMonth: any = '';
  minPolicyMonth: any = '';
  quoteNo: any;

  product: {
    code: string;
    description: string;
  };

  paymentMethod: any;
  queryParams: any;

  get formValue() {
    return this.policyForm.value;
  }

  constructor(
    private quotationService: QuotationService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private fQS: FindQuotationService
  ) {}

  ngOnInit(): void {
    this.queryParams = this.route.snapshot.queryParamMap;
    this.quotationService
      .getMoreTerms('SV2')
      .toPromise()
      .then((data) => {
        console.log('product info', data);
      });
    this.clientNo = this.route.snapshot.queryParams['clientNo'];
    this.premiumPaymentMethodOptions$ =
      this.quotationService.getPremiumPaymentMethods();

    const queryParams = this.route.snapshot.queryParamMap;
    this.quotationService
      .getCurrencyOptions(queryParams.get('pcd'))
      .subscribe((data) => {
        console.log('currency', data);
        data.forEach((option) => {
          this.currencyOptions$ = new Set();
          this.currencyOptions$.add({
            description: option.description,
            validCurrency: option.validCurrency,
          });
        });
      });

    this.todate = new Date(Date.now());

    this.product = {
      code: queryParams.get('pcd'),
      description: queryParams.get('pdsc'),
    };

    this.createItem();
    this.policyForm = this.fb.group({
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
    });

    this.quoteNo = queryParams.get('quoteNo');
    if (this.quoteNo) this.getQuoteInfo(this.quoteNo);
  }

  async getQuoteInfo(quoteNo: string) {
    const quote = await this.fQS.getQuote(quoteNo);
    const covers = await this.fQS.getQuoteCover(quoteNo).toPromise();
    this.policyForm.patchValue({
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

  async stuff(code) {
    this.coverScreens = await this.getCoverScreen(code);
  }

  async getCoverScreen(code): Promise<ICoversDetails[]> {
    let result;
    result = await this.quotationService.getCoverScreens(code).toPromise();
    return result;
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

  async createItem(): Promise<void> {
    console.log('creating...');
    await this.stuff(this.product.code).then(async () => {
      const queryParams = this.route.snapshot.queryParamMap;
      const baseCover = this.coverScreens.find(({ info }) => info.base);
      this.freq = await this.getPremiumFrequency(baseCover.info.coverCode);
      const policyTerm = await this.getPolicyTerms(
        baseCover.info.coverCode,
        queryParams.get('pcd')
      );
      console.log('policyterm', policyTerm);
      if (policyTerm.defaultPolicyTerm) {
        this.termList = false;
        this.termDisabled = true;
        this.policyForm.patchValue({
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
        this.policyForm.patchValue({
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
        console.log(this.maxPolicyMonth, this.minPolicyMonth);
        this.termList = false;
        this.termDisabled = false;
      }
      if (!policyTerm) {
        this.termList = false;
        this.termDisabled = false;
      }
      this.coverScreens.forEach((cov) => {
        if (cov.info.base) {
          this.quotationService
            .getPolicyTerms(cov.info.coverCode)
            .subscribe((data) => {
              console.log('default', cov, data);
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
                    ? this.policyForm.patchValue({
                        premiumPaymentTermMonths: data.fixedPremPayTermMonth,
                      })
                    : '';
                  data.fixedPremPayTermYear
                    ? this.policyForm.patchValue({
                        premiumPaymentTermYears: data.fixedPremPayTermYear,
                      })
                    : '';
                }
              }
            });
          //this.premiumPaymentFreqOptions$ = this.quotationService.getPremiumFrequencyOptions(cov.info.coverCode)
        }
      });
    });
  }

  changeDiscCode() {
    let data = {
      applicationDate: formatDate(
        this.policyForm.get('applicationDate').value,
        'dd/MM/yyyy',
        'en'
      ),
      discountCode: this.policyForm.value.discountCode,
    };
    this.quotationService
      .getDiscountRate(data)
      .subscribe((data) =>
        this.policyForm.patchValue({ discountRate: data.response.rate })
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
    if (defaults.premiumFrequency) {
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
