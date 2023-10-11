import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { RouterModule } from '@angular/router';
import { IndexViewAssetComponent } from './index-view-asset/index-view-asset.component';
import { ViewAssetEndorsementComponent } from './view-asset-endorsement/view-asset-endorsement.component';
import { ViewAssetPartnersComponent } from './view-asset-partners/view-asset-partners.component';
import { ViewAssetPolicyRelComponent } from './view-asset-policy-rel/view-asset-policy-rel.component';
import { ViewAssetRiskinformationComponent } from './view-asset-riskinformation/view-asset-riskinformation.component';
import { ViewAssetTrackerComponent } from './view-asset-tracker/view-asset-tracker.component';
import { ViewAssetWorkflowsComponent } from './view-asset-workflows/view-asset-workflows.component';

const comps = [
  IndexViewAssetComponent,
  ViewAssetEndorsementComponent,
  ViewAssetPartnersComponent,
  ViewAssetPolicyRelComponent,
  ViewAssetRiskinformationComponent,
  ViewAssetTrackerComponent,
  ViewAssetWorkflowsComponent,
  ViewAssetTrackerComponent, 

];

@NgModule({
  declarations: comps,
  exports: comps,
  imports: [CommonModule, SharedModule, ComponentsModule, RouterModule],
})
export class ViewAssetModule {}
