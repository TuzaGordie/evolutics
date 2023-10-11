import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilityService } from 'src/app/Services/utility.service';
import { IAccount } from 'src/app/Shared/models/account.interface';

@Component({
  templateUrl: './create-account-modal.component.html',
  styleUrls: ['./create-account-modal.component.scss'],
})
export class CreateAccountModalComponent implements OnInit {
  constructor(
    public uS: UtilityService, 
    public dialogRef: MatDialogRef<CreateAccountModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { clientNo: string }
  ) {}

  ngOnInit(): void {}

  close(account?: IAccount) {
    this.dialogRef.close(account);
  }
}
