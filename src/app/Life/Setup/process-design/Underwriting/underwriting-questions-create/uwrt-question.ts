export class UnderwritingQuestionclass {
    constructor(
        public uwrQuestion: uwrQuestion,
        public uwrQuestionLists: CreateuwrQuestionList[]
    ){}
}

export class CreateuwrQuestionList{
    uwrQuestionList: uwrQuestionList = new uwrQuestionList()
    uwrQuestionListResult: uwrQuestionListResult = new uwrQuestionListResult()
}

export class uwrQuestion {
    id?: number
    code: string
    ageBand: string
    companyCode: string
    condition: string
    description: string
    sumAssuredFilter: string
    triggerBasis: string
    triggerStatus: string
    uwQuestSetCat: string
    currency: string
    createdBy: string
    createdOn: string
    lowerLimitAge: number
    lowerLimitSa: number
    upperLimitAge: number
    upperLimitSa: number
    uwTableCat: string
}

export class uwrQuestionList {
    id?: number
    rowId: number
    detailReq: boolean
    ifYesQuestCode: string
    ifYesQuestSetCode: string
    ifYesText: string
    ifYesListValue: string
    loading: number
    mandatory: boolean
    questCode: string
    responseReq: boolean
    responseType: string
    text: string
    uwQuestionsId: number
    valueFrom: number
    valueTo: number
    valueUnit: string
}

export class uwrQuestionListResult {
    id?: number
    rowId: number
    valueUnit: string
    active: boolean
    valueTo: number
    valueFrom: number
    loading: number
}

