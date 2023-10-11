



import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';
import { BankAccount } from './bank-accounts.interface';


@Injectable({
    providedIn: 'root'
})
export class BankAccountService {
    private retryCount: number = 2;

    constructor(public apiService: ApiService) { }

    getCompanyCodeAndDesc = () => {
        return this.apiService.get(`${environment.apiBaseUrl}/rest/company/code/desc`);
    }

    getBankCodeAndDesc = () => {

        return this.apiService.get(
            `${environment.apiBaseUrl}/rest/bank/code/desc`
        );

    }

    getCountry = () => {
        return this.apiService.get(
            `${environment.apiBaseUrl}/rest/location/country`
        );
    }

    getBranchCodeAndDes = () => {
        return this.apiService.get(`${environment.apiBaseUrl}/rest/branch/code/desc`);

    }

    getBankCodeAndDesByCountry = (country) => {
        return this.apiService.get(
            `${environment.apiBaseUrl}/rest/bank/code/desc/${country}`
        );
    }

    getBankAccountByCompany = (company) => {
        return this.apiService.get(
            `${environment.apiBaseUrl}/rest/company/bank/accounts/company/${company}`
        );
    }

    getStateByCountry(country) {
        return this.apiService.get(`${environment.apiBaseUrl}/rest/location/state/country/${country}`);
    }

    getTownByCity(city: string) {
        return this.apiService.get(`${environment.apiBaseUrl}/rest/location/town/${city}`);

    }

    getBankCodeAndDes() {
        return this.apiService.get(`${environment.apiBaseUrl}/rest/bank/code/desc`);

    }

    findBankSortCode(queryObj) {
        return this.apiService.get(`${environment.apiBaseUrl}/rest/sort/codes/search?${queryObj}`);
    }

    createBankAccount(bankAccount: BankAccount[]) {
        return this.apiService.post(
            `${environment.apiBaseUrl}/rest/company/bank/account`, bankAccount
        );

    }
}







