import { Component, OnInit } from '@angular/core';
import { FindClientService } from '../../service/find-client.service';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {

  policyList:any = []

  constructor(public findClientService:FindClientService) { }

  ngOnInit(): void {
    this.setPolicies()
  }
  setPolicies(){
    this.findClientService.getPolicies().subscribe( res => {
      this.policyList = res;
      console.log("policyList Info",res)
    })
  }

}
