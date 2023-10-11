import { Component, Input, OnInit } from '@angular/core';
import { IClientViewData } from 'src/app/Shared/models/client-desk.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/Services/app.service';
import { DocumentService } from 'src/app/Services/document.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindClientService } from '../../../service/find-client.service';
import { HelpersService } from '../../../service/helpers.service';
import { EditClientComponent } from '../edit-client/edit-client.component';

@Component({
  selector: 'app-view-corporate-client-comp',
  templateUrl: './view-corporate-client.component.html',
  styleUrls: ['./view-corporate-client.component.scss'],
})
export class ViewCorporateClientComponent implements OnInit {
  @Input('client') set _client(res: IClientViewData) {
    this.loading = true;
    this.clientNo = res.clientNo;
    console.log('client data', res);
    this.clientData = res;
    console.log('client type', this.clientData.type);
    this.setFormData(this.clientData);
    // debugger
    this.loading = false;
  }
  clientNo: string;
viewClientForm = new FormGroup({
      address: new FormControl(null),
      band: new FormControl(null),
      bankNo: new FormControl(null),
      category: new FormControl(null),
      clv: new FormControl(null),
      communication: new FormControl(null),
      createdOn: new FormControl(null),
      crm: new FormControl(null),
      crmId: new FormControl(null),
      dateCreated: new FormControl(null),
      dateOfBirth: new FormControl(null),
      dob: new FormControl(null),
      email: new FormControl(null),
      email2: new FormControl(null),
      employer: new FormControl(null),
      enroleeNo: new FormControl(null),
      segment: new FormControl(null),
      firstName: new FormControl(null),
      fullName: new FormControl(null),
      gender: new FormControl(null),
      groupNo: new FormControl(null),
      idNo: new FormControl(null),
      kyc: new FormControl(null),
      language: new FormControl(null),
      maritalStatus: new FormControl(null),
      middleName: new FormControl(null),
      noOfEmployee: new FormControl(null),
      noOfGroups: new FormControl(null),
      occupationGroup: new FormControl(null),
      phoneNo: new FormControl(null),
      phoneNo2: new FormControl(null),
      providerCategory: new FormControl(null),
      providerCode: new FormControl(null),
      providerSubCategory: new FormControl(null),
      redgNo: new FormControl(null),
      sector: new FormControl(null),
      socialmedia: new FormControl(null),
      state: new FormControl(null),
      suffix: new FormControl(null),
      surname: new FormControl(null),
      title: new FormControl(null),
      type: new FormControl(null),
      website: new FormControl(null),
    });
  @Input() loading: boolean;
  @Input('clientNo') set _clientNo(v: string) {
    this.clientNo = v;
    this.loading = true;
    this.clientS.getClientViewData(this.clientNo).subscribe(
      (res) => {
        // debugger
        console.log('client data', res);
        this.clientData = res;
        console.log('client type', this.clientData.type);
        this.setFormData(this.clientData);
        this.loading = false;
      },
      (err) => {
        // debugger
        console.log(err);
        this.utilityService.info(err, 0);
        // .then(() => this.utilityService.back());
      }
    );
  } 
  readonlyValue: any;
  policyLength: any;
  relationshipLength: any;
  quoteList: any;
  pendingPaymentsList: any;
  paymentLength: any;
  getAge; // a utility function to calculate from date of birth
  clientData: IClientViewData;
  busline = this.appS.busLine;
  private nbofId: number = 1;
  pp: string;
  clientStatus: { code: string; title: string };
  getStatusColour;
  statusCodesList: any[];
  agentNo: string;

  constructor(
    public clientS: FindClientService,
    public route: ActivatedRoute,
    public docS: DocumentService,
    private utilityService: UtilityService,
    private helpersAndConstants: HelpersService,
    public appS: AppService
  ) {
    this.getAge = this.helpersAndConstants.getAge;
    this.getStatusColour = this.helpersAndConstants.getStatusColour;
  }

  ngOnInit(): void {
    /* if(this.clientData){
      console.log("cliiii",this.clientData?.client)
      this.setFormData(this.clientData?.client)
} */
    /* this.setFormData(this.findClientService.clientInfo?.Client) */
    console.log('formdata', this.viewClientForm.value);
    /*  this.findClientService.submitPostData(this.viewClientForm.value).subscribe(res => {
      console.log(res)
    }) */
    this.setPolicies(this.clientNo);
    this.setRelationship(this.clientNo);
    /*  this.setPendingQuotes(); */
    this.setPendingPayments(this.clientNo, this.busline);
    this.setClientPassport(this.clientNo);
    this.setStatusCodesList();
  }
  changePP(e?: any) {
    this.docS
      .upload(e, {
        refNo: this.clientData.clientNo,
        refCat: 'CLI',
        subCategory: 'PP',
        title: e.name,
      })
      .subscribe(
        (r) => {
          console.log('post pp', r);
        },
        (e) => {
          console.error(e);
        }
      );
  }
  setPolicies(id) {
    this.clientS.getPoliciesApi(id).subscribe((res) => {
      const policyList: any = res;
      this.policyLength = policyList?.length;
      console.log('policy Info', this.policyLength);
    });
  }
  setRelationship(id) {
    this.clientS.getRelationshipApi(id).subscribe((res) => {
      const relationList: any = res;
      this.relationshipLength = relationList?.length;
      console.log('relationship Info', this.relationshipLength);
    });
  }
  setPendingQuotes(id) {
    let id1 = this.appS.getCurrentSystemMetadata.busline;
    this.clientS.getPendingQuotesApi(id, id1).subscribe((res) => {
      this.quoteList = res;
      console.log('quotes Info', res);
    });
  }
  setPendingPayments(id, id1) {
    this.clientS.getPendingPaymentsApi(id, id1).subscribe((res) => {
      this.pendingPaymentsList = res;
      this.paymentLength = this.pendingPaymentsList?.length;
      console.log('payment Info', res);
    });
  }
  onSubmit() {
    console.log('formdata', this.viewClientForm.value);
    /*    this.findClientService.ownerInfo(this.viewClientForm.value); */
    this.setEditFormData(this.viewClientForm.value);
    /*  this.findClientService.updateClientInfo() */
  }
  onNext() {
    console.log('formdata', this.viewClientForm.value);
    /*  this.findClientService.ownerInfo(this.viewClientForm.value); */
  }

  onEdit(value: any) {
    this.readonlyValue = value;
    console.log('formdata', this.viewClientForm.value);
  }
  checkReadonly(value: any) {
    /*  if(value == this.readonlyValue){
     return false;
   }
   else{
     return true;
   } */
  }
  checkHighlight(value: any) {
    if (value == this.readonlyValue) {
      return true;
    } else {
      return false;
    }
  }
  setFormData(data: any) {
    this.viewClientForm.patchValue({
      address: data?.address,
      band: data?.band,
      bankNo: data?.bankNo,
      category: data?.category,
      clv: data?.clv,
      communication: data?.communication,
      crm: data?.crmId,
      crmId: data?.crmId,
      dateCreated: data?.dateCreated,
      dateOfBirth: data?.dateOfBirth,
      dob: data?.Dateofbirth,
      email: data?.email,
      email2: data?.email,
      employer: data?.employer,
      enroleeNo: data?.enroleeNo,
      segment: data?.segment,
      firstName: data?.firstName,
      fullName: data?.fullName,
      gender: data?.gender,
      groupNo: data?.groupNo,
      idNo: data?.IDnumber,
      kyc: data?.kyc,
      language: data?.language,
      maritalStatus: data?.maritalStatus,
      middleName: data?.middleName,
      noOfEmployee: data?.noOfEmployee,
      noOfGroups: data?.noOfGroups,
      phoneNo: data?.phoneNumber,
      phoneNo2: data?.phoneNumber,
      providerCategory: data?.providerCategory,
      providerCode: data?.providerNo,
      providerSubCategory: data?.providerSubCategory,
      redgNo: data?.redgNo,
      sector: data?.sector,
      socialmedia: data?.socialMedia,
      state: data?.state,
      suffix: data?.suffix,
      surname: data?.surname,
      title: data?.title,
      type: data?.type,
      website: data?.website,
    });
  }

  setEditFormData(data: any) {
    this.viewClientForm.patchValue({
      address: data?.address,
      band: data?.band,
      bankNo: data?.bankNo,
      category: data?.category,
      clv: data?.clv,
      communication: data?.communication,
      createdOn: data?.createdOn,
      crm: data?.crm,
      crmId: data?.crmId,
      dateCreated: data?.dateCreated,
      dateOfBirth: data?.dateOfBirth,
      dob: data?.dob,
      email: data?.email,
      email2: data?.email2,
      employer: data?.employer,
      enroleeNo: data?.enroleeNo,
      segment: data?.segment,
      firstName: data?.firstName,
      fullName: data?.fullName,
      gender: data?.gender,
      groupNo: data?.groupNo,
      idNo: data?.idNo,
      kyc: data?.kyc,
      language: data?.language,
      maritalStatus: data?.maritalStatus,
      middleName: data?.middleName,
      noOfEmployee: data?.noOfEmployee,
      noOfGroups: data?.noOfGroups,
      occupationGroup: data?.occupationGroup,
      phoneNo: data?.phoneNo,
      phoneNo2: data?.phoneNo2,
      providerCategory: data?.providerCategory,
      providerCode: data?.providerCode,
      providerSubCategory: data?.providerSubCategory,
      redgNo: data?.redgNo,
      sector: data?.sector,
      socialmedia: data?.socialmedia,
      state: data?.state,
      suffix: data?.suffix,
      surname: data?.surname,
      title: data?.title,
      type: data?.type,
      website: data?.website,
    });
  }

  setClientPassport(clientNo) {
    this.clientS
      .getClientPassport(clientNo)
      .subscribe((res) => (this.pp = res));
  }

  setClientStatus(clientNo, statusCodesList) {
    this.clientS.getClientStatus(clientNo).subscribe(
      (res) =>
        (this.clientStatus = statusCodesList.find(
          (status) => status.code === res
        )),
      (err: HttpErrorResponse) =>
        console.log(
          'Error fetching the client status for client number: ' + clientNo,
          err
        )
    );
  }

  setStatusCodesList() {
    this.clientS.getClientStatusCodes().subscribe(
      (res: any[]) => {
        this.statusCodesList = res;
        this.setClientStatus(this.clientNo, this.statusCodesList);
      },
      (err: HttpErrorResponse) =>
        console.log('Error fetching status codes', err)
    );
  }

  getDocumentsBaseURL() {
    return this.clientS.getDocumentsBaseURL();
  }

  editbankNo() {
    /*  $('#editbank').modal('show'); */
  }
  editKyc() {
    /*  $('#editkyc').modal('show'); */
  }
  idCounter() {
    return new Array(this.nbofId);
  }
  idInc() {
    this.nbofId = this.nbofId + 1;
  }
  idDec() {
    this.nbofId = this.nbofId - 1;
    if (this.nbofId <= 0) {
      this.nbofId = 1;
    }
  }
  editClient() {
    this.utilityService.dialogOpener(
      EditClientComponent,
      { data: { client: this.viewClientForm } },
      (data) => {
        this._clientNo = this.clientNo;
      },
      () => console.log('Cancelled client editing')
    );
  }
}
