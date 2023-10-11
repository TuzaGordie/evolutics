import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FindClientService } from 'src/app/Life/client-desk/service/find-client.service';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-adjust-claim-modal',
  templateUrl: './adjust-claim-modal.component.html',
  styleUrls: ['./adjust-claim-modal.component.scss'],
})
export class AdjustClaimModalComponent implements OnInit {
  isSubmitting: boolean = false;
  form = new FormGroup({
    policyNo: new FormControl(null),
    owner: new FormControl(null),
    initialEstimate: new FormControl(null),
    totalAdjustments: new FormControl(null),
    updatedAmount: new FormControl(null),
    paymentType: new FormControl(null),
    currency: new FormControl(null),
    newAdjustment: new FormControl(null),
    reason: new FormControl(null),
    adjustmentParty: new FormControl(null),
    adjusterNumber: new FormControl(null),
    narration: new FormControl(null),
  });
  constructor(
    public dialogRef: MatDialogRef<AdjustClaimModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { no: string },
    private findClientService: FindClientService,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {}
  close(action?) {
    this.dialogRef.close({ action });
  }

  onFind() {
    this.utilityService.info('no find functionality yet');
  }

  onSubmit() {
    this.isSubmitting = true;

    this.findClientService
      .adjustClaim(this.form.value)
      .subscribe(
        (res) =>
          this.utilityService
            .info('Successfully adjusted claim')
            .then(() => this.dialogRef.close()),
        (err) =>
          this.utilityService.info('error adjusting claim: ' + err.status, 0)
      )
      .add(() => (this.isSubmitting = false));
  }
}
