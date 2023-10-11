import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindProductService } from '../../../service/find-product.service';
import { CreateCoverCode, Dependents } from '../../cover-code';
import { CoverService } from '../../cover-service.service';

@Component({
  selector: 'app-cover-dependant',
  templateUrl: './cover-dependant.component.html',
  styleUrls: ['./cover-dependant.component.scss'],
})
export class CoverDependantComponent implements OnInit {
  @Input() createCoverCode: CreateCoverCode;
  @Input() loading = false;
  @Input() loadingText = '';
  @Input() action: string;
  @ViewChildren('inp') inputs: QueryList<any>;
  @Input() coverCode: string;

  underwritingQuestionSet: any[] = [];
  riskSurveyQuestionList: any[] = [];
  fundingOptionsList: any = [];
  coversList: any[] = [[]];
  companiesList: any = [];

  constructor(
    public findProductService: FindProductService,
    private fb: FormBuilder,
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
    this.setFundingOption();
    this.setCompanyAllowed();

    if (!this.coverService.isCreate) {
      // debugger;
      this.findProductService
        .getDependent(this.coverCode)
        .subscribe((data: Dependents[]) => {
          this.createCoverCode.dependents = [];

          if (!data?.length) {
            this.createCoverCode.dependents = [new Dependents()];
            return;
          }

          this.createCoverCode.dependents = data;
          if (this.coverService.isClone)
            this.createCoverCode.dependents.forEach((x) => {
              delete x.id;
              delete x.code;
            });

          this.coverService.disableInputs(this.inputs);
        });
    }
 
  }

  saveDependent() {
    this.loadingText = 'Saving Cover Dependent...';
    this.loading = true;
    this.createCoverCode.dependents.map((dep) => {
      dep.code = this.createCoverCode.basic.basic.code;
      this.coversList[dep.rowId] &&
        this.coversList[dep.rowId].map((cover) => {
          if (dep.riderCoverCode == cover.code)
            dep.description = cover.description;
        });
    });

    this.coverService
      .createDependant(this.createCoverCode.dependents)
      .subscribe(
        (data: Dependents[]) => {
          this.loading = false;
          this.createCoverCode.dependents = [];
          data.map((dep) => {
            dep.rowId = this.createCoverCode.dependents.length + 1;
            this.createCoverCode.dependents.push(dep); 
          });

          this.util.notify('Covers Dependent saved Successfully!.', 1);
        },
        () => {
          this.loading = false;
          this.util.notify('Unable to Save Cover Dependent!.', 0);
        }
      );
  }

  setCompanyAllowed() {
    this.findProductService.getCompanyAllowed().subscribe((res) => {
      this.companiesList = res;
    });
  }

  addNewDependentRow(i: number) {
    var dep = new Dependents();
    dep.rowId = this.createCoverCode.dependents.length + 1;
    this.createCoverCode.dependents.splice(i, 0, dep);
  }

  async removeNewDependentRow(i: number) {
    if (this.createCoverCode.dependents[i].id != null) {
      if (await this.util.confirm('Do you want to delete this dependent?')) {
        this.findProductService
          .deleteDependent(this.createCoverCode.dependents[i].id)
          .subscribe(
            () => {
              this.util.notify('Dependent deleted successfully', 1);
              this.createCoverCode.dependents.splice(i, 1);
            },
            () => this.util.notify('Unable to delete dependent!.', 0)
          );
      }
    } else this.createCoverCode.dependents.splice(i, 1);
  }

  onSelectCompanyCode=(  companyCode: string) =>{
    this.setunderWritingQuestionSet(companyCode);
    this.setRiskSurveyQuestion(companyCode);
    return this.findProductService
      .getCoversList(companyCode) 
  }

  setunderWritingQuestionSet(data?) {
    this.findProductService
      .getunderWritingQuestionSet(data)
      .subscribe((res) => {
        this.underwritingQuestionSet = res;
      });
  }
  setRiskSurveyQuestion(data?) {
    this.findProductService.getRiskSurveyQuestion(data).subscribe((res) => {
      this.riskSurveyQuestionList = res;
    });
  }

  setFundingOption() {
    this.findProductService.getFundingOption().subscribe((res) => {
      this.fundingOptionsList = res;
    });
  }
 
}
