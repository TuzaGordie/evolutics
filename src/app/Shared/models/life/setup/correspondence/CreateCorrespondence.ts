export class CreateCorrespondence {
  constructor(
    public correspondence: Correspondence = new Correspondence(),
    public correspondenceJoinTemplateList: CorrespondenceJoinTemplateList[] = [new CorrespondenceJoinTemplateList()],
    public correspondenceDocLinkList: CorrespondenceDocLinkList[] = [new CorrespondenceDocLinkList()],
    public correspondenceFilterList: CorrespondenceFilterList[] = [new CorrespondenceFilterList()],
    public correspondenceOutputFieldList: CorrespondenceOutputFieldList[] = [new CorrespondenceOutputFieldList()],
    public correspondenceTemplates: CorrespondenceTemplate[] = [
      new CorrespondenceTemplate(), 
    ]
  ) { 
  }
}
export class CorrespondenceTemplate {
  templateCat: string;
  templateCode: string; 
}
export class Correspondence {
  autoAttachWf: string;
  bodyUseTemplate: boolean;
  code: string;
  companyCode: string;
  description: string;
  docCategory: string;
  docSensitivity: string;
  docStatus: string = 'A';
  doNotAutoPrint: boolean;
  doNotSendEmail: boolean;
  emailBcc: string;
  emailBody: string;
  emailBodyTemplate: string;
  emailCc: string;
  emailGateway: string;
  emailSubject: string;
  emailSubjectTemplate: string;
  emailTo: string;
  eventName: string;
  groupCondition: string;
  id: number;
  includeGroup: boolean;
  languageTemplate: boolean;
  masterEmailDoc: boolean;
  mergeProgram: string;
  numberFormat: string;
  otherDocLinked: string;
  pathDocEmailed: string;
  pathDocFailedDelivery: string;
  pathDocNotAutoPrinted: string;
  pathDocNotEmailed: string;
  pdfEnforce: boolean;
  printerPath: string;
  rowId: number;
  saveFolder: string;
  sendBy: string;
  smsBody: string;
  smsCc: string;
  smsGateway: string;
  smsTo: string;
  spoolPath: string;
  subjectUseTemplate: boolean;
  tableGroup: string;
  tableName: string;
  templateCode: string;
  templateName: string;
  templateType: string;
  viewByClient: boolean;
  webhookUrl: string;
}

export class CorrespondenceOutputFieldList {
  public fieldConv: string;
  public fieldLabel: string;
  public patchType() {
    if (this.fieldLabel && !this.fieldType) this.fieldType = 'D';
  }
  public fieldName: string;
  public fieldType: string;
  public rowId: number = 1;
  public id: number;
  public deleted: boolean = false;
}

export class CorrespondenceJoinTemplateList {
  public joinTemplate: string;
  public patchType() {
    if (this.joinTemplate && !this.connectorType) this.connectorType = 'D';
  }
  public connectorType: string;
  public connector: string;
  public labelPrefix: string;
  public rowId: number = 1;
  public id: number;
  public deleted: boolean = false;
}

export class CorrespondenceFilterList {
  public filter: string;
  public operator: string;
  public value: string;
  public connector: string;
  public rowId: number = 1;
  public id: number;
  public deleted: boolean = false;
}

export class CorrespondenceDocLinkList {
  public docLink: string;
  public rowId: number = 1;
  public id: number;
  public deleted: boolean = false;
}
