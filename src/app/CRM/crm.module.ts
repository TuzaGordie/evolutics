import { NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComponentsModule} from '../Shared/components/components.module';
import {RouterModule} from "@angular/router";

import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../Shared/shared.module';
/* import { CorporateClientComponent } from './agent-desk/new-corporate-agent/corporate-client/corporate-client.component'; */
import {CRMFindClientModule} from './client-desk/find-client.module';

import {Screenshot1Component} from './client-desk/form/screenshot1/screenshot1.component';
import {Screenshot2Component} from './client-desk/form/screenshot2/screenshot2.component';
import {Screenshot3Component} from './client-desk/form/screenshot3/screenshot3.component';
import {Screenshot4Component} from './client-desk/form/screenshot4/screenshot4.component';
import {Screenshot5Component} from './client-desk/form/screenshot5/screenshot5.component';
import {HeaderComponent} from './client-desk/form/header/header.component';
import {CommonComponent} from './client-desk/form/common/common.component';
import {AllformsComponent} from './client-desk/form2/allforms/allforms.component';
import {PersonalinfoComponent} from './client-desk/form2/personalinfo/personalinfo.component';
import {IdentificationComponent} from './client-desk/form2/identification/identification.component';
import {EmployinfoComponent} from './client-desk/form2/employinfo/employinfo.component';
import {PaymentinfoComponent} from './client-desk/form2/paymentinfo/paymentinfo.component';
import {NextofkinComponent} from './client-desk/form2/nextofkin/nextofkin.component';
import {FormheaderComponent} from './client-desk/form2/formheader/formheader.component';
import {PaymentdetailComponent} from './client-desk/form2/paymentinfo/paymentdetail/paymentdetail.component';
import {CRMFindClientComponent} from './client-desk/find-client/find-crm-client.component';
import {CRMViewClientComponent} from './client-desk/view-client/view-crm-client.component';
import { LayoutModule } from '../Layout/layout.module';


@NgModule({
  declarations: [

    Screenshot1Component,
    Screenshot2Component,
    Screenshot3Component,
    Screenshot4Component,
    Screenshot5Component,
    HeaderComponent,
    CommonComponent,
    AllformsComponent,
    PersonalinfoComponent,
    IdentificationComponent,
    EmployinfoComponent,
    PaymentinfoComponent,
    NextofkinComponent,
    FormheaderComponent,
    PaymentdetailComponent,    
    
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    CRMFindClientModule
  ],
  exports: []

})

export class CRMModule {

}
