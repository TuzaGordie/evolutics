import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
;
import { ApiService } from 'src/app/Services/api.service';
import { ICodeDescription, ICodeTitle } from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import { ICreateLead } from './sales-lead-create.model';

@Injectable({
  providedIn: 'root',
})

export class SalesExtrasService {
  reportGroupList: any;
  private get baseURL() {
    return environment.apiBaseUrl + '/rest/';
  }
  constructor(private apiService: ApiService) {}



  getDetailsByClientNo = (clientNo: string) => {
    return this.apiService.get<any>(
      this.baseURL + `client/view/${clientNo}`
    );
  };

  getAgentName =  (agentNo: string) => {
    return this.apiService.getText(
      this.baseURL + `agent/name/${agentNo}`
    );
  };

  getCompanyCodeAndDesc = () => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `company/code/desc`
    );
  };

  getRelManager = (name:string) => {
    return this.apiService.get<any>(
      this.baseURL + `users/search?${'relManager=true'}&'fullName='${name}`
    )
  }
  getCodeSubGroup = (value: string) => {
    return this.apiService.get<ICodeTitle[]>(
      this.baseURL + `codes/sub/category/${value}`
    );
  };

  getProductByCompany = (value: string) => {
    return this.apiService.get<ICodeTitle[]>(
      this.baseURL +  `product/code/desc/company/${value}`
    );
  };

  getTeamCode = () => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `sales/code/desc/insurance`
    );
  };

  getCountry = () => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `location/country/code/desc`
    );
  };

  getCity = () => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `location/state`
    );
  };

  getRegion = () => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `location/region`
    );
  };

  getTownByCity = (cityCode:String) => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `location/town/${cityCode}`
    );
  };

  getRegionByCountry = (countryCode:String)  => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `location/region/country/${countryCode}`
    );
  }

  getStateByRegion = (regioncode:String)  => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `location/state/${regioncode}`
    );
  }

  getCurrency = () => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `currency`
    );
  };

  getEventGeneratingProspect = (eventCode:string) =>{
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `marketing/event/code/${eventCode}`
    );
  }

  createLead = (data:ICreateLead, clientNo:number) => {
    return this.apiService
      .post<any>(this.baseURL + `crm/client/lead/${clientNo}`, data).toPromise();
  };

}
