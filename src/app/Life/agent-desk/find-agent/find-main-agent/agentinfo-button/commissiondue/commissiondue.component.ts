import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FindMainAgentService } from '../../service/find-main-agent.service';

@Component({
  selector: 'app-commissiondue',
  templateUrl: './commissiondue.component.html',
  styleUrls: [
    './commissiondue.component.scss',
    '../commission/commission.component.css',
  ],
})
export class CommissiondueComponent implements OnInit {
  agentNo: string;
  agentName: string;
  totalDue: number;
  balanceUnpaidBroughtForward: number;
  commissionDueList: any[];
  currency;
  balanceBroughtForward;
  pendingPayments
  recentAverageMonthlyCommission
  paymentAmount
  typesList: any[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private findAgentService: FindMainAgentService,
  ) {}
  anypopup: boolean = false;
  popups: any = {
    manualCommission: false,
    advancePayment: false,
    agentLoan: false,
  };
  ngOnInit(): void {
    this.agentNo = this.route.snapshot.queryParamMap.get('agentNo')
    this.agentName = this.route.snapshot.queryParamMap.get('agentName')
    this.setTotalDue()
    this.setTypesList()
  }
  navigateback() {
    // this.router.navigateByUrl("life/agent-desk/view-agent");
  }

  showpopup(param) {
    this.anypopup = true;
    this.popups[param] = true;
  }
  closepopup(param) {
    this.anypopup = false;
    this.popups[param] = false;
  }

  setTotalDue(){
    this.findAgentService.getCommissionDue(this.agentNo).subscribe(
      res => this.totalDue = res
    )
  }

  setTypesList(){
    this.findAgentService.getCommissionTypesList().subscribe(
      res => this.typesList = res
    )
  }
}
