import { Component, OnInit } from '@angular/core'; 
import { IndividualAgentService } from 'src/app/Life/agent-desk/new-individual-agent/services/individual-agent.service';
import { FindMainAgentService } from '../../service/find-main-agent.service';

@Component({
  selector: 'app-agent-documents',
  templateUrl: './agent-documents.component.html',
  styleUrls: ['./agent-documents.component.scss']
})
export class AgentDocumentsComponent implements OnInit {

  documentList:any = []

  constructor(public findAgentService: FindMainAgentService,
    public individualService: IndividualAgentService,
  ) { }

  ngOnInit(): void {
    this.setDocument()
   /*  if(this.individualService.individualClientInfo.CLIENT_NO ){
      this.setDocumentforindividual()
    }
    else if(this.corporateService.corporateClientInfo.CLIENT_NO){
      this.setDocumentforcorporate()
    } */
  }

  setDocument(){
    this.findAgentService.getDocument(this.findAgentService.agentInfo?.agent.clientNo).subscribe( res => {
      this.documentList = res;
      console.log("document Info",res)
    })
  }

 /*  setDocumentforindividual(){
    this.findAgentService.getEndorsements(this.individualService.individualClientInfo.CLIENT_NO).subscribe( res => {
      this.documentList = res;
      console.log("endorse Info",res)
    })
  }
  setDocumentforcorporate(){
    this.findAgentService.getEndorsements(this.corporateService.corporateClientInfo.CLIENT_NO).subscribe( res => {
      this.documentList = res;
      console.log("endorse Info",res)
    })
  } */

}
