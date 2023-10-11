import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsermenuIndexRoutingModule } from './usermenu-index-routing.module';
import { UsermenuIndexComponent } from './usermenu-index.component';
import { SharedModule } from 'src/app/Shared/shared.module';


@NgModule({
  declarations: [
    UsermenuIndexComponent
  ],
  imports: [
    CommonModule,
    UsermenuIndexRoutingModule,SharedModule
  ]
})
export class UsermenuIndexModule { }
