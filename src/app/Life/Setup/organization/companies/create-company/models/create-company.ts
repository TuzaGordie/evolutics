export class CreateCompany {
    constructor(
        public companyAccount: CompanyAccount,
        public companyEmailGatewayIn: CompanyEmailGatewayIn,
        public companyEmailGatewayOut: CompanyEmailGatewayOut[],
        public companyFileLocation: CompanyFileLocation,
        public companyInfo: CompanyInfo,
        public companyPayoutMethods: CompanyPayoutMethod[],
        public companyRates: CompanyRates,
        public companySmsGateway: CompanySmsGateway,
        public companyTiers: CompanyTiers[],
        public companyTolerance: CompanyTolerance[]
    ) { }
}

export class CompanyAccount {
    cnValidDays: number;
    interCoyBal: string;
    interCoyClaimPayable: string;
    interCoyClaimRec: string;
    interCoyClaimWriteOff: string;
    interCoyComm: string;
    interCoyPayable: string;
    interCoyPremium: string;
    id: number;
    createdBy: string = "user";
}

export class CompanyEmailGatewayIn {
    gatewayCode: number;
    active: boolean;
    internal: boolean;
    id: number;
    createdBy: string = "user";
}

export class CompanyEmailGatewayOut {
    gatewayCode: number;
    active: boolean = false;
    internal: boolean;
    id: number;
    rowId: number;
    createdBy: string = "user";
}

export class CompanyFileLocation {
    acctTransPath: string;
    acctUploadPath: string;
    adjUploadPath: string;
    chequeFilePath: string;
    defaultSpoolFolderPath: string;
    directCreditFilePath: string;
    documentUploadPath: string;
    mmFilePath: string;
    smsDocPath: string
    id: number;
    createdBy: string = "user";
}

export class CompanyInfo {
    active: boolean;
    ad: string;
    authBy: string;
    busLine: string;
    clientUniqueBasis: number;
    parent: boolean;
    code: string;
    name: string;
    commDueTermAgent: string;
    coolOffPeriod: number;
    country: string;
    defaultCurrency: string;
    defaultLanguage: string;
    description: string;
    tmRate: string;
    existAgentRate: string;
    newAgentRate: string;
    activeDirectoryUrl: string;
    coInsuranceIdentity: string;
    directAgentNo: string;
    groupConvCurr: string;
    hqAddress: string;
    hqCity: string;
    hqCountry: string;
    hqPhone: string;
    nextPolicyNo: string;
    paymentOutwardCode: string;
    redgNo: string;
    standardWorkHours: number;
    tolerance: number;
    uwValidilityPeriodMo: number;
    yearEndMo: string
    id: number;
    createdBy: string = "user";
}

export class CompanyPayoutMethod {
    payoutMethod: string;
    id: number;
    rowId: number;
    deleted: boolean = false;
    createdBy: string = "user";
}

export class CompanyRates {
    premTaxBasis: string;
    premTaxTable: string;
    matTaxBasis: string;
    surrTaxBasis: string;
    regLevyTable: number;
    stampDutyBasis: string;
    surrTaxTable: number;
    id: number;
    matTaxTable: number;
    regLevyBasis: string;
    stampDutyTable: number;
    createdBy: string = "user";
}

export class CompanySmsGateway {
    gatewayCode: number;
    active: boolean;
    id: number;
    createdBy: string = "user";
}

export class CompanyTiers {
    lineNo: number;
    currCode: string;
    limit: number;
    tierCode: string;
    tierCategory: string;
    id: number;
    rowId: number;
    deleted: boolean = false;
    createdBy: string = "user";
}

export class CompanyTolerance {
    currCode: string;
    tolerance: number;
    id: number;
    rowId: number;
    deleted: boolean = false;
    createdBy: string = "user";
}