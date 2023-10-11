import { Injectable } from '@angular/core';
import { merge } from 'rxjs';
import { ApiService } from '../api.service';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class CacheUpdaterService {
  constructor(public apiService: ApiService) {}
  update = (cacheS: CacheService) => {
    return merge(
      Object.keys(cacheS.cache).map((key) =>
        this.apiService.get(key).subscribe((r) => {
          cacheS.setItem(key, r);
        })
      )
    );
  };
}
