import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { configForms } from 'src/app/Shared/models/form.class';

@Component({
  selector: 'app-add-member-modal',
  templateUrl: './add-member-modal.component.html',
  styleUrls: ['./add-member-modal.component.scss'],
})
export class AddMemberModalComponent implements OnInit {
  form = new FormGroup({
    test: configForms.required(),
  });
  constructor(
    public dialogRef: MatDialogRef<AddMemberModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

  ngOnInit(): void {
    this.form.patchValue(this.data);
  }
  close() {
    this.dialogRef.close();
  }

  private nbofMember: number = 1;
  downloadTemplate() {}
  memberCounter() {
    return new Array(this.nbofMember);
  }
  memberInc(value = 1) {
    this.nbofMember = this.nbofMember + value;
  }
}
