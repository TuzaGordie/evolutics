import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateUserRoutingModule } from './create-user-routing.module';
import { CreateUserComponent } from './create-user.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { UserAccessModalComponent } from '../user-access-modal/user-access-modal.component';
import { UserAccessModalModule } from '../user-access-modal/user-access-modal.module';

@NgModule({
  declarations: [CreateUserComponent],
  imports: [CommonModule, CreateUserRoutingModule, SharedModule,MatTabsModule,UserAccessModalModule],
})
export class CreateUserModule {}
