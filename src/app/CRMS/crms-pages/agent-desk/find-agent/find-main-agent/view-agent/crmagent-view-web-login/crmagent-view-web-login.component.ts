import { Component, OnInit } from '@angular/core';
import {FindClientService} from "../../../../../client-desk/service/find-client.service";

@Component({
  selector: 'app-crmagent-view-web-login',
  templateUrl: './crmagent-view-web-login.component.html',
  styleUrls: ['./crmagent-view-web-login.component.scss']
})
export class CRMAgentViewWebLoginComponent implements OnInit {

  webLoginList: any = []
  constructor(public findClientService: FindClientService) { }

  ngOnInit(): void {
    this.setWebLogin()
  }
  setWebLogin() {
    this.findClientService.getWebLogin(this.findClientService.clientInfo?.CLIENT_NO).subscribe(res => {
      this.webLoginList = res;
      console.log("weblogin Info", res)
    })
  }

}
