import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetsRoutingModule } from './assets-routing.module';
import { AssetsComponent } from './assets.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { AddAssetModalModule } from './add-asset-modal/add-asset-modal.module';
import { BatchAssetModalComponent } from './batch-asset-modal/batch-asset-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BatchUploadBaseModule } from 'src/app/CRMS/crms-pages/admin/admin-pages/batch-uploads/batch-uploads-comps/batch-upload-base/batch-upload-base.module';
import { InputTableModule } from 'src/app/Shared/components/input-table/input-table.module';
import { BatchMemberModalComponent } from './batch-member-modal/batch-member-modal.component';

@NgModule({
  declarations: [
    AssetsComponent,
    BatchAssetModalComponent,
    BatchMemberModalComponent,
  ],
  imports: [
    CommonModule,
    AssetsRoutingModule,
    SharedModule,
    AddAssetModalModule,
    MatDialogModule,
    BatchUploadBaseModule,
    InputTableModule,
  ],
})
export class AssetsModule {}
