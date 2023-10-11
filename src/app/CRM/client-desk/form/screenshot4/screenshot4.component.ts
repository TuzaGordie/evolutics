import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-screenshot4',
  templateUrl: './screenshot4.component.html',
  styleUrls: ['./screenshot4.component.scss']
})
export class Screenshot4Component implements OnInit {

  newPaymentForm:any = FormGroup;
  countryList:any = []
  banknameList:any = []
  sortCodeList:any = []
  providerList:any = []
  bankModel:any = true;
  sortCode:any;
  mobileModel:any = false;
  fileName:any;
  
  constructor(private formService: ServiceService) { }

  ngOnInit(): void {
    this.newPaymentForm = new FormGroup({
      country: new FormControl(null,Validators.required),
      sortCode: new FormControl(null),
      bankName: new FormControl(null),
      accountNo: new FormControl(null),
      bankBranch: new FormControl(null),
      accountName: new FormControl(null),
      provider: new FormControl(null)
      
    })
    
    this.setCountryList()
    this.setBanknameList()
    this.setSortcodeList()
    this.setProviderList()
  }
  get validation() { return this.newPaymentForm?.controls }
  onSubmit(){
    console.log(this.newPaymentForm)
    if(this.bankModel == true && this.mobileModel == false)
    {
      delete this.newPaymentForm.value.provider
      this.formService.newPaymentInfo(this.newPaymentForm.value);
    }
    else if(this.mobileModel == true && this.bankModel == false){
      delete this.newPaymentForm.value.accountName
      delete this.newPaymentForm.value.bankBranch
      delete this.newPaymentForm.value.bankName
      delete this.newPaymentForm.value.sortCode
      this.formService.newPaymentInfo(this.newPaymentForm.value);
    }
    else{
      console.log("failed store data")
    }
    /* this.closeBank() */
  }
  /* closeBank(){
    console.log("tab")
    this.formService.closeBankDetails();
    } */
    changeTab(tab:any){
      console.log("tab")
      this.formService.tabChange(tab)
      }
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
      this.fileName = file.name
    }
    getImage(){
      let as = document.getElementById('filebtn')?.click()
    }
    showBankModel(){
    this.bankModel = true;
    this.mobileModel = false;
    this.newPaymentForm.reset()
    }
    showMobileModel(){
      this.mobileModel = true;
      this.bankModel = false;
      this.newPaymentForm.reset()
    }
}
