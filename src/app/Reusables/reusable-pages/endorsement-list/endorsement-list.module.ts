import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EndorsementListRoutingModule } from './endorsement-list-routing.module';
import { EndorsementListComponent } from './endorsement-list.component';
import { AddEndorsementModule } from './add-endorsement/add-endorsement.module';
import { GenerateProformaModule } from './generate-proforma/generate-proforma.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { TablePlainModule } from 'src/app/Shared/components/table-plain/table-plain.module';


@NgModule({
  declarations: [
    EndorsementListComponent
  ],
  imports: [
    CommonModule,
    EndorsementListRoutingModule,
    AddEndorsementModule,
    GenerateProformaModule,SharedModule,TablePlainModule
  ]
})
export class EndorsementListModule { }
