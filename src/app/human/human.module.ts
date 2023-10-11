import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HumanRoutingModule } from './human-routing.module';
import { HumanComponent } from './human.component';
import { LayoutModule } from '../Layout/layout.module';

@NgModule({
  declarations: [HumanComponent],
  imports: [CommonModule, HumanRoutingModule, LayoutModule],
})
export class HumanModule {}
