import { Component, OnInit } from '@angular/core';
import { FindClientService } from '../../service/find-client.service';

@Component({
  selector: 'app-pending-payments',
  templateUrl: './pending-payments.component.html',
  styleUrls: ['./pending-payments.component.scss']
})
export class CRMSPendingPaymentsComponent implements OnInit {

  paymentList:any = []

  constructor(public findClientService:FindClientService) { }

  ngOnInit(): void {
    this.setPendingPayments()
  }
  setPendingPayments(){
    this.findClientService.getPendingPayments().subscribe( res => {
      this.paymentList = res;
      console.log("endorse Info",res)
    })
  }

}