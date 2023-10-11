import { Component, OnInit, Type } from '@angular/core';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UtilityService } from 'src/app/Services/utility.service';
import { TablePlainService } from '../../../../Shared/components/table-plain/table-plain.service';
import { TableCol } from '../../../../Shared/models/index.model';

import { CreateAccountTransactionComponent } from './create-account-transaction/create-account-transaction.component';

@Component({
  selector: 'app-policy-accounts',
  templateUrl: './policy-accounts.component.html',
  styleUrls: ['./policy-accounts.component.scss'],
})
export class PolicyAccountsComponent implements OnInit {
  name = 'Mascar Magic';
  jName = 'Mascar Magic2';
  polSus = '23,000';
  list = [];
  dCols: TableCol[] = [
    new TableCol('Account No'),
    new TableCol('Trans No'),
    new TableCol('Eff Date & Time'),
    new TableCol('Trans Date & Time'),
    new TableCol('Trans Type'),
    new TableCol('Currency'),
    new TableCol('User'),
    new TableCol('Batched'),
    new TableCol('Reversed'),
  ];
  faCheck = faCheck;
  faPlus: any = faPlus;
  constructor(public pdS: UtilityService, public tS: TablePlainService) {}

  ngOnInit(): void {
    this.list = this.pdS.dataGen(
      this.dCols.map((x) => x.f),
      2
    );
  }

  add() {
    this.pdS.dialogOpener(
      CreateAccountTransactionComponent,
      { height: 'auto', width: 'calc(100vw * 0.5569)' },
      () => {}
    );
  }
}
