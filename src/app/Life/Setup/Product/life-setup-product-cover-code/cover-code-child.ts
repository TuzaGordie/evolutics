export class AnnuityDeferredPeriod {
  id: number;
  code: string; 
  deferredPeriod: number; 
}export class AnuityEscalationRateOption {
    id: number
    code: string;
    rowId: number;
    annuityEscRate: number;
    escalBasis: string;
    escalIndex: string
}

export class AnnuityGuaranteePeriod {
    id: number
    code: string;
    rowId: number;
    annuityGuarPeriod: number;
}

export class AnnuityReversionaryRateOption {
    id: number
    code: string;
    rowId: number;
    annuityRevPercent: number;
}

export class CompaniesAllowed {
    id: number
    rowId: number
    companyAllowed: string;
    active: boolean = false;
}

export class CurrencyAllowed {
    id: number
    currencyAllowed: string;
    active: boolean = false
    rowId: number
}

export class PaymentOutMethodAllowed {
    id: number;
    rowId: number;
    payoutMethod: string
}

export class CoversCommissionRates {
    versionNo: number;
    agentType: string;
    hierarchyCommission: number;
    writingCommission: number
    id: number;
    rowId: number;
}

export class CoversCommissionVersions {
    id: number;
    rowId: number;
    versionDate: string;
    versionNo: number = 1
}

export class PremiumFrequency {
    factor: number;
    frequency: string;
    method: string;
    rowId: number;
    id: number
}

export class QuotationFormsToBeAttached {
    id: number
    rowId: number
    attachForm: string
}