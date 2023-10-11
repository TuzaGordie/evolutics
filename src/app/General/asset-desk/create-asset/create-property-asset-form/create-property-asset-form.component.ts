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
import { CreateAssetService } from '../create-asset.service';

@Component({
  selector: 'app-create-property-asset-form',
  templateUrl: './create-property-asset-form.component.html',
  styleUrls: ['./create-property-asset-form.component.scss'],
})
export class CreatePropertyAssetFormComponent implements OnInit {
  propertTypeData: any[];
  propertyUsageData: any[];
  numberofGoodsProducedData: any[];
  relationshipofAssuredtoPropertyData: any[];
  noofRoomsInInsuredPropertyData: any[];
  countryData: any[];
  regionData: any[];
  insuredPortionofBuildingData: any[];
  stateData: any[];
  townData: any[];
  currencyData: any[];

  @Input() documents: { file: File; metadata: IDocMetadata }[];
  loading: boolean;
  constructor(
    public aS: AssetService,
    public caS: CreateAssetService,
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
    this.caS.init()
    this.caS.setTypeAsProperty();
  }
 
  getPropertyType() {
    this.aS.getPropertyType().subscribe((data: any) => {
      this.propertTypeData = data;
    });
  }
  getPropertyUsage() {
    this.aS.getPropertyUsage().subscribe((data: any) => {
      this.propertyUsageData = data;
    });
  }

  getNumberofGoodsProduced() {
    this.aS.getNumberofGoodsProduced().subscribe((data: any) => {
      this.numberofGoodsProducedData = data;
    });
  }

  getRelationshipofAssuredtoProperty() {
    this.aS.getRelationshipofAssuredtoProperty().subscribe((data: any) => {
      this.relationshipofAssuredtoPropertyData = data;
    });
  }

  getCountry() {
    this.aS.getCountry().subscribe((data: any) => {
      this.countryData = data;
    });
  }

  getNoofRoomsInInsuredProperty() {
    this.aS.getNoofRoomsInInsuredProperty().subscribe((data: any) => {
      this.noofRoomsInInsuredPropertyData = data; 
    });
  }

  getRegion() {
    this.aS.getRegion().subscribe((data: any) => {
      this.regionData = data;
    });
  }

  getInsuredPortionofBuilding() {
    this.aS.getInsuredPortionofBuilding().subscribe((data: any) => {
      this.insuredPortionofBuildingData = data;
    });
  }

  getState() {
    this.aS.getState().subscribe((data: any) => {
      this.stateData = data;
    });
  }

  getTown() {
    this.aS.getTown().subscribe((data: any) => {
      this.townData = data;
    });
  }

  getCurrency() {
    this.aS.getCurrency().subscribe((data: any) => {
      this.currencyData = data;
    });
  }
}
