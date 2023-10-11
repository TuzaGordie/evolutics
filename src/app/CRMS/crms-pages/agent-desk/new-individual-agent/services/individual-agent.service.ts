import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class IndividualAgentService {

  tabs:any = "ownerInfo";
  agentInfoData:any;
  clientNoInfo:any;
  ownerInfoData:any;
  licenseData:any;
  paymentData:any;
  individualClientInfo:any
  constructor(public http:HttpClient) { }

  tabChange(tab:any){
    this.tabs = tab;
    console.log("tabchange", this.tabs)
  }

  clientInfo(data:any){
    this.clientNoInfo = data;
    console.log(this.clientNoInfo)
      }
      ownerInfo(data:any){
        this.ownerInfoData = data;
        console.log(this.ownerInfoData)
          }
          agentInfo(data:any){
            this.agentInfoData = data;
            console.log(this.agentInfoData)
              }
              paymentInfo(data:any){
                this.paymentData = data;
                console.log(this.paymentData)
                  }
                  licenseInfo(data:any){
                    this.licenseData = data;
                    console.log(this.licenseData)
                    this.listData()
                      }

                      listData(){
let allData = { 
  clientInfo: this.clientNoInfo,
  ownerInfo: this.ownerInfoData,
  agentInfo: this.agentInfoData,
  licenseInfo: this.licenseData,
  paymentInfo: this.paymentData  }
console.log(allData)
/* this.submitPostData(allData).subscribe(res => {
  console.log(res)
}) */
  }

  getLicenseAuthorityList(){
    return this.http.get('https://dev-api-evt.herokuapp.com/LICENSE_AUTHORITY');
  }
  getLicenseTypeList(){
    return this.http.get('https://dev-api-evt.herokuapp.com/LICENSE_TYPE');
  }
  getProductClassList(){
    return this.http.get('https://dev-api-evt.herokuapp.com/PRODUCT_CLASS');
  }
  getProductList(){
    return this.http.get('https://dev-api-evt.herokuapp.com/ProdQual');
  }
  getAgentTypeList(){
    return this.http.get('https://dev-api-evt.herokuapp.com/Agenttype');
  }
  getCountryList(){
    return this.http.get('https://dev-api-evt.herokuapp.com/country');
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
  getBranchList(){
    return this.http.get('https://dev-api-evt.herokuapp.com/bRanch');
  }
  getHierarchyList(){
    return this.http.get('https://dev-api-evt.herokuapp.com/HIERARCHY_CODE');
  }
  getClientList(data:any) {
    return this.http.get("https://dev-api-evt.herokuapp.com/cLIENT?CLIENT_NO=" + data)
  }
  submitPostData(data:any){
    return this.http.post("https://dev-api-evt.herokuapp.com/client_push_data" , data)
  }
}
