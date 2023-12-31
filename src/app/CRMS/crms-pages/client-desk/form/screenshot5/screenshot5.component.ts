import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-screenshot5',
  templateUrl: './screenshot5.component.html',
  styleUrls: ['./screenshot5.component.scss']
})
export class CRMSScreenshot5Component implements OnInit {

  newPaymentForm:any = FormGroup;
  countryList:any = []
  banknameList:any = []
  sortCodeList:any = []
  providerList:any = []
  bankModel:any = true;
  sortCode:any;
  mobileModel:any = false;
  
  constructor(private formService: ServiceService) { }

  ngOnInit(): void {
    this.newPaymentForm = new FormGroup({
      country: new FormControl(null,Validators.required),
      sortCode: new FormControl(null,Validators.required),
      bankName: new FormControl(null,Validators.required),
      accountNo: new FormControl(null,Validators.required),
      bankBranch: new FormControl(null,Validators.required),
      accountName: new FormControl(null,Validators.required),
      provider: new FormControl(null,Validators.required)
      
    })
    this.setCountryList()
    this.setBanknameList()
    this.setSortcodeList()
    this.setProviderList()
  }
  get validation() { return this.newPaymentForm?.controls }
  onSubmit(){
    console.log(this.newPaymentForm)
    this.formService.newPaymentInfo(this.newPaymentForm.value);
   
  }
 /*  closeBank(){
    console.log("tab")
    this.formService.closeBankDetails();
    } */
    setCountryList(){
      this.formService.getCountryList().subscribe( res => {
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
  this.formService.getBanknameList().subscribe( res => {
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
      this.formService.getSortList().subscribe( res => {
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
  this.formService.getProviderList().subscribe( res => {
    this.providerList = res;
    console.log("providerList",res)
  })
}
    upload(event:any){
      let file = event.target.files[0];
      console.log("imagefile",file)
      console.log("imagepath",file.name)
    }
    showBankModel(){
    this.bankModel = true;
    this.mobileModel = false;
    }
    showMobileModel(){
      this.mobileModel = true;
      this.bankModel = false;
    }
}
