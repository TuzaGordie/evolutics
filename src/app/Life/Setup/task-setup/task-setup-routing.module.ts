import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { EPageType } from 'src/app/Shared/models/index.model';

import { CreateSetupsTaskSetupComponent } from './create-task-setup/create-task-setup.component';
import { IndexSetupsTaskSetupComponent } from './index-task-setup/index-task-setup.component';
import { StartSetupsTaskSetupComponent } from './start-task-setup/start-task-setup.component';

export const lifeSetupTaskRoutes: Routes = [
  {
    path: 'index',
    data: { title: 'Task Setup' },
    component: IndexSetupsTaskSetupComponent,
  },
  {
    path: 'start',
    data: { title: 'Task Setup' },
    component: StartSetupsTaskSetupComponent,
  },
  {
    path: 'create',
    data: { title: 'Create Task Setup',type:EPageType.createPage },
    component: CreateSetupsTaskSetupComponent,
  },
  {
    path: 'edit',
    data: { title: 'Edit Task Setup',type:EPageType.editPage },
    component: CreateSetupsTaskSetupComponent,
  },
  {
    path: 'show',
    data: { title: 'Show Task Setup',type:EPageType.showPage },
    component: CreateSetupsTaskSetupComponent,
  },
  {
    path: 'clone',
    data: { title: 'Clone Task Setup',type:EPageType.clonePage },
    component: CreateSetupsTaskSetupComponent,
  },
];
lifeSetupTaskRoutes.filter((x) => x.data?.title).forEach((x) => (x.data.title = 'Set Up / ' + x.data.title));

@NgModule({
  imports: [RouterModule.forChild(lifeSetupTaskRoutes)],
  exports: [RouterModule],
})
export class TaskSetupRoutingModule {}
