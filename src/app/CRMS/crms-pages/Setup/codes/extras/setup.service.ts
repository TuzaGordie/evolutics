import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import {
  ICodeDescription,
  ICodeTitle,
  IMktDescription,
} from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import { ICreateCampaign,    ICreateLeadClassification,   IDataScore,   IMarketingEvent } from './setup.model';

@Injectable({
  providedIn: 'root',
})
export class SetupService {
  private get baseURL() {
    return environment.apiBaseUrl + '/rest/';
  }
  constructor(private apiService: ApiService) {}


  getCompanyCodeAndDesc = () => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `company/code/desc`
    );
  };

  getLeadClassificafion = (companyCode: string) => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `status/code/${companyCode}/${'L'}`
    );
  };


  getLeadClass = () => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `status/code/description/L`
    );
  };


  getLeadClassificationDetails = (leadStatusCode: string) => {
    return this.apiService.get<any[]>(
      this.baseURL + `status/code/lead/classification/details/${leadStatusCode}`
    );
  };

  getCodeSubGroup = (value: string) => {
    return this.apiService.get<ICodeTitle[]>(
      this.baseURL + `codes/sub/category/${value}`
    );
  };


  getTeams = (value: string) => {
    return this.apiService.get<any[]>(
      this.baseURL + `sales/search?teamCat=${value}`
    );
  };

  submitNewLeadClassification = (data: ICreateLeadClassification) => {
    return this.apiService
      .post<ICreateLeadClassification>(
        this.baseURL + 'status/code/lead/classification',
        data
      )
      .toPromise();
  };

  getMarketingEvent = (companyCode: string) => {
    return this.apiService.get<IMktDescription[]>(
      this.baseURL + `marketing/event/code/${companyCode}`
    );
  };

  showMarketingEvent = (mktEventCode: string) => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `marketing/event/details/${mktEventCode}`
    );
  };

  submitMarketingEvent = (data: IMarketingEvent) => {
    return this.apiService
      .post<IMarketingEvent>(this.baseURL + 'marketing/event', data)
      .toPromise();
  };

  getCountry = () => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `location/country/code/desc`
    );
  };

  getRegionByCountry = (countryCode: string) => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `location/region/country/${countryCode}`
    );
  };

  getCityByRegion = (regionCode: string) => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `location/state/${regionCode}`
    );
  };

  getTownByCity = (cityCode: String) => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `location/town/${cityCode}`
    );
  };

  getCurrency = () => {
    return this.apiService.get<ICodeDescription[]>(this.baseURL + `currency`);
  };

  getTargetGroup = () => {
    return this.apiService.get<IClientGroupDescription[]>(this.baseURL + `crm/client/group/search`);
  }

  getControlTargetGroup = (targetGroupCode:string,userInput:string) => {
    return this.apiService.get<ICodeDescription[]>(this.baseURL + `crm/client/calculate/control/group/${targetGroupCode}/${userInput}`);
  }

  getTemplateName = () => {
    return this.apiService.get<ICodeDescription[]>(this.baseURL + `correspondence/document/desc/codes`);
  }

  getUserPrimaryCompany = (userId:string) => {
    return this.apiService.get<any[]>(this.baseURL + `users/${userId}`);
  }

  getClientGroupingByCompanyCode = (companyCode:string) => {
    return this.apiService.get<any[]>(this.baseURL + `crm/client/view/grouping/${companyCode}`);
  }



  getPartnerName(providerNo: string) {
    return this.apiService.get(
      this.baseURL + `client/provider/no/fullName/${providerNo}`
    );
  }

  getAgeGroup = () => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `setup/age-group/view/age/group`
    );
  };

  showAgeGroup =(ageGroupCode) =>{
    return this.apiService.get<any[]>(
      this.baseURL + `setup/age-group/${ageGroupCode}`
    );
  }

   submitAgeGroup = (data: any) => {
    return this.apiService
      .post<any>(this.baseURL + 'setup/age-group', data)
      .toPromise();
  };

  showTeamCode =(teamCode:string) =>{
    return this.apiService.get<any[]>(
      this.baseURL + `sales/team/code/details/${teamCode}`
    );
  }

  submitTeamCode = (data: any) => {
    return this.apiService
      .post<any>(this.baseURL + 'sales/team/code', data)
      .toPromise();
  };

  getTeamLead = () => {
    return this.apiService.get<any[]>(
      this.baseURL + `sales/team/search`
    );
  }

  getPersonnelName(personnelCode: string) {
    return this.apiService.get(
      this.baseURL + `sales/team/search?code=${personnelCode}`
    );
  }
  submitCampaign = (data: ICreateCampaign) => {
    return this.apiService
      .post<ICreateCampaign>(this.baseURL + '/core/rest/campaign', data)
      .toPromise();
  }

  search(data: any) {
    return this.apiService.get<any[]>(
      this.baseURL + 'client/provider/search',
      data
    );
  }

  getCustomerAttributesList(){
    return this.getCodeSubGroup('CUSTOMER_ATTRIBUTES')
  }

  getClientDataScore(){
    return this.apiService.get<any[]>(
      this.baseURL + `setup/client/data/search`
    );
  }

  showClientDataScore(clientDataScore){
    return this.apiService.get<any[]>(
      this.baseURL + `setup/data/score/details/${clientDataScore}`
    );
  }


  submitDataScore = (data: IDataScore) => {
    return this.apiService.post<IDataScore>(this.baseURL + 'setup/data/score',data)
      .toPromise();
  };


}


export interface IClientGroupDescription {
  clientGroup: string;
  description: string;
}
