import { Component, OnInit } from '@angular/core';
import { FindClientService } from 'src/app/Life/client-desk/service/find-client.service';
// import {FindClientService} from "../../../../../../Life/client-desk/service/find-client.service";

@Component({
  selector: 'app-crmagent-view-workflows',
  templateUrl: './crmagent-view-workflows.component.html',
  styleUrls: ['./crmagent-view-workflows.component.scss']
})
export class CRMAgentViewWorkflowsComponent implements OnInit {

  webflowsList: any = []

  constructor(public findClientService: FindClientService) { }

  ngOnInit(): void {
    this.setWebflows()
  }


  setWebflows() {
    this.findClientService.getWebflows(this.findClientService.clientInfo?.CLIENT_NO).subscribe(res => {
      this.webflowsList = res;
      console.log("webflows Info", res)
    })
  }
}
