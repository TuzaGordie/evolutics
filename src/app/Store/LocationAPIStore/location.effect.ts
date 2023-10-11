import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { LocationService } from 'src/app/Services/location.service';
import * as LocationActions from "./location.actions"
import * as CoreActions from "../CoreActions/core.action"
@Injectable()
export class LocationEffects {

  getCountries$ = createEffect(() => this.actions$.pipe(
    ofType(LocationActions.fetchCountryListFromApi),
    exhaustMap((action) =>
      this._locationService.getCountries()
        .pipe(
          map(countries => LocationActions.countryListRequestSuccess({ countries }),
            catchError((error) => of(CoreActions.apiErrorAction(error)))
          )
        )
    )));
  getRegion$ = createEffect(() => this.actions$.pipe(
    ofType(LocationActions.fetchRegionListFromApi),
    exhaustMap((action) =>
      this._locationService.getRegion(action.country)
        .pipe(
          map(regions => LocationActions.regionListRequestSuccess({ regions }),
            catchError((error) => of(CoreActions.apiErrorAction(error)))
          )
        )
    )));
  getStates$ = createEffect(() => this.actions$.pipe(
    ofType(LocationActions.fetchStateListFromApi),
    exhaustMap((action) =>
      this._locationService.getStates(action.region)
        .pipe(
          map(states => LocationActions.stateListRequestSuccess({ states }),
            catchError((error) => of(CoreActions.apiErrorAction(error)))
          )
        )
    )));



  getLgas$ = createEffect(() => this.actions$.pipe(
    ofType(LocationActions.fetchLgaListFromApi),
    exhaustMap((action) =>
      this._locationService.getLGA()
        .pipe(
          map(lgas => LocationActions.lgaListRequestSuccess({ lgas }),
            catchError((error) => of(CoreActions.apiErrorAction(error)))
          )
        )
    )));

  getTown$ = createEffect(() => this.actions$.pipe(
    ofType(LocationActions.fetchTownListFromApi),
    exhaustMap((action) =>
      this._locationService.getTown(action.stateCode)
        .pipe(
          map(towns => LocationActions.townRequestSuccess({ towns }),
            catchError((error) => of(CoreActions.apiErrorAction(error)))
          )
        )
    )));


  constructor(
    private actions$: Actions,
    private _locationService: LocationService
  ) { }
}