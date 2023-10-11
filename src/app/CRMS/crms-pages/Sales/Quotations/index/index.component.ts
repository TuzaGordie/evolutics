import { Component, OnInit } from '@angular/core';
import { FindClientsService } from '../service/find-clients.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class QuotationsIndexComponent implements OnInit {
  reportGroupList:any = [];
  reportList:any = [];
  individual=true;
  corporate=false;
  clientNo: String = "";
  constructor(public findClientsService: FindClientsService) { }

  ngOnInit(): void {
  }
show(event:any){
  alert(event);
  if(event==1){
  this.individual=true;
  this.corporate=false;
  }
  if(event==2){
    this.individual=false;
    this.corporate=false;
    }
}
}
