import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/Services/client.service';
import { CorrespondenceService } from 'src/app/Services/life/correspondence.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { IDocMetadata } from 'src/app/Shared/models/index.model';
import { ERModule } from '../../reusable-extras/reusable.model';
import { AddDocumentModalComponent } from '../../reusable-comps/add-document-modal/add-document-modal.component';
import { DocumentListService } from './document-list.service';
import { IDocument } from './document.interface';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
})
export class DocumentListComponent implements OnInit {
  documentList: IDocument[] = [];
  branchList: any = [];
  categoryList: any = [];
  sensitivityList: any = [];
  subCategoryList: any[] = [];
  howList: any[] = [];
  addDocForm: FormGroup;
  clientFullName: string;
  documentsBaseURL: string;
  refCat: ERModule;
  correspondenceList = [];
  loading: boolean;
  loadingTable: boolean;
  policyCode: string;
  policyNo: string;
  policyNoSuffix: string;
  clientNo: string;
  agentNo: string;
  providerNo: string;
  enroleeNoSuffix: string;
  enroleeNo: string;
  workflowNo: string;

  filterDocsForm: FormGroup;
  filteredDocsList: any[];
  loadingSubCategories: boolean = false;
  paymentNo: string;
  private _mainNo: string;
  groupNo: string;
  set refNo(v: string) {
    this._mainNo = v || this._mainNo;
  }
  get refNo() {
    return this._mainNo;
  }
  constructor(
    public docS: DocumentListService,
    public cliS: ClientService,
    public corS: CorrespondenceService,
    public route: ActivatedRoute,
    public router: Router,
    public uS: UtilityService
  ) {}

  ngOnInit(): void {
    this.refNo = this.clientNo =
      this.route.snapshot.queryParamMap.get('clientNo');
    this.refNo = this.agentNo =
      this.route.snapshot.queryParamMap.get('agentNo');
    this.refNo = this.enroleeNo =
      this.route.snapshot.queryParamMap.get('enroleeNo');
      this.refNo = this.groupNo =
        this.route.snapshot.queryParamMap.get('groupNo');
    this.refNo = this.paymentNo =
      this.route.snapshot.queryParamMap.get('paymentNo');
    this.refNo = this.enroleeNoSuffix =
      this.route.snapshot.queryParamMap.get('enroleeNoSuffix');
    this.policyCode = this.route.snapshot.queryParamMap.get('policyCode');
    this.refNo = this.policyNo =
      this.route.snapshot.queryParamMap.get('policyNo');
    this.policyNoSuffix =
      this.route.snapshot.queryParamMap.get('policyNoSuffix');
    this.refNo = this.providerNo =
      this.route.snapshot.queryParamMap.get('providerNo');
    this.refNo = this.workflowNo =
      this.route.snapshot.queryParamMap.get('workflowNo');

    let id = this.refNo;
    this.refCat = this.route.snapshot.data.rModule;
    console.log('config', id, this.refCat);
    if (this.isPolicy) {
    } else {
      this.getDocuments(this.refNo);
    }
    this.getHows();
    this.createForm();
    this.getBranches();
    this.getCategories();
    this.getSensitivities();
    this.setDocumentsBaseUrl();
    this.getModuleCorrespondence();
    this.setClientFullName(this.clientNo || id);
    this.createFilterDocsForm();
    this.setDocumentsBaseUrl();
    this.getModuleCorrespondence();
    this.setClientFullName(this.clientNo || id);
  }
  get isClient() {
    return this.refCat == ERModule.client;
  }
  get isPolicy() {
    return this.refCat == ERModule.policy;
  }
  get isWorkflow() {
    return this.refCat == ERModule.workflow;
  }
  get isAgent() {
    return this.refCat == ERModule.agent;
  }

  createForm() {
    this.addDocForm = new FormGroup({
      file: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      sensitivity: new FormControl('', Validators.required),
      branch: new FormControl('', Validators.required),
      boxNo: new FormControl(''),
    });
  }

  getBranches() {
    this.docS.getBranchList().subscribe((data) => {
      this.branchList = data;
    });
  }

  getCategories() {
    this.docS.getCategory().subscribe((data) => {
      this.categoryList = data;
    });
  }

  getSubCategories() {
    this.loadingSubCategories = true;
    this.docS.getSubCategoryList(this.filterDocsForm.value.category).subscribe(
      (res) => {
        this.subCategoryList = res;
        this.loadingSubCategories = false;
      },
      (err: HttpErrorResponse) => {
        this.loadingSubCategories = false;
      }
    );
  }

  getHows() {
    this.docS.getHowList().subscribe((res) => (this.howList = res));
  }

  getSensitivities() {
    this.docS.getSensitivityList().subscribe((data) => {
      this.sensitivityList = data;
    });
  }

  async getDocuments(mainNo: string) {
    this.loadingTable = true;
    try {
      this.filteredDocsList = this.documentList = await this.docS
        .getDocuments(this.refCat, mainNo)
        .toPromise();
      console.log('document Info', this.documentList);
      this.loadingTable = false;
    } catch (error) {
      console.log('loading documents error', error);
      this.loadingTable = false;
    }
  }

  setClientFullName(clientNo) {
    this.cliS.getClientNameByNum(clientNo).subscribe(
      (fullName: string) => (this.clientFullName = fullName),
      (err) =>
        console.log(
          "Error fetching client's full name for client number: ",
          clientNo,
          err
        )
    );
  }

  setDocumentsBaseUrl() {
    this.docS.getDocumentsbaseURL().subscribe(
      (res: string) => (this.documentsBaseURL = res),
      (err) =>
        console.error(
          'Error fetching base url for documents storage service',
          err
        )
    );
  }

  downloadDocument(event: Event, document) {
    event.preventDefault();
    this.docS.validateDownload(document?.code).toPromise().then(r=>{
    //   debugger
    const { docKey, name } = document;
    const url = `${this.documentsBaseURL}/${docKey}/${name}`;
    console.log('download link', url);
    window.open(url);
    }).catch(e=>{
      this.uS.info(`You are not authorised to download document ${document?.code}`,0)
    })
  }

  getModuleCorrespondence() {
    let rModule: string;
    if (this.refCat == ERModule.agent) rModule = 'agent';
    else if (this.refCat == ERModule.client) rModule = 'client';
    else if (this.refCat == ERModule.policy) rModule = 'policy';
    else if (this.refCat == ERModule.workflow) rModule = 'workflow';
    else if (this.refCat == ERModule.quotation) rModule = 'policy';
    return rModule
      ? this.corS
          .getTableGroupCorrespondence(rModule)
          .subscribe((r) => (this.correspondenceList = r))
      : null;
  }

  generateCorrespondence(documentCode: string) {
    this.loading = true;
    // this.uS.notify('Please Wait');
    this.corS
      .generateCorrespondenceFile({
        refNo:this.refNo,
        refCat:this.refCat,
        documentCode,
      })
      .subscribe(
        (data) => {
          this.loading = false;
          this.uS.info(`Correspondence ${documentCode} Generated`, 1);
        },
        (err) => {
          console.log(err);
          this.loading = false;
          this.uS.info('Correspondence Generation Failed', 0);
        }
      );
  }
  openAddDocument() {
    this.uS.dialogOpener(
      AddDocumentModalComponent,
      {
        width: '50%',
        maxWidth: '90%',
        maxHeight: '90vh',
        data: {
          document: <IDocMetadata>{ refCat: this.refCat, refNo: this.refNo },
        },
      },
      async (r: {
        metadataForm: FormGroup;
        metadata: IDocMetadata;
        file: File;
      }) => {
        this.loadingTable = true;
        const fd = new FormData();
        if(this.isPolicy)r.metadata={...r.metadata,policyCode:this.policyCode,policyNo:this.policyNo,policyNoSuffix:this.policyNoSuffix}
        fd.append('document', JSON.stringify(r.metadata));
        fd.append('file', r.file, r.file.name);
        const doc = await this.docS.submitDocument(fd).toPromise();
        console.log(r);
        this.uS.info(`Document ${doc.code} was created successfully`);
        this.ngOnInit();
      }
    );
  }

  onCategorySelect() {
    this.filterDocsForm.patchValue({
      subCategory: '',
    });
    this.subCategoryList = [];
    this.getSubCategories();
  }

  clearFilters() {
    this.filterDocsForm.patchValue({
      category: '',
      subCategory: '',
      createdFrom: '',
      createdTo: '',
      how: '',
    });
    this.filteredDocsList = this.documentList;
  }

  filterDocs() {
    let { category, subCategory, createdFrom, createdTo, how } =
      this.filterDocsForm.value;

    // use default times if they have no values
    createdFrom = createdFrom ? new Date(createdFrom).getTime() : 0;
    createdTo = createdTo ? new Date(createdTo).getTime() : Date.now();

    this.filteredDocsList = this.documentList.filter((doc) => {
      const createdOn = new Date(doc.createdOn).getTime();

      // if a field has no value, return true for it (ie don't take it into consideration)
      return (
        (category ? doc.docCat === category : true) &&
        (subCategory ? doc.docSubCat === subCategory : true) &&
        createdOn >= createdFrom &&
        createdOn <= createdTo &&
        (how ? doc.how === how : true)
      );
    });
  }

  createFilterDocsForm() {
    this.filterDocsForm = new FormGroup({
      category: new FormControl(''),
      subCategory: new FormControl(''),
      createdFrom: new FormControl(''),
      createdTo: new FormControl(''),
      how: new FormControl(''),
    });
  }
}
