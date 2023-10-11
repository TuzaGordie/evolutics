import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/Services/app.service';
import { FindMainAgentService } from '../../service/find-main-agent.service';

@Component({
  selector: 'app-view-agent-pending-quote',
  templateUrl: './view-agent-pending-quote.component.html',
  styleUrls: ['./view-agent-pending-quote.component.scss']
})
export class ViewAgentPendingQuoteComponent implements OnInit {
  agentNo: string;
  pendingQuotesList: any[];
  constructor(
    private findAgentService: FindMainAgentService,
    private router: ActivatedRoute,
    private appService: AppService,  
  ) { }

  ngOnInit(): void {
    this.agentNo = this.router.snapshot.queryParams['agentNo'];
    this.setPendingQuotes()
  }

  setPendingQuotes(){
    const busLine = this.appService.getCurrentSystemMetadata.busline;
    this.findAgentService.getPendingQuotes(this.agentNo, busLine).subscribe(
      (res: any[]) => this.pendingQuotesList = res,
      (err: HttpErrorResponse) => console.log("Error fetching pending quotes", err)
    )
  }
}
