import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FindWorkflowService } from "../../service/find-workflow.service";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reassign-workflow',
  templateUrl: './reassign-workflow.component.html',
  styleUrls: ['./reassign-workflow.component.scss']
})
export class ReassignWorkflowComponent implements OnInit {
  usersList: any[] = []
  userGroupsList: any[] = []

  @ViewChild('launchBtn', { static: true }) launchBtn: ElementRef;
  @ViewChild('closeBtn', { static: true }) closeBtn: ElementRef;

  constructor(private location: Location, private workflowService: FindWorkflowService) { }

  onCloseClick(){
    this.location.back()
  }

  ngOnInit(): void {
    this.setUsersList()
    this.setUserGroupsList()
  }
  ngAfterViewInit() {
    this.launchBtn.nativeElement.click()
 }
  ngOnDestroy () {
      this.closeBtn.nativeElement.click()
 }

 setUsersList() {
   this.workflowService.getUsersList()
    .subscribe(
      (res: any[]) => this.usersList = res,
      (err: HttpErrorResponse) => console.log("Error fetching users list", err)
    )
 }
 setUserGroupsList() {
  this.workflowService.getUserGroupsList()
   .subscribe(
     (res: any[]) => this.userGroupsList = res,
     (err: HttpErrorResponse) => console.log("Error fetching user groups list", err)
   )
}
}
