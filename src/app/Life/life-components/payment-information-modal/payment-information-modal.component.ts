import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PaymentInfoComponent } from '../../agent-desk/new-individual-agent/payment-info/payment-info.component';
import { IPaymentInfo } from '../../agent-desk/new-individual-agent/payment-info/payment-info.inteface';

@Component({
  templateUrl: './payment-information-modal.component.html',
  styleUrls: ['./payment-information-modal.component.scss'],
})
export class PaymentInformationModalComponent implements OnInit {
  loading: boolean; 
  message: string;
  @ViewChild(PaymentInfoComponent) piRef:PaymentInfoComponent
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data?: {
      agentNo: string;
      agentName: string;
      clientNo: string;
      paymentInfo: IPaymentInfo;
      dimensions: any;
      saveFunction: (d: IPaymentInfo) => Observable<any>;
    },
    public dialogRef?: MatDialogRef<PaymentInformationModalComponent>
  ) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  async save() {
    // debugger;
    try {
      if (this.data?.saveFunction) {
        this.loading = true;
        this.message = '';
        await this.data?.saveFunction(this.piRef.paymentForm.value).toPromise();
      }
      this.dialogRef.close(this.piRef.paymentForm.value);
    } catch (error) {
      // this.loading = false;
      this.message = 'An error occurred';
      console.error(error);
    }
  }
}
