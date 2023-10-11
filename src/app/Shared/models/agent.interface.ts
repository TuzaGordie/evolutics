interface PaymentInformation {
    id: number;
    agentNo: string;
    clientNo: string;
    bankNo?: any;
    frequency: string;
    commStatementActionBasis?: any;
    commTaxRate: number;
    agentPaymentCurrency?: any;
    currencyRule?: any;
    holdPayments: boolean;
    payeeName: string;
    payoutMethod: string;
    payoutCharge: number;
    payAgentCommToAgency: boolean;
    minPayAmount: number;
    active: boolean;
    payeeNo?: any;
    paymentMethod?: any;
    proportion: number;
    control?: any;
}

interface ProductList {
    agentNo: string;
    id: number;
    clientNo: string;
    permissionLogic?: any;
    productClass: string;
    product: string;
    active?: any;
}

interface AgentInformation {
    id: number;
    no: string;
    clientNo: string;
    type: string;
    email?: any;
    hierarchyManager: string;
    hierarchyAgentNo: string;
    hierarchyAgentType: string;
    branch: string;
    createdBy?: any;
    approved?: any;
    approvedOn?: any;
    name?: any;
    productList: ProductList[];
    servicingAgent?: any;
    approvedBy?: any;
    active?: any;
}

interface License {
    id: number;
    agentNo: string;
    certificateNumber: string;
    expiryDate: string;
    issueDate: string;
    clientNo: string;
    licenceType: string;
    licenseAuthority: string;
    active?: any;
}

export interface IAgentCreationResponse {
    paymentInformation: PaymentInformation;
    agentInformation: AgentInformation;
    license: License;
    fileNames: string[];
}
