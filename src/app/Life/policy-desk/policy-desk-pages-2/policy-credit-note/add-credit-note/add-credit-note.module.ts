import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCreditNoteComponent } from './add-credit-note.component';
import { PdSharedModule } from '../../../policy-desk-extras/pd-shared.module';
import { SharedModule } from 'src/app/Shared/shared.module';

@NgModule({
  declarations: [AddCreditNoteComponent],
  imports: [CommonModule, PdSharedModule,SharedModule],
  exports: [AddCreditNoteComponent],
})
export class AddCreditNoteModule {}
