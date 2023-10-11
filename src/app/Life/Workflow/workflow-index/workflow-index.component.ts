import {Component, OnInit} from '@angular/core';
import {FindWorkflowService} from '../service/find-workflow.service';

@Component({
  selector: 'app-workflow-index',
  templateUrl: './workflow-index.component.html',
  styleUrls: ['./workflow-index.component.scss']
})
export class WorkflowIndexComponent implements OnInit {
  constructor(public findWorkflowService: FindWorkflowService) {
  }

  ngOnInit(): void {
  }
}
