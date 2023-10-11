import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UtilityService } from 'src/app/Services/utility.service';
import { FCInput } from '../../../../Shared/models/index.model';
import { FindQuotationService } from '../../service/find-quotation.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: [
    './add-document.component.scss',
  ],
})
export class AddQuotationDocumentComponent implements OnInit {
  inputs: FCInput[] = [
    new FCInput('File', null, null, 'file'),
    new FCInput('Title'),
    new FCInput('Category', null, null, 'select'),
    new FCInput('Sensitivity', null, null, 'select'),
    new FCInput('Branch'),
    new FCInput('Box No'),
  ];
  form = new FormGroup(this.fqs.formFieldsFromArr(this.inputs));
  constructor(
    public fqs: UtilityService,
    public dialogRef: MatDialogRef<AddQuotationDocumentComponent>
  ) {}

  ngOnInit(): void {
    this.fqs.bindFormControlToInputs(this.inputs, this.form);
  }
  close() {
    this.dialogRef.close();
  }
  save() {
    this.close();
  }
}
