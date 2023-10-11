import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ERModule } from 'src/app/Reusables/reusable-extras/reusable.model';
import { ViewProviderComponent } from './view-provider.component';

const routes: Routes = [
  { path: '', component: ViewProviderComponent },
  {
    path: 'documents',
    loadChildren: () =>
      import(
        '../../../../Reusables/reusable-pages/document-list/document-list.module'
      ).then((m) => m.DocumentListModule),
    data: { title: 'View Provider / Documents', rModule: ERModule.client },
  }, 
  {
    path: 'endorsements',
    loadChildren: () =>
      import(
        '../../../../Reusables/reusable-pages/endorsement-list/endorsement-list.module'
      ).then((m) => m.EndorsementListModule),
    data: { title: 'View Provider / Endorsements', rModule: ERModule.client },
  },
  {
    path: 'web-login',
    loadChildren: () =>
      import(
        '../../../../Reusables/reusable-pages/web-login-list/web-login-list.module'
      ).then((m) => m.WebLoginListModule),
    data: { title: 'View Provider / Web Login', rModule: ERModule.client },
  },
  {
    path: 'workflows',
    loadChildren: () =>
      import(
        '../../../../Reusables/reusable-pages/workflow-list/workflow-list.module'
      ).then((m) => m.WorkflowListModule),
    data: { title: 'View Provider / Workflows', rModule: ERModule.client },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewProviderRoutingModule {}
