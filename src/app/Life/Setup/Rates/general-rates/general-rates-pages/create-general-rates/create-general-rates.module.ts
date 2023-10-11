import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateGeneralRatesRoutingModule } from './create-general-rates-routing.module';
import { CreateGeneralRatesComponent } from './create-general-rates.component';
import { RatesSharedModule } from '../../../rates-extras/rates-shared.module';
import { LookupDialogBoxComponent } from '../../general-rates-comps/lookup-dialog-box/lookup-dialog-box.component';
import { MatrixDialogBoxComponent } from '../../general-rates-comps/matrix-dialog-box/matrix-dialog-box.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RateEntryFormComponent } from '../../general-rates-comps/rate-entry-form/rate-entry-form.component';
import { GeneralRatesPipesModule } from '../../general-rates-extras/general-rates.pipe';
import { UnderwritingTableFormComponent } from '../../general-rates-comps/rate-entry-form/underwriting-table-form/underwriting-table-form.component';
import { TablePlainModule } from 'src/app/Shared/components/table-plain/table-plain.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { GeneralRatesService } from '../../general-rates-extras/general-rates.service';

@NgModule({
  declarations: [
    CreateGeneralRatesComponent,
    LookupDialogBoxComponent,
    MatrixDialogBoxComponent,
    RateEntryFormComponent,
    UnderwritingTableFormComponent
  ],
  imports: [
    CommonModule,
    CreateGeneralRatesRoutingModule,
    RatesSharedModule,
    MatDialogModule,
    GeneralRatesPipesModule,
    SharedModule,
    TablePlainModule,
  ],
  providers: [GeneralRatesService],
})
export class CreateGeneralRatesModule {}
