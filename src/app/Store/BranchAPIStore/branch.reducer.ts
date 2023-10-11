
import { createReducer, on } from '@ngrx/store';
import * as CompanyActions from './branch.actions';


export const branchReducer = createReducer(
    new Array(4),
    on(CompanyActions.branchListRequestSuccess, (state,{branches}) =>  ({...state, branches})),
    on(CompanyActions.createBranchRequest, (state,{branch}) =>  ({...state, branch})),
    on(CompanyActions.createBranchtRequestSuccess, (state,{response}) =>  ({...state, response})),
);

// export function reducer(state: State<[]> | undefined, action: Action) {
//     return branchReducer(state, action);
// } 