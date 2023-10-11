import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class PageLoaderService {
  private _pageLoaders: 1[] = [];
  constructor() {}
  get pageLoader() {
    return this._pageLoaders?.length > 0;
  }
  startPl = (value = 1) => {
    for (let index = 0; index < value; index++) {
      this._pageLoaders.push(1);
    }
    return this._pageLoaders?.length;
  };
  restartPl = () => {
    this._pageLoaders = [];
    this.startPl();
  };
  stopPl = (value = 1) => {
    for (let index = 0; index < value; index++) {
      this._pageLoaders.pop();
    }
    return this._pageLoaders?.length;
  };
  stopAllPls = () => {
    this._pageLoaders = [];
  };
}
