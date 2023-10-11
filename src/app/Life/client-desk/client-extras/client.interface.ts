import { KeyValue } from '@angular/common';
import { KVP, SortType } from 'src/app/Shared/models/index.model';

export interface IClientUniqueObj {
  alternativeEmail?: string;
  alternativePhoneNumber?: string;
  bvn?: string;
  email?: string;
  idNumber?: string; 
  idType?: string;
  nationalInsuranceNumber?: string;
  pageNumber?: number;
  pageSize?: number;
  pensionCommissionNumber?: string;
  phoneNumber?: string;
  sortBy?: string;
  sortDirection?: SortType;
  tin?: string;
}
export interface IClientSearchObj {
  createDateFrom?: string;
  createDateTo?: string;
  createdBy?: string;
  email?: string;
  externalRef?: string;
  name?: string;
  phoneNo?: string;
}

export enum EClientType {
  individual = 'I',
  corporate = 'C',
  provider = 'P',
}
export const ConfigClientTypes: KeyValue<EClientType, string>[] = [
  { key: EClientType.individual, value: 'Individual' },
  { key: EClientType.corporate, value: 'Corporate' },
];
export interface IClientSearchResult {
  authorizedBy?: string;
  busLine: string;
  clientNo: string;
  compstringCode?: string;
  compstringRedgNo: string;
  countryOfBirth?: string;
  createdOn: string;
  crmClientNo?: string;
  externalRef?: string;
  externalRef2?: string;
  firstName: string;
  fullName: string;
  providerNo: string;
  gender: string;
  id: number;
  language?: string;
  maidenName?: string;
  middleName: string;
  motherMaidenName?: string;
  salutation?: string;
  source?: string;
  statusCode?: string;
  surname: string;
  title?: string;
  type: EClientType;
  webApproval?: boolean;
}
