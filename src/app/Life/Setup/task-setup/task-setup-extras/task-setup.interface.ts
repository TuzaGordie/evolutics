interface IWorkflowTask {
  autoAssignToPolicyCreator: string;
  busLine: string;
  firstOrderEscalateAfter: string;
  secondOrderEscalateAfter: string;
  eventOnAssignment: string;
  eventOnCompletion: string;
  eventOnCreation: string;
  eventTrigger: string;
  group: string;
  hidden: string;
  maintenanceFunctionLink: string;
  clientNotMandatory: string;
  originalSla: string;
  preventManualClosing: string;
  randomAssign: string;
  scheduleFrequency: string;
  taskGroup: string;
  taskInstructions: string;
  ifUnclosedAfter: string;
  uniqueForPolicy: string;
  user: string;
  warningSla: string;
  action: string;
  workflowName: string;
}

interface IChecklistItem {
  item: string;
  mandatory?: any;
  description?: any;
}

interface IWorkflowTaskChecklist {
  checklistCategory: string;
  checklistItems: IChecklistItem[];
}

interface IWorkflowTaskCompany {
  companiesAllowed: string[];
}

interface IWorkflowTaskNext {
  afterEvent: string;
  afterEventTime: string;
  nextTask: string;
}

export interface ITaskSetupPayload {
  workflowTask: IWorkflowTask;
  workflowTaskChecklist: IWorkflowTaskChecklist;
  workflowTaskCompany: IWorkflowTaskCompany;
  workflowTaskNext: IWorkflowTaskNext;
}
