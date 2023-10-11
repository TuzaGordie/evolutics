import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import {
  EClientType,
  IClientSearchObj,
  IClientSearchResult,
} from '../client-extras/client.interface';
import { FindClientService } from '../service/find-client.service';

@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.scss'],
})
export class ClientSearchComponent implements OnInit {
  clientInfoList: IClientSearchResult[] = [];
  query: any;
  loading: boolean;
  @Input() isModal: boolean;
  @Input() modelData: IClientSearchObj;
  @Input() modalOnComplete

  constructor(
    public findClientService: FindClientService,
    public router: Router,
    public route: ActivatedRoute,
    private uS: UtilityService
  ) {}

  ngOnInit(): void { 
    this.query = this.modelData||this.route.snapshot.queryParams;
    if (this.query) {
      this.loading = true;
      this.findClientService.search(this.query).subscribe(
        (r) => {
          this.clientInfoList = r;
          this.loading = false;
        },
        (e) => {
          this.loading = false;
        }
      );
    }
  }

  viewInfo(data: any) {
    console.log('item data: ', data);
    if (data.type == 'I') {
      this.router.navigate(['../view-client/'], {
        relativeTo: this.route,
        queryParams: { clientNo: data.clientNo },
      });
    } else if (data.type == 'C') {
      this.router.navigate(['../view-client-corporate/'], {
        relativeTo: this.route,
        queryParams: { clientNo: data.clientNo },
      });
    } else {
      this.uS.notify(`Client type is invalid for this client`, 0);
      return;
    }
  }
  typer(type: EClientType) {
    return type == EClientType.individual
      ? 'Individual'
      : type == EClientType.corporate
      ? 'Corporate'
      : '-';
  }
  typeRoute(type: EClientType) {
    return type == EClientType.corporate ? '-corporate' : '';
  }
}
