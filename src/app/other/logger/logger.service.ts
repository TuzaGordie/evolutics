import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/Services/storage.service';
import { Log } from './logger.interface';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  readonly logAuthKey = 'logAuth';
  readonly logsKey = 'logs';
  private _logs: Log[] = [];
  private _isAuthed: boolean;
  readonly pwd = '1234';
  get logs() {
    return this._logs
  }
  constructor(public sS: StorageService) {
    setInterval(() => {
      this.getLogs();
      
    }, 1000);
    this.checkAuth();
  }
  addLog(
    payload: any,
    files: File[],
    isSuccess: boolean,
    title: string,
    route = location.pathname
  ) {
    this.pushLog(new Log(payload, files, isSuccess, title, route));
  }
  pushLog(log: Log) {
    if (!Array.isArray(this._logs)) this._logs = []; 
    this._logs?.sort2('time').reverse();
    if (this._logs.length >= 20) this._logs.pop();
    this._logs.unshift(log);
    this.saveToLocal();
  }
  saveToLocal() {
    this.sS.saveItem(this.logsKey, this._logs);
  }
  unlock() {
    this.sS.saveItem(this.logAuthKey, this.pwd);
    this.checkAuth();
  }
  lock() {
    this.sS.removeItem(this.logAuthKey);
    this.checkAuth();
  }
  getLogs() {
    this.sS
      .getItemA<Log[]>(this.logsKey)
      .then((r) => (this._logs = r?.sort2('time').reverse() || []));
      return this._logs
  }
  checkAuth() {
    this._isAuthed = this.sS.getItem(this.logAuthKey) == this.pwd;
  }
  get isAuthed() {
    return this._isAuthed;
  }
}
