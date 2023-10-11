import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindProductService } from '../../../service/find-product.service';
import { CreateCoverCode, Underwriting } from '../../cover-code';
import { QuotationFormsToBeAttached } from '../../cover-code-child';
import { CoverService } from '../../cover-service.service';

@Component({
  selector: 'app-cover-underwritting',
  templateUrl: './cover-underwritting.component.html',
  styleUrls: ['./cover-underwritting.component.scss'],
})
export class CoverUnderwrittingComponent implements OnInit {
  @Input() createCoverCode: CreateCoverCode;
  @Input() action: string;
  @ViewChildren('inp') inputs: QueryList<any>;
  @Input() coverCode: string;

  paymentMethodsList: any[] = [];
  riskSurveyQuestionList: any[] = [];
  underwritingQuestionSet: any[] = [];

  financialUnderwritingQuestion: any = [];
  medicalUnderwritingTestTableList: any = [];
  medicalUnderwritingList: any = [];
  fclCalcBasisList: any = [];
  underwritingFormAttached: any = [];

  company: string;
  medicalUnderwritingResultTable: any;

  constructor(
    public findProductService: FindProductService,
    private activatedRoute: ActivatedRoute,
    private codeService: CodeService,
    private router: Router,
    private util: UtilityService,
    private companyService: CompanyService,
    public coverService: CoverService
  ) {}
  ngAfterViewInit(): void {
    this.coverService.disableInputs(this.inputs);
  }
  ngOnInit(): void {
    this.loading = true;
    this.loadingText = 'Fetching Cover Underwriting';
    this.setMedicalUnderwriting();
    this.getMedicalUnderwritingResultTable();
    this.setMedicalUnderwritingTestTable();
    this.setUnderwritingFormAttached();
    this.setFCLCalculationBasis();

    this.setfinancialUnderwritingQuestion();
    // debugger
    if (!this.coverService.isCreate) {
      this.findProductService
        .getUnderWriting(this.coverCode)
        .subscribe((data: Underwriting) => {
          this.loading = false;
          if (data == null) {
            this.createCoverCode.underwriting = new Underwriting();
            return;
          }

          this.createCoverCode.underwriting = data;

          this.coverService.disableInputs(this.inputs);
        });
    } else {
      this.loading = false;
    }
    this.setPaymentMethods();
    this.setRiskSurveyQuestion();
    this.setUnderwritingQuestionSet();

    console.log('underwritingQuestionSet', this.underwritingQuestionSet);
    console.log('riskSurveyQuestionList', this.riskSurveyQuestionList);
  }

  setUnderwritingQuestionSet() {
    this.findProductService
      .getunderWritingQuestionSet(this.packageCompanies())
      .subscribe((res) => {
        this.underwritingQuestionSet = res;
      });
  }

  setRiskSurveyQuestion() {
    this.findProductService
      .getRiskSurveyQuestion(this.packageCompanies())
      .subscribe((res) => {
        this.riskSurveyQuestionList = res;
      });
  }

  setPaymentMethods() {
    this.findProductService
      .getPaymentMethodsByCompany(this.packageCompanies())
      .subscribe((res) => {
        this.paymentMethodsList = res;
      });
  }

  packageCompanies() {
    var companies = '';
    var companyLength: number =
      this.createCoverCode.basic.coversCompanies.length;

    this.createCoverCode.basic.coversCompanies.map((company, i) => {
      if (i != companyLength - 1) companies += company.companyAllowed + ',';
      else companies += company.companyAllowed;
    });

    return companies;
  }

  @Input() loading = false;
  @Input() loadingText = '';

  saveUnderwriting() {
    this.loading = true;
    this.loadingText = 'Saving Cover Underwriting....';

    this.createCoverCode.underwriting.code =
      this.createCoverCode.basic.basic.code;

    this.coverService
      .saveUnderwriting(this.createCoverCode.underwriting)
      .subscribe(
        (data: Underwriting) => {
          this.loading = false;
          this.util.notify('Cover Underwriting saved successfully!.');
          this.createCoverCode.underwriting = data;

          this.setUnderwritingFormAttached();
        },
        () => {
          this.util.notify('Unable to save cover underwriting!.', 0);
          this.loading = false;
        }
      );
  }

  addQuotationFormsAttached() {
    var quote = new QuotationFormsToBeAttached();
    quote.rowId =
      this.createCoverCode.underwriting.quotationFormsToBeAttached.length + 1;
    this.createCoverCode.underwriting.quotationFormsToBeAttached.push(quote);
  }

  async removeQuotationFormAttached(i: number) {
    if (
      this.createCoverCode.underwriting.quotationFormsToBeAttached[i].id != null
    ) {
      if (
        await this.util.confirm('Do you want to delete this Quotation Form?')
      ) {
        this.findProductService
          .removeQuotationFormAttached(
            this.createCoverCode.underwriting.quotationFormsToBeAttached[i].id
          )
          .subscribe(
            () => {
              this.util.notify('Quotation Form deleted successfully', 1);
              this.createCoverCode.underwriting.quotationFormsToBeAttached.splice(
                i,
                1
              );
            },
            () => this.util.notify('Unable to delete Quotation Form!.', 0)
          );
      }
    } else
      this.createCoverCode.underwriting.quotationFormsToBeAttached.splice(i, 1);
  }

  setfinancialUnderwritingQuestion() {
    this.findProductService
      .getfinancialUnderwritingQuestion(this.packageCompanies())
      .subscribe((res) => {
        this.financialUnderwritingQuestion = res;
      });
  }

  setMedicalUnderwriting() {
    this.findProductService
      .getMedicalUnderwriting(this.packageCompanies())
      .subscribe((res) => {
        this.medicalUnderwritingList = res;
      });
  }

  getMedicalUnderwritingResultTable() {
    this.findProductService
      .getMedicalUnderwritingResultTable(this.packageCompanies())
      .subscribe((res) => {
        this.medicalUnderwritingResultTable = res;
      });
  }
  setFCLCalculationBasis() {
    this.codeService.getCodesByCodeSubGroup('FCL_BASIS').subscribe((res) => {
      this.fclCalcBasisList = res;
    });
  }

  setMedicalUnderwritingTestTable() {
    this.findProductService
      .getMedicalUnderwritingTestTable()
      .subscribe((res) => {
        this.medicalUnderwritingTestTableList = res;
      });
  }

  setUnderwritingFormAttached() {
    this.findProductService.getUnderwritingFormAttached().subscribe((res) => {
      this.underwritingFormAttached = res;
    });
  }
}
