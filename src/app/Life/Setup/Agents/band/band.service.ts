import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class BandService {

    constructor(private httpClient: HttpClient) { }

    getDateBasis() {
        //   Replace with the actuall value requests when you are given
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/agent/setup/type`)
    }

    getBasis() {
        //   Replace with the actuall value requests when you are given
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/agent/setup/type`)
    }

}
