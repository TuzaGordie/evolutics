import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  BatchUpload,
  EBatchUploadType,
} from './batch-uploads-extras/batch-uploads.model';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(
        './batch-uploads-pages/index-batch-uploads/index-batch-uploads.module'
      ).then((m) => m.IndexBatchUploadsModule),
    data: { title: 'Admin / Batch Uploads' },
  },
  {
    path: EBatchUploadType.individualClients,
    loadChildren: () =>
      import(
        './batch-uploads-pages/individual-client-batch-upload/individual-client-batch-upload.module'
      ).then((m) => m.IndividualClientBatchUploadModule),
    data: {
      title: 'Admin / Batch Uploads / Individual Client',
      batchType: BatchUpload.get(EBatchUploadType.individualClients),
    },
  },
  {
    path: EBatchUploadType.corporateClients,
    loadChildren: () =>
      import(
        './batch-uploads-pages/corporate-client-batch-upload/corporate-client-batch-upload.module'
      ).then((m) => m.CorporateClientBatchUploadModule),
    data: {
      title: 'Admin / Batch Uploads / Corporate Client',
      batchType: BatchUpload.get(EBatchUploadType.corporateClients),
    },
  },
  {
    path: EBatchUploadType.branches,
    loadChildren: () =>
      import(
        './batch-uploads-pages/branches-batch-upload/branches-batch-upload.module'
      ).then((m) => m.BranchesBatchUploadModule),
    data: {
      title: 'Admin / Batch Uploads / Branches',
      batchType: BatchUpload.get(EBatchUploadType.branches),
    },
  },
  {
    path: EBatchUploadType.clientBanks,
    loadChildren: () =>
      import(
        './batch-uploads-pages/client-bank-batch-upload/client-bank-batch-upload.module'
      ).then((m) => m.ClientBankBatchUploadModule),
    data: {
      title: 'Admin / Batch Uploads / Client Bank',
      batchType: BatchUpload.get(EBatchUploadType.clientBanks),
    },
  },
  {
    path: EBatchUploadType.clientRelationships,
    loadChildren: () =>
      import(
        './batch-uploads-pages/client-relationships-batch-upload/client-relationships-batch-upload.module'
      ).then((m) => m.ClientRelationshipsBatchUploadModule),
    data: {
      title: 'Admin / Batch Uploads / Client Relationships',
      batchType: BatchUpload.get(EBatchUploadType.clientRelationships),
    },
  },
  {
    path: EBatchUploadType.clientContacts,
    loadChildren: () =>
      import(
        './batch-uploads-pages/client-contact-person-batch-upload/client-contact-person-batch-upload.module'
      ).then((m) => m.ClientContactPersonBatchUploadModule),
    data: {
      title: 'Admin / Batch Uploads / Client Contact Person',
      batchType: BatchUpload.get(EBatchUploadType.clientContacts),
    },
  },
  {
    path: EBatchUploadType.agents,
    loadChildren: () =>
      import(
        './batch-uploads-pages/agent-batch-upload/agent-batch-upload.module'
      ).then((m) => m.AgentBatchUploadModule),
    data: {
      title: 'Admin / Batch Uploads / Agent',
      batchType: BatchUpload.get(EBatchUploadType.agents),
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BatchUploadsRoutingModule {}
