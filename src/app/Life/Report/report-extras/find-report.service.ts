import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/Services/api.service';
import { ICodeTitle } from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import { isConstructorDeclaration } from 'typescript';
import {
  IFieldNameKVP,
  IReportForm,
  IReportOutput,
  EReportFormat,
} from './report.model';

@Injectable({
  providedIn: 'root',
})
export class ReportEndpointService {
  reportGroupList: any;
  private get baseURL() {
    return environment.apiBaseUrl + '/rest/';
  }
  constructor(private apiService: ApiService) {}

  deleteConfig(
    id: string,
    type: 'filter' | 'output' | 'sorts' | 'join' | 'userGroup' | 'webuserGroup'
  ) {
    return this.apiService
      .delete(this.baseURL + `reports/report/${type}/${id}`)
      .toPromise();
  }

  getCodes = (category: string) => {
    return this.apiService.getWithLocalCache<ICodeTitle[]>(
      this.baseURL + 'codes/sub/category/' + category
    );
  };

  getReportGroupCodes = () => {
    return this.getCodes('REPORT_GROUP');
  };

  getReport = (reportCode: string, reportFormat?: string) => {
    return this.apiService.get<IReportForm>(
      this.baseURL + `reports/code/${reportCode}/${reportFormat || ''}`
    );
  };

  getReportGroupReportList = (reportGroup: string) => {
    return reportGroup
      ? this.apiService.get<ICodeTitle[]>(
          this.baseURL + `reports/list/report/${reportGroup}`
        )
      : null;
  };

  getTableList = (tableName: string) => {
    return this.apiService.get(this.baseURL + 'reports/' + tableName + '/all-column');
  };
  getTableGroupList = () => {
    return this.apiService.getWithLocalCache<string[]>(
      this.baseURL + 'reports/table-groups'
    );
  };

  getPrimaryTableList = (data: string) => {
    return this.apiService.getWithLocalCache<string[]>(
      this.baseURL + 'reports/primary-table/' + data
    );
  };

  getUserGroupList = () => {
    return this.apiService.get<any[]>(this.baseURL + 'users/group/all');
    // .subscribe((r) => {
    //   console.log('USERGROUP', r);
    // });
  };

  getReportList = () => {
    return this.apiService.get(this.baseURL + 'codes/sub/category/REPORT_GROUP%20/L');
  };

  getTableGroup = () => {
    return this.apiService.get<string[]>(this.baseURL + 'reports/all-table-groups');
  };
  getSecondaryTableName = (tableGroup: string) => {
    return this.apiService.getWithLocalCache<string[]>(
      this.baseURL + `reports/secondary-table/${tableGroup}`
    );
  };
  getSecondaryTableLink = (primaryTable: string, secondaryTable: string) => {
    return this.apiService.get<string[]>(
      this.baseURL + `reports/report/join/${primaryTable}/${secondaryTable}`
    );
  };

  getAdjoiningTableGroups = (tableGroup: string) => {
    return this.apiService.get<string[]>(
      this.baseURL + `reports/primary-table/${tableGroup}`
    );
  };

  getPrimaryTableListMain = () => {
    return this.apiService.get(this.baseURL + 'reports/all-primary-table');
  };

  downloadReport = (code: string, format: EReportFormat) => {
    return this.apiService.get(
      this.baseURL + `reports/export/${code}/${format}`,
      null,
      {
        responseType: 'arraybuffer',
      }
    );
  };
  downloadReportWithoutSaving = (filePath: string, format: EReportFormat) =>
    this.downloadReportWithoutSaving(filePath, format);

  getGenReportData = (code: string, format: string = 'json') => {
    return this.apiService.get(this.baseURL + `reports/export/${code}/${format}`);
  };
  runReport = (data: IReportForm) => {
    return this.apiService
      .post<IReportForm>(this.baseURL + 'reports/run', data)
      .toPromise();
  };
  submitReport = (data: IReportForm) => {
    return this.apiService
      .post<IReportForm>(this.baseURL + 'reports/', data)
      .toPromise();
  };
  modifyReport = (data: IReportForm, id: string) => {
    return this.apiService
      .put<IReportForm>(this.baseURL + 'reports/' + id, data)
      .toPromise();
  };

  getFieldNames = (primaryTable: string) => {
    return this.apiService
      .getWithLocalCache<IFieldNameKVP[]>(
        this.baseURL + 'reports/' + primaryTable + '/' + 'all-column'
      )
      .pipe(map((x) => x.sort2('columnName', true)));
  };

  getSecondaryList = (data: any) => {
    return this.apiService.get<string[]>(
      this.baseURL + 'reports/secondary-table/' + data
    );
  };
  canUserOpenReport = (reportCode: string) => {
    return this.apiService.get<{
      additionalInfo: any;
      roleType: string;
      userGroup: string;
      userName: string;
    }>(this.baseURL + 'reports/view/authorize/' + reportCode);
  };

  getTableNameList = (data: any) => {
    return this.apiService.get(this.baseURL + 'reports/secondary-table/' + data);
  };

  getTableLinkList = (data: string, data2: string) => {
    return this.apiService.get<ICodeTitle[]>(
      this.baseURL + 'reports/secondary-table/primary/' + data + '/' + data2
    );
    // .subscribe((r) => {
    //   console.log(r);
    //   return r;
    // });
  };

  getUserGroup = () => {
    return this.apiService.get(this.baseURL + 'users/group/L');
  };
}
