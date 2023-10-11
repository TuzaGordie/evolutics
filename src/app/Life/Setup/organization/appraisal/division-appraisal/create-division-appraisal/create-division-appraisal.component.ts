import {Component, OnInit} from '@angular/core';
import { AppraisalService } from '../../service/appraisal.service';
import { ActivatedRoute } from '@angular/router';
import { Division } from 'src/app/Shared/models/life/setup/organization/appraisal/division';
import { ApiService } from 'src/app/Services/api.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-division-appraisal',
  templateUrl: './create-division-appraisal.component.html',
  styleUrls: ['./create-division-appraisal.component.scss'],
})
export class CreateDivisionAppraisalComponent implements OnInit {

  baseUrl = environment.apiBaseUrl + '/rest';

  divisionAppraisal: Division;

  private nbofDate: number = 1;
  private nbofCriteria: number = 1;

  appraisalCode: any;
  description: any;
  appraisalLevel: any;
  companyCode: any;
  headOfTeam: any;
  versionNo: any;
  versionDate: Date;
  teamAppraisalCode: any
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
  criteria1: string;
  criteria2: string;
  criteria3: string;
  criteria4: string;
  criteria5: string;

  companyCodes: any[] = [];
  headOfTeams: any[] = [];
  versionNumbers: any[] = [];
  criterias: any;
  appraisalLevels: any[] = [];
  conditions: any[] = [];
  productClasses: any[] = [];
  teamAppraisalCodes: any[] = [];

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

  constructor(
    private appraisalService: AppraisalService,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private toaster: UtilityService
  ) { }

  ngOnInit(): void {
    this.appraisalCode = this.activatedRoute.snapshot.params.appraisalCode;
    this.getCompany();
    this.getAppraisalLevel();
    this.getCondition();    
    this.getProductClass();
    this.getAppraisalCriteria();
    this.initializeVariables();
  }

  initializeVariables() {
    this.description = null;
    this.appraisalLevel = null;
    this.companyCode = null;
    this.headOfTeam = null;
    this.versionNo = null;
    this.versionDate = null;
    this.teamAppraisalCode = null;
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
    this.criteria1 = null;
    this.criteria2 = null;
    this.criteria3 = null;
    this.criteria4 = null;
    this.criteria5 = null;
  }

  getCompany() {    
    this.connection.creating = true;

    this.appraisalService.getCompany().subscribe((data: any) => {
      console.log('company', data);
      this.companyCodes = data;
      this.companyCode = this.companyCodes[0].code;
      this.connection.creating = false;
    })
  }

  getCodes() {
    this.getTeamAppraisalCode();  
  }

  getHeadOfTeam() {
    this.isCompanyCode = true;

    this.appraisalService.getHeadOfTeam(this.companyCode).subscribe((data: any) => {
      this.appraisalLevels = data;
      console.log('appraisalLevels', data);
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

  getTeamAppraisalCode() {
    this.connection.creating = true;

    this.appraisalService.getTeamAppraisalCode(this.companyCode).subscribe((data: any) => {
      this.teamAppraisalCodes = data;
      console.log('getTeamAppraisalCode',data);
      this.connection.creating = false;
    })

  }

  getAppraisalCriteria() {
    this.connection.creating = true;

    this.appraisalService.getAppraisalCriteria().subscribe((data: any) => {
      this.criterias = data;
      console.log('getAppraisalCriteria', data);
      this.connection.creating = false;
    })    
  }

  getCondition() {
    this.connection.creating = true;

    this.appraisalService.getCondition().subscribe((data: any) => {
      this.conditions = data;
      console.log('conditions', data);
      this.connection.creating = false;
    })    
  }

  getProductClass() {
    this.connection.creating = true;

    this.appraisalService.getProductClass().subscribe((data: any) => {
      this.productClasses = data;
      console.log('productClass', data);
      this.connection.creating = false;
    })    
  }

  createDivisionAppraisal() {

    this.divisionAppraisal = new Division();
    this.divisionAppraisal.appraisalCode = this.appraisalCode;
    // this.divisionAppraisal.auth = 0;
    this.divisionAppraisal.authBy = 'SYSTEM';
    // this.divisionAppraisal.authOn = Date;
    this.divisionAppraisal.companyCode = this.companyCode;
    this.divisionAppraisal.createdBy = 'USER';
    // this.divisionAppraisal.createdOn = Date;
    this.divisionAppraisal.criteria1 = this.criteria1;
    this.divisionAppraisal.criteria1Cond = this.condition1;
    this.divisionAppraisal.criteria1ProdClass = this.productClass1;
    // this.divisionAppraisal.criteria1Score = number;
    this.divisionAppraisal.criteria1Target = this.value1;
    this.divisionAppraisal.criteria1Weight = this.weight1;
    this.divisionAppraisal.criteria2 = this.criteria2;
    this.divisionAppraisal.criteria2Cond = this.condition2;
    this.divisionAppraisal.criteria2ProdClass = this.productClass2;
    // this.divisionAppraisal.criteria2Score = number;
    this.divisionAppraisal.criteria2Target = this.value2;
    this.divisionAppraisal.criteria2Weight = this.weight2;
    this.divisionAppraisal.criteria3 = this.criteria3;
    this.divisionAppraisal.criteria3Cond = this.condition3;
    this.divisionAppraisal.criteria3ProdClass = this.productClass3;
    // this.divisionAppraisal.criteria3Score = number;
    this.divisionAppraisal.criteria3Target = this.value3;
    this.divisionAppraisal.criteria3Weight = this.weight3;
    this.divisionAppraisal.criteria4 = this.criteria4;
    this.divisionAppraisal.criteria4Cond = this.condition4;
    this.divisionAppraisal.criteria4ProdClass = this.productClass4;
    // this.divisionAppraisal.criteria4Score = number;
    this.divisionAppraisal.criteria4Target = this.value4;
    this.divisionAppraisal.criteria4Weight = this.weight4;
    this.divisionAppraisal.description = this.description;
    // this.divisionAppraisal.divPerfWeight = number;
    // this.divisionAppraisal.id = number;
    // this.divisionAppraisal.subDivPerfWeight = number;
    this.divisionAppraisal.versionDate = this.versionDate;
    this.divisionAppraisal.versionNo = this.versionNo

    console.log('division appraisals', this.divisionAppraisal)

    this.apiService.post(`${this.baseUrl}/appraisal/division/setup`, this.divisionAppraisal).subscribe((data: any) => {
      this.toaster.notify('Appraisal Division saved', 1, 5000,'Success');
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

}
