import { ICodeTitle } from 'src/app/Shared/models/index.model';
import { IRateVersion } from '../../rates-extras/rates.model';

export interface ILookupParams {
  bandParameter: string;
  lookupValue: string;
}
export interface IMatrixParams {
  axisXValue: string;
  axisYValue: string;
}

export interface IRateValue {
  alpha?: string;
  colValue: string ;
  rowValue: string ;
  value: any;
}

export interface IRateValuesMetadata {
  keys: {
    key1: string;
    key2: string;
    key3: string;
    key4: string;
    key5: string;
  };
  rateVersion: IRateVersion;
}

export interface IRateValuesQueryMetadata {
  ratePartition1: string;
  ratePartition2: string;
  ratePartition3: string;
  ratePartition4: string;
  ratePartition5: string;
  versionNo: string;
  code: string;
}

export interface IRateValues {
  code: string;
  retrievalBasis: string;
  values: [
    {
      keys: {
        key1: string;
        key2: string;
        key3: string;
        key4: string;
        key5: string;
      };
      values: IRateValue[];
      version: IRateVersion;
    }
  ];
}
