import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewAssetRoutingModule } from './view-asset-routing.module';
import { AssetTyperPipe, ViewAssetComponent } from './view-asset.component';
import { ViewMotorComponent } from './view-motor/view-motor.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ViewPropertyComponent } from './view-property/view-property.component';

@NgModule({
  declarations: [
    ViewAssetComponent,
    ViewMotorComponent,
    ViewPropertyComponent,
    AssetTyperPipe,
  ],
  imports: [CommonModule, ViewAssetRoutingModule, SharedModule],
})
export class ViewAssetModule {}
