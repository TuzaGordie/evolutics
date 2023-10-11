import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindClientService } from '../../../service/find-client.service';
import { HelpersService } from '../../../service/helpers.service';
import { IBtn } from 'src/app/Shared/models/index.model'

@Component({
  selector: 'app-client-social-media',
  templateUrl: './client-social-media.component.html',
  styleUrls: ['./client-social-media.component.scss'],
})
export class ClientSocialMediaComponent implements OnInit {
  clientNo: string;
  socialMediaForm: FormArray = new FormArray([]);
  socialPlatformsList: any[];
  showNewSocialMediaForm: boolean = false;
  newSocialMediaForm: FormGroup;
  isCreatingSocialMedia = false;
  // an object whose keys are social media object 'id's and whose values are 'EDITING' | 'PENDING' | 'VIEW'
  // used to keep track of the current state of each row of social media account
  // PENDING indicates a pending edit (PUT) request edit request has been sent to the server awaiting a response
  socialMediaEditStatus = {};
  isDeletingRecord = {}

  constructor(
    private clientS: FindClientService,
    private utilityService: UtilityService,
    private helpersAndConstants: HelpersService,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<ClientSocialMediaComponent>,
  ) {}

  ngOnInit(): void {
    this.clientNo = this.route.snapshot.queryParams['clientNo'];
    this.setAcceptedSocialMediaPlatforms();
    this.setClientSocialMedia(this.clientNo);
    this.createNewSocialMediaForm();
  }

  createNewSocialMediaForm() {
    this.newSocialMediaForm = new FormGroup({
      clientNo: new FormControl(this.clientNo, Validators.required),
      platform: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
    });
  }

  setClientSocialMedia(clientNo: string) {
    this.clientS.getSocialMediaAccounts(clientNo).subscribe((res) => {
      if (!Array.isArray(res)) res = [res];
      // sort in platform alphabetical order
      res = res.sort((a, b) =>
        a.platform < b.platform ? -1 : a.platform > b.platform ? 1 : 0
      );

      res.forEach((account) => {
        this.socialMediaForm.push(
          new FormGroup({
            id: new FormControl(account.id, Validators.required),
            username: new FormControl(account.username, Validators.required),
            platform: new FormControl(
              account.platform?.toUpperCase(),
              Validators.required
            ),
            clientNo: new FormControl(account.clientNo, Validators.required),
          })
        );
        // make the edit button display
        this.socialMediaEditStatus[account.id] = 'VIEW';
      });
    });
  }

  setAcceptedSocialMediaPlatforms() {
    this.socialPlatformsList = this.helpersAndConstants.SOCIAL_MEDIA_PLATFORMS;
  }

  createSocialMedia() {
    if (this.newSocialMediaForm.invalid) {
      this.newSocialMediaForm.markAllAsTouched();
      return;
    }
    this.isCreatingSocialMedia = true;

    this.clientS
      .createSocialMediaAccount(this.newSocialMediaForm.value)
      .subscribe(
        (res: any) => {
          this.socialMediaEditStatus[res.id] = 'VIEW';
          this.socialMediaForm.push(
            new FormGroup({
              id: new FormControl(res.id, Validators.required),
              username: new FormControl(res.username, Validators.required),
              platform: new FormControl(
                res.platform?.toUpperCase(),
                Validators.required
              ),
              clientNo: new FormControl(res.clientNo, Validators.required),
            })
          );
          this.newSocialMediaForm.reset();
          this.isCreatingSocialMedia = false;
        },
        (err: HttpErrorResponse) => {
          this.isCreatingSocialMedia = false;
          this.utilityService.notify(
            'Error adding new social media accounts for this client',
            0
          );
          console.log(
            'error adding new social media for client ' + this.clientNo,
            err
          );
        }
      );
  }

  editSocialMediaAccount(formGroup: FormGroup) {
    if (formGroup.invalid) {
      formGroup.markAllAsTouched();
      return;
    }
    this.socialMediaEditStatus[formGroup.value.id] = 'PENDING';

    this.clientS
      .editSocialMediaAccount(formGroup.value.id, formGroup.value)
      .subscribe(
        (res: any) => {
          this.socialMediaEditStatus[formGroup.value.id] = 'VIEW';
          formGroup.setValue({
            id: res.id,
            platform: res.platform,
            username: res.username,
            clientNo: res.clientNo,
          });
        },
        (err: HttpErrorResponse) => {
          this.utilityService.notify(
            'Error editing social media account for client ' + this.clientNo,
            0
          );
          console.log(
            'error editing social media account for client ' + this.clientNo,
            err
          );
        }
      );
  }

  confirmDeleteRecord(record, index){
    const btns: IBtn [] = [
      {value: 'Yes', action:() => this.onDeleteRecord(record, index), type:'primary'},
      {value: 'No', action: ()=>{}}
    ]
    this.utilityService.info("Are you sure you want to delete this record?", 0, '', btns)
  }

  onDeleteRecord(record, index){
    this.isDeletingRecord[record.value.id] = true;
    this.clientS.deleteSocialMediaAccount(record.value.id).subscribe(
      (res: any) => {
        // TODO remove from local list
        this.utilityService.info("Record deleted successfully")
        this.socialMediaForm.removeAt(index)
        this.isDeletingRecord[record.value.id] = false;
      },
      (err: HttpErrorResponse) => {
        console.log("Error deleting agentHierarchy record: ", err)
        this.utilityService.info("Error: " + err.message, 0)
        this.isDeletingRecord[record.value.id] = false;
      }
    )
  }


  closeModal(){
    this.dialogRef.close({
      count: this.socialMediaForm.value.length
    })
  }

  isFieldInvalid(form, controlName){
    return form.controls[controlName].invalid && form.controls[controlName].touched
  }
}
