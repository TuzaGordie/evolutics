import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyContentComponent } from './covers/property-content/property-content.component';
import { SavingsComponent } from './covers/savings/savings.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { MotorThirdPartyComponent } from './covers/motor-third-party/motor-third-party.component';
import { MotorAccessoriesComponent } from './covers/motor-accessories/motor-accessories.component';
import { LifeInsuranceComponent } from './covers/life-insurance/life-insurance.component';
import { DefenseRecourseComponent } from './covers/defense-recourse/defense-recourse.component';
import { BuildingComponent } from './covers/building/building.component';
import { NewAssetComponent } from './new-asset/new-asset.component';
import { MotorRiskQuestionnaireComponent } from './motor-risk-questionnaire/motor-risk-questionnaire.component';
import { MedicalQuestionnaireComponent } from './medical-questionnaire/medical-questionnaire.component';
import { BondComponent } from './covers/bond/bond.component';
import { MarineCargoComponent } from './covers/marine-cargo/marine-cargo.component';
import { MarineHullComponent } from './covers/marine-hull/marine-hull.component';
import { LifeRiskComponent } from './covers/life-risk/life-risk.component';
import { LifeCreditComponent } from './covers/life-credit/life-credit.component';
import { EndowmentComponent } from './covers/endowment/endowment.component';
import { LifeAnnuityComponent } from './covers/life-annuity/life-annuity.component';
import { IndividualSavingsComponent } from './covers/individual-savings/individual-savings.component';
import { AnnuitiesCertainComponent } from './covers/annuities-certain/annuities-certain.component';
import { SimpleLifeComponent } from './covers/simple-life/simple-life.component';
import { DeferredLifeAnnuityComponent } from './covers/deferred-life-annuity/deferred-life-annuity.component';

const comps = [
  BuildingComponent,
  DefenseRecourseComponent,
  LifeInsuranceComponent,
  MedicalQuestionnaireComponent,
  MotorAccessoriesComponent,
  MotorThirdPartyComponent,
  MotorRiskQuestionnaireComponent,
  NewAssetComponent,
  PropertyContentComponent,
  SavingsComponent,
  BondComponent,
  MarineCargoComponent,
  MarineHullComponent,
  LifeRiskComponent,
  LifeCreditComponent,
  EndowmentComponent,
  LifeAnnuityComponent,
  IndividualSavingsComponent,
  AnnuitiesCertainComponent,
  SimpleLifeComponent,
  DeferredLifeAnnuityComponent,
];
@NgModule({
  declarations: comps,
  exports: comps,
  imports: [CommonModule, SharedModule, ComponentsModule],
})
export class CreateNewIndividualQuotationGbModalsModule {}
