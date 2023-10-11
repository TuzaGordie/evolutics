import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancePaymentDeskRoutingModule } from './finance-payment-desk-routing.module';
import { ClaimDeskComponent } from './claim-desk/claim-desk.component';
import { AuthorisePaymentOutwardComponent } from './finance-controls/authorize-payment-outward/authorize-payment-outward.component';
import { CommissionAdjustmentComponent } from './finance-controls/commission-adjustment/commission-adjustment.component';
import { PolicyAccountingComponent } from './finance-controls/policy-accounting/policy-accounting.component';
import { ReceiptComponent } from './finance-controls/receipt/receipt.component';
import { SuspenseSwitchComponent } from './finance-controls/suspense-switch/suspense-switch.component';
import { AddCostAllocationComponent } from './finance-cost-accounting/add-cost-allocation/add-cost-allocation.component';
import { AddCostCenterComponent } from './finance-cost-accounting/add-cost-center/add-cost-center.component';
import { AddCostObjectComponent } from './finance-cost-accounting/add-cost-object/add-cost-object.component';
import { AddCostTypeComponent } from './finance-cost-accounting/add-cost-type/add-cost-type.component';
import { CostAllocationComponent } from './finance-cost-accounting/cost-allocation/cost-allocation.component';
import { CostBudgetComponent } from './finance-cost-accounting/cost-budget/cost-budget.component';
import { CostCentersComponent } from './finance-cost-accounting/cost-centers/cost-centers.component';
import { CostObjectsComponent } from './finance-cost-accounting/cost-objects/cost-objects.component';
import { CostTypeComponent } from './finance-cost-accounting/cost-type/cost-type.component';
import { CreateAccountJournalComponent } from './finance-payment-desk-pages/create-account-journal/create-account-journal.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';

@NgModule({
  declarations: [
    ClaimDeskComponent,
    AuthorisePaymentOutwardComponent,
    CommissionAdjustmentComponent,
    PolicyAccountingComponent,
    ReceiptComponent,
    SuspenseSwitchComponent,
    AddCostAllocationComponent,
    AddCostCenterComponent,
    AddCostObjectComponent,
    AddCostTypeComponent,
    CostAllocationComponent,
    CostBudgetComponent,
    CostCentersComponent,
    CostObjectsComponent,
    CostTypeComponent,
    CreateAccountJournalComponent,
  ],
  imports: [CommonModule, FinancePaymentDeskRoutingModule,SharedModule,ComponentsModule],
})
export class FinancePaymentDeskModule {}
