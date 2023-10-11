export interface IDashboardData {
  workflowSummary: {
    totalNew: number;
    totalCloseToSLA: number;
    totalEscalated: number;
    totalOutsideSLA: number;
    totalSnoozed: number;
  };
  A_WorkflowTasks: WorkflowTask[];
}

export interface WorkflowTask {
  colorCode: string;
  business: string;
  title: string;
  refCategory: string;
  refNo: string;
  start: string;
  due: string;
  timeOutsideSLA: string;
}

export interface ITasksSummary{
  YellowTasks: number,
  BlackTasks: number,
  RedTasks: number,
  SnoozeTasks: number,
  GreenTasks: number
}