import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { GLMAddComponent } from 'src/app/Life/Setup/Account/general-ledger-mapping/glm-add/glm-add.component';
import { IndexGLMComponent } from 'src/app/Life/Setup/Account/general-ledger-mapping/index-glm/index-glm.component';

const routes: Routes = [
  { path: '', redirectTo: 'index-GLM', pathMatch: 'full' },
  {
    path: 'index-GLM',
    component: IndexGLMComponent,
    data: { title: 'Accounting Desk / Accounts / General Ledger Mapping' },
  },
  {
    path: 'GLM-add',
    component: GLMAddComponent,
    data: { title: 'Accounting Desk / Accounts / Create General Ledger Mapping' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralLedgerMappingRoutingModule {}
