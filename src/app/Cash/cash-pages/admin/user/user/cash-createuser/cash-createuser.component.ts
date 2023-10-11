import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cash-createuser',
  templateUrl: './cash-createuser.component.html',
  styleUrls: ['./cash-createuser.component.scss']
})
export class CashCreateuserComponent implements OnInit {

  data = 'Receipting';
  constructor() { }

  ngOnInit(): void {
  }

  showSetup(value:any){
    this.data = value
    console.log(this.data)
  }

}
