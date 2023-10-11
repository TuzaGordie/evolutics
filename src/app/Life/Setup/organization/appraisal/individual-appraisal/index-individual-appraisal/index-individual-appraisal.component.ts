import { Component, OnInit } from '@angular/core';
import { AppraisalService } from '../../service/appraisal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index-individual-appraisal',
  templateUrl: './index-individual-appraisal.component.html',
  styleUrls: ['./index-individual-appraisal.component.scss']
})
export class IndexIndividualAppraisalComponent implements OnInit {

  private baseURL = environment.apiBaseUrl;

  company: any;
  divisionAppraisalCode: any;
  subDivisionAppraisalCode: any;
  teamAppraisalCode: any;
  individualAppraisalCode: any

  companyCode: any;
  divLink: any;

  companies: any[] = [];
  divisionAppraisalCodes: any[] = [];
  subDivisionAppraisalCodes: any[] = [];
  subDivisionAppraisalCodes2: any[] = [];
  teamAppraisalCodes: any[] = [];
  individualAppraisalCodes: any[] = [];


  isCompanyCode = false;
  isDivLink = false;

  successMessage = false;
  warningMessage = false;
  errorMessage = false;

  connection = {
    creating: false,
    error: false
  };

  constructor(
    public router: Router,
    private appraisalService: AppraisalService,
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.getCompany();
  }

  getCompany() {    
    this.connection.creating = true;

    this.appraisalService.getCompany().subscribe((data: any) => {
      this.companies = data;
      this.companyCode = this.companies[0].code;
      this.connection.creating = false;
    })
  }

  getDivisionAppraisalCode() {
    this.connection.creating = true;

    this.appraisalService.getCodeAndDescription(this.companyCode).subscribe((data: any) => {
      console.log('getDivisionAppraisalCode', data);
      this.divisionAppraisalCodes = data;
      this.connection.creating = false;
    })

  }

  getSubDivisionAppraisalCode(divLink) {
    this.connection.creating = true;

    this.appraisalService.getSubDivisionAppraisalCode(divLink).subscribe((data: any) => {
      console.log('getSubDivisionAppraisalCode', data);
      this.subDivisionAppraisalCodes = data;
      this.connection.creating = false;
    })

  }

  getTeamAppraisalCode(subDivLink) {
    this.connection.creating = true;

    this.appraisalService.getTeamAppraisalCode(subDivLink).subscribe((data: any) => {
      this.teamAppraisalCodes = data;
      console.log('getTeamAppraisalCode',data);
      this.connection.creating = false;
    })

  }

  getIndividualAppraisalCode(subDivLink) {
    this.connection.creating = true;

    this.appraisalService.getIndividualAppraisalCode(subDivLink).subscribe((data: any) => {
      this.individualAppraisalCodes = data;
      console.log('getIndividualAppraisalCode',data);
      this.connection.creating = false;
    })

  }

  showIndividualAppraisal() {

  }
 
  onClone(code){
    this.router.navigate(['../create-individual-appraisal'], {relativeTo: this.route, queryParams: {action: 'clone', code }})
  }

  onShow(code){
    this.router.navigate(['../create-individual-appraisal'], {relativeTo: this.route, queryParams: {action: 'show', code}})
  }
}
