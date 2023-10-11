import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFaculativeComponent } from './add-faculative.component';
import { SharedModule } from 'src/app/Shared/shared.module';
 
@NgModule({
  declarations: [AddFaculativeComponent],
  imports: [CommonModule,  SharedModule],
  exports: [AddFaculativeComponent],
})
export class AddFaculativeModule {}
