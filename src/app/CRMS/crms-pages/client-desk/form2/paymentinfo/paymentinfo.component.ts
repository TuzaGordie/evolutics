import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Form2Service } from '../form2.service';
import {faUpload} from "@fortawesome/free-solid-svg-icons/faUpload";

@Component({
  selector: 'app-paymentinfo',
  templateUrl: './paymentinfo.component.html',
  styleUrls: ['./paymentinfo.component.scss']
})
export class CRMSPaymentinfoComponent implements OnInit {

  newPaymentForm:any = FormGroup;
  countryList:any = []
  banknameList:any = []
  sortCodeList:any = []
  providerList:any = []
  bankModel:any = true;
  sortCode:any;
  mobileModel:any = false;
  fileName:any

  constructor(public allFormService: Form2Service) { }

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
      this.allFormService.paymentInfo(this.newPaymentForm.value);
    }
    else if(this.mobileModel == true && this.bankModel == false){
      delete this.newPaymentForm.value.accountName
      delete this.newPaymentForm.value.bankBranch
      delete this.newPaymentForm.value.bankName
      delete this.newPaymentForm.value.sortCode
      this.allFormService.paymentInfo(this.newPaymentForm.value);
    }
    else{
      console.log("failed store data")
    this.allFormService.paymentInfo(this.newPaymentForm.value);

  }
}
 /*  closeBank(){
    console.log("tab")
    this.allFormService.closeBankDetails();
    } */
  faUpload: any = faUpload;
    setCountryList(){
      this.allFormService.getCountryList().subscribe( res => {
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
  this.allFormService.getBanknameList().subscribe( res => {
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
      this.allFormService.getSortList().subscribe( res => {
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
  this.allFormService.getProviderList().subscribe( res => {
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
    getImage(){
      let as = document.getElementById('filebtn')?.click()
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
      this.allFormService.tabChange(tab)
      }
}

