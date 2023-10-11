import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentConfigurationComponent } from './admin/configuration/configuration.component';
import { DocumentCreateBatchComponent } from './admin/create-batch/create-batch.component';
import { DocumentRunBatchComponent } from './admin/run-batch/run-batch.component';
import { DocumentUserGroupComponent } from './admin/user-group/user-group.component';
import { DocumentUserMenuCloneComponent } from './admin/user-menu/clone/clone.component';
import { DocumentUserMenuCreateComponent } from './admin/user-menu/create/create.component';
import { DocumentUserMenuComponent } from './admin/user-menu/user-menu.component';
import { DocumentUserMenuViewComponent } from './admin/user-menu/view/view.component';
import { DocumentUserComponent } from './admin/user/user.component';
import { DocumentAddComponent } from './document-add/document-add.component';
import { DocumentBulkUploadComponent } from './document-bulk-upload/document-bulk-upload.component';
import { DocumentHomeComponent } from './document-home/document-home.component';
import { DocumentRetrieveComponent } from './document-retrieve/document-retrieve.component';
import { DocumentRetrieveListComponent } from './document-retrieve-list/document-retrieve-list.component';
import { DocumentMappingComponent } from './set-ups/document-mapping/document-mapping.component';
import { SetupDocumentSensitivityDocComponent } from './set-ups/document-mapping/setup-document-sensitivity-doc/setup-document-sensitivity-doc.component';
import { DocumentWorkflowCreateNewScheduleComponent } from './workflows/create-new-schedule/create-new-schedule.component';
import { DocumentWorkflowCreateNewTaskComponent } from './workflows/create-new-task/create-new-task.component';
import { DocumentWorkflowFindComponent } from './workflows/find/find.component';
import { FormLayoutComponent } from '../Layout/form-layout/form-layout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DocumentHomeComponent,
    data: { color: 'bg-document', system: 'document' },
  },
  {
    path: 'add',
    component: DocumentAddComponent,
    data: { title: 'Document / Upload' },
  },
  {
    path: 'bulk-upload',
    component: DocumentBulkUploadComponent,
    data: { title: 'Document / Bulk Upload' },
  },
  {
    path: 'retrieve',
    component: DocumentRetrieveComponent,
    data: { title: 'Document / Retrieve' },
  },
  {
    path: 'retrieve-list',
    component: DocumentRetrieveListComponent,
    data: { title: 'Document / Retrieve List' },
  },
  {
    path: 'mapping',
    component: DocumentMappingComponent,
    data: { title: 'Document / Mapping' },
  },
  {
    path: 'setup/mapping',
    component: DocumentMappingComponent,
    data: { title: 'Setup / Document / Mapping' },
  },
  {
    path: 'setup/sensitivity',
    component: SetupDocumentSensitivityDocComponent,
    data: { title: 'Setup / Document / Sensitivity' },
  },
  {
    path: 'workflow/task/create',
    component: DocumentWorkflowCreateNewTaskComponent,
    data: { title: 'Document /Work Flow' },
  },
  {
    path: 'workflow/schedule/create',
    component: DocumentWorkflowCreateNewScheduleComponent,
    data: { title: 'Document / Work Flow' },
  },
  {
    path: 'workflow/find',
    component: DocumentWorkflowFindComponent,
    data: { title: 'Document / Work Flow' },
  },
  {
    path: 'admin/user',
    component: DocumentUserComponent,
    data: { title: 'Document / User' },
  },
  {
    path: 'admin/usergroup',
    component: DocumentUserGroupComponent,
    data: { title: 'Document / User Group' },
  },
  {
    path: 'admin/userMenu', 
    component:FormLayoutComponent,
    loadChildren: () =>
      import('../Life/admin/user/usermenu/usermenu.module').then(
        (m) => m.UsermenuModule
      ),
  },
  { path: '', loadChildren: () => import('src/app/account/account.module').then(m => m.AccountModule) },
  {
    path: 'admin/createbatch',
    component: DocumentCreateBatchComponent,
    data: { title: 'Document / Create Batch' },
  },
  {
    path: 'admin/runbatch',
    component: DocumentRunBatchComponent,
    data: { title: 'Document / Run Batch' },
  },
  {
    path: 'admin/configuration',
    component: DocumentConfigurationComponent,
    data: { title: 'Document / Configuration' },
  },
  {
    path: 'workflow-desk',
    component: FormLayoutComponent,
    data: { title: 'WorkFlow' },
    loadChildren: () => import('src/app/Life/Workflow/workflow.module').then((m) => m.WorkflowModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentRoutingModule {}
