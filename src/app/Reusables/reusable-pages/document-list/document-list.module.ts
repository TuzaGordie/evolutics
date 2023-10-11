import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentListRoutingModule } from './document-list-routing.module';
import { DocumentListComponent } from './document-list.component';
import { DocumentListService } from './document-list.service';
import { SharedModule } from 'src/app/Shared/shared.module';
import { AddDocumentModalModule } from '../../reusable-comps/add-document-modal/add-document-modal.module';
import { SendByPipe } from './document-list.pipe';

@NgModule({
  declarations: [DocumentListComponent, SendByPipe],
  imports: [
    CommonModule,
    DocumentListRoutingModule,
    SharedModule,
    AddDocumentModalModule,
  ],
  exports: [
    SendByPipe,
  ]
})
export class DocumentListModule {}
