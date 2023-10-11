import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { GroupOwnerInfoComponent } from './owner-info/owner-info.component';
import { GroupAgentComponent } from './agent/agent.component';
import { GroupAssetComponent } from './assets/asset.component';
import { BeneficiaryComponent } from './beneficiary/beneficiary.component';
import { GroupCoverDetailsComponent } from './cover-details/cover-details.component';
import { MemberComponent } from './members/members.component';
import { RouterModule } from '@angular/router';
import { CreateNewIndividualQuotationGbModalsModule } from '../../create-new-individual-quotation-gb/modals/create-new-individual-quotation-gb-modals.module';
import { GroupQutePolicyComponent } from './quote-policy/quote-policy.component';

const comps = [
  GroupOwnerInfoComponent,
  GroupAgentComponent,
  GroupAssetComponent,
  BeneficiaryComponent,
  GroupCoverDetailsComponent,
  MemberComponent,
  GroupQutePolicyComponent
];

@NgModule({
  declarations: comps,
  exports: comps,
  imports: [CommonModule, SharedModule, ComponentsModule, RouterModule, ReactiveFormsModule, CreateNewIndividualQuotationGbModalsModule],
})
export class NewGroupQuotationGbSectionsModule {}
