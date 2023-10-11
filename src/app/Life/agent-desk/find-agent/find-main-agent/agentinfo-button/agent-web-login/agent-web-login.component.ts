import { Component, OnInit } from '@angular/core'; 
import { IndividualAgentService } from 'src/app/Life/agent-desk/new-individual-agent/services/individual-agent.service';
import { FindMainAgentService } from '../../service/find-main-agent.service';

@Component({
  selector: 'app-agent-web-login',
  templateUrl: './agent-web-login.component.html',
  styleUrls: ['./agent-web-login.component.scss']
})
export class AgentWebLoginComponent implements OnInit {

  webLoginList:any =[]

  constructor(public findAgentService: FindMainAgentService,
    public individualService: IndividualAgentService, ) { }

  ngOnInit(): void {
    this.setWebLogin()
   /*  if(this.individualService.individualClientInfo.CLIENT_NO ){
      this.setWebLoginforindividual()
    }
    else if(this.corporateService.corporateClientInfo.CLIENT_NO){
      this.setWebLoginforcorporate()
    } */
  }
  setWebLogin(){
    this.findAgentService.getWebLogin(this.findAgentService.agentInfo?.agent.clientNo).subscribe( res => {
      this.webLoginList = res;
      console.log("weblogin Info",res)
    })
  }
  /* setWebLoginforindividual(){
    this.findAgentService.getEndorsements(this.individualService.individualClientInfo.CLIENT_NO).subscribe( res => {
      this.webLoginList = res;
      console.log("endorse Info",res)
    })
  }
  setWebLoginforcorporate(){
    this.findAgentService.getEndorsements(this.corporateService.corporateClientInfo.CLIENT_NO).subscribe( res => {
      this.webLoginList = res;
      console.log("endorse Info",res)
    })
  } */
}
