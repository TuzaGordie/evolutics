import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SLARoutingModule } from './sla-routing.module';
import { CreateSLAComponent } from './create-sla/create-sla.component';
import { IndexSLAComponent } from './index-sla/index-sla.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';

@NgModule({
  declarations: [CreateSLAComponent, IndexSLAComponent],
  imports: [CommonModule, SLARoutingModule, SharedModule, ComponentsModule],
})
export class SLAModule {}
