import { Component, OnInit } from '@angular/core';
import { FindMainAgentService } from '../../service/find-main-agent.service';

@Component({
  selector: 'app-credit-balance',
  templateUrl: './credit-balance.component.html',
  styleUrls: ['./credit-balance.component.scss']
})
export class CRMSCreditBalanceComponent implements OnInit {

  pendingPaymentsList:any = []

  constructor(public findAgentService: FindMainAgentService) { }

  ngOnInit(): void {
    this.setPendingPayments()
  }
  setPendingPayments(){
    this.findAgentService.getPendingPayments().subscribe( res => {
      this.pendingPaymentsList = res;
      console.log("pending payment Info",res)
    })
  }
}
