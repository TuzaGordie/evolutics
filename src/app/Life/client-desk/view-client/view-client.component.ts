import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/Services/app.service';
import { IClientViewData } from 'src/app/Shared/models/client-desk.interface';
import { EClientType } from '../client-extras/client.interface';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.scss'],
})
export class ViewClientComponent implements OnInit {
  clientNo: string;

  constructor(public route: ActivatedRoute, public appS: AppService) {}

  ngOnInit(): void {
    this.clientNo = this.route.snapshot.queryParamMap.get('clientNo');
  }
  setTitle(client: IClientViewData) {
    this.appS.pageName = `View ${
      client.type == EClientType.individual
        ? 'Individual'
        : client.type == EClientType.corporate
        ? 'Corporate'
        : ''
    } Client`;
  }
}
