import {Component, OnInit, ViewChild} from '@angular/core';
import { AppraisalService } from '../../service/appraisal.service';
import { ActivatedRoute } from '@angular/router';
import { Individual } from 'src/app/Shared/models/life/setup/organization/appraisal/individual';
import { ApiService } from 'src/app/Services/api.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-create-individual-appraisal',
  templateUrl: './create-individual-appraisal.component.html',
  styleUrls: ['./create-individual-appraisal.component.scss'],
})
export class CreateIndividualAppraisalComponent implements OnInit {

  baseUrl = environment.apiBaseUrl + '/rest';

  individualAppraisal: Individual;

  private nbofCriteria: number = 1;
  private nbofDate: number = 1;

  appraisalCode: any;
  pageMode: 'show'|'clone'|'create' = 'create';
  showEditButton: boolean = false;
  description: any;
  appraisalLevel: any;
  companyCode: any;
  versionNo: any;
  versionDate: Date;

  individualPerformanceWeight: number;
  teamPerformanceWeight: number;
  divisionPerformanceWeight: number;
  subDivisionPerformanceWeight: number;
  companyPerformanceWeight: number;
  groupPerformanceWeight: number;
  totalWeight: number;
  workflowWeight: number;
  appraisalCriteria: any;
  condition1: any;
  condition2: any;
  condition3: any;
  condition4: any;
  condition5: any;
  productClass1: any;
  productClass2: any;
  productClass3: any;
  productClass4: any;
  productClass5: any;
  criteria1: string;
  criteria2: string;
  criteria3: string;
  criteria4: string;
  criteria5: string;
  value1: any
  value2: any
  value3: any
  value4: any
  value5: any
  weight1: any;
  weight2: any;
  weight3: any;
  weight4: any;
  weight5: any;

  companyCodes: any[] = [];
  versionNumbers: any[] = [];
  appraisalCriterias: any;
  appraisalLevels: any[] = [];
  conditions: any[] = [];
  productClasses: any[] = [];
  criterias: any = [];

  isTotalWeight = false;
  isCompanyCode = false;
  isCriteria2 = false;
  isCriteria3 = false;
  isCriteria4 = false;
  isCriteria5 = false;

  hideButton1 = false;
  hideButton2 = false;
  hideButton3 = false;
  hideButton4 = false;


  connection = {
    creating: false,
    error: false
  };

  @ViewChild('form') form: NgForm;

  constructor(
    private appraisalService: AppraisalService,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private toaster: UtilityService
  ) { }

  ngOnInit(): void {
    this.initializeVariables();
    this.getCompany();
    this.getAppraisalLevel();
    this.getCondition();
    this.getProductClass();
    this.getAppraisalCriteria();
    this.getVersionNos();
  }

  ngAfterViewInit(){
    if (this.pageMode == 'show' || this.pageMode == 'clone'){
      setTimeout(() => {
        // done asynchronously to avoid expression changed after checked error
        this.form.form.disable()
      }, 0)
    }
  }

  initializeVariables() {
    const action = this.activatedRoute.snapshot.queryParams.action;
    // keep the appraisalCode only if in show mode. Should be undefined in clone mode
    this.appraisalCode = action == 'show' ? this.activatedRoute.snapshot.queryParams.code : undefined;
    this.showEditButton = !!action; // show edit button if in show or clone mode. Hide in create mode
    this.pageMode = action;

    this.description = null;
    this.appraisalLevel = null;
    this.companyCode = null;
    this.versionNo = 1; // default to 1
    this.versionDate = null;

    this.individualPerformanceWeight = null;
    this.teamPerformanceWeight = null;
    this.divisionPerformanceWeight = null;
    this.subDivisionPerformanceWeight = null;
    this.companyPerformanceWeight = null;
    this.groupPerformanceWeight = null;
    this.workflowWeight = null;
    this.appraisalCriteria = null;
    this.condition1 = null;
    this.condition2 = null;
    this.condition3 = null;
    this.condition4 = null;
    this.condition5 = null;
    this.productClass1 = null;
    this.productClass2 = null;
    this.productClass3 = null;
    this.productClass4 = null;
    this.productClass5 = null;
    this.criteria1 = null;
    this.criteria2 = null;
    this.criteria3 = null;
    this.criteria4 = null;
    this.criteria5 = null;
    this.value1 = null;
    this.value2 = null;
    this.value3 = null;
    this.value4 = null;
    this.value5 = null;
    this.weight1 = null;
    this.weight2 = null;
    this.weight3 = null;
    this.weight4 = null;
    this.weight5 = null;
  }

  getCompany() {    
    this.connection.creating = true;

    this.appraisalService.getCompany().subscribe((data: any) => {
      this.companyCodes = data;
      this.connection.creating = false;
    })
  }

  getAppraisalLevel() {    
    this.connection.creating = true;

    this.appraisalService.getAppraisalLevel().subscribe((data: any) => {
      this.appraisalLevels = data;
      console.log('appraisalLevels', data);
      this.connection.creating = false;
    })
  }

  getVersionNos() {
    this.connection.creating = true;

    this.appraisalService.getVersionNo(this.appraisalCode).subscribe((data: any) => {
      this.versionNumbers = data;
      this.connection.creating = false;
    })

  }

  getTotalWeight() {
    this.totalWeight = this.individualPerformanceWeight + this.teamPerformanceWeight + this.divisionPerformanceWeight + this.companyPerformanceWeight + this. groupPerformanceWeight
    if(this.totalWeight !== 100) {
      this.isTotalWeight = true;
    }else{
      this.isTotalWeight = false;
    }
  }

  getCondition() {
    this.connection.creating = true;

    this.appraisalService.getCondition(this.companyCode).subscribe((data: any) => {
      this.conditions = data;
      console.log('conditions', data);
      this.connection.creating = false;
    })    
  }

  getProductClass() {
    this.connection.creating = true;

    this.appraisalService.getProductClass().subscribe((data: any) => {
      this.productClasses = data;
      this.connection.creating = false;
    });
  }

  getAppraisalCriteria() {
    this.connection.creating = true;

    this.appraisalService.getAppraisalCriteria().subscribe((data) => {
      this.criterias = data;
      console.log('criteria', this.criterias);
      this.connection.creating = false;
    });
  }

  createNewIndividualAppraisal() {
    this.form.form.enable() // form should be enabled for below validation to work
    if (this.form.form.invalid){
      this.form.form.markAllAsTouched();
      this.toaster.info("Kindly fill all required fields in all tabs", 0)
      return;
    }

    this.individualAppraisal = new Individual();
    this.individualAppraisal.appraisalCode = this.appraisalCode;
    // this.individualAppraisal.auth = 0;
    this.individualAppraisal.authBy = 'SYSTEM';
    // this.individualAppraisal.authOn = Date;
    this.individualAppraisal.coyPerfWeight = this.companyPerformanceWeight;
    this.individualAppraisal.createdBy = 'USER';
    // this.individualAppraisal.createdOn = Date;
    this.individualAppraisal.criteria1 = this.criteria1;
    this.individualAppraisal.criteria1Cond = this.condition1;
    this.individualAppraisal.criteria1ProdClass = this.productClass1;
    this.individualAppraisal.criteria1Score = null;
    this.individualAppraisal.criteria1Target = this.value1;
    this.individualAppraisal.criteria1Weight = this.weight1;
    this.individualAppraisal.criteria2 = this.criteria2;
    this.individualAppraisal.criteria2Cond = this.condition2;
    this.individualAppraisal.criteria2ProdClass = this.productClass2;
    this.individualAppraisal.criteria2Score = null;
    this.individualAppraisal.criteria2Target = this.value2;
    this.individualAppraisal.criteria2Weight = this.weight2;
    this.individualAppraisal.criteria3 = this.criteria3;
    this.individualAppraisal.criteria3Cond = this.condition3;
    this.individualAppraisal.criteria3ProdClass = this.productClass3;
    this.individualAppraisal.criteria3Score = null;
    this.individualAppraisal.criteria3Target = this.value3;
    this.individualAppraisal.criteria3Weight = this.weight3;
    this.individualAppraisal.criteria4 = this.criteria4;
    this.individualAppraisal.criteria4Cond = this.condition4;
    this.individualAppraisal.criteria4ProdClass = this.productClass4;
    this.individualAppraisal.criteria4Score = null;
    this.individualAppraisal.criteria4Target = this.value4;
    this.individualAppraisal.criteria4Weight = this.weight4;
    this.individualAppraisal.description = this.description;
    this.individualAppraisal.divPerfWeight = this.divisionPerformanceWeight;
    this.individualAppraisal.subDivPerfWeight = this.subDivisionPerformanceWeight;
    // this.individualAppraisal.id = number;
    this.individualAppraisal.indPerfWeight = this.individualPerformanceWeight;
    this.individualAppraisal.teamPerfWeight = this.teamPerformanceWeight;
    this.individualAppraisal.versionDate = this.versionDate;
    this.individualAppraisal.versionNo = this.versionNo;
    this.individualAppraisal.wfWeight = this.workflowWeight
  
    console.log('individual appraisals', this.individualAppraisal)
    this.toaster.notify('Processing...', 2, 5000,'Info');

    this.apiService.post(`${this.baseUrl}/appraisal/individual/setup`, this.individualAppraisal).subscribe((data: any) => {
      this.toaster.notify('Appraisal Individual saved', 1, 5000,'Success');
      this.initializeVariables();
    },
    error => {
      this.toaster.notify('Something went wrong', 0, 5000,'Error');
    });
  }


  showCriteria2() {
    this.isCriteria2 = true;
    this.hideButton1 = true;
  }

  showCriteria3() {
    this.isCriteria3 = true;
    this.hideButton2 = true;
  }
  
  showCriteria4() {
    this.isCriteria4 = true;
    this.hideButton3 = true;
  }

  showCriteria5() {
    this.isCriteria5 = true;
    this.hideButton4 = true;
  }

  dateCounter() {
    return new Array(this.nbofDate);
  }

  dateInc() {
    this.nbofDate = this.nbofDate + 1
  }

  toggleEditMode(){
    if (this.form.form.disabled){
      this.form.form.enable()
    }else{
      this.form.form.disable()
    }
  }

  deleteCriteria(number){
    this[`condition${number}`] = null;
    this[`productClass${number}`] = null;
    this[`value${number}`] = null;
    this[`weight${number}`] = null;
    this[`isCriteria${number}`] = false;
    this[`hideButton${number - 1}`] = false;
  }
}
