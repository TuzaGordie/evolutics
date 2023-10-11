import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchListComponent } from './search-list.component';
import { SharedModule } from 'src/app/Shared/shared.module';



@NgModule({
  declarations: [
    SearchListComponent
  ],
  imports: [
    CommonModule,SharedModule
  ],
  exports: [
    SearchListComponent
  ]
})
export class SearchListModule { }
