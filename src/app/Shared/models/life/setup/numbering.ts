export class Numbering {
    constructor(
        public numberings: Numberings[]
    ) { }
}

export class Numberings {
    rowId: number;
    busLine: string;
    companyCode: string;
    integerDigitBasis: string;
    noIntegerDigit: number;
    numberingBasis: string;
    numberingCode: string;
    yearBasis: string;
    enrolleeSuffBasis: string;
    createdBy: string = "User";
}