import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FindClientService } from 'src/app/Life/client-desk/service/find-client.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'document-register-new-claim',
  templateUrl: './document-register-new-claim.component.html',
  styleUrls: ['./document-register-new-claim.component.scss'],
})
export class DocumentRegisterNewClaimComponent implements OnInit {
  @Input() claimNo;
  newRequirementForm: FormGroup;
  showNewRequirementForm: boolean = false;
  claimRequirementsForm: FormArray = new FormArray([]);
  user;
  isSubmitting: any = {}

  constructor(
    public findClientService: FindClientService,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.getClaimDocuments();
    this.initializeNewRequirementForm();

    this.user = environment.user?.code;
  }

  initializeNewRequirementForm() {
    this.newRequirementForm = this.claimRequirementFormGroup({claimNo: this.claimNo});
  }

  getClaimDocuments() {
    this.findClientService
      .getClaimRequirements(this.claimNo)
      .subscribe((res) => {
        if (Array.isArray(res)) {
          res.forEach((item) =>
            this.claimRequirementsForm.push(this.claimRequirementFormGroup(item))
          );
        }
      })
  }

  claimRequirementFormGroup(data) {
    return new FormGroup({
      claimId: new FormControl(data?.claimId),
      claimNo: new FormControl(data?.claimNo),
      claimReq: new FormControl(data?.claimReq),
      claimReqOption: new FormControl(data?.claimReqOption),
      createdBy: new FormControl(data?.createdBy),
      createdOn: new FormControl(data?.createdOn),
      description: new FormControl(data?.description),
      id: new FormControl(data?.id),
      perilCode: new FormControl(data?.perilCode),
      policyCode: new FormControl(data?.policyCode),
      policyNo: new FormControl(data?.policyNo),
      policyNoSuffix: new FormControl(data?.policyNoSuffix),
      received: new FormControl(data?.received),
      receivedBy: new FormControl(data?.receivedBy),
      receivedDate: new FormControl(data?.receivedDate),
      receivedOn: new FormControl(data?.receivedOn),
    });
  }

  onReceivedChange(form) {
    if (!form.value.received) return;
    const today = new Date().toISOString().split('T')[0];
    form.patchValue({
      receivedBy: this.user,
      receivedOn: today,
    });
  }

  onSubmit(form, newForm?) {
    console.log("form.value before submitting: ", form.value)
    const id = newForm ? 'new' : form.value.id;
    this.isSubmitting[id] = true;
    this.findClientService
      .postClaimRequirementReceived(form.value)
      .subscribe(
        (res) => this.utilityService.info('Claim submitted successfully'),
        (err: HttpErrorResponse) =>
          this.utilityService.info('Error submitting claim: ' + err.status, 0)
      )
      .add(() => (this.isSubmitting[id] = false));
  }
}
