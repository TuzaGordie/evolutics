import { Component, OnInit } from '@angular/core';
import { FindMainAgentService } from '../../service/find-main-agent.service';

@Component({
  selector: 'app-agent-policies',
  templateUrl: './agent-policies.component.html',
  styleUrls: ['./agent-policies.component.scss']
})
export class CRMSAgentPoliciesComponent implements OnInit {

  policyList:any = []

  constructor(public findAgentService: FindMainAgentService) { }

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
