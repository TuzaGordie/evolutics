import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private _cache: { [x: string]: any } = {};

  constructor() {}

  get cache() {
    return this._cache;
  }

  has = (key: string) => Object.keys(this._cache).includes(key);

  getItem = <T>(key: string) => this._cache[key] as T;

  setItem <T>(key: string, data: T)  {
    this._cache[key] = data;
    return this._cache;
  };
}
