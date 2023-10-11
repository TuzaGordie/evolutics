import { Component, OnInit } from '@angular/core';
import { FindMainAgentService } from '../../service/find-main-agent.service';

@Component({
  selector: 'app-agent-loan',
  templateUrl: './agent-loan.component.html',
  styleUrls: ['./agent-loan.component.scss']
})
export class CRMSAgentLoanComponent implements OnInit {

  agentloanList:any = []

  constructor(public findAgentService: FindMainAgentService) { }

  ngOnInit(): void {
    this.setAgentloan()
  }

  setAgentloan(){
    this.findAgentService.getAgentLoan(this.findAgentService.agentInfo?.AGENT_NO).subscribe( res => {
      this.agentloanList = res;
      console.log("agentloanList Info",res)
    })
  }

}
