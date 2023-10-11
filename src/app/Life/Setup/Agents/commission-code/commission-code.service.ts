import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class CommissionCodeService {

    constructor(private httpClient: ApiService) { }
    getAllCodeAndDescription() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/product/code/desc`)

    }

    getAllCommTypeGroups() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/commtype/groups`)

    }

    getAllCommTypesCodeAndDescription() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/commtype/code/desc`)

    }

    getAllCommTypesCodeAndDescriptionByGroup(data: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/commtype/group/${data}`)

    }


    getCommTypesCoverCommCodes(code: string = 'COMM_GROUP') {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/codes/sub/group/${code}`)
    }

    getCoverCommissionCodes() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/product/covers/commission/code`)
    }


    getCodeAndTitleByCodeSubGroup(data) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/codes/sub/category/${data}`)
    }

    getGeneralRateCodeAndDescriptionByCategory(data) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/product/rate/general/code/desc/${data}`)
    }


    getCommType(commTypeCode: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/commtype/${commTypeCode}`)
    }

    getCommTypeAndVersionNo(commTypeCode, versionNo) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/commtype/${commTypeCode}/${versionNo}`)
    }

    createCommissionCode(commData) {
        return this.httpClient.post(`${environment.apiBaseUrl}/rest/commtype/`, commData)
    }
}







