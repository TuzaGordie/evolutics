import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTRMComponent } from 'src/app/Life/Setup/Account/transaction-reason-mapping/create-trm/create-trm.component';
import { IndexTRMComponent } from 'src/app/Life/Setup/Account/transaction-reason-mapping/index-trm/index-trm.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: IndexTRMComponent, data:{title:'Accounting Desk / Accounts / Transaction Reason Mapping'}},
  { path: 'create', component: CreateTRMComponent, data:{title:'Accounting Desk / Accounts / Create Transaction Reason Mapping'} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionReasonMappingRoutingModule { }
