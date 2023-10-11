import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StartAccountLedgerComponent } from './start-account-ledger/start-account-ledger.component';
import { CreateAccountLedgerComponent } from './create-account-ledger/create-account-ledger.component';
import { EVFunctions } from 'src/app/configs/base-functions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/Shared/shared.module';
import { AccountLedgerSearchResultsChartComponent } from './modals/account-ledger-search-results-chart/account-ledger-search-results-chart.component';
import { ChartsModule } from 'ng2-charts';
import { MatDialogModule } from '@angular/material/dialog';
import { DataModalComponent } from './modals/data-modal/data-modal.component';
import { AddColumnModalComponent } from './modals/add-column-modal/add-column-modal.component';
import { SpliceNamePipe } from './splice-name.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AccountLedgerService } from './account-ledger.service';

const ROUTES = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  {
    path: 'index',
    component: StartAccountLedgerComponent,
    data: { title: 'Account Ledger Index' },
  },
  ...EVFunctions.extendRoute(
    {
      path: '',
      data: { title: 'Account Ledger' },
      component: CreateAccountLedgerComponent,
    },
    StartAccountLedgerComponent
  ),
];

ROUTES.forEach((x) => {
  x.data?.title ? (x.data.title = 'Set Up / Accounts / ' + x.data.title) : null;
});

@NgModule({
  declarations: [
    StartAccountLedgerComponent,
    CreateAccountLedgerComponent,
    AccountLedgerSearchResultsChartComponent,
    DataModalComponent,
    AddColumnModalComponent,
    SpliceNamePipe

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ChartsModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  providers: [AccountLedgerService]
})
export class AccountLedgerModule {}
