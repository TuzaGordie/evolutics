import { CommonModule } from '@angular/common';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserMenuConfigDetail } from 'src/app/Life/admin/user/usermenu/usermenu-extras/usermenu.interface';
import { PageLoaderService } from 'src/app/Services/page-loader.service';
import { PageService } from 'src/app/Services/page.service';
import { TranslationService } from 'src/app/Services/translation.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { environment } from 'src/environments/environment';
import { EPageType, MenuItem } from '../models/index.model';

@Pipe({
  name: 'arraySplitter',
})
export class ArraySplitter implements PipeTransform {
  transform<T>(
    arr: T[],
    arrLength: number,
    startIndex: number,
    endIndex?: number
  ) {
    return arr
      ? arr.slice(startIndex, endIndex ? endIndex + 1 : undefined)
      : [];
  }
}

@Pipe({
  name: 'gender',
})
export class GenderPipe implements PipeTransform {
  transform(value: string) {
    return value == 'M' ? 'Male' : value == 'F' ? 'Female' : value;
  }
}
@Pipe({
  name: 'round',
})
export class RoundPipe implements PipeTransform {
  transform(value: number) {
    return Math.round(value);
  }
}
@Pipe({
  name: 'secondsToTime',
})
export class SecondsToTimePipe implements PipeTransform {
  transform(value: number) {
    const timeLeft = this.uS.secondsToHourMinSec(value);
    return `${timeLeft.hours ? timeLeft.hours + 'hrs' : ''}
  ${timeLeft.mins ? timeLeft.mins + 'min' : ''} ${
      timeLeft.secs ? timeLeft.secs + 's' : ''
    }`;
  }
  constructor(public uS: UtilityService) {}
}

@Pipe({
  name: 'functionCaller',
})
export class FunctionCaller implements PipeTransform {
  transform<T>(func: () => T) {
    return func();
  }
}
@Pipe({
  name: 'getCodeDescription',
})
export class GetCodeDescriptionCaller implements PipeTransform {
  transform(
    code: string,
    list: any[],
    descriptionField = 'description',
    codeField = 'code'
  ): string {
    if (!code) return null;
    if (!list) return code;
    const item = list.find((x) => x[codeField] == code);
    if (!item) return code;
    return code + ' - ' + item[descriptionField] || item['title'];
  }
}

@Pipe({
  name: 'valueFormatter',
})
export class ValueFormatterPipe implements PipeTransform {
  async transform(val, formatter: any) {
    return formatter ? formatter(val) : val;
  }
}
@Pipe({
  name: 'functionCaller1',
})
export class FunctionCaller1 implements PipeTransform {
  transform<T>(func: (param: any) => T, param: any) {
    return func(param);
    // return param ? func(param) : null;
  }
}
@Pipe({
  name: 'functionCaller2',
})
export class FunctionCaller2 implements PipeTransform {
  transform<T>(
    func: (param1: any, param2: any) => T,
    param1: any,
    param2: any
  ) {
    // if(func) debugger
    return func ? func(param1, param2) : null;
    // return param1 ? (param2 ? func(param1, param2) : null) : null;
  }
}
@Pipe({
  name: 'functionCaller3',
})
export class FunctionCaller3 implements PipeTransform {
  transform<T>(
    func: (param1: any, param2: any, param3: any) => T,
    param1: any,
    param2: any,
    param3: any
  ) {
    return func(param1, param2, param3);
    // return param1 ? (param2 ? func(param1, param2) : null) : null;
  }
}
@Pipe({
  name: 'httpListCaller',
})
export class HttpListCaller implements PipeTransform {
  // transform<T>(httpObservable: any) {
  transform<T>(httpObservable: () => Observable<T>) {
    // console.log('ran functionCaller', httpObservable);
    return httpObservable();
  }
}

@Pipe({
  name: 'httpListCaller1',
})
export class HttpListCaller1 implements PipeTransform {
  transform<T>(httpObservable: (param: any) => Observable<T>, param: any) {
    // console.log('ran functionCaller1', httpObservable);
    return httpObservable(param);
    // return param ? httpObservable(param) : null;
  }
}
@Pipe({
  name: 'httpListCaller2',
})
export class HttpListCaller2 implements PipeTransform {
  transform<T>(
    httpObservable: (param1: string, param2: string) => Observable<T>,
    param1: string,
    param2: string
  ) {
    // console.log('ran httpListCaller2', httpObservable);
    return httpObservable(param1, param2);
    // return param1 ? (param2 ? httpObservable(param1, param2) : null) : null;
  }
}
@Pipe({
  name: 'isShowPage',
})
export class IsShowPage implements PipeTransform {
  transform(type: EPageType) {
    return type == EPageType.showPage ? true : false;
  }
}
@Pipe({
  name: 'isClonePage',
})
export class IsClonePage implements PipeTransform {
  transform(type: EPageType) {
    return type == EPageType.clonePage ? true : null;
  }
}
@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform<T>(arr: T[], direction: 0 | 1 = 0, sortField?: string) {
    //    console.log('SORTTER', arr, direction, sortField);
    if (!arr) {
      return null;
    }
    if (direction > -1 && direction < 2) {
      return this.sort(arr, direction, sortField);
    } else {
      return arr;
    }
  }
  sort<T>(arr: T[], direction: 0 | 1, sortField?: string) {
    if (sortField) {
      return arr.sort((x: any, y: any) =>
        direction ? y[sortField] - x[sortField] : x[sortField] - y[sortField]
      );
    } else {
      return arr.sort((x: any, y: any) => (direction ? y - x : x - y));
    }
  }
}
@Pipe({
  name: 'toAny',
})
export class ToAnyPipe implements PipeTransform {
  transform(value: any) {
    return value;
  }
}

@Pipe({ name: 'isMenuEnabled' })
export class IsMenuEnabledPipe implements PipeTransform {
  transform(menu: MenuItem, userMenu: IUserMenuConfigDetail[]) {
    // const ret = environment.activeSystems?.length
    //   ? !environment.activeSystems.includes(menu.system)
    //   : false;
    // console.log(ret, menu, environment.activeSystems);
    // if (environment.production) return true;
    const ret = {enabled:userMenu?.find((x) => x.slug == menu.id)?.access};
    // debugger
    return ret;
  }
}

@Pipe({ name: 'appTranslate' })
export class TranslatePipe implements PipeTransform {
  transform(text: string | number, translate = true) {
    return new Observable<string>((res) => {
      res.next(text as any);
      if (
        !translate ||
        !(environment.translate && environment.targetLanguage)
      ) {
        res.complete();
        res.unsubscribe();
      } else {
        this.pageLS.startPl();
        this.tS.translateHTML(text as any).subscribe(
          (r) => {
            res.next(r);
            res.complete();
            res.unsubscribe();
            this.pageLS.stopPl();
          },
          (e) => {
            res.complete();
            res.unsubscribe();
            this.pageLS.stopPl();
          }
        );
      }
    });
  }
  constructor(
    private tS: TranslationService,
    private pageLS: PageLoaderService
  ) {}
}

const comps = [
  ArraySplitter,
  FunctionCaller,
  FunctionCaller1,
  FunctionCaller2,
  FunctionCaller3,
  GenderPipe,
  GetCodeDescriptionCaller,
  HttpListCaller,
  HttpListCaller1,
  HttpListCaller2,
  IsClonePage,
  IsMenuEnabledPipe,
  IsShowPage,
  RoundPipe,
  SecondsToTimePipe,
  SortPipe,
  ToAnyPipe,
  TranslatePipe,
  ValueFormatterPipe,
];
const modules = [];
@NgModule({
  declarations: comps,
  imports: [CommonModule, ...modules],
  exports: [...comps, ...modules],
})
export class UtilityPipesModule {}
