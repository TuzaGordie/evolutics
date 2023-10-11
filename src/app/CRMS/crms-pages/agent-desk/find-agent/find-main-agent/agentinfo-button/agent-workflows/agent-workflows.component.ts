import { Component, OnInit } from '@angular/core';import { IndividualAgentService } from 'src/app/Life/agent-desk/new-individual-agent/services/individual-agent.service';
import { FindMainAgentService } from '../../service/find-main-agent.service';

@Component({
  selector: 'app-agent-workflows',
  templateUrl: './agent-workflows.component.html',
  styleUrls: ['./agent-workflows.component.scss']
})
export class CRMSAgentWorkflowsComponent implements OnInit {

  webflowsList:any = []

  constructor(public findAgentService: FindMainAgentService,
    public individualService: IndividualAgentService,
   ) { }

  ngOnInit(): void {
    this.setWebflows()
    /* if(this.individualService.individualClientInfo.CLIENT_NO ){
      this.setWebflowsforindividual()
    }
    else if(this.corporateService.corporateClientInfo.CLIENT_NO){
      this.setWebflowsforcorporate()
    } */
  }
  setWebflows(){
    this.findAgentService.getWebflows().subscribe( res => {
      this.webflowsList = res;
      console.log("webflows Info",res)
    })
  }
 /*  setWebflowsforindividual(){
    this.findAgentService.getEndorsements(this.individualService.individualClientInfo.CLIENT_NO).subscribe( res => {
      this.webflowsList = res;
      console.log("endorse Info",res)
    })
  }
  setWebflowsforcorporate(){
    this.findAgentService.getEndorsements(this.corporateService.corporateClientInfo.CLIENT_NO).subscribe( res => {
      this.webflowsList = res;
      console.log("endorse Info",res)
    })
  } */
}
