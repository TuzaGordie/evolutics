import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormGroupName } from '@angular/forms';
import { map } from 'rxjs/operators';
import { IPremiumFrequency } from 'src/app/General/services/quotation.interface';
import { ApiService } from 'src/app/Services/api.service';
import { CodeService } from 'src/app/Services/code.service';
import {
  ICodeDescription,
  ICodeTitle,
} from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import {
  IProductBasic,
  IProductCode,
  IProductDefaults,
  IProductDependentCovers,
  IProductDocumentation,
  IProductPolicyInfo,
  IProductQuoteInfo,
} from './product-code.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  deleteCurrency(id: any) {
    return this.apiService
      .deleteWithBody(this.baseUrl + '/rest/product/basic', {
        // companiesAllowedId: [0],
        currencyAllowedId: [id],
        // discountsAllowedId: [0],
      })
      .toPromise();
  }
  deleteCompany(id: any) {
    return this.apiService
      .deleteWithBody(this.baseUrl + '/rest/product/basic', {
        companiesAllowedId: [id],
        // currencyAllowedId: [0],
        // discountsAllowedId: [0],
      })
      .toPromise();
  }
  deleteDiscount(id: any) {
    return this.apiService
      .deleteWithBody(this.baseUrl + '/rest/product/basic', {
        // companiesAllowedId: [0],
        // currencyAllowedId: [0],
        discountsAllowedId: [id],
      })
      .toPromise();
  }
  deleteDependentCovers(id: string) {
    return this.apiService
      .deleteWithBody(this.baseUrl + '/rest/product/dependent-covers', {
        coversId: +id,
        coversSubGroupId: [],
      })
      .toPromise();
  }
  deleteDependentSubCovers(id: string) {
    return this.apiService
      .deleteWithBody(this.baseUrl + '/rest/product/dependent-covers', {
        coversId: null,
        coversSubGroupId: [+id],
      })
      .toPromise();
  }
  private baseUrl = environment.apiBaseUrl;

  constructor(private apiService: ApiService,public codeS:CodeService) {}

  deleteDocumentations(id: string) {
    return this.apiService
      .delete(this.baseUrl + `/rest/product/documentations/${id}`)
      .toPromise();
  }

  getInsuranceType = (data: any) => {
    return this.apiService.getWithLocalCache(
      this.baseUrl + `/rest/codes/sub/category/${data}`
    );
  };

  getProductClassByInsType = (data: any) => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/category/INS_TYPE/' + data
    );
  };

  getProductByProdClass = (data: any) => {
    return this.apiService.getWithLocalCache(
      this.baseUrl + '/rest/product/code/desc/class/' + data
    );
  };

  getCodeList = (data: any) => {
    return this.apiService.getWithLocalCache(
      this.baseUrl + `/rest/codes/sub/category/PRODUCT_CLASS/${data}`
    );
  };

  getCodeLists = (data: any) => {
    return this.apiService.get(
      this.baseUrl + `/rest/codes/sub/category/${data}`
    );
  };

  getCurrenciesList = () => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseUrl + '/rest/currency/'
    );
  };
  getCompanyList = () => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseUrl + '/rest/company/code/desc'
    );
  };
  getDiscountList = () => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseUrl + '/rest/product/rate/discount/code/desc'
    );
  };
  getCoversByCompanyCode = (code: string) => {
    return code
      ? this.apiService.get(
          this.baseUrl + '/rest/product/covers/basics/code/desc/' + code
        )
      : null;
  };

  getDocumentNamesByEventName = (eventName: string) => {
    return this.apiService.get(
      this.baseUrl + '/rest/document/code/name/title/' + eventName
    );
  };

  getBranch = (data?: any) => {
    return this.apiService.get(this.baseUrl + '/rest/branch/code/desc');
  };

  getUploadFileBasis = () => {
    return this.apiService.getCodes(
      this.baseUrl + '/rest/codes/sub/group/UPLOAD_FILE_BASIS'
    );
  };

  /*  ACCOUNT */
  getScreensList = (data: any) => {
    return this.apiService.get(this.baseUrl + '/rest/screen/code/desc/' + data);
  };

  getCodeGroup = (data: any) => {
    return this.apiService.getWithLocalCache<ICodeTitle[]>(
      this.baseUrl + '/rest/codes/sub/group/' + data
    );
  };
  getAgeCalculationBases = () => {
    return this.apiService
      .get(this.baseUrl + '/rest/codes/sub/group/AGE_CALC_BASIS')
      .pipe(
        map((res) => {
          try {
            res.forEach((element) => {
              element.code = +element.code;
            });
          } catch (e) {
            console.error(e);
          }
          return res;
        })
      );
  };

  getPremiumFrequency = () => {
    return this.codeS.getCodesByCodeSubGroup('Frequency')
  };

  getBenefitPayment = () => {
    return this.apiService.getCodes(
      this.baseUrl + '/rest/codes/sub/group/PAYOUTWARD_METHOD'
    );
  };

  getDefaultProvider = (providerCat: string) => {
    return this.apiService.get(
      this.baseUrl + '/rest/client/policies/' + providerCat
    );
  };

  createProductRequest = (data: Partial<IProductCode>) => {
    return this.apiService.post(this.baseUrl + '/rest/product/', data);
  };

  updateProductRequest(prodCode, data: Partial<IProductCode>) {
    return this.apiService.put(
      this.baseUrl + '/rest/product/' + prodCode,
      data
    );
  }

  getProductByCode(prodCode: string) {
    return this.apiService
      .get<IProductCode>(this.baseUrl + '/rest/product/code/' + prodCode)
      .pipe(
        map((r) => {
          r.documentations =
            r.documentations?.length > 0 ? r.documentations : null;
          r.dependentCovers =
            r.dependentCovers?.cover?.length > 0 ||
            r.dependentCovers?.permanentSubgroups?.length > 0
              ? r.dependentCovers
              : null;
          return r;
        })
      );
  }

  getEvent = (data: any) => {
    return this.apiService.get(
      this.baseUrl + '/rest/product/event/list/' + data
    );
  };

  getBenefitPaymentFrequency = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/category/FREQUENCY'
    );
  };

  postBasic = (data: IProductBasic, productCode?: string) => {
    return this.apiService
      .post<IProductBasic>(this.baseUrl + '/rest/product/basic', data)
      .pipe(map((data) => ({ data, productCode: data.code })));
  };
  postDefaults = (data: IProductBasic, productCode?: string) => {
    return this.apiService
      .post<IProductDefaults>(
        this.baseUrl + '/rest/product/defaults/' + productCode,
        data
      )
      .pipe(map((data) => ({ data, productCode: data.productCode })));
  };
  postDependent = (data: IProductBasic, productCode: string) => {
    return this.apiService
      .post<IProductDependentCovers>(
        this.baseUrl + `/rest/product/dependent-covers/${productCode}`,
        data
      )
      .pipe(map((data) => ({ data, productCode })));
  };
  postDocumentation = (data: IProductBasic, productCode: string) => {
    return this.apiService
      .post<IProductDocumentation[]>(
        this.baseUrl + `/rest/product/documentation/${productCode}`,
        data
      )
      .pipe(map((data) => ({ data, productCode })));
  };
  postPolicy = (data: IProductBasic, productCode?: string) => {
    return this.apiService
      .post<IProductPolicyInfo>(
        this.baseUrl + `/rest/product/policy-mand-info/` + productCode,
        data
      )
      .pipe(map((data) => ({ data, productCode: data.productCode })));
  };
  postQuote = (data: IProductBasic, productCode?: string) => {
    return this.apiService
      .post<IProductQuoteInfo>(
        this.baseUrl + `/rest/product/quote-mand-info/` + productCode,
        data
      )
      .pipe(map((data) => ({ data, productCode: data.productCode })));
  };

  putBasic = (data: IProductBasic, productCode: string) => {
    // return this.postBasic(data,productCode)
    return this.apiService
      .put<IProductBasic>(
        this.baseUrl + '/rest/product/basic/' + productCode,
        data
      )
      .pipe(map((data) => ({ data, productCode })));
  };
  putDefaults = (data: IProductBasic, productCode: string) => {
    return this.apiService
      .put<IProductDefaults>(
        this.baseUrl + '/rest/product/default/' + productCode,
        data
      )
      .pipe(map((data) => ({ data, productCode })));
  };
  putDependent = (data: IProductBasic, productCode: string) => {
    return this.postDependent(data, productCode);
  };
  putDocumentation = (data: IProductBasic, productCode: string) => {
    return this.postDocumentation(data, productCode);
  };
  putPolicy = (data: IProductBasic, productCode: string) => {
    return this.apiService
      .put<IProductPolicyInfo>(
        this.baseUrl + `/rest/product/policy-mand-info/` + productCode,
        data
      )
      .pipe(map((data) => ({ data, productCode })));
  };
  putQuote = (data: IProductBasic, productCode: string) => {
    return this.apiService
      .put<IProductQuoteInfo>(
        this.baseUrl + `/rest/product/quote-mand-info/` + productCode,
        data
      )
      .pipe(map((data) => ({ data, productCode })));
  };
}
