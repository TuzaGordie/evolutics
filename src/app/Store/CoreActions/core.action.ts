import { createAction, props } from "@ngrx/store";

export const apiErrorAction = createAction('[API/ACTION REQUEST FAILED] Branch list',props<{error:any}>());
