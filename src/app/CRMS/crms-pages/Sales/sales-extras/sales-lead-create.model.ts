export interface IFieldNameKVP {}
export interface IReportForm {}
export type downloadFormat = 'EXCEL' | 'PDF';

export interface ICreateLead {
  clientAssignment: IClientAssignment;
  clientLeadAppointment: IClientLeadAppointment;
  clientLeadDetails: IClientLeadDetails;
  clientLeadProspect: IClientLeadProspect;
  IClientLeadAppoinment: IClientLeadAppointment;
  clientOpportunity: IClientOpportunity;
}

export interface IClientAssignment {
  agentName: string;
  agentNo: string;
  assignToSelf: true;
  assignToSpecificSalesPersonnel: true;
  autoAssign: true;
  clientNo: string;
  leadQuality: string;
  leadTemperature: string;
  priorityLevel: string;
  relManagerName: string;
  relationshipManager: string;
  teamCat: string;
  teamCode: string;
}

export interface IClientLeadAppointment {
  clientId: 0;
  clientNo: string;
  dateOfNextVisit: string;
  note: string;
  placeOfNextVisit: string;
  timeOfNextVisit: string;
  visitType: string;
}
export interface IClientLeadDetails {
  ageGroup: string;
  alternativeEmail: string;
  alternativePhoneNumber: string;
  annualIncomeBand: string;
  clientNo: string;
  contactAddress: string;
  contactAddressRegion: string;
  contactAddressState: string;
  contactAddressTown: string;
  dateOfBirth: string;
  email: string;
  employer: string;
  employerName: string;
  employmentStatus: string;
  firstName: string;
  fullName: string;
  gender: string;
  maritalStatus: string;
  middleName: string;
  occupationGroup: string;
  phoneNumber: string;
  surname: string;
}

export interface IClientLeadProspect {
  channelGeneratingProspect: string;
  cityProspected: string;
  clientNo: string;
  countryProspected: string;
  eventGeneratingProspect: string;
  prospectGeneratedBy: true;
  prospectingDate: string;
  referrerName: string;
  referrerNo: string;
  regionProspected: string;
  townProspected: string;
}

export interface IClientOpportunity {
  clientNo: string;
  estimatedPremium: 0;
  estimatedPremiumRange: string;
  expectedCurrency: string;
  opportunityList: IOpportunityList[];
}

export interface IOpportunityList {
  companyCode: string;
  productOpportunities: string;
}
