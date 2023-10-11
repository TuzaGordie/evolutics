import {NgModule} from "@angular/core";
import { DocUrlPipe } from "./docUrl.pipe";
import { GetAgePipe } from "./get-age.pipe";
import { IdDisplayNamePipe } from "./id-display-name.pipe";
import { StripTimePipe } from "./strip-time.pipe";
import { PendingQuotesLengthPipe } from "./pending-quotes-length.pipe";
import { PendingQuotesFilterPipe } from "./pending-quotes-filter.pipe";
import { GetStatusNamePipe } from './get-status-name.pipe';
import { GetStatusColourPipe } from './get-status-colour.pipe';
import { GenderPipe } from './gender.pipe';
import { MaritalStatusPipe } from './marital-status.pipe';

@NgModule({
  declarations: [
    GetAgePipe,
    IdDisplayNamePipe,
    StripTimePipe,
    DocUrlPipe,
    PendingQuotesLengthPipe,
    PendingQuotesFilterPipe,
    GetStatusNamePipe,
    GetStatusColourPipe,
    GenderPipe,
    MaritalStatusPipe,
  ],
  exports:[
    GetAgePipe,
    IdDisplayNamePipe,
    StripTimePipe,
    DocUrlPipe,
    PendingQuotesFilterPipe,
    PendingQuotesLengthPipe,
    GetStatusNamePipe,
    GetStatusColourPipe,
    GenderPipe,
    MaritalStatusPipe,
  ]
})
export class CRMSClientPipesModule{}