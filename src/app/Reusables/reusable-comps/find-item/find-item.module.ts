import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindItemComponent } from './find-item.component';
import { TablePlainModule } from 'src/app/Shared/components/table-plain/table-plain.module';
import { TableHttpsModule } from 'src/app/Shared/components/table-https/table-https.module';
import { SharedModule } from 'src/app/Shared/shared.module';



@NgModule({
  declarations: [
    FindItemComponent
  ],
  imports: [
    CommonModule,TablePlainModule,TableHttpsModule,SharedModule
  ],
  exports: [
    FindItemComponent
  ]
})
export class FindItemModule { }
