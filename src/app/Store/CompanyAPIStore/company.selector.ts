import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICompanyState } from 'src/app/ApiModels/company.interface';
import { StoreKeys } from '../store.keys';


export const selectCompanyFeature = createFeatureSelector(StoreKeys.company)
export const selectCompanyState = createSelector(
    selectCompanyFeature,
    (state: { companies: ICompanyState[] }) => state.companies
);