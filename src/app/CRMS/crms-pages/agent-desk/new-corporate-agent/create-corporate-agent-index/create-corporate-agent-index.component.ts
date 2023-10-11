import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
// import {IndividualAgentService} from "../../../../Life/agent-desk/new-individual-agent/services/individual-agent.service";
import {Router} from "@angular/router";
import { IndividualAgentService } from 'src/app/Life/agent-desk/new-individual-agent/services/individual-agent.service';

@Component({
  selector: 'app-create-corporate-agent-index',
  templateUrl: './create-corporate-agent-index.component.html',
  styleUrls: ['./create-corporate-agent-index.component.scss']
})
export class CreateCorporateAgentIndexComponent implements OnInit {

  clientNoForm:any = FormGroup;
  clientList:any = []
  clientApiNo:any
  validResult:any = ""
  checkMark = false;

  constructor(public individualService:IndividualAgentService, public router:Router) { }

  ngOnInit(): void {
    this.clientNoForm = new FormGroup({
      clientNo: new FormControl(null)

    })
  }

  onNext(){
    console.log(this.clientNoForm)
    this.individualService.clientInfo(this.clientNoForm.value);
  }

  changeTab(tab:any){
    console.log("tab")
    this.individualService.tabChange(tab)
  }
  setClientList(){
    this.checkMark = true;
    console.log(this.clientNoForm.value.clientNo)
    this.individualService.getClientList(this.clientNoForm.value.clientNo).subscribe( res => {

      this.clientList = res;
      if(this.clientList.length > 0){
        this.individualService.individualClientInfo = this.clientList[0]
        this.validResult = "true"

      }
      else{
        this.validResult = "false"
      }
      console.log("clientList",res)
    })
  }

}
