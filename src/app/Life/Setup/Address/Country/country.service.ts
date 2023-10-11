import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CountryService {
    constructor(private httpClient: ApiService) { }
    getCountry() { return this.httpClient.get(`${environment.apiBaseUrl}/rest/location/country`) }
    getCountryGroups() { return this.httpClient.get(`${environment.apiBaseUrl}/rest/location/country/groups`) }
    getCountriesByGroup(group: string) { return this.httpClient.get(`${environment.apiBaseUrl}/rest/location/country/group/${group}`) }
    getCountryByCode(code: string) { return this.httpClient.get(`${environment.apiBaseUrl}/rest/location/country/info/${code}`) }
    getCodeAndTitleByCodeSubgroup(params: any) { return this.httpClient.get(`${environment.apiBaseUrl}/rest/codes/sub/category/${params}`) }
    createNewCountry(data: any) { return this.httpClient.post(`${environment.apiBaseUrl}/rest/location/country`, data) }
    getSortCodeByBankCode(data: any) { return this.httpClient.get(`${environment.apiBaseUrl}/rest/sort/codes${data}`) }

    getCountryWithCodeDescIsoAndId() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/location/country/code/desc/iso/id`)
    }
}
