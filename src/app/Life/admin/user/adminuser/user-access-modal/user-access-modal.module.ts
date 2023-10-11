import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAccessModalComponent } from './user-access-modal.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { UserAccessModalService } from './user-access-modal.service';

@NgModule({
  declarations: [UserAccessModalComponent],
  imports: [CommonModule, SharedModule],
  providers: [UserAccessModalService],
})
export class UserAccessModalModule {}
