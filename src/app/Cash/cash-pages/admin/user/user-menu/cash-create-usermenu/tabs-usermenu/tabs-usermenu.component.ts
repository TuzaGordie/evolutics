import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs-usermenu',
  templateUrl: './tabs-usermenu.component.html',
  styleUrls: ['./tabs-usermenu.component.scss']
})
export class TabsUsermenuComponent implements OnInit {

  @Input() title:string = ""
  constructor() { }

  ngOnInit(): void {
    console.log(this.title)
  }

}