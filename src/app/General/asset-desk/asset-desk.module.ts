import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetDeskRoutingModule } from './asset-desk-routing.module';

import { AssetSearchListComponent } from './find-asset/asset-search-list/asset-search-list.component';
import { IndexFindAssetComponent } from './find-asset/index-find-asset/index-find-asset.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { LayoutModule } from 'src/app/Layout/layout.module';
import { ViewAssetModule } from './view-asset.old/view-asset.module';
import { CreateAssetModule } from './create-asset.old/create-asset.module';
import { PropAssetsComponent } from './prop-assets/prop-assets.component';
import {
  ViewAssetPendingClaimsComponent
} from "./view-asset.old/view-asset-pending-claims/view-asset-pending-claims.component";
import { SearchListModule } from 'src/app/Reusables/reusable-comps/search-list/search-list.module';
import { TableHttpsModule } from 'src/app/Shared/components/table-https/table-https.module';

@NgModule({
  declarations: [
    AssetSearchListComponent,
    IndexFindAssetComponent,
    PropAssetsComponent,
    ViewAssetPendingClaimsComponent
  ],
  imports: [
    CommonModule,
    AssetDeskRoutingModule,
    SharedModule,
    ComponentsModule,
    LayoutModule,
    ViewAssetModule,
    CreateAssetModule,TableHttpsModule
  ],
})
export class AssetDeskModule {}
