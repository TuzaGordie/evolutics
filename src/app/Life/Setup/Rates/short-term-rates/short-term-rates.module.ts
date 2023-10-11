import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShortTermRatesRoutingModule } from './short-term-rates-routing.module'; 
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';

@NgModule({
  declarations: [  
  ],
  imports: [CommonModule, ShortTermRatesRoutingModule, SharedModule,ComponentsModule],
})
export class ShortTermRatesModule {}
