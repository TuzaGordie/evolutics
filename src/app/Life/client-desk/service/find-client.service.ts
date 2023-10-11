import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { IClientViewData } from 'src/app/Shared/models/client-desk.interface';
import { environment } from 'src/environments/environment';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';
import { HelpersService } from './helpers.service';
import { forkJoin, of, throwError } from 'rxjs';
import { AppService } from 'src/app/Services/app.service';
import {
  EClientType,
  IClientSearchObj,
  IClientSearchResult,
  IClientUniqueObj,
} from '../client-extras/client.interface';
import {
  ICodeDescription,
  ICodeTitle,
} from 'src/app/Shared/models/index.model';
import { UserService } from 'src/app/Services/user.service';
import { UsersService } from 'src/app/Services/life/users.service';

@Injectable({
  providedIn: 'root',
})
export class FindClientService {
  clientInfo: any;
  providerInfo: any;
  searchedData: any = [];

  get baseURL() {
    return environment.apiBaseUrl + '/rest/';
  }

  constructor(
    public apiService: ApiService,
    private utilityService: HelpersService,
    private appService: AppService,
    private helpersService: HelpersService,
    private userS: UsersService
  ) {}

  getIdTypesList() {
    return this.apiService.get(this.baseURL + 'codes/sub/group/ID_TYPE');
  }

  getClientList(data: any) {
    return this.apiService.get(this.baseURL + 'client/view/' + data);
  }
  getClientContactPersons(clientNo: string) {
    return this.apiService.get(
      this.baseURL + 'crm/client/view/contact/person/' + clientNo
    );
  }
  checkClientType(data: any) {
    return this.apiService.get(this.baseURL + 'client/type/' + data);
  }
  getProviderInfoList(data: any) {
    return this.apiService.get(
      'https://dev-api-evt.herokuapp.com/cLIENT?PROVIDER_NO=' + data
    );
  }

  getClientList2() {
    return this.apiService.get('https://dev-api-evt.herokuapp.com/cLIENT');
  }
  getEndorsements(data: any) {
    return this.apiService.get(this.baseURL + 'client/endorsements/' + data);
  }
  getWebflows(data: any) {
    return this.apiService.get(this.baseURL + 'workflows/client/' + data);
  }
  getWebLogin(data: any) {
    return this.apiService.get(this.baseURL + 'client/web_access/' + data);
  }
  getPolicies() {
    return this.apiService.get(this.baseURL + 'client/policies/');
  }
  getPoliciesApi(
    id1,
    busLine = this.appService.getCurrentSystemMetadata.busline
  ) {
    return this.apiService.get(
      this.baseURL + 'policy/owned/client/' + id1 + '?busLine=' + busLine
    );
  }
  getBusinessApi(
    id1,
    busLine = this.appService.getCurrentSystemMetadata.busline
  ) {
    return this.apiService
      .get(this.baseURL + 'policy/owned/client/' + id1)
      .pipe(filter((item) => item.busLine != busLine));
  }
  getRelationshipApi(id) {
    return this.apiService.get(this.baseURL + 'client/related/clients/' + id);
  }
  createClientRelationship(data) {
    return this.apiService.post(this.baseURL + 'client/related/client', data);
  }
  updateClientRelationship(id, data) {
    return this.apiService.put(
      this.baseURL + 'client/related/client/' + id,
      data
    );
  }
  getPendingPaymentsApi(id1, id2) {
    return this.apiService.get(
      this.baseURL + 'client/pending/payment/adjustment/' + id1 + '/' + id2
    );
  }
  getPendingPayouts(clientNo) {
    return this.apiService.get(
      this.baseURL + 'payout/client/pending-payout/' + clientNo
    );
  }
  getPoliciesByClientNo(data: any) {
    return this.apiService.get(
      'http://dev-api-evt.herokuapp.com/getclientrelpolicy?CLIENT_NO=' + data
    );
  }
  getRelationship() {
    return this.apiService.get(
      'http://dev-api-evt.herokuapp.com/getclientrelbycNo'
    );
  }
  getPendingQuotes() {
    return this.apiService.get(this.baseURL + 'client/pending/quote/');
  }
  getPendingQuotesApi(clientNo: string, busLine: string) {
    return this.apiService.get(
      this.baseURL + 'client/pending/quote/' + clientNo + '?busLine=' + busLine
    );
  }
  getPendingQuotesByOwnerClientNo(clientNo: string) {
    return this.apiService.get(this.baseURL + 'policy/days/quote/' + clientNo);
  }
  getDocument(data: any) {
    return this.apiService.get(this.baseURL + 'document/client/' + data);
  }
  getPendingPayments() {
    return this.apiService.get(
      'https://dev-api-evt.herokuapp.com/Pendingpayments '
    );
  }
  getProviderList(data: any) {
    return this.apiService.get(this.baseURL + 'client/view/' + data);
  }
  searchProvider(queryForm) {
    return this.apiService.get(this.baseURL + '' + queryForm);
  }
  getProviderCategories() {
    return this.apiService.get(this.baseURL + 'codes/sub/group/PROVIDER_CAT');
  }
  getProviderSubCategories(providerCategory) {
    return this.apiService.get(
      this.baseURL + 'codes/sub/category/PROVIDER_SUBCAT/' + providerCategory
    );
  }
  getClientProviderName(providerNo) {
    return this.apiService.get(
      this.baseURL + 'client/provider/no/fullName/' + providerNo
    );
  }
  getClientNoByProviderNo(providerNo: string) {
    return this.apiService.getText(
      this.baseURL + 'client/no/provider/' + providerNo
    );
  }
  getEnroleeList(data: any) {
    return this.apiService.get(this.baseURL + 'client/view/' + data);
  }
  search = (data: IClientSearchObj) => {
    return this.apiService
      .get<IClientSearchResult[]>(this.baseURL + 'client/search', data)
      .pipe(
        map((res) => {
          res?.forEach((r) => {
            this.getFullname(r);
          });
          return res;
        }),
        catchError((e) => of(<IClientSearchResult[]>[]))
      );
  };
  getnameList(data: any) {
    return this.apiService.get(this.baseURL + 'client/search?name=' + data);
  }
  getphoneList(data: any) {
    return this.apiService.get(this.baseURL + 'client/search?phoneNo=' + data);
  }
  getemailList(data: any) {
    return this.apiService.get(this.baseURL + 'client/search?email=' + data);
  }

  getExternalRefList(data: any) {
    return this.apiService.get(
      this.baseURL + 'client/search?externalRef=' + data
    );
  }
  getCreatedByList(data: any) {
    return this.apiService.get(
      this.baseURL + 'client/search?createdBy=' + data
    );
  }
  getCreatedToo(data: any) {
    return this.apiService.get(
      this.baseURL + 'client/search?createDateTo=' + data
    );
  }
  getCreatedFrom(data: any) {
    return this.apiService.get(
      this.baseURL + 'client/search?createDateFrom=' + data
    );
  }
  submitPostData(data: any) {
    return this.apiService.post(
      'https://dev-api-evt.herokuapp.com/client_push_data',
      data
    );
  }

  getCodeList(data: any) {
    return this.apiService.get(this.baseURL + 'codes/sub/category/' + data);
  }

  getSubProviderTypesList(subGroup: string, providerType: string) {
    return this.apiService.get(
      this.baseURL + 'codes/sub/category/' + subGroup + '/' + providerType
    );
  }

  submitProvider(data: any) {
    return this.apiService.post(this.baseURL + 'client/create/provider', data);
  }

  getClientViewData(data: any) {
    return this.apiService
      .get<IClientViewData>(this.baseURL + 'client/view/' + data)
      .pipe(map((r) => this.getFullname(r)));
  }
  getFullname(clientData: any) {
    clientData.fullName = `${clientData.firstName || ''} ${
      clientData.middleName || ''
    } ${clientData.surname || ''}`;
    clientData.fullName = clientData.fullName?.trim()?.replace('  ', ' ');
    return clientData;
  }
  getClientPicture(clientNo: string) {
    return this.apiService
      .get(`${this.baseURL}document/view/client/other_kyc/${clientNo}/PP`)
      .pipe(
        map((docs) => (Array.isArray(docs) ? docs : [])),
        map((docs) =>
          docs.find(
            (doc) =>
              this.utilityService.isPictureFormat(doc?.fileName) &&
              doc?.docKey != null
          )
        )
      );
  }

  updateClientInfo(id: any, data: any) {
    return this.apiService.put(this.baseURL + 'client/individual/', +id, data);
  }

  getClientPassport(clientNo: string) {
    const docBaseURL$ = this.getDocumentsBaseURL();
    const documents$ = this.apiService.get(
      `${this.baseURL}document/view/client/other_kyc/${clientNo}/pp`
    );
    const defaultImage = '/assets/img/avatar.png';

    return forkJoin([docBaseURL$, documents$]).pipe(
      map(([docBaseURL, documents]) => {
        const pp = this.helpersService.extractPassportURL(
          documents,
          docBaseURL
        );
        return pp ? pp : defaultImage;
      }),
      catchError((e) => of(defaultImage))
    );
  }

  getDocumentsBaseURL() {
    return this.apiService.getText(
      this.baseURL + 'global-options/awsBaseEndpoint'
    );
  }

  getClientStatusCodes() {
    return this.apiService.get(
      this.baseURL + 'codes/sub/category/CLIENT_STATUS'
    );
  }

  getClientStatus(clientNo) {
    return this.apiService
      .get(this.baseURL + 'crm/client/view/gen/info/' + clientNo)
      .pipe(map((res) => res?.statusCd));
  }
  getClientPolicies(clientNo: string) {
    const busLine = this.appService.getCurrentSystemMetadata.busline;
    return this.apiService.get(
      `${this.baseURL}policy/owned/client/${clientNo}?busLine=${busLine}`
    );
  }
  getPolicyCovers(policyNo: string) {
    return this.apiService.get(
      this.baseURL + 'policy/covers/code-desc/cover-no/' + policyNo
    );
  }
  changeClaimStatus(data) {
    return this.apiService.put(
      this.baseURL + 'claim/change/claim/status',
      data
    );
  }
  adjustClaim(data) {
    return this.apiService.post(this.baseURL + 'claim/adjust/claim', data);
  }
  getPolicyCodeByPolicyNo(policyNo: string) {
    return this.apiService.get(this.baseURL + 'policy/code/policy/' + policyNo);
  }
  getPolicyCodesByPolicyNo(policyNo: string) {
    return this.apiService.get(
      this.baseURL + 'policy/code/policy/no/' + policyNo
    );
  }
  getPolicyNoSuffix(policyNo: string, policyCode: string) {
    return this.apiService.get(
      this.baseURL +
        'policy/group/list/policy/no/suffix/' +
        policyCode +
        '/' +
        policyNo
    );
  }
  getPolicyCurrency(policyNo: string, policyCode: string) {
    return this.apiService.get(
      `${this.baseURL}policy/${policyNo}/${policyCode}`
    );
  }
  getCountriesList() {
    return this.apiService.getWithLocalCache(this.baseURL + 'location/country');
  }
  getRegionsList(countryCode: string) {
    return this.apiService.getWithLocalCache(
      this.baseURL + 'location/region/country/' + countryCode
    );
  }
  getStatesList(regionCode: string) {
    return this.apiService.getWithLocalCache(
      this.baseURL + 'location/state/' + regionCode
    );
  }
  getTownsList(stateCode: string = '') {
    return this.apiService.getWithLocalCache(
      `${this.baseURL}location/town/${stateCode}`
    );
  }
  getStatesListByCountry(countryCode: string) {
    return this.apiService.getWithLocalCache(
      this.baseURL + 'location/state/country/' + countryCode
    );
  }
  getClaimTypes(coverCode: string) {
    return this.apiService.get(
      this.baseURL + 'product/covers/perils/claim-type/' + coverCode
    );
  }
  getClaimTypesList() {
    return this.apiService.get(this.baseURL + 'codes/sub/category/CLAIM_TYPE');
  }
  getPerils(coverCode: string, claimType: string) {
    return this.apiService.get(
      `${this.baseURL}product/covers/perils-details/peril-code/${coverCode}/${claimType}`
    );
  }
  getProximateCause(coverCode: string, claimType: string, perilCode: string) {
    return this.apiService.get(
      `${this.baseURL}product/covers/perils-details/prox-cause/${coverCode}/${claimType}/${perilCode}`
    );
  }
  postNewClaim(data) {
    return this.apiService.post(this.baseURL + 'claim/', data);
  }
  postClaimRequirementReceived({ claimReq, received, receivedBy, claimNo }) {
    return this.apiService.post(
      this.baseURL +
        `claim/received/claim/requirements/${claimReq}/${received}/${receivedBy}/${claimNo}`
    );
  }
  assignClaimProvider({
    providerAction,
    providerNo,
    providerInstruction,
    claimNo,
  }) {
    return this.apiService.post(
      this.baseURL +
        `claim/set/claim/provider/${providerAction}/${providerNo}/${providerInstruction}/${claimNo}`
    );
  }
  getTariffCodesList() {
    return this.apiService.get(this.baseURL + 'tariff/code/desc');
  }
  getAccountsList() {
    return this.apiService.get(this.baseURL + 'acc/codes/desc');
  }
  getWorkflowStatusList() {
    return this.apiService.get(
      this.baseURL + 'codes/sub/category/WORKFLOW_STATUS'
    );
  }
  getSlaLevelsList() {
    return this.apiService.get(this.baseURL + 'codes/sub/category/SLA_LEVEL');
  }
  getTotalPremiumReceived(clientNo) {
    return this.apiService.get(
      this.baseURL + 'bank/transactions/amount/sum/' + clientNo
    );
  }
  getPendingClaims(clientNo) {
    return this.apiService.get(
      this.baseURL + 'claim/client/pending-claims/' + clientNo
    );
  }
  getNotesList(clientNo: string | number) {
    return this.apiService.get(this.baseURL + 'notes/active/CLI/' + clientNo);
  }
  getSocialMediaAccounts(clientNo: string) {
    return this.apiService.get(
      this.baseURL + 'client/social/media/' + clientNo
    );
  }
  createSocialMediaAccount(data) {
    return this.apiService.post(this.baseURL + 'client/social/media', data);
  }
  editSocialMediaAccount(id, data) {
    return this.apiService.put(
      this.baseURL + 'client/social/media/' + id,
      data
    );
  }
  deleteSocialMediaAccount(id) {
    return this.apiService.delete(this.baseURL + 'client/' + id);
  }
  saveNote(note) {
    return this.apiService.post(this.baseURL + 'notes', note);
  }
  resolveNote({ refCat, refNo, id, resolvedBy }) {
    return this.apiService.put(
      this.baseURL + `notes/resolve/${refCat}/${refNo}/${id}/${resolvedBy}`,
      {}
    );
  }
  updatePostData(id: any, upatedata: any) {
    console.log('data and id', upatedata, id);
    let data = JSON.stringify(upatedata);
    return this.apiService.put(this.baseURL + `client/individual/${id}`, data);
  }
  createBankAccount(data) {
    return this.apiService.post(this.baseURL + 'client/bank', data);
  }
  getClientBanksList(clientNo) {
    return this.apiService.get(
      this.baseURL + 'client/existing/accounts/' + clientNo
    );
  }
  updateClientBank(bankId, data) {
    return this.apiService.put(this.baseURL + '' + bankId, data);
  }
  getClientIdentification(clientNo: string) {
    return this.apiService.get(
      this.baseURL + 'crm/client/view/identification/' + clientNo
    );
  }

  updateClientIdentification(id, record) {
    return this.apiService.put(this.baseURL + '' + id, record);
  }

  deleteClientIdentification(id) {
    return this.apiService.delete(this.baseURL + '' + id);
  }

  createClientIdentification(record) {
    return this.apiService.post(this.baseURL + '', record);
  }

  getClientEmployment(clientNo: string) {
    return this.apiService.get(
      this.baseURL + 'crm/client/view/employment/' + clientNo
    );
  }
  createEmployment(data) {
    return this.apiService.post(this.baseURL + '', data);
  }
  updateEmployment(recordId, data) {
    return this.apiService.put(this.baseURL + '' + recordId, data);
  }
  getAggregateLossRatio(clientNo: string) {
    return this.apiService
      .get(this.baseURL + 'client/cum/loss/ratio/' + clientNo)
      .pipe(map((res) => res[0]?.cumLossRatio));
  }
  downloadDocument(url: string) {
    return this.apiService.get(url, null, { responseType: 'blob' }).pipe(
      tap((res) => {
        console.log('blob response', res);
        const a = document.createElement('a');
        a.href = URL.createObjectURL(res);
        a.download = url.split('/').reverse()[0];
        console.log('a element before clicking', a);
        a.click();
      })
    );
  }

  getClaimStatus() {
    return this.apiService.get(this.baseURL + 'status/code/description/C');
  }

  getClaimRequirements(claimNo) {
    return this.apiService.get(this.baseURL + `/claim/requirements/${claimNo}`);
  }

  getProviderActions() {
    return this.apiService.get(
      this.baseURL + `codes/sub/group/PROVIDER_ACTION`
    );
  }
  getLanguages() {
    return this.apiService.get(this.baseURL + 'codes/sub/category/LANGUAGE');
  }
  getTitles() {
    return this.apiService.get(this.baseURL + 'codes/sub/category/TITLE');
  }
  getMaritalStatuses() {
    return this.apiService.getWithLocalCache<ICodeTitle[]>(
      this.baseURL + 'codes/sub/category/MARITAL_STATUS'
    );
  }
  getGenders() {
    return this.apiService.getWithLocalCache(
      this.baseURL + 'codes/sub/category/GENDER'
    );
  }
  updateClient(clientNo: string, data: IClientViewData) {
    return this.apiService
      .put(
        this.baseURL +
          (data.type == EClientType.corporate
            ? 'client/corporate/'
            : 'client/individual/') +
          clientNo,
        data
      )
      .pipe(
        tap((r) => {
          this.userS.getUserByClientNo(clientNo).subscribe((r) => {
            if (
              r &&
              (r.firstName != data.firstName || r.lastName != data.surname)
            ) {
              r.firstName = data.firstName;
              r.lastName = data.surname;
              this.userS.updateUserInfo(r.id, r);
            }
          });
        })
      );
  }
}
