import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { TablePlainModule } from 'src/app/Shared/components/table-plain/table-plain.module';
import { TextCase1Module } from 'src/app/Shared/components/text-case-1/text-case-1.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDateDirectDebitComponent } from './admindates/admin-date-direct-debit/admin-date-direct-debit.component';
import { AdminDateSystemComponent } from './admindates/admin-date-system/admin-date-system.component';
import { AdmindatesComponent } from './admindates/admindates.component';
import { BatchLogFileComponent } from './batch-log-file/batch-log-file.component';
import { BatchlogComponent } from './batchlog/batchlog.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { CreatebatchComponent } from './createbatch/createbatch.component';
import { DatabasedefinitionComponent } from './databasedefinition/databasedefinition.component';
import { AdminDocumentsComponent } from './documents/documents.component';
import { InterestcalculationComponent } from './interestcalculation/interestcalculation.component';
import { LifeAdminGatewayComponent } from './life-admin-gateway/life-admin-gateway.component';
import { LifeAdminLotteryIndexComponent } from './life-admin-lottery-index/life-admin-lottery-index.component';
import { LifeAdminLotteryViewComponent } from './life-admin-lottery-view/life-admin-lottery-view.component';
import { RunbatchComponent } from './runbatch/runbatch.component';
import { GenerateDocsModalComponent } from './documents/generate-docs-modal/generate-docs-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DocumentListModule } from 'src/app/Reusables/reusable-pages/document-list/document-list.module';



@NgModule({
  declarations: [
    AdminDateDirectDebitComponent,
    AdmindatesComponent,
    AdminDateSystemComponent,
    AdminDocumentsComponent,
    BatchlogComponent,
    BatchLogFileComponent,
    ConfigurationComponent,
    CreatebatchComponent,
    DatabasedefinitionComponent,
    InterestcalculationComponent,
    LifeAdminGatewayComponent,
    LifeAdminLotteryIndexComponent,
    LifeAdminLotteryViewComponent, 
    RunbatchComponent,
    GenerateDocsModalComponent, 
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    FormsModule,
    ChartsModule,
    TablePlainModule,
    TextCase1Module,
    MatMenuModule,
    MatDialogModule,
    DocumentListModule, // imported for access to sendBy pipe
  ],
})
export class AdminModule {}
