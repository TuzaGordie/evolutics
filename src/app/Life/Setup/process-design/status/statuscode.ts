export class CreateStatusCode {
    constructor(
        public statusCode: StatusCode,
        public statusCodeDestination: StatusCodeDestination[]
    ) { }
}

export class StatusCode {
  allowBonus: boolean = false;
  allowCashReceipt: boolean = false;
  allowClaim: boolean = false;
  allowEndorse: boolean = false;
  allowInterest: boolean = false;
  allowPremColl: boolean = false;
  allowReceiptReversal: boolean = false;
  allowReins: boolean = false;
  code: string;
  companyCode: string;
  description: string;
  id: number;
  incomplete: boolean = false;
  processGroup: string;
  processNode: number;
  statusCode: string;
}

export class StatusCodeDestination {
    rowId: number;
    id: number;
    destStatus: string;
}