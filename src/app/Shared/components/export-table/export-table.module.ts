import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportTableComponent } from './export-table.component';
import { BtnModule } from '../btn/btn.module';



@NgModule({
  declarations: [
    ExportTableComponent
  ],
  imports: [
    CommonModule,BtnModule
  ],
  exports: [
    ExportTableComponent
  ]
})
export class ExportTableModule { }
