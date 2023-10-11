import { Component, OnInit } from '@angular/core';
import { BonusRatesService } from '../../bonus-rates-extras/bonus-rates.service'
import { Bonus, IRateVersion } from 'src/app/Shared/models/life/setup/rates/bonus';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-create-bonus-rates',
  templateUrl: './create-bonus-rates.component.html',
  styleUrls: ['./create-bonus-rates.component.scss']
})
export class CreateBonusRateComponent implements OnInit {

  form = new FormGroup({
    bonusCalcBasis: configForms.default(),
    bonusRateGroup: configForms.default(),
    bonusRateValuesList: new FormArray([]),
    code: configForms.default(),
    description: configForms.default(),
    table: configForms.default(),
  });

  bonus: Bonus;

  code: any;

  responseValue: any

  isCreated = false;
  isShow = false;

  bonuses: any = [];
  bonusRates: any = [];
  bonusCalcBasis: any = [];
  bonusTables: any = [];

  tableDataList: any;
  tableFormat: any;

  time: any;

  disable = {
    table: false,
    rate: false
  }

  constructor(
    private bonusRatesService: BonusRatesService,
    private uS: UtilityService,
    public activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  async ngOnInit(): Promise<void> {
    this.getBonusRates();
    this.getBonusCalsBasis();
    this.getBonusTable();
    this.SetTableData();
    this.code = this.activatedRoute.snapshot.params.code;
    if (this.code) {
      this.bonus = await this.bonusRatesService.getBonusByCode(this.code);
      this.bonus.bonusRateValuesList.forEach((x) => (x.dateFrom = x.dateFrom?.split('T')[0]));
      this.bonus.bonusRateValuesList.forEach((x) => (x.dateTo = x.dateTo?.split('T')[0]));
      this.form.patchValue(this.bonus);
      this.bonus.bonusRateValuesList.forEach((rv) => this.addVersionRow(rv));
      this.form.disable();
      if(this.bonus.bonusRateValuesList[0].maxRate !== null) {
        this.disable.rate = true;
      }else{this.disable.table = true;}
      this.isShow = true;
    } else {
      this.addVersionRow();
    }
  }

  getBonusRates() {
    this.bonusRatesService.getRateListGroups().subscribe((data: any)=>{
      this.bonusRates = data;
      console.log('bonus rates', data);
    });
  }

  getBonusCalsBasis() {
    this.bonusRatesService.getBonusCalsBasis().subscribe((data: any)=>{
      this.bonusCalcBasis = data;
      console.log('bonus calc basis', data);
    });
  }

  getBonusTable() {
    this.bonusRatesService.getBonusTable().subscribe((data: any)=>{
      this.bonusTables = data;
      console.log('bonus table', data);
    });
  }

  SetTableData() {
    this.bonusRatesService.getTableFormat().subscribe((res) => {
      this.tableDataList = res;
      console.log('rate group', res);
    });
  }

  checkFormatCode(value) {
    this.tableFormat = value
    if(value === '1') {
      this.disable.rate = false
      this.disable.table = true
    }else if(value === '2') {
      this.disable.rate = true
      this.disable.table = false
    }
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

  currentTime() {
    let d = new Date(),
        h = (d.getHours()<10?'0':'') + d.getHours(),
        m = (d.getMinutes()<10?'0':'') + d.getMinutes(),
        s = (d.getSeconds()<10?'0':'') + d.getSeconds();
    this.time  = h + ':' + m + ':' + s
  }

  submit() {
    this.currentTime();

    const data = this.form.value;
    console.log('tableFormat', this.tableFormat);

    if(this.tableFormat === '1') {
      data.bonusRateValuesList.forEach((x) => (x.dateFrom = null));
      data.bonusRateValuesList.forEach((x) => (x.dateTo = null));
      console.log('data 1', data);
    }else{
      data.bonusRateValuesList.forEach((x) => (x.dateFrom = x.dateFrom + 'T' + this.time));
      data.bonusRateValuesList.forEach((x) => (x.dateTo = x.dateTo + 'T' + this.time));
      console.log('data 2', data);
    }
    this.bonusRatesService.submitRate(data).subscribe((data: any)=>{
      console.log(data);
      this.code = data.code
      this.uS.info(`Bonus Rate Code ${this.code} created`, 1);
      this.isCreated = true;
    },
    (error)=>{
      this.uS.info(`Something went wrong!!!`, 0);
    });
  }

  createNew() {
    this.isCreated = false;
    this.code = '';
    this.form.reset();
  }

  checker(value) {
    if(value === 1) {
      
    }
  }

  get versions(): FormArray {
    return this.form.get('bonusRateValuesList') as FormArray;
  }

  addVersionRow(v?: IRateVersion,index=this.versions?.length) {
    const form = this.fb.group({
      dateFrom:new FormControl(null, this.validateDateFrom.bind(this)),
      dateTo: new FormControl(null, this.validateDateTo.bind(this)),
      fixedRate: new FormControl(null),
      maxRate: new FormControl(null),
      code: new FormControl(null),
    });
    if (v) form.patchValue(v);
    this.versions.insert(index,form);
  }

  removeVersionRow(index: number) { 
    this.versions.removeAt(index); 
  }

}