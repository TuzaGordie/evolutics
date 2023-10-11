import { Component, OnInit } from '@angular/core';
import { FindClientService } from '../../service/find-client.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class CRMSBusinessComponent implements OnInit {


  businessList:any = []

  constructor(public findClientService:FindClientService) { }

  ngOnInit(): void {
    this.setPolicies()
  }
  setPolicies(){
    this.findClientService.getPolicies().subscribe( res => {
      this.businessList = res;
      console.log("business Info",res)
    })
  }

}
