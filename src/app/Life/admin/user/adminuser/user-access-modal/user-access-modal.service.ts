import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';
import { UserAccessModalComponent } from './user-access-modal.component';

@Injectable()
export class UserAccessModalService {
  constructor(public uS: UtilityService,) {}

  openAccess(userForm: FormGroup, isShow: boolean) {
    debugger
    this.uS.dialogOpener(
      UserAccessModalComponent,
      {
        data: { user: userForm.value, isShow },
        height: '80vh',
        width: '90%',
      },
      (r) => {
        if (!isShow) userForm.patchValue(r);
      }
    );
  }
}
