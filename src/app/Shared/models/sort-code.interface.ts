import { SortType } from "./index.model";

interface IContent {
  address: string;
  city: string;
  code: string;
  country: string;
  hq: boolean;
  sortCode: string;
  title: string;
  town: string;
}
interface ISort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
interface IPage {
  content: IContent[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  sort: ISort;
  totalElements: number;
  totalPages: number;
}
interface ISearchCriteria {
  address: string;
  bankName: string;
  city: string;
  country: string;
  sortCode: string;
  town: string;
}
export interface ISortCodeSearchResponse {
  listSize: number;
  page: IPage;
  pageNumber: number;
  pageSize: number;
  searchCriteria: ISearchCriteria;
}
export interface ISortCodeSearchObj {
  address?: string;
  bankName?: string;
  city?: string;
  country?: string;
  pageNumber?: number;
  sortCode?: string;
  town?: string;
  pageSize?: number;
  sortBy?: string;
  sortDirection?:SortType;
}
