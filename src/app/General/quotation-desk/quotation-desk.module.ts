import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { QuotationDeskRoutingModule } from './quotation-desk-routing.module';
import { CreateNewIndividualQuotationGBComponent } from './create-new-individual-quotation-gb/create-new-individual-quotation-gb.component';
import { GroupQuotationGBComponent } from './group-quotation-gb/group-quotation-gb.component';
import { IndividualQuotationGBComponent } from './individual-quotation-gb/individual-quotation-gb.component';
import { NewGroupQuotationGBComponent } from './new-group-quotation-gb/new-group-quotation-gb.component';
import {
  ClientDetailsResolver,
  GroupOwnerDetailsResolver,
} from '../services/quotation-resolvers.service';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { CreateNewIndividualQuotationGbModalsModule } from './create-new-individual-quotation-gb/modals/create-new-individual-quotation-gb-modals.module';
import { CreateNewIndividualQuotationGbSectionsModule } from './create-new-individual-quotation-gb/sections/create-new-individual-quotation-gb-sections.module';
import { FindQuotationGBComponent } from './find-quotation-gb/find-quotation-gb.component';
import { ViewQuotationGBComponent } from './view-quotation-gb/view-quotation-gb.component';
import { ViewQuotationMotorGBComponent } from './view-quotation-motor-gb/view-quotation-motor-gb.component';
import { ViewQuotationPropertyGBComponent } from './view-quotation-property-gb/view-quotation-property-gb.component';
import { NewGroupQuotationGbSectionsModule } from './new-group-quotation-gb/sections/new-group-quotation-gb-sections.module';
import { QuotationGBPolicyTabComponent } from './create-new-individual-quotation-gb/sections/quotation-gbpolicy-tab/quotation-gbpolicy-tab.component';
import { QuotationGBPaymentTabComponent } from './create-new-individual-quotation-gb/sections/quotation-gbpayment-tab/quotation-gbpayment-tab.component';
import { ViewClientCompsModule } from 'src/app/Life/client-desk/client-desk-comps/view-client-comps/view-client-comps.module';
import { AgentFinderComponent } from './new-group-quotation-gb/modals/agent-finder/agent-finder.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ClientFinderComponent } from './new-group-quotation-gb/modals/client-finder/client-finder.component';
import { MatMenuModule } from '@angular/material/menu';
import { CreateIndividualClientModule } from 'src/app/Life/client-desk/create-individual-client/create-individual-client.module';
import { CreateCorporateClientModule } from 'src/app/Life/client-desk/create-corporate-client/create-corporate-client.module';
import { CoinsurerFinderComponent } from './shared/coinsurer-finder/coinsurer-finder.component';
import { TranslatePipe } from 'src/app/Shared/pipes/utility.pipe';
import { AssetFinderComponent } from './shared/asset-finder/asset-finder.component';
import { AssetCreateComponent } from './shared/asset-create-index/asset-create.component';

@NgModule({
  declarations: [
    CreateNewIndividualQuotationGBComponent,
    GroupQuotationGBComponent,
    IndividualQuotationGBComponent,
    NewGroupQuotationGBComponent,
    FindQuotationGBComponent,
    ViewQuotationGBComponent,
    ViewQuotationMotorGBComponent,
    ViewQuotationPropertyGBComponent,
    QuotationGBPolicyTabComponent,
    QuotationGBPaymentTabComponent,
    AgentFinderComponent,
    ClientFinderComponent,
    CoinsurerFinderComponent,
    AssetFinderComponent,
    AssetCreateComponent,
  ],
  imports: [
    CommonModule,
    QuotationDeskRoutingModule,
    SharedModule,
    ComponentsModule,
    MatDialogModule,
    CreateNewIndividualQuotationGbModalsModule,
    CreateNewIndividualQuotationGbSectionsModule,
    NewGroupQuotationGbSectionsModule,
    ViewClientCompsModule,
    MatMenuModule,
    CreateIndividualClientModule,
    CreateCorporateClientModule,
  ],
  providers: [
    ClientDetailsResolver,
    GroupOwnerDetailsResolver,
    DecimalPipe,
    TranslatePipe,
  ],
})
export class QuotationDeskModule {}
