import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBranchState } from 'src/app/ApiModels/branch.interface';
import { StoreKeys } from '../store.keys';


const selectBranchFeature = createFeatureSelector(StoreKeys.branch)
export const selectBranchState = createSelector(
    selectBranchFeature,
    (state: { branches: IBranchState[] }) => state.branches
);
export const createBranchResponseState = createSelector(
    selectBranchFeature,
    (state: { response }) => state.response
);