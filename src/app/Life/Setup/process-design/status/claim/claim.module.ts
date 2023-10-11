import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LifeProcessDesignStatusClaimIndexComponent } from './life-process-design-status-claim-index/life-process-design-status-claim-index.component';
import { EVFunctions } from 'src/app/configs/base-functions';
import { LifeProcessDesignStatusClaimCreateComponent } from './life-process-design-status-claim-create/life-process-design-status-claim-create.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';

const ROUTES = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full',
  },
  {
    path: 'index',
    component: LifeProcessDesignStatusClaimIndexComponent,
    data: { title: ' ' },
  },
  ...EVFunctions.extendRoute(
    {
      path: '',
      data: { title: ' Claim' },
      component: LifeProcessDesignStatusClaimCreateComponent,
    },
    LifeProcessDesignStatusClaimIndexComponent
  ),
];
ROUTES.filter((x) => x.data?.title).forEach(
  (x) => (x.data.title = 'Set Up / Status / Claim  ' + x.data.title)
);
@NgModule({
  declarations: [
    LifeProcessDesignStatusClaimIndexComponent,
    LifeProcessDesignStatusClaimCreateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule,
    ComponentsModule,
  ],
})
export class ClaimModule {}
