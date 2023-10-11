import { ICopyData, IGetDatabases, IGetTablesFromDestAndSource } from './dbcloner.model';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { ICodeDescription } from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DbclonerExtrasService {

  private get baseURL() {
    return environment.apiBaseUrl + '/rest/';
  }
  constructor(private apiService: ApiService) {}

  getDatabasUrl = () => {
    return this.apiService.getText(this.baseURL + 'database/default');
  };

  getDatabases = (data: IGetDatabases) => {
    return this.apiService
      .post<IGetDatabases>(this.baseURL + 'database/databases', data)
      .toPromise();
  };

  getDatabasesTables = (data: IGetDatabases) => {
    return this.apiService
    .post<IGetDatabases>(this.baseURL + 'database/tables', data)
    .toPromise();
  };

  getDatabasesTablesDestAndSource = (data: IGetTablesFromDestAndSource) => {
    return this.apiService
    .post<IGetDatabases>(this.baseURL + 'database/tables/dest/source', data)
    .toPromise();
  };

  getDatabasesColoumnsForDestAndSource = (data: IGetTablesFromDestAndSource) => {
    return this.apiService
    .post<IGetDatabases>(this.baseURL + 'database/tables/dest/source', data)
    .toPromise();
  };

  copyData = (data: ICopyData[]) => {
    return this.apiService
    .post(this.baseURL + 'database/copy/data', data)
    .toPromise();
  };

}
