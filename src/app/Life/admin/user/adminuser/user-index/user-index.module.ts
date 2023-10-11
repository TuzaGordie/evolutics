import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserIndexRoutingModule } from './user-index-routing.module';
import { UserIndexComponent } from './user-index.component';
import { SharedModule } from 'src/app/Shared/shared.module';

@NgModule({
  declarations: [UserIndexComponent],
  imports: [CommonModule, UserIndexRoutingModule, SharedModule],
})
export class UserIndexModule {}
