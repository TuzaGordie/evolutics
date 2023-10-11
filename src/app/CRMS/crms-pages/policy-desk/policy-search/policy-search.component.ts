import { Component, OnInit } from '@angular/core';
import { FindPolicyService } from '../service/find-policy.service';

@Component({
  selector: 'app-policy-search',
  templateUrl: './policy-search.component.html',
  styleUrls: ['./policy-search.component.scss']
})
export class PolicySearchComponent implements OnInit {

  policyInfoList:any = []

  constructor(public findPolicyService: FindPolicyService) { }

  ngOnInit(): void {

    this.setPolicyInfo()
  }

  setPolicyInfo(){
    this.findPolicyService.getPolicyList2().subscribe( res => {
      this.policyInfoList = res;
      console.log("policy Info",res)
    })
  }
}
