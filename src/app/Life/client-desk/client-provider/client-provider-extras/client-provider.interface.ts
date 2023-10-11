interface IAccounts {
    coinsuranceFeeClaimFrom: string;
    coinsuranceFeeClaimTo: string;
    coinsuranceFeeCommissionFrom: string;
    coinsuranceFeeCommissionTo: string;
    coinsuranceFeeDueFrom: string;
    coinsuranceFeeDueTo: string;
    coinsuranceFeeMedicalUwFrom: string;
    coinsuranceFeeMedicalUwTo: string;
    coinsuranceFeePremiumFrom: string;
    coinsuranceFeePremiumTo: string;
    companyCode: string;
}

interface ILicense {
    certNo: string;
    licenceExpiry: string;
    licenceLastChecked: string;
    licenceStart: string;
    licenceType: string;
    licensedAuthority: string;
    licensedCondition: string;
}

interface IPaymentDetails {
    frequencyOfPayment: string;
    payeeName: string;
    paymentMethod: string;
}

interface IBranch {
    branchAddress: string;
    branchCity: string;
    branchCode: string;
    branchCountry: string;
    branchName: string;
    branchRegion: string;
    branchState: string;
}

interface IDiscipline {
    discipline: string;
    disciplineCategory: string;
    quantity: number;
    quantityBasis: string;
}

interface IProviderInformation {
    no: any;
    branches: IBranch[];
    busLine: string;
    clientNo: string;
    disciplines: IDiscipline[];
    facilityDescription: string;
    network: string;
    providerCategory: string;
    providerSubCategory: string;
    status: string;
    tariffCode: string;
}

export interface IClientProvider {
    accounts: IAccounts;
    fileNames: string[];
    license: ILicense;
    paymentDetails: IPaymentDetails;
    providerInformation: IProviderInformation;
}
