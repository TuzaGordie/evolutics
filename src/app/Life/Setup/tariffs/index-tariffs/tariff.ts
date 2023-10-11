export class CreateTariff {
    constructor(
        public tariff: Tariff,
        public tariffValues: TariffValues[],
        public tariffVersions: TariffVersion[]
    ) { }
}

export class Tariff {
    id: number;
    code: string;
    active: boolean = false;
    description: string;
    tariffGroup: string;
    tariffTable: string;
    currCode: string;
    createdBy: string = "user";
}

export class TariffValues {
    rowId: number = 0;
    id: number;
    versionNo: number;
    serviceCategory: string;
    serviceType: string;
    amount: number;
    tariffId: number;
    code: string;
}

export class TariffVersion {
    rowId: number = 0;
    id: number;
    versionNo: number = 1;
    versionDate: string;
    tariffId: number;
    code: string;
}