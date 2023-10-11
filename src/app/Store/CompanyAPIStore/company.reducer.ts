
import { createReducer, on } from '@ngrx/store';
import * as CompanyActions from './company.actions';


export const companyReducer = createReducer(
    [],
    on(CompanyActions.companyListRequestFailed, (state, error) => ({ ...state,error,errorMessage: "Failed to get company list" })),
    on(CompanyActions.companyListRequestSuccess, (state,{companies}) =>  ({...state, companies})),
);

// export function reducer(state: State<[]> | undefined, action: Action) {
//     return companyReducer(state, action);
// } 