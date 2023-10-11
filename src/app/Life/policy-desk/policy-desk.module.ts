import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { viewLifePolicyButtonsRoutes } from './policy-desk-routing.module';
import { PolicyDeskLayoutModule } from './policy-desk-comps/policy-desk-layout/policy-desk-layout.module';
import { RouterModule } from '@angular/router';
import { PolicyDeskLayoutComponent } from './policy-desk-comps/policy-desk-layout/policy-desk-layout.component';
import { PDService } from './policy-desk-extras/policy-desk.service';
import { MatDialogModule } from '@angular/material/dialog';
import { UtilityService } from 'src/app/Services/utility.service';
import { SharedModule } from '../../Shared/shared.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: PolicyDeskLayoutComponent,
        children: viewLifePolicyButtonsRoutes,
      },
    ]),
    PolicyDeskLayoutModule,
    MatDialogModule,
  ],
  providers: [PDService, UtilityService],
})
export class PolicyDeskModule {}
