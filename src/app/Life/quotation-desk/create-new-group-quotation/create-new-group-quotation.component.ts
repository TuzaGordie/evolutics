import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { CreateQuotationService } from '../service/create-quotation.service';
import { FindQuotationService } from '../service/find-quotation.service';

declare var $: any;

@Component({
  selector: 'app-create-new-group-quotation',
  templateUrl: './create-new-group-quotation.component.html',
  styleUrls: ['./create-new-group-quotation.component.scss']
})
export class CreateNewGroupQuotationComponent implements OnInit {
  private nbofAgent: number = 1;
  isRp1Check: boolean = false;
  toggleClass: boolean = false;
  toggleClass2: boolean = false;
  paymentMethod: any;
  viewClientForm: FormGroup;
  clientNo: string = '';
  productClass: string;
  productCode: string;
  client: any = {};

  isSubGroup: boolean = false;
  isCoinsured: boolean = false;
  private nbofSg: number = 1;
  private nbofMember: number = 1;
  private nbofCoin: number = 1;
  private nbofRsa: number = 1;

  currenciesList = [];
  premiumPaymentMethodsList = [];
  premiumPaymentFrequenciesList = [];
  discountCodesList = [];
  sumAssuredBasesList = [];
  branchCodesList = [];
  relationshipsManagerList = [];
  subRelationshipsManagerList = [];
  contributionFrequenciesList = [];
  targetBasesList = [];
  annuityFrequenciesList = [];
  annuityAnnualEscalationBasesList = [];
  pricingBasesList = [];
  paymentMethodsList = [];
  targetContributionFrequenciesList = [];
  atMaturityConvertToList = [];
  basesForConversionList = [];
  relBasesList = [];
  relationshipsList = [];
  usersList = [];

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    public findQuotationService: FindQuotationService,
    public createQuotationService: CreateQuotationService,public uS: UtilityService,
  ) {
    this.clientNo = this.activatedRoute.snapshot.queryParamMap.get('clientNo');
    this.productCode = this.createQuotationService.groupQuotationInfo?.productCode;
    this.productClass = this.createQuotationService.groupQuotationInfo?.productClass;
  }

  ngOnInit(): void {
    this.setCurrenciesList();
    this.setPremiumPaymentMethodsList();
    this.setPremiumPaymentFrequenciesList();
    this.setDiscountCodesList();
    this.setSumAssuredBasesList();
    this.setBranchCodesList();
    this.setRelationshipsManagerList();
    this.setContributionFrequenciesList();
    this.setTargetBasesList();
    this.setAnnuityFrequenciesList();
    this.setAnnuityAnnualEscalationBasesList();
    this.setPricingBasesList();
    this.setPaymentMethodsList();
    this.setTargetContributionFrequenciesList();
    this.setAtMaturityConvertToList();
    this.setBasesForConversionList();
    this.setRelBasesList();
    this.setRelationshipsList();
    this.setUsersList();
    this.createClientForm();
    this.getClient(this.clientNo);
  }

  showRp1Modal() {
    $('#rt1modal').modal('show')
  }

  showRp2Modal() {
    $('#rt2modal').modal('show')
  }

  showRp3Modal() {
    $('#rt3modal').modal('show')
  }

  showRp4Modal() {
    $('#rt4modal').modal('show')
  }

  showRp5Modal() {
    $('#rt5modal').modal('show')
  }

  showRp6Modal() {
    $('#rt6modal').modal('show')
  }

  agentCounter() {
    return new Array(this.nbofAgent);
  }

  agentInc() {
    this.nbofAgent = this.nbofAgent + 1
  }

  uncheckrp1() {
    this.isRp1Check = false;
  }

  checkrp1() {
    this.isRp1Check = true;
  }

  hideRp1Modal() {
    console.log("of")
    $('#rt1modal').modal('hide')
  }
  setPlan(element: any) {

    if(element.value == "DDebit"){
      $('#paymentMethodModal').modal('show')
    }
  }

  sgCounter() {
    return new Array(this.nbofSg);
  }

  sgInc() {
    this.nbofSg = this.nbofSg + 1
  }

  memberCounter() {
    return new Array(this.nbofMember);
  }

  memberInc() {
    this.nbofMember = this.nbofMember + 1
  }
  coinCounter() {
    return new Array(this.nbofCoin);
  }

  coinInc() {
    this.nbofCoin = this.nbofCoin + 1
  }


  rsaCounter() {
    return new Array(this.nbofRsa);
  }

  rsaInc() {
    this.nbofRsa = this.nbofRsa + 1
  }

  setFormData(data: any){
    this.viewClientForm.patchValue({
      fullName: data?.fullName,
      redgName: data?.redgName,
      noOfEmployee: data?.noOfEmployee,
      financialSizeCategory: data?.financialSizeCategory,
      sector: data?.sector,
      phoneNo: data?.phoneNumber,
      phoneNo2: data?.alternativePhoneNumber,
      email: data?.email,
      website: data?.website,
      address: data?.address,
      crm: data?.crmId,
      category: data?.category,
      language: data?.language,
      dateCreated: data?.dateCreated,
      state: data?.state,
      providerType: data?.providerType,
      band: data?.band,
      bankNo: data?.bankNo,
      clv: data?.clv,
      communication: data?.communication,
      providerCode: data?.providerCode,
      noOfGroups: data?.noOfGroups,
      socialMedia: data?.socialmedia,
      providerCategory: data?.providerCategory,
      providerSubCategory: data?.providerSubCategory,
      groupNo: data?.groupNo,
    })
  }
  createClientForm(){
    this.viewClientForm = new FormGroup({
      fullName: new FormControl(null),
      redgName: new FormControl(null),
      noOfEmployee: new FormControl(null),
      financialSizeCategory: new FormControl(null),
      sector: new FormControl(null),
      phoneNo: new FormControl(null),
      phoneNo2: new FormControl(null),
      email: new FormControl(null),
      website: new FormControl(null),
      address: new FormControl(null),
      crm: new FormControl(null),
      category: new FormControl(null),
      language: new FormControl(null),
      dateCreated: new FormControl(null),
      state: new FormControl(null),
      providerType: new FormControl(null),
      band: new FormControl(null),
      bankNo: new FormControl(null),
      clv: new FormControl(null),
      communication: new FormControl(null),
      providerCode: new FormControl(null),
      noOfGroups: new FormControl(null),
      socialMedia: new FormControl(null),
      providerCategory: new FormControl(null),
      providerSubCategory: new FormControl(null),
      groupNo: new FormControl(null),
    })
  }

  getClient(clientNo: string){
    // if coming here from a previous page (there's client data in the service), then use that info, else, fetch from the API
    if (this.createQuotationService.clientInfo){
      this.client = this.createQuotationService.clientInfo;
      this.setFormData(this.client);
    }else{
      this.findQuotationService.getClient(clientNo)
      .subscribe(
        res => {
          this.client = res;
          this.setFormData(this.client);
        },
        (err: HttpErrorResponse) => {
          this.uS.notify(`Client with client number ${clientNo} does not exist`, 0);
          console.log('Error fetching info for client number:' + clientNo, err)
        }
      )
    }
  }

  setCurrenciesList(){
    this.createQuotationService.getCurrenciesList()
    .subscribe((res: any[]) => {
      this.currenciesList = res;
    })
  }

  setPremiumPaymentMethodsList(){
    this.createQuotationService.getPaymentMethodsList()
    .subscribe((res: any[]) => {
      this.paymentMethodsList = res;
    })
  }

  setPremiumPaymentFrequenciesList(){
    this.createQuotationService.getPremiumPaymentFrequenciesList()
    .subscribe((res: any[]) => {
      this.premiumPaymentFrequenciesList = res;
    })
  }

  setDiscountCodesList(){
    this.createQuotationService.getDiscountCodesList()
    .subscribe((res: any[]) => {
      this.discountCodesList = res;
    })
  }

  setSumAssuredBasesList(){

  }

  setBranchCodesList(){

  }

  setRelationshipsManagerList(){

  }

  setContributionFrequenciesList(){
    this.createQuotationService.getContributionFrequenciesList()
    .subscribe((res: any[]) => {
      this.targetContributionFrequenciesList = res;
    })
  }

  setTargetBasesList(){
    this.createQuotationService.getTargetBasesList()
    .subscribe((res: any[]) => {
      this.targetBasesList = res;
    })
  }

  setAnnuityFrequenciesList(){

  }

  setAnnuityAnnualEscalationBasesList(){
    this.createQuotationService.getAnnuityAnnualEscalationBasesList()
    .subscribe((res: any[]) => {
      this.annuityAnnualEscalationBasesList = res;
    })
  }

  setPricingBasesList(){
    this.createQuotationService.getPricingBasesList()
    .subscribe((res: any[]) => {
      this.pricingBasesList = res;
    })
  }

  setPaymentMethodsList(){
    this.createQuotationService.getPaymentMethodsList()
    .subscribe((res: any[]) => {
      this.paymentMethodsList = res;
    })
  }

  setTargetContributionFrequenciesList(){
    this.createQuotationService.getContributionFrequenciesList()
    .subscribe((res: any[])=> {
      this.targetContributionFrequenciesList = res;
    })
  }

  setAtMaturityConvertToList(){
    this.createQuotationService.getAtMaturityConvertToList()
    .subscribe((res: any[]) => {
      this.atMaturityConvertToList = res;
    })
  }

  setBasesForConversionList(){

  }

  setRelBasesList(){

  }

  setRelationshipsList(){

  }

  setUsersList(){

  }
}
