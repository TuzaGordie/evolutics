import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManualCommissionsComponent } from './manual-commissions.component';
import { SharedModule } from 'src/app/Shared/shared.module';

@NgModule({
  declarations: [ManualCommissionsComponent],
  imports: [CommonModule, SharedModule],
  exports: [ManualCommissionsComponent],
})
export class ManualCommissionsModule {}
