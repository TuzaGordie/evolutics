import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FCInput,
  IKVP,
  KVP,
  TableCol,
} from '../../../../../Shared/models/index.model';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-create-account-transaction',
  templateUrl: './create-account-transaction.component.html',
  styleUrls: [
    './create-account-transaction.component.scss',
    '../../../policy-desk-comps/policy-desk-layout/policy-desk-layout.component.scss',
  ],
})
export class CreateAccountTransactionComponent implements OnInit {
  lbls: IKVP[] = [
    new KVP('Policy No:', 'LHG867998'),
    new KVP('Owner:'),
    new KVP('Initial Estimate:'),
    new KVP('Adjustments:'),
    new KVP('Final Amount:'),
    new KVP('Payment Type:'),
    new KVP('Cover Name:'),
  ];
  dCols: TableCol[] = [
    new TableCol('Account Code'),
    new TableCol('Ledger'),
    new TableCol('Amount'),
  ];
  inputs: FCInput[] = [
    new FCInput('Trans Type', null, null, 'select'),
    new FCInput('Effective Date'),
    new FCInput('Rows', 'rows'),
    new FCInput('Reason Code', null, null, 'select'),
    new FCInput('Narration', 'narration', null, 'textarea'),
  ];

  form = new FormGroup(this.pdS.formFieldsFromArr(this.inputs));
  rows: { inputs: FCInput[]; form: FormGroup }[] = [];

  polNum = 'BRC3232323e';
  constructor(
    public pdS: UtilityService,
    public dialogRef: MatDialogRef<CreateAccountTransactionComponent>
  ) {}

  ngOnInit(): void {
    this.pdS.bindFormControlToInputs(this.inputs, this.form);
    this.addRow();
  }

  close() {
    this.dialogRef.close();
  }
  save() {
    console.log(this.form);
    this.close();
  }
  addRow() {
    const rowInputs: FCInput[] = [
      new FCInput('Account Code'),
      new FCInput('Ledger'),
      new FCInput('Amount'),
    ];
    const row = {
      form: new FormGroup(this.pdS.formFieldsFromArr(rowInputs)),
      inputs: rowInputs,
    };
    this.pdS.bindFormControlToInputs(row.inputs, row.form);
    console.log(row);
    row.inputs[2].formControl.setValue('NGN');
    this.rows.push(row);
  }
}
