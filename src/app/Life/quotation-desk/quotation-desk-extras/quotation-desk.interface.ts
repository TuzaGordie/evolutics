export interface IQuotation {
    agentNo?: any;
    alpha: string;
    annualisedPremium?: any;
    annuityOnClaimEscalRate: number;
    annuityOnClaimFreq: string;
    annuityOnClaimTermFreq: string;
    annuityOnClaimTermMonths: number;
    applDate: string;
    applOn: Date;
    authBy: string;
    authOn?: any;
    automaticPremiumLoan: boolean;
    benefitAssignedTo?: any;
    branchCode: string;
    busLine: string;
    clientCategory: string;
    code?: any;
    commenceDate: string;
    commenceOn: Date;
    companyCode: string;
    conversionProb: number;
    convertBasis: string;
    convertedBy: string;
    convertedOn?: any;
    convertReason: string;
    convertToPolicy: boolean;
    convertToProd: boolean;
    coverCode: string;
    coverEndOn?: any;
    createdBy: string;
    createdOn: Date;
    currency: string;
    daysToExpiry: number;
    daysToQuoteExpiry: number;
    discCode: boolean;
    examination: boolean;
    externalRef: string;
    fcl: string;
    group: boolean;
    grouped: boolean;
    groupNo: string;
    id: number;
    inComplete: boolean;
    insType: string;
    inSuspense: number;
    issueAge: number;
    issuedOn: string;
    issueOwnerAge: number;
    iterations: number;
    jointOwner: string;
    jointOwnerName: string;
    loanBalance: number;
    loanIntRate: number;
    modifiedOn?: any;
    modifiedUser: string;
    nonMedicalLimit: number;
    noOfAssets: number;
    noOfCovers: number;
    noOfLives: number;
    outSuspense: number;
    ownerClientNo: string;
    ownerCrmClientNo: string;
    ownerName: string;
    ownerPortion: number;
    paidToDate?: any;
    payeeAccount?: any;
    payerAccount?: any;
    payinFreq: string;
    payinMethod: string;
    policyCode: string;
    policyGroupId: number;
    policyNo: string;
    policyNoSuffix: string;
    policyStatus: string;
    policyTermDays: number;
    policyTermMo: number;
    premEscalationRate: number;
    premFreq: string;
    premIndexTable: string;
    premiumDue: number;
    premiumLoanPeriod: number;
    premiumPaid: number;
    premiumTarget: number;
    premPayTermMo: number;
    primaryAgent: string;
    productClass: string;
    productCode: string;
    quoteAuth: boolean;
    quoteAuthBy: string;
    quoteAuthOn?: any;
    quotedByAgent: boolean;
    quotedByClient: boolean;
    quotedByStaff: boolean;
    quotedOn?: any;
    quoteNo: string;
    quoteStatus: string;
    quoteValidDays: string;
    referrerNo: string;
    renewalDate?: any;
    renewalDueOn: string;
    renewedOn?: any;
    rm: string;
    saIndexTable: string;
    seqNo: number;
    srm: string;
    sumAtRisk?: any;
    tmId: string;
    totalPeriodicPremium: number;
    totalSar: number;
    uwPending: boolean;
}