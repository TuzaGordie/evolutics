import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { map, mergeMap, tap } from 'rxjs/operators';
import { UtilityService } from 'src/app/Services/utility.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FindClientService {

  clientInfo:any
  providerInfo:any
  searchedData:any = []
  baseUrl = environment.apiBaseUrl;

  constructor(public apiService: ApiService, private utilityService: UtilityService) { }

  getClientList(data:any) {
    return this.apiService.get(this.baseUrl + "/rest/crm/client/view/contact/" + data)
  }
  getClient(clientNo: string){
    return this.apiService.get(this.baseUrl + "/rest/crm/client/view/contact/" + clientNo)
  }
  getClientByEnroleeNo(enroleeNo: string){
    return this.apiService.getText(this.baseUrl + "/rest/client/no/enrolee/" + enroleeNo)
      .pipe(mergeMap((clientNo) => this.getClient(clientNo)))
  }

  getProviderInfoList(data:any) {
    return this.apiService.get(this.baseUrl + "/rest/crm/client/view/provider/info/" + data)
  }

  getClientList2() {
    return this.apiService.get("https://dev-api-evt.herokuapp.com/cLIENT" )
  }
  getEndorsements(data:any) {
    return this.apiService.get(this.baseUrl + "/rest/client/endorsements/" + data  )
  }
  getWebflows(data:any) {
    return this.apiService.get(this.baseUrl + "/rest/workflows/client/" + data  )
  }
  getWebLogin(data:any) {
    return this.apiService.get(this.baseUrl + "/rest/client/web_access/" + data  )
  }
  getPolicies() {
    return this.apiService.get(this.baseUrl + "/rest/client/policies/"  )
  }
  getPoliciesApi(id1,id2){
    return this.apiService.get(this.baseUrl + "/rest/client/policies/" + id1 +'/' + id2 )
  }
  getRelationshipApi(id){
    return this.apiService.get(this.baseUrl + "/rest/client/related/" + id )
  }
  getPendingPaymentsApi(clientNo: string,busLine: string){
    return this.apiService.get(this.baseUrl + "/rest/client/pending/payment/adjustment/" + clientNo +'/' + busLine )
  }
  getRelationship() {
    return this.apiService.get("http://dev-api-evt.herokuapp.com/getclientrelbycNo" )
  }
  getPendingQuotes() {
    return this.apiService.get("http://dev-api-evt.herokuapp.com/pendingquotes" )
  }
  getPendingQuotesByClientNo(clientNo: string){
    return this.apiService.get(this.baseUrl + "/rest/policy/days/quote/" + clientNo)
  }
  getDocument(data:any) {
    return this.apiService.get(this.baseUrl + "/rest/document/client/" + data )
  }
  getPendingPayments() {
    return this.apiService.get("https://dev-api-evt.herokuapp.com/Pendingpayments " )
  }
  getProviderList(data:any) {
    return this.apiService.get(this.baseUrl + "/rest/client/view/" + data)
  }
  getClientNoByProviderNo(providerNo: string){
    return this.apiService.getText(this.baseUrl + "/rest/client/no/provider/" + providerNo)
      .pipe(mergeMap((clientNo) => this.getClient(clientNo)))
  }
  getEnroleeList(data:any){
    return this.apiService.get(this.baseUrl + "/rest/client/view/enrolee" + data)
  }
  getnameList(data:any){
    return this.apiService.get(this.baseUrl + "/rest/client/search?name=" + data)
  }
  getphoneList(data:any){
    return this.apiService.get(this.baseUrl + "/rest/client/search?phoneNo=" + data)
  }
  getemailList(data:any){
    return this.apiService.get(this.baseUrl + "/rest/client/search?email=" + data)
  }
 
  getExternalRefList(data:any){
    return this.apiService.get(this.baseUrl + "/rest/client/search?externalRef=" + data)
  }
  getCreatedByList(data:any){
    return this.apiService.get(this.baseUrl + "/rest/client/search?createdBy=" + data)
  }
  getCreatedToo(data:any){
    return this.apiService.get(this.baseUrl + "/rest/client/search?createDateTo=" + data)
  }
  getCreatedFrom(data:any){
    return this.apiService.get(this.baseUrl + "/rest/client/search?createDateFrom=" + data)
  }
  submitPostData(data:any){
    return this.apiService.post("https://dev-api-evt.herokuapp.com/client_push_data" , data)
  }

  getCodeList(data:any){
    return this.apiService.get(this.baseUrl + "/rest/codes/sub/category/" + data)
  }

  submitProvider(data:any){
    return this.apiService.post(this.baseUrl + "/rest/client/create/provider", data )
  }

  getAllClientData(data:any){
    return this.apiService.get(this.baseUrl + "/rest/client/view/" + data)
  }

  updateClientInfo(id:any, data:any){
    return this.apiService.put(this.baseUrl + "/rest/client/individual/" + id, data )
  }

  getClientContactPersons(clientNo: string){
    return this.apiService.get(this.baseUrl + "/rest/crm/client/view/contact/person/" + clientNo)
  }

  getClientEmployment(clientNo: string){
    return this.apiService.get(this.baseUrl + "/rest/crm/client/view/employment/" + clientNo)
  }

  getClientIdentification(clientNo: string){
    return this.apiService.get(this.baseUrl + "/rest/crm/client/view/identification/" + clientNo)
  }

  getClientSpouseDateOfBirth(clientNo: string){
    return this.apiService.get(this.baseUrl + "/rest/crm/client/view/spouse/dateofbirth/" + clientNo)
  }

  getClientDates(clientNo: string){
    return this.apiService.get(this.baseUrl + "/rest/crm/client/view/date/" + clientNo)
  }

  getClientData(clientNo: string){
    return this.apiService.get(this.baseUrl + "/rest/crm/client/view/date/" + clientNo)
  }

  getAgentDetails(clientNo: string){
    return this.apiService.get(this.baseUrl + "/rest/crm/client/view/agent/information/" + clientNo)
  }

  getProviderInfo(clientNo: string){
    return this.apiService.get(this.baseUrl + "/rest/crm/client/view/provider/info/" + clientNo)
  }

  getProviderBalance(clientNo: string){
    return this.apiService.get(this.baseUrl + "/rest/crm/client/view/balance/"+ clientNo)
  }

  getClientPassport(clientNo: string, subCategory: string){
    return this.apiService.get(`${this.baseUrl}/rest/document/view/client/other_kyc/${clientNo}/${subCategory}`)
  }

  getDocumentsBaseURL(){
    return this.apiService.getText(this.baseUrl + "/rest/global-options/awsBaseEndpoint")
  }

  getGeneralInfo(clientNo: string){
    return this.apiService.get(this.baseUrl + "/rest/crm/client/view/gen/info/" + clientNo)
  }

  getUsersList(){
    return this.apiService.get(this.baseUrl + "/rest/users/id/fullname")
  }

  getIdTypesList(){
    return this.apiService.get(this.baseUrl + "/rest/codes/sub/group/ID_TYPE")
  }
  
  getClientRelationships(clientNo: string){
    return this.apiService.get(this.baseUrl + "/rest/client/related/clients/" + clientNo)
  }

  getClientPolicies(clientNo: string){
    return this.apiService.get(`${this.baseUrl}/rest/policy/search?clientNo=${clientNo}`)
  }
  getPendingClaimsCount(clientNo: string){
    return this.apiService.get(`${this.baseUrl}/rest/claim/client/pending-claims/${clientNo}/false`)
      .pipe(map(pendingClaims => pendingClaims.length))
  }
  getPolicyCovers(policyNo: string){
    return this.apiService.get(this.baseUrl + "/rest/policy/covers/code-desc/cover-no/" + policyNo)
  }
  getPolicyCodeByPolicyNo(policyNo: string){
    return this.apiService.get(this.baseUrl + "/rest/policy/code/policy/" + policyNo)
  }
  getPolicyNoSuffix(policyNo: string){
    return this.apiService.get(this.baseUrl + "/rest/policy/code/policy/no/" + policyNo)
  }
  getPolicyCurrency(policyNo: string, policyCode: string){
    return this.apiService.get(`${this.baseUrl}/rest/policy/${policyNo}/${policyCode}`)
  }
  getCountriesList(){
    return this.apiService.getWithLocalCache(this.baseUrl + "/rest/location/country")
  }
  getRegionsList(countryCode: string){
    return this.apiService.getWithLocalCache(this.baseUrl + "/rest/location/region/country/" + countryCode)
  }
  getStatesList(regionCode: string){
    return this.apiService.getWithLocalCache(this.baseUrl + "/rest/location/state/" + regionCode)
  }
  postNewClaim(data){
    return this.apiService.post(this.baseUrl + "/rest/claim/", data)
  }
  getClientSignature(clientNo: string){
    return this.apiService.get(`${this.baseUrl}/rest/document/view/client/other_kyc/${clientNo}/SI`)
    .pipe(map(docs => docs[0]))
  }
  getClientPicture(clientNo: string){
    return this.apiService.get(`${this.baseUrl}/rest/document/view/client/other_kyc/${clientNo}/PP`)
      .pipe(
        map(docs => Array.isArray(docs) ? docs : []),
        map(docs => docs.find(doc => this.utilityService.isPictureFormat(doc?.fileName) && doc?.docKey != null))
      )
  }
  getClaimTypes(coverCode: string){
    return this.apiService.get(this.baseUrl + "/rest/product/covers/perils/claim-type/" + coverCode)
  }
  getPerils(coverCode: string, claimType: string){
    return this.apiService.get(`${this.baseUrl}/rest/product/covers/perils-details/peril-code/${coverCode}/${claimType}`)
  }
  getProximateCause(coverCode: string, claimType: string, perilCode: string){
    return this.apiService.get(`${this.baseUrl}/rest/product/covers/perils-details/prox-cause/${coverCode}/${claimType}/${perilCode}`)
  }
  downloadDocument(url: string){
    return this.apiService.get(url, null, {responseType: "blob"}).pipe(tap((res) => {
      console.log("blob response", res)
      const a = document.createElement("a");
      a.href = URL.createObjectURL(res);
      a.download = url.split('/').reverse()[0];
      console.log("a element before clicking", a)
      a.click()
    }))
  }
  getClientStatusesList() {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/category/CLIENT_STATUS'
    );
  }
  
  getClientDetails(clientNo: string){
    return this.apiService.get(this.baseUrl + '/rest/client/client-details/' + clientNo)
  }
}