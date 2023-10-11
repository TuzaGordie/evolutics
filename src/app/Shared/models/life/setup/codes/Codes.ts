export class Codes {
  constructor(public code: Code[]) {}
}

export class Code {
  codeSubgroup: string;
  code: string;
  codeGroup: string;
  title: string;
  codeCat: string;
  active: boolean = true;
  recType: string;
  id: number;
  rowId: number;
  editable: boolean;
  deleted: boolean = false;
}
