export class BatchLogReq {
    constructor(
        public batchLog: BatchLog,
        public batchLogDetails: BatchLogDetails[]
    ) { }
}

export class BatchLog {
    batchNo: string;
    description: string;
    endDate: string;
    endTime: number;
    processCode: string;
    code: string;
    processType: string;
    processParameter: string;
    seqNo: number;
    startDate: string;
    startOn: string;
    startTime: number;
    scheduleBasis: string;    
    timeElapsed: number;
    user: string;
    runBy: string;
    lastBatchDate: string;
    nextBatchDate: string;
    lastBatchTime: number;
    nextBatchTime: number
}

export class BatchLogDetails {
    batchLogId: number;
    batchNo: string;
    code: string;
    id: number;
    lineNo: number;
    processType: string;
    processCode: string;
    processName: string;
    select: boolean;
    startOn: string;
    endOn: string;
    timeElapsed: number;
    processParameter: string;
    recordsProcessed: number;
    recordsFail: number;
    recordsSuccess: number;
}