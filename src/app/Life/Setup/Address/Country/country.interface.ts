export interface CountryData {
    country: {
        accValidation: string,
        addressFormat: string,
        alpha3Code: string,
        bankAccountMaxLength: string,
        bankAccountMinLength: string,
        bankingMethod: string,
        code: string,
        group: string,
        description: string,
        directDebitMethod: string,
        isoNumber: number,
        phoneNoBasis: string,
        phoneNoLength: number,
        phoneNoPrefix: number,
        postCodeLookupAllowed: string,
        postcodePrefix: string,
        premiumTaxRateTable: string,
        premiumTaxTable: string,
        sortCodeBasis: string,
        sortCodeOptional: string,
        ttCountryName: string,
        validateSortCode: true
    },
    countryLang: {
        code: string,
        language: string
    }
}