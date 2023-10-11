import { CurrencyPipe, Location } from '@angular/common';
import { Component, Injectable, Type } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../Shared/components/confirm-dialog/confirm-dialog.component';
import { InfoDialogComponent } from '../Shared/components/info-dialog/info-dialog.component';
import { InputService } from './input.service';
import { RouteService } from './route.service';
import jfd from 'js-file-download';
import { PageLoaderService } from './page-loader.service';
declare const $: any;
import { Config, Config as config } from '../configs/index.config';
import { AppRouteBase } from '../Shared/models/RouteItem.class';
import { saveAs } from 'file-saver';
import { EPageType, EValidationType, IBtn } from '../Shared/models/index.model';
import { environment } from 'src/environments/environment';
import { LoggerService } from '../other/logger/logger.service';
import { PageToComponentComponent } from '../Shared/components/page-to-component/page-to-component.component';
import { PageService } from './page.service';

@Injectable({ providedIn: 'root' })
export class UtilityService {
  r: AppRouteBase;
  downloader = jfd;
  $ = $;
  eValidationType = EValidationType;
  config = Config;
  environment = environment;
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public router: Router,
    private titleS: Title,
    private location: Location,
    private inputService: InputService,
    private routeService: RouteService,
    public pS: PageLoaderService,
    public currencyPipe: CurrencyPipe,
    public loggerService: LoggerService,
    public pageS: PageService
  ) {}
  back = () => this.location.back();
  async copyPayload(payload) {
    try {
      if (environment.debug) {
        const elem = document.createElement('textarea');
        elem.value = JSON.stringify(payload);
        document.body.appendChild(elem);
        elem.select();
        document.execCommand('copy');
        document.body.removeChild(elem);
      }
    } catch (e) {
      console.error(e);
    }
  }
  storePayload = this.loggerService.addLog;
  objIsEmpty = (obj, exclusionFields?: string[]) => {
    if (!obj) return true;
    for (const key in obj) {
      if (exclusionFields?.includes(key)) continue;
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (obj[key]) return false;
      }
    }
    return true;
  };
  dataGen = <T = any>(keys: string[], length = 10) => {
    const ret: any[] = [];
    for (let i = 0; i < length; i++) {
      let t: any = {};
      for (const key of keys) {
        t[key] = this.textGen();
      }
      ret.push(t);
    }
    return ret as T[];
  };
  textGen = () => 'random' + Math.round(Math.random() * 1000);
  trackByCode(index: number, item: any) {
    return item?.code;
  }
  trackByID(index: number, item: any) {
    return item?.id;
  }
  dialogOpener = (
    comp: any,
    config: MatDialogConfig,
    valueCB: any,
    noValueCB?: any
  ) =>
    this.dialogOpenerRef(comp, config)
      .afterClosed()
      .subscribe((r) => {
        if (r) {
          valueCB(r);
        } else if (noValueCB) {
          noValueCB();
        }
      });
  dialogOpenerRef = (comp: any, config: MatDialogConfig) =>
    this.dialog.open(comp, config);
  pageToModalOpener = (
    component: Type<any>,
    title: string,
    modelData?: any,
    pageType: EPageType = EPageType.createPage
  ) =>
    this.dialog
      .open(PageToComponentComponent, {
        data: { component, modelData, title, pageType },
        height: '100vh',
        maxHeight: '100vh',
        width: '100%',
        maxWidth: '100%',
        disableClose: true,
        closeOnNavigation: true,
        panelClass: 'fullscreen-modal',
        autoFocus: false,
      })
      .afterClosed();
  formFieldsFromArr = this.inputService.formFieldsFromFCInputsArr;
  objToFormControls = this.inputService.formFieldsFromObj;
  formSchemaToFormControls = this.inputService.formSchemaToFormControls;

  bindFormControlToInputs = this.inputService.bindFormControlToInputs;

  go = (value: string, extra?: NavigationExtras) => {
    this.router.navigate([value], extra);
  };
  moneyParser = (amount: string | number, currency = ' ') => {
    return this.currencyPipe.transform(amount, currency);
  };
  extractUpload(event: any) {
    return (event.target.files as File[]) || [];
  }

  secondsToHourMinSec = (seconds: number) => {
    if (!seconds) return { secs: null, hours: null, mins: null };
    const hours = Math.floor(seconds / 3600) || 0,
      secondsExHours = seconds % 3600 || 0,
      mins = Math.floor(secondsExHours / 60) || 0,
      secs = secondsExHours % 60;
    return { hours, mins, secs };
  };
  minutesToDayHourMin = (minutes: number) => {
    if (!minutes) return { dys: null, hours: null, mins: null };
    const days = Math.floor(minutes / 1440) || 0,
      miniutesExDays = minutes % 1440 || 0,
      hours = Math.floor(miniutesExDays / 60) || 0,
      mins = miniutesExDays % 60 || 0;
    return { days, hours, mins };
  };
  dayHourMinToHourMinutes = (dys: number, hrs: number, mins: number) => {
    if (!dys && !hrs && !mins) return '';
    const dysToHrs = (dys || 0) * 24;
    hrs = (+hrs || 0) + dysToHrs;
    return (hrs || '00') + ':' + (mins || '00');
  };
  dayHourMinToMinutes = (dys: number, hrs: number, mins: number) => {
    if (!dys && !hrs && !mins) return 0;
    const dysToHrs = (dys || 0) * 24;
    hrs = (+hrs || 0) + dysToHrs;
    return (hrs || 0) * 60 + mins;
  };
  hourMinToMinutes = (hrs: number, mins: number) => {
    if (!hrs && !mins) return null;
    return (hrs || 0) * 60 + mins;
  };
  hourMinToMinutes2 = (hrsMins: string) => {
    const [hrs, mins] = hrsMins?.split(':') || [0, 0];
    return this.hourMinToMinutes(+hrs, +mins);
  };
  notify(message: string, cls: 0 | 1 | 2 = 1, duration = 5000, title = '') {
    message =
      typeof message == 'string'
        ? message
        : cls == 0
        ? 'An error occurred'
        : '';
    return this.snackBar.open(message, title, {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: cls == 1 ? 'bg-success' : cls == 2 ? 'btn-info' : 'bg-danger',
    });
  }

  scrollToTop = () => window.scrollTo(0, 0);

  confirm(text: string) {
    return this.dialog
      .open(ConfirmDialogComponent, {
        data: text,
        height: 'auto',
        width: '380px',
        autoFocus: false,
      })
      .afterClosed()
      .toPromise()
      .then((r) => {
        if (r) {
          return true;
        } else {
          return false;
        }
      });
  }

  info = (
    text: string,
    status: 1 | 0 = 1,
    heading?: string,
    btns?: IBtn[],
    disableClose = true
  ) => {
    text =
      typeof text == 'string' ? text : status == 0 ? 'An error occurred' : '';
    return this.dialog
      .open(InfoDialogComponent, {
        data: {
          text,
          status: +status,
          heading: heading || (status ? 'Success!' : 'Oops!'),
          btns: btns?.filter((b) => b),
        },
        height: 'auto',
        minWidth: '380px',
        autoFocus: false,
        disableClose,
      })
      .afterClosed()
      .toPromise()
      .then((r) => {
        if (r) {
          return true;
        } else {
          return false;
        }
      });
  };
  dateFormat = (date: any, format = 1) => {
    if (!date) return null;
    const d = new Date(date);
    if (format == 1) {
      return d.toDateString();
    } else if (format == 2) {
      return d.getDate() + ' ' + config.Months[d.getMonth()];
    } else if (format == 3) {
      return d.toDateString() + ', ' + this.timeFormat(d.toLocaleTimeString());
    } else if (format == 4) {
      return config.Months[d.getMonth()] + ' ' + d.getDate();
    } else {
      return '';
    }
  };
  timeFormat = (time?: any) => {
    const timeArr: any[] = time.split(' ');
    timeArr[0] = timeArr[0].split(':').splice(0, 2).join(':');
    return timeArr.join(' ');
  };
  fullDateTime = (timestamp: string | number) => {
    return this.dateFormat(timestamp, 3);
  };
  daysFormatter = (days: number) => {
    if (!days) {
      return '-';
    }
    let yr: number,
      mt: number,
      dy: number,
      ret: string,
      _yr = 365,
      _mt = 30;
    if (days > _yr) {
      yr = Math.floor(days / _yr);
    }
    if (days > _mt) {
      mt = Math.floor((days % _yr) / _mt);
    }
    dy = (days % _yr) % _mt;
    ret = `${yr ? this.pluarlizer(yr, 'yr') : ''} ${
      mt ? this.pluarlizer(mt, 'mth') : ''
    } ${this.pluarlizer(dy, 'dy')}`;
    return ret;
  };
  monthsFormatter = (months: number) => {
    if (!months) {
      return '-';
    }
    let yr: number,
      mt: number,
      ret: string,
      _yr = 12;
    if (months > _yr) {
      yr = Math.floor(months / _yr);
    }
    mt = months % _yr;
    ret = `${yr ? this.pluarlizer(yr, 'yr') : ''} ${
      mt ? this.pluarlizer(mt, 'mth') : ''
    }`;
    return ret;
  };
  pluarlizer = (val: number, txt: string, plural?: string) => {
    plural = plural || txt + 's';
    return val + (val == 1 ? txt : plural);
  };
  decimalToPercentage = (dec: number) => {
    return dec * 100 + '%';
  };
  logForm = (form) => {
    console.log('FORM', form, 'VALUES', form.value);
  };

  toCSV(data: any[], headerNames: string[], filename: string) {
    const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here

    let csv = data.map((row) =>
      headerNames
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
    csv.unshift(headerNames.join(','));
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], { type: 'text/csv' });
    saveAs(blob, filename + '.csv');
  }

  isPictureFormat(fileName: string) {
    if (!fileName) return false;
    const PICTURE_FORMATS = ['.jpg', '.jpeg', '.png', '.gif'];
    return PICTURE_FORMATS.some((format) => fileName.endsWith(format));
  }
  objectToArray<T>(obj: any) {
    const ret = [];
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        ret.push(obj[key]);
      }
    }
    return ret as T[];
  }
  onlyUnique = <T>(value: T, index: number, self: T[]) => {
    return self.indexOf(value) === index;
  };
  get isMobile() {
    return window.innerWidth <= 600;
  }
  //#region route
  routeParams1 = this.routeService.routeParams1;
  routeParams2 = this.routeService.routeParams2;
  routeParams3 = this.routeService.routeParams3;
  appRoutes = this.routeService.appRoutes;
  //#endregion
  startPl = this.pS.startPl;
  stopPl = this.pS.stopPl;
}
