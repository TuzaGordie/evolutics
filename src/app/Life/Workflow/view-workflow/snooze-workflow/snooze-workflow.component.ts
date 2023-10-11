import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FindWorkflowService } from '../../service/find-workflow.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-snooze-workflow',
  templateUrl: './snooze-workflow.component.html',
  styleUrls: ['./snooze-workflow.component.scss']
})
export class SnoozeWorkflowComponent implements OnInit {
  snoozeBasesList: any[] = []
  snoozeReasonsList: any[] = []

  @ViewChild('launchBtn', { static: true }) launchBtn: ElementRef;
  @ViewChild('closeBtn', { static: true }) closeBtn: ElementRef;

  constructor(private location: Location, private workflowService: FindWorkflowService) { }

  onCloseClick(){
    this.location.back()
  }

  ngOnInit(): void {
    this.setSnoozeReasonsList()
    this.setSnoozeBasesList()
  }
  ngAfterViewInit() {
    this.launchBtn.nativeElement.click()
 }
  ngOnDestroy () {
      this.closeBtn.nativeElement.click()
 }

  setSnoozeBasesList() {
   this.workflowService.getSnoozeBasesList()
    .subscribe(
      (res: any[]) => this.snoozeBasesList = res,
      (err: HttpErrorResponse) => console.log("Error fetching snooze bases list")
    )
  }
  setSnoozeReasonsList() {
    this.workflowService.getSnoozeReasonsList()
     .subscribe(
       (res: any[]) => this.snoozeReasonsList = res,
       (err: HttpErrorResponse) => console.log("Error fetching snooze reasons list")
     )
   }
}
