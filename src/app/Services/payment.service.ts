import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPayout } from '../Life/payment-desk/payment-extras/payment.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  baseURL = environment.apiBaseUrl + '/rest/';
  constructor(public apiService: ApiService) {}

  // getPayoutByNumber = (number: string) => {
  //   return this.apiService.get<IPayout>(`${this.baseURL}payout/${number}`);
  // };
  getPayoutByNumber = (number: string) => {
    return this.apiService.get<IPayout>(`${this.baseURL}payout/${'1'}`);
  };

  getPaymentHistory = (payeeId: number) => {
    return this.apiService.get<any>(`${this.baseURL}payout/auth/history/${payeeId}`);
  };

  getPayee = (payeeId: number) => {
    return this.apiService.get<any>(`${this.baseURL}payout/payee/${payeeId}`);
  };


  getClientNameByNo = (clientNo: string) => {
    return this.apiService.getText(`${this.baseURL}client/full_name/${clientNo}`);
  };

  getCumLossRatioByPolicyNoAndPolicyCode = (policyNo: string,policyCode: string) => {
    return this.apiService.get<any>(`${this.baseURL}policy/cum/loss/ratio/${policyNo}/${policyCode}`);
  };

  getLossRatioSector = (sector: string) => {
    return this.apiService.get<any>(`${this.baseURL}client/cum/loss-ratio/sector/sector?=${sector}`);
  };

  getClientLossRatioYearByClientNo(clientNo: string){
    return this.apiService.get<any>(`${this.baseURL}client/loss/ratio/year/${clientNo}`);
  }

  getPolicyLossRatioYearByPolicyNo(policyNo: string){
    return this.apiService.get<any>(`${this.baseURL}policy/loss/ratio/year/${policyNo}`);
  }

  getCumLossRatioPolicyAverageByPolicyNo(policyNo: string){
    return this.apiService.get<any>(`${this.baseURL}/policy/cum/loss/ratio/average/${policyNo}`);
  }



// http://demo.evoluticstech.com:30121/core/rest/client/details/LSE210001


// http://demo.evoluticstech.com:30121/core/rest/crm/client/cum/loss-ratio/segment?segment=A%20%26%20K%20CONSTRUCTION%20COMPANY


// http://demo.evoluticstech.com:30121/core/rest/policy/loss/ratio/year/LRP10001





}
