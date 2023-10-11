import { Component, OnInit } from '@angular/core';
import { AppraisalService } from '../../service/appraisal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-team-appraisal',
  templateUrl: './index-team-appraisal.component.html',
  styleUrls: ['./index-team-appraisal.component.scss']
})
export class IndexTeamAppraisalComponent implements OnInit {

  company: any;
  division: any;
  subDivision: any;
  team: any;

  companyCode: any;
  
  companies: any[] = [];
  divisions: any[] = [];
  subDivisions: any[] = [];
  teams: any[] = [];

  divLink: any;

  isCompanyCode = false;
  isDivLink = false;

  successMessage = false;
  warningMessage = false;
  errorMessage = false;

  connection = {
    creating: false,
    error: false
  };

  constructor(public router: Router, private appraisalService: AppraisalService) { }

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

  getCompanyCode(companyCode: any) {
    this.isCompanyCode = true;
    this.companyCode = companyCode;

     if (this.isCompanyCode) {
       this.getDivision();
     }
  }

  getDivision() {
    this.connection.creating = true;

    this.appraisalService.getCodeAndDescription(this.companyCode).subscribe((data: any) => {
      this.divisions = data;
      this.connection.creating = false;
    })
  }

  // getDivLink(divLink: any) {
  //   this.isDivLink = true;
  //   this.divLink = divLink;

  //    if (this.isDivLink) {
  //      this.getSubDivision();
  //    }
  // }

  getSubDivision(divLink) {
    this.connection.creating = true;

    this.appraisalService.getSubDivisionAppraisalCode(divLink).subscribe((data: any) => {
      console.log('getSubDivisionAppraisalCode', data);
      this.subDivisions = data;
      this.connection.creating = false;
    })
  }

  getTeam(subDivLink) {
    this.connection.creating = true;

    this.appraisalService.getTeamAppraisalCode(subDivLink).subscribe((data: any) => {
      console.log('getTeamAppraisalCode', data);
      this.teams = data;
      this.connection.creating = false;
    })
  }

 
}
