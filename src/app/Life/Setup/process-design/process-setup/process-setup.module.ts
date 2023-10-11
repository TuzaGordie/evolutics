import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CreateSetupsProcessSetupComponent } from './create-process-setup/create-process-setup.component';
import { IndexSetupsProcessSetupComponent } from './index-process-setup/index-process-setup.component';
import { StartSetupsProcessSetupComponent } from './start-process-setup/start-process-setup.component';
import { EVFunctions } from 'src/app/configs/base-functions';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';

const ROUTES = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full',
  },
  {
    path: 'index',
    data: { title: 'Process Setup' },
    component: IndexSetupsProcessSetupComponent,
  },
  {
    path: 'start',
    data: { title: 'Process Setup / Start' },
    component: StartSetupsProcessSetupComponent,
  },
  ...EVFunctions.extendRoute(
    {
      path: '',
      data: { title: ' Process Setup' },
      component: CreateSetupsProcessSetupComponent,
    },
    IndexSetupsProcessSetupComponent
  ),
];

ROUTES.forEach((x) => {
  x.data?.title
    ? (x.data.title = 'Set Up / Process Design / ' + x.data.title)
    : null;
});

@NgModule({
  declarations: [
    CreateSetupsProcessSetupComponent,
    IndexSetupsProcessSetupComponent,
    StartSetupsProcessSetupComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule,
    ComponentsModule,
  ],
})
export class ProcessSetupModule {}
