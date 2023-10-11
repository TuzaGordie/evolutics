import { MenuItem } from "src/app/Shared/models/index.model";

export interface ISearchResponse { 
  menuItems: MenuItem[];
  type: ESearchType; 
}

export enum ESearchType {
  main = 'Services',
  help = 'Help',
}

