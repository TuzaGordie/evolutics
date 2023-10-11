import { Component, OnInit } from '@angular/core';
import { IWorkflowDocument } from '../../service/workflow.interface';
import { ViewWorkflowService } from '../view-workflow.service';

@Component({
  selector: 'app-workflow-documents',
  templateUrl: './workflow-documents.component.html',
  styleUrls: ['./workflow-documents.component.scss']
})
export class WorkflowDocumentsComponent implements OnInit {

  constructor(private viewWfService: ViewWorkflowService) { }

  wfNo: string
  ownerName: string = ''
  documentList: IWorkflowDocument[] = []
  isEmptyList: boolean = false

  ngOnInit(): void {

    this.wfNo = this.viewWfService.currentWfNo
    this.viewWfService.getDocumentDetails()
      .subscribe(data => {
        this.documentList = data as IWorkflowDocument[]
        if (this.documentList.length == 0) {
          this.isEmptyList = true
        }
      })
  }

}