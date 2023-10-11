import {
  ViewProviderComponent
} from './crms-pages/Setup/codes/marketing-event-crm/view-provider/view-provider.component';

import {FindClientComponent} from './crms-pages/Sales/LeadCreate/index/find-client/find-client.component';
import {ClientSearchComponent} from 'src/app/Life/client-desk/client-search/client-search.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormLayoutComponent} from '../Layout/form-layout/form-layout.component';
import {ConfigurationComponent} from '../Life/admin/configuration/configuration.component';
import {
  CRMIndividualAgentIndexComponent
} from './crms-pages/agent-desk/crmindividual-agent-index/crmindividual-agent-index.component';
import {
  CRMSAgentSearchComponent
} from './crms-pages/agent-desk/find-agent/find-main-agent/agent-search/agent-search.component';
import {
  CRMSAgentDocumentsComponent
} from './crms-pages/agent-desk/find-agent/find-main-agent/agentinfo-button/agent-documents/agent-documents.component';
import {
  CRMSAgentEndorsementsComponent
} from './crms-pages/agent-desk/find-agent/find-main-agent/agentinfo-button/agent-endorsements/agent-endorsements.component';
import {
  CRMSAgentLoanComponent
} from './crms-pages/agent-desk/find-agent/find-main-agent/agentinfo-button/agent-loan/agent-loan.component';
import {
  CRMSAgentWebLoginComponent
} from './crms-pages/agent-desk/find-agent/find-main-agent/agentinfo-button/agent-web-login/agent-web-login.component';
import {
  CRMSAgentWorkflowsComponent
} from './crms-pages/agent-desk/find-agent/find-main-agent/agentinfo-button/agent-workflows/agent-workflows.component';
import {CRMSAgentnoteComponent} from './crms-pages/agent-desk/find-agent/find-main-agent/agentnote/agentnote.component';
import {CRMSFindMainAgentComponent} from './crms-pages/agent-desk/find-agent/find-main-agent/find-main-agent.component';
import {
  CRMAgentCreditNoteBalanceComponent
} from './crms-pages/agent-desk/find-agent/find-main-agent/view-agent/crmagent-credit-note-balance/crmagent-credit-note-balance.component';
import {
  CrmagentViewAgentLoanComponent
} from './crms-pages/agent-desk/find-agent/find-main-agent/view-agent/crmagent-view-agent-loan/crmagent-view-agent-loan.component';
import {
  CRMAgentViewDocumentComponent
} from './crms-pages/agent-desk/find-agent/find-main-agent/view-agent/crmagent-view-document/crmagent-view-document.component';
import {
  CRMAgentViewEndorsmentComponent
} from './crms-pages/agent-desk/find-agent/find-main-agent/view-agent/crmagent-view-endorsment/crmagent-view-endorsment.component';
import {
  CRMAgentViewNoOfPoliciesComponent
} from './crms-pages/agent-desk/find-agent/find-main-agent/view-agent/crmagent-view-no-of-policies/crmagent-view-no-of-policies.component';
import {
  CRMAgentViewTotalCommissionPaidComponent
} from './crms-pages/agent-desk/find-agent/find-main-agent/view-agent/crmagent-view-total-commission-paid/crmagent-view-total-commission-paid.component';
import {
  CRMAgentViewTotalProductionComponent
} from './crms-pages/agent-desk/find-agent/find-main-agent/view-agent/crmagent-view-total-production/crmagent-view-total-production.component';
import {
  CRMAgentViewWebLoginComponent
} from './crms-pages/agent-desk/find-agent/find-main-agent/view-agent/crmagent-view-web-login/crmagent-view-web-login.component';
import {
  CRMAgentViewWorkflowsComponent
} from './crms-pages/agent-desk/find-agent/find-main-agent/view-agent/crmagent-view-workflows/crmagent-view-workflows.component';
import {
  CRMSViewAgentComponent
} from './crms-pages/agent-desk/find-agent/find-main-agent/view-agent/view-agent.component';
import {
  CRMSCorporateClientComponent
} from './crms-pages/agent-desk/new-corporate-agent/corporate-client/corporate-client.component';
import {
  CreateCorporateAgentIndexComponent
} from './crms-pages/agent-desk/new-corporate-agent/create-corporate-agent-index/create-corporate-agent-index.component';
import {
  CRMSNewCorporateAgentComponent
} from './crms-pages/agent-desk/new-corporate-agent/new-corporate-agent.component';
import {
  CRMSNewIndividualAgentComponent
} from './crms-pages/agent-desk/new-individual-agent/new-individual-agent.component';
import {
  CRMAnalyticsCampaignDetailsComponent
} from './crms-pages/Analytics/crmanalytics-campaign-details/crmanalytics-campaign-details.component';
import {
  CRMAnalyticsCampaignIndexComponent
} from './crms-pages/Analytics/crmanalytics-campaign-index/crmanalytics-campaign-index.component';
import {CustomerExplorerIndexComponent} from './crms-pages/Analytics/customer-explorer/index/index.component';
import {PipelineIndexComponent} from './crms-pages/Analytics/pipeline-analysis/index/index.component';
import {SalesActivitiesIndexComponent} from './crms-pages/Analytics/sales-activities/index/index.component';
import {
  LeadConversionRateComponent
} from './crms-pages/Analytics/sales-activities/lead-conversion-rate/lead-conversion-rate.component';
import {
  LeadOpportunityRateComponent
} from './crms-pages/Analytics/sales-activities/lead-opportunity-rate/lead-opportunity-rate.component';
import {
  OpportunityToWinRatioComponent
} from './crms-pages/Analytics/sales-activities/opportunity-to-win-ratio/opportunity-to-win-ratio.component';
import {
  SalesConversionReportComponent
} from './crms-pages/Analytics/sales-activities/sales-conversion-report/sales-conversion-report.component';
import {
  SalesCycleReportComponent
} from './crms-pages/Analytics/sales-activities/sales-cycle-report/sales-cycle-report.component';
import {SalesReportComponent} from './crms-pages/Analytics/sales-activities/sales-report/sales-report.component';
import {
  SalesSettledTransactionComponent
} from './crms-pages/Analytics/sales-activities/sales-settled-transaction/sales-settled-transaction.component';
import {WriteReportIndexComponent} from './crms-pages/Analytics/write-report/index/index.component';
import {WriteReportStartComponent} from './crms-pages/Analytics/write-report/start/start.component';
import {
  ClientCRMSOverviewComponent
} from './crms-pages/client-desk/client-crms-overview/client-crms-overview.component';
import {
  CRMSCreateNewProviderComponent
} from './crms-pages/client-desk/client-provider/client-provider-create/client-provider-create.component';
import {
  CRMSClientProviderIndexComponent
} from './crms-pages/client-desk/client-provider/client-provider-index/client-provider-index.component';
import {CRMSClientSearchComponent} from './crms-pages/client-desk/client-search/client-search.component';
import {CRMSBusinessComponent} from './crms-pages/client-desk/clientinfo-buttons/business/business.component';
import {CRMSDocumentsComponent} from './crms-pages/client-desk/clientinfo-buttons/documents/documents.component';
import {
  CRMSEndorsementsComponent
} from './crms-pages/client-desk/clientinfo-buttons/endorsements/endorsements.component';
import {
  CRMSPendingPaymentsComponent
} from './crms-pages/client-desk/clientinfo-buttons/pending-payments/pending-payments.component';
import {
  CRMSPendingQuotesComponent
} from './crms-pages/client-desk/clientinfo-buttons/pending-quotes/pending-quotes.component';
import {CRMSPoliciesComponent} from './crms-pages/client-desk/clientinfo-buttons/policies/policies.component';
import {
  CRMSRelationshipsComponent
} from './crms-pages/client-desk/clientinfo-buttons/relationships/relationships.component';
import {
  CRMSUnderwritingEventsComponent
} from './crms-pages/client-desk/clientinfo-buttons/underwriting-events/underwriting-events.component';
import {CRMSWebLoginComponent} from './crms-pages/client-desk/clientinfo-buttons/web-login/web-login.component';
import {CRMSWorkflowsComponent} from './crms-pages/client-desk/clientinfo-buttons/workflows/workflows.component';
import {CRMSClientnoteComponent} from './crms-pages/client-desk/clientnote/clientnote.component';
import {CRMSFindClientComponent} from './crms-pages/client-desk/find-client/c-r-m-s-find-client.component';
import {CRMSCommonComponent} from './crms-pages/client-desk/form/common/common.component';
import {CRMSAllformsComponent} from './crms-pages/client-desk/form2/allforms/crm-allforms.component';
import {CRMSViewClientComponent} from './crms-pages/client-desk/view-client/c-r-m-s-view-client.component';
import {OverviewCreateComponent} from './crms-pages/Clients/overview-create/overview-create.component';
import {OverviewIndexComponent} from './crms-pages/Clients/overview-index/overview-index.component';
import {OverviewShowComponent} from './crms-pages/Clients/overview-show/overview-show.component';
import {CampaignCreateComponent} from './crms-pages/communication/campaign-create/campaign-create.component';
import {FindCampaignComponent} from './crms-pages/communication/find-campaign/find-campaign.component';
import {FoundCampaignComponent} from './crms-pages/communication/find-campaign/found-campaign/found-campaign.component';
import {CRMHomeComponent} from './crms-pages/crmhome/crmhome.component';
import {FindLeadCreateComponent} from './crms-pages/Sales/FindLead/create/create.component';
import {FindLeadShowComponent} from './crms-pages/Sales/FindLead/show/show.component';
import {ViewLeadComponent} from './crms-pages/Sales/FindLead/view-lead/view-lead.component';
import {LeadCreateIndexComponent} from './crms-pages/Sales/LeadCreate/index/index.component';
import {SearchClientComponent} from './crms-pages/Sales/LeadCreate/index/search-client/search-client.component';
import {QuotationsIndexComponent} from './crms-pages/Sales/Quotations/index/index.component';
import {BandsCreateComponent} from './crms-pages/Setup/Bands/create/create.component';
import {BandsIndexComponent} from './crms-pages/Setup/Bands/index/index.component';
import {BandsShowComponent} from './crms-pages/Setup/Bands/show/show.component';
import {ClientgroupCreateComponent} from './crms-pages/Setup/Clientgroup/create/create.component';
import {ClientgroupIndexComponent} from './crms-pages/Setup/Clientgroup/index/index.component';
import {ClientgroupShowComponent} from './crms-pages/Setup/Clientgroup/show/show.component';
import {CLVCreateComponent} from './crms-pages/Setup/Clv/clv-create/clv-create.component';
import {CLVIndexComponent} from './crms-pages/Setup/Clv/clv-index/clv-index.component';
import {CLVShowComponent} from './crms-pages/Setup/Clv/clv-show/clv-show.component';
import {ClientStageCRMComponent} from './crms-pages/Setup/codes/client-stage-crm/client-stage-crm.component';
import {
  LeadClassificationCRMComponent
} from './crms-pages/Setup/codes/lead-classification-crm/lead-classification-crm.component';
import {MarketingEventCRMComponent} from './crms-pages/Setup/codes/marketing-event-crm/marketing-event-crm.component';
import {
  CRMCorrespondenceEmailCreateComponent
} from './crms-pages/Setup/correspondence/crmcorrespondence-email-create/crmcorrespondence-email-create.component';
import {
  CRMCorrespondenceEmailIndexComponent
} from './crms-pages/Setup/correspondence/crmcorrespondence-email-index/crmcorrespondence-email-index.component';
import {
  CRMCorrespondencePrintCreateComponent
} from './crms-pages/Setup/correspondence/crmcorrespondence-print-create/crmcorrespondence-print-create.component';
import {
  CRMCorrespondencePrintIndexComponent
} from './crms-pages/Setup/correspondence/crmcorrespondence-print-index/crmcorrespondence-print-index.component';
import {
  CRMCorrespondenceQuotationCreateComponent
} from './crms-pages/Setup/correspondence/crmcorrespondence-quotation-create/crmcorrespondence-quotation-create.component';
import {
  CRMCorrespondenceQuotationIndexComponent
} from './crms-pages/Setup/correspondence/crmcorrespondence-quotation-index/crmcorrespondence-quotation-index.component';
import {
  CRMCorrespondenceSMSCreateComponent
} from './crms-pages/Setup/correspondence/crmcorrespondence-smscreate/crmcorrespondence-smscreate.component';
import {
  CRMCorrespondenceSMSIndexComponent
} from './crms-pages/Setup/correspondence/crmcorrespondence-smsindex/crmcorrespondence-smsindex.component';
import {
  CRMCorrespondenceTemplateCreateComponent
} from './crms-pages/Setup/correspondence/crmcorrespondence-template-create/crmcorrespondence-template-create.component';
import {
  CRMCorrespondenceTemplateIndexComponent
} from './crms-pages/Setup/correspondence/crmcorrespondence-template-index/crmcorrespondence-template-index.component';
import {
  CRMCorrespondenceWebhookCreateComponent
} from './crms-pages/Setup/correspondence/crmcorrespondence-webhook-create/crmcorrespondence-webhook-create.component';
import {
  CRMCorrespondenceWebhookIndexComponent
} from './crms-pages/Setup/correspondence/crmcorrespondence-webhook-index/crmcorrespondence-webhook-index.component';
import {LifecycleCreateComponent} from './crms-pages/Setup/Lifecycle/lifecycle-create/create.component';
import {LifecycleIndexComponent} from './crms-pages/Setup/Lifecycle/lifecycle-index/index.component';
import {LifecycleShowComponent} from './crms-pages/Setup/Lifecycle/lifecycle-show/show.component';
import {ParametersCreateComponent} from './crms-pages/Setup/Parameters/create/create.component';
import {ParametersIndexComponent} from './crms-pages/Setup/Parameters/index/index.component';
import {ParametersShowComponent} from './crms-pages/Setup/Parameters/show/show.component';
import {ParametersStartComponent} from './crms-pages/Setup/Parameters/start/start.component';
import {
  CRMSCreateSetupsTaskSetupComponent
} from './crms-pages/Setup/task-setup/create-task-setup/create-task-setup.component';
import {
  CRMSIndexSetupsTaskSetupComponent
} from './crms-pages/Setup/task-setup/index-task-setup/index-task-setup.component';
import {
  CRMSStartSetupsTaskSetupComponent
} from './crms-pages/Setup/task-setup/start-task-setup/start-task-setup.component';
import {CRMSadminuserComponent} from './crms-pages/user/adminuser/lifeadminuser.component';
import {CRMSadminusergroupComponent} from './crms-pages/user/adminusergroup/lifeadminusergroup.component';
import {CRMSConfigurationComponent} from './crms-pages/user/configuration/configuration.component';
import {CRMSRequisitionComponent} from './crms-pages/user/requisition/requisition.component';
import {
  ClientCodeAgeGroupCRMComponent
} from './crms-pages/Setup/codes/client-code-age-group-crm/client-code-age-group-crm.component';
import {
  ClientCodeAgeGroupShowCRMComponent
} from './crms-pages/Setup/codes/client-code-age-group-show-crm/client-code-age-group-show-crm.component';
import {AgentnoteComponent} from '../Life/agent-desk/find-agent/find-main-agent/agentnote/agentnote.component';
import {RelationshipsComponent} from '../Life/client-desk/clientinfo-buttons/relationships/relationships.component';
import {ERModule} from '../Reusables/reusable-extras/reusable.model';
import {PoliciesComponent} from '../Life/client-desk/clientinfo-buttons/policies/policies.component';
import {TeamsCrmComponent} from './crms-pages/Setup/codes/teams-crm/teams-crm.component';
import {
  MarketingEventIndexCRMComponent
} from './crms-pages/Setup/codes/marketing-event-index-crm/marketing-event-index-crm.component';
import {TeamsIndexCrmComponent} from './crms-pages/Setup/codes/teams-index-crm/teams-index-crm.component';
import {
  LeadClassificationIndexCrmComponent
} from './crms-pages/Setup/codes/lead-classification-index-crm/lead-classification-index-crm.component';
import {
  ClientStageIndexCrmComponent
} from './crms-pages/Setup/codes/client-stage-index-crm/client-stage-index-crm.component';
import {
  ClientDataScoreIndexComponent
} from './crms-pages/Setup/codes/client-data-score-index/client-data-score-index.component';
import {ViewClientNewComponent} from '../CRM/client-desk/view-client-new/view-client-new.component';
import {ClientDataScoreComponent} from './crms-pages/Setup/codes/client-data-score/client-data-score.component';
import {
  FindProviderComponent
} from './crms-pages/Setup/codes/marketing-event-crm/find-provider/find-provider.component';
import {ResourcesTestIndexComponent} from "./crms-pages/Setup/resources-test-index/resources-test-index.component";
import {
  ResourcesTrainingIndexComponent
} from "./crms-pages/Setup/resources-training-index/resources-training-index.component";
import {ResourcesTestCreateComponent} from "./crms-pages/Setup/resources-test-create/resources-test-create.component";
import {
  ResourcesTrainingCreateComponent
} from "./crms-pages/Setup/resources-training-create/resources-training-create.component";
import {
  SalesResourcesTestIndexComponent
} from "./crms-pages/Sales/sales-resources-test-index/sales-resources-test-index.component";
import {
  SalesResourcesTestCreateComponent
} from "./crms-pages/Sales/sales-resources-test-create/sales-resources-test-create.component";
import {
  SalesResourcesTrainingIndexComponent
} from "./crms-pages/Sales/sales-resources-training-index/sales-resources-training-index.component";
import {
  SalesResourcesTrainingCreateComponent
} from "./crms-pages/Sales/sales-resources-training-create/sales-resources-training-create.component";
import { CreateIndexComponent } from './crms-pages/Sales/LeadCreate/create-index/create-index.component';
import {
  CampaignTargetComponent
} from "./crms-pages/communication/find-campaign/found-campaign/campaign-target/campaign-target.component";
import {
  ExclusionListComponent
} from "./crms-pages/communication/find-campaign/found-campaign/exclusion-list/exclusion-list.component";
import {
  TargetListComponent
} from "./crms-pages/communication/find-campaign/found-campaign/target-list/target-list.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CRMHomeComponent,
    data: { title: 'SetUp / Segments' },
  },
  {
    path: 'admin-desk',
    component: FormLayoutComponent,
    loadChildren: () =>
      import('./crms-pages/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'admin-desk',
    component: FormLayoutComponent,
    loadChildren: () =>
      import('src/app/Life/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'overview',
    component: OverviewIndexComponent,
    data: { title: 'SetUp / Segments' },
  },

  {
    path: 'overview/create',
    component: OverviewCreateComponent,
    data: { title: 'SetUp / Segments' },
  },
  {
    path: 'overview/show',
    component: OverviewShowComponent,
    data: { title: 'CRM / Overview' },
  },
  {
    path: 'setup',
    component: FormLayoutComponent,
    children: [
      {
        path: 'correspondence',
        loadChildren: () =>
          import(
            'src/app/Life/Setup/correspondence/correspondence.module'
          ).then((m) => m.CorrespondenceModule),
      },

      {
        path: 'resources/test/index',
        component: ResourcesTestIndexComponent,
        data: { title: 'Setup / Resources / Test' },
      },
      {
        path: 'resources/test/create',
        component: ResourcesTestCreateComponent,
        data: { title: 'Setup / Resources / Test' },
      },
      {
        path: 'resources/training/index',
        component: ResourcesTrainingIndexComponent,
        data: { title: 'Setup / Resources / Training' },
      },
      {
        path: 'resources/training/create',
        component: ResourcesTrainingCreateComponent,
        data: { title: 'Setup / Resources / Training' },
      },
    ],
  },
  {
    path: 'agent-desk',
    component: FormLayoutComponent,
    children: [
      { path: '', redirectTo: 'find-main-agent', pathMatch: 'full' },

      {
        path: 'agent-search',
        component: CRMSAgentSearchComponent,
        data: { title: 'Agent Desk / Search Agent' },
      },
      {
        path: 'view-agent',
        component: CRMSViewAgentComponent,
        data: { title: 'Agent Desk / View Agent' },
      },
      {
        path: 'view-agent-endorsement',
        component: CRMAgentViewEndorsmentComponent,
        data: { title: 'Agent Desk / Endorsement' },
      },
      {
        path: 'view-agent-document',
        component: CRMAgentViewDocumentComponent,
        data: { title: 'Agent Desk / Document' },
      },
      {
        path: 'view-agent-weblogin',
        component: CRMAgentViewWebLoginComponent,
        data: { title: 'Agent Desk / Web Login' },
      },
      {
        path: 'view-agent-underwriting-event',
        component: CrmagentViewAgentLoanComponent,
        data: { title: 'Agent Desk / Agent Loan' },
      },
      {
        path: 'view-agent-workflows',
        component: CRMAgentViewWorkflowsComponent,
        data: { title: 'Agent Desk / Workflows' },
      },
      {
        path: 'view-agent-no-of-policies',
        component: CRMAgentViewNoOfPoliciesComponent,
        data: { title: 'Agent Desk / No Of Policies' },
      },
      {
        path: 'view-agent-total-commission-paid',
        component: CRMAgentViewTotalCommissionPaidComponent,
        data: { title: 'Agent Desk / Total Commission Paid' },
      },
      {
        path: 'view-agent-total-production',
        component: CRMAgentViewTotalProductionComponent,
        data: { title: 'Agent Desk / Total Production ' },
      },
      {
        path: 'view-agent-credit-note-balance',
        component: CRMAgentCreditNoteBalanceComponent,
        data: { title: 'Agent Desk / Credit Note Balance ' },
      },
      {
        path: 'agent-endorsements',
        component: CRMSAgentEndorsementsComponent,
        data: { title: 'Agent Desk / Agent Endorsement' },
      },
      {
        path: 'individual-agent',
        component: CRMSNewIndividualAgentComponent,
        data: { title: 'Agent Desk / Individual Agent' },
      },
      {
        path: 'agent-documents',
        component: CRMSAgentDocumentsComponent,
        data: { title: 'Agent Desk / Agent Document' },
      },
      {
        path: 'agent-workflows',
        component: CRMSAgentWorkflowsComponent,
        data: { title: 'Agent Desk / Agent Workflows' },
      },
      {
        path: 'agent-web-login',
        component: CRMSAgentWebLoginComponent,
        data: { title: 'Agent Desk / Agent Web-login' },
      },
      {
        path: 'agent-loan',
        component: CRMSAgentLoanComponent,
        data: { title: 'Agent Desk / Agent Loan' },
      },
      {
        path: 'agent-note',
        component: CRMSAgentnoteComponent,
        data: { title: 'Agent Desk / Agent Note' },
      },
      {
        path: 'find-main-agent',
        component: CRMSFindMainAgentComponent,
        data: { title: 'Agent Desk / Find Main Agent' },
      },
      {
        path: 'create-agent',
        component: CRMIndividualAgentIndexComponent,
        data: { title: 'Agent Desk / Create Individual Agent' },
      },
      {
        path: 'create-individual-agent',
        component: CRMSNewIndividualAgentComponent,
        data: { title: 'Agent Desk / Create Individual Agent' },
      },
      {
        path: 'create-corporate-agent',
        component: CreateCorporateAgentIndexComponent,
        data: { title: 'Agent Desk / Create Corporate Agent' },
      },
      {
        path: 'create-new-corporate-agent',
        component: CRMSNewCorporateAgentComponent,
        data: { title: 'Agent Desk / Create Corporate Agent' },
      },
    ],
  },

  {
    path: 'agent-desk',
    component: FormLayoutComponent,
    loadChildren: () =>
      import('../Life/agent-desk/agent-desk.module').then(
        (m) => m.AgentDeskModule
      ),
  },
  {
    path: 'find-client',
    component: CRMSFindClientComponent,
    data: { title: 'Find Client' },
  },
  {
    path: 'view-client',
    // path: 'view-client/:id',
    component: ViewClientNewComponent,
    data: { title: 'View Client' },
  },
  {
    path: 'view-client-old',
    // path: 'view-client/:id',
    component: CRMSViewClientComponent,
    data: { title: 'View Client' },
  },
  {
    path: 'common',
    component: CRMSCommonComponent,
  },
  {
    path: 'allform',
    component: CRMSAllformsComponent,
  },
  {
    path: 'corporate-client',
    component: CRMSCorporateClientComponent,
  },
  {
    path: 'client-search',
    component: CRMSClientSearchComponent,
  },

  {
    path: 'index-client-provider',
    component: CRMSClientProviderIndexComponent,
  },

  {
    path: 'create-client-provider',
    component: CRMSCreateNewProviderComponent,
  },

  {
    path: 'client-crms-overview',
    component: ClientCRMSOverviewComponent,
  },

  {
    path: 'endorsements',
    component: CRMSEndorsementsComponent,
  },
  {
    path: 'documents',
    component: CRMSDocumentsComponent,
  },
  {
    path: 'workflows',
    component: CRMSWorkflowsComponent,
  },
  {
    path: 'web-login',
    component: CRMSWebLoginComponent,
  },
  {
    path: 'underwritingevents',
    component: CRMSUnderwritingEventsComponent,
  },
  {
    path: 'policies',
    component: CRMSPoliciesComponent,
  },
  {
    path: 'relationships',
    component: CRMSRelationshipsComponent,
  },
  {
    path: 'business',
    component: CRMSBusinessComponent,
  },
  {
    path: 'pendingquotes',
    component: CRMSPendingQuotesComponent,
  },
  {
    path: 'pendingpayments',
    component: CRMSPendingPaymentsComponent,
  },
  {
    path: 'clientnote',
    component: CRMSClientnoteComponent,
  },
  {
    path: 'individual',
    component: CRMSAllformsComponent,
    data: { title: 'Create New Individual Client' },
  },
  {
    path: 'corporate',
    component: CRMSCommonComponent,
    data: { title: 'Client Desk / Create Corporate Client' },
  },
  {
    path: 'find-campaign',
    component: FindCampaignComponent,
    data: { title: 'Find Campaign' },
  },
  {
    path: 'found-campaign',
    component: FoundCampaignComponent,
    data: { title: 'Communication / Find Campaign' },
  },
  {
    path: 'campaign-create',
    component: CampaignCreateComponent,
    data: { title: 'Communication / Create New Campaign' },
  },
  {
    path: 'analytics-campaign-index',
    component: CRMAnalyticsCampaignIndexComponent,
    data: { title: 'Communication / Calendar' },
  },
  {
    path: 'analytics-campaign-details',
    component: CRMAnalyticsCampaignDetailsComponent,
    data: { title: 'Analytics / Campaign' },
  },
  {
    path: 'clv',
    component: CLVIndexComponent,
    data: { title: 'Setups / Client CLV Grouping' },
  },
  {
    path: 'clv/create',
    component: CLVCreateComponent,
    data: { title: 'Setups / Client CLV Grouping' },
  },
  {
    path: 'clv/show',
    component: CLVShowComponent,
    data: { title: 'Setups / Client CLV Grouping' },
  },
  {
    path: 'lifecycle',
    component: LifecycleIndexComponent,
    data: { title: 'Setups / Client LifeCycle' },
  },
  {
    path: 'lifecycle/create',
    component: LifecycleCreateComponent,
    data: { title: 'Setups / Client LifeCycle' },
  },
  {
    path: 'lifecycle/show',
    component: LifecycleShowComponent,
    data: { title: 'Setups /  Client LifeCycle' },
  },
  {
    path: 'bands',
    component: BandsIndexComponent,
    data: { title: 'Setups / Client Band' },
  },
  {
    path: 'bands/create',
    component: BandsCreateComponent,
    data: { title: 'Setups / Client Band' },
  },
  {
    path: 'bands/show',
    component: BandsShowComponent,
    data: { title: 'Setups / Client Band' },
  },
  {
    path: 'client-group',
    component: ClientgroupIndexComponent,
    data: { title: 'Setups / Client Group' },
  },
  {
    path: 'client-group/create',
    component: ClientgroupCreateComponent,
    data: { title: 'Setups / Client Group' },
  },
  {
    path: 'client-group/show',
    component: ClientgroupShowComponent,
    data: { title: 'Setups / Client Group' },
  },
  {
    path: 'parameters',
    component: ParametersIndexComponent,
    data: { title: 'Setup / Parameters' },
  },
  {
    path: 'parameters/create',
    component: ParametersCreateComponent,
    data: { title: 'Setup / Parameters' },
  },
  {
    path: 'parameters/start',
    component: ParametersStartComponent,
    data: { title: 'Setup / Parameters' },
  },
  {
    path: 'parameters/show',
    component: ParametersShowComponent,
    data: { title: 'Setups / Parameter' },
  },

  {
    path: 'setup',
    component: FormLayoutComponent,
    children: [
      {
        path: 'codes/teams',
        component: TeamsCrmComponent,
        data: { title: 'Setup / Code / Teams' },
      },
      {
        path: 'codes/teams-index',
        component: TeamsIndexCrmComponent,
        data: { title: 'Setup / Code / Teams' },
      },
    ],
  },
  {
    path: 'sales',
    component: FormLayoutComponent,
    children: [
      {
        path: 'note',
        component: AgentnoteComponent,
        data: { title: 'View Lead / Note' },
      },
      {
        path: 'index-lead',
        redirectTo: 'lead/index'
      },
      {
        path: 'lead/index',
        component: CreateIndexComponent,
        data: { title: 'Sales / Create New Lead' },
      },
      {
        path: 'create-lead',
        redirectTo: 'lead/create'
      },
      {
        path: 'lead/create',
        component: LeadCreateIndexComponent,
        data: { title: 'Sales / Create New Lead' },
      },
      {
        path: 'create-lead/search-client',
        component: SearchClientComponent,
        data: { title: 'Sales / Create Lead' },
      },
      {
        path: 'create-lead/find-client',
        component: FindClientComponent,
        data: { title: 'Sales / Create Lead' },
      },
      {
        path: 'find-lead',
        component: FindLeadCreateComponent,
        data: { title: 'Sales / Find Lead' },
      },
      {
        path: 'view-lead',
        component: ViewLeadComponent,
        data: { title: 'Sales / View Lead' },
      },
      {
        path: 'campaign-target',
        component: CampaignTargetComponent,
        data: { title: 'Campaign Target' },
      },
      {
        path: 'exclusion-list',
        component: ExclusionListComponent,
        data: { title: 'Exclusion List' },
      },
      {
        path: 'target-list',
        component: TargetListComponent,
        data: { title: 'Target List' },
      },
      {
        path: 'lead-show',
        component: FindLeadShowComponent,
        data: { title: 'Sales / Find Lead' },
      },
      {
        path: 'quotations',
        component: QuotationsIndexComponent,
        data: { title: 'Sales / Quotations' },
      },
      {
        path: 'client-relationship',
        component: RelationshipsComponent,
        data: { title: 'View Lead / Client Relationship' },
      },
      {
        path: 'resources/test/index',
        component: SalesResourcesTestIndexComponent,
        data: { title: 'Sales / Resources / Test' },
      },
      {
        path: 'resources/test/create',
        component: SalesResourcesTestCreateComponent,
        data: { title: 'Sales / Resources / Test' },
      },
      {
        path: 'resources/training/index',
        component: SalesResourcesTrainingIndexComponent,
        data: { title: 'Sales / Resources / Training' },
      },
      {
        path: 'resources/training/create',
        component: SalesResourcesTrainingCreateComponent,
        data: { title: 'Sales / Resources / Training' },
      },

      {
        path: 'workflows',
        loadChildren: () =>
          import(
            '../Reusables/reusable-pages/workflow-list/workflow-list.module'
          ).then((m) => m.WorkflowListModule),
        data: { title: 'View Client / Workflows', rModule: ERModule.client },
      },

      {
        path: 'policies-relationship',
        component: PoliciesComponent,
        data: { title: 'View Lead / Policies Relationship' },
      },
      {
        path: 'documents',
        loadChildren: () =>
          import(
            '../Reusables/reusable-pages/document-list/document-list.module'
          ).then((m) => m.DocumentListModule),
        data: { title: 'View Client / Documents', rModule: ERModule.client },
      },
    ],
  },
  {
    path: 'calendar',
    component: CRMAnalyticsCampaignIndexComponent,
    data: { title: 'View Lead / Calendar' },
  },
  {
    path: 'task-setup',
    component: CRMSIndexSetupsTaskSetupComponent,
    data: { title: 'Setups / Task Setup' },
  },
  {
    path: 'task-setup/create',
    component: CRMSCreateSetupsTaskSetupComponent,
    data: { title: 'Setups / Task Setup' },
  },
  {
    path: 'task-setup/start',
    component: CRMSStartSetupsTaskSetupComponent,
    data: { title: 'Setups / Task Setup' },
  },
  {
    path: 'write-report',
    component: WriteReportStartComponent,
    data: { title: 'Write Report' },
  },
  {
    path: 'write-report/create',
    component: WriteReportIndexComponent,
    data: { title: 'Write Report' },
  },
  {
    path: 'pipeline-analysis',
    component: PipelineIndexComponent,
    data: { title: 'Analytics / Pipeline Analysis' },
  },
  {
    path: 'customer-explorer',
    component: CustomerExplorerIndexComponent,
    data: { title: 'Analytics/Customer Explorer' },
  },
  {
    path: 'setup/codes/lead-classification',
    component: LeadClassificationCRMComponent,
    data: { title: 'Codes / Lead Classification' },
  },
  {
    path: 'setup/codes/lead-classification-index',
    component: LeadClassificationIndexCrmComponent,
    data: { title: 'Codes / Lead Classification' },
  },
  {
    path: 'setup/codes/client-stage',
    component: ClientStageCRMComponent,
    data: { title: 'Codes / Client Stage' },
  },
  {
    path: 'setup/codes/client-stage-index',
    component: ClientStageIndexCrmComponent,
    data: { title: 'Codes / Client Stage' },
  },
  {
    path: 'setup/codes/age-group',
    component: ClientCodeAgeGroupCRMComponent,
    data: { title: 'Codes / Age Group' },
  },
  {
    path: 'setup/codes/client-data-score-index',
    component: ClientDataScoreIndexComponent,
    data: { title: 'Codes / Client Data Score' },
  },
  {
    path: 'setup/codes/client-data-score',
    component: ClientDataScoreComponent,
    data: { title: 'Codes / Client Data Score' },
  },

  {
    path: 'setup/codes/age-group-show',
    component: ClientCodeAgeGroupShowCRMComponent,
    data: { title: 'Codes / Age Group' },
  },

  {
    path: 'setup/codes/marketing-events',
    component: MarketingEventCRMComponent,
    data: { title: 'Codes / Marketing Events' },
  },
  {
    path: 'setup/codes/marketing-events/find-provider',
    component: FindProviderComponent,
    data: { title: 'Codes / Marketing Events' },
  },
  {
    path: 'setup/codes/marketing-events/view-provider',
    component: ViewProviderComponent,
    data: { title: 'Codes / Marketing Events' },
  },
  {
    path: 'setup/codes/marketing-events-index',
    component: MarketingEventIndexCRMComponent,
    data: { title: 'Codes / Marketing Events' },
  },
  {
    path: 'sales-activities',
    component: SalesActivitiesIndexComponent,
    data: { title: 'Activities Summary' },
  },

  {
    path: 'sales-cycle-report',
    component: SalesCycleReportComponent,
    data: { title: 'Activities Summary / Sales Cycle Report' },
  },

  {
    path: 'sales-conversion-report',
    component: SalesConversionReportComponent,
    data: { title: 'Activities Summary / Sales Conversion Report' },
  },
  {
    path: 'settled-transaction',
    component: SalesSettledTransactionComponent,
    data: { title: 'Activities Summary / Sales / Settles Transaction ' },
  },

  {
    path: 'sales-report',
    component: SalesReportComponent,
    data: { title: 'Activities Summary / Sales Report ' },
  },
  {
    path: 'lead-conversion-rate',
    component: LeadConversionRateComponent,
    data: { title: 'Activities Summary / Lead Conversion Rate ' },
  },
  {
    path: 'lead-opportunity-rate',
    component: LeadOpportunityRateComponent,
    data: { title: 'Activities Summary / Lead Opportunity Rate ' },
  },
  {
    path: 'opportunity-to-win-ratio',
    component: OpportunityToWinRatioComponent,
    data: { title: 'Activities Summary / Opportunity To Win Ratio ' },
  },

  {
    path: 'sales-cycle-report',
    component: SalesCycleReportComponent,
    data: { title: 'Activities Summary / Sales Cycle Report' },
  },

  {
    path: 'sales-conversion-report',
    component: SalesConversionReportComponent,
    data: { title: 'Activities Summary / Sales Conversion Report' },
  },
  {
    path: 'settled-transaction',
    component: SalesSettledTransactionComponent,
    data: { title: 'Activities Summary / Sales / Settles Transaction ' },
  },

  {
    path: 'sales-report',
    component: SalesReportComponent,
    data: { title: 'Activities Summary / Sales Report ' },
  },
  {
    path: 'lead-conversion-rate',
    component: LeadConversionRateComponent,
    data: { title: 'Activities Summary / Lead Conversion Rate ' },
  },
  {
    path: 'lead-opportunity-rate',
    component: LeadOpportunityRateComponent,
    data: { title: 'Activities Summary / Lead Opportunity Rate ' },
  },
  {
    path: 'opportunity-to-win-ratio',
    component: OpportunityToWinRatioComponent,
    data: { title: 'Activities Summary / Opportunity To Win Ratio ' },
  },

  //{path: 'admin/usermenu', component: CRMSadminusermenuComponent, data: {title: 'Admin User Menu'}},
  //{path: 'admin/usergroup', component: CRMSadminusergroupComponent, data: {title: 'Admin User Group'}},
  //{path: 'configuration', component: CRMSConfigurationComponent, data: {title: 'Configuration'}},
  {
    path: 'user',
    component: CRMSadminuserComponent,
    data: { title: 'Admin / User' },
  },
  {
    path: 'user/:operation',
    component: CRMSadminuserComponent,
    data: { title: 'Admin / User' },
  },
  {
    path: 'usergroup',
    component: CRMSadminusergroupComponent,
    data: { title: 'Admin / User Group' },
  },
  {
    path: 'usergroup/:operation',
    component: CRMSadminusergroupComponent,
    data: { title: 'Admin / User Group' },
  },
  {
    path: '',
    loadChildren: () =>
      import('src/app/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'usermenu',
    component: CRMSadminusergroupComponent,
    data: { title: 'Admin / User Menu' },
  },
  {
    path: 'usermenu/:operation',
    component: CRMSadminusergroupComponent,
    data: { title: 'Admin / User Menu' },
  },
  //, { path: '', component: CRMSadminusergroupComponent, data: { title: 'Admin / User Menu' } }
  {
    path: 'configuration',
    component: CRMSConfigurationComponent,
    data: { title: 'Admin / Configuration' },
  },
  {
    path: 'configuration/:operation',
    component: ConfigurationComponent,
    data: { title: 'Admin / Configuration' },
  },
  {
    path: 'requisition',
    component: CRMSRequisitionComponent,
    data: { title: 'Admin / Requisition' },
  },
  {
    path: 'workflow-desk',
    component: FormLayoutComponent,
    data: { title: 'WorkFlow' },
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
export class CRMSRoutingModule {
}
