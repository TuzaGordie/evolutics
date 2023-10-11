export class Currency {
    code: string;
    description: string;
    isoNumericCode: string;
    nlCurrCode: string;
    noOfDecimals: number;
    numberBasis: string;
    shortDesc: string;
    id: number;
}

export class CurrencyRate {
    buyRate: number;
    day: number;
    fromCurr: string;
    month: number;
    sellRate: number;
    toCurr: string;
    year: number
}