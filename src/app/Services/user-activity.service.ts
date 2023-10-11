import { Injectable } from '@angular/core';
import { clone } from 'lodash-es';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ELanguage } from '../Shared/models/index.model';
import { EUA, UserActivity } from '../Shared/models/user-activity.model';
import { ApiService } from './api.service';
import { LocalCacheService } from './cache/local-cache.service';

@Injectable({
  providedIn: 'root',
})
export class UserActivityService {
  private baseURL = environment.apiBaseUrl + '/rest/user-activity/';
  private activities: UserActivity[] = [];

  constructor(private apiService: ApiService) {
    setInterval(() => {
      if (!this.activities?.length) return;
      const activities = clone(this.activities);
      this.activities = [];
      this.apiService.post(this.baseURL, activities).toPromise();
    }, 1000);
  }

  add = (code: EUA, metaStr?: string) => {
    this.activities.push(new UserActivity(code, metaStr));
  };
}
