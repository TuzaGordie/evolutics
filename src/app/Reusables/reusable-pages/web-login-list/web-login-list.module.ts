import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebLoginListRoutingModule } from './web-login-list-routing.module';
import { WebLoginListComponent } from './web-login-list.component';
import { SharedModule } from 'src/app/Shared/shared.module';


@NgModule({
  declarations: [
    WebLoginListComponent
  ],
  imports: [
    CommonModule,
    WebLoginListRoutingModule,SharedModule
  ]
})
export class WebLoginListModule { }
