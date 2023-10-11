import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateUserIndexRoutingModule } from './create-user-index-routing.module';
import { CreateUserIndexComponent } from './create-user-index.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { LifeClientDeskModule } from 'src/app/Life/client-desk/client-desk.module';

@NgModule({
  declarations: [CreateUserIndexComponent],
  imports: [CommonModule, CreateUserIndexRoutingModule, SharedModule,MatMenuModule,LifeClientDeskModule],
})
export class CreateUserIndexModule {}
