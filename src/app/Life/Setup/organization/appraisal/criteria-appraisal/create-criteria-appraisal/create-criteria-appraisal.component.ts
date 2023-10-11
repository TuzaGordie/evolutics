import { Component, OnInit } from '@angular/core';
import { AppraisalService } from '../../service/appraisal.service';


@Component({
  selector: 'app-create-criteria-appraisal',
  templateUrl: './create-criteria-appraisal.component.html',
  styleUrls: ['./create-criteria-appraisal.component.scss'],
})
export class CreateCriteriaAppraisalComponent implements OnInit {

  companyCode: any;
  firstOrderExcalation: any;
  secondOrderExcalation: any;
  minorError: any;
  intermediateError: any;
  graveError: any;
  criteria1: any;
  criteria2: any;
  criteria3: any;
  criteria4: any;
  criteria5: any;

  companyCodes: any[] = [];

  isCompanyCode = false;

  connection = {
    creating: false,
    error: false
  };

  constructor(private appraisalService: AppraisalService) { }

  ngOnInit(): void {
    this.getCompany();
  }

  getCompany() {    
    this.connection.creating = true;

    this.appraisalService.getCompany().subscribe((data: any) => {
      this.companyCodes = data;
      this.companyCode = this.companyCodes[0].code;
      this.connection.creating = false;
      this.getCompanyCode(this.companyCode);
    })
  }

  getCompanyCode(companyCode: any) {
    this.isCompanyCode = true;
    this.companyCode = companyCode;
  }

  createCriteria() {
    let appraisals = {
      "authBy": "string",
      "companyCode": this.companyCode,
      "criteria1": this.criteria1,
      "e1Charge": this.firstOrderExcalation,
      "e2Charge": this.secondOrderExcalation,
      "errorGCharge": this.graveError,
      "errorICharge": this.intermediateError,
      "errorMCharge": this.minorError
    }
    console.log('team appraisals', appraisals)

    this.connection.creating = true;

    this.appraisalService.createCriteria(appraisals).subscribe((data: any) => {
      this.connection.creating = false;
      location.reload();
    })
  }

}
