import { Component, OnInit } from '@angular/core';
import { FindMainAgentService } from '../../service/find-main-agent.service';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class CRMSProductionComponent implements OnInit {

  quotesList:any=[]

  constructor(public findAgentService: FindMainAgentService) { }

  ngOnInit(): void {
    this.setPendingQuotes()
  }
  setPendingQuotes(){
    this.findAgentService.getPendingQuotes().subscribe( res => {
      this.quotesList = res;
      console.log("weblogin Info",res)
    })
  }
}
