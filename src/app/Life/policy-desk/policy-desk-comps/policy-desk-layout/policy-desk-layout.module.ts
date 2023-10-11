import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyDeskLayoutComponent } from './policy-desk-layout.component';

import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';
import { PdSharedModule } from '../../policy-desk-extras/pd-shared.module';

@NgModule({
  declarations: [PolicyDeskLayoutComponent],
  imports: [CommonModule, RouterModule, SharedModule, PdSharedModule],
  exports: [PolicyDeskLayoutComponent],
})
export class PolicyDeskLayoutModule {}
