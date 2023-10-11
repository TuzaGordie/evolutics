import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UtilityService } from 'src/app/Services/utility.service';
import { FCInput, IKVP, KVP } from '../../../../../Shared/models/index.model';

@Component({
  selector: 'app-add-credit-note',
  templateUrl: './add-credit-note.component.html',
  styleUrls: [
    './add-credit-note.component.scss',
    '../../../policy-desk-comps/policy-desk-layout/policy-desk-layout.component.scss',
  ],
})
export class AddCreditNoteComponent implements OnInit {
  inputs: FCInput[] = [
    new FCInput('Effective Date'),
    new FCInput('Proforma No', null, null, 'select'),
    new FCInput('Amount Billed', null, null,'text' ),
    new FCInput('Amount On Credit Note'),
    new FCInput('Reference'),
    new FCInput('Credit Note', null, null, 'file'),
  ];
  narration = new FCInput('Narration', null, null, 'textarea');
  lbls1: IKVP[] = [
    new KVP('Agent Name', 'Bruce Willis'),
    new KVP('Currency'),
    new KVP('Balance b/f'),
    new KVP('Commisions Due'),
    new KVP('Pending Amount'),
  ];
  form = new FormGroup(
    this.pdS.formFieldsFromArr([...this.inputs, this.narration])
  );
  polNum = 'BRC21000067';
  constructor(
    public pdS: UtilityService,
    public dialogRef: MatDialogRef<AddCreditNoteComponent>
  ) {}

  ngOnInit(): void {
    this.pdS.bindFormControlToInputs(
      [...this.inputs, this.narration],
      this.form
    );
  }
  close() {
    this.dialogRef.close();
  }
  submit() {
    this.close();
  }
}
