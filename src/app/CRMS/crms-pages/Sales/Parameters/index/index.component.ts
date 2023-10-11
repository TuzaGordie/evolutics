import { Component, OnInit } from '@angular/core';
import { FindClientsService } from '../service/find-clients.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class ParametersIndexComponent implements OnInit {
  reportGroupList:any = [];
  reportList:any = [];
  constructor(public findClientsService: FindClientsService) { }

  ngOnInit(): void {
  }
}
