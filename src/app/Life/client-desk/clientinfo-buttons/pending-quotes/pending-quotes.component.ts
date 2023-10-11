import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/Services/app.service';
import { FindClientService } from '../../service/find-client.service';

@Component({
  selector: 'app-pending-quotes',
  templateUrl: './pending-quotes.component.html',
  styleUrls: ['./pending-quotes.component.scss'],
})
export class ClientPendingQuotesComponent implements OnInit {
  pendingQuotesList: any = [];
  clientNo: string;

  constructor(
    public findClientService: FindClientService,
    public route: ActivatedRoute,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientNo = this.route.snapshot.paramMap.get('id');
    console.log('param id', this.clientNo);
    this.setPendingQuotes();
  }
  setPendingQuotes() {
    let busLine = this.appService.getCurrentSystemMetadata.busline;
    this.findClientService
      .getPendingQuotesApi(this.clientNo, busLine)
      .subscribe((res) => {
        this.pendingQuotesList = res;
        console.log('pendingQuotesList Info', res);
      });
  }
  onModify(pendingQuote) {
    const queryParams = {
      pcd: pendingQuote.productCode,
      pcl: pendingQuote.productClass,
      clientNo: this.clientNo,
    };
    this.router.navigate(
      ['../../../../quotation-desk/create-new-individual-quotation/'],
      { queryParams, relativeTo: this.route }
    );
  }
}
