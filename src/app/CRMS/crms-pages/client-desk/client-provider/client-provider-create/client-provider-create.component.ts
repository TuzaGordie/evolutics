import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FindClientService } from '../../service/find-client.service';

@Component({
  selector: 'app-client-provider-create',
  templateUrl: './client-provider-create.component.html',
  styleUrls: ['./client-provider-create.component.scss'],
})
export class CRMSCreateNewProviderComponent implements OnInit {
  testList: any = [];
  viewClientForm: any = FormGroup;
  viewTestForm: any = FormGroup;
  readonlyValue: any;
  policyLength: any;
  relationshipLength: any;
  quoteList: any;
  pendingPaymentsList: any;
  paymentLength: any;
  providerTypeList: any = [];
  providerSubCategoryList: any = [];

  postProviderForm: any = new FormGroup({});
  providerNetworkList: any = [];
  disciplineCatList: any = [];
  disciplineList: any = [];
  providerStatusList: any = [];
  tarrifCodeList: any = [];
  qtyBasisList: any = [];
  paymentMethodList: any = [];
  paymentFreqList: any = [];

  licenseTypeList: any = [];
  licenseAuthList: any = [];
  providerJSOnList: any = [];
  CreateProviderForm: FormGroup = new FormGroup({});
  toggleClass: boolean = false;
  toggleClass2: boolean = false;

  constructor(public findClientService: FindClientService) {}

  ngOnInit(): void {
    this.setTestList();


    this.CreateProviderForm = new FormGroup({
      id: new FormControl(0),
      clientProvider: new FormGroup({
        busLine: new FormControl(null),
        clientNo: new FormControl(null),
        discipline: new FormControl(null),
        facilityDescription: new FormControl(null),
        fullName: new FormControl(null),
        hqAddress: new FormControl(null),
        hqCity: new FormControl(null),
        hqCountry: new FormControl(null),
        hqRegion: new FormControl(null),
        hqTown: new FormControl(null),
        id: new FormControl(0),
        providerCat: new FormControl(null),
        providerNo: new FormControl(null),
        providerSubcat: new FormControl(null),
        statementAction: new FormControl(null),
      }),
      clientProviderLicense: new FormGroup({
        certNo: new FormControl(null),
        createdBy: new FormControl(null),
        createdOn: new FormControl(null),
        id: new FormControl(0),
        licenceExpiry: new FormControl(null),
        licenceLastChecked: new FormControl(null),
        licenceStart: new FormControl(null),
        licenceType: new FormControl(null),
        licensedAuthority: new FormControl(null),
        licensedCountry: new FormControl(null),
        providerNo: new FormControl(null),
      }),
      providerBranches: new FormGroup({
        branchAddress: new FormControl(null),
        branchCity: new FormControl(null),
        branchCode: new FormControl(null),
        branchCountry: new FormControl(null),
        branchName: new FormControl(null),
        branchRegion: new FormControl(null),
        branchTown: new FormControl(null),
        id: new FormControl(0),
      }),
      providerDiscipline: new FormGroup({
        busLine: new FormControl(null),
        discipline: new FormControl(null),
        disciplineCat: new FormControl(null),
        disciplineCategory: new FormControl(null),
        id: new FormControl(0),
        providerNo: new FormControl(null),
        quantity: new FormControl(null),
        quantityBasis: new FormControl(null),
      }),
    });

    this.postProviderForm = new FormGroup({
      id: new FormControl(0),
      providerCat: new FormControl(null),
      sub_category: new FormControl(null),
      network: new FormControl(null),
      discipline_cat: new FormControl(null),
      discipline: new FormControl(null),
      PROVIDER_STATUS: new FormControl(null),
      TARRIF_CODE: new FormControl(null),
      QUANTITY_BASIS: new FormControl(null),
      QUANTITY: new FormControl(null),
      FACILITY_DESCRIPTION: new FormControl(null),
      BRANCH_ADDRESS: new FormControl(null),
      BRANCH_TOWN: new FormControl(null),
      BRANCH_CITY: new FormControl(null),
      BRANCH_REGION: new FormControl(null),
      BRANCH_COUNTRY: new FormControl(null),
      PAY_METHOD: new FormControl(null),
      PAYEE_NAME: new FormControl(null),
      PAY_FREQ: new FormControl(null),
      LICENSE_TYPE: new FormControl(null),
      LICENSE_AUTHORITY: new FormControl(null),
      LICENSE_ISSUE_DATE: new FormControl(null),
      LICENSE_EXPIRY_DATE: new FormControl(null),
      LICENSE_condition: new FormControl(null),
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
      socialmedia: new FormControl(null),
      providerCode: new FormControl(null),
      enroleeNo: new FormControl(null),
      suffix: new FormControl(null),
    });

    this.viewClientForm = new FormGroup({
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
      socialmedia: new FormControl(null),
      providerCode: new FormControl(null),
      enroleeNo: new FormControl(null),
      suffix: new FormControl(null),
    });

    this.setFormData(this.findClientService.clientInfo);
   // console.log('formdata', this.viewClientForm.value);

    //this.setFormData2(this.findClientService.getClientList2);
   // console.log('formdata', this.viewTestForm.value);
    this.setPolicies();
    this.setRelationship();
    this.setPendingQuotes();
    this.setPendingPayments();
    this.setProviderType();
    this.setSubProviderType();
    this.setProviderNetwork();
    this.setDisciplineCat();
    this.setDiscipline();
    this.setProviderStatus();
    this.setTarrifCode();
    this.setQtyBasis();
    this.setPaymentMethod();
    this.setPaymentFreq();
    this.setLicenseType();
    this.setLicenseAuth();
  }

  onSubmitProvider() {
    this.findClientService
      .submitProvider(this.CreateProviderForm.value)
      .subscribe((res) => {
        this.providerJSOnList = res;
        //console.log('post provider', res);
      });
  }

  setTestList() {
    this.findClientService.getClientList2().subscribe((res) => {
      this.testList = res;
      //console.log('rate category', res);
    });
  }

 /** setFormData2(data: any) {
    this.viewTestForm.patchValue({
      testDescription: data?.STATUS,
    });
  }**/

  setPolicies() {
    this.findClientService.getPolicies().subscribe((res) => {
      const policyList: any = res;
      this.policyLength = policyList.length;
     
    });
  }
  setRelationship() {
    this.findClientService.getRelationship().subscribe((res) => {
      const relationList: any = res;
      this.relationshipLength = relationList.length;
    
    });
  }
  setPendingQuotes() {
    this.findClientService.getPendingQuotes().subscribe((res) => {
      this.quoteList = res;
      this.quoteList = this.quoteList.length;
     
    });
  }
  setPendingPayments() {
    this.findClientService.getPendingPayments().subscribe((res) => {
      this.pendingPaymentsList = res;
      this.paymentLength = this.pendingPaymentsList.length;
    
    });
  }



  setFormData(data: any) {
    this.postProviderForm.patchValue({
      fullName: data?.FULL_NAME,
      firstName: data?.FIRST_NAME,
      middleName: data?.MIDDLE_NAME,
      surname: data?.SURNAME,
      gender: data?.GENDER,
      phoneNo: data?.PHONE_NO_1,
      phoneNo2: data?.PHONE_NO_1,
      email: data?.EMAIL_ADD_1,
      email2: data?.EMAIL_ADD_1,
      address: data?.address,
      dob: data?.Dateofbirth,
      category: data?.Category,
      kyc: data?.KYC,
      idNo: data?.IDnumber,
      language: data?.Language,
      employer: data?.Employer,
      crm: data?.CRM_CLIENT_NO,
      bankNo: data?.BankNo,
      dateCreated: data?.DateCreated,
      communication: data?.EMAIL_ADD_1,
      maritalStatus: data?.Maritalstatus,
      band: data?.Band,
      groupNo: data?.GroupNo,
      clv: data?.Clv,
      socialmedia: data?.SocialMedia,
      providerCode: data?.PROVIDER_NO,
      enroleeNo: data?.REL_ENROLEE_NO,
      suffix: data?.suffix,
    });
  }


  onNext() {
    console.log('formdata', this.viewClientForm.value);
    
  }

  onEdit(value: any) {
    this.readonlyValue = value;
    
  }
  checkReadonly(value: any) {
    if (value == this.readonlyValue) {
      return false;
    } else {
      return true;
    }
  }
  checkHighlight(value: any) {
    if (value == this.readonlyValue) {
      return true;
    } else {
      return false;
    }
  }

  setProviderType() {
    this.findClientService.getCodeList('PROVIDER_CAT').subscribe((res) => {
      this.providerTypeList = res;
     
    });
  }

  setSubProviderType() {
    this.findClientService.getCodeList('PROVIDER_SUBCAT').subscribe((res) => {
      this.providerSubCategoryList = res;
      
    });
  }

  setProviderNetwork() {
    this.findClientService.getCodeList('NETWORK_CAT').subscribe((res) => {
      this.providerNetworkList = res;
     
    });
  }

  setDisciplineCat() {
    this.findClientService.getCodeList('DISCIPLINE_CAT').subscribe((res) => {
      this.disciplineCatList = res;
      
    });
  }

  setDiscipline() {
    this.findClientService.getCodeList('DISCIPLINE').subscribe((res) => {
      this.disciplineList = res;
      
    });
  }

  setProviderStatus() {
    this.findClientService.getCodeList('PROVIDER_STATUS').subscribe((res) => {
      this.providerStatusList = res;
      
    });
  }

  setTarrifCode() {
    this.findClientService.getCodeList('PROVIDER_STATUS').subscribe((res) => {
      this.tarrifCodeList = res;
     
    });
  }

  setQtyBasis() {
    this.findClientService.getCodeList('QUANTITY_BASIS').subscribe((res) => {
      this.qtyBasisList = res;
      
    });
  }
  setPaymentMethod() {
    this.findClientService.getCodeList('PAYOUTWARD_METHOD').subscribe((res) => {
      this.paymentMethodList = res;
      
    });
  }

  setPaymentFreq() {
    this.findClientService.getCodeList('FREQUENCY').subscribe((res) => {
      this.paymentFreqList = res;
      
    });
  }

  setLicenseType() {
    this.findClientService.getCodeList('LICENSE_TYPE').subscribe((res) => {
      this.licenseTypeList = res;
      
    });
  }

  setLicenseAuth() {
    this.findClientService.getCodeList('LICENSE_AUTHORITY').subscribe((res) => {
      this.licenseAuthList = res;
      
    });
  }
}
