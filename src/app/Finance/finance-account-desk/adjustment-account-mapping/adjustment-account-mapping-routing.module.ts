import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAdjustAccountMappingComponent } from 'src/app/Life/Setup/Account/AdjustAccountMapping/create-adjust-account-mapping/create-adjust-account-mapping.component';
import { IndexAdjustAccountMappingComponent } from 'src/app/Life/Setup/Account/AdjustAccountMapping/index-adjust-account-mapping/index-adjust-account-mapping.component';
 
const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
      {
        path: 'index',
        component: IndexAdjustAccountMappingComponent,
        data: { title: 'Accounting Desk / Accounts / Adjustment Account Mapping' },
      },
      {
        path: 'create',
        component: CreateAdjustAccountMappingComponent,
        data: { title: 'Accounting Desk / Accounts / Create Adjustment Account Mapping' },
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdjustmentAccountMappingRoutingModule { }
