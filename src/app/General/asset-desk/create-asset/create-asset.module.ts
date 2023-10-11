import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateAssetRoutingModule } from './create-asset-routing.module';
import { CreateAssetComponent } from './create-asset.component';
import { CreateMotorAssetFormComponent } from './create-motor-asset-form/create-motor-asset-form.component';
import { CreatePropertyAssetFormComponent } from './create-property-asset-form/create-property-asset-form.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { AssetUploadFormComponent } from './asset-upload-form/asset-upload-form.component';
import { AddDocumentModalModule } from 'src/app/Reusables/reusable-comps/add-document-modal/add-document-modal.module';

@NgModule({
  declarations: [
    CreateAssetComponent,
    CreateMotorAssetFormComponent,
    CreatePropertyAssetFormComponent,
    AssetUploadFormComponent,
  ],
  imports: [CommonModule, CreateAssetRoutingModule, SharedModule,AddDocumentModalModule],
})
export class CreateAssetModule {}
