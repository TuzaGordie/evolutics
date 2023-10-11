import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UtilityService } from 'src/app/Services/utility.service';
import { FCInput, IKVP, KVP } from 'src/app/Shared/models/index.model';
 
@Component({
  selector: 'app-manual-commissions',
  templateUrl: './manual-commissions.component.html',
  styleUrls: [
    './manual-commissions.component.scss',
   ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManualCommissionsComponent implements OnInit {
  inputs: FCInput[] = [
    new FCInput('Type', null, null, 'select'),
    new FCInput('Amount'),
    new FCInput('Policy No'),
    new FCInput('Owner Name'),
    new FCInput('Cover No'),
  ];
  narration = new FCInput('Narration', null, null, 'textarea');
  lbls1: IKVP[] = [
    new KVP('Agent No'),
    new KVP('Agent Name'),
    new KVP('Currency'),
    new KVP('Current Balance'),
    new KVP('Pending Amount'),
  ];
  form = new FormGroup(
    this.uS.formFieldsFromArr([...this.inputs, this.narration])
  );
  constructor(
    public uS: UtilityService,
    public dialogRef: MatDialogRef<ManualCommissionsComponent>
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
