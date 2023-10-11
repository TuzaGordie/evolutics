import { CorrespondenceJoinTemplate } from './correspondenceJoinTemplate'
import { CorrespondenceOutputField } from './correspondenceOutputField'

export class Correspondence {
    documentCode: any;
    emailBody: any;
    emailGateway: any;
    description:any;
    emailSubjectTemplate: any;
    emailBodyTemplate: any;
    status: any;
    sendBy: any;
    pathDocNotEmailed: any;
    docCategory: any;
    spoolPath: any;
    emailSubject: any;
    tableName: any;
    emailTo: any;
    emailCc: any;
    emailBcc: any;
    templateName: any;
    autoAttachWf: boolean = true
    otherDocLinked: any;
    correspondenceJoinTemplate!: CorrespondenceJoinTemplate
    correspondenceOutputField!: CorrespondenceOutputField
}
