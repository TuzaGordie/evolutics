import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StoreKeys } from "../store.keys";

const apiResponseFailureStateFeatureSelector = createFeatureSelector(StoreKeys.core);

export const apiResponseFailureState = createSelector(apiResponseFailureStateFeatureSelector,(state:{error}) => state.error);