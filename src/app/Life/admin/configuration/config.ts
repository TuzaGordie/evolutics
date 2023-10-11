export class CreateConfig{
    constructor(
        public rowId: number,
        public config: Config,
        public configLanguage: ConfigLang[]
    ){}
}

export class Config{
    id: number;
    code: string;
    pswdCaseSens: boolean;
    maxLogin: number;
    currConverter: string;
    minPswdLen: number;
    forcePswdAfter: number;
    timeOutAfter: number;
    defaultScreen: string;
    autoTranslator: string;
    thirdPartyReceiptGen: string;
    vehicleMv: string;
    ad: string;
    docPrintOption: string;
    vehicleUpdate: string
}

export class ConfigLang{
    id: number;
    language: string;
    rowId: number
}