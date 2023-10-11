import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActuarialHomeComponent } from './actuarial-pages/actuarial-home/actuarial-home.component';
import { ChartLineComponent } from './actuarial-pages/actuarial-chart/chart-line/chart-line.component';
import { LiabilityLifeResultComponent } from './actuarial-pages/actuarial-liability-life/liability-life-result/liability-life-result.component';
import { LiabilityLifeRunPageComponent } from './actuarial-pages/actuarial-liability-life/liability-life-run-page/liability-life-run-page.component';
import { LiabilityLifeRunComponent } from './actuarial-pages/actuarial-liability-life/liability-life-run/liability-life-run.component';
import { LiabilityLifeComponent } from './actuarial-pages/actuarial-liability-life/liability-life/liability-life.component';
import { LifeParametersFormulaComponent } from './actuarial-pages/actuarial-liability-life/life-parameters-formula/life-parameters-formula.component';
import { LifePolicyShowComponent } from './actuarial-pages/actuarial-liability-life/life-policy-show/life-policy-show.component';
import { LifeProductEvaluationComponent } from './actuarial-pages/actuarial-liability-life/life-product-evaluation/life-product-evaluation.component';
import { LifeShowProductComponent } from './actuarial-pages/actuarial-liability-life/life-show-product/life-show-product.component';
import { LifeShowResultComponent } from './actuarial-pages/actuarial-liability-life/life-show-result/life-show-result.component';
import { LifeComponent } from './actuarial-pages/actuarial-risk-desk/actuarial-risk-model/life/life.component';
import { LiabilityGeneralComponent } from './actuarial-pages/liability-general/liability-general.component';
import { LiabilityHealthComponent } from './actuarial-pages/liability-health/liability-health.component';
import { ActuarialRoutingModule } from './actuarial-routing.module';
import { SharedModule } from '../Shared/shared.module';
import { ComponentsModule } from '../Shared/components/components.module';
import { ChartsModule } from 'ng2-charts';
import { ActuarialLifeExpectancyComponent } from './actuarial-pages/actuarial-life-expectancy/actuarial-life-expectancy.component';
import { ActuarialListValuesComponent } from './actuarial-pages/actuarial-list-values/actuarial-list-values.component';
import { ActuarialContractGroupingComponent } from './actuarial-pages/actuarial-contract-grouping/actuarial-contract-grouping.component';
import { ActuarialApproachMappingComponent } from './actuarial-pages/actuarial-approach-mapping/actuarial-approach-mapping.component';
import { ActuarialDiscountComponent } from './actuarial-pages/actuarial-discount/actuarial-discount.component';
import { ActuarialRiskAdjustementComponent } from './actuarial-pages/actuarial-risk-adjustement/actuarial-risk-adjustement.component';

@NgModule({
  declarations: [
    ActuarialHomeComponent,
    ChartLineComponent,
    LiabilityLifeResultComponent,
    LiabilityLifeRunPageComponent,
    LiabilityLifeRunComponent,
    LiabilityLifeComponent,
    LifeParametersFormulaComponent,
    LifePolicyShowComponent,
    LifeProductEvaluationComponent,
    LifeShowProductComponent,
    LifeShowResultComponent,
    LifeComponent,
    LiabilityGeneralComponent,
    LiabilityHealthComponent,
    ActuarialLifeExpectancyComponent,
    ActuarialListValuesComponent,
    ActuarialContractGroupingComponent,
    ActuarialApproachMappingComponent,
    ActuarialDiscountComponent,
    ActuarialRiskAdjustementComponent,
  ],
  imports: [CommonModule, ActuarialRoutingModule,SharedModule,ComponentsModule,ChartsModule],
})
export class ActuarialModule {}
