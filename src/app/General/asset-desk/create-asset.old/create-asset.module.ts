import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherUploadAssetComponent } from './other-upload-asset/other-upload-asset.component';
import { DetailsCreateMotorAssetComponent } from './details-create-motor-asset/details-create-asset.component';
import { DetailsCreatePropertyAssetComponent } from './details-create-property-asset/details-create-asset.component';
import { IndexCreateAssetComponent } from './index-create-asset/index-create-asset.component';
import { StartCreateAssetComponent } from './start-create-asset/start-create-asset.component';
import { UploadCreateAssetComponent } from './upload-create-asset/upload-create-asset.component';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { SharedModule } from 'src/app/Shared/shared.module';

const comps = [
  UploadCreateAssetComponent,
  DetailsCreateMotorAssetComponent,
  DetailsCreatePropertyAssetComponent,
  IndexCreateAssetComponent,
  StartCreateAssetComponent,
  OtherUploadAssetComponent,
];
@NgModule({
  declarations: comps,
  exports: comps,
  imports: [CommonModule, SharedModule, ComponentsModule],
})
export class CreateAssetModule {}
