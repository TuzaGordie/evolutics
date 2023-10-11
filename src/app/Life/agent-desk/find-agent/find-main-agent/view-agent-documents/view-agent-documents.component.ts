import {Component, OnInit} from '@angular/core';
import {FindClientService} from "../../../../../CRM/client-desk/service/find-client.service";

@Component({
  selector: 'app-view-agent-documents',
  templateUrl: './view-agent-documents.component.html',
  styleUrls: ['./view-agent-documents.component.scss']
})
export class ViewAgentDocumentsComponent implements OnInit {

  documentList: any = []

  constructor(public findClientService: FindClientService) {
  }

  ngOnInit(): void {
    this.setDocument()
  }

  setDocument() {
    this.findClientService.getDocument(this.findClientService.clientInfo?.CLIENT_NO).subscribe(res => {
      this.documentList = res;
      console.log("document Info", res)
    })
  }

}
