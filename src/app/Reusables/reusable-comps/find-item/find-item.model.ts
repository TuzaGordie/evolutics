import { IFormSchema } from 'src/app/Shared/models/form-schema.model';

export interface ISearchFormSchema extends IFormSchema {
  standalone?: boolean;
  action?:(row:any,cell:any)=>any;
}
