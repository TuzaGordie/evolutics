import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  lifeSetupTaskRoutes,
  TaskSetupRoutingModule,
} from './task-setup-routing.module'; 

import { CreateSetupsTaskSetupComponent } from './create-task-setup/create-task-setup.component';
import { IndexSetupsTaskSetupComponent } from './index-task-setup/index-task-setup.component';
import { StartSetupsTaskSetupComponent } from './start-task-setup/start-task-setup.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';

@NgModule({
  declarations: [ 
    CreateSetupsTaskSetupComponent,
    IndexSetupsTaskSetupComponent,
    StartSetupsTaskSetupComponent,
  ],
  imports: [
    CommonModule,
    SharedModule, 
    TaskSetupRoutingModule,ComponentsModule
  ],
})
export class TaskSetupModule {}
