import { Component, OnInit } from '@angular/core';
import { FindGroupService } from '../service/find-group.service';

@Component({
  selector: 'app-group-search',
  templateUrl: './group-search.component.html',
  styleUrls: ['./group-search.component.scss']
})
export class GroupSearchComponent implements OnInit {

  groupInfoList:any = []

  constructor(public findGroupService: FindGroupService) { }

  ngOnInit(): void {

    this.setGroupInfo()
  }

  setGroupInfo(){
    this.findGroupService.getGroupList2().subscribe( res => {
      this.groupInfoList = res;
      console.log("group Info",res)
    })
  }
}
