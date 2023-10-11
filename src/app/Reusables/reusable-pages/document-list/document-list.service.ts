import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import {
  ICodeDescription,
  ICodeTitle,
  IDocMetadata,
  RefCat,
} from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import { ERModule } from '../../reusable-extras/reusable.model';
import { IDocBoxNoResponse, IDocSensitivityResponse, IDocument } from './document.interface';

@Injectable({ providedIn: 'root' })
export class DocumentListService {
  private baseURL = environment.apiBaseUrl;

  constructor(public apiService: ApiService) {}

  submitDocument(fd: FormData) {
    return this.apiService.postFile<IDocument>(this.baseURL + '/rest/document/', fd);
  }

  //#region get documents
  getDocuments(rModule: ERModule, id: string) {
    if (rModule == ERModule.client) return this.getClientDocuments(id);
    else if (rModule == ERModule.policy) return this.getPolicyDocuments(id);
    else return this.getOtherDocuments(rModule, id);
  }

  getOtherDocuments = (refCategory: RefCat, refNo: string) =>
    this.apiService.get<IDocument[]>(this.baseURL + '/rest/document/search/', {
      refCategory,
      refNo,
    });
  getClientDocuments = (clientNo: string) =>
    this.apiService.get<IDocument[]>(
      this.baseURL + '/rest/document/client/' + clientNo
    );
  getAgentDocuments = (agentNo: string) =>
    this.apiService.get<IDocument[]>(
      this.baseURL + '/rest/document/client/' + agentNo
    );
  getPolicyDocuments = (policyNo: string) =>
    this.apiService.get<IDocument[]>(
      this.baseURL + '/rest/document/client/' + policyNo
    );
  getWorkflowDocuments = (workflowNo: string) => {
    return this.apiService.get<IDocument[]>(
      this.baseURL + '/rest/document/workflows/' + workflowNo
    );
  };
  //#endregion

  getBranchList = () => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + '/rest/branch/code/desc'
    );
  };
  getCategory = () => {
    return this.apiService.get(
      this.baseURL + '/rest/codes/sub/category/DOCUMENT_CATEGORY'
    );
  };
  getSubCategories = (categoryCode: string) => {
    return this.apiService.get(
      this.baseURL +
        `/rest/codes/sub/category/DOCUMENT_SUBCATEGORY/${categoryCode}`
    );
  };
  getDocumentsbaseURL = () =>
    this.apiService.getText(this.baseURL + '/rest/global-options/awsBaseEndpoint');

  getSensitivityList = () => {
    return this.apiService.get<ICodeTitle[]>(
      this.baseURL + '/rest/codes/sub/category/DOCUMENT_SENSITIVITY'
    );
  };

  getPolicyDocumentValues = () => {
    return this.apiService.get(
      this.baseURL + `/rest/correspondence/table/group/policy`
    );
  };
validateDownload=(docId:string)=>{
return this.apiService.get(
  this.baseURL + `/rest/document/download/authorize/${docId}`
);
}
  getCategoryList = () => {
    return this.apiService.getWithLocalCache<ICodeTitle[]>(
      this.baseURL + '/rest/codes/sub/category/DOCUMENT_CATEGORY'
    );
  };
  getSubCategoryList = (categoryCode: string) => {
    return this.apiService.getWithLocalCache<ICodeTitle[]>(
      this.baseURL +
        `/rest/codes/sub/category/DOCUMENT_SUBCATEGORY/${categoryCode}`
    );
  };
  getDocumentSensitivity = (userCode: string, documentSubCategory: string) => {
    return this.apiService.get<IDocSensitivityResponse>(
      this.baseURL +
        `/rest/document/document/sensitivity/${userCode}/${documentSubCategory}`
    );
  };
  getUserBoxNo = (userCode: string ) => {
    return this.apiService.get<IDocBoxNoResponse>(
      this.baseURL +
        `/rest/users/box/${userCode}`
    );
  };
  getScheduleFrequeny = () => {
    return this.apiService.get(this.baseURL + '/rest/codes/sub/category/FREQUENCY');
  };

  getHowList = () => {
    return this.apiService.getCodes<ICodeTitle>(
      this.baseURL + '/rest/codes/sub/category/HOW'
    );
  };
}
