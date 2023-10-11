import { Component, OnInit } from '@angular/core';
import { ISnoozeInfo } from '../../service/workflow.interface';
import { ViewWorkflowService } from '../view-workflow.service';

@Component({
  selector: 'app-workflow-snooze-history',
  templateUrl: './workflow-snooze-history.component.html',
  styleUrls: ['./workflow-snooze-history.component.scss']
})
export class WorkflowSnoozeHistoryComponent implements OnInit {
  wfNo: string;
  snoozeList: ISnoozeInfo[] = []
  isEmptyList: boolean = false

  constructor(private viewWfService: ViewWorkflowService) { }

  ngOnInit(): void {
  
    this.wfNo = this.viewWfService.currentWfNo
    this.viewWfService.getSnoozeDetails()
    .subscribe(data => {
      this.snoozeList = data as ISnoozeInfo[]
      if(this.snoozeList.length == 0){
        this.isEmptyList = true
      }
    })
  }


}
