import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCreditNoteDocumentsComponent } from './view-credit-note-documents.component';
import { TablePlainModule } from '../../../../../Shared/components/table-plain/table-plain.module';
import { SharedModule } from 'src/app/Shared/shared.module';


@NgModule({
  declarations: [ViewCreditNoteDocumentsComponent],
  imports: [CommonModule, TablePlainModule,SharedModule],
  exports: [ViewCreditNoteDocumentsComponent],
})
export class ViewCreditNoteDocumentsModule {}
