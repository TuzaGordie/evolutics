export class CreateBatchModel {
  constructor(
    public batchSetup: BatchSetup,
    public batchSetupCompany: BatchSetupCompany,
    public batchSetupProcess: BatchSetupProcess[],
    public batchSetupSchedule: BatchSetupSchedule[]
  ){}
}

export class BatchSetup{
  id: number;
  auto: boolean = false;
  code: string;
  category: string;
  batchLogBasis: string;
  businessLine: string;
  description: string;
  processCode: string;
  processType: string;
  scheduleBasis: string;
  createdBy: string = "user";
}

export class BatchSetupCompany{
  companyCode: string;
  createdBy: string = "user";
  id: number;
}

export class BatchSetupProcess{
    rowId: number;
    hoursAfter: number
    lineNo: number = 1;
    parameter: string;
    parameterBasis: string;
    processCode: string;
    processType: string;
    select: boolean = false;
    type: string;
    createdBy: string = "user";
    id: number;
}

export class BatchSetupSchedule{
  rowId: number;
  companyCode: string;
  scheduleBasis: string;
  scheduleDay: string;
  scheduleTime: string;
  startOn: string;
  createdBy: string = "user";
  active: boolean = false;
  id: number;
}