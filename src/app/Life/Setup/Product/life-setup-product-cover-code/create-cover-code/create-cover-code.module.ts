import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoverBasicComponent } from './cover-basic/cover-basic.component';
import { CoverBenefitComponent } from './cover-benefit/cover-benefit.component';
import { CoverDependantComponent } from './cover-dependant/cover-dependant.component';
import { CoverPremiumComponent } from './cover-premium/cover-premium.component';
import { CoverCommissionsComponent } from './cover-commissions/cover-commissions.component';
import { CoverTermsComponent } from './cover-terms/cover-terms.component';
import { CoverEndorsementsComponent } from './cover-endorsements/cover-endorsements.component';
import { CoverUnderwrittingComponent } from './cover-underwritting/cover-underwritting.component';
import { CoverSurrendersComponent } from './cover-surrenders/cover-surrenders.component';
import { CoverLoanComponent } from './cover-loan/cover-loan.component';
import { CoverPerilsComponent } from './cover-perils/cover-perils.component';
import { CoverAnnuitiesComponent } from './cover-annuities/cover-annuities.component';
import { CoverLapseComponent } from './cover-lapse/cover-lapse.component';
import { CoverPaidUpComponent } from './cover-paid-up/cover-paid-up.component';
import { CoverBonusesComponent } from './cover-bonuses/cover-bonuses.component';
import { CoverAccReinsComponent } from './cover-acc-reins/cover-acc-reins.component';
import { CoverTaxLevelsComponent } from './cover-tax-levels/cover-tax-levels.component';
import { CoverDocumentationsComponent } from './cover-documentations/cover-documentations.component';
import { CoverExcessDeductibleComponent } from './cover-excess-deductible/cover-excess-deductible.component';
import { CreateCoverCodeComponent } from './create-cover-code.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';

const comps = [
  CoverAccReinsComponent,
  CoverAnnuitiesComponent,
  CoverBasicComponent,
  CoverBenefitComponent,
  CoverBonusesComponent,
  CoverCommissionsComponent,
  CoverDependantComponent,
  CoverDocumentationsComponent,
  CoverEndorsementsComponent,
  CoverExcessDeductibleComponent,
  CoverLapseComponent,
  CoverLoanComponent,
  CoverPaidUpComponent,
  CoverPerilsComponent,
  CoverPremiumComponent,
  CoverSurrendersComponent,
  CoverTaxLevelsComponent,
  CoverTermsComponent,
  CoverUnderwrittingComponent,
  CreateCoverCodeComponent,
];
@NgModule({
  declarations: comps,
  imports: [CommonModule, SharedModule, MatTabsModule],
  exports: comps,
})
export class CreateCoverCodeModule {}
