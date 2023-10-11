import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneratePolicyDocumentComponent } from './generate-document.component';
import { SharedModule } from 'src/app/Shared/shared.module';


@NgModule({
  declarations: [
    GeneratePolicyDocumentComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    GeneratePolicyDocumentComponent
  ]
})
export class GenerateDocumentModule { }
