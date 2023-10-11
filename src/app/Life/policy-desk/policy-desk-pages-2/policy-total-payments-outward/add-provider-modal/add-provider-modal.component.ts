import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FindClientService } from 'src/app/Life/client-desk/service/find-client.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { ICodeTitle } from 'src/app/Shared/models/index.model';
import { FindProviderModalComponent } from '../find-provider-modal/find-provider-modal.component';

@Component({
  selector: 'app-add-provider-modal',
  templateUrl: './add-provider-modal.component.html',
  styleUrls: ['./add-provider-modal.component.scss'],
})
export class AddProviderModalComponent implements OnInit {
  claimNo: string;
  coverName: string;
  addProviderForm: FormGroup;
  isSubmitting: boolean = false;
  providerActions: ICodeTitle[];

  constructor(
    private findClientService: FindClientService,
    private utilityService: UtilityService,
    private dialogRef: MatDialogRef<AddProviderModalComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    (this.claimNo = data?.claimNo), (this.coverName = data?.coverName);
  }

  ngOnInit(): void {
    this.setProviderActions();
    this.initializeAddProviderForm();
  }

  initializeAddProviderForm() {
    this.addProviderForm = new FormGroup({
      claimNo: new FormControl(null),
      coverName: new FormControl(null),
      providerNo: new FormControl(null),
      providerName: new FormControl(null),
      providerAction: new FormControl(null),
      instructionToProvider: new FormControl(null),
    });
  }

  setProviderActions() {
    this.findClientService
      .getProviderActions()
      .subscribe((res) => (this.providerActions = res));
  }

  openFindProviderModal() {
    this.utilityService.dialogOpener(
      FindProviderModalComponent,
      {},
      (data) => {
        this.addProviderForm.patchValue({
          providerNo: data?.providerNo,
          providerName: data?.providerName,
        });
      },
      () => {
        console.log('Find provider modal cancelled');
      }
    );
  }

  onProviderNo() {
    console.log("onProviderNo called: ", this.addProviderForm.value.providerNo)
    this.findClientService
      .getClientProviderName(this.addProviderForm.value.providerNo)
      .subscribe((res) =>
        this.addProviderForm.patchValue({
          providerName: res?.fullName,
        })
      );
  }

  onSubmit() {
    this.isSubmitting = true;
    this.findClientService
      .assignClaimProvider(this.addProviderForm.value)
      .subscribe(
        (res) =>
          this.utilityService
            .info('Successfully assigned claim provider')
            .then(() => this.dialogRef.close()),
        (err: HttpErrorResponse) =>
          this.utilityService.info('error assigning provider: ' + err.status, 0)
      )
      .add(() => (this.isSubmitting = false));
  }
}
