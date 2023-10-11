import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceRoutingModule } from './finance-routing.module';
import { FinanceHomeComponent } from './finance-home/finance-home.component';
import { SharedModule } from '../Shared/shared.module';
import { ComponentsModule } from '../Shared/components/components.module';
import { LayoutModule } from '../Layout/layout.module';
import { QuoteFinderComponent } from './shared/quote-finder/quote-finder.component';
import { PolicyFinderComponent } from './shared/policy-finder/policy-finder.component';
import { CouponFinderComponent } from './shared/coupon-finder/coupon-finder.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    FinanceHomeComponent,
    QuoteFinderComponent,
    PolicyFinderComponent,
    CouponFinderComponent,
  ],
  imports: [CommonModule, FinanceRoutingModule,SharedModule,ComponentsModule,LayoutModule, MatDialogModule],
})
export class FinanceModule {}
