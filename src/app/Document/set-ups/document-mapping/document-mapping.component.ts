import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';
import { IBtn, ICodeTitle } from 'src/app/Shared/models/index.model';
import { DocumentService } from '../../../Services/document.service';
import { environment } from 'src/environments/environment'
import { CreateDocumentMappingComponent } from './create-document-mapping/create-document-mapping.component';

@Component({
  selector: 'app-document-mapping',
  templateUrl: './document-mapping.component.html',
  styleUrls: ['./document-mapping.component.scss'],
})
export class DocumentMappingComponent implements OnInit {
  editStatus: any = {};
  isDeletingDoc: any = {};
  isLoading: boolean = true;
  isLoadingSubCategories: any = {};
  isLoadingWorkflows: any = {};

  categories: any[] = [];
  subCategories: any = {};
  companies: any[] = [];
  workflowCategories: any[] = [];
  workflows: any = {};

  documentMappingsForm: FormArray = new FormArray([]);

  searchForm: FormGroup;
  searchFormSubCategories: ICodeTitle[];
  searchFormWorkflows: ICodeTitle[];

  itemsPerPageParmeters: any[];
  pages: any[] = [];

  pageSize: number = 10;
  pageNumber: number = 1;
  totalPages: number;
  totalCount: number;

  dataRetrieved = false;

  constructor(
    private documentService: DocumentService,
    private utilityService: UtilityService,
  ) {}

  ngOnInit(): void {
    this.getItemsPerPage();
    this.getCategories();
    this.getCompanies();
    this.getWorkflowCategories();
    this.initializeSearchForm();
    this.fetchAllRecords();
  }

  initializeSearchForm() {
    this.searchForm = new FormGroup({
      id: new FormControl('search'),
      docCat: new FormControl(null),
      docSubCat: new FormControl(null),
      company: new FormControl(null),
      wfCat: new FormControl(null),
      taskCode: new FormControl(null),
    });
  }

  fetchAllRecords() {
    this.dataRetrieved = false;
    this.pageNumber = 1;
    this.searchForm.reset();
    this.search();
  }
// this.documentService.getMappedDocuments(this.pageNumber, this.pageSize).subscribe((data: any) => {
//   this.dataRetrieved = true;
//   this.mappedDocumentRawList = data;
//   this.mappedDocument = this.mappedDocumentRawList.content;
//   console.log('mapped documents', data)
//   this.totalPages = this.mappedDocumentRawList.totalPages;
//   this.totalCount = this.mappedDocumentRawList.totalElements;
//   this.getPages();
//   this.connection.searching = false;

// },
// error => {
//   this.connection.searching = false;
//   this.connection.error = true;
// });

newMappingForm(data: any = {}) {
  return new FormGroup({
    id: new FormControl(data.id),
    docCat: new FormControl(data.docCat),
    docSubCat: new FormControl(data.docSubCat),
    company: new FormControl(data.company),
    wfCat: new FormControl(data.wfCat),
    taskCode: new FormControl(data.taskCode),
    createdBy: new FormControl(data.createdBy),
  });
}

  search() {
    let query = { ...this.searchForm.value };
    // remove id from search form
    delete query.id;
    // remove null properties
    for (let key of Object.keys(query)) {
      if (query[key] == null) {
        delete query[key];
      }
    }
    this.isLoading = true;
    this.documentService
      .getMappedDocuments(this.pageNumber, this.pageSize, {
        ...query,
        sortBy: 'authOn',
      })
      .subscribe((data: any) => {
        this.dataRetrieved = true;
        if (Array.isArray(data.content)) {
          this.documentMappingsForm.clear();
          data.content.forEach((item) => {
            this.documentMappingsForm.push(this.newMappingForm(item));
          });
        }
        this.totalPages = data.totalPages;
        this.totalCount = data.totalElements;
        this.setPages();
      })
      .add(() => (this.isLoading = false))
      // fetch subCategories for all categories and workflows for all workflowCategories
      .add(() => {
        this.documentMappingsForm.controls.forEach((control: FormControl) => {
          this.getSubCategories(control);
          this.getWorkflows(control);
        })
      })
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

  setPages() {
    let previous = this.pageNumber - 1;
    let current  = this.pageNumber;
    let next = this.pageNumber + 1;

    this.pages = [previous, current, next]

    if(previous < 1) {
      this.pages.shift();
    }

    if(next > this.totalPages) {
      this.pages.splice(-1);
    }
  }

  first() {
    this.pageNumber = 1;
    this.search()
  }

  previous() {
    if(this.pageNumber <= 1) {
      return
    }else{
      this.pageNumber = this.pageNumber - 1;
      console.log(this.pageNumber)
      this.search()
    }
  }

  toPageNumber(number: number) {
    this.pageNumber = number;
    this.search()
  }

  next() {
    if(this.pageNumber >= this.totalPages) {
      return
    }else{
      this.pageNumber = this.pageNumber + 1;
      console.log(this.pageNumber)
      this.search()
    }
  }

  last() {
    this.pageNumber = this.totalPages;
    this.search()
  }

  getCategories() {
    this.documentService.getCategory().subscribe((data: any) => {
      this.categories = data;
    });
  }

  onCategoryChange(document) {
    this.getSubCategories(document);
  }

  getSubCategories(document) {
    this.isLoadingSubCategories[document.value.id] = true;
    this.documentService
      .getSubCategory(document.value.docCat)
      .subscribe((data: any) => {
        this.subCategories[document.value.id] = data;
      })
      .add(() => (this.isLoadingSubCategories[document.value.id] = false));
  }

  getCompanies() {
    this.documentService.getCompany().subscribe((data: any) => {
      this.companies = data;
    });
  }


  getWorkflowCategories() {
    this.documentService.getWorkflowCategory().subscribe((data: any) => {
      this.workflowCategories = data;
    });
  }


  onWorkflowCategoryChange(document) {
    this.getWorkflows(document);
  }

  getWorkflows(document) {
    this.isLoadingWorkflows[document.value.id] = true;

    this.documentService
      .getWorkflow(document.value.wfCat)
      .subscribe((data: any) => {
        this.workflows[document.value.id] = data;
      })
      .add(() => this.isLoadingWorkflows[document.value.id] = false)
  }

  confirmDelete(document) {
    const btns: IBtn[] = [
      {
        value: 'Yes',
        action: () => this.deleteDocumentMapping(document),
        type: 'primary',
      },
      { value: 'No', action: () => {} },
    ];
    this.utilityService.info(
      'Are you sure you want to delete this record?',
      0,
      '',
      btns
    );
  }

  deleteDocumentMapping(document) {
    this.isDeletingDoc[document.value.id] = true;
    
    this.documentService.deleteDocumentMapping(document.value.id).subscribe(
      res => this.utilityService.notify(`Document ${document.value.id} succesfully deleted`)
        // refresh data after deleting
        .afterDismissed().subscribe(() => this.search()),
      err => this.utilityService.notify(`Error deleting document with id ${document.value.id}`, 0)
    ).add(() => this.isDeletingDoc[document.value.id] = false)
  }

  onUpdateDocument(document: any) {
    this.editStatus[document.value.id] = 'PENDING';
    let createdBy = environment.user?.code;
    this.documentService
      .updateDocumentMapping(document.value.id, { ...document.value, createdBy })
      .subscribe(
        (data) => {
          this.utilityService.notify(`Document Mapping ${document.value.id} updated successfully`, 1);
          document.patchValue(data);
          // get the subcategory and workflow options
          this.getSubCategories(document);
          this.getWorkflows(document);
          this.editStatus[document.value.id] = 'VIEW';
        },
        (err) => {
          this.utilityService.notify(`Error updating document mapping ${document.value.id}`, 0);
          this.editStatus[document.value.id] = 'EDITING';
        }
      );
  }

  openCreateModal() {
    this.utilityService.dialogOpener(
      CreateDocumentMappingComponent,
      { minWidth: '50vw' },
      (r) => {
        // refresh
        if (r.success) {
          this.fetchAllRecords();
        }
      }
    );
  }
}
