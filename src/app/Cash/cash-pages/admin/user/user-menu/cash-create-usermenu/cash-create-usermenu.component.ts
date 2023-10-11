import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cash-create-usermenu',
  templateUrl: './cash-create-usermenu.component.html',
  styleUrls: ['./cash-create-usermenu.component.scss']
})
export class CashCreateUsermenuComponent implements OnInit {

  
  data = 'Receipting';
  constructor() { }

  ngOnInit(): void {
  }

  showSetup(value:any){
    this.data = value
    console.log(this.data)
  }

}