import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DbclonerRoutingModule } from './dbcloner-routing.module'; 
import { DbclonerhomeComponent } from './dbclonerhome/dbclonerhome.component';
import { DbClonerLoginComponent } from './db-cloner-login/db-cloner-login.component';
import { DbClonerRecordsSelectComponent } from './db-cloner-records-select/db-cloner-records-select.component';
import { SharedModule } from '../Shared/shared.module';

@NgModule({
  declarations: [ 
    DbclonerhomeComponent,
    DbClonerLoginComponent,
    DbClonerRecordsSelectComponent,
  ],
  imports: [CommonModule, DbclonerRoutingModule, SharedModule],
})
export class DbclonerModule {}
