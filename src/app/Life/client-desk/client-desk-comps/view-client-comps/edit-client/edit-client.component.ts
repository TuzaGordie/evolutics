import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindClientService } from '../../../service/find-client.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss'],
})
export class EditClientComponent implements OnInit {
  viewClientForm: FormGroup;
  languagesList: any[];
  titlesList: any[];
  maritalStatusList: any[];
  gendersList: any[];
  isUpdating: boolean = false;
  clientNo: string;

  constructor(
    private clientService: FindClientService,
    @Inject(MAT_DIALOG_DATA) private data,
    private utilityService: UtilityService,
    public dialogRef: MatDialogRef<EditClientComponent>
  ) {}

  ngOnInit(): void {
    this.clientNo = this.data.clientNo;
    this.viewClientForm = this.data.client;
    this.setLanguagesList();
    this.setTitlesList();
    this.setMaritalStatusList();
    this.setGendersList();
  }
  close() {
    this.dialogRef.close();
  }
  setLanguagesList() {
    this.clientService.getLanguages().subscribe(
      (res: any[]) => (this.languagesList = res),
      (err: HttpErrorResponse) =>
        console.log('error fetching supported languages for client', err)
    );
  }

  setTitlesList() {
    this.clientService.getTitles().subscribe(
      (res: any[]) => (this.titlesList = res),
      (err: HttpErrorResponse) =>
        console.log('error fetching client titles', err)
    );
  }

  setMaritalStatusList() {
    this.clientService.getMaritalStatuses().subscribe(
      (res: any[]) => (this.maritalStatusList = res),
      (err: HttpErrorResponse) =>
        console.log('error fetching marital statuses list', err)
    );
  }

  setGendersList() {
    this.clientService.getGenders().subscribe(
      (res: any[]) => (this.gendersList = res),
      (err: HttpErrorResponse) =>
        console.log('error fetching genders list', err)
    );
  }

  get fullName() {
    const { firstName, surname, middleName } = this.viewClientForm.value;
    return `${firstName} ${middleName} ${surname}`;
  }

  onSubmit() {
    if (this.viewClientForm.invalid) {
      this.viewClientForm.markAllAsTouched();
      return;
    }
    this.isUpdating = true;
    this.clientService
      .updateClient(this.clientNo, this.viewClientForm.value)
      .subscribe(
        (res: any) => {
          this.utilityService.info(
            'Client ' + this.clientNo + ' successfully updated'
          );
          this.isUpdating = false;
        },
        (err: HttpErrorResponse) => {
          this.utilityService.info("Error: Couldn't update client", 0);
          this.isUpdating = false;
          console.log('error updating client', err);
        }
      );
  }

  checkHighlight(fieldName) {
    return true;
  }
}
