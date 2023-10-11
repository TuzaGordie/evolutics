import { createAction, props } from '@ngrx/store';
import { ICompanyState } from 'src/app/ApiModels/company.interface';

export const fetchCompanyListFromApi = createAction('[API/GET-ACTION] Company list');
export const companyListRequestFailed = createAction('[API/ACTION FAILED] Company list',props<{message: string}>());
export const companyListRequestSuccess = createAction('[API/ACTION SUCCESS] Company list',props<{companies: ICompanyState[]}>());
// export const getCompanyCodeByPolicyNo = createAction('[ACTION] Company Code by Policy Number', props<{policyNumber: number}>());