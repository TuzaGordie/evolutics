import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


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

export const lifeSetupOrgRoutes: Routes = [
  {
    path: 'index-individual-appraisal',
    data:{title:'Appraisal / Individual'},
    component: IndexIndividualAppraisalComponent,
  },
  {
    path: 'start-individual-appraisal',
    data:{title:'Appraisal / Individual'},
    component: StartIndividualAppraisalComponent,
  },
  {
    path: 'create-individual-appraisal',
    data:{title:'Appraisal / Individual'},
    component: CreateIndividualAppraisalComponent,
  },

  {
    path: 'index-team-appraisal',
    data:{title:'Appraisal / Team'},
    component: IndexTeamAppraisalComponent,
  },
  {
    path: 'start-team-appraisal',
    data:{title:'Appraisal / Team'},
    component: StartTeamAppraisalComponent,
  },
  {
    path: 'create-team-appraisal/:appraisalCode',
    data:{title:'Appraisal / Team'},
    component: CreateTeamAppraisalComponent,
  },

  {
    path: 'index-division-appraisal',
    data:{title:'Appraisal / Division'},
    component: IndexDivisionAppraisalComponent,
  },
  {
    path: 'start-division-appraisal',
    data:{title:'Appraisal / Division'},
    component: StartDivisionAppraisalComponent,
  },
  {
    path: 'create-division-appraisal/:appraisalCode',
    data:{title:'Appraisal / Division'},
    component: CreateDivisionAppraisalComponent,
  },

  {
    path: 'index-subdivision-appraisal',
    data:{title:'Appraisal / Sub-Division'},
    component: IndexSubDivisionAppraisalComponent,
  },
  {
    path: 'start-subdivision-appraisal',
    data:{title:'Appraisal / Sub-Division'},
    component: StartSubDivisionAppraisalComponent,
  },
  {
    path: 'create-subdivision-appraisal/:appraisalCode',
    data:{title:'Appraisal / Sub-Division'},
    component: CreateSubDivisionAppraisalComponent,
  },

  {
    path: 'index-criteria-appraisal',
    data:{title:'Appraisal / Criteria'},
    component: IndexCriteriaAppraisalComponent,
  },
  {
    path: 'start-criteria-appraisal',
    data:{title:'Appraisal / Criteria'},
    component: StartCriteriaAppraisalComponent,
  },
  {
    path: 'create-criteria-appraisal',
    data:{title:'Appraisal / Criteria'},
    component: CreateCriteriaAppraisalComponent,
  },

  {
    path: 'index-company-appraisal',
    data:{title:'Appraisal / Company'},
    component: IndexCompanyAppraisalComponent,
  },
  {
    path: 'start-company-appraisal',
    data:{title:'Appraisal / Company'},
    component: StartCompanyAppraisalComponent,
  },
  {
    path: 'create-company-appraisal/:appraisalCode',
    data:{title:'Appraisal / Company'},
    component: CreateCompanyAppraisalComponent,
  },

  {
    path: 'index-branches',
    data:{title:'Branches'},
    component: IndexBranchesOrgComponent,
  },
  {
    path: 'start-branches',data:{title:'Branches'},
    component: StartBranchesOrgComponent,
  },
  {
    path: 'create-branches',data:{title:'Branches'},
    component: CreateBranchesOrgComponent,
  },

  {
    path: 'index-company-org',data:{title:'Company'},
    component: IndexCompanyOrgComponent,
  },
  {
    path: 'start-company-org',data:{title:'Company'},
    component: StartCompanyOrgComponent,
  },
  {
    path: 'create-company-org',data:{title:'Company'},
    component: CreateCompanyOrgComponent,
  },
];
lifeSetupOrgRoutes.filter((x) => x.data?.title).forEach((x) => (x.data.title = 'Set Up / Organisation / ' + x.data.title));

@NgModule({
  imports: [RouterModule.forChild(lifeSetupOrgRoutes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule {}
