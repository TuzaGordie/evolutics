import { Component, OnInit } from '@angular/core';
import { FindClientService } from '../../service/find-client.service';

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.scss']
})
export class CRMSWorkflowsComponent implements OnInit {

  webflowsList:any = []

  constructor(public findClientService:FindClientService) { }

  ngOnInit(): void {
    this.setWebflows()
  }
  setWebflows(){
    this.findClientService.getWebflows(this.findClientService.clientInfo?.CLIENT_NO).subscribe( res => {
      this.webflowsList = res;
      console.log("webflows Info",res)
    })
  }

}
