import { Environment } from './../Shared/models/index.model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LifeSetupProductCoverCodeComponent } from './crms-pages/Setup/Product/life-setup-product-cover-code/life-setup-product-cover-code.component';
import { CRMSLifeSetupProductCodeComponent } from './crms-pages/Setup/Product/life-setup-product-code/life-setup-product-code.component';
import { CRMSadminuserComponent } from './crms-pages/user/adminuser/lifeadminuser.component';
import { CRMSadminusergroupComponent } from './crms-pages/user/adminusergroup/lifeadminusergroup.component';
import { CRMSadminusermenuComponent } from './crms-pages/user/adminusermenu/lifeadminusermenu.component';
import { CRMSConfigurationComponent } from './crms-pages/user/configuration/configuration.component';

import { ComponentsModule } from '../Shared/components/components.module';
import { StartCoverCodeComponent } from './crms-pages/Setup/Product/life-setup-product-cover-code/start-cover-code/start-cover-code.component';
import { CreateCoverCodeComponent } from './crms-pages/Setup/Product/life-setup-product-cover-code/create-cover-code/create-cover-code.component';
import { CreateCloneCoverCodeComponent } from './crms-pages/Setup/Product/life-setup-product-cover-code/create-clone-cover-code/create-clone-cover-code.component';
import { CRMSStartProductCodeComponent } from './crms-pages/Setup/Product/life-setup-product-code/start-product-code/start-product-code.component';
import { CRMSCreateProductCodeComponent } from './crms-pages/Setup/Product/life-setup-product-code/create-product-code/create-product-code.component';
import { CRMSCreateCloneProductCodeComponent } from './crms-pages/Setup/Product/life-setup-product-code/create-clone-product-code/create-clone-product-code.component';
import { RouterModule } from '@angular/router';
import { IndexCoverCodeComponent } from './crms-pages/Setup/Product/life-setup-product-cover-code/index-cover-code/index-cover-code.component';
import { IndexCloneCoverCodeComponent } from './crms-pages/Setup/Product/life-setup-product-cover-code/index-clone-cover-code/index-clone-cover-code.component';
import { ShowCoverCodeComponent } from './crms-pages/Setup/Product/life-setup-product-cover-code/show-cover-code/show-cover-code.component';
import { CRMSIndexProductCodeComponent } from './crms-pages/Setup/Product/life-setup-product-code/index-product-code/index-product-code.component';
import { CRMSIndexCloneProductCodeComponent } from './crms-pages/Setup/Product/life-setup-product-code/index-clone-product-code/index-clone-product-code.component';
import { CRMSShowProductCodeComponent } from './crms-pages/Setup/Product/life-setup-product-code/show-product-code/show-product-code.component';
import { CLVIndexComponent } from './crms-pages/Setup/Clv/clv-index/clv-index.component';
import { CLVCreateComponent } from './crms-pages/Setup/Clv/clv-create/clv-create.component';
import { CLVShowComponent } from './crms-pages/Setup/Clv/clv-show/clv-show.component';
import { LifecycleIndexComponent } from './crms-pages/Setup/Lifecycle/lifecycle-index/index.component';
import { LifecycleCreateComponent } from './crms-pages/Setup/Lifecycle/lifecycle-create/create.component';
import { LifecycleShowComponent } from './crms-pages/Setup/Lifecycle/lifecycle-show/show.component';
import { BandsIndexComponent } from './crms-pages/Setup/Bands/index/index.component';
import { BandsCreateComponent } from './crms-pages/Setup/Bands/create/create.component';
import { BandsShowComponent } from './crms-pages/Setup/Bands/show/show.component';

import { ClientgroupIndexComponent } from './crms-pages/Setup/Clientgroup/index/index.component';
import { ClientgroupCreateComponent } from './crms-pages/Setup/Clientgroup/create/create.component';
import { ClientgroupShowComponent } from './crms-pages/Setup/Clientgroup/show/show.component';

import { ParametersIndexComponent } from './crms-pages/Setup/Parameters/index/index.component';
import { ParametersStartComponent } from './crms-pages/Setup/Parameters/start/start.component';
import { ParametersCreateComponent } from './crms-pages/Setup/Parameters/create/create.component';
import { ParametersShowComponent } from './crms-pages/Setup/Parameters/show/show.component';
import { LeadCreateIndexComponent } from './crms-pages/Sales/LeadCreate/index/index.component';
import { FindLeadCreateComponent } from './crms-pages/Sales/FindLead/create/create.component';
import { FindLeadShowComponent } from './crms-pages/Sales/FindLead/show/show.component';
import { QuotationsIndexComponent } from './crms-pages/Sales/Quotations/index/index.component';

import { CRMSIndexSetupsTaskSetupComponent } from './crms-pages/Setup/task-setup/index-task-setup/index-task-setup.component';
import { CRMSStartSetupsTaskSetupComponent } from './crms-pages/Setup/task-setup/start-task-setup/start-task-setup.component';
import { CRMSCreateSetupsTaskSetupComponent } from './crms-pages/Setup/task-setup/create-task-setup/create-task-setup.component';

import { WriteReportIndexComponent } from './crms-pages/Analytics/write-report/index/index.component';
import { WriteReportStartComponent } from './crms-pages/Analytics/write-report/start/start.component';
import { PipelineIndexComponent } from './crms-pages/Analytics/pipeline-analysis/index/index.component';
import { CustomerExplorerIndexComponent } from './crms-pages/Analytics/customer-explorer/index/index.component';
import { SalesActivitiesIndexComponent } from './crms-pages/Analytics/sales-activities/index/index.component';

import { OverviewIndexComponent } from './crms-pages/Clients/overview-index/overview-index.component';
import { OverviewShowComponent } from './crms-pages/Clients/overview-show/overview-show.component';
import { OverviewCreateComponent } from './crms-pages/Clients/overview-create/overview-create.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../Shared/shared.module';
/* import { CorporateClientComponent } from './crms-pages/agent-desk/new-corporate-agent/corporate-client/corporate-client.component'; */
import { CRMSFindMainAgentComponent } from './crms-pages/agent-desk/find-agent/find-main-agent/find-main-agent.component';
import { CRMSNewCorporateAgentModule } from './crms-pages/agent-desk/new-corporate-agent/new-corporate-agent.module';
import { CRMSNewIndividualAgentModule } from './crms-pages/agent-desk/new-individual-agent/new-individual-agent.module';
import { CRMSAgentEndorsementsComponent } from './crms-pages/agent-desk/find-agent/find-main-agent/agentinfo-button/agent-endorsements/agent-endorsements.component';
import { CRMSAgentDocumentsComponent } from './crms-pages/agent-desk/find-agent/find-main-agent/agentinfo-button/agent-documents/agent-documents.component';
import { CRMSAgentWorkflowsComponent } from './crms-pages/agent-desk/find-agent/find-main-agent/agentinfo-button/agent-workflows/agent-workflows.component';
import { CRMSAgentWebLoginComponent } from './crms-pages/agent-desk/find-agent/find-main-agent/agentinfo-button/agent-web-login/agent-web-login.component';
import { CRMSAgentLoanComponent } from './crms-pages/agent-desk/find-agent/find-main-agent/agentinfo-button/agent-loan/agent-loan.component';
import { CRMSViewAgentComponent } from './crms-pages/agent-desk/find-agent/find-main-agent/view-agent/view-agent.component';
import { CRMSAgentnoteComponent } from './crms-pages/agent-desk/find-agent/find-main-agent/agentnote/agentnote.component';
import { CRMSAgentSearchComponent } from './crms-pages/agent-desk/find-agent/find-main-agent/agent-search/agent-search.component';
import { CRMSAgentPoliciesComponent } from './crms-pages/agent-desk/find-agent/find-main-agent/agentinfo-button/agent-policies/agent-policies.component';
import { CRMSCommissionComponent } from './crms-pages/agent-desk/find-agent/find-main-agent/agentinfo-button/commission/commission.component';
import { CRMSProductionComponent } from './crms-pages/agent-desk/find-agent/find-main-agent/agentinfo-button/production/production.component';
import { CRMSCreditBalanceComponent } from './crms-pages/agent-desk/find-agent/find-main-agent/agentinfo-button/credit-balance/credit-balance.component';

import { CRMSFindClientComponent } from './crms-pages/client-desk/find-client/c-r-m-s-find-client.component';
import { CRMSViewClientComponent } from './crms-pages/client-desk/view-client/c-r-m-s-view-client.component';
import { CRMSScreenshot1Component } from './crms-pages/client-desk/form/screenshot1/screenshot1.component';
import { CRMSScreenshot2Component } from './crms-pages/client-desk/form/screenshot2/screenshot2.component';
import { CRMSScreenshot3Component } from './crms-pages/client-desk/form/screenshot3/screenshot3.component';
import { CRMSScreenshot4Component } from './crms-pages/client-desk/form/screenshot4/screenshot4.component';
import { CRMSScreenshot5Component } from './crms-pages/client-desk/form/screenshot5/screenshot5.component';
import { CRMSHeaderComponent } from './crms-pages/client-desk/form/header/header.component';
import { CRMSCommonComponent } from './crms-pages/client-desk/form/common/common.component';
import { CRMSAllformsComponent } from './crms-pages/client-desk/form2/allforms/crm-allforms.component';
import { CRMSPersonalinfoComponent } from './crms-pages/client-desk/form2/personalinfo/personalinfo.component';
import { CRMSIdentificationComponent } from './crms-pages/client-desk/form2/identification/identification.component';
import { CRMSEmployinfoComponent } from './crms-pages/client-desk/form2/employinfo/employinfo.component';
import { CRMSPaymentinfoComponent } from './crms-pages/client-desk/form2/paymentinfo/paymentinfo.component';
import { CRMSNextofkinComponent } from './crms-pages/client-desk/form2/nextofkin/nextofkin.component';
import { CRMSFormheaderComponent } from './crms-pages/client-desk/form2/formheader/formheader.component';
import { CRMSPaymentdetailComponent } from './crms-pages/client-desk/form2/paymentinfo/paymentdetail/paymentdetail.component';
import { CRMSWorkflowsComponent } from './crms-pages/client-desk/clientinfo-buttons/workflows/workflows.component';
import { CRMSWebLoginComponent } from './crms-pages/client-desk/clientinfo-buttons/web-login/web-login.component';
import { CRMSPoliciesComponent } from './crms-pages/client-desk/clientinfo-buttons/policies/policies.component';
import { CRMSRelationshipsComponent } from './crms-pages/client-desk/clientinfo-buttons/relationships/relationships.component';
import { CRMSBusinessComponent } from './crms-pages/client-desk/clientinfo-buttons/business/business.component';
import { CRMSPendingQuotesComponent } from './crms-pages/client-desk/clientinfo-buttons/pending-quotes/pending-quotes.component';
import { CRMSPendingPaymentsComponent } from './crms-pages/client-desk/clientinfo-buttons/pending-payments/pending-payments.component';
import { CRMSClientnoteComponent } from './crms-pages/client-desk/clientnote/clientnote.component';
import { CRMSClientProviderIndexComponent } from './crms-pages/client-desk/client-provider/client-provider-index/client-provider-index.component';
import { CRMSCreateNewProviderComponent } from './crms-pages/client-desk/client-provider/client-provider-create/client-provider-create.component';
import { CRMSUnderwritingEventsComponent } from './crms-pages/client-desk/clientinfo-buttons/underwriting-events/underwriting-events.component';
import { CRMSEndorsementsComponent } from './crms-pages/client-desk/clientinfo-buttons/endorsements/endorsements.component';
import { CRMSDocumentsComponent } from './crms-pages/client-desk/clientinfo-buttons/documents/documents.component';
import { CRMSClientSearchComponent } from './crms-pages/client-desk/client-search/client-search.component';

import { FindQuotationModule } from './crms-pages/quotation-desk/find-quotation.module';
import { SetupGeneralRatesComponent } from './crms-pages/Setup/Rates/general-rates/life-setup-general-rates.component';
import { ShowGeneralRatesComponent } from './crms-pages/Setup/Rates/general-rates/show-general-rates/show-general-rates.component';
import { IndexGeneralRatesComponent } from './crms-pages/Setup/Rates/general-rates/index-general-rates/index-general-rates.component';
import { CreateGeneralRateComponent } from './crms-pages/Setup/Rates/general-rates/create-general-rates/create-general-rates.component';
import { StartGeneralRatesComponent } from './crms-pages/Setup/Rates/general-rates/start-general-rates/start-general-rates.component';
import { SetupInterestRatesComponent } from './crms-pages/Setup/Rates/interest-rates/life-setup-interest-rates.component';
import { IndexInterestRatesComponent } from './crms-pages/Setup/Rates/interest-rates/index-interest-rates/index-interest-rates.component';
import { StartInterestRatesComponent } from './crms-pages/Setup/Rates/interest-rates/start-interest-rates/start-interest-rates.component';
import { CreateInterestRateComponent } from './crms-pages/Setup/Rates/interest-rates/create-interest-rates/create-interest-rates.component';
import { ShowInterestRatesComponent } from './crms-pages/Setup/Rates/interest-rates/show-interest-rates/show-interest-rates.component';
import { SetupBonusRatesComponent } from './crms-pages/Setup/Rates/bonus-rates/life-setup-bonus-rates.component';
import { ShowBonusRatesComponent } from './crms-pages/Setup/Rates/bonus-rates/show-bonus-rates/show-bonus-rates.component';
import { IndexBonusRatesComponent } from './crms-pages/Setup/Rates/bonus-rates/index-bonus-rates/index-bonus-rates.component';
import { StartBonusRatesComponent } from './crms-pages/Setup/Rates/bonus-rates/start-bonus-rates/start-bonus-rates.component';
import { SetupDiscountRatesComponent } from './crms-pages/Setup/Rates/discount-rates/life-setup-discount-rates.component';
import { IndexDiscountRatesComponent } from './crms-pages/Setup/Rates/discount-rates/index-discount-rates/index-discount-rates.component';
import { StartDiscountRatesComponent } from './crms-pages/Setup/Rates/discount-rates/start-discount-rates/start-discount-rates.component';
import { ShowDiscountRatesComponent } from './crms-pages/Setup/Rates/discount-rates/show-discount-rates/show-discount-rates.component';
import { CreateDiscountRateComponent } from './crms-pages/Setup/Rates/discount-rates/create-discount-rates/create-discount-rates.component';
import { CreateTaxRateComponent } from './crms-pages/Setup/Rates/tax-rates/create-tax-rates/create-tax-rates.component';
import { ShowTaxRatesComponent } from './crms-pages/Setup/Rates/tax-rates/show-tax-rates/show-tax-rates.component';
import { IndexTaxRatesComponent } from './crms-pages/Setup/Rates/tax-rates/index-tax-rates/index-tax-rates.component';
import { SetupTaxRatesComponent } from './crms-pages/Setup/Rates/tax-rates/life-setup-tax-rates.component';
import { StartTaxRatesComponent } from './crms-pages/Setup/Rates/tax-rates/start-tax-rates/start-tax-rates.component';
import { StartShortTermRatesComponent } from './crms-pages/Setup/Rates/short-term-rates/start-short-term-rates/start-short-term-rates.component';
import { SetupShortTermRatesComponent } from './crms-pages/Setup/Rates/short-term-rates/life-setup-short-term-rates.component';
import { ShowShortTermRatesComponent } from './crms-pages/Setup/Rates/short-term-rates/show-short-term-rates/show-short-term-rates.component';
import { IndexShortTermRatesComponent } from './crms-pages/Setup/Rates/short-term-rates/index-short-term-rates/index-short-term-rates.component';
import { CreateShortTermRateComponent } from './crms-pages/Setup/Rates/short-term-rates/create-short-term-rates/create-short-term-rates.component';
import { FindPolicyModule } from './crms-pages/policy-desk/find-policy.module';

// import { WorkflowIndexComponent } from './crms-pages/Workflow/workflow-index/workflow-index.component';
// import { WorkflowFindtaskComponent } from './crms-pages/Workflow/workflow-find-task/workflow-find-task.component';
// import { WorkflowFindtaskListComponent } from './crms-pages/Workflow/workflow-find-task-list/workflow-find-task-list.component';
// import { WorkflowTaskComponent } from './crms-pages/Workflow/workflow-create/task/workflow-task.component';
// import { WorkflowDocumentlistComponent } from './crms-pages/Workflow/workflow-create/document-list/workflow-document-list.component';
// import { WorkflowScheduleComponent } from './crms-pages/Workflow/workflow-create/schedule/workflow-schedule.component';
import { FindGroupModule } from './crms-pages/group-desk/find-group.module';

import { IndexCountryComponent } from './crms-pages/Setup/Address/Country/index-country/index-country.component';
import { SetupCountryComponent } from './crms-pages/Setup/Address/Country/country.component';
import { CreateCountryComponent } from './crms-pages/Setup/Address/Country/create-country/create-country.component';
import { IndexRegionComponent } from './crms-pages/Setup/Address/Region/index-region/index-region.component';
import { ShowRegionComponent } from './crms-pages/Setup/Address/Region/show-region/show-region.component';
import { StartRegionComponent } from './crms-pages/Setup/Address/Region/start-region/start-region.component';
import { IndexStateComponent } from './crms-pages/Setup/Address/State/index-state/index-state.component';
import { ShowStateComponent } from './crms-pages/Setup/Address/State/show-state/show-state.component';
import { StartStateComponent } from './crms-pages/Setup/Address/State/start-state/start-state.component';
import { IndexTownComponent } from './crms-pages/Setup/Address/Town/index-town/index-town.component';
import { ShowTownComponent } from './crms-pages/Setup/Address/Town/show-town/show-town.component';
import { StartTownComponent } from './crms-pages/Setup/Address/Town/start-town/start-town.component';

import { FindCampaignComponent } from './crms-pages/communication/find-campaign/find-campaign.component';
import { CampaignCreateComponent } from './crms-pages/communication/campaign-create/campaign-create.component';
import { CRMSRequisitionComponent } from './crms-pages/user/requisition/requisition.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { CRMIndividualAgentIndexComponent } from './crms-pages/agent-desk/crmindividual-agent-index/crmindividual-agent-index.component';
import { CRMCorrespondenceQuotationIndexComponent } from './crms-pages/Setup/correspondence/crmcorrespondence-quotation-index/crmcorrespondence-quotation-index.component';
import { CRMCorrespondenceQuotationCreateComponent } from './crms-pages/Setup/correspondence/crmcorrespondence-quotation-create/crmcorrespondence-quotation-create.component';
import { CRMCorrespondenceEmailIndexComponent } from './crms-pages/Setup/correspondence/crmcorrespondence-email-index/crmcorrespondence-email-index.component';
import { CRMCorrespondenceEmailCreateComponent } from './crms-pages/Setup/correspondence/crmcorrespondence-email-create/crmcorrespondence-email-create.component';
import { CRMCorrespondencePrintCreateComponent } from './crms-pages/Setup/correspondence/crmcorrespondence-print-create/crmcorrespondence-print-create.component';
import { CRMCorrespondencePrintIndexComponent } from './crms-pages/Setup/correspondence/crmcorrespondence-print-index/crmcorrespondence-print-index.component';
import { CRMCorrespondenceSMSIndexComponent } from './crms-pages/Setup/correspondence/crmcorrespondence-smsindex/crmcorrespondence-smsindex.component';
import { CRMCorrespondenceSMSCreateComponent } from './crms-pages/Setup/correspondence/crmcorrespondence-smscreate/crmcorrespondence-smscreate.component';
import { CRMCorrespondenceWebhookCreateComponent } from './crms-pages/Setup/correspondence/crmcorrespondence-webhook-create/crmcorrespondence-webhook-create.component';
import { CRMCorrespondenceWebhookIndexComponent } from './crms-pages/Setup/correspondence/crmcorrespondence-webhook-index/crmcorrespondence-webhook-index.component';
import { CRMCorrespondenceTemplateIndexComponent } from './crms-pages/Setup/correspondence/crmcorrespondence-template-index/crmcorrespondence-template-index.component';
import { CRMCorrespondenceTemplateCreateComponent } from './crms-pages/Setup/correspondence/crmcorrespondence-template-create/crmcorrespondence-template-create.component';
import { FoundCampaignComponent } from './crms-pages/communication/find-campaign/found-campaign/found-campaign.component';
import { ViewLeadComponent } from './crms-pages/Sales/FindLead/view-lead/view-lead.component';
import { CRMAnalyticsCampaignIndexComponent } from './crms-pages/Analytics/crmanalytics-campaign-index/crmanalytics-campaign-index.component';
import { CRMAnalyticsCampaignDetailsComponent } from './crms-pages/Analytics/crmanalytics-campaign-details/crmanalytics-campaign-details.component';
import { SalesCycleReportComponent } from './crms-pages/Analytics/sales-activities/sales-cycle-report/sales-cycle-report.component';
import { SalesConversionReportComponent } from './crms-pages/Analytics/sales-activities/sales-conversion-report/sales-conversion-report.component';
import { SalesSettledTransactionComponent } from './crms-pages/Analytics/sales-activities/sales-settled-transaction/sales-settled-transaction.component';
import { SalesReportComponent } from './crms-pages/Analytics/sales-activities/sales-report/sales-report.component';
import { LeadConversionRateComponent } from './crms-pages/Analytics/sales-activities/lead-conversion-rate/lead-conversion-rate.component';
import { LeadOpportunityRateComponent } from './crms-pages/Analytics/sales-activities/lead-opportunity-rate/lead-opportunity-rate.component';
import { OpportunityToWinRatioComponent } from './crms-pages/Analytics/sales-activities/opportunity-to-win-ratio/opportunity-to-win-ratio.component';
import { CRMSClientPipesModule } from './crms-pages/client-desk/pipes/c-r-m-s-client-pipes.module';
import { ClientHelpersService } from './crms-pages/client-desk/service/client-helpers.service';
import { DirectivesModule } from '../Shared/directives/index.directive';
import { ClientSelectPaymentComponent } from './crms-pages/client-desk/view-client/modals/select-payment/client-select-payment.component';
import { LeadClassificationCRMComponent } from './crms-pages/Setup/codes/lead-classification-crm/lead-classification-crm.component';
import { MarketingEventCRMComponent } from './crms-pages/Setup/codes/marketing-event-crm/marketing-event-crm.component';
import { ClientStageCRMComponent } from './crms-pages/Setup/codes/client-stage-crm/client-stage-crm.component';
import { CRMSRoutingModule } from './crms-routing.module';
import { LayoutModule } from '../Layout/layout.module';
import { CRMHomeComponent } from './crms-pages/crmhome/crmhome.component';
import { ClientCodeAgeGroupCRMComponent } from './crms-pages/Setup/codes/client-code-age-group-crm/client-code-age-group-crm.component';
import { ClientCodeAgeGroupShowCRMComponent } from './crms-pages/Setup/codes/client-code-age-group-show-crm/client-code-age-group-show-crm.component';
import { ChartsModule } from 'ng2-charts';
import { SearchClientComponent } from './crms-pages/Sales/LeadCreate/index/search-client/search-client.component';
import { FindClientComponent } from './crms-pages/Sales/LeadCreate/index/find-client/find-client.component';
import { TeamsCrmComponent } from './crms-pages/Setup/codes/teams-crm/teams-crm.component';
import { MarketingEventIndexCRMComponent } from './crms-pages/Setup/codes/marketing-event-index-crm/marketing-event-index-crm.component';
import { TeamsIndexCrmComponent } from './crms-pages/Setup/codes/teams-index-crm/teams-index-crm.component';
import { LeadClassificationIndexCrmComponent } from './crms-pages/Setup/codes/lead-classification-index-crm/lead-classification-index-crm.component';
import { ClientStageIndexCrmComponent } from './crms-pages/Setup/codes/client-stage-index-crm/client-stage-index-crm.component';
import { ClientDataScoreIndexComponent } from './crms-pages/Setup/codes/client-data-score-index/client-data-score-index.component';
import {ViewClientNewComponent} from "../CRM/client-desk/view-client-new/view-client-new.component";
import { ClientDataScoreComponent } from './crms-pages/Setup/codes/client-data-score/client-data-score.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ClientStatusComponent } from '../CRM/client-desk/edit-modals/client-status/client-status.component';
import { EditClientComponent } from '../CRM/client-desk/edit-modals/edit-client/edit-client.component';
import { FindProviderComponent } from './crms-pages/Setup/codes/marketing-event-crm/find-provider/find-provider.component';
import { ViewProviderComponent } from './crms-pages/Setup/codes/marketing-event-crm/view-provider/view-provider.component';
import { ResourcesTestIndexComponent } from './crms-pages/Setup/resources-test-index/resources-test-index.component';
import { ResourcesTestCreateComponent } from './crms-pages/Setup/resources-test-create/resources-test-create.component';
import { ResourcesTrainingCreateComponent } from './crms-pages/Setup/resources-training-create/resources-training-create.component';
import { ResourcesTrainingIndexComponent } from './crms-pages/Setup/resources-training-index/resources-training-index.component';
import { SalesResourcesTrainingIndexComponent } from './crms-pages/Sales/sales-resources-training-index/sales-resources-training-index.component';
import { SalesResourcesTrainingCreateComponent } from './crms-pages/Sales/sales-resources-training-create/sales-resources-training-create.component';
import { SalesResourcesTestCreateComponent } from './crms-pages/Sales/sales-resources-test-create/sales-resources-test-create.component';
import { SalesResourcesTestIndexComponent } from './crms-pages/Sales/sales-resources-test-index/sales-resources-test-index.component';
import { CreateIndexComponent } from './crms-pages/Sales/LeadCreate/create-index/create-index.component';
import { MatMenuModule } from '@angular/material/menu';
import { FullNamePipe } from '../Life/client-desk/pipes/full-name.pipe';
import { WorkflowPipesModule } from '../Shared/pipes/workflow-pipes/pipes.module';
import { ViewClientCompsModule } from '../Life/client-desk/client-desk-comps/view-client-comps/view-client-comps.module';
import { CampaignTargetComponent } from './crms-pages/communication/find-campaign/found-campaign/campaign-target/campaign-target.component';
import { ExclusionListComponent } from './crms-pages/communication/find-campaign/found-campaign/exclusion-list/exclusion-list.component';
import { TargetListComponent } from './crms-pages/communication/find-campaign/found-campaign/target-list/target-list.component';

@NgModule({
  declarations: [
    LifeSetupProductCoverCodeComponent,
    CRMSLifeSetupProductCodeComponent,
    CRMSadminuserComponent,
    CRMSadminusergroupComponent,
    CRMSadminusermenuComponent,
    CRMSRequisitionComponent,
    CreateCoverCodeComponent,
    CreateCloneCoverCodeComponent,
    StartCoverCodeComponent,
    IndexCloneCoverCodeComponent,
    IndexCoverCodeComponent,
    ShowCoverCodeComponent,
    CRMSCreateProductCodeComponent,
    CRMSCreateCloneProductCodeComponent,
    CRMSStartProductCodeComponent,
    CRMSIndexCloneProductCodeComponent,
    CRMSIndexProductCodeComponent,
    CRMSShowProductCodeComponent,
    CLVIndexComponent,
    CLVCreateComponent,
    CLVShowComponent,
    LifecycleIndexComponent,
    LifecycleCreateComponent,
    LifecycleShowComponent,
    BandsIndexComponent,
    BandsCreateComponent,
    BandsShowComponent,
    ClientgroupIndexComponent,
    ClientgroupCreateComponent,
    ClientgroupShowComponent,
    ParametersIndexComponent,
    ParametersStartComponent,
    ParametersCreateComponent,
    ParametersShowComponent,
    LeadCreateIndexComponent,
    FindLeadCreateComponent,
    FindLeadShowComponent,
    QuotationsIndexComponent,
    CRMSUnderwritingEventsComponent,
    CRMSEndorsementsComponent,
    CRMSDocumentsComponent,

    CRMSIndexSetupsTaskSetupComponent,
    CRMSStartSetupsTaskSetupComponent,
    CRMSCreateSetupsTaskSetupComponent,

    OverviewIndexComponent,
    OverviewShowComponent,
    OverviewCreateComponent,

    CampaignCreateComponent,
    FindCampaignComponent,
    WriteReportIndexComponent,
    WriteReportStartComponent,
    PipelineIndexComponent,
    CRMSConfigurationComponent,
    CustomerExplorerIndexComponent,
    SalesActivitiesIndexComponent,

    CRMSFindMainAgentComponent,
    CRMSViewAgentComponent,
    CRMSAgentnoteComponent,
    CRMSAgentEndorsementsComponent,
    CRMSProductionComponent,
    CRMSCreditBalanceComponent,
    CRMSCommissionComponent,
    CRMSAgentWorkflowsComponent,
    CRMSAgentWebLoginComponent,
    CRMSAgentPoliciesComponent,
    CRMSAgentLoanComponent,
    CRMSAgentDocumentsComponent,
    CRMSAgentSearchComponent,

    CRMSFindClientComponent,
    CRMSViewClientComponent,
    CRMSScreenshot1Component,
    CRMSScreenshot2Component,
    CRMSScreenshot3Component,
    CRMSScreenshot4Component,
    CRMSScreenshot5Component,
    CRMSHeaderComponent,
    CRMSCommonComponent,
    CRMSAllformsComponent,
    CRMSPersonalinfoComponent,
    CRMSIdentificationComponent,
    CRMSEmployinfoComponent,
    CRMSPaymentinfoComponent,
    CRMSNextofkinComponent,
    CRMSFormheaderComponent,
    CRMSPaymentdetailComponent,
    CRMSWorkflowsComponent,
    CRMSClientSearchComponent,
    CRMSWebLoginComponent,
    CRMSPoliciesComponent,
    CRMSRelationshipsComponent,
    CRMSBusinessComponent,
    CRMSPendingQuotesComponent,
    CRMSPendingPaymentsComponent,
    CRMSClientnoteComponent,
    CRMSClientProviderIndexComponent,
    CRMSCreateNewProviderComponent,
    SetupGeneralRatesComponent,
    ShowGeneralRatesComponent,
    IndexGeneralRatesComponent,
    CreateGeneralRateComponent,
    StartGeneralRatesComponent,
    SetupInterestRatesComponent,
    IndexInterestRatesComponent,
    StartInterestRatesComponent,
    CreateInterestRateComponent,
    ShowInterestRatesComponent,
    SetupBonusRatesComponent,
    ShowBonusRatesComponent,
    IndexBonusRatesComponent,
    StartBonusRatesComponent,
    SetupDiscountRatesComponent,
    IndexDiscountRatesComponent,
    StartDiscountRatesComponent,
    ShowDiscountRatesComponent,
    CreateDiscountRateComponent,
    // WorkflowIndexComponent,
    // WorkflowFindtaskComponent,
    // WorkflowTaskComponent,
    // WorkflowDocumentlistComponent,
    // WorkflowScheduleComponent,
    // WorkflowFindtaskListComponent,

    CreateTaxRateComponent,
    ShowTaxRatesComponent,
    IndexTaxRatesComponent,
    SetupTaxRatesComponent,
    StartTaxRatesComponent,
    StartShortTermRatesComponent,
    SetupShortTermRatesComponent,
    ShowShortTermRatesComponent,
    IndexShortTermRatesComponent,
    CreateShortTermRateComponent,

    SetupCountryComponent,
    IndexCountryComponent,
    CreateCountryComponent,

    IndexRegionComponent,
    ShowRegionComponent,
    StartRegionComponent,

    IndexStateComponent,
    ShowStateComponent,
    StartStateComponent,

    IndexTownComponent,
    ShowTownComponent,
    StartTownComponent,
    CRMIndividualAgentIndexComponent,
    CRMCorrespondenceQuotationIndexComponent,
    CRMCorrespondenceQuotationCreateComponent,
    CRMCorrespondenceEmailIndexComponent,
    CRMCorrespondenceEmailCreateComponent,
    CRMCorrespondencePrintCreateComponent,
    CRMCorrespondencePrintIndexComponent,
    CRMCorrespondenceSMSIndexComponent,
    CRMCorrespondenceSMSCreateComponent,
    CRMCorrespondenceWebhookCreateComponent,
    CRMCorrespondenceWebhookIndexComponent,
    CRMCorrespondenceTemplateIndexComponent,
    CRMCorrespondenceTemplateCreateComponent,
    FoundCampaignComponent,
    ViewLeadComponent,
    CRMAnalyticsCampaignIndexComponent,
    CRMAnalyticsCampaignDetailsComponent,
    SalesCycleReportComponent,
    SalesConversionReportComponent,
    SalesSettledTransactionComponent,
    SalesReportComponent,
    LeadConversionRateComponent,
    LeadOpportunityRateComponent,
    OpportunityToWinRatioComponent,
    ClientSelectPaymentComponent,
    LeadClassificationCRMComponent,
    MarketingEventCRMComponent,
    ClientStageCRMComponent,
    CRMHomeComponent,
    ClientCodeAgeGroupCRMComponent,
    ClientCodeAgeGroupShowCRMComponent,
    SearchClientComponent,
    FindClientComponent,
    TeamsCrmComponent,
    MarketingEventIndexCRMComponent,
    TeamsIndexCrmComponent,
    LeadClassificationIndexCrmComponent,
    ClientStageIndexCrmComponent,
    ClientDataScoreIndexComponent,
    ViewClientNewComponent,
    ClientDataScoreComponent,
    ClientStatusComponent,
    EditClientComponent,
    FindProviderComponent,
    ViewProviderComponent,
    ResourcesTestIndexComponent,
    ResourcesTestCreateComponent,
    ResourcesTrainingCreateComponent,
    ResourcesTrainingIndexComponent,
    SalesResourcesTrainingIndexComponent,
    SalesResourcesTrainingCreateComponent,
    SalesResourcesTestCreateComponent,
    SalesResourcesTestIndexComponent,
    CreateIndexComponent,
    CampaignTargetComponent,
    ExclusionListComponent,
    TargetListComponent,
  ],
  imports: [
    CommonModule,
    CRMSRoutingModule,
    ComponentsModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    FindQuotationModule,
    FindPolicyModule,
    FindGroupModule,
    LayoutModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 300,
    }),
    CRMSClientPipesModule,
    DirectivesModule,
    ChartsModule,
    MatDialogModule,
    MatMenuModule,
    WorkflowPipesModule,
    ViewClientCompsModule
  ],
  providers: [ClientHelpersService, FullNamePipe],
})
export class CRMSModule {}
