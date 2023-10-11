import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from '../../../../../../Shared/models/form.class';
import { CInput, FCInput } from '../../../../../../Shared/models/index.model';
import * as _ from 'lodash-es';
import {
  IRateValue,
  IRateValues,
} from 'src/app/Life/Setup/Rates/general-rates/general-rates-extras/general-rates.model';
import { environment } from 'src/environments/environment';
import { InputMatrix } from './input-matrix.model';

@Component({
  selector: 'app-input-matrix',
  templateUrl: './input-matrix.component.html',
  styleUrls: ['./input-matrix.component.scss'],
})
export class InputMatrixComponent implements OnInit {
  @Input() model: CInput = new CInput('');
  @Input() showBoxes = true;
  @Input() isFiltered = false;
  @Input() lockColumnGen :boolean;
  @Input() lockRowGen :boolean;
  @Input() isCreationMode: boolean;
  @Input() customInput = false;
  isShow: boolean;
  canEditAxis: boolean = true;
  canEditCells: boolean = true;
  @Input('isShow') set _isShow(v: boolean) {
    this.isShow = v;
    this.showBoxes = !v;
    if (v) {
      this.lockAxis();
      this.lockCells();
    } else {
      this.unlockAxis();
      this.unlockCells();
    }
  }
  @Input() xAxisLabel: string;
  @Input() yAxisLabel: string;
  @Input() fileName: string;
  @Input() set numOfRows(v: number) {
    this.form.patchValue({ numOfRows: v });
  }
  @Input() set numOfCols(v: number) {
    this.form.patchValue({ numOfCols: v });
  }
  @Input() set data(v: string[][]) {
    this.matrix = new InputMatrix();
    this.matrix.loadData(v);
  }
  @Output() submitData = new EventEmitter<any[][]>();
  inputs: FCInput[] = [
    new FCInput(
      'Number of Columns',
      'numOfCols',
      configForms.number(),
      'number',
      true
    ),
    new FCInput(
      'Number of Rows',
      'numOfRows',
      configForms.number(),
      'number',
      true
    ),
  ];
  @Output() extractForGenRates = new EventEmitter<IRateValue[]>();
  @Output() showCustomInputForm = new EventEmitter<{
    val: any;
    col: number;
    row: number;
  }>();
  form: FormGroup;
  matrix: InputMatrix;
  loading: boolean;
  constructor(public uS: UtilityService) {
    this.form = new FormGroup(this.uS.formFieldsFromArr(this.inputs)); 
    this.uS.bindFormControlToInputs(this.inputs, this.form);
  }

  ngOnInit(): void {
    this.gen();
  }
  reset() {
    this.matrix.clear();
  }
  submit() {
    // debugger
    if (!this.matrix?.hasError) {
      this.submitData.emit(this.matrix.data);
      this.extractForGenRates.emit(this.formatForGenRates());
    }
  }
  trackByID(index: number, item: any) {
    return item?.id;
  }
  private formatForGenRates() {
    console.log(this.matrix.data);
    const ret: IRateValue[] = [],
      data = this.matrix.data;
    for (let r = 1; r < data.length; r++) {
      for (let c = 1; c < data[r].length; c++) {
        const val: IRateValue = {
          colValue: data[0][c]||'N',
          rowValue: data[r][0],
          value: data[r][c],
        };
        ret.push(val);
      }
    }
    return ret;
  }

  validateCell(cell: CInput, index: number) {
    // console.log(cell);
    cell.hasError = false;
    cell.value = cell?.value?.trim() || '';
    if (!cell?.value?.trim()) {
      cell.hasError = true;
      this.uS.notify(`Cell (${cell?.x},${cell?.y}) should have a value.`, 0);
      return;
    }
  }
  validateColumnHeader(cell: CInput, index: number) {
    // console.log(cell);
    cell.value = cell?.value?.trim() || '';
    cell.hasError = false;
    if (!cell?.value) {
      cell.hasError = true;
      this.uS.notify(
        `Column header at cell ${index + 1} should have a value.`,
        0
      );
      return;
    }
    if (
      this.matrix.data[0].filter(
        (x) => x && x.toUpperCase() == cell.value.toUpperCase()
      ).length > 1
    ) {
      this.uS.notify(
        `Column header ${cell.value} at cell (${cell?.x},${cell?.y}) should only exist once.`,
        0
      );
      cell.hasError = true;
    }
  }
  validateRowHeader(cell: CInput, index: number) {
    // console.log(cell, index);
    cell.value = cell?.value?.trim() || '';
    cell.hasError = false;
    if (!cell?.value) {
      cell.hasError = true;
      this.uS.notify(`Row header at cell ${index + 1} should have a value.`, 0);
      return;
    }
    if (
      this.matrix.data
        .map((x) => x[0])
        .filter((x) => x && x.toUpperCase() == cell.value.toUpperCase())
        .length > 1
    ) {
      this.uS.notify(
        `Row header ${cell.value} at cell (${cell?.x},${cell?.y}) should only exist once.`,
        0
      );
      cell.hasError = true;
    }
  }
  async parseIncomingRateValues(rateValues: IRateValue[]) {
    // console.log('RATE VALUES FOR PARSING', rateValues);
    this.loading = true;
    return new Promise<boolean>((resolve) => {
      const data: (string )[][] = [[null]];
      for (const cell of rateValues) {
        const row = data.find((x) => x[0] == cell.rowValue);
        const col = data[0].find((x) => x == cell.colValue);
        if (!row) data.push([cell.rowValue]);
        if (!col) data[0].push(cell.colValue);
        const rowInd = data.findIndex((x) => x[0] == cell.rowValue);
        const colInd = data[0].findIndex((x) => x == cell.colValue);
        data[rowInd][colInd] = cell.value;
      }
      this.matrix.loadData(data);
      this.lockAxis();
      this.lockCells();
      this.loading = false;
      resolve(true);
    });
  }
  async gen() {
    this.loading = true;
    if (this.matrix?.hasData) {
      this.matrix.regen({
        numOfRows: +this.form.value.numOfRows + 1,
        numOfCols: +this.form.value.numOfCols + 1,
      });
    } else {
      this.matrix = new InputMatrix(
        +this.form.value.numOfRows + 1,
        +this.form.value.numOfCols + 1,
        this.model
      );
    }
    console.log(this.matrix);
    if (this.matrix?.hasData) this.uS.notify(`Generated`, 1);
    this.loading = false;
  }
  checkInputType(val: any, col: number, row: number) {
    if (!this.canEditCells) return;
    if (!this.customInput) return;
    this.showCustomInputForm.emit({ val, col, row });
  }
  setValue(val, col: number, row: number) {
    console.log(val, col, row);
    this.matrix.inputBoxes[row][col].value = val;
  }
  export() {
    const data = this.matrix.inputBoxes.map((x) =>
      x.map((y) => y.value || null)
    );
    console.log(data);
    const csvArray = data.map((row) => row.join(',')).join('\r\n');

    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = this.fileName + '.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
  downloadTemplate() {
    const data: string[][] = [
      [null, 'colheader 1', 'colheader 2', 'colheader 3'],
      ['rowheader 1', 'val', 'val', 'val'],
      ['rowheader 2', 'val', 'val', 'val'],
      ['rowheader 3', 'val', 'val', 'val'],
    ];
    console.log(data);
    const csvArray = data.map((row) => row.join(',')).join('\r\n');
    // console.log(csvArray);

    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = 'general_rate_values_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
  async import() {
    const inp = document.createElement('input');
    inp.type = 'file';
    inp.click();
    inp.onchange = async (e: any) => {
      this.loading = true;
      const files: FileList = e.target.files;
      if (files?.length) {
        let file = files.item(0);
        if (!file?.name?.endsWith('.csv')) {
          this.uS.notify(`The imported file should be in CSV format`, 0);
          this.loading = false;
          return;
        }
        let reader: FileReader = new FileReader();
        reader.readAsText(file);
        reader.onload = async (e) => {
          let csv: string = reader.result as string;
          // console.log(csv);
          const data: (string )[][] = csv
            .split('\r\n')
            .map((row) => row.split(','));
          // console.log(data);
          this.matrix.loadData(data).then((r) => (this.loading = false));
        };
      }
    };
  }
  //#region EDIT AXIS
  editAxis() {
    if (this.canEditAxis) {
      this.lockAxis();
    } else {
      this.unlockAxis();
    }
  }
  private unlockAxis() {
    this.showBoxes = true;
    this.canEditAxis = true;
  }
  private lockAxis() {
    this.showBoxes = false;
    this.canEditAxis = false;
  }
  //#endregion
  //#region EDIT CELLS
  editCells() {
    if (this.canEditCells) {
      this.lockCells();
    } else {
      this.unlockCells();
    }
  }
  private lockCells() {
    this.canEditCells = false;
  }
  private unlockCells() {
    this.canEditCells = true;
  }
  //#endregion
}
