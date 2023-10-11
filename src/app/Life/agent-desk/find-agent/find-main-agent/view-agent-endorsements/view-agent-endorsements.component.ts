import {Component, OnInit} from '@angular/core';
import { FindClientService } from 'src/app/CRMS/crms-pages/client-desk/service/find-client.service';

@Component({
  selector: 'app-view-agent-endorsements',
  templateUrl: './view-agent-endorsements.component.html',
  styleUrls: ['./view-agent-endorsements.component.scss']
})
export class ViewAgentEndorsementsComponent implements OnInit {

  endorseList: any = []

  constructor(public findClientService: FindClientService
  ) {
  }

  ngOnInit()
    :
    void {
    this.setEndorsements()
  }

  setEndorsements() {
    this.findClientService.getEndorsements(this.findClientService.clientInfo?.CLIENT_NO).subscribe(res => {
      this.endorseList = res;
      console.log("endorse Info", res)
    })
  }
}
