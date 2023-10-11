import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FindWorkflowService } from '../../service/find-workflow.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-error-workflow',
  templateUrl: './error-workflow.component.html',
  styleUrls: ['./error-workflow.component.scss']
})
export class ErrorWorkflowComponent implements OnInit {
  errorReasonsList: any[] = []
  errorSeveritiesList: any[] = []

  @ViewChild('launchBtn', { static: true }) launchBtn: ElementRef;
  @ViewChild('closeBtn', { static: true }) closeBtn: ElementRef;

  constructor(private location: Location, private workflowService: FindWorkflowService) { }

  onCloseClick(){
    this.location.back()
  }

  ngOnInit(): void {
    this.setErrorReasonsList()
    this.setErrorSeveritiesList()
  }
  ngAfterViewInit() {
    this.launchBtn.nativeElement.click()
 }
  ngOnDestroy () {
      this.closeBtn.nativeElement.click()
 }
 
 setErrorReasonsList(){
  this.workflowService.getErrorReasonsList()
    .subscribe(
      (res: any[]) => this.errorReasonsList = res,
      (err: HttpErrorResponse) => console.log("Error fetching error reasons", err)
    )
 }
 setErrorSeveritiesList(){
  this.workflowService.getErrorSeveritiesList()
    .subscribe(
      (res: any[]) => this.errorSeveritiesList = res,
      (err: HttpErrorResponse) => console.log("Error fetching error severity", err)
    )
 }


}
