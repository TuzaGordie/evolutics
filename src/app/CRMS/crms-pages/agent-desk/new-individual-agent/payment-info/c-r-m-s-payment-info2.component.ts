import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {faUpload} from "@fortawesome/free-solid-svg-icons/faUpload";
import { IndividualAgentService } from '../services/individual-agent.service';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class CRMSPaymentInfo2Component implements OnInit {

  newPaymentForm:any = FormGroup;
  bankModel:any = true;
  sortCode:any;
  mobileModel:any = false;
  countryList:any = []
  banknameList:any = []
  sortCodeList:any = []
  providerList:any = []
  fileName:any;
  faUpload = faUpload

  constructor(public individualService:IndividualAgentService) { }

  ngOnInit(): void {
    this.newPaymentForm = new FormGroup({
      country: new FormControl(null,Validators.required),
      sortCode: new FormControl(null),
      bankName: new FormControl(null),
      bankBranch: new FormControl(null),
      accountName: new FormControl(null),
      accountNo: new FormControl(null),
      provider: new FormControl(null)

    })
    this.setCountryList()
    this.setBanknameList()
    this.setSortcodeList()
    this.setProviderList()
  }
  get validation() {
    /*  console.log("validator",this.newPaymentForm?.controls) */
    return this.newPaymentForm?.controls
  }
  onSubmit(){
    console.log(this.newPaymentForm)
    console.log(this.newPaymentForm)
    if(this.bankModel == true && this.mobileModel == false)
    {
      delete this.newPaymentForm.value.provider
      this.individualService.paymentInfo(this.newPaymentForm.value);
    }
    else if(this.mobileModel == true && this.bankModel == false){
      delete this.newPaymentForm.value.accountName
      delete this.newPaymentForm.value.bankBranch
      delete this.newPaymentForm.value.bankName
      delete this.newPaymentForm.value.sortCode
      this.individualService.paymentInfo(this.newPaymentForm.value);
    }
    else{
      console.log("failed store data")
      this.individualService.paymentInfo(this.newPaymentForm.value);

    }
  }
  getImage(){
    let as = document.getElementById('filebtn')?.click()
  }

  setCountryList(){
    this.individualService.getCountryList().subscribe( res => {
      this.countryList = res;
      console.log("countrylist",res)
    })
  }

  setBanknameList(){
    /*  this.formService.getBanknameList().subscribe( res => {
       this.banknameList = res;
       console.log("banknameList",res)
     }) */

    let selectedBank = this.newPaymentForm.get("country")?.value
    console.log("selected Bank",selectedBank)
    this.individualService.getBanknameList().subscribe( res => {
      this.banknameList = res;
      this.banknameList=this.banknameList.filter((element:any)=>{
        return element.country==selectedBank
      })
      this.newPaymentForm.patchValue({bankName:null, sortCode:null })
      console.log("bankName",this.banknameList)
    })
  }

  setSortcodeList(){
    let selectedSort = this.newPaymentForm.get("bankName")?.value
    console.log("selected Bank",selectedSort)
    this.individualService.getSortList().subscribe( res => {
      this.sortCodeList = res;
      this.sortCodeList=this.sortCodeList.filter((element:any)=>{
        return element.BANK_CODE==selectedSort
      })
      /* this.newPaymentForm.patchValue({bankName:null }) */
      console.log("selectedSort",this.sortCodeList)
      this.sortCode = this.sortCodeList[0].SORT_CODE
      console.log("code",this.sortCode)
    })
  }

  setProviderList(){
    this.individualService.getProviderList().subscribe( res => {
      this.providerList = res;
      console.log("providerList",res)
    })
  }
  upload(event:any){
    let file = event.target.files[0];
    console.log("imagefile",file)
    console.log("imagepath",file.name)
    this.fileName = file.name
  }
  showBankModel(){
    this.bankModel = true;
    this.mobileModel = false;
  }
  showMobileModel(){
    this.mobileModel = true;
    this.bankModel = false;
  }
  changeTab(tab:any){
    console.log("tab")
    this.individualService.tabChange(tab)
  }

}
