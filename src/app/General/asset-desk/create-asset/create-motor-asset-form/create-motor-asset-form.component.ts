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
import { FormGroup } from '@angular/forms';
import { CreateAssetService } from '../create-asset.service';

@Component({
  selector: 'app-create-motor-asset-form',
  templateUrl: './create-motor-asset-form.component.html',
  styleUrls: ['./create-motor-asset-form.component.scss'],
})
export class CreateMotorAssetFormComponent implements OnInit {
  
   
  VehicleTypeData: any[];
  brandData: any[];
  NatureofgoodstransportedData: any[];
  UsageData: any[]; 
  CategoryData: any[];
  FuelTypeData: any[];
  CurrencyData: any[]; 
    
  @Input() documents: { file: File; metadata: IDocMetadata }[]; 
  @Input() isEdit: boolean
  constructor(
    public aS: AssetService,
    public caS: CreateAssetService,
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
    this.caS.setTypeAsMotor()
  }
  show() {}

  getVehicleType() {
    this.aS.getVehicleType().subscribe((data: any) => {
      this.VehicleTypeData = data; 
    });
  }
  getBrand() {
    this.aS.getBrand().subscribe((data: any) => {
      this.brandData = data; 
    });
  }

  getNatureofgoodstransported() {
    this.aS.getNatureofgoodstransported().subscribe((data: any) => {
      this.NatureofgoodstransportedData = data; 
    });
  }

 
  getUsage() {
    this.aS.getUsage().subscribe((data: any) => {
      this.UsageData = data; 
    });
  }
  getTransmissions = () => {
    return this.cS.getAllCodeByCodeSubGroup('TRANSMISSION');
  }; 
  getFuelType() {
    this.aS.getFuelType().subscribe((data: any) => {
      this.FuelTypeData = data;
    });
  }

  getCurrency() {
    this.aS.getCurrency().subscribe((data: any) => {
      this.CurrencyData = data;
    });
  }
  
}
