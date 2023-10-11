import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindProductService } from '../../../service/find-product.service';
import {
  Basic,
  CoversPayoutMethod,
  CreateBasic,
  CreateCoverCode,
} from '../../cover-code';
import {
  CompaniesAllowed,
  CurrencyAllowed,
  PaymentOutMethodAllowed,
} from '../../cover-code-child';
import { CoverService } from '../../cover-service.service';

@Component({
  selector: 'app-cover-basic',
  templateUrl: './cover-basic.component.html',
  styleUrls: ['./cover-basic.component.scss'],
})
export class CoverBasicComponent implements OnInit {
  @Input() createCoverCode: CreateCoverCode;
  @Input() loading = false;
  @Input() isCreate: boolean;
  @Input() loadingText = '';
  @Input() paymentMethodsList: any[];
  @Input() action: string;
  @ViewChildren('inp') inputs: QueryList<any>;
  @Input() coverCode: string;
  validators = Validators;
  insuranceTypeList: any[] = [];
  coverScreenList: any = [];
  interestCalBasisList: any = [];
  quoteValidityBasisList: any[] = [];
  interestTableList: any = [];
  issueDateList: any = [];
  providerCategoryList: any = [];
  @Input() providerCodes: any[];
  currenciesList: any = [];
  companiesList: any[] = [];

  basic = new Basic();

  companiesAllowed = new CompaniesAllowed();
  payoutMethod = new PaymentOutMethodAllowed();

  selectPayoutMethods: PaymentOutMethodAllowed[] = [];

  providerCat: string;

  constructor(
    public findProductService: FindProductService,
    public coverService: CoverService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private codeService: CodeService,
    private router: Router,
    private route: ActivatedRoute,
    private util: UtilityService,
    private companyService: CompanyService
  ) {}
  ngAfterViewInit(): void {
    this.coverService.disableInputs(this.inputs);
    // this.coverService.markAll(this.inputs);
  }
  ngOnInit(): void {
    this.setCurrenciesList();
    this.setInsuranceTypeList();
    this.setIssueDate();
    this.setProductCategory();
    this.setRateCodeAndDescList();
    this.setQuoteValidityBase();
    this.setInterestBasis();
    this.setCoverScreen();
    this.setCompanyAllowed();

    if (!this.coverService.isCreate ) {
      this.loading = true;
      this.loadingText = 'Fetching Cover Basic.....';
      this.findProductService.getBasic(this.coverCode).subscribe(
        (data: CreateBasic) => {
          this.loading = false;

          if (data == null) {
            this.createCoverCode.basic = new CreateBasic(
              this.basic,
              [this.companiesAllowed],
              [this.payoutMethod]
            );

            return;
          }
          this.createCoverCode.basic.basic = data.basic;

          this.createCoverCode.basic.coversCompanies = [];
          this.createCoverCode.basic.coversPayoutMethod = [];
          this.createCoverCode.basic.basic.currencyAllowed = [];

          data.coversCompanies &&
            data.coversCompanies.map((company, i) => {
              if (this.coverService.isClone) delete company.id;
              company.rowId = i;
              this.createCoverCode.basic.coversCompanies.push(company);
            });

          data.coversPayoutMethod &&
            data.coversPayoutMethod.map((paymentOutMethodAllowed, i) => {
              if (this.coverService.isClone) delete paymentOutMethodAllowed.id;
              paymentOutMethodAllowed.rowId = i;
              this.createCoverCode.basic.coversPayoutMethod.push(
                paymentOutMethodAllowed
              );
            });

          if (
            this.createCoverCode.basic.basic.currencyAllowed &&
            this.createCoverCode.basic.basic.currencyAllowed.length < 1
          )
            this.createCoverCode.basic.basic.currencyAllowed.push(
              new CurrencyAllowed()
            );
          if (
            this.createCoverCode.basic.coversCompanies &&
            this.createCoverCode.basic.coversCompanies.length < 1
          )
            this.createCoverCode.basic.coversCompanies.push(
              new CompaniesAllowed()
            );
          if (
            this.createCoverCode.basic.coversPayoutMethod &&
            this.createCoverCode.basic.coversPayoutMethod.length < 1
          )
            this.createCoverCode.basic.coversPayoutMethod.push(
              new CoversPayoutMethod()
            );
          this.coverService.disableInputs(this.inputs);
        },
        () => {
          this.loading = false;
          this.util.notify('Internal server error!.', 0);
        }
      );
    }
  }
  setCompanyAllowed() {
    this.findProductService.getCompanyAllowed().subscribe((res) => {
      this.companiesList = res;
    });
  }

  setProviderCodes() {
    this.findProductService
      .getProviderClientByCat(this.createCoverCode.basic.basic.providerCategory)
      .subscribe((res) => {
        this.providerCodes = res;
      });
  }

  deleteCompanyAndPayout(i: number) {
    this.deleteCompany(i);
    this.deletePayoutMethod(i);
  }

  async deleteCompany(i: number) {
    if (this.createCoverCode.basic.coversCompanies[i].id != null) {
      if (await this.util.confirm('Do you want to delete this Company?')) {
        this.findProductService
          .deleteCompany(this.createCoverCode.basic.coversCompanies[i].id)
          .subscribe(
            () => {
              this.util.notify('Deleted successfully!', 1);
              this.createCoverCode.basic.coversCompanies.splice(i, 1);
            },
            () => this.util.notify('Unable to delete Company!', 0)
          );
      }
    } else {
      this.createCoverCode.basic.coversCompanies.splice(i, 1);
    }
  }

  async deletePayoutMethod(i: number) {
    if (this.createCoverCode.basic.coversPayoutMethod[i].id != null) {
      if (
        await this.util.confirm('Do you want to delete this payout method?')
      ) {
        this.findProductService
          .deletePayoutMethod(
            this.createCoverCode.basic.coversPayoutMethod[i].id
          )
          .subscribe(
            () => {
              this.util.notify('Deleted successfully!', 1);
              this.createCoverCode.basic.coversPayoutMethod.splice(i, 1);
            },
            () => this.util.notify('Unable to delete Payout method!', 0)
          );
      }
    } else {
      this.createCoverCode.basic.coversPayoutMethod.splice(i, 1);
    }
  }

  async deleteCurrency(i: number) {
    if (this.createCoverCode.basic.basic.currencyAllowed[i].id != null) {
      if (
        await this.util.confirm('Do you want to delete this valid currency?')
      ) {
        this.findProductService
          .deleteCurrency(
            this.createCoverCode.basic.basic.currencyAllowed[i].id
          )
          .subscribe(
            () => {
              this.util.notify('Deleted successfully!', 1);
              this.createCoverCode.basic.basic.currencyAllowed.splice(i, 1);
            },
            () => this.util.notify('Unable to delete valid currency!', 0)
          );
      }
    } else {
      this.createCoverCode.basic.basic.currencyAllowed.splice(i, 1);
    }
  }

  @Input() isModal: boolean;
  @Output() onComplete = new EventEmitter();
  emit = () => {
    this.onComplete.emit();
  };
  saveBasic() {
    this.loading = true;
    this.loadingText = 'Saving Cover Basic....';
    this.coverService.createBasic(this.createCoverCode.basic).subscribe(
      (data: CreateBasic) => {
        this.loading = false;
        this.createCoverCode.basic.basic = data.basic;
        this.util.info(
          `Cover Basic ${data.basic.code} was saved successfully!.`,
          1,
          null,
          this.isModal
            ? [{ value: 'Return to Product', action: this.emit }]
            : null
        );

        this.createCoverCode.accReins.acct.code = data.basic.code;
        this.createCoverCode.annuities.code = data.basic.code;
        this.createCoverCode.basic.basic.code = data.basic.code;
        this.createCoverCode.benefit.coversBenefit.code = data.basic.code;
        this.createCoverCode.commission.code = data.basic.code;
        this.createCoverCode.endorsements.code = data.basic.code;
        this.createCoverCode.lapse.code = data.basic.code;
        this.createCoverCode.loan.code = data.basic.code;
        this.createCoverCode.paidUp.code = data.basic.code;
        this.createCoverCode.premium.coversPremium.code = data.basic.code;
        this.createCoverCode.surrenders.code = data.basic.code;
        this.createCoverCode.taxesLevies.code = data.basic.code;
        this.createCoverCode.terms.coversTerms.code = data.basic.code;
        this.createCoverCode.underwriting.code = data.basic.code;

        this.createCoverCode.basic.coversPayoutMethod = []; //data.paymentOutMethodAllowed
        this.createCoverCode.basic.coversCompanies = []; //data.companiesAllowed

        this.createCoverCode.basic.basic.currencyAllowed.length &&
          this.createCoverCode.basic.basic.currencyAllowed.map(
            (currency, i) => {
              currency.rowId = i;
              return currency;
            }
          );

        data.coversCompanies &&
          data.coversCompanies.map((company, i) => {
            company.rowId = i;
            this.createCoverCode.basic.coversCompanies.push(company);
          });

        data.basic &&
          data.coversPayoutMethod &&
          data.coversPayoutMethod.map((paymentOutMethodAllowed, i) => {
            paymentOutMethodAllowed.rowId = i;
            this.createCoverCode.basic.coversPayoutMethod.push(
              paymentOutMethodAllowed
            );
          });

        this.findProductService
          .getProviderClientByCat(
            this.createCoverCode.basic.basic.providerCategory
          )
          .subscribe((res) => {
            this.providerCodes = res;
          });
      },
      () => {
        this.util.info('Unable to save basic!.', 0);
        this.loading = false;
      }
    );
  }

  setPaymentMethods(company: string, rowId: number) {
    this.findProductService
      .getPaymentMethodsByCompany(company)
      .subscribe((res) => {
        this.paymentMethodsList[rowId] = res;
      });
  }

  addPaymentOutMethodAllowed(i: number) {
    var paymentOutMethodAllowed = new CoversPayoutMethod();
    paymentOutMethodAllowed.rowId =
      this.createCoverCode.basic.coversPayoutMethod.length + 1;
    this.createCoverCode.basic.coversPayoutMethod.splice(
      i,
      0,
      paymentOutMethodAllowed
    );
  }

  removePaymentOutMethodAllowed(i: number) {
    this.createCoverCode.basic.coversPayoutMethod.splice(i, 1);
  }

  setInsuranceTypeList() {
    this.codeService.getCodesByCodeSubGroup('INS_TYPE').subscribe((res) => {
      this.insuranceTypeList = res;
    });
  }

  setCurrenciesList() {
    this.findProductService.getCurrenciesList().subscribe((res) => {
      this.currenciesList = res;
    });
  }

  setIssueDate() {
    this.findProductService.getIssueDate().subscribe((res) => {
      this.issueDateList = res;
    });
  }

  setProductCategory() {
    this.findProductService.getProductCategory().subscribe((res) => {
      this.providerCategoryList = res;
    });
  }

  setRateCodeAndDescList() {
    this.findProductService.getrateanddescListBycat().subscribe((res) => {
      this.interestTableList = res;
    });
  }

  setQuoteValidityBase() {
    this.findProductService.getQuoteValidityBase().subscribe((res) => {
      this.quoteValidityBasisList = res;
    });
  }

  setInterestBasis() {
    this.findProductService.getInterestBasis().subscribe((res) => {
      this.interestCalBasisList = res;
    });
  }

  setCoverScreen() {
    this.findProductService.getCoverScreen('CO').subscribe((res) => {
      this.coverScreenList = res;
    });
  }

  removeCurrencyAllowed(i: number) {
    this.createCoverCode.basic.basic.currencyAllowed.splice(i, 1);
  }

  addCurrencyAllowed(i: number) {
    var currencyAllowed = new CurrencyAllowed();
    currencyAllowed.rowId =
      this.createCoverCode.basic.basic.currencyAllowed.length + 1;
    this.createCoverCode.basic.basic.currencyAllowed.splice(
      i,
      0,
      currencyAllowed
    );
  }

  addCompaniesAllowed(i: number) {
    var companyAllowed = new CompaniesAllowed();
    companyAllowed.rowId =
      this.createCoverCode.basic.coversCompanies.length + 1;
    this.createCoverCode.basic.coversCompanies.splice(i, 0, companyAllowed);
  }

  removeCompaniesAllowed(i: number) {
    this.createCoverCode.basic.coversCompanies.splice(i, 1);
  }

  getPaymentMethods() {
    var companies = '';
    var companyLength: number =
      this.createCoverCode.basic.coversCompanies.length;

    console.log(
      'this.createCoverCode.basic.coversCompanies',
      this.createCoverCode.basic.coversCompanies
    );

    this.createCoverCode.basic.coversCompanies.map((company, i) => {
      if (i != companyLength - 1) companies += company.companyAllowed + ',';
      else companies += company.companyAllowed;
    });

    this.findProductService
      .getPaymentMethodsByCompany(companies)
      .subscribe((res) => {
        this.paymentMethodsList = res;
      });
  }
}
