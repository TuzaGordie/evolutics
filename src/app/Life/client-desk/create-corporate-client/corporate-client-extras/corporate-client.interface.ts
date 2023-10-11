interface ICompanyInformation {
  address: string;
  addressCountry: string;
  addressRegion: string;
  addressState: string;
  addressTown: string;
  clientNo: string;
  companyRedgNo: string;
  countryOfRegistration?: any;
  email: string;
  fullName: string;
  phoneNumber: string;
  sector: string;
  segment: string;
  website: string;
}

interface IContactInformation {
  category?: any;
  clientNo: string;
  clientStatus?: any;
  codeTitle?: any;
  createdBy?: any;
  email: string;
  fullName: string;
  id: number;
  phoneNumber: string;
  policyCode?: any;
  policyNo?: any;
  relationship: string;
  relClientNo?: any;
  relDt?: any;
  userCode?: any;
}

interface IDirector {
  category?: any;
  clientNo: string;
  clientStatus?: any;
  codeTitle?: any;
  createdBy?: any;
  email: string;
  fullName: string;
  id: number;
  phoneNumber: string;
  policyCode?: any;
  policyNo?: any;
  relationship: string;
  relClientNo?: any;
  relDt?: any;
  userCode?: any;
}

interface IPaymentInformation {
  accountName?: any;
  accountNo: string;
  accountType?: any;
  active?: any;
  authBy?: any;
  bankAdd?: any;
  bankBranch?: any;
  bankCity?: any;
  bankName?: any;
  bankSwiftCd?: any;
  bankTown?: any;
  blocked?: any;
  blockedDate?: any;
  clientNo: string;
  country?: any;
  currency?: any;
  id: number;
  no?: any;
  payeeNo: string;
  sortCode?: any;
}

export interface ICorporateClient {
  companyInformation: ICompanyInformation;
  contactInformation: IContactInformation[];
  directors: IDirector[];
  fileNames?: string[];
  paymentInformation: IPaymentInformation;
}
