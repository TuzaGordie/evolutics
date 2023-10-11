import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseDeskRoutingModule } from './expense-desk-routing.module'; 
import { CreateNewExpenseComponent } from './expense-pages/receipting/create-new/create-new.component';
import { UnpostedComponent } from './expense-pages/receipting/unposted/unposted.component';
import { UnreconciliedComponent } from './expense-pages/receipting/unreconcilied/unreconcilied.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PolicyDetailsModalComponent } from './expense-pages/receipting/policy-details-modal/policy-details-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { BatchReceiptModalComponent } from './expense-pages/receipting/batch-receipt-modal/batch-receipt-modal.component';



@NgModule({
  declarations: [
    CreateNewExpenseComponent,
    UnpostedComponent,
    UnreconciliedComponent,
    PolicyDetailsModalComponent,
    BatchReceiptModalComponent,
  ],
  imports: [
    CommonModule,
    ExpenseDeskRoutingModule,SharedModule,MatTooltipModule,MatMenuModule,MatDialogModule,
  ]
})
export class ExpenseDeskModule { }
