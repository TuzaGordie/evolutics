import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { CurrencyService } from 'src/app/Services/life/currency.service';
import * as CurrencyActions from "../CurrencyAPIStore/currency.actions"
import * as CoreActions from "../CoreActions/core.action"


@Injectable()
export class CurrencyEffects {

  getCurrencyes$ = createEffect(() => this.actions$.pipe(
    ofType(CurrencyActions.fetchCurrencyListFromApi),
    exhaustMap((action) =>
      this._currencyService.getCurrency()
        .pipe(
          map(currencies => CurrencyActions.currencyListRequestSuccess({ currencies }),
            catchError((error) => of(CoreActions.apiErrorAction(error)))
          )
        )
    )));

  createCurrency$ = createEffect(() => this.actions$.pipe(
    ofType(CurrencyActions.createCurrencyRequest),
    exhaustMap((action) => {
      console.log("Effect action", action); return this._currencyService.createCurrencyCode(action as any).pipe(
        map(response => CurrencyActions.createCurrencytRequestSuccess({ response }),
          catchError((error) => of(CoreActions.apiErrorAction(error)))
        )
      )
    }

    )));

  constructor(
    private actions$: Actions,
    private _currencyService: CurrencyService
  ) { }
}