
import { createReducer, on } from '@ngrx/store';
import * as CompanyActions from './currency.actions';


export const currencyReducer = createReducer(
    on(CompanyActions.currencyListRequestSuccess, (state, { currencies }) => ({ state, currencies })),
    on(CompanyActions.createCurrencyRequest, (state, { currency }) => ({ ...state, currency })),
    on(CompanyActions.createCurrencytRequestSuccess, (state, { response }) => ({ ...state, response })),
);

// export function reducer(state: State<[]> | undefined, action: Action) {
//     return currencyReducer(state, action);
// } 