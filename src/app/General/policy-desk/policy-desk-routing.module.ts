import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from 'src/app/configs/app-routes-configs/app-routes.config';
import { viewLifePolicyButtonsRoutes } from 'src/app/Life/policy-desk/policy-desk-routing.module';
import { ViewPolicyButttonNoOfAssetsGBComponent } from './buttons/view-policy-buttton-no-of-assets-gb/view-policy-buttton-no-of-assets-gb.component';
import { GeneralViewPolicyGBComponent } from './view-policy-gb/view-policy-gb.component';

const policyDeskRoutes: Routes = [
  {
    path: appRoutes.general.policy.find._,
    data: { title: 'Find Policy' },
    loadChildren: () =>
      import(
        '../../Life/policy-desk/policy-desk-pages/find-policy/find-policy.module'
      ).then((m) => m.FindPolicyModule),
  },
  {
    path: appRoutes.general.policy.overview._,
    data: { title: 'Policy Desk Overview' },
    loadChildren: () =>
      import(
        '../../Life/policy-desk/policy-desk-pages/policy-desk-overview/policy-desk-overview.module'
      ).then((m) => m.PolicyDeskOverviewModule),
  },
  {
    path: appRoutes.general.policy.spl._, 
    loadChildren: () =>
      import('../../Life/policy-desk/policy-desk-pages/search-policy-list/search-policy-list.module').then(m=>m.SearchPolicyListModule),
    data: { title: 'Find Policy / Search Policy' },
  },
  {
    path: 'view-policy',
    children: [
      {
        path: '',
        component: GeneralViewPolicyGBComponent,
        data: { title: 'View Policy' },
      },
      {
        path: ':number/:code/:suffix',
        component: GeneralViewPolicyGBComponent,
        data: { title: 'View Policy' },
      },
      {
        path: 'no-of-assets',
        component: ViewPolicyButttonNoOfAssetsGBComponent,
        data: { title: 'View Policy / No of Assets' },
      },...viewLifePolicyButtonsRoutes
    ] 
  },
]; 
// console.log('policyDeskRoutes',policyDeskRoutes)
@NgModule({
  imports: [RouterModule.forChild(policyDeskRoutes)],
  exports: [RouterModule],
})
export class PolicyDeskRoutingModule {}
