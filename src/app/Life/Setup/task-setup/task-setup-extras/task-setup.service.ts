import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ApiService } from 'src/app/Services/api.service';
import { ICodeDescription } from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import { ITaskSetupPayload } from './task-setup.interface';
import { ITaskSetup } from './task-setup.response.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskSetupService {
  get baseURL() {
    return environment.apiBaseUrl + '/rest/';
  }

  constructor(private apiService: ApiService) {}
  getCheck = (code: string) => {
    return this.apiService.get(
      this.baseURL + `codes/sub/category/WF_CHECKLIST/${code}`
    );
  };
  getActions(modVar?: any) {
    return this.apiService
      .get(
        this.baseURL + 'codes/sub/group/WF_ACTION'
      )
      .pipe(
        tap((data) => {
          modVar = data;
        })
      );
  }
  getMaintenanceFunctionLinks(modVar?: any) {
    return this.apiService
      .get(
        this.baseURL + 'codes/sub/group/MAINTAIN_FUNCTION'
      )
      .pipe(
        tap((data) => {
          modVar = data;
        })
      );
  }

  getOnCompletionTriggers(modVar?: any) {
    return this.apiService
      .getCodes(this.baseURL + 'workflows/task/code')
      .pipe(
        tap((data) => {
          modVar = data;
        })
      );
  }
  getWorkflowChecklist(modVar?: any) {
    return this.apiService
      .get<ICodeDescription[]>(
        this.baseURL + 'codes/sub/group/WF_CHECKLIST_CAT'
      )
      .pipe(
        tap((data) => {
          modVar = data;
        })
      );
  }
  getWorkflowChecklistByCode(code: string, modVar?: any) {
    return this.apiService
      .get(
        this.baseURL+`codes/sub/category/WF_CHECKLIST/${code}`
      )
      .pipe(
        tap((data) => {
          modVar = data;
        })
      );
  }
  getWorkflowGroups(modVar?: any) {
    return this.apiService
      .get(
        this.baseURL + 'codes/sub/group/Workflow_Group'
      )
      .pipe(
        tap((data) => {
          modVar = data;
        })
      );
  }
  getTaskCode = (code: string) => {
    return this.apiService.get<ITaskSetup>(
      this.baseURL + 'workflows/task/setup/' + code
    );
  };
  getDefaultUsers() {
    return this.apiService.get(this.baseURL + 'users/codes');
  }

  getDefaultUserGroup() {
    return this.apiService.get(this.baseURL + 'users/group');
  }

  getEvents() {
    return this.apiService.get(this.baseURL + 'product/event/code/desc');
  }
  getTaskCodesByGroup=(groupCode:string) =>{
    return this.apiService.get<ICodeDescription[]>(this.baseURL + `workflows/task/group/${groupCode}`);
  }
  
  saveTaskCode(data: ITaskSetupPayload) {
    return this.apiService.post<ITaskSetup>(
      this.baseURL + 'workflows/task/setup',
      data
    );
  }
  updateTaskCode(code:string,data: ITaskSetupPayload) {
    return this.apiService.put<ITaskSetup>(
      this.baseURL + 'workflows/task/setup/' +
        code,
      data
    );
  }
}
