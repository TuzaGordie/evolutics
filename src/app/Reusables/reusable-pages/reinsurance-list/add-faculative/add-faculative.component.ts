import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UtilityService } from 'src/app/Services/utility.service';
import { FCInput, IKVP, KVP } from 'src/app/Shared/models/index.model';
 
@Component({
  selector: 'app-add-faculative',
  templateUrl: './add-faculative.component.html',
  styleUrls: [
    './add-faculative.component.scss',
   ],
})
export class AddFaculativeComponent implements OnInit {
  inputs: FCInput[] = [
    new FCInput('Effective Date'),
    new FCInput('Cover', null, null, 'select'),
    new FCInput('Reinsurer', null, null, 'select'),
    new FCInput('Reinsurance Type', null, null, 'select'),
    new FCInput('Reinsurance Premium Freq', null, null, 'select'),
    new FCInput('Reinsurance Premium Table', null, null, 'select'),
    new FCInput('Reinsurance Premium Rate'),
    new FCInput('Reinsurance Commission Rate'),
    new FCInput('Reinsurance Commission Table', null, null, 'select'),
    new FCInput('Currency', null, null, 'select'),
    new FCInput('Siding Scale Commission'),
    new FCInput('Amount to Cede'),
    new FCInput('Uncover SAR'),
  ];
  heads: IKVP[] = [new KVP('Uncovered SAR:')];
  form = new FormGroup(this.uS.formFieldsFromArr([...this.inputs]));
  constructor(
    public uS: UtilityService,
    public dialogRef: MatDialogRef<AddFaculativeComponent>
  ) {}

  ngOnInit(): void {
    this.uS.bindFormControlToInputs([...this.inputs], this.form);
  }

  close() {
    this.dialogRef.close();
  }
  save() {
    this.close();
  }
}
