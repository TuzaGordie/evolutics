import { ApiService } from 'src/app/Services/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { map, share, shareReplay, switchMap } from 'rxjs/operators';
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
} from './quotation.interface';

const baseURL = environment.apiBaseUrl + '/rest';

@Injectable({
  providedIn: 'root',
})
export class QuotationService {
  constructor(private apiService: ApiService) {}
  get baseURL() {
    return environment.apiBaseUrl + '/rest';
  }

  convertQuote(quoteNo: string, userCode: string, convertReason: string) {
    return this.apiService
      .get(
        baseURL +
          `/policy/convert/quote/${quoteNo}/${userCode}/${convertReason}`
      )
      .pipe(shareReplay());
  }
  getAgentName(agentNo: string) {
    return this.apiService
      .getText(this.baseURL + '/agent/name/' + agentNo)
      .pipe(shareReplay());
  }

  getProductInfo(productCode: string) {
    return this.apiService
      .get<any>(this.baseURL + '/product/basic/' + productCode)
      .pipe(shareReplay());
  }
  getBankAccount(clientNo: string) {
    return this.apiService
      .get<any[]>(this.baseURL + '/client/bankNo/' + clientNo)
      .pipe(shareReplay());
  }
  getBankTransactions(quoteNo: string) {
    return this.apiService
      .get<any[]>(this.baseURL + `/bank/transactions/quote/${quoteNo}`)
      .pipe(shareReplay());
  }
  getAccounts(bankNo: string) {
    return this.apiService
      .get(this.baseURL + '/client/bank/' + bankNo)
      .pipe(shareReplay());
  }
  getBankAccounts(clientNo: string) {
    return this.apiService
      .get(this.baseURL + '/client/existing/accounts/' + clientNo)
      .pipe(shareReplay());
  }
  getClientFullName(clientNo: string) {
    return this.apiService
      .getText(this.baseURL + '/client/full_name/' + clientNo)
      .pipe(shareReplay());
  }
  getClientDetails(clientNo: string) {
    return this.apiService
      .get<IClientDetails>(this.baseURL + '/client/view/' + clientNo)
      .pipe(shareReplay());
  }
  getAssuredRelToOwner(clientNo: string, relClientNo: string) {
    return this.apiService
      .get<IAssuredRelToOwner>(
        this.baseURL +
          '/client/view/relationship/' +
          clientNo +
          '/' +
          relClientNo
      )
      .pipe(shareReplay());
  }
  getCurrencyOptions(productCode: string) {
    return this.apiService
      .get<ICurrency[]>(this.baseURL + '/product/valid/currency/' + productCode)
      .pipe(shareReplay());
  }

  getDiscountCodeOptions() {
    return this.apiService
      .get<IDiscountCode[]>(
        this.baseURL + '/product/discount/code/desc/2021-10-08/2021-11-13'
      )
      .pipe(shareReplay());
  }
  getDiscountRate(data) {
    return this.apiService
      .post<any>(this.baseURL + '/product/rate/calculate/discount/rate', data)
      .pipe(shareReplay());
  }
  getDefaultOptions(code: string) {
    return this.apiService
      .get<any>(this.baseURL + '/product/default/' + code)
      .pipe(shareReplay());
  }

  getMoreExcessOPtions(code: string) {
    return this.apiService
      .get<any[]>(this.baseURL + '/product/covers/excess/opt/' + code)
      .pipe(shareReplay());
  }
  getMoreDeductibleOptions(code: string) {
    return this.apiService
      .get<any>(this.baseURL + '/product/covers/deductible/opt/' + code)
      .pipe(shareReplay());
  }

  getAssetDetails(assetId: string) {
    return this.apiService
      .get<IAssetDetails>(this.baseURL + '/asset/detail/' + assetId)
      .pipe(shareReplay());
  }

  getPremiumFrequencyOptions(coverCode: string) {
    return this.apiService
      .get<IPremiumFrequency[]>(
        this.baseURL + '/product/covers/premium/frequency/' + coverCode
      )
      .pipe(shareReplay());
  }

  getFrequencyDescriptions() {
    return this.apiService
      .get<any[]>(this.baseURL + '/premium/frequency/frequency/description/')
      .pipe(shareReplay());
  }

  getCoverScreenDescriptions(coverCode) {
    return this.apiService
      .get<any>(this.baseURL + '/product/covers/screen/' + coverCode)
      .pipe(shareReplay());
  }

  getEscalationValue(code: string) {
    return this.apiService
      .get<any[]>(this.baseURL + '/product/annuity/escalation/rate/' + code)
      .pipe(shareReplay());
  }
  getReversionaryProportion(code: string) {
    return this.apiService
      .get<any[]>(this.baseURL + '/product/covers/annuity/rev/percent/' + code)
      .pipe(shareReplay());
  }
  getGuaranteePeriod(code: string) {
    return this.apiService
      .get<any[]>(
        this.baseURL + '/product/covers/annuity/guarantee/period/' + code
      )
      .pipe(shareReplay());
  }
  getAnnuityFrequency(code: string) {
    return this.apiService
      .get<any[]>(this.baseURL + '/product/annuity/frequency/' + code)
      .pipe(shareReplay());
  }

  getDefaultFrequencies() {
    return this.apiService
      .get<any[]>(this.baseURL + '/product/covers/premium/frequency')
      .pipe(shareReplay());
  }

  getAnnuityTerm(code: string) {
    return this.apiService
      .get<any[]>(
        this.baseURL + '/product/covers/annuity/guarantee/period/' + code
      )
      .pipe(shareReplay());
  }

  async getCoverCode(cover) {
    return this.apiService
      .get<IPremiumPaymentMethod>(
        `${this.baseURL}/product/covers/screen/${
          cover.info.coverCode || cover.info.riderCoverCode
        }`
      )
      .toPromise();
  }

  getCoverScreens(productCode: string) {
    // const covers: ICoverScreenData[] = [];

    return this.apiService
      .get<ICoverInfo[]>(this.baseURL + '/product/code/covers/' + productCode)
      .pipe(
        switchMap((coversList) => {
          const screenRequests = coversList.map((cover) => {
            // Individual request for every cover to get screen type
            return this.apiService
              .get<ICoverScreen>(
                this.baseURL + '/product/covers/screen/' + cover.coverCode
              )
              .pipe(
                // Combine cover info and screen type
                map((screenData) => {
                  if (!screenData) {
                    screenData = {
                      description: null,
                      coverScreen: null,
                    };
                  }
                  return {
                    info: cover,
                    screen: {
                      code: screenData.coverScreen,
                      name: CoverScreenNames[screenData.coverScreen],
                      desc: screenData.description,
                    },
                  } as ICoversDetails;
                })
              );
          });
          return forkJoin(screenRequests);
        }),
        shareReplay()
      );
  }

  getPremiumPaymentMethods() {
    return this.apiService
      .get<IPremiumPaymentMethod[]>(this.baseURL + '/payin/method/code/desc')
      .pipe(shareReplay());
  }
  getCodesBySubGroup(subgroup: string) {
    return this.apiService
      .get<ICodes[]>(this.baseURL + '/codes/sub/group/' + subgroup)
      .pipe(shareReplay());
  }
  getProviderBySearchParameter(parameter: string, value: string) {
    return this.apiService
      .get<any>(this.baseURL + `/client/provider/search?${parameter}=${value}`)
      .pipe(shareReplay());
  }

  getPaymentMethods(code: string) {
    return this.apiService
      .get<any[]>(this.baseURL + '/product/covers/premium/frequency/' + code)
      .pipe(shareReplay());
  }

  getExcessOptions(code: string) {
    return this.apiService
      .get<any>(this.baseURL + '/product/covers/excess/' + code)
      .pipe(shareReplay());
  }
  getDeductibleOptions(code: string) {
    return this.apiService
      .get<any>(this.baseURL + '/product/covers/deductible/' + code)
      .pipe(shareReplay());
  }
  getAssuredBasisOptions() {
    console.error('getAssuredBasisOptions method is not implemented');
    return of(null);
  }
  getAssuredMultipleOptions() {
    return this.apiService
      .get<any[]>(this.baseURL + '/product/covers/sumAssured/saFactor/Code')
      .pipe(shareReplay());
  }
  getSumAssured(code, asset) {
    return this.apiService
      .get<any>(
        this.baseURL + '/product/covers/sumAssured/' + code + '/' + asset
      )
      .pipe(shareReplay());
  }
  getAccessoryCatOptions() {
    return this.apiService
      .get<IAccessoryType[]>(this.baseURL + '/codes/sub/group/ACCESSORY_TYPE')
      .pipe(shareReplay());
  }
  getBenefitPaymentFreqOptions() {
    return this.apiService
      .get<IBenefitPaymentFreq[]>(
        this.baseURL + '/product/covers/benefits/benPayFreq'
      )
      .pipe(shareReplay());
  }
  getSBenefitPaymentFreqOptions(code: string) {
    return this.apiService
      .get<any[]>(this.baseURL + '/product/covers/ben/freq/' + code)
      .pipe(shareReplay());
  }
  getBenEscalOptions(code: string) {
    return this.apiService
      .get<any[]>(this.baseURL + '/product/covers/ben/escal/' + code)
      .pipe(shareReplay());
  }
  getBenTermOptions(code: string) {
    return this.apiService
      .get<any>(baseURL + '/product/covers/ben/term/opt/' + code)
      .pipe(shareReplay());
  }
  getLoanRate(code: string) {
    return this.apiService
      .get<any[]>(this.baseURL + '/product/covers/loan/int/rate/' + code)
      .pipe(shareReplay());
  }
  getContentCatOptions() {
    return this.apiService
      .get<IContentCat[]>(this.baseURL + '/codes/sub/group/CONTENT_TYPE')
      .pipe(shareReplay());
  }
  getTargetContributionFreqOptions() {
    return this.apiService
      .get<ITargetContributionFreq[]>(
        this.baseURL + '/product/covers/premium/frequency'
      )
      .pipe(shareReplay());
  }

  getInsuranceTypeOptions() {
    return this.apiService
      .get<IInsuranceType[]>(this.baseURL + '/codes/sub/category/INS_TYPE/L')
      .pipe(shareReplay());
  }
  getProductClassOptions(insuranceType: string) {
    return this.apiService
      .get<any[]>(
        this.baseURL + '/codes/sub/category/PRODUCT_CLASS/' + insuranceType
      )
      .pipe(shareReplay());
  }
  getProductDescription(productCode: string) {
    return this.apiService
      .get(baseURL + '/product/desc/' + productCode)
      .pipe(shareReplay());
  }
  getProductOptions(productClass: string) {
    return this.apiService
      .get<IProduct[]>(
        this.baseURL + '/product/code/desc/class/' + productClass
      )
      .pipe(shareReplay());
  }

  getBranchOptions(agentNo: string) {
    return this.apiService
      .get(this.baseURL + 'rest/agent/branch/code/' + agentNo)
      .pipe(shareReplay());
  }
  getPurchaseValue(assetId: string) {
    return this.apiService
      .get(this.baseURL + '/asset/value/' + assetId)
      .pipe(shareReplay());
  }
  getPolicyTerms(coverCode: string) {
    return this.apiService
      .get<any>(this.baseURL + '/product/covers/terms/opt/' + coverCode)
      .pipe(shareReplay());
  }
  getMoreTerms(coverCode: string) {
    return this.apiService
      .get(this.baseURL + '/product/covers/terms/' + coverCode)
      .pipe(shareReplay());
  }
  getBranchCode(agentNo: string) {
    return this.apiService
      .get(this.baseURL + '/agent/branch/code/' + agentNo)
      .pipe(shareReplay());
  }
  getDependentCovers(code: string) {
    return this.apiService
      .get<any[]>(this.baseURL + '/product/covers/dependent/covers/' + code)
      .pipe(
        switchMap((coversList) => {
          const screenRequests = coversList.map((cover) => {
            // Individual request for every cover to get screen type
            return this.apiService
              .get<ICoverScreen>(
                this.baseURL + '/product/covers/screen/' + cover.code
              )
              .pipe(
                // Combine cover info and screen type
                map(
                  (screenData) =>
                    ({
                      info: cover,
                      screen: {
                        code: screenData.coverScreen,
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
      .get<boolean>(this.baseURL + '/policy/validate?agentNo=' + agentNo)
      .pipe(shareReplay());
  }

  validateAssetId(assetId: string) {
    return this.apiService
      .get<boolean>(this.baseURL + '/policy/validate?assetId=' + assetId)
      .pipe(shareReplay());
  }
  validateRedgNo(redgNo: string) {
    return this.apiService
      .get<boolean>(this.baseURL + 'policy/validate?propertyId=' + redgNo)
      .pipe(shareReplay());
  }

  submitIndividualQuoteCovers(quote: any) {
    const postURL = this.baseURL + `/policy/quote/covers`;
    return this.apiService.post<any[]>(postURL, quote);
  }

  submitIndividualPolicyQuote(quote: any) {
    const postURL = this.baseURL + '/policy/quote/policy/group';
    return this.apiService.post<any>(postURL, quote);
  }

  submitIndividualCoversAnnuity(quote: any) {
    const postURL = this.baseURL + `/policy/individual/quote/covers/annuity`;
    return this.apiService.post(postURL, quote);
  }

  submitIndividualAgentsQuote(quote: any) {
    const postURL = this.baseURL + `/policy/quote/agent`;
    return this.apiService.post<any[]>(postURL, quote);
  }

  submitIndividualClientsInfo(quote: any) {
    const postURL =
      this.baseURL + `/policy/individual/quote/relatedClientsInfo`;
    return this.apiService.post<any[]>(postURL, quote);
  }

  submitBankInfo(quote: any) {
    const postURL = baseURL + '/policy/bank';
    return this.apiService.post<any>(postURL, quote);
  }

  downloadReport = (code: string, format: any) => {
    return this.apiService.get(
      this.baseURL + `reports/export/${code}/${format}`,
      null,
      {
        responseType: 'arraybuffer',
      }
    );
  };
}
