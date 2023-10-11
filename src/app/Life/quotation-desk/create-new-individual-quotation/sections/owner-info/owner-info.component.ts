import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IClientDetails } from 'src/app/General/services/quotation.interface';

@Component({
  selector: 'q-individual-owner-info',
  templateUrl: './owner-info.component.html',
  styleUrls: ['./owner-info.component.scss']
})

export class OwnerInfoComponent implements OnInit {
  viewClientForm: FormGroup;
  clientDetails: IClientDetails
  isCoverDetailsCheck = {}
  currentModalCoverCode: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.clientDetails = this.route.snapshot.data['clientDetails']

    this.viewClientForm = new FormGroup({
      title: new FormControl(null),
      fullName: new FormControl(null),
      firstName: new FormControl(null),
      middleName: new FormControl(null),
      surname: new FormControl(null),
      gender: new FormControl(null),
      phoneNo: new FormControl(null),
      phoneNo2: new FormControl(null),
      email: new FormControl(null),
      email2: new FormControl(null),
      address: new FormControl(null),
      dob: new FormControl(null),
      category: new FormControl(null),
      kyc: new FormControl(null),
      idNo: new FormControl(null),
      language: new FormControl(null),
      employer: new FormControl(null),
      crm: new FormControl(null),
      bankNo: new FormControl(null),
      dateCreated: new FormControl(null),
      communication: new FormControl(null),
      maritalStatus: new FormControl(null),
      band: new FormControl(null),
      groupNo: new FormControl(null),
      clv: new FormControl(null),
      occupationGroup: new FormControl(null),
      socialMedia: new FormControl(null),
      providerCode: new FormControl(null),
      enroleeNo: new FormControl(null),
      noOfEmployee: new FormControl(null),
      sector: new FormControl(null),
      website: new FormControl(null),
      financialSizeCategory: new FormControl(null),
      state: new FormControl(null),
      providerCategory: new FormControl(null),
      providerSubCategory: new FormControl(null),
    })
  }

  closeCoverScreen(save: boolean = false){
    if(save){
      // save button was clicked
      this.checkCoverDetails(this.currentModalCoverCode)
    }else{
      // cancel button was clicked
      this.unCheckCoverDetails(this.currentModalCoverCode)
    }
  }

  unCheckCoverDetails(code: string) {
    this.isCoverDetailsCheck[code] = false;
  }

  checkCoverDetails(code: string) {
    this.isCoverDetailsCheck[code] = true;
  }
}
