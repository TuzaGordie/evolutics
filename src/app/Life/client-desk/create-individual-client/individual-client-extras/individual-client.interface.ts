interface IEmploymentInformation {
    active: boolean;
    cadre: string;
    companyName: string;
    createdBy: string;
    createdOn: Date;
    educationLevel: string;
    employStatus: string;
    employerClientNo: number;
    employerSector: string;
    employmentDate: string;
    incomeBand: string;
    jobTitle: string;
    occupation: string;
    occupationGroup: string;
    staffNo: string;
}

interface IIdentification {
    bvn: string;
    idExpiryDate: string;
    idNumber: string;
    idType: string;
    nationalInsuranceNumber: string;
    pensionCommissionNumber: string;
    taxIdentificationNumber: string;
}

interface INextOfKin {
    category: string;
    clientStatus: string;
    codeTitle: string;
    createdBy: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    policyCode: string;
    policyNo: string;
    relClientNo: string;
    relDt: string;
    relationship: string;
    userCode: string;
}

interface IPaymentInformation {
    accountName: string;
    accountNo: string;
    accountType: string;
    authBy: string;
    bankAdd: string;
    bankBranch: string;
    bankCity: string;
    bankName: string;
    bankSwiftCd: string;
    bankTown: string;
    blocked: boolean;
    blockedDate: string;
    clientNo: string;
    country: string;
    currency: string;
    no: string;
    payeeNo: string;
    sortCode: string;
}

interface IPersonalInformation {
    clientNo: any;
    address: string;
    addressCountry: string;
    addressGeolocation: string;
    addressRegion: string;
    addressState: string;
    addressTown: string;
    alternativeEmail: string;
    alternativePhoneNumber: string;
    busLine: string;
    dateOfBirth: string;
    email: string;
    firstName: string;
    gender: string;
    maritalStatus: string;
    middleName: string;
    nationality: string;
    phoneNumber: string;
    surname: string;
}

export interface IClientIndividual {
    employmentInformation: IEmploymentInformation;
    identification: IIdentification;
    nextOfKin: INextOfKin[];
    paymentInformation: IPaymentInformation;
    personalInformation: IPersonalInformation;
}
