import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from 'src/app/configs/app-routes-configs/app-routes.config';
import { IndexCreateAssetComponent } from './create-asset.old/index-create-asset/index-create-asset.component';
import { StartCreateAssetComponent } from './create-asset.old/start-create-asset/start-create-asset.component';
import { AssetSearchListComponent } from './find-asset/asset-search-list/asset-search-list.component';
import { IndexFindAssetComponent } from './find-asset/index-find-asset/index-find-asset.component';
import { OtherUploadAssetComponent } from './create-asset.old/other-upload-asset/other-upload-asset.component';
import { IndexViewAssetComponent } from './view-asset.old/index-view-asset/index-view-asset.component';
import { ViewAssetEndorsementComponent } from './view-asset.old/view-asset-endorsement/view-asset-endorsement.component';
import { ViewAssetPartnersComponent } from './view-asset.old/view-asset-partners/view-asset-partners.component';
import { ViewAssetRiskinformationComponent } from './view-asset.old/view-asset-riskinformation/view-asset-riskinformation.component';
import { ViewAssetTrackerComponent } from './view-asset.old/view-asset-tracker/view-asset-tracker.component';
import { ViewAssetWorkflowsComponent } from './view-asset.old/view-asset-workflows/view-asset-workflows.component';
import { PropAssetsComponent } from './prop-assets/prop-assets.component';
import { ERModule } from 'src/app/Reusables/reusable-extras/reusable.model';
import { WorkflowListComponent } from '../../Reusables/reusable-pages/workflow-list/workflow-list.component';
import { RelationshipsComponent } from '../../Life/client-desk/clientinfo-buttons/relationships/relationships.component';
import { ViewAssetPendingClaimsComponent } from './view-asset.old/view-asset-pending-claims/view-asset-pending-claims.component';
import { ViewAssetPolicyRelComponent } from './view-asset.old/view-asset-policy-rel/view-asset-policy-rel.component';
import { EPageType } from 'src/app/Shared/models/index.model';
import { ParameterGuard } from 'src/app/guards/index.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: appRoutes.general.asset.index._,
    pathMatch: 'full',
  },
  {
    path: appRoutes.general.asset.index._,
    data: { title: 'View Asset / View Asset' },
    component: IndexViewAssetComponent,
  },
  {
    path: appRoutes.general.asset.motor._,
    data: { title: 'View Motor Asset' },
    component: IndexViewAssetComponent,
  },
  {
    path: appRoutes.general.asset.property._,
    data: { title: 'View  Property Asset' },
    component: PropAssetsComponent,
  },
  {
    path: 'view',
    loadChildren: () =>
      import('../../General/asset-desk/view-asset/view-asset.module').then(
        (m) => m.ViewAssetModule
      ),
    data: { title: 'View Asset' },
  },
  {
    path: 'documents',
    loadChildren: () =>
      import(
        'src/app/Reusables/reusable-pages/document-list/document-list.module'
      ).then((m) => m.DocumentListModule),
    data: {
      title: 'View Asset / Documents',
      rModule: ERModule.asset,
    },
  },
  {
    path: 'endorsements',
    loadChildren: () =>
      import(
        'src/app/Reusables/reusable-pages/endorsement-list/endorsement-list.module'
      ).then((m) => m.EndorsementListModule),
    data: {
      title: 'View Asset / Endorsements',
      rModule: ERModule.asset,
    },
  },

  {
    path: 'create/:assetType',
    data: {
      title: 'Create New Asset',
      type: EPageType.createPage,
    },
    loadChildren: () =>
      import('../../General/asset-desk/create-asset/create-asset.module').then(
        (m) => m.CreateAssetModule
      ),
  },
  {
    path: 'edit/:assetType',
    data: {
      title: 'Edit Asset',
      type: EPageType.editPage,
    },
    loadChildren: () =>
      import('../../General/asset-desk/create-asset/create-asset.module').then(
        (m) => m.CreateAssetModule
      ),
  },
  {
    path: 'clone/:assetType',
    data: {
      title: 'Clone Asset',
      type: EPageType.clonePage,
    },
    loadChildren: () =>
      import('../../General/asset-desk/create-asset/create-asset.module').then(
        (m) => m.CreateAssetModule
      ),
  },
  {
    path: 'create',
    data: { title: 'Create New Asset' },
    loadChildren: () =>
      import(
        '../../General/asset-desk/create-asset-index/create-asset-index.module'
      ).then((m) => m.CreateAssetIndexModule),
  },

  {
    path: appRoutes.general.asset.create._,
    children: [
      {
        path: '',
        redirectTo: appRoutes.general.asset.index._,
        pathMatch: 'full',
      },
      {
        path: appRoutes.general.asset.index._,
        data: { title: 'Create New Asset' },
        component: IndexCreateAssetComponent,
      },
      {
        path: appRoutes.general.asset.start._,
        data: { title: 'Create New Asset' },
        component: StartCreateAssetComponent,
      },
      {
        path: 'other-upload',
        component: OtherUploadAssetComponent,
        data: { title: 'Create New Asset / Other Upload' },
      },
    ],
  },
  {
    path: appRoutes.general.asset.start._,
    data: { title: 'Create New Asset' },
    component: StartCreateAssetComponent,
  },

  {
    path: 'tracker',
    component: ViewAssetTrackerComponent,
    data: { title: 'View Asset / Tracker' },
  },
  {
    path: 'partners',
    component: ViewAssetPartnersComponent,
    data: { title: 'View Asset / Partners' },
  },
  {
    path: 'risk-info',
    component: ViewAssetRiskinformationComponent,
    data: { title: 'View Asset / Risk Info' },
  },
  {
    path: 'workflows',
    component: WorkflowListComponent,
    data: { title: 'View Asset / Workflows' },
  },
  {
    path: 'client-relationships',
    component: RelationshipsComponent,
    data: { title: 'View Asset / Client RelationShip' },
  },
  {
    path: 'pending-claims',
    component: ViewAssetPendingClaimsComponent,
    data: { title: 'View Asset / Pending Claims' },
  },
  {
    path: 'policy-rel',
    component: ViewAssetPolicyRelComponent,
    data: { title: 'View Asset / Policy Relationship' },
  },
  {
    path: 'endorsement',
    component: ViewAssetEndorsementComponent,
    data: {
      title: 'View Asset / Endorsements',
      rModule: ERModule.asset,
    },
  },

  {
    path: appRoutes.general.asset.find._,
    children: [
      {
        path: '',
        data: { title: 'Find Asset' },
        component: IndexFindAssetComponent,
      },
    ],
  },
  {
    path: 'search-list',
    data: { title: 'Asset Search List' },
    component: AssetSearchListComponent,
  },
  {
    path: 'view-asset',
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      {
        path: 'index',
        component: IndexViewAssetComponent,
        data: { title: 'View Asset' },
      },
      {
        path: 'tracker',
        component: ViewAssetTrackerComponent,
        data: { title: 'View Asset / Tracker' },
      },
      {
        path: 'partners',
        component: ViewAssetPartnersComponent,
        data: { title: 'View Asset / Partners' },
      },
      {
        path: 'risk-info',
        component: ViewAssetRiskinformationComponent,
        data: { title: 'View Asset / Risk Info' },
      },
      {
        path: 'workflows',
        component: ViewAssetWorkflowsComponent,
        data: { title: 'View Asset / Workflows' },
      },
      {
        path: 'endorsement',
        component: ViewAssetEndorsementComponent,
        data: {
          title: 'View Asset / Endorsements',
          rModule: ERModule.asset,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetDeskRoutingModule {}
