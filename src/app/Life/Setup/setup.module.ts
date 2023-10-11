import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { lifeSetupRoutes, SetupRoutingModule } from './setup-routing.module';
import { RouterModule } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // SetupRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
    ChartsModule,
    RouterModule.forChild([
      {
        path: '',
        children: lifeSetupRoutes,
      },
    ]),
  ],
  exports: [],
  providers: [UtilityService],
})
export class SetupModule {}
