import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { LayoutModule } from '../Layout/layout.module';
import { ComponentsModule } from '../Shared/components/components.module';
import { SharedModule } from '../Shared/shared.module';
import { GeneralHomeComponent } from './general-home/general-home.component';
import { GeneralRoutingModule } from './general-routing.module';



@NgModule({
  declarations: [   GeneralHomeComponent],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    SharedModule,
    ChartsModule,
    ComponentsModule,
    ComponentsModule,
    LayoutModule,
  ],
})
export class GeneralModule {}
