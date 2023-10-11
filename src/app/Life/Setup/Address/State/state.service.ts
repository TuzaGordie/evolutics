import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StateService {

    constructor(private httpClient: ApiService) { }

    getCountry() { return this.httpClient.get(`${environment.apiBaseUrl}/rest/location/country`) }
    getCountryWithCodeDescIsoAndId() { return this.httpClient.get(`${environment.apiBaseUrl}/rest/location/country/code/desc/iso/id`) }
    getRegion() { return this.httpClient.get(`${environment.apiBaseUrl}/rest/location/region`) }
    getStateByRegion(region: string) { return this.httpClient.get(`${environment.apiBaseUrl}/rest/location/state/${region}`) }
    getStateByStateCode(code: string) { return this.httpClient.get(`${environment.apiBaseUrl}/rest/location/state/info/${code}`) }
    createNewState(stateData) { return this.httpClient.post(`${environment.apiBaseUrl}/rest/location/city`, stateData) }


}