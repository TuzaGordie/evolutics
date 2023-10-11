import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { AppService } from 'src/app/Services/app.service';
import { ESystem } from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import {
  MenuItemConfig,
  IUserMenu,
  IUserMenuConfig,
} from './usermenu.interface';

@Injectable({
  providedIn: 'root',
})
export class UsermenuService {
  get baseURL() {
    return environment.apiBaseUrl;
  }
  constructor(public apiService: ApiService, public appS: AppService) {}

  getUserMenuByCode(code: string) {
    return this.apiService.get<IUserMenu>(
      this.baseURL + '/rest/users/menu/config/' + code
    );
  }

  getAllUserMenus = () => {
    return this.apiService.get<IUserMenuConfig[]>(
      this.baseURL + '/rest/users/menu/config/desc'
    );
  };

  getAllModuleMenus(): MenuItemConfig[] {
    return this.appS.topMenu?.map((x) => new MenuItemConfig(x));
  }
  getModuleMenus(
    system: ESystem = this.appS.getCurrentSystemMetadata.name
  ): MenuItemConfig[] {
    return this.appS.topMenu
      .find((x) => x.system == system)
      ?.subs?.map((x) => new MenuItemConfig(x));
  }

  submit(data: IUserMenu) {
    return this.apiService
      .post<IUserMenu>(this.baseURL + '/rest/users/menu/config', data)
      .toPromise();
  }
}
