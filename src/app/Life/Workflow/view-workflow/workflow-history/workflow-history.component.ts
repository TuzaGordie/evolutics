import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewWorkflowService } from '../view-workflow.service';

@Component({
  selector: 'app-workflow-history',
  templateUrl: './workflow-history.component.html',
  styleUrls: ['./workflow-history.component.scss']
})
export class WorkflowHistoryComponent implements OnInit {
  queryParams
  wfNo: string
  history
  tcd: any;
  rct: any;
  rno: any;

  constructor(private viewWfService: ViewWorkflowService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.queryParams = this.route.snapshot.queryParamMap
    this.wfNo = this.queryParams.get('wfNo')
    this.tcd = this.queryParams.get('tcd')
    this.rct = this.queryParams.get('rct')
    this.rno = this.queryParams.get('rno')
    this.viewWfService.getWorkflowHistory(this.wfNo).subscribe(data => {
      console.log(data)
      this.history = data
    })
  }

}
