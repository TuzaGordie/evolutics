import { ConfigForms } from '../../../../../Shared/models/form.class';
import { UtilityService } from '../../../../../Services/utility.service';
import { ApiService } from '../../../../../Services/api.service';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators'
import { QuotationService } from 'src/app/General/services/quotation-service.service';
import { ICurrency, IPremiumPaymentMethod, IDiscountCode, IPremiumFrequency, IBenefitPaymentFreq, ITargetContributionFreq, IClientDetails, ICoversDetails, CoverCode, ICodes } from 'src/app/General/services/quotation.interface';

import { BuildingComponent } from '../../../create-new-individual-quotation-gb/modals/covers/building/building.component';
import { DefenseRecourseComponent } from '../../../create-new-individual-quotation-gb/modals/covers/defense-recourse/defense-recourse.component';
import { LifeInsuranceComponent } from '../../../create-new-individual-quotation-gb/modals/covers/life-insurance/life-insurance.component';
import { MotorAccessoriesComponent } from '../../../create-new-individual-quotation-gb/modals/covers/motor-accessories/motor-accessories.component';
import { MotorThirdPartyComponent } from '../../../create-new-individual-quotation-gb/modals/covers/motor-third-party/motor-third-party.component';
import { SavingsComponent } from '../../../create-new-individual-quotation-gb/modals/covers/savings/savings.component';
import { MarineCargoComponent } from '../../../create-new-individual-quotation-gb/modals/covers/marine-cargo/marine-cargo.component';
import { MarineHullComponent } from '../../../create-new-individual-quotation-gb/modals/covers/marine-hull/marine-hull.component';
import { PropertyContentComponent } from '../../../create-new-individual-quotation-gb/modals/covers/property-content/property-content.component';
import { BondComponent } from '../../../create-new-individual-quotation-gb/modals/covers/bond/bond.component';
import { LifeRiskComponent } from '../../../create-new-individual-quotation-gb/modals/covers/life-risk/life-risk.component';
import { LifeCreditComponent } from '../../../create-new-individual-quotation-gb/modals/covers/life-credit/life-credit.component';
import { EndowmentComponent } from '../../../create-new-individual-quotation-gb/modals/covers/endowment/endowment.component';
import { LifeAnnuityComponent } from '../../../create-new-individual-quotation-gb/modals/covers/life-annuity/life-annuity.component';
import { configForms } from 'src/app/Shared/models/form.class';
import { environment } from 'src/environments/environment';


declare let $;

@Component({
  selector: 'g-quote-policy',
  templateUrl: './quote-policy.component.html',
  styleUrls: ['./quote-policy.component.scss']
})
export class GroupQutePolicyComponent implements OnInit {
  @ViewChild('bl_modal', { static: true }) bl_modal: BuildingComponent;
  @ViewChild('dr_modal', { static: true }) dr_modal: DefenseRecourseComponent;
  @ViewChild('lil_modal', { static: true }) lil_modal: LifeInsuranceComponent;
  @ViewChild('acc_modal', { static: true })
  acc_modal: MotorAccessoriesComponent;
  @ViewChild('tp_modal', { static: true }) tp_modal: MotorThirdPartyComponent;
  @ViewChild('sav_modal', { static: true }) sav_modal: SavingsComponent;
  @ViewChild('pc_modal', { static: true }) pc_modal: PropertyContentComponent;
  @ViewChild('mc_modal', { static: true }) mc_modal: MarineCargoComponent;
  @ViewChild('mh_modal', { static: true }) mh_modal: MarineHullComponent;
  @ViewChild('bond_modal', {static: true}) bond_modal: BondComponent;
  @ViewChild('lir_modal', {static: true}) lir_modal: LifeRiskComponent;
  @ViewChild('lic_modal', {static: true}) lic_modal: LifeCreditComponent;
  @ViewChild('end_modal', {static: true}) end_modal: EndowmentComponent;
  @ViewChild('lia_modal', {static: true}) lia_modal: LifeAnnuityComponent;
  private nbofAgent: number = 1;
  isRp1Check: boolean = false;
  toggleClass: boolean = false;
  toggleClass2: boolean = false;
  paymentMethod: any;
  startDate: any
  disabled: boolean[] = []
  selected: boolean[] = []
  coverDisabled: boolean[] = []
  isSubGroup: boolean = false;
  isCoinsured: boolean = false;
  IsSelectCover:boolean = false;
  private nbofCoin: number = 1;
  private nbofSg: number = 1;
  private nbofRsa: number = 1;
  private nbofMember: number = 1;
  clientFullName: string;
  providerResult:any[];
  modal: any[] = []
  clientDetails: IClientDetails
  assuredRelToOwner$: string[] = []
  currencyOptions$: Observable<ICurrency[]>
  premiumPaymentMethodOptions$: Observable<any[]>
  discountCodeOptions$: Observable<IDiscountCode[]> = this.quotationService.getDiscountCodeOptions()
  premiumPaymentFreqOptions$: Observable<IPremiumFrequency[]>
  benefitPaymentFreqOptions$: Observable<IBenefitPaymentFreq[]> = this.quotationService.getBenefitPaymentFreqOptions()
  targetContributionFreqOptions$: Observable<ITargetContributionFreq[]> = this.quotationService.getTargetContributionFreqOptions()
  redgNoFromCheck: string
  redgNo$: string
  todate: Date
  client: any[] = []
  purchaseValue: any = { purValue: '', mvClient: '', mvAdj: ''}
  subGroupOptions: ICodes[] = []
  // isCoinsuredForm: FormGroup;
  newCoverScreens: ICoversDetails[] = []
  subGroupsList:FormArray;
  subGroupL: string[] = [''];
  checked: boolean[]
  coinsurersList: FormArray;
  coinsurer: string[] = [''];
  premtermDisabled: boolean = true
  coinsurerNo: string[] = [''];
  isDependent: boolean[] = []
  frq: any[] = []
  frqDesc: any[] = []
  freq: Set<any> = new Set
  coverDetailsForm: FormGroup
  covers: FormArray | any = {controls: ''}
  coverScreens: ICoversDetails[]
  complete: any[] = []
  basisDisabled: boolean[] = []
  userCode: string;

  product: {
    code: string,
    description: string,
  }
  checkArray = [];
  isLead: boolean[] = [];
  isSelf: boolean[] = [];
  validResult: any = '';



  providerForm  = new FormGroup({
    clientNo: configForms.required(),
    providerName:configForms.default(),
    providerCategory:configForms.default(),
    providerSubCategory:configForms.default(),
    externalRef:configForms.default(),
  });

  // paymentMethod: any;
  systemSelect: string = "motor"
  termDisabled: boolean;
  allowedPremPayTermMonths: any;
  allowedPremPayTermYears: any;
  //isRp1Check: boolean = false;

  get formValue() {
    return this.coverDetailsForm.value
  }

  @ViewChild('closeModal') closeModal;
  constructor(
    public quotationService: QuotationService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private utilityService:UtilityService) {
     }
  async getCoverScreen(code): Promise<ICoversDetails[]> {
    let result
    result = await this.quotationService.getCoverScreens(code).toPromise()
    return result
  }
  async stuff(code){
    console.log("COVER SCREEN CODE"+code);

    this.coverScreens = await this.getCoverScreen(code)
  }

  ngOnInit(): void {
    this.clientDetails = this.route.snapshot.data['ownerDetails']
    this.userCode = environment.user?.code;
    this.premiumPaymentMethodOptions$ = this.quotationService.getPremiumPaymentMethods();
    
    const queryParams = this.route.snapshot.queryParamMap
    this.currencyOptions$ = this.quotationService.getCurrencyOptions(queryParams.get('pcd'))

    this.todate = new Date(Date.now())
    const tomorrow = new Date(this.todate)
    tomorrow.setDate(tomorrow.getDate() + 1)
    this.product = {
      code: queryParams.get('pcd'),
      description: queryParams.get('pdsc')
    }

    this.quotationService.getCodes().subscribe( data => {
      console.log('Codes', data)

      data.forEach(code => {
        if (code.codeSubgroup==="GROUP_SA_BASIS"){
          this.subGroupOptions.push(code)
        }
      })
    })

    this.createItem()
    this.premiumPaymentFreqOptions$ = this.quotationService.getPremiumFrequencyOptions(queryParams.get('pcd'))
    // this.premiumPaymentFreqOptions$.subscribe((res)=>{
    //   console.log("PREMUM PAYMENT FREQUENCY"+JSON.stringify(res));
    // });

    this.coinsurersList = this.fb.array([
      new FormGroup ({
        providerNo: new FormControl(null,Validators.required),
        providerFullName: new FormControl(null,Validators.required),
        lead: new FormControl(null, Validators.required),
        self: new FormControl(null, Validators.required),
        share: new FormControl(100, [Validators.required, Validators.max(100), Validators.min(1)]),
      })
    ])

    this.subGroupsList = this.fb.array([
      new FormGroup ({
        subGroupNo: new FormControl(null,Validators.required),
        subGroupName: new FormControl(null, Validators.required),
      })
    ])


    this.coverDetailsForm = this.fb.group({
      applicationDate: [formatDate(this.todate, 'yyyy-MM-dd', 'en'), [Validators.required]],
      commencementDate: [formatDate(this.todate, 'yyyy-MM-dd', 'en'), [Validators.required]],
      endDate: [formatDate(tomorrow, 'yyyy-MM-dd', 'en'), [Validators.required]],
      coverMonths: new FormControl(null, Validators.required),
      coverDays: new FormControl(null, Validators.required),
      currency: new FormControl(null, Validators.required),
      premiumPaymentMethod: new FormControl(null, Validators.required),
      coverPeriod: new FormControl(null, Validators.required),
      discountCode: new FormControl(null, Validators.required),
      discountRate: new FormControl(null, Validators.required),
      payAsYouGo: new FormControl(null, Validators.required),
      policyTerm: new FormControl(null, Validators.required),
      premiumPaymentTermYears: new FormControl(null, Validators.required),
      premiumPaymentTermMonths: new FormControl(null, Validators.required),
      premiumPaymentTermDays: new FormControl(null, Validators.required),
      premiumPayFreq: new FormControl(null, Validators.required),
      assetNo: new FormControl(null, Validators.required, this.validateAssetId.bind(this)),
      redgNo: new FormControl(null, Validators.required),
      purchaseValue: new FormControl(null, Validators.required),
      marketValueByClient: new FormControl(null, Validators.required),
      marketValueBySystem: new FormControl(null, Validators.required),
      isCoinsured: new FormControl(null, Validators.required),
      isSubGroup: new FormControl(null, Validators.required),
      covers: this.fb.array([]),
      coinsurersList:this.coinsurersList,
      subGroupValue: new FormControl(null, Validators.required),
      subGroupsList:this.subGroupsList,
      subGroupNoSingle:new FormControl(null, Validators.required),
      subGroupNameSingle:new FormControl(null, Validators.required),
    })

    this.disableCoverPeriod();
    this.getLeadProvider();
    this.startDate=new Date(this.coverDetailsForm.get('commencementDate').value).getFullYear()+'-'+('0' + (new Date(this.coverDetailsForm.get('applicationDate').value).getMonth() + 1)).slice(-2)+'-'+('0' + new Date(this.coverDetailsForm.get('applicationDate').value).getDate()).slice(-2);
    this.getDaysBetweenStartEndDate()
  }

  getSubGroups(){
    console.log("CONVER DETIALS FF"+this.coverDetailsForm.controls);
//this.coverDetailsForm.value?.subGroupValue.setValue(this.coverDetailsForm.value?.subgroupsList[0].subgroupNo);
    // this.coverDetailsForm.value?.subGroups[0].subgroupNo;
    // this.coverDetailsForm.value?.subGroups[0].subgroupNo;
  }

  disableCoverPeriod(){
    this.coverDetailsForm.controls['coverPeriod'].disable();
    this.coverDetailsForm.controls['coverMonths'].disable();
    this.coverDetailsForm.controls['coverDays'].disable();
    //console.log("COVER DATILS PERIOD" + JSON.stringify(this.coverDetailsForm.controls));

  }

  changeFormValue() {
    console.log(this.formValue)
  }

  getDaysBetweenStartEndDate(){
      let months,years,days;
      let startDate = new Date(this.coverDetailsForm?.value?.commencementDate);
      let endDate = new Date(this.coverDetailsForm?.value?.endDate);
      if (startDate && endDate) {
        console.log(startDate, endDate)
        years =  endDate.getFullYear() - startDate.getFullYear();
        months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
        months -= startDate.getMonth();
        months += endDate.getMonth();
        console.log("Months "+months)
        days = this.dateDifferenceInDays(endDate, startDate);
        this.coverDetailsForm.patchValue({
          coverPeriod: `${years} ${years == 1 ? 'Year' : 'Years'}`,
          coverMonths: `${months} ${months == 1 ? 'Month' : 'Months'}`,
          coverDays:`${days} ${days == 1 ? 'Day' : 'Days'}`,
        })
      }

  }

  dateDifferenceInDays(date2, date1) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    // Discard the time and time-zone information.
    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  getClientName() {
    console.log(this.providerForm?.value?.clientNo);
    if (!this.providerForm.value.clientNo) {
      console.log('run');
    } else {this.quotationService
      .getClientDetails(this.providerForm?.value?.clientNo)
      .subscribe(
        (res) => {
          if(res !== null){
            this.clientFullName = res?.fullName;
          }else{
            this.utilityService.notify("not found",0);
          }
        },
        (err) => {
          this.utilityService.notify("not found",0);
          console.log('HTTP Error', err);
        }
      );
    }
  }

  search(){
    this.closeModal.nativeElement.click();
    console.log("PROVIDER FORM"+JSON.stringify(this.providerForm.value?.providerName))
    let searchForm:any = this.providerForm.value;
    this.quotationService.searchProvider(this.providerForm.value?.providerName).subscribe((res)=>{
      console.log("Provider result"+res)
      let result:any =  this.quotationService.findMatchingValue(res,{searchForm})
      this.providerResult = result?.page?.content;

    })
  }


  getProviderValues() {
    console.log(this.providerForm.value?.providerName);
    this.quotationService.searchProvider(this.providerForm.value?.providerName).subscribe((res)=>{
      if (res.length > 0) {
        this.validResult = 'true';
      } else {
        this.validResult = 'false';
      }
      console.log('quotationList', res);
    });
  }

  getLeadProvider(){
    this.quotationService.getLeadProvider(this.userCode)
    .subscribe((res)=>{
      console.log("Values returned for coninsurers List"+JSON.stringify(res))

      const coinsurersList = <FormArray> this.coverDetailsForm.get('coinsurersList')
      // set the number for the first row
      coinsurersList.controls[0].get('providerNo').setValue(res?.coInsuranceIdentity)
      console.log("coninsurersList after setting coinsuranceIdentity: ")
      // set the name for the first row
      this.getProviderFullname(0)
    })
  }

  providerHolder:String[] = [];
  getProviderFullname(i){
    console.log("CONTROLS DETAILS"+JSON.stringify(this.coverDetailsForm?.value?.coinsurersList));
    const num = this.coverDetailsForm?.value?.coinsurersList[i]?.providerNo;
    console.log("PROVIDER NO RESULT"+num)
    this.quotationService.getProviderNo(num).subscribe( data => {
      console.log("RETURNED"+data)
      this.coinsurer[i] = data?.fullName;
      this.providerHolder.push(data?.fullName);
      console.log(this.coinsurer)
    })
    if(this.providerHolder.length = 1){
      this.isLead.push(true);
      this.isSelf.push(true);
    }else{
      this.isLead.push(false);
      this.isSelf.push(false);
    }
  }

  createItems() {
    return this.fb.group({
      sa_basis: new FormControl(null, Validators.required),
      assuredName: new FormControl(null, Validators.required),
      assuredRel: new FormControl(null, Validators.required),
    })
  }

  async createItem(): Promise<void> {
    await this.stuff(this.product.code).then( () => {
      let cover = this.coverDetailsForm.get('covers') as FormArray
      let i = 0
      this.coverScreens.forEach( cov => {
        // console.log(cov)
        if (cov.info.base == '1') {
          this.quotationService.getPremiumFrequencyOptions(cov.info.coverCode).subscribe(async data => {
            this.freq = new Set(data)
          })
          this.quotationService.getPolicyTerms(cov.info.coverCode).subscribe(data => {
            //console.log(data) 
            if (Array.isArray(data)) {
              if (data[0]?.allowedPremPayTermYear || data[0]?.allowedPremPayTermMonth){
                data.forEach(element => {
                  element.allowedPremPayTermMonth ? this.allowedPremPayTermMonths.push(element.allowedPremPayTermMonth) : ''
                  element.allowedPremPayTermYear ? this.allowedPremPayTermYears.push(element.allowedPremPayTermYear) :''
                })
              }
            } else {
              if(data?.fixedPremPayTermMonth || data?.FixedPremPayTermYear) {
                data.fixedPremPayTermMonth ? this.coverDetailsForm.patchValue({premiumPaymentTermMonths: data.fixedPremPayTermMonth}) : ''
                data.fixedPremPayTermYear ? this.coverDetailsForm.patchValue({premiumPaymentTermYears: data.fixedPremPayTermYear}) : ''
              }
            }
          })
        }
        let loop = cov.info.maxNo ? Number(cov.info.maxNo) : 1;
        console.log(loop+"LOOP");
        for (const key of [...Array(loop).keys()]) {
          this.newCoverScreens.push(cov)
          cover.push(this.createItems())
          if (cov.info.base || cov.info.mandatory) {
            this.selected.push(true)
            this.coverDisabled.push(true)
          } else {
            this.selected.push(false)
            this.coverDisabled.push(false)
          }
          this.modal.push({})
          this.isDependent.push(false)
          this.complete.push(true)
          this.basisDisabled.push(false)
          this.quotationService.getClientDetails(this.clientDetails.clientNo).subscribe(data => {
            const value = data ? data : {fullName: ''}
            this.client.push(value)
          })
          this.assuredRelToOwner$.push("Self")
        }

        // this.quotationService.getPremiumFrequencyOptions(cov.info.coverCode).subscribe(data=>console.log(data))

        if (cov.info.base == '1' || cov.info.mandatory == true) {
          // console.log(cov)
          this.quotationService.getDependentCovers(cov.info.coverCode).subscribe(
            data => {
              i=0
            console.log('data:', data)
            let supindex = this.newCoverScreens.indexOf(cov)
            //console.log(supindex)
            data.forEach( (element, index) => {
              let loop = element?.info?.maxNo ? Number(element.info.maxNo) : 1;
              console.log(loop+"LOOP");
              for (const key of [...Array(loop).keys()]) {
                i++
                this.newCoverScreens.splice(supindex + index + i, 0, element)
                this.isDependent.splice(supindex + index + i, 0, true)
                this.coverScreens.splice(supindex + index + i, 0, element)
                if ((element.info.base || element.info.mandatory) && i == 1) {
                  this.selected.splice(supindex + index + i, 0, true)
                } else (
                  this.selected.splice(supindex + index + i, 0, false)
                )
                this.modal.push({})
                this.complete.push(true)
                this.basisDisabled.push(false)
                this.quotationService.getClientDetails(this.clientDetails.clientNo).subscribe(data => {
                  const value = data ? data : {fullName: ''}
                  this.client.push(value)
                })
                cover.push(this.createItems())
                //console.log(true)
                this.assuredRelToOwner$.push("Self")
                //console.log(this.newCoverScreens)
              }
            })
          },
          err => console.log(err),
          () => console.log('finished')
          )
        }
      })

    })
  }
  get assetId() {
    return this.coverDetailsForm.get('assetNo');
  }

  checkBasisDisabled(i) {
    if (this.coverDetailsForm.get('covers').value[i].sa_basis == 1){
      this.basisDisabled[i] = true
    }
    else {
      this.basisDisabled[i] = false
    }
  }

  setSelected(i) {
    this.selected[i] = this.selected[i] ? false : true
    let cov = this.newCoverScreens[i]
    let cover = this.coverDetailsForm.get('covers') as FormArray
    if (this.selected[i]){
      //console.log('checked')
      if (cov.info.coverCode){
      console.log('process started')
        this.quotationService.getDependentCovers(cov.info.coverCode).subscribe(
          data => {
          //console.log('data:', data)
          let supindex = this.coverScreens.indexOf(cov)
          data.forEach( (element, index) => {
            this.newCoverScreens.splice(supindex + index + 1, 0, element)
            this.coverScreens.push(element)
            if (element.info.base || element.info.mandatory) {
              this.selected.splice(supindex + index + 1, 0, true)
            } else (
              this.selected.splice(supindex + index + 1, 0, false)
            )
            this.modal.push({})
            this.complete.push(true)
            this.quotationService.getClientDetails(this.clientDetails.clientNo).subscribe(data => {
              const value = data ? data : {fullName: ''}
              this.client.push(value)
            })
            cover.push(this.createItems())
            //console.log(true)
            this.assuredRelToOwner$.splice(supindex + index + 1, 0, "Self")
            //console.log(this.newCoverScreens)
          })
        },
        err => console.log(err),
        () => console.log('finished')
        )
      }
    } else {
      //console.log('unchecked')
      if (cov.info.coverCode) {
        let supindex = this.newCoverScreens.indexOf(cov)
        this.quotationService.getDependentCovers(cov.info.coverCode).subscribe(
          data => {
          //console.log('data:', data)
          this.newCoverScreens.splice(supindex + 1, data.length)
          this.selected.splice(supindex + 1, data.length)
          this.modal.splice(supindex + 1, data.length)
          this.complete.splice(supindex + 1, data.length)
          this.client.splice(supindex + 1, data.length)
          this.assuredRelToOwner$.splice(supindex + 1, data.length)
          data.forEach( (element, index) => {
            // let sindex = this.newCoverScreens.indexOf(element)
            // console.log(sindex)
            // this.newCoverScreens.splice(supindex, 1)
            // this.coverScreens.push(element)
            // this.selected.splice(sindex, 1)
            // this.modal.splice(sindex, 1)
            // this.complete.splice(sindex, 1)
            // this.client.splice(sindex, 1)
            cover.removeAt(supindex + 1)
            //console.log(true)
            // this.assuredRelToOwner$.splice(sindex, 1)
            // console.log(this.newCoverScreens)
          })
        },
        err => console.log(err),
        () => console.log('finished')
        )
      }
    }
  }

  findAssured(i, value){
    this.quotationService.getClientDetails(value).subscribe(data => {
      this.client[i] = data ? data : {fullName: ''}
      const covers = this.coverDetailsForm.get('covers')
      covers.value.forEach( (element, index) => {
        if (index == i) {
          element.assuredName = this.client[i].fullName;
        }
      });
    });
    if (value == this.clientDetails.clientNo) {
      this.assuredRelToOwner$[i] = 'Self';
    } else {
      this.quotationService.getAssuredRelToOwner(this.clientDetails.clientNo, value)
        .subscribe((data) => {
          this.assuredRelToOwner$[i] = data ? data.relationship : '';
        });
    }
  }

  changeCommDate() {
    const newDate = this.coverDetailsForm?.value?.commencementDate
    this.startDate=(new Date(newDate).getFullYear())+'-'+('0' + (new Date(newDate).getMonth() + 1)).slice(-2)+'-'+('0' + new Date(newDate).getDate()).slice(-2);
    this.getDaysBetweenStartEndDate()
  }
  changeDiscCode() {
    let data = {
      applicationDate: formatDate(this.coverDetailsForm.get('applicationDate').value, 'dd/MM/yyyy', 'en'),
      discountCode: this.coverDetailsForm.value.discountCode
    }
    this.quotationService.getDiscountRate(data).subscribe( data => this.coverDetailsForm.patchValue({discountRate: data.response.rate}))
  }


  validateAssetId(control: AbstractControl): Observable<ValidationErrors | null> {
    this.redgNoFromCheck = ''
    return this.quotationService.getAssetDetails(control?.value).pipe(
      tap((data) => {
        this.redgNoFromCheck = data ? data.registrationNo : '';
        this.coverDetailsForm.get('redgNo').setValue(this.redgNoFromCheck);
        this.quotationService
          .getPurchaseValue(control?.value)
          .subscribe((data) => {
            this.purchaseValue = data
              ? data
              : { purValue: '', mvClient: '', mvAdj: '' };
            this.coverDetailsForm
              .get('purchaseValue')
              .setValue(this.purchaseValue.purValue);
            this.coverDetailsForm
              .get('marketValueByClient')
              .setValue(this.purchaseValue.mvClient);
            this.coverDetailsForm
              .get('marketValueBySystem')
              .setValue(this.purchaseValue.mvAdj);
          });
      }),
      map((data) => {
        return data ? null : { valid: false };
      }),
      catchError(() => {
        this.redgNoFromCheck = '';
        return of({ valid: false });
      })
    );
  }

  validateAssuredId(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    //return null
    return this.quotationService.getClientDetails(control?.value).pipe(
      tap((data) => {
        this.clientDetails = data;
      }),
      map((data) => {
        return data ? null : { valid: false };
      }),
      catchError(() => {
        return of({ valid: false });
      })
    );
  }

  showCoverScreen(e: Event, coverCode: CoverCode, i: number) {
    //console.log(coverCode)
    e.preventDefault()
    let description
    let assured
    this.quotationService.getSumAssured(this.newCoverScreens[i]?.info?.coverCode || this.newCoverScreens[i]?.info?.riderCoverCode, this.coverDetailsForm?.value?.assetNo).subscribe( data => {
      console.log(data)
      assured = data
    })
    this.bl_modal.complete = null
    this.dr_modal.complete = null
    this.lil_modal.complete = null
    this.acc_modal.complete = null
    this.tp_modal.complete = null
    this.pc_modal.complete = null
    this.sav_modal.complete = null
    this.mh_modal.complete = null
    this.lir_modal.complete = null
    this.lia_modal.complete = null
    this.lic_modal.complete = null
    this.mc_modal.complete = null
    this.bond_modal.complete = null
    this.end_modal.complete = null

    switch (coverCode) {
      case 'BL':
        //this.modal[i] = this.bl_modal.buildingForm.
        this.bl_modal.buildingForm.reset()
        this.bl_modal.code = coverCode
        this.quotationService.getCoverScreenDescriptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(
          data => {
            description = data.description
            this.bl_modal.description = description
          }
        )
        this.quotationService.getExcessOptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(data => {
          console.log(data)
          this.bl_modal.excess = data
          if (data.defaultExcessAmount && data.defaultExcessRate){
            this.bl_modal.excess_disabled = true
            this.bl_modal.excess_display = `max(${data.defaultExcessRate}% Loss Amount, ${data.defaultExcessAmount})`
          } else if (data.defaultExcessAmount) {
            this.bl_modal.excess_disabled = true
            this.bl_modal.excess_display = data.defaultExcessAmount
          } else if (data.defaultExcessRate) {
            this.bl_modal.excess_disabled = true
            this.bl_modal.excess_display = data.defaultExcessRate
          } else {
            this.bl_modal.excess_disabled = false
            this.bl_modal.excess_display = ''
            this.bl_modal.excess_min = data.minExcess
            this.bl_modal.excess_max = data.maxExcess
          }
        })
        this.quotationService.getDeductibleOptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(data => {
          console.log(data)
          this.bl_modal.deductible = data
          if (data.defaultDeductibleAmount && data.defaultDeductibleRate){
            this.bl_modal.deductible_disabled = true
            this.bl_modal.deductible_display = `max(${data.defaultDeductibleRate}% Loss Amount, ${data.defaultExcessAmount})`
          } else if (data.defaultDeductibleAmount) {
            this.bl_modal.deductible_disabled = true
            this.bl_modal.deductible_display = data.defaultDeductibleAmount
          } else if (data.defaultDeductibleRate) {
            this.bl_modal.deductible_disabled = true
            this.bl_modal.deductible_display = data.defaultDeductibleRate
          } else {
            this.bl_modal.deductible_disabled = false
            this.bl_modal.deductible_display = ''
            this.bl_modal.deductible_min = data.minDeductible
            this.bl_modal.deductible_max = data.maxDeductible
          }
        })
        this.bl_modal.show()
        this.modal[i] = this.bl_modal.buildingForm.value
        this.bl_modal.complete = i
        this.bl_modal.buildingForm.valueChanges.subscribe( val => {
          if (i == this.bl_modal.complete){
            this.modal[i] = val
          }
        })
        break;
      case 'BO':
        //this.modal[i] = this.bl_modal.buildingForm.value
        this.quotationService.getCoverScreenDescriptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(
          data => {
            console.log(data)
            description = data.description
            this.bond_modal.description = description
          }
        )
        this.bond_modal.show()
        this.modal[i] = this.bond_modal.bondForm.value
        this.bond_modal.complete = i
        this.bond_modal.bondForm.valueChanges.subscribe( val => {
          if (i == this.bond_modal.complete){
            this.modal[i] = val
          }
        })
        break;
      case 'DR':
          //this.modal[i] = this.dr_modal.defenseForm.value
          this.quotationService.getCoverScreenDescriptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(
            data => {
              console.log(data)
              description = data.description
              this.dr_modal.description = description
            }
          )
          this.quotationService.getExcessOptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(data => {
            console.log(data)
            this.dr_modal.excess = data
            if (data.defaultExcessAmount && data.defaultExcessRate){
              this.dr_modal.excess_disabled = true
              this.dr_modal.excess_display = `max(${data.defaultExcessRate}% Loss Amount, ${data.defaultExcessAmount})`
            } else if (data.defaultExcessAmount) {
              this.dr_modal.excess_disabled = true
              this.dr_modal.excess_display = data.defaultExcessAmount
            } else if (data.defaultExcessRate) {
              this.dr_modal.excess_disabled = true
              this.dr_modal.excess_display = data.defaultExcessRate
            } else {
              this.dr_modal.excess_disabled = false
              this.dr_modal.excess_display = ''
              this.dr_modal.excess_min = data.minExcess
              this.dr_modal.excess_max = data.maxExcess
            }
          })
          this.quotationService.getDeductibleOptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(data => {
            console.log(data)
            this.dr_modal.deductible = data
            if (data.defaultDeductibleAmount && data.defaultDeductibleRate){
              this.dr_modal.deductible_disabled = true
              this.dr_modal.deductible_display = `max(${data.defaultDeductibleRate}% Loss Amount, ${data.defaultExcessAmount})`
            } else if (data.defaultDeductibleAmount) {
              this.dr_modal.deductible_disabled = true
              this.dr_modal.deductible_display = data.defaultDeductibleAmount
            } else if (data.defaultDeductibleRate) {
              this.dr_modal.deductible_disabled = true
              this.dr_modal.deductible_display = data.defaultDeductibleRate
            } else {
              this.dr_modal.deductible_disabled = false
              this.dr_modal.deductible_display = ''
              this.dr_modal.deductible_min = data.minDeductible
              this.dr_modal.deductible_max = data.maxDeductible
            }
          })
          this.dr_modal.show()
          this.dr_modal.complete = i
          this.dr_modal.defenseForm.valueChanges.subscribe( val => {
            if (i == this.dr_modal.complete){
              this.modal[i] = val
            }
          })
        break;
      case 'LIL':
          //this.modal[i] = this.lil_modal.lifeForm.value
          this.quotationService.getCoverScreenDescriptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(
            data => {
              console.log(data)
              description = data.description
              this.lil_modal.description = description
            }
          )
          if (this.newCoverScreens[i].info.blankSumAssured) {
            this.lil_modal.assured_disabled = true
          }
          this.quotationService.getSumAssured(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode, this.coverDetailsForm.value.assetNo).subscribe( data => {
            // console.log(data)
            if (data.length < 2) {
              let result = data[0]
              if (result.minSumAssured || result.maxSumAssured) {
                console.log(result.minSumAssured)
                this.lil_modal.assured_min = result.minSumAssured
                this.lil_modal.assured_max = result.maxSumAssured
                this.lil_modal.assured = ''
              } else {
                this.lil_modal.assured = result.AllowedSumAssured
              }
            } else {

            }
          })
          // console.log(assured)
          // console.log(Array.isArray(assured))
          if (Array.isArray(assured)) {
            // console.log(assured.length)
          }
          this.lil_modal.show()
          this.lil_modal.complete = i
          this.lil_modal.lifeForm.valueChanges.subscribe( val => {
            if (i == this.lil_modal.complete){
              this.modal[i] = val
            }
          })
        break
      case 'AC':
          //this.modal[i] = this.acc_modal.accessoriesForm.value
          this.quotationService.getCoverScreenDescriptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(
            data => {
              console.log(data)
              description = data.description
              this.acc_modal.description = description
            }
          )
          this.quotationService.getExcessOptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(data => {
            console.log(data)
            this.acc_modal.excess = data
            if (data.defaultExcessAmount && data.defaultExcessRate){
              this.acc_modal.excess_disabled = true
              this.acc_modal.excess_display = `max(${data.defaultExcessRate}% Loss Amount, ${data.defaultExcessAmount})`
            } else if (data.defaultExcessAmount) {
              this.acc_modal.excess_disabled = true
              this.acc_modal.excess_display = data.defaultExcessAmount
            } else if (data.defaultExcessRate) {
              this.acc_modal.excess_disabled = true
              this.acc_modal.excess_display = data.defaultExcessRate
            } else {
              this.acc_modal.excess_disabled = false
              this.acc_modal.excess_display = ''
              this.acc_modal.excess_min = data.minExcess
              this.acc_modal.excess_max = data.maxExcess
            }
          })
          this.quotationService.getDeductibleOptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(data => {
            console.log(data)
            this.acc_modal.deductible = data
            if (data.defaultDeductibleAmount && data.defaultDeductibleRate){
              this.acc_modal.deductible_disabled = true
              this.acc_modal.deductible_display = `max(${data.defaultDeductibleRate}% Loss Amount, ${data.defaultExcessAmount})`
            } else if (data.defaultDeductibleAmount) {
              this.acc_modal.deductible_disabled = true
              this.acc_modal.deductible_display = data.defaultDeductibleAmount
            } else if (data.defaultDeductibleRate) {
              this.acc_modal.deductible_disabled = true
              this.acc_modal.deductible_display = data.defaultDeductibleRate
            } else {
              this.acc_modal.deductible_disabled = false
              this.acc_modal.deductible_display = ''
              this.acc_modal.deductible_min = data.minDeductible
              this.acc_modal.deductible_max = data.maxDeductible
            }
          })
          this.acc_modal.show()
          this.acc_modal.complete = i
          this.acc_modal.accessoriesForm.valueChanges.subscribe( val => {
            if (i == this.acc_modal.complete){
              this.modal[i] = val
            }
          })
        break;
      case 'TP':
        this.tp_modal.thirdPartyForm.reset()
        this.quotationService.getCoverScreenDescriptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(
          data => {
            console.log(data)
            description = data.description
            this.tp_modal.description = description
          }
        )
          //this.modal[i] = this.tp_modal.thirdPartyForm.value
          this.tp_modal.code = coverCode
          this.tp_modal.mvAdj = this.coverDetailsForm.get('marketValueBySystem').value
          this.quotationService.getExcessOptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(data => {
            console.log(data)
            this.tp_modal.excess = data
            if (data.defaultExcessAmount && data.defaultExcessRate){
              this.tp_modal.excess_disabled = true
              this.tp_modal.excess_display = `max(${data.defaultExcessRate}% Loss Amount, ${data.defaultExcessAmount})`
            } else if (data.defaultExcessAmount) {
              this.tp_modal.excess_disabled = true
              this.tp_modal.excess_display = data.defaultExcessAmount
            } else if (data.defaultExcessRate) {
              this.tp_modal.excess_disabled = true
              this.tp_modal.excess_display = data.defaultExcessRate
            } else {
              this.tp_modal.excess_disabled = false
              this.tp_modal.excess_display = ''
              this.tp_modal.excess_min = data.minExcess
              this.tp_modal.excess_max = data.maxExcess
            }
          })
          this.quotationService.getDeductibleOptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(data => {
            console.log(data)
            this.tp_modal.deductible = data
            if (data.defaultDeductibleAmount && data.defaultDeductibleRate){
              console.log('both')
              this.tp_modal.deductible_disabled = true
              this.tp_modal.deductible_display = `max(${data.defaultDeductibleRate}% Loss Amount, ${data.defaultExcessAmount})`
            } else if (data.defaultDeductibleAmount) {
              console.log('amount')
              this.tp_modal.deductible_disabled = true
              this.tp_modal.deductible_display = data.defaultDeductibleAmount
              this.tp_modal.thirdPartyForm.get('deductible').setValue(data.defaultDeductibleAmount)
            } else if (data.defaultDeductibleRate) {
              console.log('rate')
              this.tp_modal.deductible_disabled = true
              this.tp_modal.deductible_display = data.defaultDeductibleRate
              this.tp_modal.thirdPartyForm.get('deductible').setValue(data.defaultDeductibleRate)
            } else {
              console.log('neither')
              this.tp_modal.deductible_disabled = false
              this.tp_modal.deductible_display = ''
              this.tp_modal.deductible_min = data.minDeductible
              this.tp_modal.deductible_max = data.maxDeductible
            }
          })
          this.tp_modal.show()
          this.tp_modal.complete = i
          this.tp_modal.thirdPartyForm.valueChanges.subscribe( val => {
            if (i == this.tp_modal.complete){
              this.modal[i] = val
            }
          })
        break;
      case 'PC':
        this.quotationService.getCoverScreenDescriptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(
          data => {
            console.log(data)
            description = data.description
            this.pc_modal.description = description
          }
        )
          //this.modal[i] = this.pc_modal.propertyForm.value
          this.quotationService.getExcessOptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(data => {
            console.log(data)
            this.pc_modal.excess = data
            if (data.defaultExcessAmount && data.defaultExcessRate){
              this.pc_modal.excess_disabled = true
              this.pc_modal.excess_display = `max(${data.defaultExcessRate}% Loss Amount, ${data.defaultExcessAmount})`
            } else if (data.defaultExcessAmount) {
              this.pc_modal.excess_disabled = true
              this.pc_modal.excess_display = data.defaultExcessAmount
            } else if (data.defaultExcessRate) {
              this.pc_modal.excess_disabled = true
              this.pc_modal.excess_display = data.defaultExcessRate
            } else {
              this.pc_modal.excess_disabled = false
              this.pc_modal.excess_display = ''
              this.pc_modal.excess_min = data.minExcess
              this.pc_modal.excess_max = data.maxExcess
            }
          })
          this.quotationService.getDeductibleOptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(data => {
            console.log(data)
            this.pc_modal.deductible = data
            if (data.defaultDeductibleAmount && data.defaultDeductibleRate){
              this.pc_modal.deductible_disabled = true
              this.pc_modal.deductible_display = `max(${data.defaultDeductibleRate}% Loss Amount, ${data.defaultExcessAmount})`
            } else if (data.defaultDeductibleAmount) {
              this.pc_modal.deductible_disabled = true
              this.pc_modal.deductible_display = data.defaultDeductibleAmount
            } else if (data.defaultDeductibleRate) {
              this.pc_modal.deductible_disabled = true
              this.pc_modal.deductible_display = data.defaultDeductibleRate
            } else {
              this.pc_modal.deductible_disabled = false
              this.pc_modal.deductible_display = ''
              this.pc_modal.deductible_min = data.minDeductible
              this.pc_modal.deductible_max = data.maxDeductible
            }
          })
          this.pc_modal.show()
          this.pc_modal.complete = i
          this.pc_modal.propertyForm.valueChanges.subscribe( val => {
            if (i == this.pc_modal.complete){
              this.modal[i] = val
            }
          })
        break;
      case 'SAV':
        this.quotationService.getCoverScreenDescriptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(
          data => {
            console.log(data)
            description = data.description
            this.sav_modal.description = description
          }
        )
          //this.modal[i] = this.sav_modal.savingsForm.value
          this.sav_modal.show()
          this.sav_modal.complete = i
          this.sav_modal.savingsForm.valueChanges.subscribe( val => {
            if (i == this.sav_modal.complete){
              this.modal[i] = val
            }
          })
        break;
      case 'MH':
        this.quotationService.getCoverScreenDescriptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(
          data => {
            console.log(data)
            description = data.description
            this.mh_modal.description = description
          }
        )
        //this.modal[i] = this.bl_modal.buildingForm.value
        this.mh_modal.show()
        this.modal[i] = this.mh_modal.marineHullForm.value
        this.mh_modal.complete = i
        this.mh_modal.marineHullForm.valueChanges.subscribe( val => {
          if (i == this.mh_modal.complete){
            this.modal[i] = val
          }
        })
        break;
      case 'MC':
        this.quotationService.getCoverScreenDescriptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(
          data => {
            console.log(data)
            description = data.description
            this.mc_modal.description = description
          }
        )
          //this.modal[i] = this.bl_modal.buildingForm.value
          this.mc_modal.show()
          this.modal[i] = this.mc_modal.marineCargoForm.value
          this.mc_modal.complete = i
          this.mc_modal.marineCargoForm.valueChanges.subscribe( val => {
            if (i == this.mc_modal.complete){
              this.modal[i] = val
            }
          })
        break;
      case 'ILR':
        this.quotationService.getCoverScreenDescriptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(
          data => {
            console.log(data)
            description = data.description
            this.lir_modal.description = description
          }
        )
        //this.modal[i] = this.bl_modal.buildingForm.value
        this.lir_modal.show()
        this.modal[i] = this.lir_modal.lifeForm.value
        this.lir_modal.complete = i
        this.lir_modal.lifeForm.valueChanges.subscribe( val => {
          if (i == this.lir_modal.complete){
            this.modal[i] = val
          }
        })
        break;
      case 'AL':
        this.quotationService.getCoverScreenDescriptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(
          data => {
            console.log(data)
            description = data.description
            this.lir_modal.description = description
          }
        )
        //this.modal[i] = this.bl_modal.buildingForm.value
        this.lir_modal.show()
        this.modal[i] = this.lir_modal.lifeForm.value
        this.lir_modal.complete = i
        this.lir_modal.lifeForm.valueChanges.subscribe( val => {
          if (i == this.lir_modal.complete){
            this.modal[i] = val
          }
        })
        break;
      case 'LA':
        this.quotationService.getCoverScreenDescriptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(
          data => {
            console.log(data)
            description = data.description
            this.lia_modal.description = description
          }
        )
        //this.modal[i] = this.bl_modal.buildingForm.value
        this.lia_modal.show()
        this.modal[i] = this.lia_modal.lifeForm.value
        this.lia_modal.complete = i
        this.lia_modal.lifeForm.valueChanges.subscribe( val => {
          if (i == this.lia_modal.complete){
            this.modal[i] = val
          }
        })
        break;
      case 'ICL':
        this.quotationService.getCoverScreenDescriptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(
          data => {
            console.log(data)
            description = data.description
            this.lic_modal.description = description
          }
        )
        //this.modal[i] = this.bl_modal.buildingForm.value
        this.lic_modal.show()
        this.modal[i] = this.lic_modal.lifeForm.value
        this.lic_modal.complete = i
        this.lic_modal.lifeForm.valueChanges.subscribe( val => {
          if (i == this.lic_modal.complete){
            this.modal[i] = val
          }
        })
        break;
      case 'IS':
        this.quotationService.getCoverScreenDescriptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(
          data => {
            console.log(data)
            description = data.description
            this.lir_modal.description = description
          }
        )
        //this.modal[i] = this.bl_modal.buildingForm.value
        this.lir_modal.show()
        this.modal[i] = this.lir_modal.lifeForm.value
        this.lir_modal.complete = i
        this.lir_modal.lifeForm.valueChanges.subscribe( val => {
          if (i == this.lir_modal.complete){
            this.modal[i] = val
          }
        })
        break;
      case 'END':
        this.quotationService.getCoverScreenDescriptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(
          data => {
            console.log(data)
            description = data.description
            this.end_modal.description = description
          }
        )
        //this.modal[i] = this.bl_modal.buildingForm.value
        this.end_modal.show()
        this.modal[i] = this.end_modal.endowmentForm.value
        this.end_modal.complete = i
        this.end_modal.endowmentForm.valueChanges.subscribe( val => {
          if (i == this.end_modal.complete){
            this.modal[i] = val
          }
        })
        break;
      case 'GLR':
        this.quotationService.getCoverScreenDescriptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(
          data => {
            console.log(data)
            description = data.description
            this.lir_modal.description = description
          }
        )
        //this.modal[i] = this.bl_modal.buildingForm.value
        this.lir_modal.show()
        this.modal[i] = this.lir_modal.lifeForm.value
        this.lir_modal.complete = i
        this.lir_modal.lifeForm.valueChanges.subscribe( val => {
          if (i == this.lir_modal.complete){
            this.modal[i] = val
          }
        })
        break;
      default:
        break;
    }
  }



  showRp1Modal() {
    $('#rt1modal').modal('show')
  }

  showRp2Modal() {
    $('#rt2modal').modal('show')
  }

  showRp3Modal() {
    $('#rt3modal').modal('show')
  }

  showRp4Modal() {
    $('#rt4modal').modal('show')
  }

  showRp5Modal() {
    $('#rt5modal').modal('show')
  }

  showRp6Modal() {
    $('#rt6modal').modal('show')
  }

  uncheckrp1() {
    this.isRp1Check = false;
  }

  checkrp1() {
    this.isRp1Check = true;
  }

  hideRp1Modal() {
    console.log("of")
    $('#rt1modal').modal('hide')
  }

  setPlan(element: any) {

    if(element.value == "DDebit"){
      $('#paymentMethodModal').modal('show')
    }
  }

  coinCounter() {
    return new Array(this.nbofCoin);
  }

  coiInc() {
    this.nbofCoin = this.nbofCoin + 1
  }

  coinInc() {
    const value = 100/(this.coinsurersList.length + 1)
    const b = new FormGroup({
      providerNo: new FormControl(null, Validators.required),
      providerFullName: new FormControl(null, [Validators.required, Validators.max(100), Validators.min(1)]),
      lead: new FormControl(null, [Validators.required]),
      self: new FormControl(null, [Validators.required]),
      share: new FormControl(value, [Validators.required]),
    })
    const coinsurersList = <FormArray> this.coverDetailsForm.get('coinsurersList')
    for (let i = 0; i < this.coinsurersList.length; i++) {
      console.log(coinsurersList.controls[i]);
      coinsurersList.controls[i].get('share').setValue(value)
    }

    this.coinsurer.push('');
    this.isLead.push(false);
    this.isSelf.push(false);
    this.coinsurersList.push(b);
  }

  getCheckedItemList(){
   console.log(this.coverDetailsForm.get('coinsurersList'));
  }

  onCheckboxChange(e,c) {
    const coinsurersList = <FormArray> this.coverDetailsForm.get('coinsurersList')
    for (let i = 0; i < this.coinsurersList.length; i++) {
      if(e.target.checked[i] === true){
        if(this.checkArray.length = 1){
          this.checkArray[i] = e.target.checked[i]
        }else{
          console.log("E dey reach here")
          let cValue  = coinsurersList.controls[i].get('lead')?.value;
          cValue = true;
          this.checkArray.push(cValue);
        }
    }
  }
  }





  sgCounter() {
    return new Array(this.nbofSg);
  }

  sgInc() {
    const b = new FormGroup({
      subGroupNo: new FormControl(null, Validators.required),
      subGroupName: new FormControl(null, [Validators.required, Validators.max(100), Validators.min(1)]),
    })
    this.subGroupL.push('');
    this.subGroupsList.push(b)
  }

  getSubGroupChecked(e,i){
    console.log(`event checked${i}`+ e.target.checked, this.coverDetailsForm.get('subGroupsList'))
    this.coverDetailsForm.get('subGroupsList').value[0].subGroupNo
    if(e.target.checked){
      let subGroupNo  = this.coverDetailsForm.get('subGroupsList').value[i].subGroupNo;
     let subGroupName =  this.coverDetailsForm.get('subGroupsList').value[i].subGroupName;
     this.coverDetailsForm.patchValue({
      subGroupNoSingle: subGroupNo,
      subGroupNameSingle: subGroupName
     })
    }
  }

  checkLead(event: Event, i) {
    if (this.isLead.length > 1){
      if (this.isLead.includes(true)){
        if (this.isLead.indexOf(true) == i){
          this.isLead[i] = !this.isLead[i]
        } else {
          event.preventDefault()
          this.isLead[i] = false
        }
      } else {
        this.isLead[i] = !this.isLead[i]
      }
    } else if (this.isLead.includes(true)) {
      event.preventDefault()
    }
  }

  checkSelf(event: Event, i) {
    if (this.isLead.length > 1){
      if (this.isSelf.includes(true)){
        console.log(this.isSelf.indexOf(true))
        if (this.isSelf.indexOf(true) == i){
          this.isSelf[i] = !this.isSelf[i]
        } else {
          event.preventDefault()
          this.isSelf[i] = false
        }
      } else {
        this.isSelf[i] = !this.isSelf[i]
      }
    } else if (this.isSelf.includes(true)) {
      event.preventDefault()
    }
  }



  rsaCounter() {
    return new Array(this.nbofRsa);
  }

  rsaInc() {
    this.nbofRsa = this.nbofRsa + 1
  }


  memberCounter() {
    return new Array(this.nbofMember);
  }

  memberInc() {
    this.nbofMember = this.nbofMember + 1
  }

}
