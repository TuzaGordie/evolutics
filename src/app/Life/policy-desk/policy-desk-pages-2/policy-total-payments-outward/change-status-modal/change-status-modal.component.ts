import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FindClientService } from 'src/app/Life/client-desk/service/find-client.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-change-status-modal',
  templateUrl: './change-status-modal.component.html',
  styleUrls: ['./change-status-modal.component.scss'],
})
export class ChangeStatusModalComponent implements OnInit {
  changeStatusForm: FormGroup;
  isSubmitting: boolean = false;
  claimNo: string;

  constructor(
    private findClientService: FindClientService,
    private utilityService: UtilityService,
    private dialogRef: MatDialogRef<ChangeStatusModalComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.claimNo = data?.claimNo;
  }

  ngOnInit(): void {
    this.initializeChangeStatusForm();
  }

  initializeChangeStatusForm() {
    this.changeStatusForm = new FormGroup({
      cover: new FormControl(null),
      premiumPaidToDate: new FormControl(null),
      currentStatus: new FormControl(null),
      newStatus: new FormControl(null),
      narration: new FormControl(null),
    });
  }

  onSubmit() {
    this.isSubmitting = true;
    const { currentStatus, newStatus } = this.changeStatusForm.value;
    const userCode = environment.user?.code;
    this.findClientService
      .changeClaimStatus({
        currentStatus,
        newStatus,
        userCode,
        claimNo: this.claimNo,
      })
      .subscribe(
        (res) => {
          this.utilityService
            .info('Claim Status changed successfully')
            .then(() => this.dialogRef.close());
        },
        (err) => {
          this.utilityService.info(
            'error changing claim status: ' + err.status,
            0
          );
        }
      )
      .add(() => (this.isSubmitting = false));
  }
}
