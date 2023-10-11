import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-local-bank-list',
  templateUrl: './local-bank-list.component.html',
  styleUrls: ['./local-bank-list.component.scss']
})
export class LocalBankListComponent implements OnInit {
  thead = ['Code','Description','Bank Name','Branch','Sort Code']
  tdata = [
      { 
        code: '---',
        description: '---',
        bankName: '---',
        branch:'----',
        sortCode:'----',
      },
      { 
        code: '---',
        description: '---',
        bankName: '---',
        branch:'----',
        sortCode:'----',
              },
          ]
  constructor() { }

  ngOnInit(): void {
  }

}
