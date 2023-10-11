import {Component, OnInit} from '@angular/core';
import { FindClientService } from 'src/app/CRMS/crms-pages/client-desk/service/find-client.service';


@Component({
  selector: 'app-view-agent-web-login',
  templateUrl: './view-agent-web-login.component.html',
  styleUrls: ['./view-agent-web-login.component.scss']
})
export class ViewAgentWebLoginComponent implements OnInit {

  webLoginList: any = []

  constructor(public findClientService: FindClientService) {
  }

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
