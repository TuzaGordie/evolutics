import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FindWorkflowService } from '../../service/find-workflow.service';

@Component({
  selector: 'app-workflow-tasklist',
  templateUrl: './workflow-tasklist.component.html',
  styleUrls: ['./workflow-tasklist.component.scss']
})
export class WorkflowTasklistComponent implements OnInit {

  workflowData:any =[]


  constructor(public workflowService: FindWorkflowService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.workflowService.checkSearchValue == 'true'){
      this.workflowService.getFindWorkflow().subscribe((res:any)=> {
        console.log(res)
        this.workflowData = res.page.content
        console.log(this.workflowData)
        this.workflowService.checkSearchValue == null
      })
    }
   else{
     console.log("no search values")
     this.workflowService.checkSearchValue == null
   }
  }

}
