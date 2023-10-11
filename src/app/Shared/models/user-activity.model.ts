export class UserActivity {
  id: number;
  description: string;
  code: EUA;
  constructor(code: EUA, metaStr?: string) {
    this.description =
      (codeToDescriptionMap.find((x) => x.key == code)?.value +
      ' ' +
      (metaStr ? metaStr : ''))?.trim();
    this.code = code;
  }
}
export enum EUA {
  export = 'export',
}
const codeToDescriptionMap = [{ key: EUA.export, value: 'Exported data' }];
