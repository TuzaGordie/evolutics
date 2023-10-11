import { Component, OnInit } from '@angular/core';
import { DiscountRatesService } from '../../discount-rates-extras/discount-rates.service'
import { Discount, IRateVersion } from 'src/app/Shared/models/life/setup/rates/discount';
import { UtilityService } from 'src/app/Services/utility.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { configForms } from 'src/app/Shared/models/form.class';

@Component({
  selector: 'app-create-discount-rates',
  templateUrl: './create-discount-rates.component.html',
  styleUrls: ['./create-discount-rates.component.scss']
})
export class CreateDiscountRateComponent implements OnInit {

  discount: Discount;

  form = new FormGroup({
    dateFrom: configForms.default(),
    description: configForms.default(),
    discRateValuesList: new FormArray([]),
    discRateGroup: configForms.default(),
    probWin: configForms.default(),
    rate: configForms.default(),
    wheel: configForms.default(),
  });

  private nbofdate: number = 1;

  code: any;

  discountCode: any;
  responseValue: any;
  isCreated = false;
  isShow = false;
  
  discountGroups: any = [];

  time: any;

  constructor(
    private discountRateService: DiscountRatesService,
    private uS: UtilityService,
    public activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    ) { }

  async ngOnInit(): Promise<void> {
    this.setValues();
    this.getDiscountGroup();
    this.code = this.activatedRoute.snapshot.params.code;
    if (this.code) {
      this.discount = await this.discountRateService.getDiscountByCode(this.code);
      this.discount.discRateValuesList.forEach((x) => (x.dateFrom = x.dateFrom?.split('T')[0]));
      this.discount.discRateValuesList.forEach((x) => (x.dateTo = x.dateTo?.split('T')[0]));
      this.form.patchValue(this.discount);
      this.discount.discRateValuesList.forEach((rv) => this.addVersionRow(rv));
      this.form.disable();
      this.isShow = true;
    } else {
      this.addVersionRow();
    }
  }

  getDiscountGroup() {
    this.discountRateService.getRateListGroups().subscribe((data)=> {
      this.discountGroups = data;
      console.log('discount group', data)
    });
  }

  currentTime() {
    let d = new Date(),
        h = (d.getHours()<10?'0':'') + d.getHours(),
        m = (d.getMinutes()<10?'0':'') + d.getMinutes(),
        s = (d.getSeconds()<10?'0':'') + d.getSeconds();
    this.time  = h + ':' + m + ':' + s
  }

  submit() {
    this.checker();
    this.currentTime();

    const data = this.form.value;
    
    data.discRateValuesList.forEach((x) => (x.dateFrom = x.dateFrom + 'T' + this.time));
    data.discRateValuesList.forEach((x) => (x.dateTo = x.dateTo + 'T' + this.time));

    this.discountRateService.submitRate(data).subscribe((data) => {
      this.discountCode = data.code;
      this.uS.info(`Discount Rate Code ${this.discountCode} created`, 1);
      this.isCreated = true;
    },
    (error)=>{
      this.uS.info(`Something went wrong!!!`, 0);
    });
  }

  createNew() {
    this.isCreated = false;
    this.discountCode = '';
    this.form.reset();
  }

  checker() {
    if(this.form.value.wheel === true){
      this.form.value.wheel = 1;
    }else if(this.form.value.wheel === false){
      this.form.value.wheel = 0
    }

    if(this.form.value.auto === true){
      this.form.value.auto = 1;
    }else if(this.form.value.auto === false){
      this.form.value.auto = 0
    }
  }

  get versions(): FormArray {
    return this.form.get('discRateValuesList') as FormArray;
  }
  

  addVersionRow(v?: IRateVersion,index=this.versions?.length) {
    const form = this.fb.group({
      dateFrom:new FormControl(null, this.validateDateFrom.bind(this)),
      dateTo: new FormControl(null, this.validateDateTo.bind(this)),
      fixedRate: new FormControl(null),
      maxRate: new FormControl(null),
      promoCode:new FormControl(null),
      auto:new FormControl(null),
    });
    if (v) form.patchValue(v);
    this.versions.insert(index,form);
  }

  removeVersionRow(index: number) { 
    this.versions.removeAt(index); 
  }

  // VALIDATE dateFrom
  validateDateFrom(control: FormControl) {
    if (control?.pristine && control?.untouched) return null;
    const dateFrom: string = control.value;
    console.log(control);
    if (
      this.versions.controls.filter((x) => x.value.dateFrom == dateFrom)
        ?.length
    ) {
      this.uS.notify(`From date "${dateFrom}" should only exist once`, 0);
      return { duplicate: true };
    }
    return null;
  }

    // VALIDATE dateTo
  validateDateTo(control: FormControl) {
    if (control?.pristine && control?.untouched) return null;
    const dateTo: string = control.value;
    console.log(control);
    if (
      this.versions.controls.filter((x) => x.value.dateTo == dateTo)
        ?.length
    ) {
      this.uS.notify(`From date "${dateTo}" should only exist once`, 0);
      return { duplicate: true };
    }
    return null;
  }

  // VALIDATE fixedRate
  validateFixedRate(control: FormControl) {
    if (control?.pristine && control?.untouched) return null;
    const fixedRate: number = control.value;
    // console.log(control);
    if (
      this.versions.controls.filter((x) => x.value.fixedRate == fixedRate)
        ?.length
    ) {
      this.uS.notify(`Fix Rate "${fixedRate}" should only exist once`, 0);
      return { duplicate: true };
    }
    try {
      if (+fixedRate < 1) {
        this.uS.notify(`Fix Rate should not be less than 1`, 0);
        return { pattern: true };
      }
    } catch (error) {
      this.uS.notify(`Fix Rate is not valid`, 0);
      return { pattern: true };
    }
    return null;
  }

  // VALIDATE maxRate
  validateMaxRate(control: FormControl) {
    if (control?.pristine && control?.untouched) return null;
    const maxRate: number = control.value;
    // console.log(control);
    if (
      this.versions.controls.filter((x) => x.value.maxRate == maxRate)
        ?.length
    ) {
      this.uS.notify(`Value "${maxRate}" should only exist once`, 0);
      return { duplicate: true };
    }
    try {
      if (+maxRate < 1) {
        this.uS.notify(`Max Rate should not be less than 1`, 0);
        return { pattern: true };
      }
    } catch (error) {
      this.uS.notify(`Max Rate is not valid`, 0);
      return { pattern: true };
    }
    return null;
  }

  // VALIDATE promoCode
  validatePromoCode(control: FormControl) {
    if (control?.pristine && control?.untouched) return null;
    const promoCode: number = control.value;
    // console.log(control);
    if (
      this.versions.controls.filter((x) => x.value.promoCode == promoCode)
        ?.length
    ) {
      this.uS.notify(`Promo Code "${promoCode}" should only exist once`, 0);
      return { duplicate: true };
    }
    try {
      if (+promoCode < 1) {
        this.uS.notify(`Max Rate should not be less than 1`, 0);
        return { pattern: true };
      }
    } catch (error) {
      this.uS.notify(`Max Rate is not valid`, 0);
      return { pattern: true };
    }
    return null;
  }

  setValues() {
    this.form.value.wheel = false;
    this.form.value.auto = false;
  }

  dateCounter() {
    return new Array(this.nbofdate);
  }

  dateInc(){
    this.nbofdate = this.nbofdate + 1
  }}