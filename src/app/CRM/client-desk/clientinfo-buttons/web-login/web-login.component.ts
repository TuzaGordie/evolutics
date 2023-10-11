import { Component, OnInit } from '@angular/core';
import { FindClientService } from '../../service/find-client.service';

@Component({
  selector: 'app-web-login',
  templateUrl: './web-login.component.html',
  styleUrls: ['./web-login.component.scss']
})
export class WebLoginComponent implements OnInit {

  webLoginList:any = []

  constructor(public findClientService:FindClientService) { }

  ngOnInit(): void {
    this.setWebLogin()
  }
  setWebLogin(){
    this.findClientService.getWebLogin(this.findClientService.clientInfo?.CLIENT_NO).subscribe( res => {
      this.webLoginList = res;
      console.log("weblogin Info",res)
    })
  }

}
