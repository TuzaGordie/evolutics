import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EVFunctions } from 'src/app/configs/base-functions';
import { LifeProcessDesignStatusPolicyIndexComponent } from './life-process-design-status-policy-index/life-process-design-status-policy-index.component';
import { LifeProcessDesignStatusPolicyCreateComponent } from './life-process-design-status-policy-create/life-process-design-status-policy-create.component';
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
    component: LifeProcessDesignStatusPolicyIndexComponent,
    data: { title: ' Policy' },
  },
  ...EVFunctions.extendRoute(
    {
      path: '',
      data: { title: '/ Policy' },
      component: LifeProcessDesignStatusPolicyCreateComponent,
    },
    LifeProcessDesignStatusPolicyIndexComponent
  ),
];

ROUTES.filter((x) => x.data?.title).forEach(
  (x) => (x.data.title = 'Set Up / Status /' + x.data.title)
);

@NgModule({
  declarations: [
    LifeProcessDesignStatusPolicyIndexComponent,
    LifeProcessDesignStatusPolicyCreateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule,
    ComponentsModule,
  ],
})
export class PolicyModule {}
