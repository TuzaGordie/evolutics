
interface IWorkflowTask {
    id: number;
    code: string;
    description?: any;
    taskInstructions: string;
    randomAssign?: any;
    autoAssignToPolicyCreator?: any;
    defaultToSystemAdmin?: any;
    user: string;
    group: string;
    eventOnAssignment: string;
    eventOnCompletion: string;
    eventOnCreation: string;
    hidden?: any;
    preventManualClosing?: any;
    uniqueForPolicy?: any;
    busLine: string;
    taskGroup: string;
    schedule?: any;
    scheduleFrequency: string;
    maintenanceFunctionLink: string;
    eventTrigger: string;
    clientNotMandatory?: any;
    originalSla: string;
    warningSla: string;
    firstOrderEscalateAfter: string;
    secondOrderEscalateAfter: string;
    ifUnclosedAfter: string;
    action: string;
}

interface IWorkflowTaskNext {
    taskCode: string;
    nextTask: string;
    afterEvent: string;
    afterEventTime: string;
    id: number;
}

interface IWorkflowTaskCompany {
    taskCode: string;
    companiesAllowed: string[];
    id: number;
}

interface IChecklistItem {
    id: number;
    mandatory?: any;
    item: string;
}

interface IWorkflowTaskChecklist {
    id: number;
    taskCode: string;
    checklistItems: IChecklistItem[];
    checklistCategory: string;
}

export interface ITaskSetup {
    workflowTask: IWorkflowTask;
    workflowTaskNext: IWorkflowTaskNext;
    workflowTaskCompany: IWorkflowTaskCompany;
    workflowTaskChecklist: IWorkflowTaskChecklist;
}
