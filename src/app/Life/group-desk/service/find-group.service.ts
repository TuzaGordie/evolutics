import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { IVehicleBrand } from 'src/app/General/setups/codes/vehicles/vehicle-extras/vehicle.model';
import { ApiService } from 'src/app/Services/api.service';
import { IAsset } from 'src/app/Shared/models/life/createAsset/create-person';
import { environment } from 'src/environments/environment';
import { IGroupDesk } from '../group-desk-extras/group-desk.interface';

const baseURL = environment.apiBaseUrl + '/rest';
@Injectable({
  providedIn: 'root',
})
export class FindGroupService {
  groupInfo: any;

  constructor(public http: HttpClient, private api: ApiService) {}

  getAsset(asset_no: string) {
    return this.api
      .get<IAsset>(baseURL + `/asset/${asset_no}`)
      .pipe(shareReplay());
  }

  getVehicleBrandCode(brand_code: string) {
    return this.api
      .get<IVehicleBrand>(baseURL + `/vehicle/brand/${brand_code}`)
      .pipe(shareReplay());
  }

  getGroupList(data: any) {
    // return this.http.get("https://dev-api-evt.herokuapp.com/TestQuotation?QUOTE_NO=" + data)
    return this.api.get<IGroupDesk>(baseURL + '/policy/group/' + data);
  }
  validateGroupNoIdentity(data: any) {
    return this.api.get(baseURL + '/policy/validate?groupNo=' + data);
  }
  getGroupList2() {
    return this.api.get('https://dev-api-evt.herokuapp.com/TestQuotation');
  }

  getInsuranceList() {
    return this.api.get('https://dev-api-evt.herokuapp.com/INSURANCE_TYPE');
  }

  submitAssets(groupFile, file) {
    const postUrl = baseURL + '/policy/group/file';
    const formData = new FormData();
    formData.append('groupFile', JSON.stringify(groupFile));
    formData.append('file', file);

    return this.api.postFile(postUrl, formData);
  }
}
