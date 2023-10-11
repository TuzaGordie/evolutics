import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FindPolicyService } from '../service/find-policy.service';

@Component({
  selector: 'app-find-policy',
  templateUrl: './find-policy.component.html',
  styleUrls: ['./find-policy.component.scss']
})
export class FindPolicyComponent implements OnInit {

  findPolicyForm:any = FormGroup;
  policyList:any = []
  policyInfo: any
  policyApiNo:any
  validResult:any = ""
  checkMark = false;

  constructor(public findPolicyService: FindPolicyService,public router: Router) { }

  ngOnInit(): void {
    this.findPolicyForm = new FormGroup({
      policyNo: new FormControl(null),
      clientNo: new FormControl(null),
      agentID: new FormControl(null),
      statusID: new FormControl(null),
      productClass: new FormControl(null),
      productCode: new FormControl(null),
      createdBy: new FormControl(null),
      createdDateFrom: new FormControl(null)
      
    })
  }

  onNext(){
    console.log(this.findPolicyForm)
 this.router.navigateByUrl('/life/policy-desk/view-policy')
    /* this.findPolicyService.policyInfo(this.policyNoForm.value); */
  }

 
    setPolicyList(){
      console.log(this.findPolicyForm.value.policyNo)
      this.findPolicyService.getPolicyList(this.findPolicyForm.value.policyNo).subscribe( res => {

        this.policyList = res;
        if(this.policyList.length > 0){
          this.findPolicyService.policyInfo = this.policyList[0]
          this.validResult = "true"
         
        }
        else{
    this.validResult = "false"
        }
        console.log("policyList",res)
      })
    }

}
