import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeRoutingModule, lifeSetupCodeRoutes } from './code-routing.module';

import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';
import { CodeMaterialDesignModule } from './code.material.module';

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
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { IndexTranslationsTemplateComponent } from './currency/index-template/index-template.component';
import { SetupFileFormatComponent } from './setup-file-format/setup-file-format.component';
import { SetupFileFormatCreateNewComponent } from './setup-file-format-create-new/setup-file-format-create-new.component';

@NgModule({
  declarations: [
    CodeSubgroupComponent,
    CreateCodeParametersComponent,
    CreateCodePremiumFrequencyComponent,
    CreateCodePremiumPaymentMethodComponent,
    CurrencyCodeCreateComponent,
    CurrencyCodeIndexComponent,
    CurrencyCodeStartComponent,
    CurrencyRateCreateComponent,
    CurrencyRateIndexComponent,
    CurrencyRateStartComponent,
    IndexCodeNumberingComponent,
    IndexCodeParametersComponent,
    IndexCodePremiumFrequencyComponent,
    IndexCodePremiumPaymentMethodComponent,
    IndexTranslationsTemplateComponent,
    LifeSetupCodeLotteryComponent,
    StartCodeParametersComponent,
    StartCodePremiumFrequencyComponent,
    StartCodePremiumPaymentMethodComponent,
    SetupFileFormatComponent,
    SetupFileFormatCreateNewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    CodeMaterialDesignModule,
    ComponentsModule,
    CodeRoutingModule,
  ],
})
export class CodeModule {}
