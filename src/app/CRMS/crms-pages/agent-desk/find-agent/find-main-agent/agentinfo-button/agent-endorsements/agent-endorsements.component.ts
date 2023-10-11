import { Component, OnInit } from '@angular/core'; 
import { IndividualAgentService } from 'src/app/Life/agent-desk/new-individual-agent/services/individual-agent.service';
import { FindMainAgentService } from '../../service/find-main-agent.service';

@Component({
  selector: 'app-agent-endorsements',
  templateUrl: './agent-endorsements.component.html',
  styleUrls: ['./agent-endorsements.component.scss']
})
export class CRMSAgentEndorsementsComponent implements OnInit {

  endorseList:any = []

  constructor(public findAgentService: FindMainAgentService, 
    public individualService: IndividualAgentService,
  ) { }

  ngOnInit(): void {
    this.setEndorsements()
   /*  console.log(this.individualService.individualClientInfo.CLIENT_NO)
    console.log(this.corporateService.corporateClientInfo.CLIENT_NO)
    if(this.individualService.individualClientInfo.CLIENT_NO ){
      this.setEndorsementsforindividual()
    }
    else if(this.corporateService.corporateClientInfo.CLIENT_NO){
      this.setEndorsementsforcorporate()
    } */
  }
  setEndorsements(){
    this.findAgentService.getEndorsements(this.findAgentService.agentInfo?.CLIENT_NO).subscribe( res => {
      this.endorseList = res;
      console.log("endorse Info",res)
    })
  }
  /* setEndorsementsforindividual(){
    this.findAgentService.getEndorsements(this.individualService.individualClientInfo.CLIENT_NO).subscribe( res => {
      this.endorseList = res;
      console.log("endorse Info",res)
    })
  }
  setEndorsementsforcorporate(){
    this.findAgentService.getEndorsements(this.corporateService.corporateClientInfo.CLIENT_NO).subscribe( res => {
      this.endorseList = res;
      console.log("endorse Info",res)
    })
  } */

}
