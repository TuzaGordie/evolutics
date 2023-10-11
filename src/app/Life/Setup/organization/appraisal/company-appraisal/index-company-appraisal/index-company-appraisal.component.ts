import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppraisalService } from '../../service/appraisal.service';


@Component({
  selector: 'app-index-company-appraisal',
  templateUrl: './index-company-appraisal.component.html',
  styleUrls: ['./index-company-appraisal.component.scss']
})
export class IndexCompanyAppraisalComponent implements OnInit {

  company: any;
  companyAppraisalCode: any;

  companyCode: any;
  isCompanyCode = false;
  
  companies: any[] = [];
  companyAppraisalCodes: any[] = [];

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
       this.getCompanyAppraisalCode(this.companyCode);
     }
  }

  getCompanyAppraisalCode(value) {    
    this.connection.creating = true;
    localStorage.setItem('companyCode', value);
  
    this.appraisalService.getCompanyAppraisalCode(value).subscribe((data: any) => {
      this.companyAppraisalCodes = data;
      this.connection.creating = false;
    })
  }

 
}
