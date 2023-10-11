import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceSetupsRoutingModule } from './finance-setups-routing.module';
import { ExpenseSetupComponent } from './expense-setup/expense-setup.component';

import {SharedModule} from "../../Shared/shared.module";
import { ConstCenterSetupComponent } from './const-center-setup/const-center-setup.component';
import { AllocationSetupComponent } from './allocation-setup/allocation-setup.component';
import { DepreciationSetupComponent } from './depreciation-setup/depreciation-setup.component';


@NgModule({
  declarations: [


    ExpenseSetupComponent,
      ConstCenterSetupComponent,
      AllocationSetupComponent,
      DepreciationSetupComponent
  ],
  imports: [
    CommonModule,
    FinanceSetupsRoutingModule,
    SharedModule
  ]
})
export class FinanceSetupsModule { }
