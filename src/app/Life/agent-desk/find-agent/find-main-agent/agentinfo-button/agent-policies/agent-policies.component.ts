import { Component, OnInit } from '@angular/core';
import { FindMainAgentService } from '../../service/find-main-agent.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TableCol } from 'src/app/Shared/models/index.model';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-agent-policies',
  templateUrl: './agent-policies.component.html',
  styleUrls: ['./agent-policies.component.scss'],
})
export class AgentPoliciesComponent implements OnInit {
  policyList: any = [];
  agentNo: string;
  agentName: string;
  totalSumAtRisk: number;
  dCols: TableCol[];

  loading = true;
  constructor(
    public findAgentService: FindMainAgentService,
    private router: Router,
    private route: ActivatedRoute,
    public uS: UtilityService
  ) {
    this.dCols = [
      new TableCol(
        'Policy No',
        'policyNo',
        null,
        null,
        null,
        null,
        (row, cell) => {
          return '../../policy-desk/view-policy';
        },
        (row) => ({
          number: row.policyNo,
          suffix: row.policyNoSuffix,
          code: row.code,
        })
      ),
      new TableCol('Client Relationship', 'ownerName'),
      new TableCol('Paid To Date', 'paidToDate', this.uS.fullDateTime),
      new TableCol('O/s Premium', 'premiumDue', this.uS.moneyParser),
      new TableCol('Paid', 'premiumPaid', this.uS.moneyParser),
      new TableCol('Product Class', 'productClass'),
      new TableCol('Policy Status', 'policyStatus'),
      new TableCol('Issued On', 'issuedOn', this.uS.fullDateTime),
      new TableCol('Policy Term (days)', 'policyTermDays'),
      new TableCol('Annualised Premium', 'annualisedPremium'),
      new TableCol('Sum At Risk', 'totalSar', this.uS.moneyParser),
    ];
  }

  ngOnInit(): void {
    this.agentNo = this.route.snapshot.queryParams.agentNo;
    this.agentName = this.route.snapshot.queryParams.agentName;
    this.setPolicy();
  }
  setPolicy() {
    this.findAgentService.getAgentPolicies(this.agentNo).subscribe(
      (res) => {
        this.policyList = res;
        console.log('policy Info', res);
        this.loading = false;
      },
      (err) => {
        this.loading = false;
      }
    );
  }
}
