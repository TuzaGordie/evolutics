import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FindClientService } from 'src/app/Life/client-desk/service/find-client.service';
import { IndividualAgentService } from '../services/individual-agent.service';
declare var $: any;

@Component({
  selector: 'app-owner-info2',
  templateUrl: './owner-info.component.html',
  styleUrls: ['./owner-info.component.scss']
})
export class CRMSOwnerInfoComponentOwnerInfoComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    //console.log("individual agent", this.individualService.individualClientInfo)

    /**this.ownerForm = new FormGroup({
      fullName: new FormControl(null),
      redgNo: new FormControl(null),
      employeNo: new FormControl(null),
      financial: new FormControl(null),
      sector: new FormControl(null),
      phoneNo: new FormControl(null),
      phoneNo2: new FormControl(null),
      email: new FormControl(null),
      website: new FormControl(null),
      address: new FormControl(null),
      crmid: new FormControl(null),
      clientCategory: new FormControl(null),
      language: new FormControl(null),
      date: new FormControl(null),
      state: new FormControl(null),
      providerCategory: new FormControl(null),
      brand: new FormControl(null),
      bankNo: new FormControl(null),
      clv: new FormControl(null),
      communication: new FormControl(null),
      subCategory: new FormControl(null),
      groups: new FormControl(null),
      groupNo: new FormControl(null),
      socialmedia: new FormControl(null),
      providerCode: new FormControl(null),
      firstName: new FormControl(null),
      middleName: new FormControl(null),
      surname: new FormControl(null),
      gender: new FormControl(null),
      email2: new FormControl(null),
      dob: new FormControl(null),
      category: new FormControl(null),
      kyc: new FormControl(null),
      idNo: new FormControl(null),
      employer: new FormControl(null),
      crm: new FormControl(null),
      dateCreated: new FormControl(null),
      maritalStatus: new FormControl(null),
      band: new FormControl(null),
      enroleeNo: new FormControl(null),
      suffix: new FormControl(null)
    })**/

    //this.setFormData(this.individualService.individualClientInfo)
   // console.log("formdata", this.ownerForm.value)
    /*  this.ownerForm.patchValue(this.corporateService.corporateClientInfo) */
   // this.setPolicies()
   // this.setRelationship()
  }

}
