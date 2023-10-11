import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewWorkflowService } from '../../view-workflow.service';

@Component({
  selector: 'app-workfow-checklist-view',
  templateUrl: './workfow-checklist-view.component.html',
  styleUrls: ['./workfow-checklist-view.component.scss']
})
export class WorkfowChecklistViewComponent implements OnInit {
  checklist
  wfNo
  queryParams
  tcd
  rct
  rno
  constructor(private viewWfService: ViewWorkflowService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.queryParams = this.route.snapshot.queryParamMap
    this.wfNo = this.queryParams.get('wfNo')
    this.tcd = this.queryParams.get('tcd')
    this.rct = this.queryParams.get('rct')
    this.rno = this.queryParams.get('rno')
    this.viewWfService.getWorkflowChecklist(this.wfNo).subscribe( data => {
      console.log(data)
      this.checklist = data
    })
  }

}
