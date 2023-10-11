import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { BranchService } from 'src/app/Services/life/branch.service';
import * as BranchActions from "../BranchAPIStore/branch.actions"
import * as CoreActions from "../CoreActions/core.action"


@Injectable()
export class BranchEffects {

  getBranches$ = createEffect(() => this.actions$.pipe(
    ofType(BranchActions.fetchBranchListFromApi),
    exhaustMap((action) =>
      this._branchService.getBranchCodeAndDesc()
        .pipe(
          map(branches => BranchActions.branchListRequestSuccess({ branches }),
            catchError((error) => of(CoreActions.apiErrorAction(error)))
          )
        )
    )));

  createBranch$ = createEffect(() => this.actions$
    .pipe(
      ofType(BranchActions.createBranchRequest),
      exhaustMap(
        (action) => this._branchService.createBranch(action.branch)
          .pipe(
            map(response => BranchActions.createBranchtRequestSuccess({ response }),
              catchError((error) => of(CoreActions.apiErrorAction(error)))
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private _branchService: BranchService
  ) { }
}