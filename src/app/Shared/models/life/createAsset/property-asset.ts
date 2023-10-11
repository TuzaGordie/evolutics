export class PropertyAsset {
    asset: asset;
    assetSpecification: assetSpecification;
    assetTracker: assetTracker;
    assetValue: assetValue;
    clientRelatedAsset: clientRelatedAsset;
    assetUwQuest: assetUwQuest;
   
}

export class asset {
  aptNoInsured: string;
  assetDeclBasis: string;
  authDrvNo: number;
  category: string;
  chasisNo: string;
  country: number;
  createdDate: number;
  description: string;
  engineNo: number;
  geolocation: string;
  imei: number;
  insuredPortionBldg: string;
  location: string;
  locationRegion: string;
  natureGoods: string;
  noAptBldg: number;
  noFloors: number;
  noRmInsured: number;
  ownerClientNo: string;
  ownerName: string;
  policy: true;
  propertyType: string;
  propertyUsage: string;
  registrationNo: string;
  relationship: string;
  riskCategory: string;
  state: string;
  town: string;
  trailer: true;
  type: string;
  vehicleBrand: string;
  vehicleGenre: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleType: string;
  vehicleUsage: string;
  vin: number;
  yrConstr: number;
  yrManuf: number;
}

export class assetSpecification {
  axle: string
  bodyColour: string
  bodyType: string
  constrStatus: string
  displacement: string
  dualControl: true
  engineType: string
  fuelType: string
  horsePower: number
  noDoor: number
  noSeat: number
  noValves: number
  surfaceArea: string
  tonnage: number
  transmission: string
  weight: number
  windowType: string
 
}


export class assetTracker {
  tracked: true;
  trackerId: string;
}

export class assetUwQuest{
  factory: true;
  factoryUsage: string;
  fuelStation: true;
  hazardWithinPer: true;
  sawmill: true;
}

export class assetValue {
  adjValue: number;
  ccy: string;
  dateTime: number;
  monthlyRent: number;
  mvAdj: number;
  mvClient: number;
  purValue: number;
}


export class clientRelatedAsset{
  clientNo: string;
  fullName: string;
  relDate: number;
  relationship: string;
}

