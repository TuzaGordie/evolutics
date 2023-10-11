import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FindWorkflowService } from '../service/find-workflow.service';

@Component({
  selector: 'app-workflow-find-task-list',
  templateUrl: './workflow-find-task-list.component.html',
  styleUrls: ['./workflow-find-task-list.component.scss']
})
export class WorkflowFindtaskListComponent implements OnInit {
  slaLevel: 'Y' | 'G' | 'B' | 'R'
  workflowData:any =[]

  constructor(public workflowService: FindWorkflowService,public route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('wf search ',window.location.search)
    this.workflowService.getFindWorkflow(window.location.search)
    .subscribe((data: any) => {
      this.workflowData = data.page.content
    })
  }
}
