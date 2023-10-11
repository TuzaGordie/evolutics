import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RunBatchProcessData } from './runbatch.interface';


@Injectable({
    providedIn: 'root'
})
export class RunBatchService {

    constructor(private httpClient: HttpClient) { }

    getCodeAndTitleByCodeSubgroup(code: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/codes/sub/category/${code}`)
    }

    getAllCodesAndDescriptionByGroup(code: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/batch/setup/code/desc/group/${code}`)
    }

    getAllBatchSetupProcess(code: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/batch/setup/process/${code}`)
    }

    updateBatchProcess(batchProcess: RunBatchProcessData[]) {
        return this.httpClient.put(`${environment.apiBaseUrl}/rest/batch/run/process`, batchProcess)

    }

}