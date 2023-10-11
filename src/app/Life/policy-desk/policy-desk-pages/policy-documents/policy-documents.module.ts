import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyDocumentsRoutingModule } from './policy-documents-routing.module';
import { PolicyDocumentsComponent } from './policy-documents.component';
import { TablePlainModule } from '../../../../Shared/components/table-plain/table-plain.module';
import { AddDocumentModule } from './add-document/add-document.module';
import { GenerateDocumentModule } from './generate-document/generate-document.module';
import { PdSharedModule } from '../../policy-desk-extras/pd-shared.module';
import { SharedModule } from 'src/app/Shared/shared.module';


@NgModule({
  declarations: [PolicyDocumentsComponent],
  imports: [
    CommonModule,
    PolicyDocumentsRoutingModule,
    TablePlainModule,
    AddDocumentModule,
    GenerateDocumentModule,
    PdSharedModule,
    SharedModule
  ],
})
export class PolicyDocumentsModule {}
