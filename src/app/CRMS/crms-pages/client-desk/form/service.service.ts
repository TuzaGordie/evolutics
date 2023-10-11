import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  companyData:any
  contactData:any
  directorData:any
  paymentData:any
 newPaymentData:any
 tabs:any = "companyInfo";
 showBankDetails =  false;
 list:any = []
 
  constructor(private http: HttpClient) { }

  companyInfo(data:any){
this.companyData = data;
console.log(this.companyData)
  }
  contactInfo(data:any){
    this.contactData = data;
    console.log(this.contactData)
  }
  directorInfo(data:any){
    this.directorData = data;
    console.log(this.directorData)
  }
 /*  paymentInfo(data:any){
    this.paymentData = data;
    console.log(this.paymentData)
   
  } */
  newPaymentInfo(data:any){
this.newPaymentData = data;
console.log(this.newPaymentData)
let allData = { comapanyInfo: this.companyData,
  contactInfo: this.contactData,
  directorInfo: this.directorData,
  newPaymentInfo: this.newPaymentData  }

console.log("alldata",allData)
/* this.submitPostData(allData).subscribe(res => {
  console.log(res)
}) */
this.listData()
  }

  tabChange(tab:any){
    this.tabs = tab;
    console.log("tabchange", this.tabs)
  }
  /* showBankDetail(){
     this.showBankDetails = true;
  }
  closeBankDetails(){
    this.showBankDetails = false;
  } */
  listData(){
    let data = this.newPaymentData 
    this.list.push(data)
    console.log("banklist",this.list)
  }

  getCountryList(){
    return this.http.get('https://dev-api-evt.herokuapp.com/country');
  }
  getRegionList(){
    return this.http.get('https://dev-api-evt.herokuapp.com/region');
  }
  getStateList(){
    return this.http.get('https://dev-api-evt.herokuapp.com/city');
  }
  getTownList(){
    return this.http.get('https://dev-api-evt.herokuapp.com/town');
  }
  getSectorList(){
    return this.http.get('https://dev-api-evt.herokuapp.com/sector');
  }
  getSegmentList(){
    return this.http.get('https://dev-api-evt.herokuapp.com/Segment');
  }
  getBanknameList(){
    return this.http.get('https://dev-api-evt.herokuapp.com/bankname');
  }
  getSortList(){
    return this.http.get('https://dev-api-evt.herokuapp.com/sortcode');
  }
  getProviderList(){
    return this.http.get('https://dev-api-evt.herokuapp.com/Providers');
  }
  
  getRelationList(){
    return this.http.get('https://dev-api-evt.herokuapp.com/corporateContactRel');
  }
  submitPostData(data:any){
    return this.http.post("https://dev-api-evt.herokuapp.com/client_push_data" , data)
  }
}
