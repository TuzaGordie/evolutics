import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUserProfile } from '../Authentication/auth-extras/authentication.interface';
import { IUserSearchObj } from '../Life/admin/user/adminuser/user-extras/user.interface';
import { CreateUser } from '../Shared/models/life/user/Users';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL = environment.apiBaseUrl + '/rest/users/';
  constructor(public apiService: ApiService, public sS: StorageService) {}
  checkIfClientExistsBy(query: IUserSearchObj) {
    return this.apiService.get<boolean>(this.baseURL + `unique/exists`, query);
  }
  getUsersFullname = () => {
    return this.apiService.get<any[]>(`${this.baseURL}id/fullname`);
  };
  getAllUserCodeAndFullName = () => {
    return this.apiService
      .get<
        {
          fullName: string;
          userName: string;
          code: string;
        }[]
      >(`${this.baseURL}code/full-name`)
      .pipe(
        map((res) => res.sort2('userName', true)),
        catchError((err) => of([]))
      );
  };
  getUserByCode = (code: string) => {
    return this.apiService.get<IUserProfile>(`${this.baseURL}user/${code}`);
  };
  getUserByID = (id: number) => {
    return this.apiService.get<CreateUser>(`${this.baseURL}${id}`);
  };
}
