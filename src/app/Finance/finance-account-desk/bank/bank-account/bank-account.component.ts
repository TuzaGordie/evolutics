import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss']
})
export class BankAccountComponent implements OnInit {
  thead = ['No',"Name","Net Change","Net Change","Balance","Balance (LCY)","Balance at D","Balance at D","Bank Account",'Currency','Sort Code']
  tdata = [
      { 
        no: '---',
        name: '---',
        netChange:'----',
        netChang:'----',
        balance:'---',
        balanceL:'---',
        balanceD:'---',
        balanceDs:'---',
        bankAccount:'---',
        currency:'---',
        sortCode:'---',
      },
      { 
        no: '---',
        name: '---',
        netChange:'----',
        netChang:'----',
        balance:'---',
        balanceL:'---',
        balanceD:'---',
        balanceDs:'---',
        bankAccount:'---',
        currency:'---',
        sortCode:'---',
      },
          ]

  constructor() { }

  ngOnInit(): void {
  }

}
