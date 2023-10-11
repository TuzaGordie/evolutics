import { Component, OnInit } from '@angular/core';
import { FindMainAgentService } from '../../service/find-main-agent.service';
import {Router} from '@angular/router';
import { AppService } from 'src/app/Services/app.service';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent implements OnInit {
  agentNo: string;
  quotesList:any=[]

  constructor(
    public findAgentService: FindMainAgentService,
    private router:Router,
    private appService: AppService,
    ) { }

  ngOnInit(): void {
    this.setPendingQuotes()
  }
  setPendingQuotes(){
    const busLine = this.appService.getCurrentSystemMetadata.busline;
    this.findAgentService.getPendingQuotes(this.agentNo, busLine).subscribe( res => {
      this.quotesList = res;
      console.log("weblogin Info",res)
    })
  }

  navigateback(){
    this.router.navigateByUrl("life/agent-desk/view-agent");
  }
}
