import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { appRoutes } from '../configs/app-routes-configs/app-routes.config';
import { configMainMenu } from '../configs/menu-configs/top-menu.config';
import {
  ESystem,
  ESystemBusLine,
  ISystem,
  MenuItem,
} from '../Shared/models/index.model';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  topMenu = configMainMenu;
  bottomMenu: MenuItem[] = [];
  private _currentTopMenu: MenuItem;
  private _system: ESystem;
  private _pageName: string;
  public get system(): ESystem {
    return this._system;
  }
  public set system(value: ESystem) {
    this._system = value;
    environment.currentSystem = value;
    document.getElementsByTagName('body')[0].className = value;
    this.bottomMenu = this.topMenu.find((x) => x.system == value).subs;
    document.documentElement.style.setProperty(
      '--primary',
      this.getCurrentSystemMetadata.colourCode
    );
  }
  public get currentTopMenu(): MenuItem {
    return this._currentTopMenu;
  }
  public set currentTopMenu(value: MenuItem) {
    this._currentTopMenu = value;
    this.bottomMenu = value.subs;
  }
  async setCurrentTopMenu(id: string) {
    this.currentTopMenu = this.topMenu.find((x) => x.id == id);
  }
  readonly systemMetadataMap = new Map<ESystem, ISystem>([
    [
      ESystem.actuarial,
      {
        name: ESystem.actuarial,
        busline: ESystemBusLine.actuarial,
        appRoute: appRoutes.act,
        colourCode: '#009858',
      },
    ],
    [
      ESystem.analytics,
      {
        name: ESystem.analytics,
        busline: ESystemBusLine.analytics,
        appRoute: appRoutes.analytics,
        colourCode: '#dc3545',
      },
    ],
    [
      ESystem.assets,
      {
        name: ESystem.assets,
        busline: ESystemBusLine.assets,
        appRoute: appRoutes.assets,
        colourCode: '#d63384',
      },
    ],
    [
      ESystem.cash,
      {
        name: ESystem.cash,
        busline: ESystemBusLine.cash,
        appRoute: appRoutes.cash,
        colourCode: '#00bd6e',
      },
    ],
    [
      ESystem.crms,
      {
        name: ESystem.crms,
        busline: ESystemBusLine.crm,
        appRoute: appRoutes.crm,
        colourCode: '#c8003c',
      },
    ],
    [
      ESystem.dBCloner,
      {
        name: ESystem.dBCloner,
        busline: ESystemBusLine.dBCloner,
        appRoute: appRoutes.dbcloner,
        colourCode: '#303952',
      },
    ],
    [
      ESystem.document,
      {
        name: ESystem.document,
        busline: ESystemBusLine.document,
        appRoute: appRoutes.document,
        colourCode: '#0bbcc8',
      },
    ],
    [
      ESystem.finance,
      {
        name: ESystem.finance,
        busline: ESystemBusLine.finance,
        appRoute: appRoutes.finance,
        colourCode: '#34495e',
      },
    ],
    [
      ESystem.general,
      {
        name: ESystem.general,
        busline: ESystemBusLine.general,
        appRoute: appRoutes.general,
        colourCode: '#ab00c8',
      },
    ],
    [
      ESystem.health,
      {
        name: ESystem.health,
        busline: ESystemBusLine.health,
        appRoute: appRoutes.health,
        colourCode: '#3498db',
      },
    ],
    [
      ESystem.human,
      {
        name: ESystem.human,
        busline: ESystemBusLine.human,
        appRoute: appRoutes.human,
        colourCode: '#cadb34',
      },
    ],
    [
      ESystem.life,
      {
        name: ESystem.life,
        busline: ESystemBusLine.life,
        appRoute: appRoutes.life,
        colourCode: '#514ef5',
      },
    ],
  ]);
  get getFirstAvailableSystem() {
    return this.systemMetadataMap.get(
      environment.activeSystems?.length
        ? environment.activeSystems[0]
        : ESystem.life
    );
  }
  get getCurrentSystemMetadata() {
    return this.systemMetadataMap.get(this.system);
  }
  constructor(private titleS: Title, public translator: TranslationService) {}
  setDefaultClass() {
    document.getElementsByTagName('body')[0].className =
      this.getFirstAvailableSystem.name;
  }
  get busLine() {
    return this.getCurrentSystemMetadata.busline;
  }
  get activeSystems() {
    return environment.activeSystems?.length
      ? configMainMenu.filter((x) =>
          environment.activeSystems.includes(x.system)
        )
      : configMainMenu;
  }
  //#region pagename
  get pageName() {
    return this._pageName;
  }
  set pageName(value: string) {
    this._pageName = value;
    this.addTitle(this._pageName);
  }
  addTitle = (title) =>
    this.translator
      .translateHTML((title ? title + ' | ' : '') + environment.appName)
      .subscribe((r) => {
        this.titleS.setTitle(r);
      });
  //#endregion
  setMetaTheme() {
    const metaTag: HTMLMetaElement = document.getElementById(
      'metaThemeColour'
    ) as any;
    metaTag.content = this.getCurrentSystemMetadata.colourCode;
  }
}
