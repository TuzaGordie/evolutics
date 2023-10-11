import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TownService {

    constructor(private httpClient: ApiService) { }


    getCountry() { return this.httpClient.get(`${environment.apiBaseUrl}/rest/location/country`) }
    getCountryWithCodeDescIsoAndId() { return this.httpClient.get(`${environment.apiBaseUrl}/rest/location/country/code/desc/iso/id`) }
    getRegion() { return this.httpClient.get(`${environment.apiBaseUrl}/rest/location/region`) }
    getState() { return this.httpClient.get(`${environment.apiBaseUrl}/rest/location/state`) }
    getTown(city: string) { return this.httpClient.get(`${environment.apiBaseUrl}/rest/location/town/${city}`) }
    createNewTown(townData) { return this.httpClient.post(`${environment.apiBaseUrl}/rest/location/town/`, townData) }
    getTownByTown(town: string) { return this.httpClient.get(`${environment.apiBaseUrl}/rest/location/town/info/${town}`) }
}