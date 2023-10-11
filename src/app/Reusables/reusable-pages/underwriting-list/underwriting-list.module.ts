import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnderwritingListRoutingModule } from './underwriting-list-routing.module';
import { UnderwritingListComponent } from './underwriting-list.component';
import { TablePlainModule } from 'src/app/Shared/components/table-plain/table-plain.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { UnderwritingListDecisionComponent } from './underwriting-list-decision/underwriting-list-decision.component';
import { UnderwritingDocumentComponent } from './underwriting-document/underwriting-document.component';


@NgModule({
  declarations: [
    UnderwritingListComponent,
    UnderwritingListDecisionComponent,
    UnderwritingDocumentComponent
  ],
  imports: [
    CommonModule,
    UnderwritingListRoutingModule,TablePlainModule,SharedModule
  ]
})
export class UnderwritingListModule { }
