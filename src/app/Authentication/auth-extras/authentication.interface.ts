interface IAuthority {
  authority: ERole;
}
interface UserDetails {
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  authorities: IAuthority[];
  credentialsNonExpired: boolean;
  enabled: boolean;
  password: string;
  username: string;
}
export interface IUser {
  code: string;
  token?: string;
  email: string;
  firstname: string;
  surname: string;
  userDetails: UserDetails;
}

export interface IUserProfile {
  allowAuthAgent?: any;
  allowAuthClient?: any;
  allowAuthCommAdjust?: any;
  allowAuthCoupon: boolean;
  allowAuthEndorse?: any;
  allowAuthPolicy?: any;
  allowAuthPolicyAcct?: any;
  allowAuthSetup?: any;
  allowAuthSnooze?: any;
  allowAuthSuspenseSwitch?: any;
  allowReassignWf?: any;
  allowSnooze: boolean;
  allowTermWf?: any;
  allowWs: boolean;
  appraisalCode: string;
  appraisalCoy?: any;
  authSnoozeWf?: any;
  clientNo: string;
  code: string;
  createdBy: string;
  directSupervisor: string;
  discountLimit: number;
  divCode: string;
  docBox: string;
  email: string;
  expiryOn: string;
  firstName: string;
  fullName: string;
  group: string;
  handoverUser: string;
  id: number;
  imageUrl?: any;
  language: string;
  lastName: string;
  middleName?: string;
  onBreak: boolean;
  outOfOffice: boolean;
  overrideExistClient?: any;
  partTimeWeight: number;
  primaryCompany: string;
  relManager: boolean;
  rm?: any;
  sendNoticeWf: boolean;
  srm?: any;
  subDivCode: string;
  subRelManager: boolean;
  teamCode: string;
  tm: boolean;
  userCode?: any;
  userId?: any;
  userJobRole: string;
  userMenu: string;
  userName:string;
  wfAutoReassignUser?: any;
}

export enum ERole {
  admin = 'ADMIN',
  superAdmin = 'SUPER_ADMIN',
  superUser = 'SUPER_USER',
  user = 'USER',
}
