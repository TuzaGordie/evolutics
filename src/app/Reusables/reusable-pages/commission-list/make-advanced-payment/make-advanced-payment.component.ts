import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UtilityService } from 'src/app/Services/utility.service';
import { FCInput, IKVP, KVP } from 'src/app/Shared/models/index.model';

@Component({
  selector: 'app-make-advanced-payment',
  templateUrl: './make-advanced-payment.component.html',
  styleUrls: ['./make-advanced-payment.component.scss'],
})
export class MakeAdvancedPaymentComponent implements OnInit {
  inputs: FCInput[] = [
    new FCInput('Type', null, null, 'select'),
    new FCInput('Currency', null, null, 'select'),
    new FCInput('Charges'),
    new FCInput('Payee No'),
    new FCInput('Payee Name'),
    new FCInput('Bank Account', null, null, 'select'),
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
    this.uS.formFieldsFromArr([...this.inputs, this.narration])
  );
  constructor(
    public uS: UtilityService,
    public dialogRef: MatDialogRef<MakeAdvancedPaymentComponent>
  ) {}

  ngOnInit(): void {
    this.uS.bindFormControlToInputs(
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
