import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FindGroupService } from '../service/find-group.service';

@Component({
  selector: 'app-find-group',
  templateUrl: './find-group.component.html',
  styleUrls: ['./find-group.component.scss'],
})
export class FindGroupComponent implements OnInit {
  findGroupForm: any = FormGroup;
  groupList: any = [];
  groupApiNo: any;
  validResult: any = '';
  checkMark = false;

  constructor(public findGroupService: FindGroupService, public router: Router, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.findGroupForm = new FormGroup({
      groupNo: new FormControl(null),
      clientNo: new FormControl(null),
      agentID: new FormControl(null),
      statusID: new FormControl(null),
      productClass: new FormControl(null),
      productCode: new FormControl(null),
      createdBy: new FormControl(null),
      createdDateFrom: new FormControl(null),
    });
  }

  onNext() {
    console.log(this.findGroupForm);
    this.findGroupService.getGroupList(this.findGroupForm.value.groupNo).subscribe((res) => {
      if (res) {
        this.router.navigate(['../view-group'], { relativeTo: this.route, queryParams: {groupNo: this.findGroupForm.value.groupNo, from: 'find-group'} })
      }
    });
    
    /* this.findGroupService.groupInfo(this.groupNoForm.value); */
  }

  setGroupList() {
    console.log(this.findGroupForm.value.groupNo)
    if(this.findGroupForm.value.groupNo == ''){
      console.log(true)
      this.validResult = ''
    } else {
      this.findGroupService.validateGroupNoIdentity(this.findGroupForm.value.groupNo).subscribe((res) => {
        this.groupList = res
        if (this.groupList) {
          this.validResult = 'true';
        } else {
          this.validResult = 'false';
        }
      })
    }
  }
}