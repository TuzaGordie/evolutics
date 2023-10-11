import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Form2Service {

  identificationData:any
 personalData:any
  tabs:any = "personalInfo";
  employmentData:any
  paymentData:any
 nextOfKinData:any
 showBankDetails =  false;
 list:any = []
  constructor(public http:HttpClient) { }

  tabChange(tab:any){
    this.tabs = tab;
    console.log("tabchange", this.tabs)
  }
  personalInfo(data:any){
    this.personalData = data;
    console.log(this.personalData)
      }
      identificationInfo(data:any){
    this.identificationData = data;
    console.log(this.identificationData)
  }
  employmentInfo(data:any){
    this.employmentData = data;
    console.log(this.employmentData)
  }
  paymentInfo(data:any){
    this.paymentData = data;
    console.log(this.paymentData)
    
  }
  nextOfKinInfo(data:any){
this.nextOfKinData = data;
console.log(this.nextOfKinData)

this.listData()
let allData = { personalInfo: this.personalData,
  identificationInfo: this.identificationData,
  employmentInfo: this.employmentData,
  paymentInfo: this.paymentData,
  nextOfKinInfo: this.nextOfKinData  }

console.log("alldata",allData)
/* this.submitPostData(allData).subscribe(res => {
  console.log(res)
}) */
  }
  showBankDetail(){
     this.showBankDetails = true;
  }
  closeBankDetails(){
    this.showBankDetails = false;
  }
  listData(){
    let data = this.nextOfKinInfo 
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
  getEmploymentStatusList(){
    return this.http.get('https://dev-api-evt.herokuapp.com/Employmentstatus');
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
    return this.http.get('https://dev-api-evt.herokuapp.com/clientreltype');
  }
  getOccupationList(){
    return this.http.get('https://dev-api-evt.herokuapp.com/occupation');
  }
  getOccupationGroupList(){
    return this.http.get('https://dev-api-evt.herokuapp.com/occupationGroup');
  }
  submitPostData(data:any){
    return this.http.post("https://dev-api-evt.herokuapp.com/client_push_data" , data)
  }
}
