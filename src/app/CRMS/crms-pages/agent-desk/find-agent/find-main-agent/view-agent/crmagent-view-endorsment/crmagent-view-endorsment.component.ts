import { Component, OnInit } from '@angular/core';
import {FindClientService} from "../../../../../client-desk/service/find-client.service";

@Component({
  selector: 'app-crmagent-view-endorsment',
  templateUrl: './crmagent-view-endorsment.component.html',
  styleUrls: ['./crmagent-view-endorsment.component.scss']
})
export class CRMAgentViewEndorsmentComponent implements OnInit {

  endorseList: any = []
  constructor(public findClientService: FindClientService) { }

  ngOnInit(): void {
    this.setEndorsements()
  }


  setEndorsements() {
    this.findClientService.getEndorsements(this.findClientService.clientInfo?.CLIENT_NO).subscribe(res => {
      this.endorseList = res;
      console.log("endorse Info", res)
    })
  }
}
