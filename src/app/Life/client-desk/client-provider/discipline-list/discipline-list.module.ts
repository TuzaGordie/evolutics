import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisciplineListRoutingModule } from './discipline-list-routing.module';
import { DisciplineListComponent } from './discipline-list.component';
import {SharedModule} from "../../../../Shared/shared.module";


@NgModule({
  declarations: [
    DisciplineListComponent
  ],
    imports: [
        CommonModule,
        DisciplineListRoutingModule,
        SharedModule
    ]
})
export class DisciplineListModule { }
