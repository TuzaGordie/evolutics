import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { ApiService } from 'src/app/Services/api.service';
import { ICodeTitle } from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import { IAssetSpec, IAssetDetail, IAssetSummary } from './asset.interface';
import { IAssetSearchQuery, IAssetSearchResponse } from './asset.search';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  private baseURL = environment.apiBaseUrl + '/rest';

  noRetry = 0;
  filenameOwnership: any;
  filnamePicture: any;
  filenameOther: any;
  files: File[] = [];
  constructor(public apiService: ApiService) {}

  getAssetByRegNo(assetRegNo: string) {
    return this.apiService.get<IAssetDetail>(
      this.baseURL + `/asset/details/${assetRegNo}`
    );
  }

  getAssetByNo(assetNo: string) {
    return this.apiService.get<IAssetDetail>(this.baseURL + `/asset/${assetNo}`);
  }
  getAssetSummaryByNo(assetNo: string) {
    return this.apiService.get<IAssetSummary>(
      this.baseURL + `/asset/detail/${assetNo}`
    );
  }

  getAssetType() {
    return this.apiService.getWithLocalCache<ICodeTitle[]>(
      this.baseURL + `/codes/sub/group/ASSET_TYPE`
    );
  }
  getHorsePowerByModelCode = (modelCode: string) => {
    return this.apiService.get<IAssetSpec[]>(
      this.baseURL + `/vehicle/spec/14/${modelCode}`
    );
  };
  getTonnageByModelCode = (modelCode: string) => {
    return this.apiService.get<IAssetSpec[]>(
      this.baseURL + `/vehicle/spec/58/${modelCode}`
    );
  };
  getDisplacementByModelCode = (modelCode: string) => {
    return this.apiService.get<IAssetSpec[]>(
      this.baseURL + `/vehicle/spec/33/${modelCode}`
    );
  };

  getVehicleType() {
    return this.apiService.getWithLocalCache(
      this.baseURL + `/codes/sub/group/VEHICLE_TYPE`
    );
  }

  getBrand() {
    return this.apiService.getWithLocalCache(this.baseURL + `/vehicle/brand/code/desc`);
  }

  getNatureofgoodstransported() {
    return this.apiService.get(this.baseURL + `/codes/sub/group/NATURE_GOODS`);
  }

  getMake = async (brandcode: string) => {
    return brandcode
      ? this.apiService
          .getWithLocalCache(this.baseURL + `/vehicle/make/code/desc/${brandcode}`)
          .toPromise()
      : [];
  };

  getModel = async (makeCode: string) => {
    return makeCode
      ? this.apiService
          .getWithLocalCache(this.baseURL + `/vehicle/model/code/desc/${makeCode}`)
          .toPromise()
      : [];
  };

  getUsage() {
    return this.apiService.get(this.baseURL + `/codes/sub/group/VEHICLE_USAGE`);
  }

  getRegion() {
    return this.apiService.getWithLocalCache(
      this.baseURL + `/location/region/country/NGA`
    );
  }

  getState() {
    return this.apiService.getWithLocalCache(this.baseURL + `/location/state/NC`);
  }

  getCountry() {
    return this.apiService.getWithLocalCache(this.baseURL + `/location/country`);
  }

  getFuelType() {
    return this.apiService.getWithLocalCache(this.baseURL + `/codes/sub/group/FUEL_TYPE`);
  }

  getCurrency = () => {
    return this.apiService.getWithLocalCache(this.baseURL + `/currency/`);
    // return this.apiService.getWithCache(this.baseURL + `/currency/active`)
  };
  searchAssets=(searchQuery: IAssetSearchQuery)=> {
    return this.apiService.get<IAssetSearchResponse>(
      this.baseURL + `/asset/search`,
      searchQuery
    );
  }

  getPropertyType() {
    return this.apiService.getWithLocalCache(
      this.baseURL + `/codes/sub/group/PROPERTY_TYPE`
    );
  }

  getPropertyUsage() {
    return this.apiService.getWithLocalCache(
      this.baseURL + `/codes/sub/group/PROPERTY_USAGE`
    );
  }

  getNumberofGoodsProduced() {
    return this.apiService.getWithLocalCache(
      this.baseURL + `/codes/sub/group/NATURE_GOODS`
    );
  }

  getRelationshipofAssuredtoProperty() {
    return this.apiService.getWithLocalCache(
      this.baseURL + `/codes/sub/group/ASSURED_ASSET_REL`
    );
  }

  getCONSTRUCTION_STATUS = () => {
    return this.apiService.getWithLocalCache(
      this.baseURL + `/codes/sub/group/CONSTRUCTION_STATUS`
    );
  };

  getNoofRoomsInInsuredProperty() {
    return this.apiService.getWithLocalCache(this.baseURL + `/vehicle/make/{brandCode}`);
  }

  getInsuredPortionofBuilding() {
    return this.apiService.getWithLocalCache(
      this.baseURL + `/codes/sub/group/INSURED_PORTION_BLDG`
    );
  }

  getTown() {
    return this.apiService.getWithLocalCache(this.baseURL + `/location/town/FCT`);
  }

  createAsset(createAsset: FormData) {
    /*  createAsset.forEach(x=>console.log(x))  */
    //  const headers = new HttpHeaders({ enctype: 'multipart/form-data' });
    return this.apiService.postFile<IAssetDetail>(
      this.baseURL + `/asset`,
      createAsset
    );
  }
}
