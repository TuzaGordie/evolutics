import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserMenuModule } from './admin/user-menu/user-menu.module';
import { DocumentConfigurationComponent } from './admin/configuration/configuration.component';
import { DocumentCreateBatchComponent } from './admin/create-batch/create-batch.component';
import { DocumentRunBatchComponent } from './admin/run-batch/run-batch.component';
import { DocumentUserGroupComponent } from './admin/user-group/user-group.component';
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
import { DocumentRoutingModule } from './document-routing.module';
import { NavigationModule } from '../Layout/navigation/navigation.module';
import { SharedModule } from '../Shared/shared.module';
import { CreateDocumentSensitivityComponent } from './set-ups/document-mapping/create-document-sensitivity/create-document-sensitivity.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateDocumentMappingComponent } from './set-ups/document-mapping/create-document-mapping/create-document-mapping.component';

@NgModule({
  declarations: [
    DocumentConfigurationComponent,
    DocumentCreateBatchComponent,
    DocumentRunBatchComponent,
    DocumentUserGroupComponent,
    DocumentUserComponent,
    DocumentAddComponent,
    DocumentBulkUploadComponent,
    DocumentHomeComponent,
    DocumentRetrieveComponent,
    DocumentRetrieveListComponent,
    DocumentMappingComponent,
    SetupDocumentSensitivityDocComponent,
    DocumentWorkflowCreateNewScheduleComponent,
    DocumentWorkflowCreateNewTaskComponent,
    DocumentWorkflowFindComponent,
    CreateDocumentSensitivityComponent,
    CreateDocumentMappingComponent,
  ],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    UserMenuModule,
    NavigationModule,
    SharedModule,
    MatDialogModule,
  ],
  exports: [ UserMenuModule],
})
export class DocumentModule {}
