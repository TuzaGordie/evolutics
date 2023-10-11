import { createReducer, on } from '@ngrx/store';
import * as CoreActions from './core.action';


export const coreReducer = createReducer(null,
    on(CoreActions.apiErrorAction, (state,{error}) =>  ({...state, error})),
);