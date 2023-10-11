import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/Services/app.service';
import { ClientService } from 'src/app/Services/client.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { TableCol } from 'src/app/Shared/models/index.model';
import { FindClientService } from '../../service/find-client.service';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss'],
})
export class PoliciesComponent implements OnInit {
  clientName: string;
  policyList: any = [];
  totalPremiumReceived: number;
  aggregateLossRatio: number;
  loading = true;
  dCols: TableCol[] = [];
  clientNo: string;
  constructor(
    public findClientService: FindClientService,
    public clientService: ClientService,
    public route: ActivatedRoute,
    private appService: AppService,
    private router: Router,public uS: UtilityService,
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
          return '../../../../policy-desk/view-policy';
        },
        (row) => ({ number: row.policyNo, suffix: row.policyNoSuffix, code: row.code })
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
      new TableCol('Sum At Risk', 'totalSar', (item) =>
        this.uS.moneyParser(item, ' ')
      ),
    ];
  }

  ngOnInit(): void {
   let clientNo= this. clientNo = this.route.snapshot.paramMap.get('id');
    let busLine = this.route.snapshot.paramMap.get('id1');
    console.log('param id', clientNo, busLine);
    this.setPolicies(clientNo);
    this.setClientName(clientNo);
    this.setTotalPremiumReceived(clientNo);
    this.setAggregateLossRatio(clientNo);
  }
  setPolicies(id1) {
    console.log('param id', id1);
    const busLine = this.appService.getCurrentSystemMetadata.busline;
    // fetch policies. filter for life policies
    this.findClientService.getPoliciesApi(id1).subscribe(
      (res) => {
        this.policyList = res;
        console.log('policyList Info', res);
        this.loading = false;
      },
      (e) => {
        this.loading = false;
      }
    );
  }

  setClientName(clientNo: string) {
    this.clientService.getClientNameByNum(clientNo).subscribe(
      (res: any) => (this.clientName = res),
      (err: HttpErrorResponse) =>
        console.log(
          'Error fetching client with client number: ' + clientNo,
          err
        )
    );
  }

  setTotalPremiumReceived(clientNo) {
    this.findClientService
      .getTotalPremiumReceived(clientNo)
      .subscribe((res) => (this.totalPremiumReceived = res));
  }

  setAggregateLossRatio(clientNo) {
    this.findClientService
      .getAggregateLossRatio(clientNo)
      .subscribe((res) => (this.aggregateLossRatio = res));
  }
}
