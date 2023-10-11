import { SortType } from 'src/app/Shared/models/index.model';

export interface IAssetSpec {
  id: number;
  modelCode: number;
  modelName?: any;
  specCode: number;
  specDesc: string;
  value: number;
  unit: string;
  createdDate?: any;
  updatedDate?: any;
}

interface Asset {
  assetNo: string;
  id: number;
  registrationNo: string;
  vehicleType: string;
  vehicleBrand: string;
  vehicleMake: string;
  vehicleModel: string;
  propertyUsage?: any;
  vehicleUsage: string;
  propertyType?: any;
  natureGoods: string;
  aptNoInsured?: any;
  location: string;
  ownerClientNo?: any;
  relationship?: any;
  locationRegion: string;
  geolocation: string;
  state: string;
  country: string;
  town?: any;
  engineNo: number;
  chasisNo: string;
  vin?: any;
  noAptBldg?: any;
  insuredPortionBldg?: any;
  yrConstr?: any;
  yrManuf: string;
  imei?: any;
  policy?: any;
  trailer?: any;
  type: EAssetType;
  ownerName: string;
  description?: any;
  assetDeclBasis?: any;
  category: string;
  vehicleGenre?: any;
  noFloors?: any;
  noRmInsured?: any;
  authDrvNo?: any;
  riskCategory?: any;
}

interface AssetTracker {
  id: number;
  assetNo: string;
  trackerId: string;
  tracked?: any;
}

interface AssetValue {
  id: number;
  assetNo: string;
  adjValue?: any;
  dateTime?: any;
  mvClient?: any;
  mvAdj?: any;
  purValue?: any;
  ccy?: any;
  monthlyRent?: any;
}

interface AssetSpecification {
  id: number;
  assetNo: string;
  fuelType: string;
  horsePower: number;
  tonnage: number;
  transmission: string;
  displacement: string;
  dualControl?: any;
  constrStatus?: any;
  noSeat: number;
  noDoor?: any;
  engineType?: any;
  bodyType?: any;
  weight?: any;
  axle?: any;
  windowType?: any;
  bodyColour?: any;
  surfaceArea?: any;
  noValves?: any;
}

interface AssetUwQuest {
  id: number;
  assetNo: string;
  hazardWithinPer?: any;
  sawmill?: any;
  fuelStation?: any;
  factory?: any;
  factoryUsage?: any;
}

interface ClientRelatedAsset {
  id: number;
  clientNo?: any;
  assetNo: string;
  relationship?: any;
  relDate?: any;
  fullName?: any;
}

export interface IAssetDetail {
  asset: Asset;
  assetTracker: AssetTracker;
  assetValue: AssetValue;
  assetSpecification: AssetSpecification;
  assetUwQuest: AssetUwQuest;
  clientRelatedAsset: ClientRelatedAsset;
  fileNames: string[];
}

export enum EAssetType {
  motor = 'M',
  property = 'P',
  mobile = 'T',
  machinery = 'MC',
}
export interface IAssetSummary {
  aptNoInsured?: any;
  assetDeclBasis?: any;
  assetNo: string;
  authDrvNo?: any;
  category?: any;
  chasisNo?: any;
  country?: any;
  description?: any;
  engineNo?: any;
  geolocation?: any;
  id: number;
  imei?: any;
  insuredPortionBldg?: any;
  location?: any;
  locationRegion?: any;
  mvClient?: any;
  natureGoods: string;
  noAptBldg?: any;
  noFloors?: any;
  noRmInsured?: any;
  ownerClientNo: string;
  ownerName: string;
  policy: boolean;
  propertyType: string;
  propertyUsage: string;
  purValue?: any;
  registrationNo?: any;
  relationship?: any;
  riskCategory?: any;
  state?: any;
  town?: any;
  trailer: boolean;
  type: string;
  vehicleBrand?: any;
  vehicleGenre?: any;
  vehicleMake?: any;
  vehicleModel?: any;
  vehicleType?: any;
  vehicleUsage?: any;
  yrConstr?: any;
  yrManuf?: any;
}

export const ActiveAssetTypes = [
  { label: 'Motor', value: EAssetType.motor, isActive: true },
  { label: 'Property', value: EAssetType.property, isActive: true },
  { label: 'Mobile Phone', value: EAssetType.mobile, isActive: false },
  { label: 'Machinery', value: EAssetType.machinery, isActive: false },
];
