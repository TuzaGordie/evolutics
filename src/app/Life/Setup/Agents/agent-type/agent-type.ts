export interface AgentType {
    agentSetupType: {
        id?: number
        agentBandBasis: string,
        type: string,
        basicSalary: number,
        channel: string,
        commTaxRate: number,
        company: string,
        defaultBranch: string,
        description: string,
        fixedNoAgentUnit: number,
        fixedNoOfAgentsAgency: number,
        holdComm: boolean,
        maxNoOfAgents: number,
        maxNoOfUnitsAgency: number,
        maxSalAchievable: number,
        minNoOfAgents: number,
        minNoOfUnitsAgency: number,
        production: number,
        commStatementActionBasis: string,
        salaryFreq: string,
        salaryLevel: string,
    },
    agentSetupTypePayment: [
        {
            rowId?: number,
            id?: number,
            currCode: string,
            minPayAmount: number
        }
    ],
    agentSetuptypeVersion: {
        id?: number
        versionNo: number
    }
}
