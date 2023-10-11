import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RegionService {

    constructor(private httpClient: ApiService) { }


    getCountry() { return this.httpClient.get(`${environment.apiBaseUrl}/rest/location/country`) }
    getCountryGroups() { return this.httpClient.get(`${environment.apiBaseUrl}/rest/location/country/groups`) }
    getCountryWithCodeDescIsoAndId() { return this.httpClient.get(`${environment.apiBaseUrl}/rest/location/country/code/desc/iso/id`) }
    getRegion() { return this.httpClient.get(`${environment.apiBaseUrl}/rest/location/region`) }
    getRegionByCountry(country: string) { return this.httpClient.get(`${environment.apiBaseUrl}/rest/location/region/country/${country}`) }
    getRegionByRegion(code: string) { return this.httpClient.get(`${environment.apiBaseUrl}/rest/location/region/info/${code}`) }
    createNewRegion(newRegion) { return this.httpClient.post(`${environment.apiBaseUrl}/rest/location/region`, newRegion) }


}