import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICurrencyState } from './currency.interface';
import { StoreKeys } from '../store.keys';


const selectCurrencyFeature = createFeatureSelector(StoreKeys.currency)
export const selectCurrencyState = createSelector(
    selectCurrencyFeature,
    (state: { currencies: ICurrencyState[] }) => state.currencies
);
export const createCurrencyResponseState = createSelector(
    selectCurrencyFeature,
    (state: { response }) => state.response
);