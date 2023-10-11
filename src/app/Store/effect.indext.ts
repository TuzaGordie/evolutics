import { BranchEffects } from "./BranchAPIStore/branch.effect";
import { CompanyEffects } from "./CompanyAPIStore/company.effect";
import { LocationEffects } from "./LocationAPIStore/location.effect";

export const effects = [CompanyEffects,BranchEffects,LocationEffects]