import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { EPageType } from 'src/app/Shared/models/index.model';
import {
  IShortTermRate,
  IShortTermRateValue,
} from '../../short-term-rates-extras/short-term-rates.interface';
import { ShortTermRatesService } from '../../short-term-rates-extras/short-term-rates.service';

@Component({
  selector: 'app-create-short-term-rates',
  templateUrl: './create-short-term-rates.component.html',
  styleUrls: ['./create-short-term-rates.component.scss'],
})
export class CreateShortTermRatesComponent implements OnInit {
  form = this.fb.group({
    code: configForms.default(),
    description: configForms.required(),
    shortTermRateValuesList: this.fb.array([]),
  });

  rate: IShortTermRate;
  type: EPageType;
  code: string;
  loading: boolean;

  constructor(
    public strS: ShortTermRatesService,
    public uS: UtilityService,
    private fb: FormBuilder,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.code = this.route.snapshot.params.id;
    this.type = this.route.snapshot.data.type;
    if (this.code) {
      this.loading = true;
      this.strS.getRate(this.code).subscribe((r) => {
        console.log('Short Term Rate', r);
        if (r) {
          this.rate = r;
          this.form.patchValue(r);
          r.shortTermRateValuesList.forEach((x) => {
            this.addShortTermRateValuesListRow(x);
          });
          if (this.type == EPageType.showPage) {
            this.form.disable();
          } else if (this.type == EPageType.clonePage) {
            delete r.code;
          }
          this.loading = false;
        } else {
          this.uS.go('../', { relativeTo: this.route });
        }
      });
    } else {
      this.initializeRows();
    }
    this.form.controls.code.disable();
  }
  get isShow() {
    return this.type == EPageType.showPage;
  }
  initializeRows() {
    this.addShortTermRateValuesListRow();
  }

  get shortTermRateValuesList(): FormArray {
    return this.form.get('shortTermRateValuesList') as FormArray;
  }

  addShortTermRateValuesListRow(
    val?: IShortTermRateValue,
    index: number = this.shortTermRateValuesList?.length
  ) {
    const form = this.fb.group({
      days: configForms.number(),
      factor: configForms.number(),
    });
    if (val) {
      form.patchValue(val);
    }
    this.shortTermRateValuesList.insert(index, form);
  }
  removeShortTermRateValuesListRow(index: number) {
    this.shortTermRateValuesList.removeAt(index);
  }

  export(rate: IShortTermRate = this.rate || this.form.value) {
    const csvArray =
      `days,factor\r\n` +
      rate.shortTermRateValuesList
        .map((x) => x.days + ',' + x.factor)
        .join('\r\n');
    console.log(csvArray);

    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = 'Short Term Rate ' + rate.code + '.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
  downloadTemplate() {
    const rate: any = {
      code: 'template',
      shortTermRateValuesList: [{ days: 1, factor: 0.1 }],
    };
    this.export(rate);
  }

  async import() {
    const inp = document.createElement('input');
    inp.type = 'file';
    inp.click();
    inp.onchange = (e: any) => {
      const files: FileList = e.target.files;
      if (files?.length) {
        let file = files.item(0);
        let reader: FileReader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e) => {
          let csv: string = reader.result as string;
          // console.log(csv);
          const data = csv.split('\r\n').map((row) => ({
            days: row.split(',')[0],
            factor: row.split(',')[1],
          }));
          data.shift();
          console.log(data);
          this.shortTermRateValuesList.clear();
          data.forEach((x: any) => this.addShortTermRateValuesListRow(x));
        };
      }
    };
  }

  async submit() {
    this.loading = true;
    const values = this.form.value as IShortTermRate;
    this.formatReportInputs(values);
    console.log('Short term rates submission', values);
    try {
      this.rate = await (this.rate?.code
        ? this.strS.submitRate(values)
        : this.strS.submitRate(values));
      console.log('post submission', this.rate);
      this.loading = false;
      await this.uS.info(
        `Short Term Rate ${this.rate.code} was successfully created`,
        1
      );
      this.open();
    } catch (e) {
      this.uS.info(e, 0);
      console.log(e);
      this.loading = false;
    }
  }
  open() {
    this.uS.go(
      (this.type == EPageType.createPage ? '' : '../') +
        '../show/' +
        this.rate?.code,
      {
        relativeTo: this.route,
      }
    );
  }
  private formatReportInputs(val: IShortTermRate) {
    val.shortTermRateValuesList = val.shortTermRateValuesList.filter(
      (x) => x.days || x.factor
    );
    val.shortTermRateValuesList.forEach((x) => {
      x.days = +x.days;
      x.factor = +x.factor;
    });
  }
}
