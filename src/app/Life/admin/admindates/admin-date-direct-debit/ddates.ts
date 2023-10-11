export class CreateDdates{
    constructor(
        public ddates: Ddates[]
    ){}
}

export class Ddates{
    id: number;
    ddMethod: string;
    date: string;
    rowId: number;
}