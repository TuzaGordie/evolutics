import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cheque-writing',
  templateUrl: './cheque-writing.component.html',
  styleUrls: ['./cheque-writing.component.scss']
})
export class ChequeWritingComponent implements OnInit {
  thead = ['No',"Date","Payee","Total Payment","Paying Bal","Product","Cost Cent","Bank Name","Total Net Amount",'Cheque','Print']
  tdata = [
      { 
        no: '---',
        date: '---',
        payee:'----',
        tolPayment:'----',
        payingBal:'---',
        product:'---',
        costCent:'---',
        bankName:'---',
        totalNetAmount:'---',
        cheque:'---',
        print:'',
      },
      { 
        no: '---',
        date: '---',
        payee:'----',
        tolPayment:'----',
        payingBal:'---',
        product:'---',
        costCent:'---',
        bankName:'---',
        totalNetAmount:'---',
        cheque:'---',
        print:'',
      },
          ]
  constructor() { }

  ngOnInit(): void {
  }

}
