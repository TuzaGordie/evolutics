
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';
import { PaymentOutward } from './payment-outward.interface';


@Injectable({
    providedIn: 'root'
})
export class PaymentOutwardService {
    private retryCount: number = 2;

    constructor(public httpClient: HttpClient, public apiService: ApiService) { }

    getAccCodeMappingByCompany(accCode: string, company: string){    
        return this.apiService.get(
            `${environment.apiBaseUrl}/rest/acc/codes/account/ledger/${accCode}/${company}`
        );
    }

    getPaymentOutwardByCompanyCode(companyCode) {
        return this.apiService.get(
            `${environment.apiBaseUrl}/rest/company/payment/outward/${companyCode}`
        );
    }
    getAllPayoutCodeAndDescription() {
        return this.apiService.get(
            `${environment.apiBaseUrl}/rest/payout/method/code/desc`
        );
    }
    getAllAccCodesAndDes() {
        return this.apiService.get(
            `${environment.apiBaseUrl}/rest/acc/codes/desc`
        );
    }
    getAllBankCodeAndDes() {
        return this.apiService.get(
            `${environment.apiBaseUrl}/rest/bank/code/desc`
        );
    }
    getCurrencyCodeAndDes() {
        return this.apiService.get(
            `${environment.apiBaseUrl}/rest/currency`
        );
    }
    getCompanyBankAccounts() {
        return this.apiService.get(
            `${environment.apiBaseUrl}/rest/company/bank/accounts`
        );
    }
    getCodeTitleByCodeSubGroup(codeSubGroup) {
        return this.apiService.get(
            `${environment.apiBaseUrl}/rest/codes/code_title/${codeSubGroup}`
        );
    }
    getCompanyCodeAndDes() {
        return this.apiService.get(
            `${environment.apiBaseUrl}/rest/company/code/desc`
        );
    }
    createPaymentOutward(paymentOutward: PaymentOutward) {
        return this.apiService.post(
            `${environment.apiBaseUrl}/rest/company/payout`, paymentOutward
        );

    }


}







