import { Component, OnInit } from '@angular/core';
import {FindMainAgentService} from "../../../../../../../Life/agent-desk/find-agent/find-main-agent/service/find-main-agent.service";

@Component({
  selector: 'app-crmagent-view-no-of-policies',
  templateUrl: './crmagent-view-no-of-policies.component.html',
  styleUrls: ['./crmagent-view-no-of-policies.component.scss']
})
export class CRMAgentViewNoOfPoliciesComponent implements OnInit {

  constructor(public findAgentService: FindMainAgentService) { }

  policyList:any = []
  ngOnInit(): void {
    this.setPolicy()
  }

  setPolicy(){
    this.findAgentService.getPolicies().subscribe( res => {
      this.policyList = res;
      console.log("policy Info",res)
    })
  }
}
