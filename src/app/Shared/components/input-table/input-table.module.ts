import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTableComponent } from './input-table.component';
import { InputModule } from '../input/input.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UtilityPipesModule } from '../../pipes/utility.pipe';
import { PhoneNumberModule } from '../phone-number/phone-number.module';
import { FileUploadModule } from '../file-upload/file-upload.module';

@NgModule({
  declarations: [InputTableComponent],
  imports: [
    CommonModule,
    FileUploadModule,
    InputModule,
    MatPaginatorModule,
    MatSortModule,
    PhoneNumberModule,
    UtilityPipesModule,
  ],
  exports: [InputTableComponent],
})
export class InputTableModule {}
