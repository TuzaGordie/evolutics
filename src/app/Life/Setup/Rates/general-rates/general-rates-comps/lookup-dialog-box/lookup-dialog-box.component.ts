import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { configForms } from 'src/app/Shared/models/form.class';
import { ICodeTitle } from 'src/app/Shared/models/index.model';
import { Validator } from 'src/app/Shared/pipes/inputs-pipes.pipe';
import { ILookupParams } from '../../general-rates-extras/general-rates.model';

@Component({
  selector: 'app-lookup-dialog-box',
  templateUrl: './lookup-dialog-box.component.html',
  styleUrls: ['./lookup-dialog-box.component.scss'],
})
export class LookupDialogBoxComponent implements OnInit {
  form = new FormGroup({
    bandParameter: new FormControl(null,this.validateField.bind(this)),
    lookupValue: new FormControl(null,[Validators.required,this.validateField.bind(this)]),
  });
  lookUpFieldlist: ICodeTitle[];
  lookUpFieldlist2: ICodeTitle[];
  errorMsg: string;
  constructor(
    public dialogRef: MatDialogRef<LookupDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { lookUpFieldlist: ICodeTitle[]; value: ILookupParams }
  ) {}

  ngOnInit(): void {
    this.lookUpFieldlist = this.lookUpFieldlist2 = this.data.lookUpFieldlist;
    // this.form.controls.lookupValue.valueChanges.subscribe((r) => {
    //   this.lookUpFieldlist2 = this.data.lookUpFieldlist.filter(
    //     (x) => x.code != r
    //   );
    // });
    // this.form.controls.bandParameter.valueChanges.subscribe((r) => {
    //   this.lookUpFieldlist = this.data.lookUpFieldlist.filter(
    //     (x) => x.code != r
    //   );
    // });
    if (this.data?.value) {
      this.form.patchValue(this.data?.value);
    }
  }
  validateField(control: FormControl ) {
    // console.log('control', control, control?.value);
    this.errorMsg = null
    const val = control?.value;
    if (!control?.dirty) return null;
    if (!val ) return null;  
    if (this.fields.filter((x) => x == val)?.length>1) {
      this.errorMsg = `"${val.title}" has already been chosen`;
      return { duplicate: true };
    }
    return null;
  }
  get fields(){return [this.form.controls.bandParameter.value,this.form.controls.lookupValue.value].filter(x=>x)}
  close() {
    this.dialogRef.close(this.data?.value);
  }
  save() {
    this.dialogRef.close(this.form.value );
  }
}
