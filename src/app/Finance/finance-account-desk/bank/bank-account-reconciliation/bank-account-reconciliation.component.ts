import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bank-account-reconciliation',
  templateUrl: './bank-account-reconciliation.component.html',
  styleUrls: ['./bank-account-reconciliation.component.scss']
})
export class BankAccountReconciliationComponent implements OnInit {
  thead = ['Bank','Statement','Statement','Balance Last','Statement Ent']
  tdata = [
      { 
        bank: '---',
        statement: '---',
        statement1: '---',
        balance:'----',
        statement2:'----',
      },
      { 
        bank: '---',
        statement: '---',
        statement1: '---',
        balance:'----',
        statement2:'----',
            },
          ]
  constructor() { }

  ngOnInit(): void {
  }

}
