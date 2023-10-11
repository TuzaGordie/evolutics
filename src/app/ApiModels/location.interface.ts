export interface ICountryData {
    addressFormat: string;
    alpha3Code: string;
    bankingMethod: string;
    bankAccountMaxLength: string;
    bankAccountMinLength: string;
    code: string;
    isoNumber: number;
    description: string;
    premiumTaxTable: string;
    postcodePrefix: string;
    postCodeLookupAllowed: string;
    premiumTaxRateTable: string;
    sortCodeOptional: string;
    validateSortCode: string;
    ttCountryName: string;
    directDebitMethod: string;
    accValidation: string;
    countryGroup: string;
    phoneNoBasis: string;
    phoneNoLength: string;
    sortCodeBasis: string;
    phoneNoPrefix: string;
    id: number;
}

export interface IStateState {
    code: string;
    country: string;
    description: string;
    id: number;
    region: string;
}
export interface ILgaState {
    city: string;
    code: string;
    country: string;
    description: string;
    id: number;
    region: string;
}
export interface IRegionState { 
    code: string;
    country: string;
    description: string;
    id: number;
}

export interface ITownState {
    code: string;
    description: string;
}