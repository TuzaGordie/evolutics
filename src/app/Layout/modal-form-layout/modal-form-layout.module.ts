import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFormLayoutComponent } from './modal-form-layout.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { NavigationModule } from '../navigation/navigation.module';

@NgModule({
  declarations: [ModalFormLayoutComponent],
  imports: [CommonModule, NavigationModule],
  exports: [ModalFormLayoutComponent],
})
export class ModalFormLayoutModule {}
