import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { map, mergeMap, shareReplay, switchMap, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/Services/api.service';
import { AppService } from 'src/app/Services/app.service';
import { ESystemBusLine, ICodeTitle } from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import {
  CoverScreenNames,
  IAssetDetails,
  IAccessoryType,
  IAssuredRelToOwner,
  IBenefitPaymentFreq,
  IClientDetails,
  IContentCat,
  ICoverInfo,
  ICoverScreen,
  ICoversDetails,
  ICreateQuotePOST,
  ICurrency,
  IDiscountCode,
  IInsuranceType,
  IPremiumFrequency,
  IPremiumPaymentMethod,
  IProduct,
  ITargetContributionFreq,
  ICodes,
  IProviderSearchCriteria,
} from './quotation.interface';

const baseURL = environment.apiBaseUrl + '/rest';

@Injectable({
  providedIn: 'root',
})
export class QuotationService {
  constructor(private apiService: ApiService, public appS: AppService) {}
  getAgentName(agentNo: string) {
    return this.apiService
      .getText(baseURL + '/agent/name/' + agentNo)
      .pipe(shareReplay());
  }
  findAgentByName(name: string) {
    return this.apiService.get(baseURL + '/agent/search?name=' + name);
  }
  getBankAccounts(clientNo: string) {
    return this.apiService
      .get(baseURL + '/client/existing/accounts/' + clientNo)
      .pipe(shareReplay());
  }

  findCouponByName(name: string) {
    // define a function to store each policyNo as key with its ownerName as value
    let policyNosAndOwnerNamesObject;

    // fetch policies whose ownerName contains the passed-in name
    return this.findPolicyByOwnerName(name).pipe(
      map((policiesArray: any[]) => {
        // store the fullNames in a set with policy numbers as keys
        // return this object to the next operator
        return policiesArray.reduce(
          (policyNosObject, { policyNo, ownerName }) => {
            policyNosObject[policyNo] = ownerName;
            return policyNosObject;
          },
          {}
        );
      }),
      // save this policies object to our variable declared in beginning of the function for later use down the chain
      tap((policiesObject) => (policyNosAndOwnerNamesObject = policiesObject)),
      // convert policy object back to array for further processing
      map((policiesObject) => Object.entries(policiesObject)),
      // find coupons for each policyNo
      map((policies) =>
        policies.map(([policyNo, ownerName]) => {
          return this.apiService.get(
            baseURL + '/coupon/search?policyNo=' + policyNo
          );
        })
      ),
      // join all the coupons found for each policyNo
      mergeMap((coupons$) => forkJoin([...coupons$])),
      map((records) => {
        // extract the actual coupons from the content property where they are stored in the response object
        let coupons = [];
        records.forEach((record) => (coupons = coupons.concat(record.content)));
        // for each coupon object, attach the ownerName associated with its policyNo
        return coupons.map((coupon) => {
          coupon.ownerName = policyNosAndOwnerNamesObject[coupon.policyNo];
          return coupon;
        });
      })
    );
  }

  findPolicyByOwnerName(name: string) {
    return this.apiService.get(baseURL + '/policy/search?ownerName=' + name);
  }

  getClientFullName(clientNo: string) {
    return this.apiService
      .getText(baseURL + `/client/full_name/${clientNo}`)
      .pipe(shareReplay());
  }

  findClientByName(name: string) {
    return this.apiService.get(baseURL + '/client/search?name=' + name);
  }
  // getClientList(data: any) {
  //   return this.apiService.get(baseURL + '/rest/client/view/' + data);
  // }

  getClientDetails(clientNo: string) {
    return this.apiService
      .get<IClientDetails>(baseURL + '/client/view/' + clientNo)
      .pipe(shareReplay());
  }
  getAssuredRelToOwner(clientNo: string, relClientNo: string) {
    return this.apiService
      .get<IAssuredRelToOwner>(
        baseURL + '/client/view/relationship/' + clientNo + '/' + relClientNo
      )
      .pipe(shareReplay());
  }
  getCurrencyOptions(productCode: string) {
    return this.apiService
      .get<ICurrency[]>(baseURL + '/product/valid/currency/' + productCode)
      .pipe(shareReplay());
  }

  getDiscountCodeOptions() {
    return this.apiService
      .get<IDiscountCode[]>(
        baseURL + '/product/discount/code/desc/2021-10-08/2021-11-13'
      )
      .pipe(shareReplay());
  }
  getDiscountRate(data) {
    console.log('CALCULATED RATE' + data);
    return this.apiService
      .post<any>(baseURL + '/product/rate/calculate/discount/rate', data)
      .pipe(shareReplay());
  }
  getPaymentMethods() {
    return this.apiService
      .get(baseURL + '/product/covers/paying/methods')
      .pipe(shareReplay());
  }
  getAssetDetails(assetId: string) {
    return this.apiService
      .get<IAssetDetails>(baseURL + '/asset/detail/' + assetId)
      .pipe(shareReplay());
  }

  getPremiumFrequencyOptions(coverCode?: string) {
    return this.apiService
      .get<IPremiumFrequency[]>(
        baseURL + `/product/covers/premium/frequency/${coverCode}`
      )
      .pipe(shareReplay());
  }

  getFrequencyDescriptions() {
    return this.apiService
      .get<any[]>(baseURL + '/premium/frequency/frequency/description/')
      .pipe(shareReplay());
  }

  getCoverScreenDescriptions(coverCode) {
    return this.apiService
      .get<any>(baseURL + '/product/covers/screen/' + coverCode)
      .pipe(shareReplay());
  }

  getSBenefitPaymentFreqOptions(code: string) {
    return this.apiService
      .get<any[]>(baseURL + '/product/covers/ben/freq/' + code)
      .pipe(shareReplay());
  }
  getBenEscalOptions(code: string) {
    return this.apiService
      .get<any[]>(baseURL + '/product/covers/ben/escal/' + code)
      .pipe(shareReplay());
  }
  getLoanRate(code: string) {
    return this.apiService
      .get<any[]>(baseURL + '/product/covers/loan/int/rate/' + code)
      .pipe(shareReplay());
  }

  async getCoverCode(cover) {
    return this.apiService
      .get(
        `${baseURL}/product/covers/screen/${
          cover.info.coverCode || cover.info.riderCoverCode
        }`
      )
      .toPromise();
  }

  getCoverScreens(productCode: string) {
    // const covers: ICoverScreenData[] = [];
    return this.apiService
      .get<ICoverInfo[]>(baseURL + '/product/code/covers/' + productCode)
      .pipe(
        switchMap((coversList) => {
          console.log('COVERS LIST' + coversList);
          const screenRequests = coversList.map((cover) => {
            // Individual request for every cover to get screen type
            return this.apiService
              .get<ICoverScreen>(
                baseURL + '/product/covers/screen/' + cover.coverCode
              )
              .pipe(
                // Combine cover info and screen type
                map(
                  (screenData) =>
                    ({
                      info: cover,
                      screen: {
                        code: screenData?.coverScreen,
                        name: CoverScreenNames[screenData?.coverScreen],
                        desc: screenData?.description,
                      },
                    } as ICoversDetails)
                )
              );
          });
          return forkJoin(screenRequests);
        }),
        shareReplay()
      );
  }
  getProviderBySearchParameter(parameter: string, value: string) {
    return this.apiService
      .get<any[]>(baseURL + `/client/provider/search?${parameter}=${value}`)
      .pipe(shareReplay());
  }
  getPremiumPaymentMethods() {
    return this.apiService.get<IPremiumPaymentMethod[]>(
      baseURL + '/payin/method/code/desc'
    );
  }
  getRelManager() {
    return this.apiService.get<any>(
      baseURL + `/users/search?${'relManager=true'}`
    );
  }

  getSubRelManager() {
    return this.apiService.get<any>(
      baseURL + `/users/search?${'subRelManager=true'}`
    );
  }

  getProductInfo(productCode: string) {
    return this.apiService
      .get<any>(baseURL + '/product/basic/' + productCode)
      .pipe(shareReplay());
  }
  getEscalationValue(code: string) {
    return this.apiService
      .get<any[]>(baseURL + '/product/annuity/escalation/rate/' + code)
      .pipe(shareReplay());
  }
  getReversionaryProportion(code: string) {
    return this.apiService
      .get<any[]>(baseURL + '/product/covers/annuity/rev/percent/' + code)
      .pipe(shareReplay());
  }
  getGuaranteePeriod(code: string) {
    return this.apiService
      .get<any[]>(baseURL + '/product/covers/annuity/guarantee/period/' + code)
      .pipe(shareReplay());
  }
  getAnnuityFrequency(code: string) {
    return this.apiService
      .get<any[]>(baseURL + '/product/annuity/frequency/' + code)
      .pipe(shareReplay());
  }
  getDefaultOptions(code: string) {
    return this.apiService
      .get<any>(baseURL + '/product/default/' + code)
      .pipe(shareReplay());
  }

  getExcessOptions(code: string) {
    return this.apiService
      .get<any>(baseURL + '/product/covers/excess/' + code)
      .pipe(shareReplay());
  }
  getMoreExcessOPtions(code: string) {
    return this.apiService
      .get<any[]>(baseURL + '/product/covers/excess/opt/' + code)
      .pipe(shareReplay());
  }
  getDeductibleOptions(code: string) {
    return this.apiService
      .get<any>(baseURL + '/product/covers/deductible/' + code)
      .pipe(shareReplay());
  }
  getMoreDeductibleOptions(code: string) {
    return this.apiService
      .get<any>(baseURL + '/product/covers/deductible/opt/' + code)
      .pipe(shareReplay());
  }
  getAssuredBasisOptions() {
    console.error('getAssuredBasisOptions method is not implemented');
    return of(null);
  }
  getAssuredMultipleOptions() {
    return this.apiService
      .get<any[]>(baseURL + '/product/covers/sumAssured/saFactor/Code')
      .pipe(shareReplay());
  }
  getCodesBySubGroup(subgroup: string) {
    return this.apiService
      .get<ICodes[]>(baseURL + '/codes/sub/group/' + subgroup)
      .pipe(shareReplay());
  }
  getSumAssured(code, asset) {
    return this.apiService
      .get<any>(
        baseURL + '/product/covers/sumAssured/' + code + '?assetId=' + asset
      )
      .pipe(shareReplay());
  }
  getAccessoryCatOptions() {
    return this.apiService
      .get<IAccessoryType[]>(baseURL + '/codes/sub/group/ACCESSORY_TYPE')
      .pipe(shareReplay());
  }
  getBenefitPaymentFreqOptions() {
    return this.apiService
      .get<IBenefitPaymentFreq[]>(
        baseURL + '/product/covers/benefits/benPayFreq'
      )
      .pipe(shareReplay());
  }
  getContentCatOptions() {
    return this.apiService
      .get<IContentCat[]>(baseURL + '/codes/sub/group/CONTENT_TYPE')
      .pipe(shareReplay());
  }
  getTargetContributionFreqOptions() {
    return this.apiService
      .get<ITargetContributionFreq[]>(
        baseURL + '/product/covers/premium/frequency'
      )
      .pipe(shareReplay());
  }

  getCodes() {
    return this.apiService
      .get<ICodes[]>(baseURL + '/codes')
      .pipe(shareReplay());
  }

  getProvider(code: string) {
    return this.apiService.get<any>(
      baseURL + `/company/self/coins/provider/${code}`
    );
  }

  getInsuranceTypeOptions() {
    const line = this.appS.getCurrentSystemMetadata.busline;
    return this.apiService
      .get<IInsuranceType[]>(baseURL + '/codes/sub/category/INS_TYPE/' + line)
      .pipe(shareReplay());
  }
  getProductClassOptions(insuranceType: string) {
    return this.apiService
      .get<any[]>(
        baseURL + '/codes/sub/category/PRODUCT_CLASS/' + insuranceType
      )
      .pipe(shareReplay());
  }
  getProductOptions(
    insuranceType: string,
    productClass: string,
    groupBusiness: boolean
  ) {
    return this.apiService
      .get<IProduct[]>(
        `${baseURL}/product/code/description?groupBusiness=${groupBusiness}&insuranceType=${insuranceType}&productClass=${productClass}`
      )
      .pipe(shareReplay());
  }

  getBranchOptions(agentNo: string) {
    return this.apiService
      .get(baseURL + '/agent/branch/code/' + agentNo)
      .pipe(shareReplay());
  }
  getPurchaseValue(assetId: string) {
    return this.apiService
      .get(baseURL + '/asset/value/' + assetId)
      .pipe(shareReplay());
  }
  getPolicyTerms(coverCode: string) {
    return this.apiService
      .get<any>(baseURL + '/product/covers/terms/opt/' + coverCode)
      .pipe(shareReplay());
  }
  getMoreTerms(coverCode: string) {
    return this.apiService
      .get(baseURL + '/product/covers/terms/' + coverCode)
      .pipe(shareReplay());
  }
  getBranchCode(agentNo: string) {
    return this.apiService
      .get(baseURL + '/agent/branch/code/' + agentNo)
      .pipe(shareReplay());
  }
  getDependentCovers(code: string) {
    return this.apiService
      .get<any[]>(baseURL + '/product/covers/dependent/covers/' + code)
      .pipe(
        switchMap((coversList) => {
          const screenRequests = coversList.map((cover) => {
            // Individual request for every cover to get screen type
            return this.apiService
              .get<ICoverScreen>(
                baseURL + '/product/covers/screen/' + cover.code
              )
              .pipe(
                // Combine cover info and screen type
                map(
                  (screenData) =>
                    ({
                      info: cover,
                      screen: {
                        code: screenData?.coverScreen,
                        name: CoverScreenNames[screenData.coverScreen],
                      },
                    } as ICoversDetails)
                )
              );
          });
          return forkJoin(screenRequests);
        }),
        shareReplay()
      );
  }

  validateAgentNo(agentNo: string) {
    return this.apiService
      .get<boolean>(baseURL + '/policy/validate?agentNo=' + agentNo)
      .pipe(shareReplay());
  }

  validateAssetId(assetId: string) {
    return this.apiService
      .get<boolean>(baseURL + '/policy/validate?assetId=' + assetId)
      .pipe(shareReplay());
  }
  validateRedgNo(redgNo: string) {
    return this.apiService
      .get<boolean>(baseURL + 'policy/validate?propertyId=' + redgNo)
      .pipe(shareReplay());
  }

  submitIndividualQuote(quote: any) {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'form/data'
    //   })
    // }
    const postURL = baseURL + '/policy/individual/quote';
    // const formData: FormData = new FormData
    // formData.append('input', quote)
    // formData.append('file', uploadDocument)
    return this.apiService.post(postURL, quote);
  }

  submitGroupQuote(quote: any) {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'form/data'
    //   })
    // }
    const postURL = baseURL + '/policy/group/quote';
    // const formData: FormData = new FormData
    // formData.append('input', quote)
    // formData.append('file', uploadDocument)
    return this.apiService.post(postURL, quote);
  }

  getProviderNo(providerNo: string) {
    return this.apiService
      .get<any>(baseURL + `/client/provider/no/fullName/${providerNo}`)
      .pipe(shareReplay());
  }

  getLeadProvider(userCode: string) {
    return this.apiService
      .get<any>(baseURL + `/company/self/coins/provider/${userCode}`)
      .pipe(shareReplay());
  }

  searchProvider(providerName) {
    return this.apiService
      .get<any>(
        baseURL + `/client/provider/search?providerName=${providerName}`
      )
      .pipe(shareReplay());
  }

  findMatchingValue(set, properties) {
    return set.filter(function (entry) {
      return Object.keys(properties).every(function (key) {
        return entry[key] === properties[key];
      });
    });
  }

  getCodeSubGroup = (value: string, value2?: string) => {
    console.log('Did it get here' + value, value2);
    return this.apiService.get<ICodeTitle[]>(
      baseURL + `/codes/sub/category/${value}/${value2}`
    );
  };

  getCodeSubGroupAndCodeCat = (value: string) => {
    console.log('Did it get here');
    return this.apiService.get<ICodeTitle[]>(
      baseURL + `/codes/sub/category/PROVIDER_SUBCATEGORY/${value}`
    );
  };

  submitIndividualQuoteCovers(quote: any) {
    const postURL = baseURL + `/policy/quote/covers`;
    return this.apiService.post<any[]>(postURL, quote);
  }

  submitIndividualPolicyQuote(quote: any) {
    const postURL = baseURL + '/policy/quote/policy/group';
    return this.apiService.post<any>(postURL, quote);
  }

  submitIndividualCoversAnnuity(quote: any) {
    const postURL = baseURL + `/policy/individual/quote/covers/annuity`;
    return this.apiService.post(postURL, quote);
  }

  submitIndividualAgentsQuote(quote: any) {
    const postURL = baseURL + `/policy/quote/agent`;
    return this.apiService.post<any[]>(postURL, quote);
  }

  submitIndividualClientsInfo(quote: any) {
    const postURL = baseURL + `/policy/individual/quote/relatedClientsInfo`;
    return this.apiService.post<any[]>(postURL, quote);
  }
}
