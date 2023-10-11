import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminusergroupRoutingModule } from './adminusergroup-routing.module';
import { AdminusergroupComponent } from './adminusergroup.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { UserAccessModalModule } from '../adminuser/user-access-modal/user-access-modal.module';

@NgModule({
  declarations: [AdminusergroupComponent],
  imports: [
    CommonModule,
    AdminusergroupRoutingModule,
    SharedModule,
    UserAccessModalModule,
  ],
})
export class AdminusergroupModule {}
