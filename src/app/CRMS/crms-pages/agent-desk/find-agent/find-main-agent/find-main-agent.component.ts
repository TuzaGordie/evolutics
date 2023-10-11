import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FindMainAgentService } from './service/find-main-agent.service';

@Component({
  selector: 'app-find-main-agent',
  templateUrl: './find-main-agent.component.html',
  styleUrls: ['./find-main-agent.component.scss']
})
export class CRMSFindMainAgentComponent implements OnInit {

  findAgentForm:any = FormGroup;
  agentList:any = []
  validResult:any = ""
  validResult2:any = ""
  validResult3:any = ""
  checkMark = false;

  constructor(public findAgentService: FindMainAgentService,public router: Router) { }

  ngOnInit(): void {
    console.log("find agent")
    this.findAgentForm = new FormGroup({
      agentNo: new FormControl(null),
      clientNo: new FormControl(null),
      name: new FormControl(null),
      phoneNo: new FormControl(null),
      email: new FormControl(null),
      agentType: new FormControl(null),
      createdBy: new FormControl(null),
      createdDateFrom: new FormControl(null),
      createdDateTo: new FormControl(null)
    })
  }

  onNext(){
    console.log(this.findAgentForm)
 this.router.navigateByUrl('/crms/agent-desk/view-agent')
    /* this.findClientService.clientInfo(this.clientNoForm.value); */
  }


    setClientList(){
      console.log(this.findAgentForm.value.clientNo)
      this.findAgentService.getAgentList(this.findAgentForm.value.clientNo).subscribe( res => {

        this.agentList = res;
        if(this.agentList.length > 0){
          this.findAgentService.agentInfo = this.agentList[0]
          this.validResult = "true"

        }
        else{
    this.validResult = "false"
        }
        console.log("clientList",res)
      })
    }

    setAgentList(){
      console.log(this.findAgentForm.value.agentNo)
      this.findAgentService.getAgentList(this.findAgentForm.value.agentNo).subscribe( res => {

        this.agentList = res;
        if(this.agentList.length > 0){
          this.findAgentService.agentInfo = this.agentList[0]
          this.validResult2 = "true"

        }
        else{
    this.validResult2 = "false"
        }
        console.log("agentlist",res)
      })
    }



    onSearch(){
      if(this.findAgentForm.value.name){
        this.findAgentService.getnameList(this.findAgentForm.value.name).subscribe(res => {

        this.findAgentService.searchedData = res
          this.router.navigateByUrl('/crms/agent-desk/agent-search')
        })
      }

     else if(this.findAgentForm.value.phoneNo){
        this.findAgentService.getphoneList(this.findAgentForm.value.phoneNo).subscribe(res => {

        this.findAgentService.searchedData = res
          this.router.navigateByUrl('/crms/agent-desk/agent-search')
        })
      }

      else if(this.findAgentForm.value.email){
        this.findAgentService.getemailList(this.findAgentForm.value.email).subscribe(res => {

        this.findAgentService.searchedData = res
          this.router.navigateByUrl('/crms/agent-desk/agent-search')
        })
      }

      else if(this.findAgentForm.value.createdBy){
        this.findAgentService.getCreatedByList(this.findAgentForm.value.createdBy).subscribe(res => {

        this.findAgentService.searchedData = res
          this.router.navigateByUrl('/crms/agent-desk/agent-search')
        })
      }

    }

}
