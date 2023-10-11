import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FindClientService } from '../service/find-client.service';

@Component({
  selector: 'app-crm-find-client',
  templateUrl: './find-crm-client.component.html',
  styleUrls: ['./find-crm-client.component.scss']
})
export class CRMFindClientComponent implements OnInit {

  findClientForm:any = FormGroup;
  clientList:any = []
  clientApiNo:any
  validResult:any = ""
  validResult2:any = ""
  validResult3:any = ""
  checkMark = false;

  constructor(public findClientService: FindClientService,public router: Router) { }

  ngOnInit(): void {
    this.findClientForm = new FormGroup({
      clientNo: new FormControl(null),
      enrolee: new FormControl(null),
      name: new FormControl(null),
      providerNo: new FormControl(null),
      phoneNo: new FormControl(null),
      email: new FormControl(null),
      externalRef: new FormControl(null),
      createdBy: new FormControl(null),
      createdDateFrom: new FormControl(null),
      createdDateTo: new FormControl(null)
    })
  }

  onNext(){
    console.log(this.findClientForm)
 this.router.navigateByUrl('/crm/view-client')
    /* this.findClientService.clientInfo(this.clientNoForm.value); */
  }

 
    setClientList(){
      console.log(this.findClientForm.value.clientNo)
      this.findClientService.getClientList(this.findClientForm.value.clientNo).subscribe( res => {

        this.clientList = res;
        if(this.clientList.length > 0){
          this.findClientService.clientInfo = this.clientList[0]
          this.validResult = "true"
         
        }
        else{
    this.validResult = "false"
        }
        console.log("clientList",res)
      })
    }

    setEnroleeList(){
      console.log(this.findClientForm.value.enrolee)
      this.findClientService.getEnroleeList(this.findClientForm.value.enrolee).subscribe( res => {

        this.clientList = res;
        if(this.clientList.length > 0){
          this.findClientService.clientInfo = this.clientList[0]
          this.validResult2 = "true"
         
        }
        else{
    this.validResult2 = "false"
        }
        console.log("clientList",res)
      })
    }

    setProviderList(){
      console.log(this.findClientForm.value.providerNo)
      this.findClientService.getProviderList(this.findClientForm.value.providerNo).subscribe( res => {

        this.clientList = res;
        if(this.clientList.length > 0){
          this.findClientService.clientInfo = this.clientList[0]
          this.validResult3 = "true"
         
        }
        else{
    this.validResult3 = "false"
        }
        console.log("clientList",res)
      })
    }


    onSearch(){
      if(this.findClientForm.value.name){
        this.findClientService.getnameList(this.findClientForm.value.name).subscribe(res => {

        this.findClientService.searchedData = res
          this.router.navigateByUrl('/life/client-search')
        })
      }

     else if(this.findClientForm.value.phoneNo){
        this.findClientService.getphoneList(this.findClientForm.value.phoneNo).subscribe(res => {

        this.findClientService.searchedData = res
          this.router.navigateByUrl('/life/client-search')
        })
      }

      else if(this.findClientForm.value.email){
        this.findClientService.getemailList(this.findClientForm.value.email).subscribe(res => {

        this.findClientService.searchedData = res
          this.router.navigateByUrl('/life/client-search')
        })
      }

      else if(this.findClientForm.value.createdBy){
        this.findClientService.getCreatedByList(this.findClientForm.value.createdBy).subscribe(res => {

        this.findClientService.searchedData = res
          this.router.navigateByUrl('/life/client-search')
        })
      }
      else if(this.findClientForm.value.externalRef){
        this.findClientService.getExternalRefList(this.findClientForm.value.externalRef).subscribe(res => {

        this.findClientService.searchedData = res
          this.router.navigateByUrl('/life/client-search')
        })
      }
    }

}
