import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateBrandRoutingModule } from './create-brand-routing.module';
import { CreateBrandComponent } from './create-brand.component';
import { SharedModule } from 'src/app/Shared/shared.module';

@NgModule({
  declarations: [CreateBrandComponent],
  imports: [CommonModule, CreateBrandRoutingModule, SharedModule],
})
export class CreateBrandModule {}
