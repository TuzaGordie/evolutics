import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';
import { environment } from 'src/environments/environment';
import { Config } from '../configs/index.config';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  secret: string = Config.secretKey;
  get isProduction() {
    return environment.production;
  }

  constructor() {}
  encrypt = (data, key = this.secret) => {
    return AES.encrypt(JSON.stringify(data), key).toString();
  };

  decrypt = (data, key = this.secret) => {
    return JSON.parse(AES.decrypt(data, key).toString(enc.Utf8));
  };

  saveItem = <T>(key: string, data: T) => {
    try {
      localStorage.setItem(
        key,
        !(data == null || data == undefined)
          ? this.isProduction
            ? this.encrypt(data)
            : JSON.stringify(data)
          : ''
      );
      return data;
    } catch (error) { 
      if (error.name == 'QuotaExceededError') {
        this.clear();
        return this.saveItem(key, data);
      } else {
        return null;
      }
    }
  };

  saveItemA = <T>(key: string, data: T) =>
    new Promise<T>((resolve) => {
      resolve(this.saveItem(key, data));
    });

  getItem = <T = any>(key: string, _throw = false) => {
    const encryptedRes = localStorage.getItem(key);
    try {
      return this.isProduction
        ? encryptedRes
          ? <T>this.decrypt(encryptedRes)
          : null
        : <T>JSON.parse(encryptedRes);
    } catch (e) {
      console.error(e);
      this.saveItem('_temp' + key, encryptedRes);
      this.removeItem(key);
      if (_throw) {
        throw new Error('Item not found');
      } else {
        return null;
      }
    }
  };
  getItemA = <T = any>(key: string) => {
    return new Promise<T>((resolve, reject) => {
      try {
        resolve(this.getItem(key));
      } catch (error) {
        reject(error);
      }
    });
  };

  removeItem = (key: string) => {
    return localStorage.removeItem(key);
  };

  clear = () => {
    return localStorage.clear();
  };
}
