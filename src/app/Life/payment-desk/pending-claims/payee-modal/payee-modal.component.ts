import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-payee-modal',
  templateUrl: './payee-modal.component.html',
  styleUrls: ['./payee-modal.component.scss']
})
export class PayeeModalComponent implements OnInit {

  constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<PayeeModalComponent>) { }

  isSetPayeeHidden: boolean = true;
  isCreatePaymentOutwardHidden: boolean = true;


  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createPaymentOutward() {
    this.isSetPayeeHidden = true
    this.isCreatePaymentOutwardHidden = false
  }

  setPayee() {
    this.isCreatePaymentOutwardHidden = true
    this.isSetPayeeHidden = false
  }

}
