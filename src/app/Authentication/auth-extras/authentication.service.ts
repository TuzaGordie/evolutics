import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { CreateConfig } from 'src/app/Life/admin/configuration/config';
import { ConfigService } from 'src/app/Life/admin/configuration/config.service';
import { IUserDetail } from 'src/app/Life/admin/user/adminuser/user-extras/user.interface';
import {
  IUserMenu,
  IUserMenuConfigDetail,
} from 'src/app/Life/admin/user/usermenu/usermenu-extras/usermenu.interface';
import { UsermenuService } from 'src/app/Life/admin/user/usermenu/usermenu-extras/usermenu.service';
import { ApiService } from 'src/app/Services/api.service';
import { StorageService } from 'src/app/Services/storage.service';
import { UserService } from 'src/app/Services/user.service';
import { ELanguage } from 'src/app/Shared/models/index.model';
import { CreateUser } from 'src/app/Shared/models/life/user/Users';
import { environment } from 'src/environments/environment';
import { IUser, IUserProfile } from './authentication.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseURL = environment.apiBaseUrl + '/rest/authentication/';
  private readonly countKey = 'countKey';
  private readonly timerKey = 'authTimer';
  public get count() {
    return this.sS.getItem<number>(this.countKey);
  }
  public set count(value) {
    this.sS.saveItem(this.countKey, value);
  }
  readonly waitTime = 5; //minutes
  timeLeft = 0; //minutes
  readonly maxCount = 3;
  constructor(
    public apiService: ApiService,
    public sS: StorageService,
    public userS: UserService,
    public umS: UsermenuService,
    private configService: ConfigService
  ) {
    const secondsLocked = this.sS.getItem<number>(this.timerKey)||0; // in seconds 
    if (secondsLocked || this.isLocked) {
      this.startTimer(secondsLocked);
    }
  }

  get isLoggedin() {
    return !!this.sS.getItem(environment?.userKey);
  }

  async login(value: { userName; password }) {
    try {
      return this.apiService
        .post<IUser>(this.baseURL + 'login', value)
        .toPromise()
        .then(async (user) => {
          this.setEnvUser(user);
          const profile = await this.getProfileFromOnline(user.code);
          if (!profile) throw 'Profile data not found';
          if (profile?.users?.status && profile?.users?.status != 'A')
            throw 'Your status is not active';
          if (
            profile?.users?.expiryOn &&
            new Date(profile?.users?.expiryOn).getTime() <= Date.now()
          )
            throw 'Your account has expired';
          this.setEnvProfile(profile);
          const userMenu = await this.getUserMenuFromOnline(
            profile?.users?.userMenu
          );
          this.setEnvUserMenu(userMenu);
          this.saveLanguageToLocal();
          this.saveProfileToLocal();
          this.saveUserMenuToLocal();
          this.saveUserToLocal();
          return user;
        })
        .catch((e: HttpErrorResponse) => {
          console.log(e);
          throw e.status == 401
            ? 'Please check the username or password'
            : e instanceof String
            ? e
            : 'An error occurred';
        });
    } catch (error) {
      throw error;
    }
  }
  getAllFromLocal() {
    this.getLanguageFromLocal();
    this.setEnvProfile(this.getProfileFromLocal());
    this.setEnvUser(this.getUserFromLocal());
    this.setEnvUserMenu(this.getUserMenuFromLocal());
    this.setEnvUserCompanyConfig(this.getUserCompanyConfigFromLocal());
  }
  async getAllFromOnline() {
    const profile = await this.getProfileFromOnline(environment.user?.code);
    this.setEnvProfile(profile);
    const userMenu = await this.getUserMenuFromOnline(profile?.users?.userMenu);
    this.setEnvUserMenu(userMenu);
    const companyConfig = await this.getUserCompanyConfigFromOnline(
      profile?.users?.primaryCompany
    );
    this.setEnvUserCompanyConfig(companyConfig);
    this.saveLanguageToLocal();
    this.saveProfileToLocal();
    this.saveUserMenuToLocal();
    this.saveUserToLocal();
    this.saveUserCompanyConfigToLocal();
  }
  get isLocked() {
    return this.maxCount <= this.count;
  }
  startTimer(carryOverSec:number=0) {
    const time = timer(0, 1000);
    const waitTime = this.waitTime * 60  
    const sub = time
      .pipe(
        map(s=>s+carryOverSec),
        tap((s) => {
          this.sS.saveItem(this.timerKey, s);
          this.timeLeft = waitTime - s;
        }),
        filter((s) => s >= waitTime)
      )
      .subscribe((r) => {
        this.count = 0;
        sub.unsubscribe();
        this.sS.removeItem(this.timerKey);
      });
  }
  //#region user
  setEnvUser(user: IUser) {
    environment.user = user;
  }
  getUserFromLocal() {
    return this.sS.getItem<IUser>(environment.userKey);
  }
  saveUserToLocal() {
    this.sS.saveItem(environment.userKey, environment.user);
  }
  //#endregion

  changePassword(password: string) {
    return this.apiService.put(
      this.baseURL + `password/${environment.user.code}/${password}`
    );
  }

  async logout() {
    try {
      await this.apiService.post<IUser>(this.baseURL + 'logout').toPromise();
    } catch (error) {
      console.log(error);
    }
    this.sS.clear();
    location.reload();
    return true;
  }
  get user() {
    return environment.user;
  }
  get token() {
    return environment.token;
  }

  //#region user profile
  setEnvProfile(userProfile: CreateUser) {
    environment.userProfile = userProfile;
  }
  private getProfileFromLocal() {
    return this.sS.getItem<CreateUser>(environment.userProfileKey);
  }
  getProfileFromOnline(code: string) {
    return this.userS
      .getUserByCode(code)
      .toPromise()
      .then((r) => this.userS.getUserByID(r.id).toPromise());
  }
  saveProfileToLocal() {
    this.sS.saveItem(environment.userProfileKey, environment.userProfile);
  }
  //#endregion

  //#region language
  private getLanguageFromLocal() {
    return {
      translate: this.sS.getItem<boolean>(environment.translateKey),
      targetLanguage: this.sS.getItem<ELanguage>(environment.targetLanguageKey),
    };
  }
  private saveLanguageToLocal() {
    // debugger
    this.sS.saveItem(environment.translateKey, environment.translate);
    this.sS.saveItem(environment.targetLanguageKey, environment.targetLanguage);
  }
  //#endregion

  //#region usermenu
  setEnvUserMenu(userMenu: IUserMenu) {
    environment.userMenu = userMenu;
  }
  private getUserMenuFromLocal() {
    return this.sS.getItem<IUserMenu>(environment.userMenuKey);
  }
  getUserMenuFromOnline(code: string) {
    return this.umS.getUserMenuByCode(code).toPromise();
  }
  private saveUserMenuToLocal() {
    this.sS.saveItem(environment.userMenuKey, environment.userMenu);
  }
  //#endregion

  //#region userCompanyConfig
  setEnvUserCompanyConfig(companyConfig: CreateConfig) {
    environment.userCompanyConfig = companyConfig;
  }
  private getUserCompanyConfigFromLocal() {
    return this.sS.getItem<CreateConfig>(environment.userCompanyConfigKey);
  }
  getUserCompanyConfigFromOnline(companyCode: string) {
    return this.configService.fetchConfigByCompanyCode(companyCode).toPromise();
  }
  private saveUserCompanyConfigToLocal() {
    this.sS.saveItem(
      environment.userCompanyConfigKey,
      environment.userCompanyConfig
    );
  }
  //#endregion
}
