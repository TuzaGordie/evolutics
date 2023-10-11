import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewIndivdualClientCompModule } from './view-indivdual-client/view-indivdual-client.module';
import { ViewCorporateClientCompModule } from './view-corporate-client/view-corporate-client.module';
import { ViewProviderClientCompModule } from './view-provider-client/view-provider-client.module';
import { EditClientComponent } from './edit-client/edit-client.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { BankAccountsComponent } from './bank-accounts/bank-accounts.component';
import { CreateAccountFormModule } from 'src/app/Life/life-components/create-account-modal/create-account-form/create-account-form.module';
import { ClientIdComponent } from './client-id/client-id.component';
import { ClientDeskPipesModule } from '../../pipes/pipes.module';
import { DirectivesModule } from 'src/app/Shared/directives/index.directive';
import { ClientSocialMediaComponent } from './client-social-media/client-social-media.component';
import { ViewClientCompComponent } from './view-client-comp/view-client-comp.component';



@NgModule({
  declarations: [
    EditClientComponent,
    BankAccountsComponent,
    ClientIdComponent,
    ClientSocialMediaComponent,
    ViewClientCompComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    CreateAccountFormModule,
    ClientDeskPipesModule,
    DirectivesModule,
    ViewIndivdualClientCompModule,
    ViewCorporateClientCompModule,
  ],
  exports: [
    ViewIndivdualClientCompModule,
    ViewCorporateClientCompModule,
    ViewProviderClientCompModule,
    EditClientComponent,
    BankAccountsComponent,
    ViewClientCompComponent,
  ],
})
export class ViewClientCompsModule {}
