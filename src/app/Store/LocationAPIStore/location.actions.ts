import { createAction, props } from '@ngrx/store';
import { ICountryData, ILgaState, IRegionState, IStateState, ITownState } from 'src/app/ApiModels/location.interface';

/**
 * Country Actions
 */
export const fetchCountryListFromApi = createAction('[API/GET-ACTION] Country list');
export const countryListRequestSuccess = createAction('[API/ACTION SUCCESS] Country list',props<{countries: ICountryData[]}>());

/**
 * LGA Actions
 */
 export const fetchStateListFromApi = createAction('[API/GET-ACTION] State list', props<{region: string}>());
 export const stateListRequestSuccess = createAction('[API/ACTION SUCCESS] States list',props<{states: IStateState[]}>());


/**
 * LGA Actions
 */
export const fetchLgaListFromApi = createAction('[API/GET-ACTION] LGA\'s list');
export const lgaListRequestSuccess = createAction('[API/ACTION SUCCESS] LGA\'s list',props<{lgas: ILgaState[]}>());

/**
 * Region Action
 */
 export const fetchRegionListFromApi = createAction('[API/GET-ACTION] Region list',props<{country: string}>());
 export const regionListRequestSuccess = createAction('[API/ACTION SUCCESS] Regions list',props<{regions: IRegionState[]}>());
 
 
/**
 * Town Action
 */
 export const fetchTownListFromApi = createAction('[API/GET-ACTION] Town list', props<{stateCode: string}>());
 export const townRequestSuccess = createAction('[API/ACTION SUCCESS] Town list',props<{towns: ITownState[]}>());
 
 
  