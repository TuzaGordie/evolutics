import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppraisalService } from '../../service/appraisal.service';


@Component({
  selector: 'app-index-division-appraisal',
  templateUrl: './index-division-appraisal.component.html',
  styleUrls: ['./index-division-appraisal.component.scss']
})
export class IndexDivisionAppraisalComponent implements OnInit {

  company: any;
  division: any;

  companyCode: any;
  isCompanyCode = false;

  
  companies: any[] = [];
  divisions: any[] = [];

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
 
}
