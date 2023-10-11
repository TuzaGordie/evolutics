import { ICodeTitle } from 'src/app/Shared/models/index.model';

export enum RateRetrievalBasis {
  l = 'Lookup',
  m = 'Matrix',
}
export enum ERateRetrievalBasisCode {
  l = 'L',
  m = 'M',
}

export interface IRateRetrievalBasis extends ICodeTitle {
  title: RateRetrievalBasis;
  code: ERateRetrievalBasisCode;
}
export interface IRateEntry {
  axisXValue: string;
  axisYValue: string;
  bandParameter: string;
  category: string;
  code: string;
  description: string;
  durationCalcBasis: string;
  exactAxis: boolean;
  group: string;
  id: number;
  lookupValue: string;
  ratePartition1: string;
  ratePartition2: string;
  ratePartition3: string;
  ratePartition4: string;
  ratePartition5: string;
  ratePartitionOptions1: IRatePartitionOptions;
  ratePartitionOptions2: IRatePartitionOptions;
  ratePartitionOptions3: IRatePartitionOptions;
  ratePartitionOptions4: IRatePartitionOptions;
  ratePartitionOptions5: IRatePartitionOptions;
  rateVersion: IRateVersion[];
  retrievalBasis: string;
  subGroup?: any;
  valueBasis: string;
  valueParameter: string;
  versionDateBasis: string;
}

export interface IRatePartitionOptions {
  partitionTitle: string;
  partitionCode: string;
  partitionValues?: IPartitionValue[];
}

export interface IPartitionValue {
  code: string;
  title: string;
}

export interface IRateVersion {
  id: number;
  code: string;
  versionDate: string;
  versionNo: number;
  genRateId?: any;
}

export interface IUnderwritingVal {
  code: string;
  id: number;
  reqCode?: any;
  companyCode: string;
  description: string;
  type: string;
}
