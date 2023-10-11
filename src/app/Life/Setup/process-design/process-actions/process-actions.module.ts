import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IndexProcessActionsComponent } from './index-process-actions/index-process-actions.component';
import { StartProcessActionsComponent } from './start-process-actions/start-process-actions.component';
import { CreateProcessActionsComponent } from './create-process-actions/create-process-actions.component';
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
    data: { title: 'Process Actions' },
    component: IndexProcessActionsComponent,
  },
  {
    path: 'start',
    data: { title: 'Process Actions / Start' },
    component: StartProcessActionsComponent,
  },
  ...EVFunctions.extendRoute(
    {
      path: '',
      data: { title: ' Process Actions' },
      component: CreateProcessActionsComponent,
    },
    IndexProcessActionsComponent
  ),
];

ROUTES.forEach((x) => {
  x.data?.title
    ? (x.data.title = 'Set Up / Process Design ' + x.data.title)
    : null;
});

@NgModule({
  declarations: [
    IndexProcessActionsComponent,
    StartProcessActionsComponent,
    CreateProcessActionsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule,
    ComponentsModule,
  ],
})
export class ProcessActionsModule {}
