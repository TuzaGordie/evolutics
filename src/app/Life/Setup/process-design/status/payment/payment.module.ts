import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EVFunctions } from 'src/app/configs/base-functions';
import { LifeProcessDesignStatusPaymentIndexComponent } from './life-process-design-status-payment-index/life-process-design-status-payment-index.component';
import { LifeProcessDesignStatusPaymentCreateComponent } from './life-process-design-status-payment-create/life-process-design-status-payment-create.component';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { RouterModule } from '@angular/router';

const ROUTES = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full',
  },
  {
    path: 'index',
    component: LifeProcessDesignStatusPaymentIndexComponent,
    data: { title: ' Payment' },
  },
  ...EVFunctions.extendRoute(
    {
      path: '',
      data: { title: '/ Payment' },
      component: LifeProcessDesignStatusPaymentCreateComponent,
    },
    LifeProcessDesignStatusPaymentIndexComponent
  ),
];
ROUTES.filter((x) => x.data?.title).forEach(
  (x) => (x.data.title = 'Set Up / Status /' + x.data.title)
);

@NgModule({
  declarations: [
    LifeProcessDesignStatusPaymentIndexComponent,
    LifeProcessDesignStatusPaymentCreateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule,
    ComponentsModule,
  ],
})
export class PaymentModule {}
