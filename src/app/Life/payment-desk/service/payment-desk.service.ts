import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ApiService } from 'src/app/Services/api.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class PaymentDeskService {
  private baseURL = environment.apiBaseUrl;

  constructor(private http: HttpClient, private apiService: ApiService) {}

  createCoupon(coupon: any) {
    return this.http.post(this.baseURL + '/rest/coupon/', coupon);
  }

  updateCoupon(coupon: any) {
    return this.http.put(this.baseURL + '/rest/coupon/', coupon);
  }

  getPolicyNo() {
    return this.apiService.get(this.baseURL + '/rest/policy/no/');
  }

  getPolicyCode(policyNo) {
    return this.apiService.get(
      this.baseURL + `/rest/policy/code/policy/no/${policyNo}`
    );
  }

  getPolicyCurrency(policyNo) {
    return this.apiService.get(
      this.baseURL + `/rest/policy/search?policyNo=${policyNo}`
    ).pipe(map(policies => policies[0]?.currency))
  }

  getCurrencies() {
    return this.http.get(this.baseURL + '/rest/currency/active/');
  }

  getClaimStatus(statusCat: string = 'C') {
    return this.apiService.get(this.baseURL + `/rest/status/code/description/${statusCat}`);
  }

  getOwnerName(policyNo) {
    // const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.apiService.get(this.baseURL + `/rest/policy/search?policyNo=${policyNo}`)
      .pipe(map(policies => policies[0]?.ownerName))
    // { headers, responseType: 'text'}
  }

  getDebitNote(policyNo) {
    return this.apiService.get(this.baseURL + `/rest/debit/note/${policyNo}`);
  }

  getAuthorizeCoupon(userCode) {
    return this.apiService.get(this.baseURL + `/rest/coupon/pending/coupon?userCode=${userCode}`);
  }

  getAuthorizePaymentsOutwards(userCode, tierCategory) {
    return this.apiService.get(this.baseURL + `/rest/payout/pending/auth/payment/${userCode}/${tierCategory}`);
  }

  getPendingPayments(userCode) {
    return this.apiService.get(this.baseURL + `/rest/payout/pending/payment?userCode=${userCode}`);
  }

  getAuthorizeInwardSuspenseSwitch (userCode) {
    // mapping to the first element because the actual data was found to be an array inside another array
    return this.apiService.get(this.baseURL + `/rest/users/all/suspense/switch/${userCode}`).pipe(map(data => data[0]))
  }

  authorizeInwardSuspenseSwitch(id, userCode) {
    return this.apiService.put(this.baseURL + `/rest/users/auth/suspense/switch/${id}/${userCode}?auth=true&decline=false`)
  }

  declineInwardSuspenseSwitch(id, userCode) {
    return this.apiService.put(this.baseURL + `/rest/users/auth/suspense/switch/${id}/${userCode}?auth=false&decline=true`)
  }

  getPendingClaims(userCode) {
    return this.apiService.get(this.baseURL + `/rest/claim/pending/claim?userCode=${userCode}`);
  }

  getCompnay() {
    return this.apiService.get(this.baseURL + '/rest/company/code/desc');
  }

  getPaymentStatus() {
    return this.apiService.get(this.baseURL + '/rest/codes/sub/group/PAYMENT_STATUS');
  }

  authorizeCoupon(coupon) {
    return this.apiService.put(this.baseURL + '/rest/coupon/auth?auth=true&decline=false', coupon)
  }

  declineCoupon(coupon) {
    return this.apiService.put(this.baseURL + '/rest/coupon/auth?decline=true&auth=false', coupon)
  }

  authorizePayment(payment) {
    return this.apiService.put(this.baseURL + `/rest/payout/auth/payout?auth=true&decline=false`, payment)
  }

  declinePayment(payment) {
    return this.apiService.put(this.baseURL + `/rest/payout/auth/payout?decline=true&auth=false`, payment)
  }

  getClaimDetails(claimNo) {
    return this.apiService.get(this.baseURL + `/rest/claim/details/${claimNo}`)
  }

  getClaimStatus2(claimNo) {
    return this.apiService.get(this.baseURL + `/rest/claim/status/${claimNo}`)
  }

  getPeril(claimNo) {
    return this.apiService.get(this.baseURL + `/rest/claim/peril/${claimNo}`)
  }

  getClientName(clientNo) {
    return this.apiService.get(this.baseURL + `/rest/client/full_name/${clientNo}`)
  }
  getAuthorizations(claimNo) {
    return this.apiService.get(this.baseURL + `/rest/claim/dv/auth/${claimNo}`)
  }

  getAuthorizeCommissionAdjustments(userCode){
    return this.apiService.get(this.baseURL + `/rest/commission/adjustment/${userCode}`).pipe(map(res => res[0]?.commAdjustAuth))
  }

  getPolicyAccounts(userCode){
    return this.apiService.get(this.baseURL + `/rest/policy/acct/${userCode}`)
  }

  getClaimAdjustments(userCode){
    return this.apiService.get(this.baseURL + `/rest/claim/pending/adjustment/${userCode}`).pipe(map(res => res[0]?.claimAdjustment))
  }

  authorizeClaimAdjustment(id, userCode){
    return this.apiService.put(this.baseURL + `/rest/claim/auth/adjustments/${id}/${userCode}?auth=true&decline=false`)
  }

  declineClaimAdjustment(id, userCode){
    return this.apiService.put(this.baseURL + `/rest/claim/auth/adjustments/${id}/${userCode}?auth=false&decline=true`)
  }

  getUncoveredSAR(coverCode:string,policyCode:string,policyNo:string,policyNoSuffix:string){
    return this.apiService.get(this.baseURL + `/rest/policy/calculate/uncovered/sar?coverCode=${coverCode}&policyCode=${policyCode}&policyNo=${policyNo}&policyNoSuffix:=${policyNoSuffix}`);
}


getPayee = (payeeId: number) => {
  return this.apiService.get<any>(`${this.baseURL}payout/payee/${payeeId}`);
};

}
