import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { CompanyService } from 'src/app/Services/life/company.service';
import * as CompanyActions from "./company.actions"
import * as CoreActions from "../CoreActions/core.action"

@Injectable()
export class CompanyEffects {
 
  getCompanies$ = createEffect(() => this.actions$.pipe(
    ofType(CompanyActions.fetchCompanyListFromApi),
    exhaustMap((action) => 
    this._companyService.getCompanyCodeAndDesc() 
      .pipe(
        map(companies => CompanyActions.companyListRequestSuccess({companies} ),
        catchError( (error) => of(CoreActions.apiErrorAction(error)))
      )
    )
  )));

  // filterCompanyList$ = createEffect(() => this.actions$.pipe(
  //   ofType(CompanyActions.companyListRequestSuccess),
  //   exhaustMap((value) => value.companies )
  // ))
 
  constructor(
    private actions$: Actions,
    private _companyService: CompanyService
  ) {}
}