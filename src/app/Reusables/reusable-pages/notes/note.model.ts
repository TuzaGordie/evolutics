import {  RefCat } from "src/app/Shared/models/index.model";

interface ICustomNote  {resolving:boolean}
export interface INote extends ICustomNote {
    createdBy: string;
    createdOn?: string;
    id: number;
    note: string;
    refCat: RefCat;
    refNo: string;
    resolve: boolean;
    resolvedBy: string;
    resolvedOn?: string;
    updatedBy: string;
    updatedOn?: string;
    visibleToAll?: boolean;
}
