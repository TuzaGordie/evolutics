import { Component, OnInit } from '@angular/core';
import { FindMainAgentService } from '../../service/find-main-agent.service';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.scss']
})
export class CRMSCommissionComponent implements OnInit {

  policyList:any = []

  constructor(public findAgentService: FindMainAgentService) { }

  ngOnInit(): void {
    this.setPolicies()
  }
  setPolicies(){
    this.findAgentService.getPolicies().subscribe( res => {
      this.policyList = res;
      console.log("Relationship Info",res)
    })
  }
}
