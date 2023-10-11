import { CurrencyPipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserModule } from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ChartsModule } from 'ng2-charts';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AssetsHomeComponent } from './Assets/assets-home/assets-home.component';

import { PageNotFoundComponent } from './other/page-not-found/page-not-found.component';

import { UtilityService } from './Services/utility.service';
import { ComponentsModule } from './Shared/components/components.module';
import { LayoutModule } from './Layout/layout.module';
import './Shared/prototypes/prototypes';
import { SharedModule } from './Shared/shared.module';
import { effects } from './Store/effect.indext';
import { reducers } from './Store/reduce.index';
import { TablePlainModule } from './Shared/components/table-plain/table-plain.module';
import { UtilityPipesModule } from './Shared/pipes/utility.pipe';
import { ModalsComponent } from './other/modals/modals.component';
import { PropAssetsComponent } from './General/asset-desk/prop-assets/prop-assets.component';
import { GlobalErrorHandlerService } from './Services/Interceptors/global-error-handler.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AuthenticationInterceptorService } from './Services/Interceptors/authentication-interceptor.service';
import { PageIconsModule } from './components/page-icons/page-icons.module';
import { AuthorizePaymentModalComponent } from './Reusables/reusable-comps/authorize-payment-modal/authorize-payment-modal.component';
import { InputPipesModule } from './Shared/pipes/inputs-pipes.pipe';
import { LoggerInterceptorService } from './Services/Interceptors/logger-interceptor.service';
import { NgIdleModule } from '@ng-idle/core';
import { IdlerModule } from './Shared/components/idler/idler.module';
import { InfoDialogModule } from './Shared/components/info-dialog/info-dialog.module';
import { ClientDeskPipesModule } from './Life/client-desk/pipes/pipes.module';
import { ConfirmDialogModule } from './Shared/components/confirm-dialog/confirm-dialog.module';
// import { CRMModule } from './CRM/crm.module';

@NgModule({
  declarations: [
    AppComponent,
    AssetsHomeComponent,
    PageNotFoundComponent,
    ModalsComponent,
    AuthorizePaymentModalComponent,
  ],
  imports: [
    // NoopAnimationsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ChartsModule,
    ClientDeskPipesModule,
    ComponentsModule,
    ConfirmDialogModule,
    EffectsModule.forRoot(effects),
    FormsModule,
    HttpClientModule,
    IdlerModule,
    InfoDialogModule,
    LayoutModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSnackBarModule,
    NgIdleModule.forRoot(),
    PageIconsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forRoot(reducers, {}),
    TablePlainModule,
    UtilityPipesModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    UtilityService,
    CurrencyPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggerInterceptorService,
      multi: true,
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
