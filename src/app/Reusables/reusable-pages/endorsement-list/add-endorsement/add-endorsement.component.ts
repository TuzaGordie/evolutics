import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog'; 
import { UtilityService } from 'src/app/Services/utility.service';
import { FCInput, IKVP, KVP } from 'src/app/Shared/models/index.model';

@Component({
  selector: 'app-add-endorsement',
  templateUrl: './add-endorsement.component.html',
  styleUrls: [
    './add-endorsement.component.scss'
  ],
})
export class AddEndorsementComponent implements OnInit {
  inputs1: FCInput[] = [
    new FCInput('Category', null, null, 'select'),
    new FCInput('Type', null, null, 'select'),
  ];
  inputs2: FCInput[] = [
    new FCInput('Field Name', null, null, 'select'),
    new FCInput('Current Value'),
    new FCInput('New Value'),
  ];
  inputs3: FCInput[] = [
    new FCInput('Current Premium'),
    new FCInput('New Premium'),
  ];
  pols: IKVP[] = [
    new KVP('Policy No:'),
    new KVP('Policy Code:'),
    new KVP('Policy No Suffix:'),
  ];
  form = new FormGroup(
    this.pdS.formFieldsFromArr([
      ...this.inputs1,
      ...this.inputs2,
      ...this.inputs3,
    ])
  );
  constructor(
    public pdS: UtilityService,
    public dialogRef: MatDialogRef<AddEndorsementComponent>
  ) {}

  ngOnInit(): void {
    this.pdS.bindFormControlToInputs(
      [...this.inputs1, ...this.inputs2, ...this.inputs3],
      this.form
    );
  }

  close() {
    this.dialogRef.close();
  }
  save() {
    this.close();
  }
}
