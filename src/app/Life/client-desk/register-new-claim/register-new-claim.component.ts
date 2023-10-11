import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FCInput, IKVP, KVP } from '../../../Shared/models/index.model';
import { PDService } from 'src/app/Life/policy-desk/policy-desk-extras/policy-desk.service';

@Component({
  selector: 'app-client-register-new-claim',
  templateUrl: './register-new-claim.component.html',
  styleUrls: [
    './register-new-claim.component.scss',
  ],
})
export class ClientRegisterNewClaimComponent implements OnInit {
  tabs: IKVP[] = [
    { key: 'Basic', value: 'bc' },
    { key: 'Document', value: 'doc' },
    { key: 'Estimate', value: 'est' },
  ];
  sTab: IKVP;
  inputs: FCInput[] = [
    new FCInput('Loan Amount'),
    new FCInput('Loan Tenor'),
    new FCInput('Repayment Basis', null, null, 'select'),
    new FCInput('Effective Date'),
    new FCInput('Narration', null, null, 'textarea'),
  ];
  form = new FormGroup(this.pdS.formFieldsFromArr(this.inputs));
  lbls: IKVP[] = [
    new KVP('Policy No:', 'LHG867998'),
    new KVP('Status:', 'Active'),
    new KVP('Currency:', 'NGN'),
  ];
  constructor(
    public pdS: PDService,
    // public dialogRef: MatDialogRef<ClientRegisterNewClaimComponent>
  ) {}

  ngOnInit(): void {
    this.open();
    this.pdS.bindFormControlToInputs(this.inputs, this.form);
  }

  close() {
    // this.dialogRef.close();
  }
  save() {
    this.close();
  }
  open(tab?: IKVP) {
    this.sTab = tab || this.tabs[0];
  }
}
