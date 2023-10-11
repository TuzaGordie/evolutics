import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyAsset } from 'src/app/Shared/models/life/createAsset/property-asset';
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
import { AssetService } from '../../asset-desk-extras/asset.service';
import { IDocMetadata } from 'src/app/Shared/models/index.model';
import { StorageService } from 'src/app/Services/storage.service';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-details-create-property-asset',
  templateUrl: './details-create-asset.component.html',
  styleUrls: ['./details-create-asset.component.scss'],
})
export class DetailsCreatePropertyAssetComponent implements OnInit {
  propertyType: any;
  propertyUsage: any;
  relationshipOfAssuredToproperty: any;
  address: any;
  country: any;
  region: any;
  state: any;
  town: any;
  geolocation: any;
  constructionStatus: any;
  numberOfGoodsProduced: any;
  noOfFloors: any;
  noOfApartmentsInBuilding: any;
  sawmill: any;
  fuelStation: any;
  factory: any;
  noOfRoomsInInsuredProp: any;
  apartmentNosInsured: any;
  currency: any;
  insuredPortionOfBuild: any;
  monthlyRent: any;
  yearOfConstrution: any;
  surfaceArea: any;
  riskCategory: any;

  propertTypeData: any;
  propertyUsageData: any;
  numberofGoodsProducedData: any;
  relationshipofAssuredtoPropertyData: any;
  noofRoomsInInsuredPropertyData: any;
  countryData: any;
  regionData: any;
  insuredPortionofBuildingData: any;
  stateData: any;
  townData: any;
  currencyData: any;

  private createasset: PropertyAsset;

  createassetsdata: any;

  @Input() documents: { file: File; metadata: IDocMetadata }[];
  loading: boolean;
  constructor(
    public assetService: AssetService,
    private router: Router,
    public route: ActivatedRoute,
    public lS: LocationService,
    public sS: StorageService,
    public uS: UtilityService
  ) {}

  ngOnInit(): void {
    this.initializeVariables();
    this.getPropertyType();
    this.getPropertyUsage();
    this.getNumberofGoodsProduced();
    this.getRelationshipofAssuredtoProperty();
    this.getCountry();
    this.getNoofRoomsInInsuredProperty();
    this.getRegion();
    this.getInsuredPortionofBuilding();
    this.getState();
    this.getTown();
    this.getCurrency();
  }

  initializeVariables() {
    this.propertyType = '';
    this.propertyUsage = '';
    this.relationshipOfAssuredToproperty = '';
    this.address = '';
    this.country = '';
    this.region = '';
    this.state = '';
    this.town = '';
    this.geolocation = '';
    this.constructionStatus = '';
    this.numberOfGoodsProduced = '';
    this.noOfFloors = '';
    this.noOfApartmentsInBuilding = '';
    this.sawmill = '';
    this.fuelStation = '';
    this.factory = '';
    this.noOfRoomsInInsuredProp = '';
    this.apartmentNosInsured = '';
    this.currency = '';
    this.insuredPortionOfBuild = '';
    this.monthlyRent = '';
    this.yearOfConstrution = '';
    this.surfaceArea = '';
    this.riskCategory = '';
  }

  show() {}
  getPropertyType() {
    this.assetService.getPropertyType().subscribe((data: any) => {
      this.propertTypeData = data;
      console.log(data);
    });
  }
  getPropertyUsage() {
    this.assetService.getPropertyUsage().subscribe((data: any) => {
      this.propertyUsageData = data;
      console.log(data);
    });
  }

  getNumberofGoodsProduced() {
    this.assetService.getNumberofGoodsProduced().subscribe((data: any) => {
      this.numberofGoodsProducedData = data;
      console.log(data);
    });
  }

  getRelationshipofAssuredtoProperty() {
    this.assetService
      .getRelationshipofAssuredtoProperty()
      .subscribe((data: any) => {
        this.relationshipofAssuredtoPropertyData = data;
        console.log(data);
      });
  }

  getCountry() {
    this.assetService.getCountry().subscribe((data: any) => {
      this.countryData = data;
      console.log(data);
    });
  }

  getNoofRoomsInInsuredProperty() {
    this.assetService.getNoofRoomsInInsuredProperty().subscribe((data: any) => {
      this.noofRoomsInInsuredPropertyData = data;
      console.log('damilare', data);
    });
  }

  getRegion() {
    this.assetService.getRegion().subscribe((data: any) => {
      this.regionData = data;
      console.log(data);
    });
  }

  getInsuredPortionofBuilding() {
    this.assetService.getInsuredPortionofBuilding().subscribe((data: any) => {
      this.insuredPortionofBuildingData = data;
      console.log(data);
    });
  }

  getState() {
    this.assetService.getState().subscribe((data: any) => {
      this.stateData = data;
      console.log(data);
    });
  }

  getTown() {
    this.assetService.getTown().subscribe((data: any) => {
      this.townData = data;
      console.log(data);
    });
  }

  getCurrency() {
    this.assetService.getCurrency().subscribe((data: any) => {
      this.currencyData = data;
      console.log(data);
    });
  }

  save() {
    this.loading = true;
    console.log('country', this.country);

    let asset = {} as IAsset;
    let assetSpecification = {} as assetSpecification;
    let assetTracker = {} as assetTracker;
    let assetValue = {} as assetValue;
    let clientRelatedAsset = {} as clientRelatedAsset;
    let assetUwQuest = {} as assetUwQuest;
    let createAsset = {} as CreateAsset;

    asset.propertyType = this.propertyType;
    asset.propertyUsage = this.propertyUsage;
    asset.geolocation = this.geolocation;
    asset.yrConstr = this.yearOfConstrution;
    asset.locationRegion = this.region;
    asset.town = this.town;
    asset.riskCategory = this.riskCategory;
    asset.noRmInsured = /* this.noOfRoomsInInsuredProp */ 0;
    asset.noAptBldg = this.noOfApartmentsInBuilding;
    asset.noFloors = this.noOfFloors;
    asset.insuredPortionBldg = this.insuredPortionOfBuild;
    asset.location = this.address;
    asset.country = this.country;
    asset.relationship = this.relationshipOfAssuredToproperty;
    asset.state = this.state;
    asset.chasisNo = null;
    asset.engineNo = null;
    asset.trailer = true;
    asset.ownerName = null;
    asset.vehicleType = null;
    asset.vehicleBrand = null;
    asset.natureGoods = null;
    asset.vehicleMake = null;
    asset.authDrvNo = null;
    asset.category = null;
    asset.registrationNo = null;
    asset.vehicleModel = null;
    asset.yrManuf = null;
    asset.vehicleUsage = null;
    asset.vin = null;
    asset.vehicleGenre = null;
    asset.type = 'P';
    asset.policy = null;
    asset.ownerClientNo = null;
    asset.imei = null;
    asset.assetDeclBasis = null;
    asset.authDrvNo = null;

    assetSpecification.dualControl = null;
    assetSpecification.displacement = null;
    assetSpecification.fuelType = null;
    assetSpecification.horsePower = null;
    assetSpecification.tonnage = null;
    assetSpecification.transmission = null;
    assetSpecification.noSeat = null;
    assetSpecification.windowType = null;
    assetSpecification.weight = null;
    assetSpecification.noValves = null;
    assetSpecification.noDoor = null;
    assetSpecification.axle = null;
    assetSpecification.bodyColour = null;
    assetSpecification.bodyType = null;
    assetSpecification.engineType = null;
    assetSpecification.surfaceArea = this.surfaceArea;
    assetSpecification.constrStatus = this.constructionStatus;

    assetTracker.tracked = null;
    assetTracker.trackerId = null;

    clientRelatedAsset.clientNo = null;
    clientRelatedAsset.fullName = null;
    clientRelatedAsset.relationship = this.relationshipOfAssuredToproperty;

    assetValue.ccy = this.currency;
    assetValue.adjValue = null;
    assetValue.mvAdj = null;
    assetValue.mvClient = null;
    assetValue.purValue = null;
    assetValue.monthlyRent = this.monthlyRent;

    assetUwQuest.factoryUsage = null;
    assetUwQuest.hazardWithinPer = null;
    assetUwQuest.factory = this.factory;
    assetUwQuest.fuelStation = this.fuelStation;
    assetUwQuest.sawmill = this.sawmill;

    createAsset.asset = asset;
    createAsset.assetSpecification = assetSpecification;
    createAsset.assetTracker = assetTracker;
    createAsset.assetValue = assetValue;
    createAsset.clientRelatedAsset = clientRelatedAsset;
    createAsset.assetUwQuest = assetUwQuest;

    console.log('Post Test', createAsset);
    console.log('Post Test', JSON.stringify(createAsset));

    let data = JSON.stringify(createAsset);
    let doc = JSON.stringify(
      this.documents.filter((x) => x?.metadata).map((x) => x.metadata)
    );
    console.log('createAsset', data);
    console.log('documents', this.documents);
    /*  let documents: any = [
      {
        boxNo: '4',
        category: 'Asset',
        sensitivity: 'High',
        subCategory: 'AOC',
        title: 'asset',
      },
      {
        boxNo: '5',
        category: 'Asset',
        sensitivity: 'medium',
        subCategory: 'AP',
        title: 'asset',
      },
      {
        boxNo: '6',
        category: 'Asset',
        sensitivity: 'Low',
        subCategory: 'OTH',
        title: 'asset',
        branch: 'asset',
      },
    ]; */
    /* let doc = JSON.stringify(documents); */
    console.log('documents', doc);
    const uFrm = new FormData();

    uFrm.append('createAsset', data);
    uFrm.append('documents', doc);
    /* uFrm.append('files', this.createAssetendpointService.filenameOwnership); */
    /*  for (const item of this.documents) {
      uFrm.append('files', item.file, item.file.name);
    } */
    for (let i = 0; i < this.documents.length; i++) {
      uFrm.append('files', this.documents[i].file, this.documents[i].file.name);
    }
    this.assetService.createAsset(uFrm).subscribe(
      (data: any) => {
        this.createassetsdata = data;
        console.log('submit response', data);
        this.loading = false;
        this.sS.saveItem('createAsset', this.createassetsdata);
        this.uS.info(
          `Asset Number ${data?.asset.assetNo} has been created`,
          1,
          null,
          [
            {
              value: 'Create New',
              action: () =>
                this.router.navigate(['../create/index'], {
                  relativeTo: this.route,
                }),
            },
          ]
        );
        // this.router.navigate(['../create/index'],{relativeTo:this.route});
      },
      (error) => {
        this.loading = false;
        this.uS.info(`An error occurred`, 0);
        //this.connection.searching = false;
        //this.connection.error = true;
      }
    );
  }
}
