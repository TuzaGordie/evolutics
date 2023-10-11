import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexCoverCodeComponent } from './index-cover-code.component';
import { SharedModule } from 'src/app/Shared/shared.module';

@NgModule({
  declarations: [IndexCoverCodeComponent],
  imports: [CommonModule,SharedModule],
  exports: [IndexCoverCodeComponent],
})
export class IndexCoverCodeModule {}
