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
import { QuotationService } from 'src/app/General/services/quotation-service.service';
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
  quoteNo: any;
  product: { code: string; description: string; };
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
    const queryParams = this.route.snapshot.queryParamMap;

    this.product = {
      code: queryParams.get('pcd'),
      description: queryParams.get('pdsc')
    }
    this.clientDetails = this.route.snapshot.data['clientDetails'];

  //   const queryParams = this.route.snapshot.queryParamMap;
  //   this.currencyOptions$ = this.quotationService.getCurrencyOptions(
  //     queryParams.get('pcd')
  //   );
  //   console.log(this.currencyOptions$);

  //   this.todate = new Date(Date.now());

  //   this.product = {
  //     code: queryParams.get('pcd'),
  //     description: queryParams.get('pdsc')
  //   }

  //   this.createItem()
  //   this.coverDetailsForm = this.fb.group({
  //     applicationDate: [
  //       formatDate(this.todate, 'yyyy-MM-dd', 'en'),
  //       [Validators.required],
  //     ],
  //     commencementDate: [
  //       formatDate(this.todate, 'yyyy-MM-dd', 'en'),
  //       [Validators.required],
  //     ],
  //     currency: new FormControl(null, Validators.required),
  //     premiumPaymentMethod: new FormControl(null, Validators.required),
  //     discountCode: new FormControl(null, Validators.required),
  //     discountRate: new FormControl(null, Validators.required),
  //     payAsYouGo: new FormControl(null, Validators.required),
  //     policyTerm: new FormControl(null, Validators.required),
  //     premiumPaymentTerm: new FormControl(null, Validators.required),
  //     premiumPayFreq: new FormControl(null, Validators.required),
  //     assetNo: new FormControl(
  //       null,
  //       Validators.required,
  //       this.validateAssetId.bind(this)
  //     ),
  //     redgNo: new FormControl(null, Validators.required),
  //     purchaseValue: new FormControl(null, Validators.required),
  //     marketValueByClient: new FormControl(null, Validators.required),
  //     marketValueBySystem: new FormControl(null, Validators.required),
  //     covers: this.fb.array([]),
  //   });
  }

  // createItems() {
  //   return this.fb.group({
  //     assuredNo: new FormControl(this.clientDetails.clientNo, Validators.required),
  //     assuredName: new FormControl(null, Validators.required),
  //     assuredRel: new FormControl('Self', Validators.required),
  //   })
  // }

  // async createItem(): Promise<void> {
  //   await this.stuff(this.product.code).then( () => {
  //     let cover = this.coverDetailsForm.get('covers') as FormArray
  //     let i = 0
  //     this.coverScreens.forEach( cov => {
  //       // console.log(cov)
  //       this.newCoverScreens.push(cov)
  //       cover.push(this.createItems())
  //       if (cov.info.base == '1') {
  //         this.premiumPaymentFreqOptions$ = this.quotationService.getPremiumFrequencyOptions(cov.info.coverCode)
  //         this.quotationService.getPremiumFrequencyOptions(cov.info.coverCode).subscribe(data => {
  //           this.quotationService.getFrequencyDescriptions().subscribe(ele => {
  //             this.frqDesc = ele
  //             console.log(this.frqDesc)
  //             data.forEach(element => {
  //               console.log(element)
  //               this.frqDesc.forEach(desc => {
  //                 console.log('desc: ', desc)
  //                 if(element.frequency == desc.premFreq){
  //                   this.freq.push(
  //                     {
  //                       freq: element.frequency,
  //                       desc: desc.description || 'null'
  //                     }
  //                   )
  //                 } 
  //               })
  //             })
  //             console.log(this.freq)
  //           })
  //         })
          

          
          

  //       }
  //       // this.quotationService.getPremiumFrequencyOptions(cov.info.coverCode).subscribe(data=>console.log(data))
        
  //       if (cov.info.base || cov.info.mandatory) {
  //         this.selected.push(true)
  //       } else (
  //         this.selected.push(false)
  //       )
  //       this.modal.push({})
  //       this.isDependent.push(false)
  //       this.complete.push(true)
  //       this.quotationService.getClientDetails(this.clientDetails.clientNo).subscribe(data => {
  //         const value = data ? data : {fullName: ''}
  //         this.client.push(value)
  //       })
  //       this.assuredRelToOwner$.push("Self")
        
  //       if (cov.info.base == '1' || cov.info.mandatory == true) {
  //         // console.log(cov)
  //         this.quotationService.getDependentCovers(cov.info.coverCode).subscribe( 
  //           data => {
  //           //console.log('data:', data)
  //           let supindex = this.coverScreens.indexOf(cov)
  //           // console.log(supindex)
  //           data.forEach( (element, index) => {
  //             this.newCoverScreens.splice(supindex + index + 1 + i, 0, element)
  //             this.isDependent.splice(supindex + index + 1  + i, 0, true)
  //             this.coverScreens.push(element)
  //             if (element.info.base || element.info.mandatory) {
  //               this.selected.splice(supindex + index + 1 + i, 0, true)
  //             } else (
  //               this.selected.splice(supindex + index + 1 + i, 0, false)
  //             )
  //             this.modal.push({})
  //             this.complete.push(true)
  //             this.quotationService.getClientDetails(this.clientDetails.clientNo).subscribe(data => {
  //               const value = data ? data : {fullName: ''}
  //               this.client.push(value)
  //             })
  //             cover.push(this.createItems())
  //             //console.log(true)
  //             this.assuredRelToOwner$.push("Self")
  //             //console.log(this.newCoverScreens)
  //             i++
  //           })
  //         },
  //         err => console.log(err),
  //         () => console.log('finished') 
  //         )
  //       }
  //     })
      
  //   })
  // }
  // get assetId() {
  //   return this.coverDetailsForm.get('assetNo');
  // }

  // setSelected(i) {
  //   this.selected[i] = this.selected[i] ? false : true 
  //   let cov = this.newCoverScreens[i]
  //   let cover = this.coverDetailsForm.get('covers') as FormArray
  //   if (this.selected[i]){
  //     //console.log('checked')
  //     if (cov.info.coverCode){       
  //     console.log('process started')
  //       this.quotationService.getDependentCovers(cov.info.coverCode).subscribe( 
  //         data => {
  //         //console.log('data:', data)
  //         let supindex = this.coverScreens.indexOf(cov)
  //         data.forEach( (element, index) => {
  //           this.newCoverScreens.splice(supindex + index + 1, 0, element)
  //           this.coverScreens.push(element)
  //           if (element.info.base || element.info.mandatory) {
  //             this.selected.splice(supindex + index + 1, 0, true)
  //           } else (
  //             this.selected.splice(supindex + index + 1, 0, false)
  //           )
  //           this.modal.push({})
  //           this.complete.push(true)
  //           this.quotationService.getClientDetails(this.clientDetails.clientNo).subscribe(data => {
  //             const value = data ? data : {fullName: ''}
  //             this.client.push(value)
  //           })
  //           cover.push(this.createItems())
  //           //console.log(true)
  //           this.assuredRelToOwner$.splice(supindex + index + 1, 0, "Self")
  //           //console.log(this.newCoverScreens)
  //         })
  //       },
  //       err => console.log(err),
  //       () => console.log('finished') 
  //       )
  //     }
  //   } else {
  //     //console.log('unchecked')
  //     if (cov.info.coverCode) {
  //       let supindex = this.newCoverScreens.indexOf(cov)
  //       this.quotationService.getDependentCovers(cov.info.coverCode).subscribe( 
  //         data => {
  //         //console.log('data:', data)
  //         this.newCoverScreens.splice(supindex + 1, data.length)
  //         this.selected.splice(supindex + 1, data.length)
  //         this.modal.splice(supindex + 1, data.length)
  //         this.complete.splice(supindex + 1, data.length)
  //         this.client.splice(supindex + 1, data.length)
  //         this.assuredRelToOwner$.splice(supindex + 1, data.length)
  //         data.forEach( (element, index) => {
  //           // let sindex = this.newCoverScreens.indexOf(element)
  //           // console.log(sindex)
  //           // this.newCoverScreens.splice(supindex, 1)
  //           // this.coverScreens.push(element)
  //           // this.selected.splice(sindex, 1)
  //           // this.modal.splice(sindex, 1)
  //           // this.complete.splice(sindex, 1)
  //           // this.client.splice(sindex, 1)
  //           cover.removeAt(supindex + 1)
  //           //console.log(true)
  //           // this.assuredRelToOwner$.splice(sindex, 1)
  //           // console.log(this.newCoverScreens)
  //         })
  //       },
  //       err => console.log(err),
  //       () => console.log('finished') 
  //       )
  //     }
  //   }
  // }

  // findAssured(i, value){
  //   this.quotationService.getClientDetails(value).subscribe(data => {
  //     this.client[i] = data ? data : {fullName: ''}
  //     const covers = this.coverDetailsForm.get('covers')
  //     covers.value.forEach( (element, index) => {
  //       if (index == i) {
  //         element.assuredName = this.client[i].fullName;
  //       }
  //     });
  //   });
  //   if (value == this.clientDetails.clientNo) {
  //     this.assuredRelToOwner$[i] = 'Self';
  //   } else {
  //     this.quotationService
  //       .getAssuredRelToOwner(this.clientDetails.clientNo, value)
  //       .subscribe((data) => {
  //         this.assuredRelToOwner$[i] = data ? data.relationship : '';
  //       });
  //   }
  // }




  // validateAssetId(control: AbstractControl): Observable<ValidationErrors | null> {
  //   this.redgNoFromCheck = ''
  //   return this.quotationService.getAssetDetails(control?.value).pipe(
  //     tap((data) => {
  //       this.redgNoFromCheck = data ? data.registrationNo : '';
  //       this.coverDetailsForm.get('redgNo').setValue(this.redgNoFromCheck);
  //       this.quotationService
  //         .getPurchaseValue(control?.value)
  //         .subscribe((data) => {
  //           this.purchaseValue = data
  //             ? data
  //             : { purValue: '', mvClient: '', mvAdj: '' };
  //           this.coverDetailsForm
  //             .get('purchaseValue')
  //             .setValue(this.purchaseValue.purValue);
  //           this.coverDetailsForm
  //             .get('marketValueByClient')
  //             .setValue(this.purchaseValue.mvClient);
  //           this.coverDetailsForm
  //             .get('marketValueBySystem')
  //             .setValue(this.purchaseValue.mvAdj);
  //         });
  //     }),
  //     map((data) => {
  //       return data ? null : { valid: false };
  //     }),
  //     catchError(() => {
  //       this.redgNoFromCheck = '';
  //       return of({ valid: false });
  //     })
  //   );
  // }

  // validateAssuredId(
  //   control: AbstractControl
  // ): Observable<ValidationErrors | null> {
  //   //return null
  //   return this.quotationService.getClientDetails(control?.value).pipe(
  //     tap((data) => {
  //       this.clientDetails = data;
  //     }),
  //     map((data) => {
  //       return data ? null : { valid: false };
  //     }),
  //     catchError(() => {
  //       return of({ valid: false });
  //     })
  //   );
  // }

  // changeDiscCode() {
  //   console.log(this.coverDetailsForm.value.discountCode)
  //   console.log(formatDate(this.coverDetailsForm.get('applicationDate').value, 'dd/MM/yyyy', 'en'))
  //   let data = {
  //     applicationDate: formatDate(this.coverDetailsForm.get('applicationDate').value, 'dd/MM/yyyy', 'en'),
  //     discountCode: this.coverDetailsForm.value.discountCode
  //   }
  //   this.quotationService.getDiscountRate(data).subscribe( data => this.coverDetailsForm.patchValue({discountRate: data.response.rate}))
  // }

  // showCoverScreen(e: Event, coverCode: CoverCode, i: number) {
  //   console.log(coverCode)
  //   e.preventDefault()
  //   let assured 
  //   this.quotationService.getSumAssured(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode, this.coverDetailsForm.value.assetNo).subscribe( data => {
  //     console.log(data)
  //     assured = data
      
  //   })
  //   this.bl_modal.complete = null
  //   this.dr_modal.complete = null
  //   this.lil_modal.complete = null
  //   this.acc_modal.complete = null
  //   this.tp_modal.complete = null
  //   this.pc_modal.complete = null
  //   this.sav_modal.complete = null
  //   this.mh_modal.complete = null
  //   this.mc_modal.complete = null
  //   this.bond_modal.complete = null
  //   switch (coverCode) {
  //     case 'BL':
  //       //this.modal[i] = this.bl_modal.buildingForm.value
  //       this.bl_modal.code = coverCode
  //         this.quotationService.getExcessOptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(data => {
  //           console.log(data)
  //           this.bl_modal.excess = data
  //           if (data.defaultExcessAmount && data.defaultExcessRate){
  //             this.bl_modal.excess_disabled = true
  //             this.bl_modal.excess_display = `max(${data.defaultExcessRate}% Loss Amount, ${data.defaultExcessAmount})`
  //           } else if (data.defaultExcessAmount) {
  //             this.bl_modal.excess_disabled = true
  //             this.bl_modal.excess_display = data.defaultExcessAmount
  //           } else if (data.defaultExcessRate) {
  //             this.bl_modal.excess_disabled = true
  //             this.bl_modal.excess_display = data.defaultExcessRate
  //           } else {
  //             this.bl_modal.excess_disabled = false
  //             this.bl_modal.excess_display = ''
  //             this.bl_modal.excess_min = data.minExcess
  //             this.bl_modal.excess_max = data.maxExcess
  //           }
  //         })
  //         this.quotationService.getDeductibleOptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(data => {
  //           console.log(data)
  //           this.bl_modal.deductible = data
  //           if (data.defaultDeductibleAmount && data.defaultDeductibleRate){
  //             this.bl_modal.deductible_disabled = true
  //             this.bl_modal.deductible_display = `max(${data.defaultDeductibleRate}% Loss Amount, ${data.defaultExcessAmount})`
  //           } else if (data.defaultDeductibleAmount) {
  //             this.bl_modal.deductible_disabled = true
  //             this.bl_modal.deductible_display = data.defaultDeductibleAmount
  //           } else if (data.defaultDeductibleRate) {
  //             this.bl_modal.deductible_disabled = true
  //             this.bl_modal.deductible_display = data.defaultDeductibleRate
  //           } else {
  //             this.bl_modal.deductible_disabled = false
  //             this.bl_modal.deductible_display = ''
  //             this.bl_modal.deductible_min = data.minDeductible
  //             this.bl_modal.deductible_max = data.maxDeductible
  //           }
  //         })
  //       this.bl_modal.show()
  //       this.modal[i] = this.bl_modal.buildingForm.value
  //       this.bl_modal.complete = i
  //       this.bl_modal.buildingForm.valueChanges.subscribe( val => {
  //         if (i == this.bl_modal.complete){
  //           this.modal[i] = val
  //         }
  //       })
  //       break;
  //     case 'BO':
  //       //this.modal[i] = this.bl_modal.buildingForm.value
  //       this.bond_modal.show()
  //       this.modal[i] = this.bond_modal.bondForm.value
  //       this.bond_modal.complete = i
  //       this.bond_modal.bondForm.valueChanges.subscribe( val => {
  //         if (i == this.bond_modal.complete){
  //           this.modal[i] = val
  //         }
  //       })
  //       break;
  //     case 'DR':
  //         //this.modal[i] = this.dr_modal.defenseForm.value
  //         this.quotationService.getExcessOptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(data => {
  //           console.log(data)
  //           this.dr_modal.excess = data
  //           if (data.defaultExcessAmount && data.defaultExcessRate){
  //             this.dr_modal.excess_disabled = true
  //             this.dr_modal.excess_display = `max(${data.defaultExcessRate}% Loss Amount, ${data.defaultExcessAmount})`
  //           } else if (data.defaultExcessAmount) {
  //             this.dr_modal.excess_disabled = true
  //             this.dr_modal.excess_display = data.defaultExcessAmount
  //           } else if (data.defaultExcessRate) {
  //             this.dr_modal.excess_disabled = true
  //             this.dr_modal.excess_display = data.defaultExcessRate
  //           } else {
  //             this.dr_modal.excess_disabled = false
  //             this.dr_modal.excess_display = ''
  //             this.dr_modal.excess_min = data.minExcess
  //             this.dr_modal.excess_max = data.maxExcess
  //           }
  //         })
  //         this.quotationService.getDeductibleOptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(data => {
  //           console.log(data)
  //           this.dr_modal.deductible = data
  //           if (data.defaultDeductibleAmount && data.defaultDeductibleRate){
  //             this.dr_modal.deductible_disabled = true
  //             this.dr_modal.deductible_display = `max(${data.defaultDeductibleRate}% Loss Amount, ${data.defaultExcessAmount})`
  //           } else if (data.defaultDeductibleAmount) {
  //             this.dr_modal.deductible_disabled = true
  //             this.dr_modal.deductible_display = data.defaultDeductibleAmount
  //           } else if (data.defaultDeductibleRate) {
  //             this.dr_modal.deductible_disabled = true
  //             this.dr_modal.deductible_display = data.defaultDeductibleRate
  //           } else {
  //             this.dr_modal.deductible_disabled = false
  //             this.dr_modal.deductible_display = ''
  //             this.dr_modal.deductible_min = data.minDeductible
  //             this.dr_modal.deductible_max = data.maxDeductible
  //           }
  //         })
  //         this.dr_modal.show()
  //         this.dr_modal.complete = i
  //         this.dr_modal.defenseForm.valueChanges.subscribe( val => {
  //           if (i == this.dr_modal.complete){
  //             this.modal[i] = val
  //           }
  //         })
  //       break;
  //     case 'LIL':
  //         //this.modal[i] = this.lil_modal.lifeForm.value
  //         if (this.newCoverScreens[i].info.blankSumAssured) {
  //           this.lil_modal.assured_disabled = true
  //         }
  //         this.quotationService.getSumAssured(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode, this.coverDetailsForm.value.assetNo).subscribe( data => {
  //           console.log(data)
  //           if (data.length < 2) {
  //             let result = data[0]
  //             if (result.minSumAssured || result.maxSumAssured) {
  //               console.log(result.minSumAssured)
  //               this.lil_modal.assured_min = result.minSumAssured
  //               this.lil_modal.assured_max = result.maxSumAssured
  //               this.lil_modal.assured = ''
  //             } else {
  //               this.lil_modal.assured = result.AllowedSumAssured
  //             }
  //           } else {

  //           }
  //         })
  //         console.log(assured)
  //         console.log(Array.isArray(assured))
  //         if (Array.isArray(assured)) {
  //           console.log(assured.length)
  //         }
  //         this.lil_modal.show()
  //         this.lil_modal.complete = i
  //         this.lil_modal.lifeForm.valueChanges.subscribe( val => {
  //           if (i == this.lil_modal.complete){
  //             this.modal[i] = val
  //           }
  //         })
  //       break
  //     case 'AC':
  //         //this.modal[i] = this.acc_modal.accessoriesForm.value
  //         this.quotationService.getExcessOptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(data => {
  //           console.log(data)
  //           this.acc_modal.excess = data
  //           if (data.defaultExcessAmount && data.defaultExcessRate){
  //             this.acc_modal.excess_disabled = true
  //             this.acc_modal.excess_display = `max(${data.defaultExcessRate}% Loss Amount, ${data.defaultExcessAmount})`
  //           } else if (data.defaultExcessAmount) {
  //             this.acc_modal.excess_disabled = true
  //             this.acc_modal.excess_display = data.defaultExcessAmount
  //           } else if (data.defaultExcessRate) {
  //             this.acc_modal.excess_disabled = true
  //             this.acc_modal.excess_display = data.defaultExcessRate
  //           } else {
  //             this.acc_modal.excess_disabled = false
  //             this.acc_modal.excess_display = ''
  //             this.acc_modal.excess_min = data.minExcess
  //             this.acc_modal.excess_max = data.maxExcess
  //           }
  //         })
  //         this.quotationService.getDeductibleOptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(data => {
  //           console.log(data)
  //           this.acc_modal.deductible = data
  //           if (data.defaultDeductibleAmount && data.defaultDeductibleRate){
  //             this.acc_modal.deductible_disabled = true
  //             this.acc_modal.deductible_display = `max(${data.defaultDeductibleRate}% Loss Amount, ${data.defaultExcessAmount})`
  //           } else if (data.defaultDeductibleAmount) {
  //             this.acc_modal.deductible_disabled = true
  //             this.acc_modal.deductible_display = data.defaultDeductibleAmount
  //           } else if (data.defaultDeductibleRate) {
  //             this.acc_modal.deductible_disabled = true
  //             this.acc_modal.deductible_display = data.defaultDeductibleRate
  //           } else {
  //             this.acc_modal.deductible_disabled = false
  //             this.acc_modal.deductible_display = ''
  //             this.acc_modal.deductible_min = data.minDeductible
  //             this.acc_modal.deductible_max = data.maxDeductible
  //           }
  //         })
  //         this.acc_modal.show()
  //         this.acc_modal.complete = i
  //         this.acc_modal.accessoriesForm.valueChanges.subscribe( val => {
  //           if (i == this.acc_modal.complete){
  //             this.modal[i] = val
  //           }
  //         })
  //       break;
  //     case 'TP':
  //         //this.modal[i] = this.tp_modal.thirdPartyForm.value
  //         this.tp_modal.code = coverCode
  //         this.tp_modal.mvAdj = this.coverDetailsForm.get('marketValueBySystem').value
  //         this.quotationService.getExcessOptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(data => {
  //           console.log(data)
  //           this.tp_modal.excess = data
  //           if (data.defaultExcessAmount && data.defaultExcessRate){
  //             this.tp_modal.excess_disabled = true
  //             this.tp_modal.excess_display = `max(${data.defaultExcessRate}% Loss Amount, ${data.defaultExcessAmount})`
  //           } else if (data.defaultExcessAmount) {
  //             this.tp_modal.excess_disabled = true
  //             this.tp_modal.excess_display = data.defaultExcessAmount
  //           } else if (data.defaultExcessRate) {
  //             this.tp_modal.excess_disabled = true
  //             this.tp_modal.excess_display = data.defaultExcessRate
  //           } else {
  //             this.tp_modal.excess_disabled = false
  //             this.tp_modal.excess_display = ''
  //             this.tp_modal.excess_min = data.minExcess
  //             this.tp_modal.excess_max = data.maxExcess
  //           }
  //         })
  //         this.quotationService.getDeductibleOptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(data => {
  //           console.log(data)
  //           this.tp_modal.deductible = data
  //           if (data.defaultDeductibleAmount && data.defaultDeductibleRate){
  //             console.log('both')
  //             this.tp_modal.deductible_disabled = true
  //             this.tp_modal.deductible_display = `max(${data.defaultDeductibleRate}% Loss Amount, ${data.defaultExcessAmount})`
  //           } else if (data.defaultDeductibleAmount) {
  //             console.log('amount')
  //             this.tp_modal.deductible_disabled = true
  //             this.tp_modal.deductible_display = data.defaultDeductibleAmount
  //             this.tp_modal.thirdPartyForm.get('deductible').setValue(data.defaultDeductibleAmount)
  //           } else if (data.defaultDeductibleRate) {
  //             console.log('rate')
  //             this.tp_modal.deductible_disabled = true
  //             this.tp_modal.deductible_display = data.defaultDeductibleRate
  //             this.tp_modal.thirdPartyForm.get('deductible').setValue(data.defaultDeductibleRate)
  //           } else {
  //             console.log('neither')
  //             this.tp_modal.deductible_disabled = false
  //             this.tp_modal.deductible_display = ''
  //             this.tp_modal.deductible_min = data.minDeductible
  //             this.tp_modal.deductible_max = data.maxDeductible
  //           }
  //         })
  //         this.tp_modal.show()
  //         this.tp_modal.complete = i
  //         this.tp_modal.thirdPartyForm.valueChanges.subscribe( val => {
  //           if (i == this.tp_modal.complete){
  //             this.modal[i] = val
  //           }
  //         })
  //       break;
  //     case 'PC':
  //         //this.modal[i] = this.pc_modal.propertyForm.value
  //         this.quotationService.getExcessOptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(data => {
  //           console.log(data)
  //           this.pc_modal.excess = data
  //           if (data.defaultExcessAmount && data.defaultExcessRate){
  //             this.pc_modal.excess_disabled = true
  //             this.pc_modal.excess_display = `max(${data.defaultExcessRate}% Loss Amount, ${data.defaultExcessAmount})`
  //           } else if (data.defaultExcessAmount) {
  //             this.pc_modal.excess_disabled = true
  //             this.pc_modal.excess_display = data.defaultExcessAmount
  //           } else if (data.defaultExcessRate) {
  //             this.pc_modal.excess_disabled = true
  //             this.pc_modal.excess_display = data.defaultExcessRate
  //           } else {
  //             this.pc_modal.excess_disabled = false
  //             this.pc_modal.excess_display = ''
  //             this.pc_modal.excess_min = data.minExcess
  //             this.pc_modal.excess_max = data.maxExcess
  //           }
  //         })
  //         this.quotationService.getDeductibleOptions(this.newCoverScreens[i].info.coverCode || this.newCoverScreens[i].info.riderCoverCode).subscribe(data => {
  //           console.log(data)
  //           this.pc_modal.deductible = data
  //           if (data.defaultDeductibleAmount && data.defaultDeductibleRate){
  //             this.pc_modal.deductible_disabled = true
  //             this.pc_modal.deductible_display = `max(${data.defaultDeductibleRate}% Loss Amount, ${data.defaultExcessAmount})`
  //           } else if (data.defaultDeductibleAmount) {
  //             this.pc_modal.deductible_disabled = true
  //             this.pc_modal.deductible_display = data.defaultDeductibleAmount
  //           } else if (data.defaultDeductibleRate) {
  //             this.pc_modal.deductible_disabled = true
  //             this.pc_modal.deductible_display = data.defaultDeductibleRate
  //           } else {
  //             this.pc_modal.deductible_disabled = false
  //             this.pc_modal.deductible_display = ''
  //             this.pc_modal.deductible_min = data.minDeductible
  //             this.pc_modal.deductible_max = data.maxDeductible
  //           }
  //         })
  //         this.pc_modal.show()
  //         this.pc_modal.complete = i
  //         this.pc_modal.propertyForm.valueChanges.subscribe( val => {
  //           if (i == this.pc_modal.complete){
  //             this.modal[i] = val
  //           }
  //         })
  //       break;
  //     case 'SAV':
  //         //this.modal[i] = this.sav_modal.savingsForm.value
  //         this.sav_modal.show()
  //         this.sav_modal.complete = i
  //         this.sav_modal.savingsForm.valueChanges.subscribe( val => {
  //           if (i == this.sav_modal.complete){
  //             this.modal[i] = val
  //           }
  //         })
  //       break;
  //     case 'MH':
  //       //this.modal[i] = this.bl_modal.buildingForm.value
  //       this.mh_modal.show()
  //       this.modal[i] = this.mh_modal.marineHullForm.value
  //       this.mh_modal.complete = i
  //       this.mh_modal.marineHullForm.valueChanges.subscribe( val => {
  //         if (i == this.mh_modal.complete){
  //           this.modal[i] = val
  //         }
  //       })
  //       break;
  //     case 'MC':
  //         //this.modal[i] = this.bl_modal.buildingForm.value
  //         this.mc_modal.show()
  //         this.modal[i] = this.mc_modal.marineCargoForm.value
  //         this.mc_modal.complete = i
  //         this.mc_modal.marineCargoForm.valueChanges.subscribe( val => {
  //           if (i == this.mc_modal.complete){
  //             this.modal[i] = val
  //           }
  //         })
  //       break;
  //     case 'ILR':
  //       //this.modal[i] = this.bl_modal.buildingForm.value
  //       this.lir_modal.show()
  //       this.modal[i] = this.lir_modal.lifeForm.value
  //       this.lir_modal.complete = i
  //       this.lir_modal.lifeForm.valueChanges.subscribe( val => {
  //         if (i == this.lir_modal.complete){
  //           this.modal[i] = val
  //         }
  //       })
  //       break;
  //     case 'AL':
  //       //this.modal[i] = this.bl_modal.buildingForm.value
  //       this.lir_modal.show()
  //       this.modal[i] = this.lir_modal.lifeForm.value
  //       this.lir_modal.complete = i
  //       this.lir_modal.lifeForm.valueChanges.subscribe( val => {
  //         if (i == this.lir_modal.complete){
  //           this.modal[i] = val
  //         }
  //       })
  //       break;
  //     case 'LA':
  //       //this.modal[i] = this.bl_modal.buildingForm.value
  //       this.lir_modal.show()
  //       this.modal[i] = this.lir_modal.lifeForm.value
  //       this.lir_modal.complete = i
  //       this.lir_modal.lifeForm.valueChanges.subscribe( val => {
  //         if (i == this.lir_modal.complete){
  //           this.modal[i] = val
  //         }
  //       })
  //       break;
  //     case 'ICL':
  //       //this.modal[i] = this.bl_modal.buildingForm.value
  //       this.lir_modal.show()
  //       this.modal[i] = this.lir_modal.lifeForm.value
  //       this.lir_modal.complete = i
  //       this.lir_modal.lifeForm.valueChanges.subscribe( val => {
  //         if (i == this.lir_modal.complete){
  //           this.modal[i] = val
  //         }
  //       })
  //       break;
  //     case 'IS':
  //       //this.modal[i] = this.bl_modal.buildingForm.value
  //       this.lir_modal.show()
  //       this.modal[i] = this.lir_modal.lifeForm.value
  //       this.lir_modal.complete = i
  //       this.lir_modal.lifeForm.valueChanges.subscribe( val => {
  //         if (i == this.lir_modal.complete){
  //           this.modal[i] = val
  //         }
  //       })
  //       break;
  //     case 'END':
  //       //this.modal[i] = this.bl_modal.buildingForm.value
  //       this.lir_modal.show()
  //       this.modal[i] = this.lir_modal.lifeForm.value
  //       this.lir_modal.complete = i
  //       this.lir_modal.lifeForm.valueChanges.subscribe( val => {
  //         if (i == this.lir_modal.complete){
  //           this.modal[i] = val
  //         }
  //       })
  //       break;
  //     case 'GLR':
  //       //this.modal[i] = this.bl_modal.buildingForm.value
  //       this.lir_modal.show()
  //       this.modal[i] = this.lir_modal.lifeForm.value
  //       this.lir_modal.complete = i
  //       this.lir_modal.lifeForm.valueChanges.subscribe( val => {
  //         if (i == this.lir_modal.complete){
  //           this.modal[i] = val
  //         }
  //       })
  //       break;
  //     default:
  //       break;
  //   }
  // }

  // showRp4Modal() {
  //   $('#rt4modal').modal('show')
  // }
  // showRp1Modal() {
  //   $('#rt1modal').modal('show')
  // }

  // showRp2Modal() {
  //   $('#rt2modal').modal('show')
  // }

  // showRp3Modal() {
  //   $('#rt3modal').modal('show')
  // }

  // showRp5Modal() {
  //   $('#rt5modal').modal('show')
  // }

  // showRp6Modal() {
  //   $('#rt6modal').modal('show')
  // }

  // setPlan(element: any) {

  //   if (element.value == "DDebit") {
  //     $('#paymentMethodModal').modal('show')
  //   }
  // }
  // uncheckrp1() {
  //   this.isRp1Check = false;
  // }

  // checkrp1() {
  //   this.isRp1Check = true;
  // }
}
