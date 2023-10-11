import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  lifeSetupOrgRoutes,
  OrganizationRoutingModule,
} from './organization-routing.module';

import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';
import {OrganizationMaterialDesignModule} from './organization.material.module';

import { CreateCompanyAppraisalComponent } from './appraisal/company-appraisal/create-company-appraisal/create-company-appraisal.component';
import { IndexCompanyAppraisalComponent } from './appraisal/company-appraisal/index-company-appraisal/index-company-appraisal.component';
import { StartCompanyAppraisalComponent } from './appraisal/company-appraisal/start-company-appraisal/start-company-appraisal.component';
import { CreateCriteriaAppraisalComponent } from './appraisal/criteria-appraisal/create-criteria-appraisal/create-criteria-appraisal.component';
import { IndexCriteriaAppraisalComponent } from './appraisal/criteria-appraisal/index-criteria-appraisal/index-criteria-appraisal.component';
import { StartCriteriaAppraisalComponent } from './appraisal/criteria-appraisal/start-criteria-appraisal/start-criteria-appraisal.component';
import { CreateDivisionAppraisalComponent } from './appraisal/division-appraisal/create-division-appraisal/create-division-appraisal.component';
import { IndexDivisionAppraisalComponent } from './appraisal/division-appraisal/index-division-appraisal/index-division-appraisal.component';
import { StartDivisionAppraisalComponent } from './appraisal/division-appraisal/start-division-appraisal/start-division-appraisal.component';
import { CreateIndividualAppraisalComponent } from './appraisal/individual-appraisal/create-individual-appraisal/create-individual-appraisal.component';
import { IndexIndividualAppraisalComponent } from './appraisal/individual-appraisal/index-individual-appraisal/index-individual-appraisal.component';
import { StartIndividualAppraisalComponent } from './appraisal/individual-appraisal/start-individual-appraisal/start-individual-appraisal.component';
import { CreateSubDivisionAppraisalComponent } from './appraisal/subdivision-appraisal/create-subdivision-appraisal/create-subdivision-appraisal.component';
import { IndexSubDivisionAppraisalComponent } from './appraisal/subdivision-appraisal/index-subdivision-appraisal/index-subdivision-appraisal.component';
import { StartSubDivisionAppraisalComponent } from './appraisal/subdivision-appraisal/start-subdivision-appraisal/start-subdivision-appraisal.component';
import { CreateTeamAppraisalComponent } from './appraisal/team-appraisal/create-team-appraisal/create-team-appraisal.component';
import { IndexTeamAppraisalComponent } from './appraisal/team-appraisal/index-team-appraisal/index-team-appraisal.component';
import { StartTeamAppraisalComponent } from './appraisal/team-appraisal/start-team-appraisal/start-team-appraisal.component';
import { CreateBranchesOrgComponent } from './branches/create-branches/create-branches.component';
import { IndexBranchesOrgComponent } from './branches/index-branches/index-branches.component';
import { StartBranchesOrgComponent } from './branches/start-branches/start-branches.component';
import { CreateCompanyOrgComponent } from './companies/create-company/create-company.component';
import { IndexCompanyOrgComponent } from './companies/index-company/index-company.component';
import { StartCompanyOrgComponent } from './companies/start-company/start-company.component';
import { CreateCompanyBasicFormComponent } from './companies/create-company/basic-form/create-company-basic-form.component';
import { TiersFormComponent } from './companies/create-company/tiers-form/tiers-form.component';
import { RatesFormComponent } from './companies/create-company/rates-form/rates-form.component';
import { FileLocationsFormComponent } from './companies/create-company/file-locations-form/file-locations-form.component';
import { EmailGatewayFormComponent } from './companies/create-company/email-gateway-form/email-gateway-form.component';
import { SmsGatewayFormComponent } from './companies/create-company/sms-gateway-form/sms-gateway-form.component';
import { AccountsFormComponent } from './companies/create-company/accounts-form/accounts-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [

    CreateCompanyAppraisalComponent,
    IndexCompanyAppraisalComponent,
    StartCompanyAppraisalComponent,
    CreateCriteriaAppraisalComponent,
    IndexCriteriaAppraisalComponent,
    StartCriteriaAppraisalComponent,
    CreateDivisionAppraisalComponent,
    IndexDivisionAppraisalComponent,
    StartDivisionAppraisalComponent,
    CreateIndividualAppraisalComponent,
    IndexIndividualAppraisalComponent,
    StartIndividualAppraisalComponent,
    CreateSubDivisionAppraisalComponent,
    IndexSubDivisionAppraisalComponent,
    StartSubDivisionAppraisalComponent,
    CreateTeamAppraisalComponent,
    IndexTeamAppraisalComponent,
    StartTeamAppraisalComponent,
    CreateBranchesOrgComponent,
    IndexBranchesOrgComponent,
    StartBranchesOrgComponent,
    CreateCompanyOrgComponent,
    IndexCompanyOrgComponent,
    StartCompanyOrgComponent,
    CreateCompanyBasicFormComponent,
    TiersFormComponent,
    RatesFormComponent,
    FileLocationsFormComponent,
    EmailGatewayFormComponent,
    SmsGatewayFormComponent,
    AccountsFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,ComponentsModule,
    OrganizationMaterialDesignModule,
    OrganizationRoutingModule,
    MatAutocompleteModule,
  ],
})
export class OrganizationModule {}
