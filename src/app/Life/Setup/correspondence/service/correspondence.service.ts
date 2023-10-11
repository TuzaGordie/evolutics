import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Correspondence } from '../models/correspondence';


@Injectable({
  providedIn: 'root'
})
export class CorrespondenceService {

  private baseURL = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getDocumentCode() {
    return this.http.get(this.baseURL + '/rest/correspondence/document/desc/codes');
  }

  getCategory() {
    return this.http.get(this.baseURL + '/rest/codes/sub/group/TEMPLATE_CAT');
  }

  postCorrespondence(curr: any) {
    return this.http.post(this.baseURL + '/rest/correspondence/create', {curr});
  }
  
  uploadTemplate(template: string , file: any) {
    const formData: FormData = new FormData();
    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    formData.append('file', file, file.name);
    formData.append('template', template);
    return this.http.post(this.baseURL + '/rest/templates/upload/', formData, { headers: headers });
  }
  
  updateTemplate(template: string , file: any) {
    const formData: FormData = new FormData();
    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    formData.append('file', file, file.name);
    formData.append('template', template);
    return this.http.put(this.baseURL + '/rest/templates/update/', formData, { headers: headers });
  }

  getAllTemplates() {
    return this.http.get(this.baseURL + '/rest/templates/find');
  }

  getTemplates(templateCode: string) {
    return this.http.get(this.baseURL + `/rest/templates/find/${templateCode}`);
  }

  deleteTemplate(templateCode: string) {
    return this.http.delete(this.baseURL + `/rest/templates/delete/${templateCode}`);
  }

  
}
