import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';
import { CreateTRMComponent } from './create-trm/create-trm.component';
import { IndexTRMComponent } from './index-trm/index-trm.component';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { EVFunctions } from 'src/app/configs/base-functions';

const ROUTES: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  {
    path: 'index',
    component: IndexTRMComponent,
    data: { title: 'Transaction Reason Mapping' },
  },
  ...EVFunctions.extendRoute(
    {
      path: '',
      data: { title: ' Transaction Reason Mapping' },
      component: CreateTRMComponent,
    },
    CreateTRMComponent
  ),
];

ROUTES.forEach((x) => {
  x.data?.title ? (x.data.title = 'Set Up / Accounts ' + x.data.title) : null;
});
@NgModule({
  declarations: [IndexTRMComponent, CreateTRMComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES),
    ComponentsModule,
  ],
})
export class AccountTransactionReasonMappingModule {}
