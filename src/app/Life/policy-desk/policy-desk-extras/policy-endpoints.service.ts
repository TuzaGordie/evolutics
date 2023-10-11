import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPolicy } from './policy-desk.model';
import { ApiService } from 'src/app/Services/api.service';
import { ICover } from 'src/app/Shared/models/covers/cover.interface';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PolicyEndpointsService {
  private baseURL = environment.apiBaseUrl;

  constructor(private apiService: ApiService) {}
  getPolicyNoSuffixesList = (policyNo: string, policyCode: string) => {
    return this.apiService.get(
      this.baseURL +
        '/rest/policy/group/list/policy/no/suffix/' +
        policyCode +
        '/' +
        policyNo
    );
  };
  getCovers = (policyNo: string, policyCode: string) => {
    return this.apiService.get<ICover[]>(
      this.baseURL + `/rest/policy/covers/view/${policyNo}/${policyCode}`
    );
  };
  getOwnerName(policyNo) {
    return this.apiService.get(
      this.baseURL + `/rest/policy/owners/name/policy/no/${policyNo}`
    );
  }
  getPolicyCodes(policyCode) {
    return this.apiService.get(
      this.baseURL + `/rest/policy/code/policy/no/${policyCode}`
    );
  }

  getPolicyByNo = (policyNo: string, policyCode: string, suffix?: string) => {
    return this.apiService
      .get<IPolicy>(this.baseURL + `/rest/policy/${policyNo}/${policyCode}`)
      .toPromise();
  };

  findPolicies(
    agentNo?: string,
    clientNo?: string,
    createdDateFrom?: string,
    createdDateTo?: string,
    enroleeNo?: string,
    externalRef?: string,
    ownerName?: string,
    pageNumber?: number,
    pageSize?: number,
    policyNo?: string,
    productClass?: string,
    productCode?: string,
    propertyId?: string,
    quoteNo?: string,
    quoteStatus?: string,
    status?: string
  ) {
    return this.apiService.get(
      this.baseURL +
        `/rest/policy/search?agentNo=${agentNo}&clientNo=${clientNo}&createdDateFrom=${createdDateFrom}&createdDateTo=${createdDateTo}&enroleeNo=${enroleeNo}&externalRef=${externalRef}&ownerName=${ownerName}&pageNumber=${pageNumber}&pageSize=${pageSize}&policyNo=${policyNo}&productClass=${productClass}&productCode=${productCode}&propertyId=${propertyId}&quoteNo=${quoteNo}&quoteStatus=${quoteStatus}&status=${status}`
    );
  }
  searchPolicies(query: any) {
    return this.apiService.get(this.baseURL + `/rest/policy/search`, query);
  }

  getPolicyNumbers() {
    return this.apiService.get<{ policyNo: string }[]>(
      this.baseURL + '/rest/policy/no'
    );
  }

  getPolicy(policyNo) {
    return this.apiService.get(this.baseURL + `/rest/policy/${policyNo}`);
  }

  validateClientNo(clientNo) {
    return this.apiService.get(this.baseURL + `/rest/client/view/${clientNo}`);
  }

  getInsuranctType() {
    return this.apiService.get(this.baseURL + `/rest/codes/sub/group/INS_TYPE`);
  }

  getProductClass(insuranceType) {
    return this.apiService.get(
      this.baseURL + `/rest/codes/sub/category/PRODUCT_CLASS/${insuranceType}`
    );
  }

  getCodes() {
    return this.apiService.get(
      this.baseURL + `/rest/policy/product/code/class/status`
    );
  }

  getProductCode(productClass: string) {
    return this.apiService.get(
      this.baseURL + `/rest/product/code/desc/class/${productClass}`
    );
  }

  validate(
    agentNo?: string,
    clientNo?: string,
    createdDateFrom?: string,
    createdDateTo?: string,
    enroleeNo?: string,
    externalRef?: string,
    ownerName?: string,
    policyNo?: string,
    productClass?: string,
    productCode?: string,
    propertyId?: string,
    quoteNo?: string,
    quoteStatus?: string,
    status?: string
  ) {
    return this.apiService.get(
      this.baseURL +
        `/rest/policy/validate?agentNo=${agentNo}&clientNo=${clientNo}&createdDateFrom=${createdDateFrom}&createdDateTo=${createdDateTo}&enroleeNo=${enroleeNo}&externalRef=${externalRef}&ownerName=${ownerName}&policyNo=${policyNo}&productClass=${productClass}&productCode=${productCode}&propertyId=${propertyId}&quoteNo=${quoteNo}&quoteStatus=${quoteStatus}&status=${status}`
    );
  }
  validate2(query: any) {
    return this.apiService.get(this.baseURL + `/rest/policy/validate`, query);
  }

  getPolicyDocumentValues() {
    return this.apiService.get(
      this.baseURL + `/rest/correspondence/table/group/policy`
    );
  }

  generatePolicyDocument(
    documentCode?: string,
    policyCode?: string,
    policyNo?: string,
    policyNoSuffix?: string
  ) {
    return this.apiService.get(
      this.baseURL +
        `/rest/correspondence/generate/notification/text-file?documentCode=${documentCode}&policyCode=${policyCode}&policyNo=${policyNo}&policyNoSuffix=${policyNoSuffix}`
    );
  }
  getTransactions(
    policyNo: string,
    policyCode?: string,
    policyNoSuffix?: string
  ) {
    let url = this.baseURL + `/rest/bank/policy/transactions/${policyNo}`;
    url += policyCode || policyNoSuffix ? '?' : '';
    url += policyCode ? `policyCode=${policyCode}` : '';
    url +=
      policyCode && policyNoSuffix
        ? `&policyNoSuffix=${policyNoSuffix}`
        : policyNoSuffix
        ? `policyNoSuffix=${policyNoSuffix}`
        : '';
    return this.apiService.get(url).pipe(shareReplay());
  }
  getTransactionSum(clientNo?: string, refCat?: string, refNo?: string) {
    let url = this.baseURL + `/rest/bank/transactions/amount/sum`;
    if (clientNo || refCat || refNo) url += '?';
    url += clientNo ? `clientNo=${clientNo}` : '';
    url +=
      clientNo && refCat
        ? `&refCat=${refCat}`
        : refCat
        ? `refCat=${refCat}`
        : '';
    url +=
      (clientNo || refCat) && refNo
        ? `&refNo=${refNo}`
        : refNo
        ? `refNo=${refNo}`
        : '';
    return this.apiService.get(url).pipe(shareReplay());
  }

  getRelatedClients(policyNo: string, busline?: string, relType?: string) {
    let url =
      this.baseURL + `/rest/policy/related-clients?policyNo=${policyNo}`;
    if (busline || relType) url += '?';
    url += busline ? `busLine=${busline}` : '';
    url +=
      busline && relType
        ? `&relType=${relType}`
        : relType
        ? `relType=${relType}`
        : '';
    return this.apiService.get<any[]>(url).pipe(shareReplay());
  }
}
