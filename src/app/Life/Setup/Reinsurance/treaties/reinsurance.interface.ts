export interface ReinsuranceData {
    "treaty": {
        profitSharingCode: string,
        actualPremium: number,
        catEventLimit: number,
        category: string,
        code: string,
        // declaredLimit: number,
        description: string,
        provReinsCommRate: number,
        reinsCommBasis: number,
        reinsCommRate: number,
        reinsCommTable: string,
        reinsPremBasis: string,
        reinsPremRate: number,
        termOsClaimAmt: number,
        reinsPremTable: string,
        retention: number,
        reverseReinsLapseSurr: boolean,
        slidingScaleComm: boolean,
        treatyDateBasis: string,
        treatyEndDate: string,
        treatyStartDate: string,
        declaredPremium: number
        reinsCompany: string,
        // Added
        treatyGroup: string
        sarBasis: string
        claimCashCall: number
        id: number
    }
    treatyReinsCompany: [{
        id: number,
        lineNo: number,
        lowerLimit: number,
        noOfLines: number,
        proportion: number,
        reinsCompanyId: number,
        reinsCompanyShare: number,
        upperLimit: number
    }],
    treatyAgent: [{
        id: number,
        proportion: number,
        reinsAgentNo: string
    }],
    treatyCovers: [{
        id: number,
        coverCode: string,
        linkDate?: string,
        prodClass: string,
        productCode: string
    }]
}