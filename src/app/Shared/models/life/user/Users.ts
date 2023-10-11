import { CreateCrmUserGroup } from "./UserGroup";

export class CreateUser {
  constructor(
    public users: User,
    public usersBranch: UserBranch[],
    public usersCompany: UserCompany[],
    public usersPayoutList: UserPayout[],
    public usersTiers: UserTiers[],
    public userWorkingTimes: UserWorkingTimes[],
    public usersOutOfOffice: UserOutOfOffice
  ) {}
}

export class UserOutOfOffice {
  userCode: string;
  outOfOfficeFrom: string;
  outOfOfficeTo: string;
  usersId: number;
  updatedBy: string;
  id: number;
  createdBy: string;
}

export class User {
  allowAuthAgent: Boolean = false;
  allowAuthClient: Boolean = false;
  allowAuthCoupon: Boolean = false;
  allowAuthPolicy: Boolean = false;
  allowAuthPolicyAcct: Boolean = false;
  allowAuthSetup: Boolean = false;
  allowAuthSnooze: Boolean = false;
  allowAuthSuspenseSwitch: Boolean = false;
  allowReassignWf: Boolean = false;
  allowSnooze: Boolean = false;
  allowTermWf: Boolean = false;
  allowWs: Boolean = false;
  appraisalCode: string;
  appraisalCoy: string;
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
  imageUrl: string;
  language: string;
  lastName: string;
  onBreak: Boolean = false;
  outOfOffice: Boolean = false;
  overrideExistClient: Boolean = false;
  partTimeWeight: number;
  password: string;
  primaryCompany: string;
  reliefOfficer: string;
  relManager: Boolean = false;
  sendNoticeWf: Boolean = false;
  status: string;
  subDivCode: string;
  subRelManager: Boolean = false;
  teamCode: string;
  tm: Boolean = false;
  userJobRole: string;
  userMenu: string;
  userName: string;
  wfAutoReassignUser: string;
}

export class UserBranch {
  id: number;
  rowId: number;
  userCode: string;
  branches: string;
  createdBy: string;
  deleted: Boolean = false;
}

export class UserBox {
  authBy: string;
  authOn: string;
  boxNo: string;
  createdBy: string;
  userTitle: string;
  usersId: number;
}

export class UserCompany {
  id: number;
  rowId: number;
  companyCode: string;
  appraisalCompany: string;
  userCode: string;
  createdBy: string;
  deleted: Boolean = false;
}

export class UserBreak {
  outOfOfficeFrom: string;
  outOfOfficeTo: string;
  userCode: string;
  createdBy: string;
}

export class UserPayout {
  id: number;
  rowId: number;
  currCode: string;
  payoutLimit: string;
  userCode: string;
  createdBy: string;
  deleted: Boolean = false;
}

export class UserTiers {
  id: number;
  rowId: number;
  tierCode: string;
  currCode: string;
  limit: number;
  tierCategory: string;
  userCode: string;
  createdBy: string;
  deleted: Boolean = false;
}

export class UserWorkingTimes {
  createdBy?: string;
  closeTime: string;
  openTime: string;
  day: string;
  id?: number;
  rowId?: number;
  deleted?: boolean = false;
}

export class UserGroup extends CreateCrmUserGroup{}
