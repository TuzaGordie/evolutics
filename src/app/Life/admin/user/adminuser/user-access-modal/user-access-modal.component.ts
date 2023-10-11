import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/Shared/models/life/user/Users';

@Component({
  templateUrl: './user-access-modal.component.html',
  styleUrls: ['./user-access-modal.component.scss'],
})
export class UserAccessModalComponent implements OnInit {
  user: User;
  fields = [{ label: '', value: false }];
  constructor(
    public dialogRef: MatDialogRef<UserAccessModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { user: User; isShow: boolean }
  ) {}

  ngOnInit(): void {
    this.user = Object.create(this.data.user);
  }
  get isShow() {
    return this.data.isShow;
  }
  close() {
    this.dialogRef.close();
  }
  save() {
    this.dialogRef.close(this.user);
  }
}
