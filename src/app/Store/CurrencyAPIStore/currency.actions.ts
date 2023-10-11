import { createAction, props } from '@ngrx/store';
import { ICurrencyState, ICreateCurrency } from './currency.interface'; 

export const fetchCurrencyListFromApi = createAction('[API/GET-ACTION] Currency list');
export const currencyListRequestSuccess = createAction('[API/ACTION SUCCESS] Currency list',props<{currencies: ICurrencyState[]}>());

export const createCurrencyRequest = createAction('[API/ACTION-POST] Create currency',props<{currency: ICreateCurrency}>());
export const createCurrencytRequestSuccess = createAction('[API/ACTION RESPONSE SUCCESS] Create',props<{response: any}>());
// export const getCurrencyCodeByPolicyNo = createAction('[ACTION] Currency Code by Policy Number', props<{policyNumber: number}>());