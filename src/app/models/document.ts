export class Document {
  boxNo!: string;
  branch!: string;
  category!: string;
  company!: string;
  defaultSLA!: number;
  modifySLA!: number;
  refCat!: string;
  refNo!: string;
  revisedSLA!: number;
  sensitivity!: string;
  subCategory!: string;
  title!: string;
  policyCode!: string;
}

export class CsvDocument {
  refNo!: string;
  refCat!: string;
  fileName!: string
  title!: string;
  company!: string;
  revisedSLA!: number;
  docBox!: string;
  busLine!: string;
}