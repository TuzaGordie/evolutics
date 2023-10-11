import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnderwritingRequirementsIndexComponent } from './Underwriting/underwriting-requirements-index/underwriting-requirements-index.component';
import { UnderwritingRequirementsCreateComponent } from './Underwriting/underwriting-requirements-create/underwriting-requirements-create.component';
import { UnderwritingTableIndexComponent } from './Underwriting/underwriting-table-index/underwriting-table-index.component';
import { UnderwritingTableCreateComponent } from './Underwriting/underwriting-table-create/underwriting-table-create.component';
import { UnderwritingQuestionsIndexComponent } from './Underwriting/underwriting-questions-index/underwriting-questions-index.component';
import { UnderwritingQuestionsCreateComponent } from './Underwriting/underwriting-questions-create/underwriting-questions-create.component';
import { ProcessDesignRequirementClaimCreateComponent } from './Requirement/process-design-requirement-claim-create/process-design-requirement-claim-create.component';
import { ProcessDesignRequirementClaimIndexComponent } from './Requirement/process-design-requirement-claim-index/process-design-requirement-claim-index.component';
import { ProcessDesignRequirementClaimShowComponent } from './Requirement/process-design-requirement-claim-show/process-design-requirement-claim-show.component';
import { ProcessDesignRequirementNewBusinessShowComponent } from './Requirement/process-design-requirement-new-business-show/process-design-requirement-new-business-show.component';
import { ProcessDesignRequirementNewBusinessIndexComponent } from './Requirement/process-design-requirement-new-business-index/process-design-requirement-new-business-index.component';
import { ProcessDesignRequirementNewBusinessCreateComponent } from './Requirement/process-design-requirement-new-business-create/process-design-requirement-new-business-create.component';
import {
  PROCESS_ACTIONS_REDIRECTING_ROUTES,
  PROCESS_SETUP_REDIRECTING_ROUTES,
  REQUIREMENT_REDIRECTING_ROUTES,
} from './redirects';
import { UnderwritingLoadingsIndexComponent } from './Underwriting/underwriting-loadings-index/underwriting-loadings-index.component';
import { UnderwritingLoadingsCreateComponent } from './Underwriting/underwriting-loadings-create/underwriting-loadings-create.component';

export const lifeSetupPDRoutes: Routes = [
  {
    path: 'process-setup',
    loadChildren: () =>
      import('./process-setup/process-setup.module').then(
        (m) => m.ProcessSetupModule
      ),
  },
  ...PROCESS_SETUP_REDIRECTING_ROUTES,

  {
    path: 'index-control',
    redirectTo: 'control',
    pathMatch: 'full',
  },
  {
    path: 'control',
    loadChildren: () =>
      import('./control/control.module').then((m) => m.ControlModule),
  },

  {
    path: 'process-actions',
    loadChildren: () =>
      import('./process-actions/process-actions.module').then(
        (m) => m.ProcessActionsModule
      ),
  },
  ...PROCESS_ACTIONS_REDIRECTING_ROUTES,
  {
    path: 'status',
    loadChildren: () =>
      import('./status/status.module').then((m) => m.StatusModule),
  },
  {
    path: 'requirement',
    loadChildren: () =>
      import('./Requirement/requirement.module').then(
        (m) => m.RequirementModule
      ),
  },
  {
    path: 'underwriting',
    children: [
      {
        path: 'Requirements-index',
        component: UnderwritingRequirementsIndexComponent,
        data: { title: 'Process Design / Underwriting / Requirements' },
      },
      {
        path: 'Requirements-create',
        component: UnderwritingRequirementsCreateComponent,
        data: { title: 'Process Design / Underwriting / Requirements' },
      },
      {
        path: 'Requirements-index',
        component: UnderwritingRequirementsIndexComponent,
        data: { title: 'Process Design / Underwriting / Requirements' },
      },
      {
        path: 'Table-index',
        component: UnderwritingTableIndexComponent,
        data: { title: 'Process Design / Underwriting / Table' },
      },
      {
        path: 'Table-create',
        component: UnderwritingTableCreateComponent,
        data: { title: 'Process Design / Underwriting / Table' },
      },
      {
        path: 'Questions-index',
        component: UnderwritingQuestionsIndexComponent,
        data: { title: 'Process Design / Underwriting / Questions' },
      },
      {
        path: 'Questions-create',
        component: UnderwritingQuestionsCreateComponent,
        data: { title: 'Process Design / Underwriting / Questions' },
      },
      {
        path: 'loadings-index',
        component: UnderwritingLoadingsIndexComponent,
        data: { title: 'Process Design / Underwriting / Loadings' },
      },
      {
        path: 'loadings-create',
        component: UnderwritingLoadingsCreateComponent,
        data: { title: 'Process Design / Underwriting / Loadings' },
      },
    ],
  },

  {
    path: 'process-SLA',
    loadChildren: () => import('./SLA/sla.module').then((m) => m.SLAModule),
  },
];
lifeSetupPDRoutes
  .filter((x) => x.data?.title)
  .forEach((x) => (x.data.title = 'Set Up / Process Design / ' + x.data.title));

@NgModule({
  imports: [RouterModule.forChild(lifeSetupPDRoutes)],
  exports: [RouterModule],
})
export class ProcessDesignRoutingModule {}
