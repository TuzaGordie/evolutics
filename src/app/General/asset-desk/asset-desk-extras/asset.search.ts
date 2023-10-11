import { ISearchResponse, SortType } from 'src/app/Shared/models/index.model';
import { EAssetType, IAssetSummary } from './asset.interface';

export interface IAssetSearchQuery {
  assetNo: string;
  assetType: EAssetType;
  chasisNo: string;
  createDateFrom: string;
  createDateTo: string;
  engineNo: number;
  externalRef: string;
  groupNo: string;
  ownerClientNo: string;
  ownerName: string;
  pageNumber: number;
  policyNo: string;
  registrationNo: string;
  vehicleBrand: string;
  vehicleMake: string;
  vehicleModel: string;
  pageSize: number;
  sortBy: string;
  sortDirection: SortType;
}

export interface IAssetSearchResponse extends ISearchResponse<IAssetSummary> {}
