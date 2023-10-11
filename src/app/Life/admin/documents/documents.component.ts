import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/Services/document.service';
import { Router } from '@angular/router';
import { GenerateDocsModalComponent } from './generate-docs-modal/generate-docs-modal.component';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class AdminDocumentsComponent implements OnInit {

  isMasterSel: boolean;
  isChecked = false;

  fileName: any;
  pageSize: number = 10;
  pageNumber: number = 1;
  totalPages: number;
  totalCount: number;
  currentPage: any;
  startDate: any;
  endDate: any;
  createdDateFrom: any;
  createdDateTo: any;
  awsConstant: string = 'awsBaseEndpoint'

  searchByParmeters: any[];
  itemsPerPageParmeters: any[];

  documentRawList: any
  documentList: any[] = [];
  pages: any[] = [];

  check: any;
  dataRetrieved = false;

  checkedDocumentList: any;
  checkedDocumentList2: any[] = [];

  awsFile: any[] = [];
  awsFileString: string;

  sortDirection: number;

  connection = {
    creating: false,
    searching: false,
    error: false,
  }
  

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private utilityService: UtilityService,
  ) {
    this.sortArr('createdOn');
  }

  ngOnInit(): void {
    this.getItemsPerPage();
    this.isMasterSel = false;
    this.initializeVariables();
    this.fetchAllRecords();
  }

  initializeVariables() {
    this.fileName = '';
    this.pageSize = 10;
    this.pageNumber = 1;
    this.startDate = '';
    this.endDate = '';
    this.createdDateFrom = '';
    this.createdDateTo = '';
    this.sortDirection = -1; // 1 = ascending, -1 = descending
  }

  checkUncheckAll() {
    for (var i = 0; i < this.documentList.length; i++) {
      this.documentList[i].selected = this.isMasterSel;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.isMasterSel = this.documentList.every(function(item:any) {
        return item.selected == true;
      })
    this.getCheckedItemList();
  }


  getCheckedItemList(){
    this.checkedDocumentList = [];
    for (var i = 0; i < this.documentList.length; i++) {
      if(this.documentList[i].selected)
        this.checkedDocumentList.push({
        "fileName": this.documentList[i].fileName,
        "id": this.documentList[i].id, 
        "selected": this.documentList[i].selected
      });
    }
    this.checkedDocumentList = JSON.stringify(this.checkedDocumentList);
    this.checkedDocumentList2 = JSON.parse(this.checkedDocumentList);
  }

  getItemsPerPage() {
    this.itemsPerPageParmeters = [
      {number: '5'},
      {number: '10'},
      {number: '20'},
      {number: '50'},
      {number: '100'}
    ];
  }

  fetchAllRecords() {
    this.documentList = [];
    this.connection.searching = true;
    this.connection.error = false;
    this.dataRetrieved = false;
    this.pageNumber = 1;

    this.documentService.fetchAllDocuments(this.pageNumber, this.pageSize).subscribe((data: any) => {
      this.dataRetrieved = true;
      this.documentRawList = data;
      this.documentList = this.documentRawList.data;
      this.totalPages = this.documentRawList.totalPages;
      this.totalCount = this.documentRawList.totalCount;
      this.getCheckedItemList();
      this.getPages();
      this.connection.searching = false;
    },
    error => {
      this.connection.searching = false;
      this.connection.error = true;
    });
  }

  newSearch() {
    this.createdDateFrom = this.startDate + ' 00:00:00';
    this.createdDateTo = this.endDate + ' 23:59:59';
    this.pageNumber = 1;
    
    if(this.startDate === '') {
      this.createdDateFrom = null;
    }
    if(this.endDate === '') {
      this.createdDateTo = null;
    }
    
    
    this.connection.creating = true;
    this.documentService.searchDocument(this.createdDateFrom, this.createdDateTo, this.fileName, this.pageNumber, this.pageSize).subscribe((data: any) => {
      this.documentRawList = data
      this.documentList = this.documentRawList.data
      this.totalPages = this.documentRawList.totalPages;
      this.getCheckedItemList();
      this.getPages();
    });
  }

  search() {
    this.createdDateFrom = this.startDate + ' 00:00:00'
    this.createdDateTo = this.endDate + ' 23:59:59'
    
    if(this.startDate === '') {
      this.createdDateFrom = null;
    }
    if(this.endDate === '') {
      this.createdDateTo = null;
    }
    
    this.connection.creating = true;
    this.documentService.searchDocument(this.createdDateFrom, this.createdDateTo, this.fileName, this.pageNumber, this.pageSize).subscribe((data: any) => {
      this.documentRawList = data
      this.documentList = this.documentRawList.data
      this.totalPages = this.documentRawList.totalPages;
      this.getCheckedItemList();
      this.getPages();
    });
  }

  first() {
    this.pageNumber = 1;
    this.search()
  }

  previous() {
    this.pageNumber = this.pageNumber - 1;
    console.log(this.pageNumber)
    this.search()
  }

  toPageNumber(number: number) {
      this.pageNumber = number;
      this.search()
  }

  next() {
    this.pageNumber = this.pageNumber + 1;
    this.search()
  }

  last() {
    this.pageNumber = this.totalPages;
    this.search()
  }


  // getPages() {
  //   this.pages = [];
  //   for (let i = 1; i <= this.totalPages; i++) {
  //     this.pages.push(i);
  //   }
  // }

  getPages() {
    let first = this.pageNumber - 1;
    let current  = this.pageNumber;
    let last = this.pageNumber + 1;

    this.pages = [first, current, last]

    if(first < 1) {
      this.pages.shift();
    }

    if(last > this.totalPages) {
      this.pages.splice(-1);
    }
  }


  viewFile(docKey: string, fileName: string) {
    this.connection.creating = true;
    this.documentService.viewFile(this.awsConstant).subscribe((data: any) => {
      this.awsFileString = data;
      this.router.navigate([]).then(result => {window.open(`${this.awsFileString}/${docKey}/${fileName}`, '_blank');});
    },
    error => {
      this.connection.creating = false;
      this.connection.error = true;
    });
  }

  delete() {
    this.connection.creating = true;
    this.documentService.deleteDocuments(this.checkedDocumentList2).subscribe((data: any) => {
      this.connection.creating = false;
      location.reload();
    });
  }

  onSortClick(event) {
    let target = event.currentTarget; 
    let classList = target.classList;
    if (classList.contains('fa-angle-double-up')) {
        classList.remove('fa-angle-double-up');
        classList.add('fa-angle-double-down');
        this.sortDirection = 1;
    } else {
        classList.add('fa-angle-double-up');
        classList.remove('fa-angle-double-down');
        this.sortDirection = -1;
    }
    this.sortArr('createdOn');
  }

  sortArr(colName:any){
    this.documentList.sort((a,b)=>{
      a = a[colName].toLowerCase();
      b = b[colName].toLowerCase();
      return a.localeCompare(b) * this.sortDirection;
    });
  }

  openGenerateDocumentsModal(){
    this.utilityService.dialogOpener(
      GenerateDocsModalComponent,
      {
        minWidth: '50vw'
      },
      (r) => {
        // refresh
        this.fetchAllRecords()
      }
    )
  }
}
