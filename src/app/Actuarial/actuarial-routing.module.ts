import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {appRoutes} from '../configs/app-routes-configs/app-routes.config';
import {FormLayoutComponent} from '../Layout/form-layout/form-layout.component';
import {ActuarialHomeComponent} from './actuarial-pages/actuarial-home/actuarial-home.component';
import {
  LiabilityLifeResultComponent
} from './actuarial-pages/actuarial-liability-life/liability-life-result/liability-life-result.component';
import {
  LiabilityLifeRunPageComponent
} from './actuarial-pages/actuarial-liability-life/liability-life-run-page/liability-life-run-page.component';
import {
  LiabilityLifeRunComponent
} from './actuarial-pages/actuarial-liability-life/liability-life-run/liability-life-run.component';
import {
  LiabilityLifeComponent
} from './actuarial-pages/actuarial-liability-life/liability-life/liability-life.component';
import {
  LifeParametersFormulaComponent
} from './actuarial-pages/actuarial-liability-life/life-parameters-formula/life-parameters-formula.component';
import {
  LifePolicyShowComponent
} from './actuarial-pages/actuarial-liability-life/life-policy-show/life-policy-show.component';
import {
  LifeProductEvaluationComponent
} from './actuarial-pages/actuarial-liability-life/life-product-evaluation/life-product-evaluation.component';
import {
  LifeShowProductComponent
} from './actuarial-pages/actuarial-liability-life/life-show-product/life-show-product.component';
import {
  LifeShowResultComponent
} from './actuarial-pages/actuarial-liability-life/life-show-result/life-show-result.component';
import {LifeComponent} from './actuarial-pages/actuarial-risk-desk/actuarial-risk-model/life/life.component';
import {LiabilityGeneralComponent} from './actuarial-pages/liability-general/liability-general.component';
import {LiabilityHealthComponent} from './actuarial-pages/liability-health/liability-health.component';
import {
  ActuarialLifeExpectancyComponent
} from "./actuarial-pages/actuarial-life-expectancy/actuarial-life-expectancy.component";
import {ActuarialListValuesComponent} from "./actuarial-pages/actuarial-list-values/actuarial-list-values.component";
import {
  ActuarialContractGroupingComponent
} from "./actuarial-pages/actuarial-contract-grouping/actuarial-contract-grouping.component";
import {
  ActuarialApproachMappingComponent
} from './actuarial-pages/actuarial-approach-mapping/actuarial-approach-mapping.component';
import {ActuarialDiscountComponent} from './actuarial-pages/actuarial-discount/actuarial-discount.component';
import {
  ActuarialRiskAdjustementComponent
} from "./actuarial-pages/actuarial-risk-adjustement/actuarial-risk-adjustement.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ActuarialHomeComponent,
  },
  {
    path: 'liability',
    children: [
      {
        path: 'life',
        component: LiabilityLifeComponent,
        data: {title: 'Actuarial / Liability / Life / Parameters'},
      },
      {
        path: 'life/parameters/formula',
        component: LifeParametersFormulaComponent,
        data: {title: 'Liability / Life / Parameters / Formula'},
      },
      {
        path: 'life/run',
        component: LiabilityLifeRunComponent,
        data: {title: 'Actuarial / Liability / Life / Run'},
      },
      {
        path: 'life/run/page',
        component: LiabilityLifeRunPageComponent,
        data: {title: 'Actuarial / Liability / Life / Run'},
      },
      {
        path: 'life/result',
        component: LiabilityLifeResultComponent,
        data: {title: 'Actuarial / Liability / Life / Result'},
      },
      {
        path: 'life/result/show/valuation',
        component: LifeShowResultComponent,
        data: {title: 'Liability / Life / Result / Result-Valuation'},
      },
      {
        path: 'life/result/show/valuation/:body/:data',
        component: LifeShowResultComponent,
        data: {title: 'Liability / Life / Result / Result-Valuation'},
      },
      {
        path: 'life/result/show/product/:body',
        component: LifeShowProductComponent,
        data: {title: 'Liability / Life / Result / Result-Product'},
      },
      {
        path: 'life/result/show/policy',
        component: LifePolicyShowComponent,
        data: {title: 'Liability / Life / Result / Result-Policy'},
      },
      {
        path: 'life/result/show/policy-product/:body',
        component: LifeProductEvaluationComponent,
        data: {title: 'Liability / Life / Result / Result-Evaluation'},
      },
      {
        path: 'general',
        component: LiabilityGeneralComponent,
        data: {title: 'Actuarial / Liability / General'},
      },
      {
        path: 'health',
        component: LiabilityHealthComponent,
        data: {title: 'Actuarial / Liability / Health'},
      },
    ],
  },
  {
    path: 'risk',
    children: [
      {
        path: 'prob/life',
        component: LifeComponent,
        data: {title: 'Actuarial / Risk / Life'},
      },
    ],
  },
  {
    path: 'setup',
    component: FormLayoutComponent,
    children: [
      {
        path: 'codes/life-expectancy',
        component: ActuarialLifeExpectancyComponent,
        data: {title: 'Setup / Codes / Life Expectancy'},
      },
      {
        path: 'ifrs/contract-grouping',
        component: ActuarialContractGroupingComponent,
        data: {title: 'Setup / IFRS / Contract Grouping'},
      },
      {
        path: 'ifrs/risk-adjustment',
        component: ActuarialRiskAdjustementComponent,
        data: {title: 'Setup / IFRS / Risk Adjustment'},
      },
      {
        path: 'ifrs/discount',
        component: ActuarialDiscountComponent,
        data: {title: 'Setup / IFRS / Discount'},
      },
      {
        path: 'ifrs/approach-mapping',
        component: ActuarialApproachMappingComponent,
        data: {title: 'Setup / IFRS / Approach Mapping'},
      },
      {
        path: 'codes/list-values',
        component: ActuarialListValuesComponent,
        data: {title: 'Setup / Codes / List Values'},
      },
    ],
  },
  {
    path: 'admin-desk',
    component: FormLayoutComponent,
    loadChildren: () =>
      import('src/app/Life/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'agent-desk',
    component: FormLayoutComponent,
    loadChildren: () =>
      import('src/app/Life/agent-desk/agent-desk.module').then(
        (m) => m.AgentDeskModule
      ),
  },
  {
    path: 'policy-desk',
    component: FormLayoutComponent,
    loadChildren: () =>
      import('src/app/Life/policy-desk/policy-desk.module').then(
        (m) => m.PolicyDeskModule
      ),
  },
  {
    path: 'client-desk',
    component: FormLayoutComponent,
    loadChildren: () =>
      import('src/app/Life/client-desk/client-desk.module').then(
        (m) => m.LifeClientDeskModule
      ),
  },
  {
    path: 'quotation',
    component: FormLayoutComponent,
    loadChildren: () =>
      import('src/app/Finance/finance-quotation/finance-quotation.module').then(
        (m) => m.FinanceQuotationModule
      ),
  },
  {
    path: 'report',
    component: FormLayoutComponent,
    loadChildren: () =>
      import('src/app/Life/Report/report.module').then((m) => m.ReportModule),
  },
  {
    path: appRoutes.life.setup._,
    component: FormLayoutComponent,
    loadChildren: () =>
      import('src/app/Life/Setup/setup.module').then((m) => m.SetupModule),
  },
  {
    path: 'workflow-desk',
    component: FormLayoutComponent,
    data: {title: 'WorkFlow'},
    loadChildren: () =>
      import('src/app/Life/Workflow/workflow.module').then(
        (m) => m.WorkflowModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActuarialRoutingModule {
}
