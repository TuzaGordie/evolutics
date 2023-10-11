import { Component, OnInit } from '@angular/core';
import { IndividualAgentService } from './services/individual-agent.service';

@Component({
  selector: 'app-new-individual-agent',
  templateUrl: './new-individual-agent.component.html',
  styleUrls: ['./new-individual-agent.component.scss']
})
export class CRMSNewIndividualAgentComponent implements OnInit {


  constructor(public individualService:IndividualAgentService) { }

  ngOnInit(): void {
  }
  changeTab(tab:any){
    console.log("tab")
    this.individualService.tabChange(tab)
    }
}
