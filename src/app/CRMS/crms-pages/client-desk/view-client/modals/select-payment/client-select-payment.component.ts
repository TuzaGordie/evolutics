import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateIndividualClientService } from 'src/app/Life/client-desk/create-individual-client/create-individual-client.service';
import {faUpload} from '@fortawesome/free-solid-svg-icons';
import { IndividualAgentService } from 'src/app/Life/agent-desk/new-individual-agent/services/individual-agent.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-client-select-payment',
  templateUrl: './client-select-payment.component.html',
  styleUrls: ['./client-select-payment.component.scss']
})
export class ClientSelectPaymentComponent implements OnInit {

 /*  @Input() fc; */
  newPaymentForm: any = FormGroup;
  countryList: any = []
  banknameList: any = []
  sortCodeList: any = []
  providerList: any = []
  bankModel: any = true;
  sortCode: any;
  bankBranchCode:any
  mobileModel: any = false;
  fileName: any
  faUpload = faUpload
  clientNo:any;
  constructor(public individualService: IndividualAgentService, public route: ActivatedRoute,public router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(res =>{
      this.clientNo = res.get('id')
      console.log("Client Number",this.clientNo)
    })
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
    /* this.setBanknameList()
    this.setSortcodeList()*/
    this.setProviderList() 
    this.showBankModel()
  }

  get validation() {
    return this.newPaymentForm?.controls
  }

  onSubmit() {
    
    const formdata = {
      ...this.newPaymentForm.value, ...{clientNo: this.clientNo}
    }
    console.log("add no",formdata)
    if (this.bankModel == true && this.mobileModel == false) {
      delete this.newPaymentForm.value.provider
      console.log("Client Number",this.clientNo)
      const data = JSON.stringify(formdata);
      console.log("data payment",formdata)
      this.individualService.addNewAccountApi(formdata)
      this.individualService.paymentInfo(this.newPaymentForm.value);

    } else if (this.mobileModel == true && this.bankModel == false) {
      delete this.newPaymentForm.value.accountName
      delete this.newPaymentForm.value.bankBranch
      delete this.newPaymentForm.value.bankName
      delete this.newPaymentForm.value.sortCode
      this.individualService.addNewAccountApi(formdata)
      this.individualService.paymentInfo(this.newPaymentForm.value);
    } else {
      console.log("failed store data")

      this.individualService.paymentInfo(this.newPaymentForm.value);

    }
    this.router.navigate(['/life/agent-desk/individual-agent', this.clientNo])
  }
  
  /*  closeBank(){
     console.log("tab")
     this.allFormService.closeBankDetails();
     } */
  /* faUpload = faUpload; */

  setCountryList() {
    this.individualService.getBankCountryList().subscribe(res => {
      this.countryList = res;
      console.log("countrylist", res)
    })
  }

  setBanknameList() {

    let selectedBank = this.newPaymentForm?.get("country")?.value
    console.log("selected Bank", selectedBank)
    this.individualService.getBanknameList(selectedBank).subscribe(res => {
      this.banknameList = res;
      console.log("bankName", res)
      /* this.banknameList = this.banknameList.filter((element: any) => {
        return element.country == selectedBank
      })*/
      this.newPaymentForm.patchValue({bankName: null, sortCode: null}) 
      console.log("bankName", this.banknameList)
    })
  }

  setSortcodeList() {
    let selectedSort = this.newPaymentForm?.get("bankName")?.value
    console.log("selected Bank", selectedSort)
    this.individualService.getSortList(selectedSort).subscribe(res => {
      this.sortCodeList = res;
      console.log("selectedSort1", res)
      /* this.sortCodeList = this.sortCodeList.filter((element: any) => {
        return element.code == selectedSort
      }) */
     this.newPaymentForm.patchValue({sortCode:null }) 
      console.log("selectedSort", this.sortCodeList)
      this.sortCode = this.sortCodeList[0].code
      console.log("code", this.sortCode)
    })

    this.setBankBranch()
  }
  setBankBranch(){
    let selectedcode = this.newPaymentForm?.get("bankName")?.value
    console.log("selected Bank", selectedcode)
    this.individualService.getBankBranchList(selectedcode).subscribe(res => {
      let bankbranch = res;
      console.log("selectedcode", bankbranch)
      this.bankBranchCode = bankbranch[0].title
      console.log("code", this.bankBranchCode)
    })
  }
  setProviderList() {
    this.individualService.getProviderList().subscribe(res => {
      this.providerList = res;
      console.log("providerList", res)
    })
  }

  upload(event: any) {
    let file = event.target.files[0];
    console.log("imagefile", file)
    console.log("imagepath", file.name)
    this.fileName = file.name
  }

  getImage() {
    let as = document.getElementById('filebtn')?.click()
  }

  showBankModel() {
    this.bankModel = true;
    this.mobileModel = false;
    this.newPaymentForm.patchValue({
      accountType: "BK"
    });
  }

  showMobileModel() {
    this.mobileModel = true;
    this.bankModel = false;
    this.newPaymentForm.patchValue({
      accountType: "MM"
    });
  }


}
