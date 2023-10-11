import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UtilityService } from 'src/app/Services/utility.service';
import { FCInput, IKVP, KVP } from '../../../../../Shared/models/index.model'; 

@Component({
  selector: 'app-policy-loan',
  templateUrl: './policy-loan.component.html',
  styleUrls: [
    './policy-loan.component.scss',
    '../../../policy-desk-comps/policy-desk-layout/policy-desk-layout.component.scss',
  ],
})
export class PolicyLoanComponent implements OnInit {
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
    public pdS: UtilityService,
    public dialogRef: MatDialogRef<PolicyLoanComponent>
  ) {}

  ngOnInit(): void {
    this.pdS.bindFormControlToInputs(this.inputs, this.form);
  }

  close() {
    this.dialogRef.close();
  }
  save() {
    this.dialogRef.close(true);
  }
}
