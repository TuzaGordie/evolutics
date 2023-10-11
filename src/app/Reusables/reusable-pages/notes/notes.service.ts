import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { RefCat } from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import { INote } from './note.model';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private baseURL = environment.apiBaseUrl;

  constructor(public apiService: ApiService) {}
  getNotesList(refCat: string, refNo: string) {
    return this.apiService.get<INote[]>(
      this.baseURL + `/rest/notes/active/${refCat}/${refNo}`
    );
  }
  saveNote(note: INote) {
    return this.apiService.post<INote>(this.baseURL + '/rest/notes', note);
  }
  resolveNote({ refCat, refNo, id, resolvedBy }) {
    return this.apiService.put<INote>(
      this.baseURL +
        `/rest/notes/resolve/${refCat}/${refNo}/${id}/${resolvedBy}`,
      {}
    );
  }
}
