import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FCInput } from '../../../../../Shared/models/index.model';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-create-new-annuity',
  templateUrl: './create-new-annuity.component.html',
  styleUrls: [
    './create-new-annuity.component.scss',
    '../../../policy-desk-comps/policy-desk-layout/policy-desk-layout.component.scss',
  ],
})
export class CreateNewAnnuityComponent implements OnInit {
  name = 'Mascar Magic';
  jName = 'Mascar Magic2';

  inputs: FCInput[] = [
    new FCInput('Cover'),
    new FCInput('Cover Status'),
    new FCInput('Active Annuity', null, null, 'checkbox'),
    new FCInput('Funded Basis', null, null, 'select'),
    new FCInput('Annuity Type', null, null, 'select'),
    new FCInput('Term Years'),
    new FCInput('Term Months'),
    new FCInput('Annuity Amount'),
    new FCInput('Annuity Frequency', null, null, 'select'),
    new FCInput('Escalation Rate'),
    new FCInput('Guarantee Period'),
    new FCInput('First Pay Date'),
    new FCInput('Final Pay Date'),
    new FCInput('Next Pay Date'),
    new FCInput('Annuity Pay Method', null, null, 'select'),
    new FCInput('Payee No'),
    new FCInput('Payee Name'),
    new FCInput('Payee Bank No'),
    new FCInput('Funding Policy No'),
    new FCInput('Funded Policy No'),
    new FCInput('Reversionary Option', null, null, 'checkbox'),
    new FCInput('Reversionary Rate'),
    new FCInput('2nd Payee No'),
    new FCInput('2nd Payee Name'),
    new FCInput('2nd Payee Payment Method'),
    new FCInput('2nd Payee Bank No'),
  ];
  form = new FormGroup(this.pdS.formFieldsFromArr(this.inputs));
  constructor(
    public pdS: UtilityService,
    public dialogRef: MatDialogRef<CreateNewAnnuityComponent>
  ) {}

  ngOnInit(): void {
    this.pdS.bindFormControlToInputs([...this.inputs], this.form);
  }
  close() {
    this.dialogRef.close();
  }
  save() {
    this.close();
  }
}
