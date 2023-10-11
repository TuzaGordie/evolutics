import { Component, OnInit } from '@angular/core';
import { CorporateAgentService } from './service/corporate-agent.service';

@Component({
  selector: 'app-new-corporate-agent',
  templateUrl: './new-corporate-agent.component.html',
  styleUrls: ['./new-corporate-agent.component.scss']
})
export class CRMSNewCorporateAgentComponent implements OnInit {

  constructor(public corporateService: CorporateAgentService) { }

  ngOnInit(): void {
  }
  changeTab(tab:any){
    console.log("tab")
    this.corporateService.tabChange(tab)
    }
}
