import {Component, OnInit} from '@angular/core';
import {DocumentService} from "../../../Services/document.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-batch-log-file',
  templateUrl: './batch-log-file.component.html',
  styleUrls: ['./batch-log-file.component.scss']
})
export class BatchLogFileComponent implements OnInit {

  isMasterSel: boolean;
  isChecked = false;

  fileName: any;
  batchCode: any;
  processCode: any;
  sortBy: any;
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
  sortParmeters: any[];

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


  constructor(private documentService: DocumentService, private router: Router) {
    this.sortArr('createdOn');
  }

  ngOnInit(): void {
    this.getItemsPerPage();
    this.getSortParmeters();
    this.isMasterSel = false;
    this.fetchAllRecords();
    this.initializeVariables();
  }

  initializeVariables() {
    this.fileName = '';
    this.batchCode = '';
    this.processCode = '';
    this.sortBy = 'id';
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
    this.isMasterSel = this.documentList.every(function (item: any) {
      return item.selected == true;
    })
    this.getCheckedItemList();
  }


  getCheckedItemList() {
    this.checkedDocumentList = [];
    for (var i = 0; i < this.documentList.length; i++) {
      if (this.documentList[i].selected)
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

  getSortParmeters() {
    this.sortParmeters = [
      {item: 'id'},
      {item: 'batchCode'},
      {item: 'companyCode'},
      {item: 'processCode'},
    ];
  }

  fetchAllRecords() {
    this.documentList = [];
    this.connection.searching = true;
    this.connection.error = false;
    this.dataRetrieved = false;

    this.documentService.fetchAllBatchlogFiles(this.pageNumber, this.pageSize).subscribe((data: any) => {
      console.log('batchlog files', data)
      this.dataRetrieved = true;
      this.documentRawList = data;
      this.documentList = this.documentRawList.content;
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

    if (this.startDate === '') {
      this.createdDateFrom = '';
    }
    if (this.endDate === '') {
      this.createdDateTo = '';
    }


    this.connection.creating = true;
    this.documentService.searchBatchlogFiles(this.batchCode, this.createdDateFrom, this.createdDateTo, this.fileName, this.pageNumber, this.pageSize, this.processCode, this.sortBy).subscribe((data: any) => {
      this.documentRawList = data
      this.documentList = this.documentRawList.content
      this.totalPages = this.documentRawList.totalPages;
      this.getCheckedItemList();
      this.getPages();
    });
  }

  search() {
    this.createdDateFrom = this.startDate + ' 00:00:00'
    this.createdDateTo = this.endDate + ' 23:59:59'

    if (this.startDate === '') {
      this.createdDateFrom = null;
    }
    if (this.endDate === '') {
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

  getPages() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  // getPages() {
  //   this.pages = [];
  //   this.pages = [this.pageNumber - 1, this.pageNumber, this.pageNumber + 1];
  //   for (let i = this.pages.length - 1; i >= 0; i--) {
  //     if (this.pages[i] <= 0) {
  //       if (i !== this.pages.length - 1) {
  //         // swap current value with last value
  //         let temp = this.pages[i];
  //         this.pages[i] = this.pages[this.pages.length - 1];
  //         this.pages[this.pages.length - 1] = temp;
  //       }
  //       this.pages.pop();
  //       this.pages.sort( function (a, b) {return a - b;});
  //     }
  //   }
  // }

  viewFile(docKey: string, fileName: string) {
    this.connection.creating = true;
    this.documentService.viewFile(this.awsConstant).subscribe((data: any) => {
        this.awsFileString = data;
        this.router.navigate([]).then(result => {
          window.open(`${this.awsFileString}/${docKey}/${fileName}`, '_blank');
        });
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

  sortArr(colName: any) {
    this.documentList.sort((a, b) => {
      a = a[colName].toLowerCase();
      b = b[colName].toLowerCase();
      return a.localeCompare(b) * this.sortDirection;
    });
  }

}
