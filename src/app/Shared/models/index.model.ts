import { KeyValue } from '@angular/common';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MenuPositionX } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {
  IUser,
  IUserProfile,
} from 'src/app/Authentication/auth-extras/authentication.interface';
import { CreateConfig } from 'src/app/Life/admin/configuration/config';
import {
  IUserMenu,
  IUserMenuConfig,
  IUserMenuConfigDetail,
} from 'src/app/Life/admin/user/usermenu/usermenu-extras/usermenu.interface';
import { configForms } from './form.class';
import { CreateUser } from './life/user/Users';
import { AppRouteBase } from './RouteItem.class';

//#region inputs
interface IInputBase {
  name?: string;
  label: string;
  value?: any;
  placeholder?: string;
  cls?: string;
  required?: boolean;
  type?: InputType;
}
interface IFCInput extends IInputBase {
  name: string;
  prefix?: string;
  suffix?: string;
  formControl: AbstractControl;
  form: FormGroup;
  vms?: IValidationMessage[];
}

export type InputType =
  | 'checkbox'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'fileButton'
  | 'number'
  | 'password'
  | 'progress'
  | 'radio'
  | 'select'
  | 'tel'
  | 'text'
  | 'textarea'
  | 'time'
  | 'viewer';
export class FCInput implements IFCInput {
  name: string;
  label: string;
  placeholder?: string;
  cls?: string;
  prefix?: string;
  suffix?: string;
  required?: boolean;
  type?: InputType;
  formControl: AbstractControl;
  vms?: IValidationMessage[];
  form: FormGroup;
  constructor(
    label: string,
    name?: string,
    formControl?: AbstractControl,
    type?: InputType,
    required?: boolean,
    placeholder?: string,
    vms?: IValidationMessage[],
    prefix?: string,
    suffix?: string
  ) {
    this.name = name || 'fn' + Math.round(Math.random() * 100000);
    this.label = label;
    this.formControl = formControl || configForms.default();
    this.type = type || 'text';
    this.required = required || false;
    this.vms = vms || [];
    this.placeholder = placeholder;
    this.prefix = prefix;
    this.suffix = suffix;
  }
}
export class CInput implements IInputBase {
  name: string;
  label: string;
  placeholder?: string;
  cls?: string;
  required?: boolean;
  type?: InputType;
  value: string;
  hide: boolean;
  disabled: boolean;
  readonly: boolean;
  id: string;
  hasError: boolean;
  get isEmpty() {
    return this.value == null || this.value == undefined;
  }
  x: number;
  y: number;
  constructor(
    label: string,
    name?: string,
    value?: any,
    type?: InputType,
    required?: boolean,
    placeholder?: string,
    vms?: IValidationMessage[],
    prefix?: string,
    suffix?: string
  ) {
    this.name = name;
    this.id = 'inputID' + Math.round(Math.random() * 10000000);
    this.label = label;
    this.value = value;
    this.type = type || 'text';
    this.required = required || false;
    this.placeholder = placeholder;
  }
}
//#endregion

//#region key value pair
export interface IKVP {
  readonly key?: any;
  value?: string | boolean | number;
  cls?: string;
}
export class KVP implements IKVP {
  readonly key: string;
  value?: string | boolean | number;
  cls?: string;
  constructor(key: string, value?: string | boolean | number, cls?: string) {
    this.key = key;
    this.value = value;
    this.cls = cls;
  }
}
export class FKVP extends KVP {
  label: string;
  editable?: boolean;
  editing?: boolean;
  route?: string;
  hint?: string;
  action?: any;
  formatter?: (val: any) => string | Promise<string>;
  constructor(
    key: string,
    label: string,
    editable?: boolean,
    value?: string | boolean | number,
    public inputType?: InputType,
    hint?: string,
    action?: any,
    formatter?: (val: any) => string | Promise<string>,
    cls?: string,
    route?: string
  ) {
    super(key, value, cls);
    this.label = label;
    this.hint = hint;
    this.editable = editable;
    this.action = action;
    this.formatter = formatter;
    this.route = route;
  }
}
//#endregion

//#region lbl
export interface ILbl extends IKVP {
  hint?: string;
}
export class Lbl implements ILbl {
  readonly key: string;
  value: string | boolean | number;
  hint?: string;
  cls?: string;
  constructor(
    key: string,
    value?: string | boolean | number,
    hint?: string,
    cls?: string
  ) {
    this.key = key;
    this.value = value || '-';
    this.hint = hint;
    this.cls = cls;
  }
}
//#endregion
//#region btn
export interface IBtn extends IKVP {
  type?: BtnType;
  group?: BtnGroup;
  icon?: IconType;
  action?: (arg?) => void;
}
export class Btn implements IBtn {
  cls?: string;
  group?: BtnGroup;
  icon?: IconType;
  readonly action?: () => void;
  readonly key: string;
  type: BtnType;
  constructor(
    key: string,
    action?: any,
    type?: BtnType,
    icon?: IconType,
    cls?: string
  ) {
    this.key = key;
    this.action = action;
    this.type = type;
    this.icon = icon;
    this.cls = cls;
  }
}
export class BtnLg implements IBtn {
  readonly key: string;
  value: string | boolean | number;
  readonly action?: () => void;
  cls?: string;
  constructor(
    key: string,
    value?: string | boolean | number,
    action?: any,
    cls?: string
  ) {
    this.key = key;
    this.value = value || '-';
    this.action = action;
    this.cls = cls;
  }
}
export type BtnType =
  | 'close'
  | 'danger-outline'
  | 'dark-outline'
  | 'danger'
  | 'dark'
  | 'outline-nm'
  | 'outline'
  | 'primary'
  | 'secondary';
export type BtnGroup =
  | 'add'
  | 'clone'
  | 'close'
  | 'delete'
  | 'download'
  | 'search'
  | 'show'
  | 'submit'
  | 'upload';
export type IconType =
  | 'access'
  | 'add'
  | 'adjust'
  | 'cash'
  | 'checked'
  | 'checklist'
  | 'clone'
  | 'close'
  | 'cogs'
  | 'delete'
  | 'download'
  | 'edit'
  | 'export'
  | 'file'
  | 'filter'
  | 'generate'
  | 'guard'
  | 'history'
  | 'home'
  | 'import'
  | 'lock'
  | 'next'
  | 'pen'
  | 'post'
  | 'previous'
  | 'renew'
  | 'save'
  | 'search'
  | 'show'
  | 'unlock'
  | 'upload'
  | 'view';
//#endregion

//#region table columns
export interface IRowOption {
  t: string;
  action?: (row: any) => void;
}
export interface ITableCol {
  t: string;
  f: string;
  formatter?: (val: any) => string;
  p?: string[];
  formatterP?: (...val: any) => string;
}
export class TableCol implements ITableCol {
  action?: (row: any, cellField: string) => any;
  checked?: boolean;
  f: string;
  formatter?: (val: any) => string;
  formatterRow?: FormatterFuncType;
  p?: string[];
  routeFormatter?: FormatterFuncType;
  mqueryParams?: FormatterFuncType;
  t: string;
  type?: InputType;
  constructor(
    t: string,
    f?: string,
    formatter?: (val: any) => string,
    formatterRow?: FormatterFuncType,
    type?: InputType,
    checked?: boolean,
    routeFormatter?: FormatterFuncType ,
    mqueryParams?: FormatterFuncType<any>
  ) {
    this.t = t;
    this.f = f || 'f' + Math.round(Math.random() * 1000000);
    this.formatter = formatter;
    this.formatterRow = formatterRow;
    this.type = type;
    this.checked = checked || false;
    this.routeFormatter = routeFormatter;
    this.mqueryParams = mqueryParams;
  }
}

//#endregion

 type FormatterFuncType<T=string> =  (row: any, cellField?: string) => T;
export interface ICodeTitle {
  code: string;
  title: string;
}

export interface ICodeDescription {
  code: string;
  description: string;
}

export interface IMktDescription {
  mktEventCode: string;
  description: string;
}

export interface ICode {
  code: string;
}
export interface IMenuItem {
  breadcrumbs?: KeyValue<string, string>[];
  breadcrumbsStr?: string;
  hasSub?: boolean;
  icon?: string;
  id: string;
  index?: number;
  isDivider?: boolean;
  label: string;
  labelLowerCase?: string;
  link?: string;
  submenuPosition?: MenuPositionX;
  subs?: IMenuItem[];
  system?: ESystem;
  systemIcon?: string;
  systemLink?: string;
}
export class MenuItem implements IMenuItem {
  breadcrumbs?: KeyValue<string, string>[];
  breadcrumbsStr?: string;
  hasSub?: boolean;
  icon: string;
  id: string;
  index?: number;
  isDivider?: boolean;
  label: string;
  labelLowerCase?: string;
  link: string;
  submenuPosition?: MenuPositionX;
  subs: MenuItem[];
  system: ESystem;
  systemIcon?: string;
  systemLink?: string;
  constructor(menuitem: IMenuItem) {
    this.label = menuitem?.label;
    this.labelLowerCase = menuitem?.label?.toLowerCase();
    this.link = menuitem?.link;
    this.icon = menuitem?.icon;
    this.subs = menuitem?.subs?.map((m) => new MenuItem(m));
    this.system = menuitem?.system;
    this.hasSub = !!menuitem?.subs?.length;
    this.id = menuitem?.id;
    // if (!this.link) delete this.link;
    // if (!this.icon) delete this.icon;
    // if (!this.subs?.length) delete this.subs;
    // if (!this.system) delete this.system;
    // this.id =
    //   'M' + label.split(' ').join('') + Math.round(Math.random() * 10000);
  }
  // constructor(
  //   label: string,
  //   link: string,
  //   icon = '',
  //   subs: MenuItem[] = [],
  //   system?: ESystem,
  //   id?: string
  // ) {
  //   this.label = label;
  //   this.labelLowerCase = label.toLowerCase();
  //   this.link = link;
  //   this.icon = icon;
  //   this.subs = subs;
  //   this.system = system;
  //   this.hasSub = !!subs?.length;
  //   this.id = id;
  //   // if (!this.link) delete this.link;
  //   // if (!this.icon) delete this.icon;
  //   // if (!this.subs?.length) delete this.subs;
  //   // if (!this.system) delete this.system;
  //   // this.id =
  //   //   'M' + label.split(' ').join('') + Math.round(Math.random() * 10000);
  // }
}
export class MenuItemDivider extends MenuItem {
  constructor() {
    super(null);
    this.isDivider = true;
  }
}
export enum Day {
  sunday = 'Sunday',
  monday = 'Monday',
  tuesday = 'Tuesday',
  wednesday = 'Wednesday',
  thursday = 'Thursday',
  friday = 'Friday',
  saturday = 'Saturday',
}
export enum EPageType {
  clonePage = 'clonePage',
  editPage = 'editPage',
  showPage = 'showPage',
  createPage = 'createPage',
  indexPage = 'indexPage',
}
export interface IDocMetadata {
  refNo?: string | number;
  refCat?: RefCat;
  category?: string;
  subCategory?: SubCategory;
  branch?: string;
  sensitivity?: string;
  policyCode?: string;
  policyNo?: string;
  policyNoSuffix?: string;
  boxNo?: string;
  title: string;
}
export type RefCat =
  | 'AGT'
  | 'APP'
  | 'ASS'
  | 'AUTH'
  | 'BAN'
  | 'BAT'
  | 'BRA'
  | 'CLA'
  | 'CLI'
  | 'COM'
  | 'COU'
  | 'COV'
  | 'DN'
  | 'DOC'
  | 'END'
  | 'ENR'
  | 'GRO'
  | 'NB'
  | 'PAY'
  | 'PNS'
  | 'PO'
  | 'POL'
  | 'PRO'
  | 'QUO'
  | 'RAT'
  | 'SN'
  | 'ST'
  | 'TAR'
  | 'TAS'
  | 'TRA'
  | 'TSC'
  | 'USR'
  | 'WF';
type SubCategory =
  | 'PP'
  | 'SI'
  | 'ID'
  | 'AOC'
  | 'AP'
  | 'LI'
  | 'RIB'
  | 'LIC'
  | 'AGT';
export interface ISystem {
  appRoute: AppRouteBase;
  name: ESystem;
  busline: ESystemBusLine;
  colourCode: string;
}

export enum ESystem {
  actuarial = 'actuarial',
  analytics = 'analytics',
  assets = 'assets',
  cash = 'receipt',
  crms = 'crms',
  dBCloner = 'dbcloner',
  document = 'document',
  finance = 'finance',
  general = 'general',
  health = 'health',
  human = 'human',
  life = 'life',
}
export enum ESystemBusLine {
  actuarial = 'A',
  analytics = 'analytics',
  assets = 'assets',
  cash = 'receipt',
  crm = 'C',
  dBCloner = 'dbcloner',
  document = 'D',
  finance = 'F',
  general = 'G',
  health = 'H',
  human = 'human',
  life = 'L',
}
export class Environment {
  readonly userMenuKey = '3fefweef2e';
  readonly targetLanguageKey = 'targetLanguage';
  readonly translateKey = 'translate';
  private _userMenu: IUserMenu;
  userCompanyConfig: CreateConfig;
  readonly userCompanyConfigKey = 'menoenfo';
  logReq: boolean;
  public get userMenu(): IUserMenu {
    return this._userMenu;
  }
  public set userMenu(value: IUserMenu) {
    this._userMenu = value;
    this._userMenu.userMenuConfigDetails =
      this._userMenu.userMenuConfigDetails?.filter((x) => x.access);
  }

  requestCount = 0;
  activatedRoute: ActivatedRoute;
  constructor(
    public production: boolean,
    public readonly logsKey = 'f2ewdeded23',
    public activeSystems?: ESystem[],
    public apiBaseUrl?: string,
    public appName: string = 'Evolutics',
    public authenticate?: boolean,
    public currentSystem?: ESystem,
    public debug?: boolean,
    public readonly helpLink = 'https://help.evoluticstech.com/',
    public readonly userProfileKey = 'neodmeid2',
    public readonly userKey = 'h82nnsiund89d',
    public readonly watermark?: string,
    public sourceLanguage?: ELanguage,
    public user?: IUser,
    public userProfile?: CreateUser
  ) {
    if (!production) this.debug = true;
  }
  get token() {
    return this.user?.token;
  }
  get imageUrl() {
    return this.userProfile?.users?.imageUrl;
  }
  private _translate?: boolean;
  public get translate(): boolean {
    return (
      this._translate ||
      this.userProfile?.users?.language != ELanguage.EN ||
      false
    );
  }
  public set translate(value: boolean) {
    this._translate = value;
  }
  private _targetLanguage?: ELanguage;
  public get targetLanguage(): ELanguage {
    return this._targetLanguage || (this.userProfile?.users?.language as any);
  }
  public set targetLanguage(value: ELanguage) {
    this._targetLanguage = value;
  }
}

export enum ELanguage {
  EN = 'EN',
  FR = 'FR',
}

export enum EValidationType {
  email = 'email',
  entityNumber = 'entityNumber',
  maxlength = 'maxlength',
  minlength = 'minlength',
  mobile = 'mobile',
  name = 'name',
  normal = 'normal',
  passwordNotMatch = 'passwordNotMatch',
  pattern = 'pattern',
  required = 'required',
  unique = 'unique',
  custom = 'custom',
}
export interface IValidationMessage {
  type: EValidationType;
  message: string;
}
export type SortType = 'asc' | 'desc';

interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

interface IPage<T> {
  content: T[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}

export interface ISearchResponse<T = any> {
  page: IPage<T>;
  listSize: number;
  pageNumber?: number;
  pageSize?: number;
  searchCriteria: any;
}

export type ImageType = 'pp' | 'other';
export interface ITab {
  id?: string;
  target?: string;
  label: string;
  form?: string;
  postFunction?: (
    data: any,
    productCode?: string
  ) => Observable<{
    data: any;
    productCode: string;
  }>;
  putFunction?: (
    data: any,
    productCode: string
  ) => Observable<{
    data: any;
    productCode: string;
  }>;
  data?: any;
}
