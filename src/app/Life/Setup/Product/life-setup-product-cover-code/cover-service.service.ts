import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable, QueryList } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupName,
  NgModel,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { IPremiumFrequency } from 'src/app/General/services/quotation.interface';
import { ApiService } from 'src/app/Services/api.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { PageTemplateComponent } from 'src/app/Shared/components/page-template/page-template.component';
import {
  EPageType,
  ICodeDescription,
  ICodeTitle,
} from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import {
  Basic,
  Dependents,
  Benefit,
  Premium,
  Commission,
  Terms,
  Endorsements,
  Underwriting,
  Surrenders,
  Loan,
  Annuities,
  Lapse,
  Perils,
  PaidUp,
  Bonuses,
  AccReins,
  TaxesLevies,
  Documentations,
  CreateCoversBenefit,
  CreateCoverPremium,
  CreateTerms,
  CreatePeril,
  CreateAcct,
  CreateBasic,
  CreateExcessDeductible,
} from './cover-code';

@Injectable({
  providedIn: 'root',
})
export class CoverService extends PageTemplateComponent {
  private baseUrl = environment.apiBaseUrl + '/rest/product/covers/';
  claimTypeList: ICodeTitle[] = [];

  constructor(
    public http: HttpClient,
    private apiService: ApiService,
    public route: ActivatedRoute,
    public uS: UtilityService
  ) {
    super(route, uS);
  }
  disableInputs(inps: QueryList<NgModel>) {
    // debugger;
    if (this.isShow) {
      setTimeout(() => {
        for (const inp of inps) {
          inp?.control?.disable();
        }
      }, 500);
      setTimeout(() => {
        for (const inp of inps) {
          inp?.control?.disable();
        }
      }, 1000);
    }
  }
  markAll(inps: QueryList<NgModel>) {
    // debugger;
    setTimeout(() => {
      for (const inp of inps) {
        inp?.control?.markAsDirty();
      }
    }, 1000);
  }
  isFormInvalid(inputs: QueryList<AbstractControl>) {
    // for (const x of inputs || []) {
    //   debugger;
    //   if (x.invalid) {
    //     return true;
    //   }
    // }
    // return false;
    return inputs?.some((x) => x.invalid);
  }
  createBasic(data: CreateBasic) {
    return this.apiService.post(this.baseUrl + `basic`, data);
  }

  createDependant(data: Dependents[]) {
    return this.apiService.post(this.baseUrl + `dependent`, data);
  }

  saveBenefit(data: CreateCoversBenefit) {
    return this.apiService.post(this.baseUrl + `benefits`, data);
  }

  savePremium(data: CreateCoverPremium) {
    return this.apiService.post(this.baseUrl + `premium`, data);
  }

  saveCommission(data: Commission) {
    return this.apiService.post(this.baseUrl + `commission`, data);
  }

  saveTerms(data: CreateTerms) {
    return this.apiService.post(this.baseUrl + `terms`, data);
  }

  saveEndorsements(data: Endorsements) {
    return this.apiService.post(this.baseUrl + `endorsement`, data);
  }

  saveUnderwriting(data: Underwriting) {
    return this.apiService.post(this.baseUrl + `underwriting`, data);
  }

  saveSurrenders(data: Surrenders) {
    return this.apiService.post(this.baseUrl + `surrenders`, data);
  }

  saveLoan(data: Loan) {
    return this.apiService.post(this.baseUrl + `loan`, data);
  }

  saveAnnuities(data: Annuities) {
    return this.apiService.post(this.baseUrl + `annuities`, data);
  }

  saveLapse(data: Lapse) {
    return this.apiService.post(this.baseUrl + `lapse`, data);
  }

  savePerils(data: CreatePeril) {
    return this.apiService.post(this.baseUrl + `perils`, data);
  }

  savePaidUp(data: PaidUp) {
    return this.apiService.post(this.baseUrl + `paid-up`, data);
  }

  saveBonuses(data: Bonuses[]) {
    return this.apiService.post(this.baseUrl + `bonuses`, data);
  }

  saveAccReins(data: CreateAcct) {
    return this.apiService.post(this.baseUrl + `acc-reins`, data);
  }

  saveTaxesLevies(data: TaxesLevies) {
    return this.apiService.post(this.baseUrl + `tax-levies`, data);
  }

  saveDocumentations(data: Documentations[]) {
    return this.apiService.post(this.baseUrl + `documentation`, data);
  }

  saveExcessDeductible(data: CreateExcessDeductible) {
    return this.apiService.post(this.baseUrl + `excess-deductible`, data);
  }
}
