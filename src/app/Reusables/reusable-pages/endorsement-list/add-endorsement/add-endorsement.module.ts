import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEndorsementComponent } from './add-endorsement.component'; 
import { SharedModule } from 'src/app/Shared/shared.module';

@NgModule({
  declarations: [AddEndorsementComponent],
  imports: [CommonModule, SharedModule],
  exports: [AddEndorsementComponent],
})
export class AddEndorsementModule {}
