import { IDocMetadata } from "src/app/Shared/models/index.model";

export interface IDocument {
    agent: string;
    authorizedUser: string;
    availToPh: boolean;
    branch: string;
    busLine: string;
    clientNo: string;
    company: string;
    createdBy: string;
    createdOn: string;
    createdTime: number;
    crmClientNo: string;
    dispatched: boolean;
    dispatchedDate: string;
    dispatchedTime: number;
    dnNo: string;
    docBox: string;
    docCat: string;
    code: string;
    docKey: string;
    docMapCheck: boolean;
    docSubCat: string;
    documentContent: string;
    documentKey: number;
    documentSource: string;
    emailForm: string;
    emailFrom: string;
    event: string;
    exportNo: number;
    externalRef: string;
    name: string;
    groupNo: string;
    groupQuoteNo: string;
    hidden: boolean;
    how: string;
    memberNo: string;
    originalSla: number;
    policyCode: string;
    policyNo: string;
    quoteNo: string;
    refCat: string;
    refNo: string;
    revisedSla: number;
    saved: boolean;
    senderId: string;
    sensitivity: string;
    spoolFolder: string;
    statement: string;
    taskCode: string;
    title: string;
    upload: string;
    wfNo: string;
}

export interface IDocSensitivityResponse{
    auth: boolean;
    authBy: string;
    authOn: string;
    companyCode: string;
    createdBy: string;
    documentCategory: string;
    documentSubCategory: string;
    id: number;
    sensitivity: string;
}

export interface IDocBoxNoResponse {
    authBy: string;
    authOn: string;
    boxNo: string;
    createdBy: string;
    userTitle: string;
    usersId: number;
}
export interface IFile_Metadata {
  file: File;
  metadata: IDocMetadata;
}
