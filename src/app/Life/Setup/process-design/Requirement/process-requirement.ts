export class CreateProcessNb {
    constructor(
        public processNb: ProcessNb,
        public processNbReq: ProcessNbReq[],
        public processNbBand: ProcessNbBand[]
    ) { }
}

export class ProcessNb {
    id: number;
    rowId: number;
    code: string;
    productClass: string;
    description: string;
    companyCode: string;
    productCode: string;
    groupCond: string;
    banded: string;
}

export class ProcessNbReq {
    id: number
    rowId: number;
    bandNo: number;
    description: string;
    nbReq: string;
}

export class ProcessNbBand {
    id: number;
    bandNo: number = 1;
    amount: number;
    rowId: number;
}

export class CreateProcessClaim{
    constructor(
        public processClaim: ProcessClaim,
        public processClaimBand: ProcessClaimBand[],
        public processClaimReq: ProcessClaimReq[]
    ){}
}

export class ProcessClaim{
    id: number;
    code: string;
    type: string;
    description: string;
    companyCode: string;
    prodClass: string;
    productCode: string;
    groupCond: string;
    active: boolean = false;
    banded: boolean = false;
}

export class ProcessClaimBand{
    bandNo: number = 1;
    amount: number;
    id: number;
    rowId: number;
}

export class ProcessClaimReq{
    id: number;
    bandNo: number;
    claimReq: string;
    description: string;
    rowId: number;
}