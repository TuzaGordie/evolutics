import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageToComponentComponent } from './page-to-component.component';
import { ModalFormLayoutModule } from 'src/app/Layout/modal-form-layout/modal-form-layout.module';
import { PageToComponentDirective } from './page-to-component.directive';

@NgModule({
  declarations: [PageToComponentComponent, PageToComponentDirective],
  exports: [PageToComponentComponent, PageToComponentDirective],
  imports: [CommonModule, ModalFormLayoutModule],
})
export class PageToComponentModule {}
