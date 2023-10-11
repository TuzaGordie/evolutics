import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuotationService } from 'src/app/Life/services/quotation-service.service';

@Component({
  selector: 'app-view-quotation-total-periodic-premium',
  templateUrl: './view-quotation-total-periodic-premium.component.html',
  styleUrls: ['./view-quotation-total-periodic-premium.component.scss'],
})
export class ViewQuotationTotalPeriodicPremiumComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private qS: QuotationService
  ) {}
  transactions: any[];
  async ngOnInit(): Promise<void> {
    const queryParams = this.activatedRoute.snapshot.queryParamMap;
    const details = {
      policyNo: queryParams.get('policyNo'),
      quoteNo: queryParams.get('quoteNo'),
      policyCode: queryParams.get('policyCode'),
      clientNo: queryParams.get('clientNo'),
      policyID: queryParams.get('policyID'),
      owner: queryParams.get('owner'),
      pcd: queryParams.get('pcd'),
      pfreq: queryParams.get('pfreq'),
    };
    console.log(details);
    this.transactions = await this.qS
      .getBankTransactions(details.quoteNo)
      .toPromise();
  }
}
