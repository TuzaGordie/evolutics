import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateUsermenuRoutingModule } from './create-usermenu-routing.module';
import { CreateUsermenuComponent } from './create-usermenu.component';
import { SharedModule } from 'src/app/Shared/shared.module'; 
import {MatExpansionModule} from '@angular/material/expansion';
import { MenuItemBoxComponent } from './menu-item-box/menu-item-box.component';

@NgModule({
  declarations: [
    CreateUsermenuComponent,MenuItemBoxComponent
  ],
  exports: [
    CreateUsermenuComponent,MenuItemBoxComponent
  ],
  imports: [
    CommonModule,
    CreateUsermenuRoutingModule,SharedModule,MatExpansionModule
  ]
})
export class CreateUsermenuModule { }
