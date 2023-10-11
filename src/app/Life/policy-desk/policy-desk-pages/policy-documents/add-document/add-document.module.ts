import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDocumentComponent } from './add-document.component';
import { PdSharedModule } from '../../../policy-desk-extras/pd-shared.module';
import { SharedModule } from 'src/app/Shared/shared.module';


@NgModule({
  declarations: [AddDocumentComponent],
  imports: [CommonModule, PdSharedModule,SharedModule],
  exports: [AddDocumentComponent],
})
export class AddDocumentModule {}
