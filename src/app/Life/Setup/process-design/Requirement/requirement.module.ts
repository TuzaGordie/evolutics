import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ProcessDesignRequirementClaimCreateComponent } from './process-design-requirement-claim-create/process-design-requirement-claim-create.component';
import { ProcessDesignRequirementClaimIndexComponent } from './process-design-requirement-claim-index/process-design-requirement-claim-index.component';
import { ProcessDesignRequirementClaimShowComponent } from './process-design-requirement-claim-show/process-design-requirement-claim-show.component';
import { ProcessDesignRequirementNewBusinessCreateComponent } from './process-design-requirement-new-business-create/process-design-requirement-new-business-create.component';
import { ProcessDesignRequirementNewBusinessIndexComponent } from './process-design-requirement-new-business-index/process-design-requirement-new-business-index.component';
import { ProcessDesignRequirementNewBusinessShowComponent } from './process-design-requirement-new-business-show/process-design-requirement-new-business-show.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { EVFunctions } from 'src/app/configs/base-functions';
import { REQUIREMENT_REDIRECTING_ROUTES } from '../redirects';

const ROUTES: Route[] = [
  {
    path: 'claim',
    children: [
      {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full',
      },
      {
        path: 'index',
        component: ProcessDesignRequirementClaimIndexComponent,
        data: { title: 'Set Up / Process Design / Requirement / Claims' },
      },
      ...EVFunctions.extendRoute(
        {
          path: '',
          data: { title: 'Set Up / Process Design / Requirement / Claims' },
          component: ProcessDesignRequirementClaimCreateComponent,
        },
        ProcessDesignRequirementClaimIndexComponent
      ),
    ],
  },
  {
    path: 'new-business',
    children: [
      {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full',
      },
      {
        path: 'index',
        component: ProcessDesignRequirementNewBusinessIndexComponent,
        data: { title: 'Set Up / Process Design / Requirement / New Business' },
      },
      ...EVFunctions.extendRoute(
        {
          path: '',
          data: { title: 'Set Up / Process Design / Requirement / New Business' },
          component: ProcessDesignRequirementNewBusinessCreateComponent,
        },
        ProcessDesignRequirementNewBusinessIndexComponent
      ),
    ],
  },
  ...REQUIREMENT_REDIRECTING_ROUTES,
];

@NgModule({
  declarations: [
    ProcessDesignRequirementClaimCreateComponent,
    ProcessDesignRequirementClaimIndexComponent,
    ProcessDesignRequirementClaimShowComponent,
    ProcessDesignRequirementNewBusinessCreateComponent,
    ProcessDesignRequirementNewBusinessIndexComponent,
    ProcessDesignRequirementNewBusinessShowComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule,
    ComponentsModule,
  ],
})
export class RequirementModule {}
