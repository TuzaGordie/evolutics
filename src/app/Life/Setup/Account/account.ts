export class CreateAccCode {
    constructor(
        public accCode: AccCode,
        public accCodeMapping: AccCodeMapping[]
    ) { }
}

export class AllAccCodes{
    constructor(
        public accCodes: AccCode[],
        public accCodeMappings: AccCodeMapping[]
    ){}
}

export class AccountLedger{
    constructor(
        public accCodes: AccCode,
        public accCodeMappings: AccCodeMapping
    ){}
}

export class AccCode {
    accountGroup: string;
    accountType: string;
    id: number;
    rowId: number;
    code: string;
    description: string;
    ledgerCode: string;
    ledgerId: number;
    reasonCode: string
}

export class AccCodeMapping {
    accountType: string;
    description: string;
    accCode: string
    rowId: number;
    accCodesId: number
    companyCode: string;
    id: number;
    ledgerCode: string;
}