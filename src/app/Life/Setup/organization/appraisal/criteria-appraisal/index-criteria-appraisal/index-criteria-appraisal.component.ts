import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { AppraisalService } from '../../service/appraisal.service';
import { Criteria } from 'src/app/Shared/models/life/setup/organization/appraisal/criteria';
import { ApiService } from 'src/app/Services/api.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-index-criteria-appraisal',
  templateUrl: './index-criteria-appraisal.component.html',
  styleUrls: ['./index-criteria-appraisal.component.scss']
})
export class IndexCriteriaAppraisalComponent implements OnInit {

  baseUrl = environment.apiBaseUrl + '/rest';

  criteria: Criteria ;

  private nbofCriteria: number = 1;

  company: any;

  companyCode: any;
  firstOrderExcalation: number;
  secondOrderExcalation: number;
  minorError: number;
  intermediateError: number;
  e1time: number;
  graveError: number;
  criteria1: string;
  criteria2: string;
  criteria3: string;
  criteria4: string;
  criteria5: string;
  
  companies: any[] = [];
  criterias: any = [];

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
    error: false,
    criteria1: false,
  };

  constructor( 
    public router: Router,
    private appraisalService: AppraisalService,
    private apiService: ApiService,
    private toaster: UtilityService
    ) { }

  ngOnInit(): void {
    this.getCompaniesList();
    this.getCriterias();
    this.initializeVariables();
  }

  initializeVariables() {
    this.companyCode = null;
    this.firstOrderExcalation = null;
    this.secondOrderExcalation = null;
    this.minorError = null;
    this.intermediateError = null;
    this.graveError = null;
    this.e1time = null;
    this.criteria1 = null;
    this.criteria2 = null;
    this.criteria3 = null;
    this.criteria4 = null;
    this.criteria5 = null;
  }

  getCompaniesList() {    
    this.connection.creating = true;

    this.appraisalService.getCompany().subscribe((data: any) => {
      this.companies = data;
      this.connection.creating = false;
    });
  }

  getCriterias() {
    this.connection.creating = true;

    this.appraisalService.getAppraisalCriteria().subscribe((data) => {
      this.criterias = data;
      console.log('criteria', this.criterias);
      this.connection.creating = false;

    });
  }

  createCriteria() {
    this.criteria = new Criteria();
    this.criteria.authBy = "USER";
    this.criteria.companyCode = this.companyCode;
    this.criteria.criteria1 = this.criteria1;
    this.criteria.criteria2 = this.criteria2;
    this.criteria.criteria3 = this.criteria3;
    this.criteria.criteria4 = this.criteria4;
    this.criteria.criteria5 = this.criteria5;
    this.criteria.e1Charge = this.firstOrderExcalation;
    this.criteria.e2Charge = this.secondOrderExcalation;
    this.criteria.errorGCharge = this.graveError;
    this.criteria.errorICharge = this.intermediateError;
    this.criteria.errorMCharge = this.minorError;
    this.criteria.e1time = this.e1time;
    this.criteria.versionNo = "0ne";
    
    console.log(this.criteria)

    this.apiService.post(`${this.baseUrl}/appraisal/criteria/setup`, this.criteria).subscribe((data: any) => {
      this.connection.creating = false;
      this.toaster.notify('Criterias saved', 1, 5000,'Success');
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

  onCompanyChange(){
    // get criteria 1
    this.connection.criteria1 = true
    this.appraisalService.getCompanyAppraisalCriteria(this.companyCode).subscribe(
      res => this.criteria1 = res?.criteria1
    ).add(() => this.connection.criteria1 = false)
  }
}
