import { Component, OnInit } from '@angular/core';
import { FindClientsService } from '../service/find-clients.service';

@Component({
  selector: 'app-clv-index',
  templateUrl: './clv-index.component.html',
  styleUrls: ['./clv-index.component.scss']
})
export class CLVIndexComponent implements OnInit {
  reportGroupList:any = [];
  reportList:any = [];
  constructor(public findClientsService: FindClientsService) { }

  ngOnInit(): void {
  }
}
