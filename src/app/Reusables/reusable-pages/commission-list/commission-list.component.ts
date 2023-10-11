import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/Services/utility.service';
import { TableCol } from 'src/app/Shared/models/index.model';
import { MakeAdvancedPaymentComponent } from './make-advanced-payment/make-advanced-payment.component';
import { ManualCommissionsComponent } from './manual-commissions/manual-commissions.component';

@Component({
  selector: 'app-commission-list',
  templateUrl: './commission-list.component.html',
  styleUrls: ['./commission-list.component.scss']
})
export class CommissionListComponent implements OnInit {
  list = [];
  dCols: TableCol[] = [
    new TableCol('Total Writing Agent Commissions Due'),
    new TableCol('Total Override Agent Commissions Due'),
    new TableCol('Total Writing Agent Commissions Paid'),
    new TableCol('Total Override Agent Commissions Due'),
    new TableCol('Total Writing Agent Commissions Earned'),
    new TableCol('Total Override Agent Commissions Earned'),
    new TableCol('Total Writing Agent Commissions Unearned'),
    new TableCol('Total Override Agent Commissions Unearned'),
  ];
  name = 'Mascar Magic';
  holdCom: boolean;
  constructor(public uS: UtilityService) {}

  ngOnInit(): void {
    this.list = this.uS.dataGen(
      this.dCols.map((x) => x.f),
      1
    );
  }
  mapc() {
    this.uS.dialogOpener(
      MakeAdvancedPaymentComponent,
      {
        height: 'auto',
        width: 'calc(100vw * 0.9)',
        maxWidth: '90vw',
        maxHeight: '90vh',
      },
      () => {}
    );
  }
  mc() {
    this.uS.dialogOpener(
      ManualCommissionsComponent,
      {
        height: 'auto',
        width: 'calc(100vw * 0.7569),',
        maxWidth: '90vw',
        maxHeight: '90vh',
      },
      () => {}
    );
  }
}
