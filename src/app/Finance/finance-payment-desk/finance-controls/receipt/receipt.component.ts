import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {
  styleCheck = 30
  thead = ['No',"Date","Cashier","Payment Mode","Receive From","Branch Code","Amount Received","Total Amount","Date Entry","Authorize","Decline"]
  tdata = [
    { 
      No: 1234,
      date: '5678',
      cashier:'JOHN LEDLEY',
      paymentMode:'AJ01',
      receiveFrom:'JAMES BOND',
      branchCode:'CVII',
      amountReceived:500000,
      totalAmount:1000000,
      dateEntry:'JAMES BOND',
      authorize:false,
      decline:false
    },
    { 
      No: 1234,
      date: '5678',
      cashier:'JOHN LEDLEY',
      paymentMode:'AJ01',
      receiveFrom:'JAMES BOND',
      branchCode:'CVII',
      amountReceived:500000,
      totalAmount:1000000,
      dateEntry:'JAMES BOND',
      authorize:false,
      decline:false
    },
    
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
