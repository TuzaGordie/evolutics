import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IDocMetadata, KVP } from '../Shared/models/index.model';
import { ApiService } from './api.service';
import { Observable, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UtilityService } from './utility.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IDocBoxNoResponse, IDocument } from '../Reusables/reusable-pages/document-list/document.interface';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  get baseURL() {
    return environment.apiBaseUrl + '/rest/';
  }

  retrievedDoocumentList: any = [];
  documentRetrived = false;

  constructor(
    private apiService: ApiService,
    private utilityService: UtilityService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getRefCategory = () => {
    return this.apiService.get(
      this.baseURL + 'codes/sub/category/REF_CATEGORY'
    );
  };

  getRefNo(refCategory: any, refNo: any) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain; charset=utf-8'
    );
    return this.apiService.get(
      this.baseURL + `document/search/details/${refCategory}/${refNo}`,
      null,
      { headers, responseType: 'text' }
    );
  }

  uploadDocument(document: string, file: File) {
    const formData: FormData = new FormData();
    const headers = new HttpHeaders({ enctype: 'multipart/form-data' });
    formData.append('file', file, file.name);
    formData.append('document', document);
    return this.apiService.post<IDocument>(this.baseURL + 'document/', formData, {
      headers: headers,
    });
  }

  upload(file: File, metadata: IDocMetadata) {
    const formData: FormData = new FormData(); 
    formData.append('file', file, file.name);
    formData.append('document', JSON.stringify(metadata));
    return this.apiService.postFile(this.baseURL + 'document/', formData);
  }

  uploadBulkDocument(file: any) {
    const formData: FormData = new FormData();
    const headers = new HttpHeaders({ enctype: 'multipart/form-data' });
    formData.append('file', file, file.name);
    return this.apiService.post(
      this.baseURL + 'document/bulk/upload',
      formData,
      { headers: headers }
    );
  }
  getUserBoxNo = (userCode: string ) => {
    return this.apiService.get<IDocBoxNoResponse>(
      this.baseURL +
        `users/box/${userCode}`
    );
  };

  getCompany = () => {
    return this.apiService.get(this.baseURL + 'company/code/desc');
  };

  getCategory = () => {
    return this.apiService.get(
      this.baseURL + 'codes/sub/category/DOCUMENT_CATEGORY'
    );
  };

  getSubCategory = (categoryCode: any) => {
    return this.apiService.get(
      this.baseURL +
        `codes/sub/category/DOCUMENT_SUBCATEGORY/${categoryCode}`
    );
  };

  getBranch = () => {
    return this.apiService.get(this.baseURL + 'branch/code/desc');
  };

  getSensitivity = () => {
    return this.apiService.get(
      this.baseURL + 'codes/sub/category/DOCUMENT_SENSITIVITY'
    );
  };

  getWorkflowCategory = () => {
    return this.apiService.get(
      this.baseURL + 'codes/sub/category/WORKFLOW_GROUP'
    );
  };

  getWorkflow = (workflowCategoryCode: any) => {
    return this.apiService.get(
      this.baseURL + `workflows/task/group/${workflowCategoryCode}`
    );
  };

  getPolicyCode(code) {
    return this.apiService.get(this.baseURL + `policy/code/policy/no/${code}`);
  }

  getBusLine() {
    return this.apiService.get(this.baseURL + `codes/sub/category/BUS_LINE`);
  }

  documentMapping(
    company: string,
    docCat: string,
    docSubCat: string,
    taskCode: string,
    wfCat: string
  ) {
    return this.apiService.post(this.baseURL + 'document/mapping/', {
      company,
      docCat,
      docSubCat,
      taskCode,
      wfCat,
    });
  }

  retrieveDocument(
    refCategory?: string,
    category?: string,
    subCategory?: string,
    company?: string,
    branch?: string,
    busline?: string,
    sensitivity?: string,
    boxNo?: string,
    refNo?: string,
    title?: string
  ) {
    return this.apiService
      .get(
        this.baseURL +
          `document/search?refCategory=${refCategory}&category=${category}&subCategory=${subCategory}&company=${company}&branch=${branch}&busLine=${busline}&refNo=${refNo}&sensitivity=${sensitivity}&boxNo=${boxNo}&title=${title}`
      )
      .subscribe((data: any) => {
        this.documentRetrived = true;
        this.retrievedDoocumentList = data;
        console.log('document service', data);
        this.router.navigate(['document/retrieve-list'], {
          relativeTo: this.route,
        });
      });
  }

  retrieveClientPassport(clientNo: string): Observable<string> {
    // get storage service base url
    const docBaseUrl$ = this.retrieveDocumentsBaseURL();
    // fetch passport documents for this client. subCategory=PP and refNo=clientNo
    const passportDocs$ = this.retrievePassportDocuments(clientNo);
    // select the first document that is actually a picture. Some docs returned by passport api are not actually images
    const passportDoc$ = passportDocs$.pipe(
      map((docs) => (Array.isArray(docs) ? docs : [])),
      map((docs) =>
        docs.find(
          (doc) =>
            this.utilityService.isPictureFormat(doc?.fileName) &&
            doc?.docKey != null
        )
      )
    );

    return forkJoin([docBaseUrl$, passportDoc$]).pipe(
      map(([docBaseUrl, doc]) =>
        doc ? `${docBaseUrl}/${doc.docKey}/${doc.fileName}` : ''
      )
    );
  }

  retrieveDocumentsBaseURL = () => {
    return this.apiService.getText(
      this.baseURL+'global-options/awsBaseEndpoint'
    );
  };

  retrievePassportDocuments = (clientNo: string) => {
    return this.apiService.get(
      `${this.baseURL}document/view/client/other_kyc/${clientNo}/PP`
    );
  };

  fetchAllBatchlogFiles = (pageNumber?: number, pageSize?: number) => {
    console.log(pageNumber, pageSize);
    return this.apiService.get(
      this.baseURL +
        `batch/log/file/search?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  };

  searchBatchlogFiles(
    batchCode?: string,
    createdDateFrom?: string,
    createdDateTo?: string,
    fileName?: string,
    pageNumber?: number,
    pageSize?: number,
    processCode?: string,
    sortBy?: string
  ) {
    return this.apiService.get(
      this.baseURL +
        `batch/log/file/search?batchCode=${batchCode}&createdDateFrom=${createdDateFrom}&createdDateTo=${createdDateTo}&fileName=${fileName}&pageNumber=${pageNumber}&pageSize=${pageSize}&processCode=${processCode}&sortBy=${sortBy}`
    );
  }

  fetchAllDocuments = (pageNumber?: number, pageSize?: number) => {
    console.log(pageNumber, pageSize);
    return this.apiService.get(
      this.baseURL +
        `file-options?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  };

  searchDocument(
    createdDateFrom?: string,
    createdDateTo?: string,
    fileName?: string,
    pageNumber?: number,
    pageSize?: number
  ) {
    return this.apiService.get(
      this.baseURL +
        `file-options?createdDateFrom=${createdDateFrom}&createdDateTo=${createdDateTo}&fileName=${fileName}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  deleteDocuments = (deleteFileOptionsRequestList: any) => {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: deleteFileOptionsRequestList,
    };
    return this.apiService.delete(this.baseURL + 'file-options', httpOptions);
  };

  viewFile(awsConstant) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain; charset=utf-8'
    );
    return this.apiService.get(
      this.baseURL + `global-options/${awsConstant}`,
      null,
      {
        headers,
        responseType: 'text',
      }
    );
  }

  getDocumentSensitivity = (pageNumber?: number, pageSize?: number, searchParams = {}) => {
    console.log(pageNumber, pageSize);
    let params = Object.entries(searchParams).reduce((query, [key, value]) => `${query}&${key}=${value}` , '')
    return this.apiService.get(
      this.baseURL + `document/sensitivity?pageNumber=${pageNumber}&pageSize=${pageSize}${params}`
    );
  };

  createDocumentSensitivity = (data) => {
    return this.apiService.post(
      this.baseURL + 'document/sensitivity', data
    )
  }

  updateDocumentSensitivity = (id, data) => {
    return this.apiService.put(
      this.baseURL + 'document/sensitivity/' + id,
      data
    )
  }

  deleteDocumentSensitivity = (id) => {
    return this.apiService.delete(
      this.baseURL + 'document/sensitivity/' + id
    )
  }

  getMappedDocuments = (pageNumber?: number, pageSize?: number, searchParams = {}) => {
    let params = Object.entries(searchParams).reduce((query, [key, value]) => `${query}&${key}=${value}` , '')
    return this.apiService.get(
      this.baseURL + `document/mapping?pageNumber=${pageNumber}&pageSize=${pageSize}${params}`
    );
  };

  createDocumentMapping = (data) => {
    return this.apiService.post(
      this.baseURL + 'document/mapping', data
    )
  }

  updateDocumentMapping = (id, data) => {
    return this.apiService.post(
      this.baseURL + 'document/mapping',
      {...data, id}
    )
  }

  deleteDocumentMapping = (id) => {
    return this.apiService.delete(
      this.baseURL + 'document/mapping/' + id
    )
  }

  getDocumentTypesByTableGroup(tableGroup){
    return this.apiService.get(
      `${this.baseURL}correspondence/table/group/${tableGroup}`
    )
  }

  generateDocument(parameters: Object){
    const query = Object.entries(parameters)
      .map(([key, value]) => (value ? `${key}=${value}` : false))
      .filter((item) => !!item)
      .join('&');

    return this.apiService.get(
      `${this.baseURL}correspondence/generate?${query}`
    )
  }
}
