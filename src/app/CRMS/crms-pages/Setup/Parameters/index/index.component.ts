import { Component, OnInit } from '@angular/core';
import { FindClientsService } from '../service/find-clients.service';
import { CodeService } from 'src/app/Services/code.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class ParametersIndexComponent implements OnInit {
  codeGroupsList: any[] = [];
  codeSubgroupsList: any[] = [];
  codesList: any[] = [];
  codeSubgroup: string = '';
  codeGroup: string = '';
  code: string = '';
  loadingGroup = true;
  refreshingSubgroup = false;
  refreshingCode = false;

  message = {
    success: false,
    warning: false,
    error: false,
  };

  constructor(
    private codeService: CodeService,
    ) { }

  ngOnInit(): void {
    this.getAllCodeGroups();
  }

  getAllCodeGroups(){
    this.codeService.getCodeGroups()
      .subscribe(
        (data: any[]) => {
          this.codeGroupsList = data
          this.loadingGroup = false;
        },
        (err: HttpErrorResponse) => console.log("Error fetching code groups", err)
      )
  }

  onGroupChange() {
    this.refreshingSubgroup = true;
    this.codeSubgroupsList = [];
    this.codesList = [];
    this.codeService
      .getAllCodeByGroup(this.codeGroup)
      .subscribe(
        (data: any[]) => {
          this.codeSubgroupsList = data;
          this.refreshingSubgroup = false;
        },
        (err: HttpErrorResponse) => {
          console.log("Error fetching code subgroups for codeGroup " + this.codeGroup, err);
          this.refreshingSubgroup = false;
        }
      );
  }

  onSubGroupChange(){
    this.refreshingCode = true;
    this.codesList = [];
    this.codeService.getCodesByGroup_Subgroup(this.codeGroup, this.codeSubgroup)
      .subscribe(
        (data: any[]) => {
          this.codesList = data;
          console.log("this.codesList", this.codesList)
          this.refreshingCode = false;
        },
        (err: HttpErrorResponse) => {
          console.log("Error fetching codes by group and subgroup", err)
          this.refreshingCode = false;
        }
      )
  }
}
