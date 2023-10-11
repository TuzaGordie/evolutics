
import { createReducer, on } from '@ngrx/store';
import * as LocationActions from './location.actions';

export const locationReducer = createReducer(
    new Array(3),
    on(LocationActions.countryListRequestSuccess, (state, {countries}) =>  ({...state, countries})),
    on(LocationActions.stateListRequestSuccess, (state, {states}) =>  ({...state, states})),
    on(LocationActions.lgaListRequestSuccess, (state, {lgas}) =>  ({...state, lgas})),
    on(LocationActions.regionListRequestSuccess, (state, {regions}) =>  ({...state, regions})),
    on(LocationActions.fetchTownListFromApi, (state, {stateCode}) =>  ({...state, stateCode})),
    on(LocationActions.townRequestSuccess, (state, {towns}) =>  ({...state, towns})),
);
 