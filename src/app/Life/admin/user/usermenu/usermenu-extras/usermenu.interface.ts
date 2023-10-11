import { KeyValue } from '@angular/common';
import { MenuPositionX } from '@angular/material/menu';
import { ESystem, IMenuItem, MenuItem } from 'src/app/Shared/models/index.model';

export interface IUserMenuConfig {
  authBy: string;
  authOn: string;
  description: string;
  userMenu: string;
  id: string;
}

export interface IUserMenuConfigDetail {
  id?: number;
  access: boolean;
  authBy?: string;
  authOn?: string;
  module: ESystem;
  page: string;
  section: string;
  slug: string;
  userMenuConfigId?: number;
}

export interface IUserMenu {
  userMenuConfig: IUserMenuConfig;
  userMenuConfigDetails: IUserMenuConfigDetail[];
}

export class MenuItemConfig implements IMenuItem {
  allowed: boolean;
  breadcrumbs: KeyValue<string, string>[];
  breadcrumbsStr: string;
  disabled: boolean;
  hasSub: boolean;
  icon: string;
  id: string;
  index: number;
  isDivider: boolean;
  label: string;
  labelLowerCase: string;
  link: string;
  submenuPosition: MenuPositionX;
  subs: MenuItemConfig[];
  system: ESystem;
  systemIcon: string;
  systemLink: string;
  dbID: number;
  constructor(menuItem: MenuItem) {
    for (const key in menuItem) {
      if (Object.prototype.hasOwnProperty.call(menuItem, key)) {
        this[key] = menuItem[key];
      }
    }
    this.subs = menuItem?.subs
      ?.filter?.((x) => x.label)
      ?.map((x) => new MenuItemConfig(x));
  }
  toggle() {
    this.disabled = !this.disabled;
  }
  allowAllSubMenus() {
    this.subs?.forEach((x) => x?.allowAllSubMenus());
    this.allowed = true;
  }
  disableAllSubMenus() {
    this.subs?.forEach((x) => x?.disableAllSubMenus());
    this.allowed = false;
  }
  toggleAllSubMenus() {
    this.allowed ? this.disableAllSubMenus() : this.allowAllSubMenus();
  }
  allowAuthorization() {
    this.allowed = true;
  }
  disableAuthorization() {
    this.allowed = false;
  }
  toggleAuthorization() {
    this.allowed = !this.allowed;
  }
}
