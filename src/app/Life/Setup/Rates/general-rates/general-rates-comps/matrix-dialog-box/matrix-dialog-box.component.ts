import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { configForms } from 'src/app/Shared/models/form.class';
import { ICodeTitle } from 'src/app/Shared/models/index.model';
import { IMatrixParams } from '../../general-rates-extras/general-rates.model';

@Component({
  selector: 'app-matrix-dialog-box',
  templateUrl: './matrix-dialog-box.component.html',
  styleUrls: ['./matrix-dialog-box.component.scss'],
})
export class MatrixDialogBoxComponent implements OnInit {
  form = new FormGroup(
    {
      axisXValue: new FormControl(null, [Validators.required]),
      axisYValue: new FormControl(null, [Validators.required]),
    },
    this.validateField.bind(this)
  );
  lookUpFieldlist: ICodeTitle[];
  errorMsg: string;
  constructor(
    public dialogRef: MatDialogRef<MatrixDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { lookUpFieldlist: ICodeTitle[]; value: IMatrixParams }
  ) {}

  ngOnInit(): void {
    this.lookUpFieldlist = this.data.lookUpFieldlist;

    if (this.data?.value) {
      this.form.patchValue(this.data?.value);
    }
  }
  validateField(form: FormGroup) { 
    this.errorMsg = null;
    const { axisXValue, axisYValue } = form?.controls;
    if (axisYValue?.value && axisXValue?.value == axisYValue?.value) {
      this.errorMsg = `Please select distinct Rate Keys.`;
      return { duplicate: true };
    }
    return null;
  }
  get fields() {
    return [
      this.form.controls.axisXValue.value,
      this.form.controls.axisYValue.value,
    ].filter((x) => x);
  }

  close() {
    this.dialogRef.close( this.data?.value);
  }
  save() {
    this.dialogRef.close(this.form.value );
  }
}
