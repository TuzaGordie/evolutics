import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UtilityService } from 'src/app/Services/utility.service';
import { FCInput } from '../../../../../Shared/models/index.model';
import { PDService } from '../../../policy-desk-extras/policy-desk.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: [
    './add-document.component.scss',
    '../../../policy-desk-comps/policy-desk-layout/policy-desk-layout.component.scss',
  ],
})
export class AddDocumentComponent implements OnInit {
  inputs: FCInput[] = [
    new FCInput('File', null, null, 'file'),
    new FCInput('Title'),
    new FCInput('Category', null, null, 'select'),
    new FCInput('Sensitivity', null, null, 'select'),
    new FCInput('Branch'),
    new FCInput('Box No'),
  ];
  form = new FormGroup(this.pdS.formFieldsFromArr(this.inputs));
  constructor(
    public pdS: UtilityService,
    public dialogRef: MatDialogRef<AddDocumentComponent>
  ) {}

  ngOnInit(): void {
    this.pdS.bindFormControlToInputs(this.inputs, this.form);
  }
  close() {
    this.dialogRef.close();
  }
  save() {
    this.close();
  }
}
