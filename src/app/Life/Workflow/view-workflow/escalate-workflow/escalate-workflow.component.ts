import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-escalate-workflow',
  templateUrl: './escalate-workflow.component.html',
  styleUrls: ['./escalate-workflow.component.scss']
})
export class EscalateWorkflowComponent implements OnInit {

  @ViewChild('launchBtn', { static: true }) launchBtn: ElementRef;
  @ViewChild('closeBtn', { static: true }) closeBtn: ElementRef;

  constructor(private location: Location) { }

  onCloseClick(){
    this.location.back()
  }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.launchBtn.nativeElement.click()
 }
  ngOnDestroy () {
      this.closeBtn.nativeElement.click()
 }
}
