import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CurrencyCodeCreateComponent } from './currency/currencyCode/currency-code-create/currency-code-create.component';
import { CurrencyCodeIndexComponent } from './currency/currencyCode/currency-code-index/currency-code-index.component';
import { CurrencyCodeStartComponent } from './currency/currencyCode/currency-code-start/currency-code-start.component';
import { CurrencyRateCreateComponent } from './currency/currencyRate/currency-rate-create/currency-rate-create.component';
import { CurrencyRateIndexComponent } from './currency/currencyRate/currency-rate-index/currency-rate-index.component';
import { CurrencyRateStartComponent } from './currency/currencyRate/currency-rate-start/currency-rate-start.component';
import { IndexCodeNumberingComponent } from './numbering/index-numbering.component';
import { CodeSubgroupComponent } from './parameters/code-subgroup/code-subgroup.component';
import { CreateCodeParametersComponent } from './parameters/create-parameters/create-parameters.component';
import { IndexCodeParametersComponent } from './parameters/index-parameters/index-parameters.component';
import { StartCodeParametersComponent } from './parameters/start-parameters/start-parameters.component';
import { CreateCodePremiumFrequencyComponent } from './premfreq/create-premfreq/create-premfreq.component';
import { IndexCodePremiumFrequencyComponent } from './premfreq/index-premfreq/index-premfreq.component';
import { StartCodePremiumFrequencyComponent } from './premfreq/start-premfreq/start-premfreq.component';
import { CreateCodePremiumPaymentMethodComponent } from './prempaymthd/create-prempaymthd/create-prempaymthd.component';
import { IndexCodePremiumPaymentMethodComponent } from './prempaymthd/index-prempaymthd/index-prempaymthds.component';
import { StartCodePremiumPaymentMethodComponent } from './prempaymthd/start-prempaymthd/start-prempaymthd.component';
import { LifeSetupCodeLotteryComponent } from './life-setup-code-lottery/life-setup-code-lottery.component';
import {SetupFileFormatComponent} from "./setup-file-format/setup-file-format.component";
import {SetupFileFormatCreateNewComponent} from "./setup-file-format-create-new/setup-file-format-create-new.component";

export const lifeSetupCodeRoutes: Routes = [
  {
    path: 'index-parameters',
    component: IndexCodeParametersComponent,
  },
  {
    path: 'start-parameters',
    component: StartCodeParametersComponent,
  },
  {
    path: 'create-parameters',
    component: CreateCodeParametersComponent,
  },
  {
    path: 'currency/code/create',
    data: { title: 'Currency / Code' },
    component: CurrencyCodeCreateComponent,
  },
  {
    path: 'currency/code/index',
    data: { title: 'Currency / Code' },
    component: CurrencyCodeIndexComponent,
  },
  {
    path: 'currency/code/start',
    data: { title: 'Currency / Code' },
    component: CurrencyCodeStartComponent,
  },
  {
    path: 'currency/rate/create',
    data: { title: 'Currency / Rate' },
    component: CurrencyRateCreateComponent,
  },
  {
    path: 'currency/rate/index',
    data: { title: 'Currency / Rate' },
    component: CurrencyRateIndexComponent,
  },
  {
    path: 'currency/rate/start',
    data: { title: 'Currency / Rate' },
    component: CurrencyRateStartComponent,
  },
  {
    path: 'create-subgroup-parameters',
    data: { title: 'Sub Group' },
    component: CodeSubgroupComponent,
  },

  {
    path: 'index-premfreq',
    data: { title: 'Premium Frequencies' },
    component: IndexCodePremiumFrequencyComponent,
  },
  {
    path: 'start-premfreq',
    data: { title: 'Premium Frequencies' },
    component: StartCodePremiumFrequencyComponent,
  },
  {
    path: 'create-premfreq',
    data: { title: 'Premium Frequencies' },
    component: CreateCodePremiumFrequencyComponent,
  },
  {
    path: 'index-prempaymthd',
    data: { title: 'Premium Payment Method' },
    component: IndexCodePremiumPaymentMethodComponent,
  },
  {
    path: 'start-prempaymthd',
    data: { title: 'Premium Payment Method' },
    component: StartCodePremiumPaymentMethodComponent,
  },
  {
    path: 'create-prempaymthd',
    data: { title: 'Premium Payment Method' },
    component: CreateCodePremiumPaymentMethodComponent,
  },
  {
    path: 'index-numbering',
    data: { title: 'Numbering' },
    component: IndexCodeNumberingComponent,
  },
  {
    path: 'lottery',
    data: { title: 'Lottery' },
    component: LifeSetupCodeLotteryComponent,
  },
  {
    path: 'file-format',
    data: { title: 'File Format' },
    component: SetupFileFormatComponent,
  },
  {
    path: 'file-format/create',
    data: { title: 'File Format' },
    component: SetupFileFormatCreateNewComponent,
  },
];
lifeSetupCodeRoutes.forEach((x) => {
  x.data = x.data || {};
  x.data.title = 'Set Up / Codes' + (x.data?.title ? ' / ' + x.data.title : '');
});

@NgModule({
  imports: [RouterModule.forChild(lifeSetupCodeRoutes)],
  exports: [RouterModule],
})
export class CodeRoutingModule {}
