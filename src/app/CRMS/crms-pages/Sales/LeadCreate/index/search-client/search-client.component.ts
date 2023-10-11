import { FindClientService } from './../../../../../../Life/client-desk/service/find-client.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SalesExtrasService } from '../../../sales-extras/sales-extras.service';

@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.scss']
})
export class SearchClientComponent implements OnInit {
  clientInfoList: any = [];

  constructor(
    public seS: SalesExtrasService,
    public router: Router,
    public route: ActivatedRoute,
    public findClientService:FindClientService) {}

  ngOnInit(): void {
    this.clientInfoList = this.findClientService.searchedData


  }

  viewInfo(data: any) {
    console.log(data);
    this.seS.getDetailsByClientNo(data).subscribe((res) => {
      let data: any = res;
      this.router.navigate(['../view-client/', 1], { relativeTo: this.route });
    });
  }

}
