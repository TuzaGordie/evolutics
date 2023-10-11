export class Receipt {
    agentNo: string;
    amount: number = 0;
    bankAccount: string;
    bankCode: string;
    chequeNo: string;
    id: number;
    coinsDeduct: number = 0;
    commDeduct: number = 0;
    couponNo: string;
    currency: string;
    dedSource: boolean = false;
    dnNo: string;
    effDate: string = new Date().toISOString().split('T')[0]; // default to current date
    netAmount: number;
    companyCode: string;
    branchCode: string;
    clientName: string;
    payInType: string;
    policyCode: string;
    description: string;
    policyNo: string;
    policyNoSuffix: number;
    productCode: string;
    proformaNo: string;
    quoteNo: string;
    productClass: string;
    policyStatus: string;
    clientNo: string;
    reason: string;
    receiptNo: string;
    reconciled: boolean;
    transRefNo: string;
    refNo: string;
    refCat: string;
    uwExpDeduct: number = 0;
    vatDeduct: number = 0;
    whtDeduct: number = 0;
    createdBy: string = "User"
}

export class ReceiptBatch {
    id: number;
    policyNo: string;
    policyCode: string;
    description: string;
    clientName: string;
    amount: number;
    refNo: string;
    refCat: string;
    transRefNo: string;
    reason: string;
}

export class BatchReceiptId {
    id: number;
    reason: string;
}

export class BatchReceiptReconcile{
    constructor(
        public userId: string,
        public batchReconcileInfo: BatchReceiptId[]
    ){}
}

export class CreateBatchReceipt {
    constructor(
        public bankTransaction: Receipt,
        public receiptBatches: ReceiptBatch[]
    ) { }
}