import { CurrencyPipe, Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { InputService } from 'src/app/Services/input.service';
import { PageLoaderService } from 'src/app/Services/page-loader.service';
import { RouteService } from 'src/app/Services/route.service';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/Services/api.service';
import { CodeService } from 'src/app/Services/code.service';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root',
})

export class AccountsService {

  get baseURL() {
    return environment.apiBaseUrl + '/rest/';
  }

  rateSubgroupCode = '';

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public router: Router,
    private _titleS: Title,
    private _location: Location,
    private _inputService: InputService,
    private _routeService: RouteService,
    public pS: PageLoaderService,
    public currencyPipe: CurrencyPipe,
    private apiService: ApiService,
    private codeService: CodeService
  ) { }

  findMatchingValue(set, properties) {
    return set.filter(function (entry) {
      return Object.keys(properties).every(function (key) {
        return entry[key] === properties[key];
      });
    });
  }

  getCompanyCodeAndDesc() {
    return this.apiService.get(this.baseURL + 'company/code/desc');
  }

  getBranchCodeAndDesc(companyCode: string) {
    return this.apiService.get(this.baseURL + `branch/code/desc/${companyCode}`);
  }

  getAccountGroups = (data: string) => {
    return this.codeService.getCodesByCodeSubGroup(data);
  };

  getAccountCodes = () => {
    return this.apiService.get(this.baseURL + `acc/codes/desc`);
  };

  getLedgerCodes = () => {
    return this.apiService.get(this.baseURL + `acc/codes/mapping`);
  };

  getCurrency = () => {
    return this.apiService.get(this.baseURL + `currency`);
  };

  getProductClass = (data: string) => {
    return this.codeService.getCodesByCodeSubGroup(data);
  };

  getProduct = (data: string) => {
    return this.apiService.get(this.baseURL + `product/code/desc/class/${data}`);
  };

  getPolicyDetails = (data: string) => {
    return this.apiService.get(this.baseURL + `policy/code/policy/no/${data}`);
  };

  getAccountTransAmount(searchParams: any){
    // remove null value searchParams
    const paramsArray = Object.entries(searchParams).filter(([key, value]) => !!value);
    // convert to query parameters
    let params = '';
    if (paramsArray.length){
      params = paramsArray.reduce((query, [key, value]) => `${query}${query ?'&':'?'}${key}=${value}`, '')
    }console.log("params just before requesting: ", params)
    return this.apiService.get(this.baseURL + `gen/acct/trans/amount/search${params}`)
  }
 
  getAccountTransAmountByMonth(searchParams: any){
    // remove null value searchParams
    const paramsArray = Object.entries(searchParams).filter(([key, value]) => !!value);
    // convert to query parameters
    let params = '';
    if (paramsArray.length){
      params = paramsArray.reduce((query, [key, value]) => `${query}${query ?'&':'?'}${key}=${value}`, '')
    }console.log("params just before requesting: ", params)
    return this.apiService.get(this.baseURL + `gen/acct/trans/amount/month${params}`)
  }

  getAccountTransList(searchParams: any){
    // remove null value searchParams
    const paramsArray = Object.entries(searchParams).filter(([key, value]) => !!value);
    // convert to query parameters
    let params = '';
    if (paramsArray.length){
      params = paramsArray.reduce((query, [key, value]) => `${query}${query ?'&':'?'}${key}=${value}`, '')
    }
    console.log("params just before requesting: ", params)
    return this.apiService.get(this.baseURL + `gen/acct/trans/search${params}`)
  }

  getFrequencySplices(){
    return this.apiService.get(this.baseURL + 'batch/setup/schedule')
      .pipe(
        // remove unneeded minute and hourly options
        map(splices => splices?.filter(splice => splice != 'MI' && splice != 'HL'))
        )
  }
}
