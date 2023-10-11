export class CreateCrmUserGroup {
    constructor(
        public crmUserGroup: CrmUserGroup,
        public crmUserGroupBatches: CrmUserGroupBatches[],
        public crmUserGroupDoc: CrmUserGroupDoc[],
        public crmUserGroupPayout: CrmUserGroupPayout[],
        public crmUserGroupTiers: CrmUserGroupTiers[]
    ) { }
}

export class CrmUserGroup {
    group: string;
    defaultAppraisalCode: string;
    description: string;
    defaultMenu: string;
    directSupervisor: string;
    authLimitCommOverride: number;
    authlimitCommOverride: number;
    authLimitPremAdjust: number;
    standBreakDuration: number;
    allowAssignWorkflow: boolean;
    allowSnooze: boolean;
    allowWfTaskLinking: boolean;
    allowWfCancelStatus: boolean;
    allowUnassignWorkflow: string;
    allowUnAssignWorkflow: string;
    discountLimit: number = 0;
    id: number;    
}

export class CrmUserGroupBatches {
    id: number;
    rowId: number;
    deleted: boolean = false;
    batchesAllowed: string;
    createdBy: string = "user";
    userGroup: string
}

export class CrmUserGroupDoc {
    id: number;
    rowId: number;
    deleted: boolean = false;
    createdBy: string = "user";
    docCategory: string;
    sensitivity: string;
    userGroup: string
}

export class CrmUserGroupPayout {
    id: number;
    rowId: number;
    createdBy: string = "user";
    currCode: string;
    payoutLimit: string;
    userGroup: string
    deleted: boolean = false;
}

export class CrmUserGroupTiers {
    id: number;
    rowId: number;
    createdBy: string = "user";
    currCode: string;
    limit: number;
    tierCategory: string;
    tierCode: string;
    userGroup: string
    deleted: boolean = false;
}