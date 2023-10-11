interface IAsset {
  aptNoInsured: string;
  assetDeclBasis: string;
  authDrvNo: number;
  category: string;
  chasisNo: string;
  country: string;
  description: string;
  engineNo: number;
  geolocation: string;
  imei: number;
  insuredPortionBldg: string;
  location: string;
  locationRegion: string;
  mvClient: string;
  natureGoods: string;
  noAptBldg: number;
  noFloors: number;
  noRmInsured: number;
  ownerClientNo: string;
  ownerName: string;
  policy: boolean;
  propertyType: string;
  propertyUsage: string;
  purValue: string;
  registrationNo: string;
  relationship: string;
  riskCategory: string;
  state: string;
  town: string;
  trailer: boolean;
  type: string;
  vehicleBrand: string;
  vehicleGenre: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleType: string;
  vehicleUsage: string;
  vin: number;
  yrConstr: string;
  yrManuf: string;
}

interface IAssetSpecification {
  axle: string;
  bodyColour: string;
  bodyType: string;
  constrStatus: string;
  displacement: string;
  dualControl: boolean;
  engineType: string;
  fuelType: string;
  horsePower: number;
  noDoor: number;
  noSeat: number;
  noValves: number;
  surfaceArea: string;
  tonnage: number;
  transmission: string;
  weight: number;
  windowType: string;
}

interface IAssetTracker {
  tracked: boolean;
  trackerId: string;
}

interface IAssetUwQuest {
  factory: boolean;
  factoryUsage: string;
  fuelStation: boolean;
  hazardWithinPer: boolean;
  sawmill: boolean;
}

interface IAssetValue {
  adjValue: number;
  ccy: string;
  monthlyRent: number;
  mvAdj: number;
  mvClient: number;
  purValue: number;
}

interface IClientRelatedAsset {
  clientNo: string;
  fullName: string;
  relationship: string;
}

export interface IAssetSubmitPayload {
  asset: IAsset;
  assetSpecification: IAssetSpecification;
  assetTracker: IAssetTracker;
  assetUwQuest: IAssetUwQuest;
  assetValue: IAssetValue;
  clientRelatedAsset: IClientRelatedAsset;
}
