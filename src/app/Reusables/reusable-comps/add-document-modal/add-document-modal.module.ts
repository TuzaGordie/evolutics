import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDocumentModalComponent } from './add-document-modal.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { BtnModule } from 'src/app/Shared/components/btn/btn.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilityPipesModule } from 'src/app/Shared/pipes/utility.pipe';
import { InputModule } from 'src/app/Shared/components/input/input.module';

@NgModule({
  declarations: [AddDocumentModalComponent],
  imports: [CommonModule,BtnModule,FormsModule,ReactiveFormsModule,UtilityPipesModule,InputModule ],
})
export class AddDocumentModalModule {}
