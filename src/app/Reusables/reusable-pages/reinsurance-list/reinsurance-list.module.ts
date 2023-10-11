import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReinsuranceListRoutingModule } from './reinsurance-list-routing.module';
import { ReinsuranceListComponent } from './reinsurance-list.component';
import { TablePlainModule } from 'src/app/Shared/components/table-plain/table-plain.module';
import { TextCase1Module } from 'src/app/Shared/components/text-case-1/text-case-1.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { AddFaculativeModule } from './add-faculative/add-faculative.module';


@NgModule({
  declarations: [
    ReinsuranceListComponent
  ],
  imports: [
    CommonModule,
    ReinsuranceListRoutingModule,
    TablePlainModule,
    SharedModule,
    TextCase1Module,
    AddFaculativeModule,
  ]
})
export class ReinsuranceListModule { }
