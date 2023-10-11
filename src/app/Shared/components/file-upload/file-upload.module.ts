import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { BtnModule } from '../btn/btn.module';
import { AddDocumentModalModule } from 'src/app/Reusables/reusable-comps/add-document-modal/add-document-modal.module';
import { UtilityPipesModule } from '../../pipes/utility.pipe';

@NgModule({
  declarations: [FileUploadComponent],
  imports: [CommonModule, BtnModule, AddDocumentModalModule,UtilityPipesModule],
  exports: [FileUploadComponent],
})
export class FileUploadModule {}
