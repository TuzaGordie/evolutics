import { branchReducer } from "./BranchAPIStore/branch.reducer";
import { companyReducer } from "./CompanyAPIStore/company.reducer";
import { coreReducer } from "./CoreActions/core.reducer";
import { locationReducer } from "./LocationAPIStore/location.reducer";
import { StoreKeys } from "./store.keys";

export const reducers =  {
        [StoreKeys.company]:companyReducer,
        [StoreKeys.branch]:branchReducer,
        [StoreKeys.location]:locationReducer,
        [StoreKeys.core]:coreReducer,
}