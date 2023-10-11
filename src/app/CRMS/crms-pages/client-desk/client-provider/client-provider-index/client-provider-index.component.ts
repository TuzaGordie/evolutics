import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FindClientService } from '../../service/find-client.service';

@Component({
  selector: 'app-client-provider-index',
  templateUrl: './client-provider-index.component.html',
  styleUrls: ['./client-provider-index.component.scss']
})
export class CRMSClientProviderIndexComponent implements OnInit {

  clientInfoList:any = []
  providerInfoList:any = []
  findClientIndexProviderForm:any = FormGroup;
  validResult:any = ""
  checkMark = false;
  providerNo = ""
  clientNo = ""

  constructor(public findClientService: FindClientService,public router:Router) { }


  ngOnInit(): void {
    this.findClientIndexProviderForm = new FormGroup({
        quotationNo: new FormControl(null),
        clientNo: new FormControl(null),
        agentID: new FormControl(null),
        statusID: new FormControl(null),
        productClass: new FormControl(null),
        productCode: new FormControl(null),
        createdBy: new FormControl(null),
        createdDateFrom: new FormControl(null),
        providerNo: new FormControl(null)

      })


console.log("client search",this.findClientService.searchedData)
this.clientInfoList = this.findClientService.searchedData;
    /* this.setClientInfo() */
  }

  viewInfo(data:any){
    console.log(data)
    this.findClientService.getClientList(data).subscribe(res => {
      let data:any = res
      this.findClientService.clientInfo = data[0]
      console.log("client search data", this.findClientService.clientInfo )
      this.router.navigateByUrl('/CRMS/view-client')
    })

  }

  setClientList(){
    console.log(this.findClientIndexProviderForm.value.clientNo)
    this.findClientService.getClientList(this.findClientIndexProviderForm.value.clientNo).subscribe( res => {

      this.clientInfoList = res;
      if(this.clientInfoList.length > 0){
        this.findClientService.clientInfo = this.clientInfoList[0]
        this.validResult = "true"

      }
      else{
  this.validResult = "false"
      }
      console.log("quotationList",res)
    })
  }

  setProviderList(){
    console.log(this.findClientIndexProviderForm.value.providerNo)
    this.findClientService.getProviderInfoList(this.findClientIndexProviderForm.value.providerNo).subscribe( res => {

      this.providerInfoList = res;
      if(this.providerInfoList.length > 0){
        this.findClientService.providerInfo = this.providerInfoList[0]
        this.validResult = "true"

      }
      else{
  this.validResult = "false"
      }
      console.log("quotationList",res)
    })
  }

  onFind(){
    console.log(this.findClientIndexProviderForm)
 this.router.navigateByUrl('/CRMS/find-client')
    /* this.findQuotationService.quotationInfo(this.quotationNoForm.value); */
  }

  onFindClient(){
    console.log(this.findClientIndexProviderForm)
 this.router.navigateByUrl('/CRMS/view-client')
    /* this.findQuotationService.quotationInfo(this.quotationNoForm.value); */
  }

  onFindProvider(){
    console.log(this.findClientIndexProviderForm)
 this.router.navigateByUrl('/CRMS/find-client')
    /* this.findQuotationService.quotationInfo(this.quotationNoForm.value); */
  }

  onCreate(){
    console.log(this.findClientIndexProviderForm)
 this.router.navigateByUrl('/CRMS/allform')
    /* this.findQuotationService.quotationInfo(this.quotationNoForm.value); */
  }

  onCreateProvider(){
    console.log(this.findClientIndexProviderForm)
 this.router.navigateByUrl('/CRMS/create-client-provider')
    /* this.findQuotationService.quotationInfo(this.quotationNoForm.value); */
  }

}
