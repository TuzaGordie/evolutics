export interface ProcessAction {
    id?: number
    eventCode: string,
    eventAction: string,
    docCodeLinked: string,
    batchLinked: string,
    workFlowLinked: string,
    rowId: number,
    code: string
}


// export interface ProcessActionData{
//     "active": true,
//     "authBy": "string",
//     "authOn": "2022-01-04",
//     "batchLinked": "string",
//     "createdBy": "string",
//     "docCodeLinked": "string",
//     "effOn": "2022-01-04",
//     "eventAction": "string",
//     "eventCode": "string",
//     "processCode": "string",
//     "processSetupId": 0,
//     "workFlowLinked": "string"
//   }