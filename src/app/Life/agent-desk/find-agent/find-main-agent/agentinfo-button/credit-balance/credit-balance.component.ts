import { Component, OnInit } from '@angular/core';
import { FindMainAgentService } from '../../service/find-main-agent.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-credit-balance',
  templateUrl: './credit-balance.component.html',
  styleUrls: ['./credit-balance.component.scss']
})
export class CreditBalanceComponent implements OnInit {

  pendingPaymentsList:any = []

  constructor(public findAgentService: FindMainAgentService, private router:Router) { }

  ngOnInit(): void {
    this.setPendingPayments()
  }
  setPendingPayments(){
    this.findAgentService.getPendingPayments().subscribe( res => {
      this.pendingPaymentsList = res;
      console.log("pending payment Info",res)
    })
  }
  navigateback(){
    this.router.navigateByUrl("/life/agent-desk/view-agent")
  }
}
