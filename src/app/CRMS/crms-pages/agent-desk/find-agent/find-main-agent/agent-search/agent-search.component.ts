import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FindMainAgentService } from '../service/find-main-agent.service';

@Component({
  selector: 'app-agent-search',
  templateUrl: './agent-search.component.html',
  styleUrls: ['./agent-search.component.scss']
})
export class CRMSAgentSearchComponent implements OnInit {

  agentInfoList:any = []

  constructor(public findAgentService: FindMainAgentService,public router:Router) { }

  ngOnInit(): void {
console.log("agent search",this.findAgentService.searchedData)
this.agentInfoList = this.findAgentService.searchedData;
    /* this.setClientInfo() */
  }

  viewInfo(data:any){
    console.log(data)
    this.findAgentService.getAgentList(data).subscribe(res => {
      let data:any = res
      this.findAgentService.agentInfo = data[0]
      console.log("agesnt search data", this.findAgentService.agentInfo )
      this.router.navigateByUrl('/life/view-agent')
    })
    
  }
}