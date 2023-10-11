export interface ICreateLeadClassification {
  company: string;
  description: string;
  destinationStatus: Ideststatus[];
  leadStatusCode: string;
  processNode: number;
}

export interface Ideststatus {
  destinationStatus: string;
}

export interface IMarketingEvent {
  description: string;
  company: string;
  currency: string;
  estimatedEventCost: number;
  partnerName: string;
  partnerNo: string;
  locationList: ILocation[];
  marketingExpectList: IExpectation[];
}

export interface ILocation {
  eventCountry: string;
  eventRegion: string;
  eventAddress: string;
  eventCity: string;
  eventTown: string;
  dateFrom: string;
  dateTo: string;
}

export interface IExpectation {
  attribute: string;
  valueExpected: number;
}

export interface ICreateCampaign {
  campaignCost: number;
  controlGroup: string;
  costCurrency: string;
  description: string;
  endDate: string;
  expectRequests: IExpect[];
  recurrence: string;
  sendTime: ISendTime;
  startDate: string;
  targetGroup: string;
  template: ITemplate[];
}

export interface ITemplate {
  medium: string;
  template: string;
}

export interface IExpect {
  attribute: string;
  condition: 0;
  value: string;
}

export interface ISendTime {
  hour: number;
  minute: number;
  nano: number;
  second: number;
}

export interface IAgeGroup {
  active: boolean;
  ageFrom: number;
  ageTo: number;
  authBy: string;
  authOn: string;
  code: string;
  description: string;
}

export interface ICreateTeamCode {
  category: string;
  channel: string;
  company: string;
  description: string;
  teamMembers: ISalesPersonnel[];
  teamCodeLinked: string;
  teamLead: string;
  teamLeadName: string;
  teamTeamDescription: string;
  salesTeamTeam: IsalesTeam[];
}

export interface ISalesPersonnel {
  salesPersonnelCode: string;
  salesPersonnelName: string;
}

export interface IsalesTeam {
  teamCodeLinkedtest: string;
  teamTeamDescription: string;
}

export interface IDataScore {
  bank: boolean;
  bvn: boolean;
  clientDataScore: number;
  clientId: number;
  description: string;
  dob: boolean;
  email: boolean;
  employment: boolean;
  fullName: boolean;
  gender: boolean;
  id: number;
  income: boolean;
  maritalStatus: boolean;
  nin: boolean;
  phoneNumber: boolean;
  policy: boolean;
  surname: boolean;
}
