import { Component, OnInit } from '@angular/core';
import { FindClientService } from '../../service/find-client.service';

@Component({
  selector: 'app-endorsements',
  templateUrl: './endorsements.component.html',
  styleUrls: ['./endorsements.component.scss']
})
export class EndorsementsComponent implements OnInit {

  endorseList:any = []

  constructor(public findClientService:FindClientService) { }

  ngOnInit(): void {
    this.setEndorsements()
  }
  setEndorsements(){
    this.findClientService.getEndorsements(this.findClientService.clientInfo?.CLIENT_NO).subscribe( res => {
      this.endorseList = res;
      console.log("endorse Info",res)
    })
  }

}
