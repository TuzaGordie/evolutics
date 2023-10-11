import { Component, OnInit } from '@angular/core';
import { FindClientsService } from '../service/find-clients.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class WriteReportStartComponent implements OnInit {
  reportGroupList:any = [];
  reportList:any = [];
  constructor(public findClientsService: FindClientsService) { }

  ngOnInit(): void {
  }
}
