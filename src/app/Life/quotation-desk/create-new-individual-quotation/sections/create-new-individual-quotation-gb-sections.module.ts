import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { BeneficiaryComponent } from './beneficiary/beneficiary.component';
import { CoverDetailsComponent } from './cover-details/cover-details.component';
import { UnderWritingComponent } from './under-writing/under-writing.component';
import { OwnerInfoComponent } from './owner-info/owner-info.component';
import { AgentComponent } from './agent/agent.component';
import { CreateNewIndividualQuotationGbModalsModule } from '../modals/create-new-individual-quotation-gb-modals.module';
import { RouterModule } from '@angular/router';

const comps = [
  AgentComponent,
  BeneficiaryComponent,
  CoverDetailsComponent,
  OwnerInfoComponent,
  UnderWritingComponent,
];
@NgModule({
  declarations: comps,
  exports: comps,
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    CreateNewIndividualQuotationGbModalsModule,
    RouterModule,
  ],
})
export class CreateNewIndividualQuotationGbSectionsModule {}
