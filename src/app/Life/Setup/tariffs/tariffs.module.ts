import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { lifeSetupTariffsRoutes, TariffsRoutingModule } from './tariffs-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';

import { CreateSetupsTariffsComponent } from './create-tariffs/create-tariffs.component';
import { IndexSetupsTariffsComponent } from './index-tariffs/index-tariffs.component';
import { StartSetupsTariffsComponent } from './start-tariffs/start-tariffs.component';
import { ComponentsModule } from 'src/app/Shared/components/components.module';

@NgModule({
  declarations: [CreateSetupsTariffsComponent, IndexSetupsTariffsComponent, StartSetupsTariffsComponent],
  imports: [CommonModule, SharedModule, ComponentsModule, TariffsRoutingModule],
  providers: [DecimalPipe]
})
export class TariffsModule {}
