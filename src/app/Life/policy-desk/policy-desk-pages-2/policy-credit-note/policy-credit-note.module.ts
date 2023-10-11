import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyCreditNoteRoutingModule } from './policy-credit-note-routing.module';
import { PolicyCreditNoteComponent } from './policy-credit-note.component';
import { ViewCreditNoteDocumentsModule } from './view-credit-note-documents/view-credit-note-documents.module';
import { AddCreditNoteModule } from './add-credit-note/add-credit-note.module';
import { PdSharedModule } from '../../policy-desk-extras/pd-shared.module';
import { TablePlainModule } from '../../../../Shared/components/table-plain/table-plain.module';
import { SharedModule } from 'src/app/Shared/shared.module';

@NgModule({
  declarations: [PolicyCreditNoteComponent],
  imports: [
    CommonModule,
    PolicyCreditNoteRoutingModule,
    ViewCreditNoteDocumentsModule,
    AddCreditNoteModule,
    PdSharedModule,
    TablePlainModule,
    SharedModule
  ],
})
export class PolicyCreditNoteModule {}
