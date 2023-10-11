import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FindGroupService } from '../service/find-group.service';

@Component({
  selector: 'app-find-group',
  templateUrl: './find-group.component.html',
  styleUrls: ['./find-group.component.scss']
})
export class FindGroupComponent implements OnInit {

  findGroupForm:any = FormGroup;
  groupList:any = []
  groupApiNo:any
  validResult:any = ""
  checkMark = false;

  constructor(public findGroupService: FindGroupService,public router: Router) { }

  ngOnInit(): void {
    this.findGroupForm = new FormGroup({
      groupNo: new FormControl(null),
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
    console.log(this.findGroupForm)
 this.router.navigateByUrl('/life/view-group')
    /* this.findGroupService.groupInfo(this.groupNoForm.value); */
  }

 
    setGroupList(){
      console.log(this.findGroupForm.value.groupNo)
      this.findGroupService.getGroupList(this.findGroupForm.value.groupNo).subscribe( res => {

        this.groupList = res;
        if(this.groupList.length > 0){
          this.findGroupService.groupInfo = this.groupList[0]
          this.validResult = "true"
         
        }
        else{
    this.validResult = "false"
        }
        console.log("groupList",res)
      })
    }

}
