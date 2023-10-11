import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../../../Services/document.service';
import { Sensitivity } from 'src/app/Shared/models/document/sensitivity';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';
import { UtilityService } from 'src/app/Services/utility.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { IBtn, ICodeTitle } from 'src/app/Shared/models/index.model';
import { CreateDocumentSensitivityComponent } from '../create-document-sensitivity/create-document-sensitivity.component';

@Component({
  selector: 'app-setup-document-sensitivity-doc',
  templateUrl: './setup-document-sensitivity-doc.component.html',
  styleUrls: ['./setup-document-sensitivity-doc.component.scss'],
})
export class SetupDocumentSensitivityDocComponent implements OnInit {
  editStatus: any = {};
  isDeletingDoc: any = {};
  isLoading: boolean = true;
  isLoadingSubCategories: any = {};
  // isMapping: boolean = false;
  // baseUrl = environment.apiBaseUrl + '/rest';

  categories: any[] = [];
  subCategories: any = {};
  companies: any[] = [];
  sensitivities: any[] = [];

  documentSensitivitiesForm: FormArray = new FormArray([]);
  documentSensitivityRawData: any;

  searchForm: FormGroup;
  searchFormSubCategories: ICodeTitle[];

  itemsPerPageParmeters: any[];
  pages: any[] = [];

  pageSize: number = 10;
  pageNumber: number = 1;
  totalPages: number;
  totalCount: number;

  dataRetrieved = false;

  constructor(
    private documentService: DocumentService,
    private apiService: ApiService,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.getItemsPerPage();
    this.getCategories();
    this.getCompanies();
    this.getSensitivities();
    this.initializeSearchForm();
    this.fetchAllRecords();
  }

  initializeSearchForm() {
    this.searchForm = new FormGroup({
      id: new FormControl('search'),
      documentCategory: new FormControl(null),
      documentSubCategory: new FormControl(null),
      companyCode: new FormControl(null),
      sensitivity: new FormControl(null),
    });
  }

  fetchAllRecords() {
    this.dataRetrieved = false;
    this.pageNumber = 1;
    this.searchForm.reset();
    this.search();
  }

  newSensitivityForm(data: any = {}) {
    return new FormGroup({
      id: new FormControl(data.id),
      documentCategory: new FormControl(data.documentCategory),
      documentSubCategory: new FormControl(data.documentSubCategory),
      companyCode: new FormControl(data.companyCode),
      sensitivity: new FormControl(data.sensitivity),
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
      .getDocumentSensitivity(this.pageNumber, this.pageSize, {
        ...query,
        sortBy: 'authOn',
      })
      .subscribe((data: any) => {
        this.dataRetrieved = true;
        this.documentSensitivityRawData = data;
        console.log('document sensitivity', data);
        if (Array.isArray(data.content)) {
          this.documentSensitivitiesForm.clear();
          data.content.forEach((item) => {
            this.documentSensitivitiesForm.push(this.newSensitivityForm(item));
          });
        }
        this.totalPages = this.documentSensitivityRawData.totalPages;
        this.totalCount = this.documentSensitivityRawData.totalElements;
        this.setPages();
      })
      .add(() => (this.isLoading = false))
      // fetch subCategories for all categories
      .add(() => {
        this.documentSensitivitiesForm.controls.forEach((control: FormControl) => {
          this.getSubCategories(control)
        })
      })
  }

  getItemsPerPage() {
    this.itemsPerPageParmeters = [
      { number: '5' },
      { number: '10' },
      { number: '20' },
      { number: '50' },
      { number: '100' },
    ];
  }

  setPages() {
    let previous = this.pageNumber - 1;
    let current = this.pageNumber;
    let next = this.pageNumber + 1;

    this.pages = [previous, current, next];

    if (previous < 1) {
      this.pages.shift();
    }

    if (next > this.totalPages) {
      this.pages.splice(-1);
    }
  }

  first() {
    this.pageNumber = 1;
    this.search();
  }

  previous() {
    if (this.pageNumber <= 1) {
      return;
    } else {
      this.pageNumber = this.pageNumber - 1;
      console.log(this.pageNumber);
      this.search();
    }
  }

  toPageNumber(number: number) {
    this.pageNumber = number;
    this.search();
  }

  next() {
    if (this.pageNumber >= this.totalPages) {
      return;
    } else {
      this.pageNumber = this.pageNumber + 1;
      console.log(this.pageNumber);
      this.search();
    }
  }

  last() {
    this.pageNumber = this.totalPages;
    this.search();
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
      .getSubCategory(document.value.documentCategory)
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

  getSensitivities() {
    this.documentService.getSensitivity().subscribe((data: any) => {
      this.sensitivities = data;
    });
  }

  // mapDocument(data) {
  //   this.isMapping = true
  //   const createdBy = environment.user?.code;
  //   this.apiService.post(this.baseUrl + '/document/sensitivity', {...data, createdBy}).subscribe((data: any) => {
  //     console.log("mapDocument return data: ", data)
  //     this.utilityService.info("Sensitivity Saved")
  //   }).add(() => this.isMapping = false)
  // }

  confirmDelete(document) {
    const btns: IBtn[] = [
      {
        value: 'Yes',
        action: () => this.deleteDocument(document),
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

  deleteDocument(document) {
    this.isDeletingDoc[document.value.id] = true;
    
    this.documentService.deleteDocumentSensitivity(document.value.id).subscribe(
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
      .updateDocumentSensitivity(document.value.id, { ...document.value, createdBy })
      .subscribe(
        (data) => {
          this.utilityService.notify(`Document Sensitivity ${document.value.id} updated successfully`, 1);
          document.patchValue(data);
          this.editStatus[document.value.id] = 'VIEW';
        },
        (err) => {
          this.utilityService.notify(`Error updating document sensitivity ${document.value.id}`, 0);
          this.editStatus[document.value.id] = 'EDITING';
        }
      );
  }

  openCreateModal() {
    this.utilityService.dialogOpener(
      CreateDocumentSensitivityComponent,
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
