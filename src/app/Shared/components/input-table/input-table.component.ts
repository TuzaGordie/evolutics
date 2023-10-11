import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { UtilityService } from 'src/app/Services/utility.service';
import { IInputTableScheme } from './input-table.model';

@Component({
  selector: 'app-input-table',
  templateUrl: './input-table.component.html',
  styleUrls: ['./input-table.component.scss'],
})
export class InputTableComponent implements OnInit {
  schemas: IInputTableScheme[] = [];
  @Input('schemas') set _schemas(value: IInputTableScheme[]) {
    this.schemas = value;
    this.initiateForm(value);
  }
  @Input() label: string;
  @Input() showSN = true;
  form: FormArray = new FormArray([]);
  constructor(public uS: UtilityService) {}

  ngOnInit(): void {
    // this.initiateForm()
  }
  initiateForm(_schemas = this.schemas) {
    if (!_schemas) return;

    for (let i = 0; i < 1; i++) {
      this.addRow(i, this.createRowForm(null, _schemas));
    }
    console.log('form', this.form);
  }
  sortData(sort: Sort) {
    const data = this.form.controls.slice();
    if (!sort?.active || sort.direction === '') {
      this.form = new FormArray(data);
      return;
    }

    this.form = new FormArray(
      data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        return compare(a.value[sort.active], b.value[sort.active], isAsc);
      })
    );
  }
  subFormTrackBy = (item: any, index) => {
    return item?.value?.id;
  };
  removeRow(index: number) {
    this.form.removeAt(index);
  }
  createRowForm(data?: any, _schemas = this.schemas) {
    // debugger;
    if (!_schemas?.length) return null;
    const controls: { [x: string]: AbstractControl } = {};
    for (const item of _schemas) {
      controls[item.t] = new FormControl(
        item.value,
        item.validators,
        item.asyncValidators
      );
    }
    const form = new FormGroup(controls);
    if (data) form.patchValue(data);
    return form;
  }
  addRow(
    index: number = this.form.controls.length,
    form = this.createRowForm()
  ) {
    if (!form) return null;
    this.form.insert(index, form);
  }
  parseUpload(file: File) {
    let reader: FileReader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      let csv: string = reader.result as string;
      const rows = csv.split('\r\n').map((row) => row.split(',').map(cell=>cell.trim()));
      const header = rows.shift();
      const data: { [x: string]: string }[] = [];
      for (const row of rows) {
        const obj: { [x: string]: string } = {};
        for (let cell = 0; cell < header.length; cell++) {
          obj[header[cell]] = row[cell];
        }
        data.push(obj);
      } 
      // debugger;
      console.log(data);
      this.form.clear();
      data.forEach((x: any) => this.addRow(null,this.createRowForm(x)));
    };
  }
  downloadCSV(value: any[] = this.form.value, label = this.label) {
    const csvArray =
      `${this.schemas.map((x) => x.t).join(',')}\r\n` +
      value
        .map((x) =>
          Object.keys(x)
            .map((y) => x[y])
            .join(',')
        )
        .join('\r\n');
    // console.log(csvArray);
    // debugger

    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = `${this.label} ${this.schemas?.length}x${value?.length}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
  downloadTemplate() {
    const value: any = {
      code: 'template',
      shortTermRateValuesList: [{ days: 1, factor: 0.1 }],
    };
    this.downloadCSV(value, 'template ' + this.label);
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
