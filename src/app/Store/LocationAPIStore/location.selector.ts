import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICountryData, ILgaState, IRegionState, IStateState, ITownState } from 'src/app/ApiModels/location.interface';
import { StoreKeys } from '../store.keys';


export const selectLocationFeature = createFeatureSelector(StoreKeys.location)
export const selectCountryState = createSelector(
    selectLocationFeature,
    (state: { countries: ICountryData[] }) =>  state.countries
);
export const selectStateState = createSelector(
    selectLocationFeature,
    (state: { states: IStateState[] }) =>  state.states
);
export const selectRegionState = createSelector(
    selectLocationFeature,
    (state: { regions: IRegionState[] }) => state.regions
);
export const selectLgaState = createSelector(
    selectLocationFeature,
    (state: { lgas: ILgaState[] }) => state.lgas
);
export const selectTownState = createSelector(
    selectLocationFeature,
    (state: { towns: ITownState[] }) => state.towns
);