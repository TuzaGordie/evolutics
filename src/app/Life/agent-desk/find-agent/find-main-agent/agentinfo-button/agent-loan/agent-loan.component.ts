import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FindMainAgentService } from '../../service/find-main-agent.service';

@Component({
  selector: 'app-agent-loan',
  templateUrl: './agent-loan.component.html',
  styleUrls: ['./agent-loan.component.scss']
})
export class AgentLoanComponent implements OnInit {
  agentNo: string;
  agentName: string;
  agentloanList:any = []

  constructor(
    public findAgentService: FindMainAgentService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.agentNo = this.route.snapshot.queryParams.agentNo;
    this.agentName = this.route.snapshot.queryParams.agentName;
    this.setAgentloan()
  }

  setAgentloan(){
    this.findAgentService.getAgentLoan(this.findAgentService.agentInfo?.AGENT_NO).subscribe( res => {
      this.agentloanList = res;
      console.log("agentloanList Info",res)
    })
  }

}
