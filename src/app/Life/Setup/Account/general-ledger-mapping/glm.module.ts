import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';
import { GLMAddComponent } from './glm-add/glm-add.component';
import { IndexGLMComponent } from './index-glm/index-glm.component';
import { ComponentsModule } from 'src/app/Shared/components/components.module';

const routes: Routes = [
  { path: '', redirectTo: 'index-GLM', pathMatch: 'full' },
  {
    path: 'index-GLM',
    component: IndexGLMComponent,
    data: { title: 'Set Up / Accounts / General Ledger Mapping' },
  },
  {
    path: 'GLM-add',
    component: GLMAddComponent,
    data: { title: 'Set Up / Accounts / General Ledger Mapping' },
  },
];

@NgModule({
  declarations: [IndexGLMComponent, GLMAddComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes),ComponentsModule],
})
export class AccountGeneralLedgerMappingModule {}
