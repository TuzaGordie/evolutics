import { Injectable } from '@angular/core';
import { clone } from 'lodash-es';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ELanguage } from '../Shared/models/index.model';
import { ApiService } from './api.service';
import { LocalCacheService } from './cache/local-cache.service';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private baseURL = environment.apiBaseUrl + '/rest/translation/';
  private translationRequestMatrix: { [x: number]: string } = {};
  private translationResponseMatrix: BehaviorSubject<{ [x: number]: string }> =
    new BehaviorSubject({});
  readonly seperator = '~~~';
  constructor(private apiService: ApiService, public lCacheS: LocalCacheService) {
    setInterval(() => {
      const body = clone(this.translationRequestMatrix);
      this.translationRequestMatrix = {};
      if (Object.keys(body)?.length) {
        // debugger;
        this.apiService
          .postString(
            this.baseURL + `language/${environment.targetLanguage}`,
            Object.keys(body)
              .map((id) => this.tagger(+id, body[id]))
              .join(this.seperator)
          )
          .toPromise()
          .then((r) => {
            this.translationResponseMatrix.next(this.detagger(r));
          })
          .catch((e) => {
            console.error(e);
          });
      }
    }, 1000);
  }

  tagger(id: number, str: string) {
    return `<div id="${id}">${str}</div>`;
  }

  detagger(str: string) {
    const items = str?.split(this.seperator);
    const resobj = {};
    for (const str of items) {
      resobj[str?.split('"')[1]] = str?.split('>')[1]?.split('</div')[0];
    }
    return resobj;
  }

  translateHTML = (
    HTMLString: string,
    sourceLanguage = environment.sourceLanguage,
    targetLanguage = environment.targetLanguage,
    debug = false
  ) => {
    return new Observable<string>((res) => {
      if (debug) debugger;

      const text = HTMLString?.trim(),
        route = this.baseURL + `language/${targetLanguage}`;

      if (!text) {
        res.next(HTMLString);
        res.complete();
      } else if (this.lCacheS.has(route + '_' + text)) {
        res.next(this.lCacheS.getItem<string>(route + '_' + text));
        res.complete();
      } else {
        const id = Math.round(Math.random() * 1000000000000000);
        this.translationRequestMatrix[id] = text;
        const sub: Subscription = this.translationResponseMatrix.subscribe(
          (r) => {
            if (debug) debugger;
            const transVal = r[id.toString()];
            if (transVal) {
              res.next(transVal);
              this.lCacheS.setItem(route + '_' + text, transVal);
              res.complete();
              sub.unsubscribe();
            }
          },
          (e) => {
            res.error(e);
          }
        );
      }
    });
  };
  translateHTMLPromise = (
    text: string,
    sourceLanguage = environment.sourceLanguage,
    targetLanguage = environment.targetLanguage,
    debug = false
  ) =>
    this.translateHTML(
      text,
      sourceLanguage,
      targetLanguage,
      debug
    )?.toPromise();
} 