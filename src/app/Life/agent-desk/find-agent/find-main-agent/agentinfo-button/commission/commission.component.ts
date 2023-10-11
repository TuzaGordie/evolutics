import { Component, OnInit } from '@angular/core';
import { FindMainAgentService } from '../../service/find-main-agent.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteService } from 'src/app/Services/route.service';
import { StringOrNumberOrDate } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.scss', './commission.component.css'],
})
export class CommissionComponent implements OnInit {
  commissionsList: any = [];
  anypopup: boolean = false;
  popups: any = {
    manualCommission: false,
    advancePayment: false,
    agentLoan: false,
  };
  commissionDue;
  commissionPaid;
  commissionEarned;
  commissionUnEarned;
  balanceUnpaid;

  agentNo;
  agentName;
  policyNo;
  policyCode;
  providerNo;
  currency: string;
  balanceBroughtForward;
  recentAverageMonthlyCommission;
  pendingPayments
  paymentAmount;

  constructor(
    public findAgentService: FindMainAgentService,
    private rS: RouteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.agentNo = this.route.snapshot.queryParamMap.get("agentNo")
    this.agentName = this.route.snapshot.queryParamMap.get("agentName")
    this.setCommissions();
    this.setBalanceUnpaid();
    this.setCommissionDue();
    this.setCommissionPaid();
    this.setCommissionEarned();
    this.setCommissionUnEarned();
  }
  setCommissions() {
    this.findAgentService.getCommissionsList(this.agentNo).subscribe((res) => {
      this.commissionsList = res;
      console.log('Relationship Info', res);
    });
  }
  routetocommdue() {
    this.rS.go('../commissiondue', { relativeTo: this.route, queryParams: {agentNo: this.agentNo, agentName: this.agentName} });
  }
  navigateback() {
    this.rS.go('../view-agent', { relativeTo: this.route });
  }
  showpopup(param) {
    this.anypopup = true;
    this.popups[param] = true;
  }
  closepopup(param) {
    this.anypopup = false;
    this.popups[param] = false;
  }
  
  setCommissionEarned(){
    this.findAgentService.getCommissionEarned(this.agentNo).subscribe(
      res => this.commissionEarned = res
    )
  }

  setCommissionDue(){
    this.findAgentService.getCommissionDue(this.agentNo).subscribe(
      res => this.commissionDue = res
    )
  }

  setCommissionUnEarned(){
    this.findAgentService.getCommissionUnEarned(this.agentNo).subscribe(
      res => this.commissionUnEarned = res
    )
  }

  setBalanceUnpaid(){
    this.findAgentService.getUnprocessedBalance(this.agentNo).subscribe(
      res => this.balanceUnpaid = res
    )
  }

  setCommissionPaid(){
    this.findAgentService.getCommissionPaid(this.agentNo).subscribe(
      res => this.commissionPaid = res
    )
  }
}
