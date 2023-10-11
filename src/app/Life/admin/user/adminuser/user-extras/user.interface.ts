import { ISearchResponse, SortType } from "src/app/Shared/models/index.model";

export interface IUserSearchObj {
  clientNo?: string;
  company?: string;
  email?: string;
  fullName?: string;
  group?: string;
  pageNumber?: number;
  pageSize?: number;
  relManager?: boolean;
  sortBy?: string;
  sortDirection?: SortType;
  subRelManager?: boolean;
  userMenu?: string;
  userName?: string;
}
export type IUserSearchResponse=ISearchResponse<IUserDetail>
export interface IUserDetail {
  allowAuthAgent: boolean;
  allowAuthClient: boolean;
  allowAuthCommAdjust: boolean;
  allowAuthCoupon: boolean;
  allowAuthEndorse: boolean;
  allowAuthPolicy: boolean;
  allowAuthPolicyAcct: boolean;
  allowAuthSetup: boolean;
  allowAuthSnooze: boolean;
  allowAuthSuspenseSwitch: boolean;
  allowReassignWf: boolean;
  allowSnooze: boolean;
  allowTermWf: boolean;
  allowWs: boolean;
  appraisalCode: string;
  appraisalCoy: string;
  authSnoozeWf: boolean;
  clientNo: string;
  directSupervisor: string;
  discountLimit: number;
  divCode: string;
  docBox: string;
  email: string;
  expiryOn: string;
  firstName: string;
  group: string;
  handoverUser: string;
  imageUrl: string;
  language: string;
  lastName: string;
  onBreak: boolean;
  outOfOffice: boolean;
  overrideExistClient: boolean;
  partTimeWeight: number;
  password: string;
  primaryCompany: string;
  relManager: boolean;
  rm: string;
  sendNoticeWf: boolean;
  srm: string;
  subDivCode: string;
  subRelManager: boolean;
  teamCode: string;
  tm: boolean;
  userId: string;
  userJobRole: string;
  userMenu: string;
  userName: string;
  wfAutoReassignUser: boolean;
}
