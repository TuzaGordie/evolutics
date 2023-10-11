import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UtilityService } from 'src/app/Services/utility.service';
import {
  FCInput,
  IKVP,
  Lbl,
  TableCol,
  ILbl,
} from '../../../../../Shared/models/index.model';
 
@Component({
  selector: 'app-create-payment-outward',
  templateUrl: './create-payment-outward.component.html',
  styleUrls: [
    './create-payment-outward.component.scss',
    '../../../policy-desk-comps/policy-desk-layout/policy-desk-layout.component.scss',
  ],
})
export class CreatePaymentOutwardComponent implements OnInit {
  lbls: ILbl[] = [
    new Lbl('Policy No:', 'LHG867998'),
    new Lbl('Owner:'),
    new Lbl('Initial Estimate:'),
    new Lbl('Adjustments:'),
    new Lbl('Final Amount:'),
    new Lbl('Payment Type:'),
    new Lbl('Cover Name:'),
  ];
  dCols: TableCol[] = [
    new TableCol('Proportion (%)'),
    new TableCol('Amount'),
    new TableCol('Currency'),
    new TableCol('Claim Type'),
    new TableCol('Claim status'),
    new TableCol('Payee No'),
    new TableCol('Policy No'),
    new TableCol('Payee Name'),
    new TableCol('Bank No'),
    new TableCol('Payee Relationship'),
  ];
  inputs: FCInput[] = [
    new FCInput('Rows', 'rows'),
    new FCInput('Narration', 'narration', null, 'textarea'),
  ];

  form = new FormGroup(this.pdS.formFieldsFromArr(this.inputs));
  rows: { inputs: FCInput[]; form: FormGroup }[] = [];
  constructor(
    public pdS: UtilityService,
    public dialogRef: MatDialogRef<CreatePaymentOutwardComponent>
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
      new FCInput('Proportion (%)'),
      new FCInput('Amount'),
      new FCInput('Currency'),
      new FCInput('Claim Type', null, null, 'select'),
      new FCInput('Claim status'),
      new FCInput('Payee No'),
      new FCInput('Policy No'),
      new FCInput('Payee Name', null, null, 'select'),
      new FCInput('Bank No'),
      new FCInput('Payee Relationship'),
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
