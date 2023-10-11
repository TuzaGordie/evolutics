import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceAccountDeskRoutingModule } from './finance-account-desk-routing.module';
import { BankAccountReconciliationComponent } from './bank/bank-account-reconciliation/bank-account-reconciliation.component';
import { BankAccountComponent } from './bank/bank-account/bank-account.component';
import { ChequeWritingComponent } from './bank/cheque-writing/cheque-writing.component';
import { LocalBankListComponent } from './bank/local-bank-list/local-bank-list.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { CreateExpenseJournalComponent } from './create-expense-journal/create-expense-journal.component';
import { CompanyAssetsComponent } from './company-assets/company-assets.component';
import { FinanceFinancialStatementComponent } from './finance-financial-statement/finance-financial-statement.component';
import { DvAuthorizationComponent } from '../../Life/payment-desk/dv-authorization/dv-authorization.component';

@NgModule({
  declarations: [
    BankAccountReconciliationComponent,
    BankAccountComponent,
    ChequeWritingComponent,
    LocalBankListComponent,
    CreateExpenseJournalComponent,
    CompanyAssetsComponent,
    FinanceFinancialStatementComponent,
    DvAuthorizationComponent,
  ],
  imports: [CommonModule, FinanceAccountDeskRoutingModule,SharedModule,ComponentsModule],
})
export class FinanceAccountDeskModule {}
