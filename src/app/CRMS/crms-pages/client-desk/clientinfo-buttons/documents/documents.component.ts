import { Component, OnInit } from '@angular/core';
import { FindClientService } from '../../service/find-client.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class CRMSDocumentsComponent implements OnInit {

  documentList:any = []

  constructor(public findClientService:FindClientService) { }

  ngOnInit(): void {
    this.setDocument()
  }

  setDocument(){
    this.findClientService.getDocument(this.findClientService.clientInfo?.CLIENT_NO).subscribe( res => {
      this.documentList = res;
      console.log("document Info",res)
    })
  }

}
