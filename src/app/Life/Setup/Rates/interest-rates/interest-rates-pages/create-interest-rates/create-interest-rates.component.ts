import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service'; 
import { InterestRatesService } from '../../interest-rates-extras/interest-rates.service';
import { Interest, IRateVersion } from 'src/app/Shared/models/life/setup/rates/interest';
import { configForms } from 'src/app/Shared/models/form.class';


@Component({
  selector: 'app-create-interest-rates',
  templateUrl: './create-interest-rates.component.html',
  styleUrls: ['./create-interest-rates.component.scss'],
})
export class CreateInterestRateComponent implements OnInit {

  form = new FormGroup({
    dateFrom: configForms.default(),
    description: configForms.default(),
    interestGroup: configForms.default(),
    interestRateValuesList: new FormArray([]),
    table: configForms.default(),
    tableFormat: configForms.default(),
  });

  interest: Interest;

  interestRateGroup: any;
  tableFormat: any;
  dateFrom: any;
  rate: number;
  table: any;
  description: any;

  testList: any = [];
  intRateGroup: any;
  postGenList: any;
  errorMessage: any;
  code: any;
  postIntRate: any;
  tableFormatList: any = [];
  rateGroupList: any;
  tableDataList: any;
  tableData: any;
  nbofdate: number = 1;
  type: any;
  loading: boolean;
  frS: any;
  reportFormData: any;
  rS: any;
  rateCode: any;

  responseValue: any;
  isCreated = false;
  isShow = false;

  time: any;

  disable = {
    table: false,
    rate: false
  }

  constructor( 
    public iS: InterestRatesService,
    public uS: UtilityService,
    public activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {}

  async ngOnInit(): Promise<void> {
    this.code = this.activatedRoute.snapshot.params.code;

    this.setIntRateGroup();
    this.setTableFormat();
    this.SetTableData();
    this.getTableData();
    this.setRateGroup();
    this.getInterestRate();

    if (this.code) {
      this.interest = await this.iS.getInterestByCode(this.code);
      this.interest.interestRateValuesList.forEach((x) => (x.dateFrom = x.dateFrom?.split('T')[0]));
      this.form.patchValue(this.interest);
      this.interest.interestRateValuesList.forEach((rv) => this.addVersionRow(rv));
      if(this.interest.tableFormat === '2') {
        this.disable.rate = true;
      }
      this.form.disable();
      this.isShow = true;
    } else {
      this.addVersionRow();
    }
    
  }

  setIntRateGroup() {
    this.iS.getCodeList('INTRATE_GROUP').subscribe((res) => {
      this.intRateGroup = res;
      console.log('interest rate group', res);
    });
  }

  setTableFormat() {
    this.iS.getCodeList('TABLE_FORMAT').subscribe((res) => {
      this.tableFormatList = res;
      console.log('interest rate group', res);
    });
  }

  setRateGroup() {
    this.iS.getCodeList('RATE_GROUP').subscribe((res) => {
      this.rateGroupList = res;
      console.log('rate group', res);
    });
  }


  SetTableData() {
    this.iS.getTableFormat().subscribe((res) => {
      this.tableDataList = res;
      console.log('rate group', res);
    });
  }

  getTableData() {
    this.iS.getTable().subscribe((res) => {
      this.tableData = res;
      console.log('rate group', res);
    });
  }

  checkFormatCode() {
    if(this.form.value.tableFormat === '1') {
      this.disable.rate = false
      this.disable.table = true
    }else if(this.form.value.tableFormat === '2') {
      this.disable.rate = true
      this.disable.table = false
    }
  }

  getInterestRate() {
    this.iS.getInterestRate(this.rateCode).subscribe((data: any) => {
      console.log(`interest rate ${this.rateCode}` , data);
    })
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

    data.interestRateValuesList.forEach((x) => (x.dateFrom = x.dateFrom + 'T' + this.time));

    this.iS.submitIntRate(data).subscribe((res) => {
      this.postIntRate = res;
      this.responseValue = res.code
      this.code = this.postIntRate.code;
      this.isCreated = true;
      this.uS.info(`Interest Rate Code ${this.responseValue} created`, 1);
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
    return this.form.get('interestRateValuesList') as FormArray;
  }

  addVersionRow(v?: IRateVersion,index=this.versions?.length) {
    const form = this.fb.group({
      code: '',
      dateFrom:new FormControl(null, this.validateDateFrom.bind(this)),
      rate: new FormControl(null),
    });
    if (v) form.patchValue(v);
    this.versions.insert(index,form);
  }

  removeVersionRow(index: number) { 
    this.versions.removeAt(index); 
  }

}
