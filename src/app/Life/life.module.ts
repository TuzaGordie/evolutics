import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { LayoutModule } from '../Layout/layout.module';
import { UtilityService } from '../Services/utility.service';
import { ComponentsModule } from '../Shared/components/components.module';
import { InputMatrixModule } from './Setup/Rates/general-rates/general-rates-comps/input-matrix/input-matrix.module';
import { SharedModule } from '../Shared/shared.module';
import { NewIndividualAgentModule } from './agent-desk/new-individual-agent/new-individual-agent.module';
import { LifeRoutingModule } from './life-routing.module';
import { LifeHomeComponent } from './life-home/life-home.component'; 
@NgModule({
  declarations: [LifeHomeComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    InputMatrixModule,
    NewIndividualAgentModule,
    ReactiveFormsModule,
    LifeRoutingModule,
    SharedModule,
    ChartsModule,
    LayoutModule,
    // RouterModule.forChild([
    //   {
    //     path: '',
    //     component: LifeComponent,
    //     children: lifeRoutes,
    //   },
    // ]),
  ],
  exports: [],
  providers: [UtilityService],
})
export class LifeModule {}
