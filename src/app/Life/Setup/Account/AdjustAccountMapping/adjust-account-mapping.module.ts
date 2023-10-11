import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { IndexAdjustAccountMappingComponent } from './index-adjust-account-mapping/index-adjust-account-mapping.component';
import { CreateAdjustAccountMappingComponent } from './create-adjust-account-mapping/create-adjust-account-mapping.component';
import { EVFunctions } from 'src/app/configs/base-functions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/Shared/shared.module';

const ROUTES: Route[] = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full',
  },
  {
    path: 'index',
    component: IndexAdjustAccountMappingComponent,
    data: { title: 'Adjustment Account Mapping / Index' },
  },
  ...EVFunctions.extendRoute(
    {
      path: '',
      data: { title: 'Adjustment Account Mapping' },
      component: CreateAdjustAccountMappingComponent,
    },
    IndexAdjustAccountMappingComponent
  ),
];
ROUTES.forEach((x) => {
  x.data?.title ? (x.data.title = 'Set Up / Accounts / ' + x.data.title) : null;
});

@NgModule({
  declarations: [
    CreateAdjustAccountMappingComponent,
    IndexAdjustAccountMappingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class AdjustAccountMappingModule {}
