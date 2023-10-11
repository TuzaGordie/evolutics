// export interface ProcessSetup {
//     process: ProcessInterface,
//     processProcess: ProcessProcess[],
//     processProdClassFilter: ProcessProdClassFilter[]
// }
// export interface ProcessInterface {
//     id?: string,
//     companyCode: string,
//     processGroup: string,
//     system: boolean
// }
// export interface ProcessProcess {
//     id?: string,
//     action: string,
//     batchLinked: string,
//     docCatTrigger: string,
//     eventTrigger: string,
//     futureActivityTrigger: string,
//     noDays: number,
//     processNodeTrigger: string,
//     when: string
// }
// export interface ProcessProdClassFilter {
//     id?: string,
//     productClass: string,
//     productCode: string
// }

export interface ProcessSetupData {
    processSetup: {
        id?
        active: string,
        authBy: string,
        authOn: string,
        companyCode: string,
        coverCode: string,
        description: string,
        eventCode: string,
        group: string,
        groupCond: string,
        code: string,
        productClass: string,
        productCode: string,
        slaGroup: number,
        system: boolean
    },
    processSetupEvent: ProcessSetupEvent[]
}

export interface ProcessSetupEvent {
    duration: number,
    eventCode: string,
    id: number,
    policyStatus: string,
    processSetupId: number,
    triggerCat: string,
    triggerEvent: string,
    when: string,
    rowId: number
}
