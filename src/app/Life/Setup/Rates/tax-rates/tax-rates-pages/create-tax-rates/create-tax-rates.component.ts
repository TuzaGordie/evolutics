import { Component, OnInit } from '@angular/core';
import { Tax, IRateVersion } from 'src/app/Shared/models/life/setup/rates/tax';
import { TaxRatesService } from '../../tax-rates-extras/tax-rates.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { configForms } from 'src/app/Shared/models/form.class';


@Component({
  selector: 'app-create-tax-rates',
  templateUrl: './create-tax-rates.component.html',
  styleUrls: ['./create-tax-rates.component.scss'],
})
export class CreateTaxRateComponent implements OnInit {
  
  tax: Tax;

  form = new FormGroup({
    dateFrom: configForms.default(),
    description: configForms.default(),
    rate: configForms.default(),
    rateTable: configForms.default(),
    rateValuesList: new FormArray([]),
    table: configForms.default(),
    taxGroup: configForms.default(),
  });

  code: any;
  isCreated = false;
  isShow = false;

  taxGroups: any =[];
  tables: any =[];

  time: any;

  private nbofdate: number = 1;

  constructor(
    private taxRatesService: TaxRatesService, 
    private uS: UtilityService,
    public activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {}

  async ngOnInit(): Promise<void> {
    this.getTaxGroups();
    this.getTableData();
     this.code = this.activatedRoute.snapshot.params.code;
    if (this.code) {
      this.tax = await this.taxRatesService.getTaxByCode(this.code);
      this.tax.rateValuesList.forEach((x) => (x.dateFrom = x.dateFrom?.split('T')[0]));
      this.form.patchValue(this.tax);
      this.tax.rateValuesList.forEach((rv) => this.addVersionRow(rv));
      this.form.disable();
      this.isShow = true;
    } else {
      this.addVersionRow();
    }
  }

  getTaxGroups() {
    this.taxRatesService.getRateListGroups().subscribe((data: any) => {
      this.taxGroups = data;
      console.log('tax groups', data);
    });
  }

  getTableData() {
    this.taxRatesService.getTable().subscribe((res) => {
      this.tables = res;
      console.log('table', res);
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
    this.currentTime();

    const data = this.form.value;

    data.rateValuesList.forEach((x) => (x.dateFrom = x.dateFrom + 'T' + this.time));

    this.taxRatesService.submitRate(data).subscribe((data: any)=>{
      this.code = data.code;
      console.log(data);
      this.uS.info(`Tax Rate Code ${this.code} created`, 1);
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

  get versions(): FormArray {
    return this.form.get('rateValuesList') as FormArray;
  }
  

  addVersionRow(v?: IRateVersion,index=this.versions?.length) {
    const form = this.fb.group({
      dateFrom:new FormControl(null, this.validateDateFrom.bind(this)),
      rate: new FormControl(null),
      code:new FormControl(null),
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

  // VALIDATE rate
  validateRate(control: FormControl) {
    if (control?.pristine && control?.untouched) return null;
    const rate: number = control.value;
    // console.log(control);
    if (
      this.versions.controls.filter((x) => x.value.rate == rate)
        ?.length
    ) {
      this.uS.notify(`Rate "${rate}" should only exist once`, 0);
      return { duplicate: true };
    }
    try {
      if (+rate < 1) {
        this.uS.notify(`Rate should not be less than 1`, 0);
        return { pattern: true };
      }
    } catch (error) {
      this.uS.notify(`Rate is not valid`, 0);
      return { pattern: true };
    }
    return null;
  }

  dateCounter() {
    return new Array(this.nbofdate);
  }

  dateInc() {
    this.nbofdate = this.nbofdate + 1;
  }
}
