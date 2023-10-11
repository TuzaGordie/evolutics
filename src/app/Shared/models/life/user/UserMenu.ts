export class CreateUserMenu {
    constructor(
        public userMenu: UserMenu,
        public agent: UserMenuAgent,
        public groupPolicy: UserMenuGroupPolicy,
        public policy: UserMenuPolicy,
        public quotation: UserMenuQuotation,
        public client: UserMenuClient,
        public userMenuPayment: UserMenuPayment,
        public administration: UserMenuAdministration,
        public report: UserMenuReport,
        public setup: UserMenuSetup,
        public menuWorkflow: UserMenuWorkflow,
    ) { }
}

export class UserMenu {
    description: string;
    userMenu: string;
    createdBy: string = "user";
    id: number;
}

export class UserMenuAgent {
    allowAgentOverview: boolean = false;
    allowFindAgent: boolean = false;
    allowCreateNewIndividualAgent: boolean = false;
    allowCreateNewCorporateAgent: boolean = false;
    allowViewAgentDocuments: boolean = false;
    allowViewEndorsements: boolean = false;
    allowViewWebLogin: boolean = false;
    allowViewAgentLoan: boolean = false;
    allowViewAgentCommissionRecord: boolean = false;
    allowViewAgentProduction: boolean = false;
    allowEditAgentDocuments: boolean = false;
    allowMakeAgentEndorsements: boolean = false;
    allowMakeAgentWorkflows: boolean = false;
    allowViewAgentWorkflows: boolean = false;
    id: number;
}

export class UserMenuGroupPolicy {
    id: number;
    allowGroupPolicyOverview: boolean = false;
    allowViewGroupDocument: boolean = false;
    allowViewGroupEndorsement: boolean = false;
    allowFindGroup: boolean = false;
    allowviewGroupPolicyPeril: boolean = false;
    allowMakeGroupPolicyAccounting: boolean = false;
    allowMakeGroupPolicyWorkflows: boolean = false;
    allowEditGroupPolicyPricing: boolean = false;
    allowAddGroupPolicyDocuments: boolean = false;
    allowMakeGroupPolicyEndorsements: boolean = false;
    allowViewGroupPolicyRelationships: boolean = false;
    allowViewGroupPolicyUnderwriting: boolean = false;
    allowViewGroupPolicyReinsurance: boolean = false;
    allowViewGroupPolicyFutureActivity: boolean = false;
    allowViewGroupPolicySuspenseInwards: boolean = false;
    allowViewgroupPolicyCommissions: boolean = false;
    allowViewGroupPolicyPaymentsReceived: boolean = false;
    allowViewGroupPolicyPendingPaymentOutwards: boolean = false;
    allowViewGroupPolicyPaymentOutwards: boolean = false;
    allowMakeGroupPolicyFaculativeReinsurance: boolean = false;
    allowMakeGroupPolicyGroupPolicyRenewal: boolean = false;
    allowMakeGroupPolicyCommissionAdjustments: boolean = false;
    allowMakeGroupPolicyClaim: boolean = false;
    allowViewGroupPolicyUncoveredSar: boolean = false;
}

export class UserMenuPolicy {
    id: number;
    allowPolicyOverview: boolean = false;
    allowFindPolicy: boolean = false;
    allowViewPolicyPeril: boolean = false;
    allowMakePolicyAccounting: boolean = false;
    allowViewPolicyDocuments: boolean = false;
    allowViewPolicyEndorsements: boolean = false;
    allowViewPolicyWorkflows: boolean = false;
    allowViewPolicyPricing: boolean = false;
    allowAddPolicyDocuments: boolean = false;
    allowMakePolicyEndorsements: boolean = false;
    allowViewPolicyRelationships: boolean = false;
    allowMakePolicyWorkflows: boolean = false;
    allowViewPolicyUnderwriting: boolean = false;
    allowViewPolicyReinsurance: boolean = false;
    allowViewPolicyFutureActivity: boolean = false;
    allowViewPolicySuspenseInwards: boolean = false;
    allowViewPolicyCommissions: boolean = false;
    allowViewPolicyPaymentReceived: boolean = false;
    allowViewPolicyPaymentOutwards: boolean = false;
    allowMakePolicyFacultativeReinsurance: boolean = false;
    allowEditPolicyPricing: boolean = false;
    allowMakePolicyRenewal: boolean = false;
    makePolicyCommissionAdjustments: boolean = false;
    allowMakePolicyClaim: boolean = false;
    allowViewSuspenseInwards: boolean = false;
}

export class UserMenuQuotation {
    id: number;
    allowQuotationOverview: boolean = false;
    allowFindQuote: boolean = false;
    allowCreateNewIndividualQuote: boolean = false;
    allowCreateNewGroupQuote: boolean = false;
    allowViewQuotationPricing: boolean = false;
    allowEditQuotation: boolean = false;
    allowConvertQuoteToPolicy: boolean = false;
    allowEditQuotationPricing: boolean = false;
    allowGenerateQuote: boolean = false;
    allowAuthoriseQuote: boolean = false;
}

export class UserMenuClient {
    id: number;
    allowClientOverview: boolean = false;
    allowFindClient: boolean = false;
    allowCreateNewIndividualClient: boolean = false;
    allowCreateNewCorporateClient: boolean = false;
    allowViewClientDocuments: boolean = false;
    allowViewClientEndorsements: boolean = false;
    allowViewClientPolicies: boolean = false;
    allowViewClientWorkflows: boolean = false;
    allowViewClientProduction: boolean = false;
    allowEditClientDocuments: boolean = false;
    allowMakeClientEndorsements: boolean = false;
    allowEditClientWorkflows: boolean = false;
    allowEditClientRelationships: boolean = false;
    allowChangeClientStatus: boolean = false;
    allowViewClientRelationships: boolean = false;
    allowCreateNewProvider: boolean = false;
}

export class UserMenuPayment {
    id: number;
    allowCreateCoupon: boolean = false;
    allowAuthorizeCoupon: boolean = false;
    allowPendingPaymentOutward: boolean = false;
    allowAuthorizePaymentOutwards: boolean = false;
    authorizeInwardsSuspenseSwitch: boolean = false;
    allowAuthorizePolicyAccounts: boolean = false;
    allowAuthorizeCommissionAdjustments: boolean = false;
}

export class UserMenuAdministration {
    id: number;
    allowUserAdministrationGroup: boolean = false;
    allowUserAdministrationMenu: boolean = false;
    allowAdministrationDates: boolean = false;
    allowCreateAdministrationBatch: boolean = false;
    allowRunAdministrationBatch: boolean = false;
    allowUserAdmin: boolean = false;
    allowAdminBatchLog: boolean = false;
    allowAdminInterestRecalculation: boolean = false;
    allowAdminDatabaseDefinition: boolean = false;
    allowAdminConfiguration: boolean = false;
}

export class UserMenuReport {
    id: number;
    viewReport: boolean = false;
    createReport: boolean = false;
}

export class UserMenuSetup {
    id: number;
    allowProductsCoverCodeSetup: boolean = false;
    allowProductsCodeSetup: boolean = false;
    allowScreenCoverSetup: boolean = false;
    allowScreenTBCSetup: boolean = false;
    allowTranslationsMenuSetup: boolean = false;
    allowTranslationTemplateSetup: boolean = false;
    allowTranslationsAutoTranslatorSetup: boolean = false;
    allowTranslatorSystemMessageSetup: boolean = false;
    allowCodeParametersSetup: boolean = false;
    allowCodePremiumFrequenciesSetup: boolean = false;
    allowCodePremiumPaymentMethodSetup: boolean = false;
    allowCodeNumberingSetup: boolean = false;
    allowCodeStatusSetup: boolean = false;
    allowCodeCurrencyRateSetup: boolean = false;
    allowCorrespondencesQuotationSetup: boolean = false;
    allowCorrespondencesEmail: boolean = false;
    allowCorrespondencesPrint: boolean = false;
    allowCorrespondencesSms: boolean = false;
    allowCorrespondencesWebhook: boolean = false;
    allowCorrespondencesTemplate: boolean = false;
    allowAccountsCode: boolean = false;
    allowAccountsGeneralLedgerMapping: boolean = false;
    allowAccountsBank: boolean = false;
    allowAccountsBankSortCodeSetup: boolean = false;
    allowAccountsBankAccountsSetup: boolean = false;
    allowAccountPaymentOutward: boolean = false;    
    allowDesignControlSetup: boolean = false;
    allowDesignEventList: boolean = false;
    allowDesignStatusClaimSetup: boolean = false;
    allowDesignStatusPolicySetup: boolean = false;
    allowProcessDesignProcessMapsSetup: boolean = false;
    allowProcessDesignSlaSetup: boolean = false;
    allowProcessDesignClientsUniqueCheck: boolean = false;
    allowProcessDesignClientsMandatoryData: boolean = false;
    allowProcessDesignRequirementsClaims: boolean = false;
    allowProcessDesignRequirementsNewBusiness: boolean = false;
    allowProcessDesignUnderwritingRequirements: boolean = false;
    allowProcessDesignUnderwritingTable: boolean = false;
    allowProcessDesignUnderwritingQuestions: boolean = false;
    allowTaskSetup: boolean = false;
    allowTariffs: boolean = false;
    allowReinsuranceTreaties: boolean = false;
    allowAgentType: boolean = false;
    allowAgentBand: boolean = false;
    allowAgentProductGrouping: boolean = false;
    allowAgentCommissionCode: boolean = false;
    allowAgentLoanType: boolean = false;
    allowAgentGeneratesRates: boolean = false;
    allowAgentInterestRates: boolean = false;
    allowAgentBonusRates: boolean = false;
    allowDiscountRates: boolean = false;
    allowTaxRates: boolean = false;
    allowShortTermRates: boolean = false;
    allowOrganisationAppraisalIndividual: boolean = false;
    allowOrganisationAppraisalTerm: boolean = false;
    allowOrganisationAppraisalSubDivision: boolean = false;
    allowOrganisationAppraisalDivision: boolean = false;
    allowOrganisationAppraisalCompany: boolean = false;
    allowOrganisationBranches: boolean = false;
    allowOrganisationCompanies: boolean = false;
    allowAddressCountry: boolean = false;
    allowAddressRegion: boolean = false;
    allowAddressState: boolean = false;
    allowAddressTown: boolean = false;
    allowCodeVehicleBrand: boolean = false;
    allowCodeVehicleMake: boolean = false;
    allowCodeVehicleModel: boolean = false;
    allowCodeVehicleCertMgt: boolean = false;
    allowGeneralRates: boolean = false;
    allowInterestRates: boolean = false;
    allowBonusRates: boolean = false;
}

export class UserMenuWorkflow {
    id: number;
    allowWorkflowOverview: boolean = false;
    allowCreateNewWorkflowTask: boolean = false;
    allowFindWorkflowTask: boolean = false;
    allowCreateNewWorkflowSchedule: boolean = false;
}