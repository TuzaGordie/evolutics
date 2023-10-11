import { Component, OnInit } from '@angular/core';
import { FindQuotationService } from '../service/find-quotation.service';
import { AddQuotationDocumentComponent } from '../../quotation-desk/documents/add-document/add-document.component';
import { GenerateDocumentComponent } from '../../quotation-desk/generate-document/generate-document.component';
import { UtilityService } from 'src/app/Services/utility.service';
// import { AddDocumentComponent } from '../';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class QuotationDocumentsComponent implements OnInit {

  documentList: any = [];

  constructor( public findQuotationService: FindQuotationService,public uS: UtilityService,) { }

  ngOnInit(): void {
    this.setDocument()
  }

  setDocument(){
    this.findQuotationService.getDocument(this.findQuotationService.quotationInfo?.agent.clientNo).subscribe( res => {
      this.documentList = res;
      console.log("document Info",res)
    })
  }

  add() {
    this.uS.dialogOpener(
      AddQuotationDocumentComponent,
      { height: 'calc(100vw * 0.368)', width: 'calc(100vw * 0.7569)' },
      () => {}
    );
  }

  gen() {
    this.uS.dialogOpener(
      GenerateDocumentComponent,
      { height: 'calc(100vw * 0.4625)', width: 'calc(100vw * 0.7569)' },
      () => {}
    );
  }

}
