import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { QuotationService } from 'src/app/Life/services/quotation-service.service';
import {
  ICurrency,
  IPremiumPaymentMethod,
  IDiscountCode,
  IPremiumFrequency,
  IBenefitPaymentFreq,
  ITargetContributionFreq,
  IClientDetails,
  ICoversDetails,
  CoverCode,
} from 'src/app/General/services/quotation.interface';
import { BuildingComponent } from '../../modals/covers/building/building.component';
import { DefenseRecourseComponent } from '../../modals/covers/defense-recourse/defense-recourse.component';
import { LifeInsuranceComponent } from '../../modals/covers/life-insurance/life-insurance.component';
import { MotorAccessoriesComponent } from '../../modals/covers/motor-accessories/motor-accessories.component';
import { MotorThirdPartyComponent } from '../../modals/covers/motor-third-party/motor-third-party.component';
import { PropertyContentComponent } from '../../modals/covers/property-content/property-content.component';
import { MarineCargoComponent } from '../../modals/covers/marine-cargo/marine-cargo.component';
import { MarineHullComponent } from '../../modals/covers/marine-hull/marine-hull.component';
import { SavingsComponent } from '../../modals/covers/savings/savings.component';
import { BondComponent } from '../../modals/covers/bond/bond.component';
import { LifeRiskComponent } from '../../modals/covers/life-risk/life-risk.component'

declare let $;

@Component({
  selector: 'q-individual-under-writing',
  templateUrl: './under-writing.component.html',
  styleUrls: ['./under-writing.component.scss'],
})
export class UnderWritingComponent implements OnInit {
  // @ViewChild('bl_modal', { static: true }) bl_modal: BuildingComponent;
  // @ViewChild('dr_modal', { static: true }) dr_modal: DefenseRecourseComponent;
  // @ViewChild('lil_modal', { static: true }) lil_modal: LifeInsuranceComponent;
  // @ViewChild('acc_modal', { static: true })
  // acc_modal: MotorAccessoriesComponent;
  // @ViewChild('tp_modal', { static: true }) tp_modal: MotorThirdPartyComponent;
  // @ViewChild('sav_modal', { static: true }) sav_modal: SavingsComponent;
  // @ViewChild('pc_modal', { static: true }) pc_modal: PropertyContentComponent;
  // @ViewChild('mc_modal', { static: true }) mc_modal: MarineCargoComponent;
  // @ViewChild('mh_modal', { static: true }) mh_modal: MarineHullComponent;
  // @ViewChild('bond_modal', {static: true}) bond_modal: BondComponent;
  // @ViewChild('lir_modal', {static: true}) lir_modal: LifeRiskComponent;

  // modal: any[] = []
  // disabled: boolean[] = []
  // selected: boolean[] = []
  clientDetails: IClientDetails
  quoteNo: any
  // assuredRelToOwner$: string[] = []
  // currencyOptions$: Observable<ICurrency[]> 
  // premiumPaymentMethodOptions$: Observable<IPremiumPaymentMethod[]> = this.quotationService.getPremiumPaymentMethods()
  // discountCodeOptions$: Observable<IDiscountCode[]> = this.quotationService.getDiscountCodeOptions()
  // premiumPaymentFreqOptions$: Observable<IPremiumFrequency[]>
  // benefitPaymentFreqOptions$: Observable<IBenefitPaymentFreq[]> = this.quotationService.getBenefitPaymentFreqOptions()
  // targetContributionFreqOptions$: Observable<ITargetContributionFreq[]> = this.quotationService.getTargetContributionFreqOptions()
  // redgNoFromCheck: string
  // redgNo$: string
  // todate: Date
  // client: any[] = []
  // purchaseValue: any = { purValue: '', mvClient: '', mvAdj: ''}
  // checked: boolean[]
  // isDependent: boolean[] = []
  // frq: any[] = []
  // frqDesc: any[] = []
  // freq: any[] = []

  underWritingForm: FormGroup
  // covers: FormArray | any = {controls: ''}
  // coverScreens: ICoversDetails[]
  // newCoverScreens: ICoversDetails[] = []
  // complete: any[] = []

  // product: {
  //   code: string;
  //   description: string;
  // };

  // paymentMethod: any;
  // systemSelect: string = 'motor';
  // isRp1Check: boolean = false;
  // get formValue() {
  //   return this.coverDetailsForm.value;
  // }
  product: any

  constructor(
    private quotationService: QuotationService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}
  // async getCoverScreen(code): Promise<ICoversDetails[]> {
  //   let result;
  //   result = await this.quotationService.getCoverScreens(code).toPromise();
  //   return result;
  // }
  // async stuff(code) {
  //   this.coverScreens = await this.getCoverScreen(code);
  // }

  ngOnInit(): void {
    this.clientDetails = this.route.snapshot.data['clientDetails'];
    const queryParams = this.route.snapshot.queryParamMap;
    this.product = {
      code: queryParams.get('pcd'),
      description: queryParams.get('pdsc')
    }
  }
}
