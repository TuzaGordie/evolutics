import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCorporateClientComponent } from './view-corporate-client.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from 'src/app/Shared/directives/index.directive';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [
    ViewCorporateClientComponent
  ],
  imports: [
    CommonModule,SharedModule,RouterModule,DirectivesModule,MatMenuModule
  ],
  exports: [
    ViewCorporateClientComponent
  ]
})
export class ViewCorporateClientCompModule { }
