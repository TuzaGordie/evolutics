import { ApiService } from 'src/app/Services/api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityService } from 'src/app/Services/utility.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateQuotationService {
  individualQuotationInfo: any;
  groupQuotationInfo: any;
  clientInfo: any;
  get baseURL() {
    return environment.apiBaseUrl + '/rest/';
  }

  constructor(private http: HttpClient,
    private apiService:ApiService){}

  getClientFullNameFromClientNo(clientNo){
    return this.apiService.getText(this.baseURL+`client/full_name/${clientNo}`)
  }

  getCurrenciesList(){
    // return this.http.get(this.baseURL+'product/validcurrency/description')
    return this.http.get(this.baseURL+'currency')
  }

  getDiscountCodesList(startDate: string = '1970-01-01', endDate?: string){
    if (typeof endDate === 'undefined'){
      //today's date string in format yyyy-mm-dd
      endDate = new Date().toISOString().split('T')[0]
    }
    return this.http.get(this.baseURL+`product/discount/code/desc/${startDate}/${endDate}`)
  }

  getInsuranceTypesList(){
    return this.http.get(this.baseURL+'codes/sub/category/INS_TYPE/');
  }

  getProductClassesList(insuranceType){
    return this.http.get(this.baseURL+`codes/sub/category/PRODUCT_CLASS/${insuranceType}`)
  }

  getProductsList(productClass){
    return this.http.get(this.baseURL+`product/code/desc/class/${productClass}`)
  }

  getCoversList(productCode){
    return this.http.get(this.baseURL+`product/covers/basics/${productCode}`);
  }

  getAnnuityAnnualEscalationBasesList(){
    return this.http.get(this.baseURL+'codes/code_title/ANN_ESCAL_BASIS')
  }

  getTargetBasesList(){
    return this.http.get(this.baseURL+'codes/code_title/ANN_TARGET_BASIS')
  }

  getPaymentMethodsList(){
    return this.http.get(this.baseURL+'product/covers/paying/methods')
  }

  getPremiumPaymentFrequenciesList(){
    return this.http.get(this.baseURL+'product/covers/premium/frequency')
  }

  getContributionFrequenciesList(){
    return this.http.get(this.baseURL+'product/covers/premium/frequency')
  }

  getPricingBasesList(){
    return this.http.get(this.baseURL+'codes/code_title/PRICING_BASIS')
  }

  getAtMaturityConvertToList(){
    return this.http.get(this.baseURL+'product/covers/code/desc')
  }

  createQuotation(data){
    return this.http.post(this.baseURL+'policy/individual/quote', data)
  }
}
