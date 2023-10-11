import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/Services/api.service';
import { ICode, ICodeDescription } from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import {
  IGetSums,
  IIssueCertificate,
  IVehicleBrand,
  IVehicleMake,
  IVehicleMakesInfo,
  IVehicleModel,
  IPreorderCertificate,
  IRegisterNewCertificate,
  ISetUpCertificate,
  IAgentNo,
} from './vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleExtrasService {
  private get baseURL() {
    return environment.apiBaseUrl + '/rest/';
  }
  constructor(private apiService: ApiService) {}

  getVehicleBrand = () => {
    return this.apiService.getWithLocalCache<ICodeDescription[]>(
      this.baseURL + 'vehicle/brand/code/desc'
    );
  };

  submitVehicleBrand = (data: IVehicleBrand) => {
    return this.apiService
      .post<IVehicleBrand>(this.baseURL + 'vehicle/brand/', data).pipe(tap(x=>this.getVehicleBrand()))
      .toPromise();
  };

  modifyVehicleBrand(data: IVehicleBrand, code: string) {
    return this.apiService
      .post<IVehicleBrand>(this.baseURL + 'vehicle/brand/' + code, data)
      .toPromise();
  }

  getVehicleMakes = () => {
    return this.apiService.get<IVehicleMakesInfo[]>(this.baseURL + `vehicle/makes`);
  };

  getVehicleMake = (brandCode: string) => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `vehicle/make/code/desc/${brandCode}`
    );
  };

  getVehicleModelByMakeCode = (makeCode: string) => {
    return this.apiService.get<[]>(this.baseURL + `vehicle/model/${makeCode}`);
  };

  getVehicleModelByModelCode = (modelCode: string) => {
    return this.apiService.get<[]>(this.baseURL + `vehicle/model/${modelCode}`);
  };

  getVehicleModelCodeAndDescriptionByMakeCode = (makeCode: string) => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `vehicle/model/code/desc/${makeCode}`
    );
  };

  submitVehicleMake = (data: IVehicleMake) => {
    return this.apiService
      .post<IVehicleMake>(this.baseURL + 'vehicle/make/', data)
      .toPromise();
  };

  modifyVehicleMake(data: IVehicleMake, code: string) {
    return this.apiService
      .post<IVehicleMake>(this.baseURL + 'vehicle/make/' + code, data)
      .toPromise();
  }

  submitVehicleModel = (data: IVehicleModel) => {
    return this.apiService
      .post<IVehicleBrand>(this.baseURL + 'vehicle/model/', data)
      .toPromise();
  };

  modifyVehicleModel(data: IVehicleModel, code: string) {
    return this.apiService
      .post<IVehicleBrand>(this.baseURL + 'vehicle/model/' + code, data)
      .toPromise();
  }

  submitVehicleModelBySpec = (data: IVehicleBrand) => {
    return this.apiService
      .post<IVehicleBrand>(this.baseURL + 'vehicle/model/spec', data)
      .toPromise();
  };

  modifyVehicleModelBySpec(data: IVehicleBrand, code: string) {
    return this.apiService
      .post<IVehicleBrand>(this.baseURL + 'vehicle/model/spec' + code, data)
      .toPromise();
  }

  getVehicleSpecByModelCode = (modelCode: string) => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `vehicle/spec/${modelCode}`
    );
  };

  getVehicleSpecBySpecAndModelCode = (specCode: string, specModel: string) => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `vehicle/spec/${specCode}/${specModel}`
    );
  };

  getCompanyCodeAndDesc = () => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `company/code/desc`
    );
  };

  getCodeSubGroup = (certCat: string) => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `codes/sub/category/${certCat}`
    );
  };

  getCurrency = () => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `currency`
    );
  };
  getAllPayoutCodeAndDescription= () => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `payout/method/code/desc`
    );
  };
  getBankAccount = () => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `bank/code/desc`
    );
  };

  registerNewCertificates = (data: IRegisterNewCertificate) => {
    return this.apiService
      .post<IRegisterNewCertificate>(this.baseURL + 'certificate/reciept', data)
      .toPromise();
  };

  submitPreOrder = (data: IPreorderCertificate) => {
    return this.apiService
      .post<IPreorderCertificate>(this.baseURL + 'certificate/order', data)
      .toPromise();
  };

  submitIssueCertificate = (data: IIssueCertificate) => {
    return this.apiService
      .post<IIssueCertificate>(this.baseURL + 'certificate/issue/agent/cert', data)
      .toPromise();
  };

  submitSetup = (data: ISetUpCertificate) => {
    return this.apiService
      .post<ISetUpCertificate>(this.baseURL + 'certificate/setup', data)
      .toPromise();
  };


  getNameByAgentNo(agentNo:string){
    return this.apiService.getText(
      this.baseURL + `agent/name/${agentNo}`
    );
  }


  getAllAgentsNo = () => {
    return this.apiService.get<IAgentNo[]>(
      this.baseURL + `agent/no`
    );
  };


  getBranchCodeAndDescByCompanyCode = (companyCode:string) =>{
    return this.apiService.get<ICode[]>(
      this.baseURL + `branch/code/desc/${companyCode}`
    );
  }

  getCertificateSums(companyCode:string,certCatCode?:string){
    let url = (certCatCode !== undefined || null) ? `certificate/sums/${companyCode}?refCat=${certCatCode}`
    : `certificate/sums/${companyCode}`
    return this.apiService.get<IGetSums>(
    this.baseURL + url
  );}

}
