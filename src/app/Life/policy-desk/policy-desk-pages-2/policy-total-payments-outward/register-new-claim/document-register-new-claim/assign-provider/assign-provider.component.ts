import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Lbl, FCInput, Btn } from 'src/app/Shared/models/index.model'; 
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-assign-provider',
  templateUrl: './assign-provider.component.html',
  styleUrls: [
    './assign-provider.component.scss',
    '../../../../../policy-desk-comps/policy-desk-layout/policy-desk-layout.component.scss',
  ],
})
export class AssignProviderComponent implements OnInit {
  lbls: Lbl[] = [new Lbl('Claim No', '2434'), new Lbl('Cover Name', 'Death')];
  inputs: FCInput[] = [
    new FCInput('Provider Action Required', null, null, 'select'),
    new FCInput('Provider No', null, null, 'text'),
    new FCInput('', null, null, 'text'),
    new FCInput('Instruction to Provider (Optional)', null, null, 'textarea'),
  ];
  form = new FormGroup(
    this.pdS.formFieldsFromArr([...this.inputs, this.narration])
  );
  constructor(
    public pdS: UtilityService,
    public dialogRef: MatDialogRef<AssignProviderComponent>
  ) {}

  ngOnInit(): void {
    this.pdS.bindFormControlToInputs(this.inputs, this.form);
  }
  get estimate() {
    return this.inputs[this.inputs.length - 2];
  }
  get narration() {
    return this.inputs[this.inputs.length - 1];
  }
  find() {}
  close() {
    this.dialogRef.close();
  }
  save() {
    // console.log(this.form.value);
    this.dialogRef.close();
  }
}
