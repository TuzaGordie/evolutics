import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class LocalCacheService extends CacheService {
  private readonly cacheKey = 'cacheKey';
  private readonly cacheCreatedDateKey = 'cacheCreatedDateKey';
  private readonly validityDays = 7;
  private readonly oneDayTimestamp = 86400000;
  constructor(public sS: StorageService) {
    super();
    try {
      const createdDate: number = sS.getItem(this.cacheCreatedDateKey);
      if (!createdDate) this.sS.saveItem(this.cacheCreatedDateKey, Date.now());
      else if (
        createdDate + this.validityDays * this.oneDayTimestamp <=
        Date.now()
      ) {
        this.sS.saveItem(this.cacheCreatedDateKey, Date.now());
        this.sS.removeItem(this.cacheKey);
      }
      sS.getItemA(this.cacheKey).then((r) => {
        try {
          for (const key in r) {
            if (Object.prototype.hasOwnProperty.call(r, key)) {
              this.setItem(key, r[key]);
            }
          }
        } catch (error) {
          console.error(error);
        }
      });
    } catch (e) {
      console.error(e);
      this.sS.removeItem(this.cacheKey);
    }
  }

  setItem <T>(key: string, data: T)  {
    return this.sS.saveItemA(this.cacheKey, super.setItem(key, data));
  };
}
