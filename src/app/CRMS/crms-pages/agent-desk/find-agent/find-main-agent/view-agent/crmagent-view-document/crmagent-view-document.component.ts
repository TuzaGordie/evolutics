import {Component, OnInit} from '@angular/core';
import {FindClientService} from "../../../../../../../CRM/client-desk/service/find-client.service";

@Component({
  selector: 'app-crmagent-view-document',
  templateUrl: './crmagent-view-document.component.html',
  styleUrls: ['./crmagent-view-document.component.scss']
})
export class CRMAgentViewDocumentComponent implements OnInit {
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
