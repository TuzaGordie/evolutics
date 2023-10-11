import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  EClientType,
  IClientUniqueObj,
} from '../Life/client-desk/client-extras/client.interface';
import { IClientProvider } from '../Life/client-desk/client-provider/client-provider-extras/client-provider.interface';
import { ClientSearchComponent } from '../Life/client-desk/client-search/client-search.component';
import { CreateCorporateClientComponent } from '../Life/client-desk/create-corporate-client/common/common.component';
import { ICorporateClient } from '../Life/client-desk/create-corporate-client/corporate-client-extras/corporate-client.interface';
import { CreateIndividualClientComponent } from '../Life/client-desk/create-individual-client/allforms/allforms.component';
import { IClientIndividual } from '../Life/client-desk/create-individual-client/individual-client-extras/individual-client.interface';
import { FindClientComponent } from '../Life/client-desk/find-client/find-client.component';
import { IClientViewData } from '../Shared/models/client-desk.interface';
import { ApiService } from './api.service';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  baseURL = environment.apiBaseUrl + '/rest/client/';
  clientData: IClientViewData;
  constructor(public apiService: ApiService, public uS: UtilityService) {}

  getClientNameByNum = (num: string) => {
    return this.apiService.getText(this.baseURL + `full_name/${num}`);
  };

  createProvider = (clientProviderForm: FormData) => {
    return this.apiService.postFile<IClientProvider>(
      this.baseURL + 'provider',
      clientProviderForm
    );
  };
  getIndividualClient = (clientNo: string) => {
    return this.apiService.get<IClientIndividual>(
      this.baseURL + `individual/${clientNo}`
    );
  };
  openFindClientModal(formControl?: AbstractControl, model?: any) {
    this.uS
      .pageToModalOpener(FindClientComponent, 'Find Client')
      .subscribe((r: IClientViewData) => {
        if (r) {
          formControl?.markAsDirty();
          formControl?.patchValue(r.clientNo);
          model = r.clientNo;
        }
      });
  }
  openFindProviderModal(formControl?: AbstractControl, model?: any) {
    this.uS
      .pageToModalOpener(FindClientComponent, 'Find Provider')
      .subscribe((r: IClientViewData) => {
        if (r) {
          formControl?.markAsDirty();
          formControl?.patchValue(r.providerNo);
          model = r.clientNo;
        }
      });
  }
  openCreateCorporateClientModal(formControl?: AbstractControl, model?: any) {
    this.uS
      .pageToModalOpener(
        CreateCorporateClientComponent,
        'Create Corporate Client'
      )
      .subscribe((r: ICorporateClient) => {
        if (r) {
          formControl?.markAsDirty();
          formControl?.patchValue(r.companyInformation?.clientNo);
          model = r.companyInformation?.clientNo;
        }
      });
  }
  openCreateIndividualClientModal(formControl?: AbstractControl, model?: any) {
    this.uS
      .pageToModalOpener(
        CreateIndividualClientComponent,
        'Create Individual Client'
      )
      .subscribe((r: IClientIndividual) => {
        if (r) {
          formControl?.markAsDirty();
          formControl?.patchValue(r.personalInformation?.clientNo);
          model = r.personalInformation?.clientNo;
        }
      });
  }
  getClientType = (clientNo: string) => {
    return this.apiService
      .get<{ type: EClientType }>(this.baseURL + `type/${clientNo}`)
      .pipe(map((res) => res?.type));
  };
  checkIfClientExistsBy = (query: IClientUniqueObj) => {
    return this.apiService.get<boolean>(this.baseURL + `unique/exists`, query);
  };
  getClientViewData = (clientNo: string) => {
    return this.apiService.get<IClientViewData>(this.baseURL + 'view/' + clientNo);
  };
  getClientProviderData = (providerNo: string) => {
    return this.apiService.get<IClientProvider>(
      this.baseURL + 'provider/' + providerNo
    );
  };
  validateClientNo = async (control: AbstractControl) => {
    const val: string = control?.value;
    if (!val) return { notFound: true };
    return this.getClientViewData(val)
      .toPromise()
      .then((res) => {
        if (!res.clientNo) return { notFound: true };
        if (!res.type) return { notFound: true };
        (control.parent as FormGroup)?.patchValue({ clientData: res });
        return null;
      })
      .catch((err) => {
        return { notFound: true };
      });
  };
  validateEmail = async (control: AbstractControl) => {
    return new Promise<any>((resolve) => {
      const email = control?.value?.trim();
      if (!email) resolve(null);
      else
        Promise.all([
          this.checkIfClientExistsBy({ email }).toPromise(),
          this.checkIfClientExistsBy({ alternativeEmail: email }).toPromise(),
        ])
          .then((r) => {
            resolve(r.includes(true) ? { notUnique: true } : null);
          })
          .catch((e) => {
            resolve({ notUnique: true });
          });
    });
  };
  checkUniqueBVN = async (control: AbstractControl) => {
    const bvn = control?.value?.trim();
    if (!bvn) return null;
    return this.checkIfClientExistsBy({ bvn })
      .toPromise()
      .then((r) => {
        return r ? { notUnique: true } : null;
      })
      .catch((e) => {
        return { notUnique: true };
      });
  };
  checkUniqueNIN = async (control: AbstractControl) => {
    const nationalInsuranceNumber = control?.value?.trim();
    if (!nationalInsuranceNumber) return null;
    return this.checkIfClientExistsBy({ nationalInsuranceNumber })
      .toPromise()
      .then((r) => {
        return r ? { notUnique: true } : null;
      })
      .catch((e) => {
        return { notUnique: true };
      });
  };
  checkUniqueTIN = async (control: AbstractControl) => {
    const tin = control?.value?.trim();
    if (!tin) return null;
    return this.checkIfClientExistsBy({ tin })
      .toPromise()
      .then((r) => {
        return r ? { notUnique: true } : null;
      })
      .catch((e) => {
        return { notUnique: true };
      });
  };
  checkUniquePhoneNumber = async (control: AbstractControl) => {
    const phoneNumber = control?.value?.trim();
    if (!phoneNumber) return null;
    return this.checkIfClientExistsBy({ phoneNumber })
      .toPromise()
      .then((r) => {
        return r ? { notUnique: true } : null;
      })
      .catch((e) => {
        return { notUnique: true };
      });
  };
  checkUniquePenCom = async (control: AbstractControl) => {
    const pensionCommissionNumber = control?.value?.trim();
    if (!pensionCommissionNumber) return null;
    return this.checkIfClientExistsBy({ pensionCommissionNumber })
      .toPromise()
      .then((r) => {
        return r ? { notUnique: true } : null;
      })
      .catch((e) => {
        return { notUnique: true };
      });
  };
  checkAlternateEmail = (control: AbstractControl) => {
    const value: string = control?.value;
    if (!value) return null;
    else if (value == control?.parent?.get('email')?.value)
      return { equalToOther: true };
    else return null;
  };
  checkAlternatePhone = (control: AbstractControl) => {
    const value: string = control?.value;
    if (!value) return null;
    else if (value == control?.parent?.get('phoneNumber')?.value)
      return { equalToOther: true };
    else return null;
  };
}
