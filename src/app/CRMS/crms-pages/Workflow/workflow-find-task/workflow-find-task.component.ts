import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-workflow-find-task',
  templateUrl: './workflow-find-task.component.html',
  styleUrls: ['./workflow-find-task.component.scss']
})
export class WorkflowFindtaskComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  call_workflowserach_list(){
    this.router.navigate(['life/workflow/workflow-find-task-list']);
  }
}
