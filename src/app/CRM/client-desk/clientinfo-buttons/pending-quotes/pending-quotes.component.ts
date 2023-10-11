import { Component, OnInit } from '@angular/core';
import { FindClientService } from '../../service/find-client.service';

@Component({
  selector: 'app-pending-quotes',
  templateUrl: './pending-quotes.component.html',
  styleUrls: ['./pending-quotes.component.scss']
})
export class PendingQuotesComponent implements OnInit {

  pendingQuotesList:any = []

  constructor(public findClientService:FindClientService
    ) { }

  ngOnInit(): void {
    this.setPendingQuotes()
  }
  setPendingQuotes(){
    this.findClientService.getPendingQuotes().subscribe( res => {
      this.pendingQuotesList = res;
      console.log("pendingQuotesList Info",res)
    })
  }

}