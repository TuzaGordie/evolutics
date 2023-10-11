import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  CreateUser,
  UserBox,
  User,
  UserOutOfOffice,
  UserGroup,
} from 'src/app/Shared/models/life/user/Users';
import { CreateCrmUserGroup } from 'src/app/Shared/models/life/user/UserGroup';
import { CreateUserMenu } from 'src/app/Shared/models/life/user/UserMenu';
import { ApiService } from '../api.service';
import { IUserProfile } from 'src/app/Authentication/auth-extras/authentication.interface';
import {
  IUserSearchObj,
  IUserSearchResponse,
} from 'src/app/Life/admin/user/adminuser/user-extras/user.interface';
import { CodeService } from '../code.service';
import { UsermenuService } from 'src/app/Life/admin/user/usermenu/usermenu-extras/usermenu.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  URL = environment.apiBaseUrl + '/rest';
  retryCount = 1;
  noRetry = 0;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private apiService: ApiService,
    public codeS: CodeService,
    private userMenuService: UsermenuService
  ) {}

  getusersGroup = () => {
    return this.apiService
      .get(`${this.URL}/users/group`)
      .pipe(retry(this.retryCount));
  };
  getUserStatus() {
    return this.codeS.getCodesByCodeSubGroup('USER_STATUS');
  }

  getUserOutOfOffice(userCode: string): Observable<any> {
    return this.apiService
      .get(`${this.URL}/users/out-of/office/${userCode}`)
      .pipe(retry(this.retryCount));
  }

  saveUserOutOfOffice(
    userOfOfOffice: UserOutOfOffice
  ): Observable<UserOutOfOffice> {
    return this.apiService
      .post<UserOutOfOffice>(`${this.URL}/users/out-of/office`, userOfOfOffice)
      .pipe(retry(this.retryCount));
  }

  getAllUsersGroup = () => {
    return this.apiService
      .get(`${this.URL}/users/group/all`)
      .pipe(retry(this.retryCount));
  };

  getAllUsers = () => {
    return this.apiService
      .get(`${this.URL}/users/code/full-name`)
      .pipe(retry(this.retryCount));
  };

  getUserBoxByUserCode(userCode: string): Observable<any> {
    return this.apiService
      .get(`${this.URL}/users/box/${userCode}`)
      .pipe(retry(this.retryCount));
  }

  saveUserBox(userBox: UserBox): Observable<UserBox> {
    return this.apiService
      .post<UserBox>(`${this.URL}/users/box`, userBox)
      .pipe(retry(this.retryCount));
  }

  getAllUserMenus(): Observable<any> {
    return this.userMenuService.getAllUserMenus()
  }

  getusersGroupByBusLine(busLine: string): Observable<any> {
    return this.apiService
      .get(`${this.URL}/users/group/${busLine}`)
      .pipe(retry(this.retryCount));
  }

  getuserId(): Observable<any> {
    return this.apiService
      .get(`${this.URL}/users/id/fullname`)
      .pipe(retry(this.retryCount));
  }

  getUserByClientNo(clientNo: string) {
    return this.apiService
      .get<User>(`${this.URL}/users/find/user/${clientNo}`)
      .pipe(retry(this.retryCount));
  }

  getAllUserIdByGroup(group: string): Observable<any> {
    return this.apiService
      .get(`${this.URL}/users/id/fullname/group/${group}`)
      .pipe(retry(this.retryCount));
  }

  getUserByUserId(id: number) {
    return this.apiService
      .get<CreateUser>(`${this.URL}/users/${id}`)
      .pipe(retry(this.retryCount));
  }

  getuserUserGroupByGroup(group: string) {
    return this.apiService
      .get<UserGroup>(`${this.URL}/users/group/${group}`)
      .pipe(retry(this.retryCount));
  }

  getuserIdByCompanyCode(companyCode: string): Observable<any> {
    return this.apiService
      .get(`${this.URL}/users/userid/${companyCode}`)
      .pipe(retry(this.retryCount));
  }

  getuserMenuByUserMenu(userMenu: string): Observable<any> {
    return this.apiService
      .get(`${this.URL}/users/menu/${userMenu}/L`)
      .pipe(retry(this.retryCount));
  }

  getuserIdAndnameByCompanyCode(companyCode: string): Observable<any> {
    return this.apiService
      .get(`${this.URL}/users/userid/fullname/${companyCode}`)
      .pipe(retry(this.retryCount));
  }

  createUser(createUser: any): Observable<CreateUser> {
    return this.apiService
      .post<CreateUser>(`${this.URL}/users/`, createUser)
      .pipe(retry(this.noRetry));
  }

  updateUser(id: number, user: CreateUser) {
    return this.apiService
      .put<CreateUser>(`${this.URL}/users/update/user/${id}`, user)
      .pipe(retry(this.noRetry));
  }
  updateUserInfo(id: number, user: User) {
    return this.apiService
      .put<User>(`${this.URL}/users/update/${id}`, user)
      .pipe(retry(this.noRetry));
  }

  uploadProfilePicture(formData: FormData) {
    return this.apiService
      .post(`${this.URL}/document`, formData)
      .pipe(retry(this.noRetry));
  }

  createUserGroup(createUserGroup: any): Observable<CreateCrmUserGroup> {
    return this.apiService
      .post<CreateCrmUserGroup>(`${this.URL}/users/group`, createUserGroup)
      .pipe(retry(this.noRetry));
  }

  createLifeUserMenu(createUserMenu: any): Observable<CreateUserMenu> {
    return this.apiService
      .post<CreateUserMenu>(`${this.URL}/users/menu/L`, createUserMenu)
      .pipe(retry(this.noRetry));
  }

  search(query: IUserSearchObj) {
    return this.apiService.get<IUserSearchResponse>(
      `${this.URL}/users/search`,
      query
    );
  }

  deleteTiers(id: number): Observable<any> {
    return this.apiService.deleteText(`${this.URL}/users/tier/${id}`);
  }

  deleteCompany(id: number): Observable<any> {
    return this.apiService.deleteText(`${this.URL}/users/company/${id}`);
  }

  deleteBranch(id: number): Observable<any> {
    return this.apiService.deleteText(`${this.URL}/users/branch/${id}`);
  }

  deletePayout(id: number): Observable<any> {
    return this.apiService.deleteText(`${this.URL}/users/payout/${id}`);
  }

  deleteWorkingTime(id: number): Observable<any> {
    return this.apiService.deleteText(`${this.URL}/users/working/times/${id}`);
  }
}
