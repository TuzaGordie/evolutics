import { Component, OnInit } from '@angular/core';
import { FindQuotationService } from '../service/find-quotation.service';
import { MatDialogRef } from '@angular/material/dialog';
import { configForms } from 'src/app/Shared/models/form.class';
import { FCInput } from 'src/app/Shared/models/index.model';
import { FormControl, FormGroup } from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-authorise-quote',
  templateUrl: './authorise-quote.component.html',
  styleUrls: ['./authorise-quote.component.scss'],
})
export class AuthoriseQuoteComponent implements OnInit {
  // new FCInput('New Status', 'newStatusID', configForms.required(), 'select'),
  inputs: FCInput[] = [
    new FCInput('', 'password', configForms.required()),
    new FCInput('', 'comment', configForms.required(), 'textarea'),
  ];
  authoriseForm = new FormGroup(
    this.findQuotationService.formFieldsFromArr(this.inputs)
  );
  constructor(
    private findQuotationService: UtilityService,
    public dialogRef: MatDialogRef<AuthoriseQuoteComponent>
  ) {}

  ngOnInit(): void {
    this.inputs.forEach((x) => {
      x.form = this.authoriseForm;
      x.formControl = this.authoriseForm.get[x.name];
    });
  }

  authorise() {
    console.log('athorise');
  }

  close() {
    this.dialogRef.close();
  }
}
