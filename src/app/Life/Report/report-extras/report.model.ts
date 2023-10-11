export interface IFieldNameKVP {
  columnName: string;
  dataType: 'TEXT' | 'NUMBER' | 'BOOLEAN';
}
export interface IReportForm {
  description: string;
  filters: IReportFilter[];
  joiningTables: IReportJoiningTable[];
  outputs: IReportOutput[];
  tableGroup: string;
  primaryTable: string;
  code: string;
  filePath?: string;
  id: string;
  reportGroup: number;
  summary?: number;
  reportHeader: string;
  reportFormat: EReportFormat;
  generateReport: boolean;
  sorts: IReportSort[];
  userGroup: any[];
  webuserGroup?: any[];
  writerId: number;
} 
export enum EReportFormat {
  excel = 'xlsx',
  pdf = 'pdf',
}
export interface IReportFilter {
  id?: any;
  dataType: any;
  connector: 'AND' | 'OR';
  name: string;
  operator: string;
  value: string;
  fieldName: string;
  fieldType: string;
  tableName: string;
}
export interface IReportJoiningTable {
  id?: any;
  fieldName: string;
  tableLink: string;
  tableName: string;
  tableGroup: string;
}
export interface IReportOutput {
  id?: any;
  format: string;
  fieldName: string;
  truncate: string;
  fieldType: string;
  tableName?: string;
}

export interface IReportSort {
  id: any;
  fieldName: string;
  sortBy: string;
  fieldType: string;
  tableName: string;
}

export interface IReportGroup {
  primaryTable: string;
  code: string;
  description: string;
  reportHeader: string;
  reportGroup: string;
  tableGroup: string;
  createdBy: string;
  filePath: string;
  generateReport: boolean;
  writerId: string;
  reportFormat: string;
  filters: IReportFilter[];
  outputs: IReportOutput[];
  userGroup: any[];
  sorts: IReportSort[];
  joiningTables: IReportJoiningTable[];
}
