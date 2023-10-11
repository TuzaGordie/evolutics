import { Component, OnInit } from '@angular/core';
import { FindQuotationService } from '../service/find-quotation.service';
import { MatDialogRef } from '@angular/material/dialog';
import { configForms } from 'src/app/Shared/models/form.class';
import { FCInput } from 'src/app/Shared/models/index.model';
import { FormControl, FormGroup } from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.scss'],
})
export class ChangeStatusComponent implements OnInit {
  // cols: string[] = ['Normal Trigger', 'How Delivered', 'Document'];
  // docs: { trigger; delivery; doc }[] = [];

  inputs: FCInput[] = [
    new FCInput('Current Status', 'statusID', configForms.required()),
    new FCInput('New Status', 'newStatusID', configForms.required(), 'select'),
  ];
  // paginationFields = ['pageNumber'];
  changeStatusForm = new FormGroup(
    this.uS.formFieldsFromArr(this.inputs)
  );
  constructor(
    private uS: UtilityService,
    public dialogRef: MatDialogRef<ChangeStatusComponent>
  ) {}

  ngOnInit(): void {
    this.inputs.forEach((x) => {
      x.form = this.changeStatusForm;
      x.formControl = this.changeStatusForm.get[x.name];
    });
  }
  close() {
    this.dialogRef.close();
  }
  gen(item: any) {
    this.close();
  }

  change() {
    console.log('change');
  }
}
