import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../Services/document.service';
import { saveAs } from 'file-saver';
import { StorageService } from 'src/app/Services/storage.service'


@Component({
  selector: 'app-document-retrieve-list',
  templateUrl: './document-retrieve-list.component.html',
  styleUrls: ['./document-retrieve-list.component.scss']
})
export class DocumentRetrieveListComponent implements OnInit {

  constructor(private documentService: DocumentService, private store: StorageService) { }

  documents: any = []
  csvData: any[]= [];

  ngOnInit(): void {
    this.getDocumentRetriveList();
  }

  exportToExcel() {
    let data = this.csvData

    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], {type: 'text/csv' })
    saveAs(blob, "retrieved-document.csv");
  }

  getCsvData() {
    this.documents.forEach(item => {
      this.csvData.push({
        refNo: item.refNo,
        refCat: item.refCat,
        fileName: item.fileName,
        title: item.title,
        company: item.company,
        creayedBy: item.creayedBy,
        creayedOn: item.creayedOn,
        revisedSla: item.revisedSla,
        docBox: item.docBox,
        busLine: item.busLine
      })
    })    
  }

  getDocumentRetriveList() {
    this.documents = this.documentService.retrievedDoocumentList;
    this.getCsvData();
  }

}
