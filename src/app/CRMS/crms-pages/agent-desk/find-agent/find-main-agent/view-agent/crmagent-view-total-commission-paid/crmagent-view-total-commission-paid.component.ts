import { Component, OnInit } from '@angular/core';
import { FindMainAgentService } from 'src/app/Life/agent-desk/find-agent/find-main-agent/service/find-main-agent.service';
// import {FindMainAgentService} from "../../../../../../Life/agent-desk/find-agent/find-main-agent/service/find-main-agent.service";

@Component({
  selector: 'app-crmagent-view-total-commission-paid',
  templateUrl: './crmagent-view-total-commission-paid.component.html',
  styleUrls: ['./crmagent-view-total-commission-paid.component.scss']
})
export class CRMAgentViewTotalCommissionPaidComponent implements OnInit {

  policyList:any = []
  constructor(public findAgentService: FindMainAgentService) { }

  ngOnInit(): void {
    this.setPolicies()
  }

  setPolicies(){
    this.findAgentService.getPolicies().subscribe( res => {
      this.policyList = res;
      console.log("Relationship Info",res)
    })
  }
}
