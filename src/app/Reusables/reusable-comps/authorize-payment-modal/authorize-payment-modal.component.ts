import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentDeskService } from '../../../Life/payment-desk/service/payment-desk.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-authorize-payment-modal',
  templateUrl: './authorize-payment-modal.component.html',
  styleUrls: ['./authorize-payment-modal.component.scss']
})
export class AuthorizePaymentModalComponent implements OnInit {

  response = {
    successMessage: '',
    errorMessage: '',
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private paymentDeskService: PaymentDeskService,
    private toaster: UtilityService,
  ) { }

  ngOnInit(): void {
  }


  authorizePayment() {
    console.log('type', this.data.type)
    let payment = {
      id: this.data.array,
      userCode: environment.user?.code
    }

    if(this.data.type === 'authorize') {
      this.paymentDeskService.authorizePayment(payment).subscribe((data: any)=> {
        console.log(data);
        this.response.successMessage = data.message;
        const unAuthorizedUser = this.response.successMessage.includes("User not allowed to authorize this payment")
        this.toaster.info(`${this.response.successMessage}`, unAuthorizedUser ? 0 : 1)
      },
      error => {
        console.log('coupon error', error);
        this.toaster.info(error.error?.message, 0);
      });
    }else{
      this.paymentDeskService.declinePayment(payment).subscribe((data: any)=> {
        console.log(data);
        this.response.successMessage = data.message;
        const unAuthorizedUser = this.response.successMessage.includes("User not allowed to authorize this payment")
        this.toaster.info(`${this.response.successMessage}`, unAuthorizedUser ? 0 : 1);
      },
      error => {
        console.log('payment error', error);
        this.toaster.info(error.error?.message, 0);
      });
    }
  
  }

}
