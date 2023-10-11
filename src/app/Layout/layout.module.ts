import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { FormLayoutComponent } from './form-layout/form-layout.component';
import { NavigationModule } from './navigation/navigation.module';
import { LoaderModule } from '../Shared/components/loader/loader.module';
import { WorkflowPipesModule } from '../Shared/pipes/workflow-pipes/pipes.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DirectivesModule } from '../Shared/directives/index.directive';
import { UtilityPipesModule } from '../Shared/pipes/utility.pipe';
import { ModalFormLayoutModule } from './modal-form-layout/modal-form-layout.module';
import { DashboardCaseComponent } from './dashboard-case/dashboard-case.component';

@NgModule({
  declarations: [DashboardComponent, FormLayoutComponent, DashboardCaseComponent],
  imports: [
    CommonModule,
    ChartsModule,
    RouterModule,
    NavigationModule,
    LoaderModule,
    WorkflowPipesModule,
    MatTooltipModule,
    DirectivesModule,
    UtilityPipesModule,
  ],
  exports: [DashboardComponent, FormLayoutComponent, NavigationModule,ModalFormLayoutModule, DashboardCaseComponent],
})
export class LayoutModule {}
