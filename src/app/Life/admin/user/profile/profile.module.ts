import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { UserAccessModalModule } from '../adminuser/user-access-modal/user-access-modal.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    MatTabsModule,
    UserAccessModalModule,
  ],
})
export class ProfileModule {}
