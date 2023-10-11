import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-usergroup',
  templateUrl: './tab-usergroup.component.html',
  styleUrls: ['./tab-usergroup.component.scss']
})
export class TabUsergroupComponent implements OnInit {

  @Input() title:string = ""
  constructor() { }

  ngOnInit(): void {
    console.log(this.title)
  }

}