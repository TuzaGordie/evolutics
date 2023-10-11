import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IAsset,
  assetSpecification,
  assetTracker,
  assetUwQuest,
  clientRelatedAsset,
  CreateAsset,
  assetValue,
} from 'src/app/Shared/models/life/createAsset/create-person';
import { LocationService } from 'src/app/Services/location.service';
import { CodeService } from 'src/app/Services/code.service';
import { ClientService } from 'src/app/Services/client.service';
import { AssetService } from '../../asset-desk-extras/asset.service';
import { IDocMetadata } from 'src/app/Shared/models/index.model';
import { StorageService } from 'src/app/Services/storage.service';
import { HttpHeaders } from '@angular/common/http';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-details-create-motor-asset',
  templateUrl: './details-create-asset.component.html',
  styleUrls: ['./details-create-asset.component.scss'],
})
export class DetailsCreateMotorAssetComponent implements OnInit {
  vehicleType: any;
  natureOfGoodstransported: any;
  brand: any;
  enterOwnerName: any;
  make: any;
  estimatedValueByclient: any;
  model: any;
  estimatedValueBySystem: any;
  manufactureYear: any;
  address: any;
  usage: any;
  region: any;
  category: any;
  state: any;
  country: any;
  fuelType: any;
  tonnage: any;
  geolocation: any;
  horsePower: any;
  currency: any;
  noOfSeat: any;
  registrationNo: any;
  noOfAuthorizeddriver: any;
  chasisNumber: any;
  displacement: any;
  enginNumber: any;
  transmission: any;
  tracked: any;
  trailer: any;
  duelControl: any;

  VehicleTypeData: any;
  brandData: any[];
  NatureofgoodstransportedData: any;
  UsageData: any;
  // RegionData: any[];
  CategoryData: any;
  FuelTypeData: any[];
  CurrencyData: any;
  // CountryData: any[];
  // StateData: any;

  createassetsdata: any;

  retrievedOwnerName: any = {};
  private createasset: any;
  clientName: string = '';
  clientNum: string;
  @Input() documents: { file: File; metadata: IDocMetadata }[];
  loading: boolean;
  constructor(
    public aS: AssetService,
    private router: Router,
    public route: ActivatedRoute,
    public lS: LocationService,
    public cS: CodeService,
    public clS: ClientService,
    public sS: StorageService,
    public uS: UtilityService
  ) {}

  ngOnInit(): void {
    this.initializeVariables();

    this.getVehicleType();
    this.getBrand();
    this.getNatureofgoodstransported();
    this.getUsage();
    // this.getRegion();
    // this.getCountry();
    // this.getState();
    this.getFuelType();
    this.getCurrency();
  }

  initializeVariables() {
    this.vehicleType = '';
    this.natureOfGoodstransported = '';
    this.brand = '';
    this.enterOwnerName = '';
    this.make = '';
    this.estimatedValueByclient = '';
    this.model = '';
    this.estimatedValueBySystem = '';
    this.manufactureYear = '';
    this.address = '';
    this.usage = '';
    this.region = '';
    this.category = '';
    this.state = '';
    this.country = '';
    this.fuelType = '';
    this.tonnage = '';
    this.geolocation = '';
    this.horsePower = '';
    this.currency = '';
    this.noOfSeat = '';
    this.registrationNo = '';
    this.noOfAuthorizeddriver = '';
    this.chasisNumber = '';
    this.displacement = '';
    this.enginNumber = '';
    this.transmission = '';
    this.tracked = '';
    this.trailer = '';
    this.duelControl = '';
  }

  show() {}

  getVehicleType() {
    this.aS.getVehicleType().subscribe((data: any) => {
      this.VehicleTypeData = data;
      console.log(data);
    });
  }
  getBrand() {
    this.aS.getBrand().subscribe((data: any) => {
      this.brandData = data;
      console.log(data);
    });
  }

  getNatureofgoodstransported() {
    this.aS.getNatureofgoodstransported().subscribe((data: any) => {
      this.NatureofgoodstransportedData = data;
      console.log(data);
    });
  }

  patchByModel(event) {
    const code = event?.target?.value;
    this.aS
      .getDisplacementByModelCode(code)
      .subscribe((r) => (this.displacement = r ? r[0]?.value : null));
    this.aS
      .getHorsePowerByModelCode(code)
      .subscribe((r) => (this.horsePower = r ? r[0]?.value : null));
    this.aS
      .getTonnageByModelCode(code)
      .subscribe((r) => (this.tonnage = r ? r[0]?.value : null));
  }
  getUsage() {
    this.aS.getUsage().subscribe((data: any) => {
      this.UsageData = data;
      console.log(data);
    });
  }
  getTransmissions = () => {
    return this.cS.getAllCodeByCodeSubGroup('TRANSMISSION');
  };
  checkClientNo() {
    console.log(this.clientNum);
    this.clS
      .getClientNameByNum(this.clientNum)
      .toPromise()
      .then((r) => {
        this.clientName = r || '';
      });
  }
  getFuelType() {
    this.aS.getFuelType().subscribe((data: any) => {
      this.FuelTypeData = data;
      console.log('FuelType', data);
    });
  }

  getCurrency() {
    this.aS.getCurrency().subscribe((data: any) => {
      this.CurrencyData = data;
      console.log(data);
    });
  }

  /*getOwnerClientNo() {
    
    this.createAssetendpointService.getOwnerClientNo(this.enterOwnerClientNo).subscribe((data: any) => {
      this.retrievedOwnerName = data;
      console.log(data);
    })
  }*/

  save() {
    this.loading = true;
    let asset = {} as IAsset;
    let assetSpecification = {} as assetSpecification;
    let assetTracker = {} as assetTracker;
    let assetValue = {} as assetValue;
    let clientRelatedAsset = {} as clientRelatedAsset;
    let assetUwQuest = {} as assetUwQuest;
    let createAsset = {} as CreateAsset;

    asset.chasisNo = this.chasisNumber;
    asset.location = this.address;
    asset.engineNo = this.enginNumber;
    asset.geolocation = this.geolocation;
    asset.trailer = this.trailer;
    asset.ownerName = this.enterOwnerName;
    asset.vehicleType = this.vehicleType;
    asset.vehicleBrand = this.brand;
    asset.natureGoods = this.natureOfGoodstransported;
    asset.vehicleMake = this.make;
    asset.authDrvNo = this.noOfAuthorizeddriver;
    asset.category = this.category;
    asset.registrationNo = this.registrationNo;
    asset.locationRegion = this.region;
    asset.vehicleModel = this.model;
    asset.yrManuf = this.manufactureYear;
    asset.state = this.state;
    asset.vehicleUsage = this.usage;
    asset.country = this.country;

    asset.yrConstr = null;
    asset.vin = null;
    asset.vehicleGenre = null;
    asset.type = 'M';
    asset.town = null;
    asset.riskCategory = null;
    asset.relationship = null;
    asset.propertyUsage = null;
    asset.propertyType = null;
    asset.policy = null;
    asset.ownerClientNo = null;
    asset.noRmInsured = null;
    asset.noFloors = null;
    asset.noAptBldg = null;
    asset.imei = null;
    asset.insuredPortionBldg = null;
    asset.aptNoInsured = null;
    asset.assetDeclBasis = null;
    asset.authDrvNo = null;

    assetSpecification.dualControl = this.duelControl;
    assetSpecification.displacement = this.displacement;
    assetSpecification.fuelType = this.fuelType;
    assetSpecification.horsePower = this.horsePower;
    assetSpecification.tonnage = this.tonnage;
    assetSpecification.transmission = this.transmission;
    assetSpecification.noSeat = this.noOfSeat;
    assetSpecification.windowType = null;
    assetSpecification.surfaceArea = null;
    assetSpecification.weight = null;
    assetSpecification.noValves = null;
    assetSpecification.noDoor = null;
    assetSpecification.axle = null;
    assetSpecification.bodyColour = null;
    assetSpecification.bodyType = null;
    assetSpecification.constrStatus = null;
    assetSpecification.engineType = null;

    assetTracker.tracked = this.tracked;
    assetTracker.trackerId = this.tracked;

    clientRelatedAsset.clientNo = null;
    clientRelatedAsset.fullName = null;
    clientRelatedAsset.relationship = null;

    assetValue.ccy = this.currency;
    assetValue.adjValue = null;
    assetValue.monthlyRent = null;
    assetValue.mvAdj = null;
    assetValue.mvClient = null;
    assetValue.purValue = null;

    assetUwQuest.factory = null;
    assetUwQuest.factoryUsage = null;
    assetUwQuest.fuelStation = null;
    assetUwQuest.hazardWithinPer = null;
    assetUwQuest.sawmill = null;

    createAsset.asset = asset;
    createAsset.assetSpecification = assetSpecification;
    createAsset.assetTracker = assetTracker;
    createAsset.assetValue = assetValue;
    createAsset.clientRelatedAsset = clientRelatedAsset;
    createAsset.assetUwQuest = assetUwQuest;

    // console.log('TodayPost', JSON.stringify(createAsset));

    let data: any = JSON.stringify(createAsset);
    let docc: any = JSON.stringify(
      this.documents.filter((x) => x?.metadata).map((x) => x.metadata)
    );
    console.log('docc', docc);
    console.log('createAsset', data);

    console.log('documents 11', this.documents);
    const uFrm = new FormData();

    uFrm.append('createAsset', data);
    uFrm.append('documents', docc);
    /* uFrm.append('files', this.createAssetendpointService.filenameOwnership); */
    /* for (const item of this.documents) {
      console.log("item",item)
      uFrm.append('files', item.file, item.file.name);
    } */
    for (let i = 0; i < this.documents.length; i++) {
      uFrm.append('files', this.documents[i].file, this.documents[i].file.name);
    }

    this.aS.createAsset(uFrm).subscribe(
      (data) => {
        this.createassetsdata = data;
        this.loading = false;
        console.log('submit response', data);
        // this.connection.searching = false;
        this.sS.saveItem('createAsset', this.createassetsdata);
        this.uS.info(
          `Asset Number ${data?.asset.assetNo} has been created`,
          1,
          null,
          [
            {
              value: 'Create New',
              action:()=>this.router.navigate(['../create/index'], {
                relativeTo: this.route,
              }),
            },
          ]
        );
        // this.router.navigate(['../create/index'], { relativeTo: this.route });
      },
      (error) => {
        console.log(error);
        this.loading = false;
        this.uS.info(`An error occured`, 0);
        //this.connection.searching = false;
        //this.connection.error = true;
      }
    );
  }

  /*checkPolicyNo(value: any) {
    if(value === undefined) {
      this.isPolicyNo = false;
    }else if(value === ''){
      this.isPolicyNo = false;
    }else{
      this.isPolicyNo = true;
    }
  }*/

  /*checkQuoteNo(value: any) {
    if(value === undefined) {
      this.isQuoteNo = false;
    }else if(value === ''){
      this.isQuoteNo = false;
    }else{
      this.isQuoteNo = true;
    }
  }*/
}
