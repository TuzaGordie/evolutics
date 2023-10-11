export interface ICurrencyState {
    description: string
    code: string
}

export interface ICreateCurrency {

    code: string;
    description: string;
    isoNumericCode: string;
    nlCurrCode: string;
    noOfDecimals: number;
    numberBasis: string;
    shortDesc: string;

}

export interface ICreateCurrencyRate{

        buyRate: number;
        day: number;
        fromCurr: string;
        month: number;
        sellRate: number;
        toCurr: string;
        year: number;

}