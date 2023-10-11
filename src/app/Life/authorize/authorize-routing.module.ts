import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from 'src/app/configs/app-routes-configs/app-routes.config';
import { AuthorizeComponent } from './authorize.component';

import { LifeAuthorizeClientAgentPolicyClientComponent } from './life-authorize-client-agent-policy-client/life-authorize-client-agent-policy-client.component';
import { LifeAuthorizeRatesComponent } from './life-authorize-rates/life-authorize-rates.component';
import { LifeAuthorizeSetupsComponent } from './life-authorize-setups/life-authorize-setups.component';
import { LifeAuthorizeUserComponent } from './life-authorize-user/life-authorize-user.component';
import { LifeAuthorizeWorkflowComponent } from './life-authorize-workflow/life-authorize-workflow.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorizeComponent,
    children: [
      {
        path: appRoutes.life.authorize.setups._,
        component: LifeAuthorizeSetupsComponent,
        data: { title: 'Authorize / Setups' },
      },
      {
        path: appRoutes.life.authorize.cap._,
        component: LifeAuthorizeClientAgentPolicyClientComponent,
        data: { title: 'Authorize / Client-Agent-Policy/Client' },
        children: [
          {
            path: appRoutes.life.authorize.cap.client._,
            component: LifeAuthorizeClientAgentPolicyClientComponent,
            data: { title: 'Authorize / Client-Agent-Policy/Client' },
          },
        ],
      },
      {
        path: appRoutes.life.authorize.workflow._,
        component: LifeAuthorizeWorkflowComponent,
        data: { title: 'Authorize / Workflow' },
      },
      {
        path: appRoutes.life.authorize.user._,
        component: LifeAuthorizeUserComponent,
        data: { title: 'Authorize / User' },
      },
      {
        path: appRoutes.life.authorize.rates._,
        component: LifeAuthorizeRatesComponent,
        data: { title: 'Authorize / Rates' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizeRoutingModule {}
