import { createAction, props } from '@ngrx/store';
import { IBranchState, ICreateBranch } from 'src/app/ApiModels/branch.interface'; 

export const fetchBranchListFromApi = createAction('[API/GET-ACTION] Branch list');
export const branchListRequestSuccess = createAction('[API/ACTION SUCCESS] Branch list',props<{branches: IBranchState[]}>());

export const createBranchRequest = createAction('[API/ACTION-POST] Create branch',props<{branch: ICreateBranch}>());
export const createBranchtRequestSuccess = createAction('[API/ACTION RESPONSE SUCCESS] Create',props<{response: any}>());
// export const getBranchCodeByPolicyNo = createAction('[ACTION] Branch Code by Policy Number', props<{policyNumber: number}>());