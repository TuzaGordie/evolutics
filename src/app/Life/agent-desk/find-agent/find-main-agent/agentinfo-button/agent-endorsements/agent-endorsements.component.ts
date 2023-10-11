import { Component, OnInit } from '@angular/core'; 

import { IndividualAgentService } from 'src/app/Life/agent-desk/new-individual-agent/services/individual-agent.service';
import { FindMainAgentService } from '../../service/find-main-agent.service';

@Component({
  selector: 'app-agent-endorsements',
  templateUrl: './agent-endorsements.component.html',
  styleUrls: ['./agent-endorsements.component.scss'],
})
export class AgentEndorsementsComponent implements OnInit {
  endorseList: any = [];
  endorseListSample: any[];
  constructor(
    public findAgentService: FindMainAgentService,
    public individualService: IndividualAgentService, 
  ) {}

  ngOnInit(): void {
    this.setEndorsements();
    /*  console.log(this.individualService.individualClientInfo.CLIENT_NO)
    console.log(this.corporateService.corporateClientInfo.CLIENT_NO)
    if(this.individualService.individualClientInfo.CLIENT_NO ){
      this.setEndorsementsforindividual()
    }
    else if(this.corporateService.corporateClientInfo.CLIENT_NO){
      this.setEndorsementsforcorporate()
    } */

    this.endorseListSample = [
      {
        endorseNo: 1,
        endorseCat: 'Name Change',
        endorseType: 'Text',
        fieldName: 'Last Name',
        createdBy: 'B-Kamal',
        authBy: 'J-BOND',
        pending: 'no',
        createdOn: '21/April/2021',
        authOn: '21/April/2021',
      },
      {
        endorseNo: 1,
        endorseCat: 'Name Change',
        endorseType: 'Text',
        fieldName: 'Last Name',
        createdBy: 'B-Kamal',
        authBy: 'J-BOND',
        pending: 'no',
        createdOn: '21/April/2021',
        authOn: '21/April/2021',
      },
    ];
    console.log(this.endorseListSample);
  }

  setEndorsements(){
    // debugger
    this.findAgentService.getEndorsements(this.findAgentService.agentInfo?.agent.clientNo).subscribe( res => {
      // debugger
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
