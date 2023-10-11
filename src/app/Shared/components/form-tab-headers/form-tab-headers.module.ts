import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormTabHeadersComponent } from './form-tab-headers.component';
import { UtilityPipesModule } from '../../pipes/utility.pipe';

@NgModule({
  declarations: [FormTabHeadersComponent],
  imports: [CommonModule, UtilityPipesModule],
  exports: [FormTabHeadersComponent],
})
export class FormTabHeadersModule {}
