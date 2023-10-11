import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from 'src/app/Services/document.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindClientService } from '../../../service/find-client.service';
import { HelpersService } from '../../../service/helpers.service';

@Component({
  selector: 'app-client-id',
  templateUrl: './client-id.component.html',
  styleUrls: ['./client-id.component.scss'],
})
export class ClientIdComponent implements OnInit {
  clientIdentificationForm: FormArray = new FormArray([]);
  idRecordsStatus = {};
  showNewIdRow: boolean = false;
  idTypesList = [];
  clientNewIdForm: FormGroup;
  clientSignature: any;
  isCreatingIdRecord: boolean = false;
  isDeletingIdRecord = {}
  clientNo: string;
  clientNationality: string;
  documentsBaseURL: string;
  clientPictureDocument: any;

  constructor(
    private clientS: FindClientService,
    private utilityService: UtilityService,
    private helpersAndConstants: HelpersService,
    private route: ActivatedRoute,
    private docS: DocumentService,
    private dialogRef: MatDialogRef<ClientIdComponent>,
  ) {}

  ngOnInit(): void {
    this.clientNo = this.route.snapshot.queryParams['clientNo'];
    console.log('clientNo: ', this.clientNo);
    this.initializeNewRecordForm();
    this.setDocumentsBaseURL();
    this.setIdTypesList();
    this.setClientIdentificationForm();
  }

  initializeNewRecordForm() {
    this.clientNewIdForm = this.getNewRecordForm({});
  }

  setIdTypesList() {
    this.clientS.getIdTypesList().subscribe((res) => (this.idTypesList = res));
  }

  updateIdRecord(recordForm) {
    if (recordForm.invalid) {
      recordForm.markAllAsTouched();
      return;
    }
    this.idRecordsStatus[recordForm.value.id] = 'PENDING';
    this.clientS
      .updateClientIdentification(recordForm.value.id, recordForm.value)
      .subscribe((res) => {
        recordForm.patchValue(res);
        this.idRecordsStatus[recordForm.value.id] = 'VIEW';
        this.utilityService.info('KYC record successfully updated');
      },
      (err: HttpErrorResponse) => {
        console.log("error updating client Identification")
        this.idRecordsStatus[recordForm.value.id] = 'EDITING';
        this.utilityService.info('Error: ' + err.message, 0);
      })
      ;
  }


  deleteIdRecord(record, index){
    this.isDeletingIdRecord[record.value.id] = true
    this.clientS.deleteClientIdentification(record.value.id)
    .subscribe(
      res => {
        this.clientIdentificationForm.removeAt(index)
        this.utilityService.info("Record deleted successfully")
        this.isDeletingIdRecord[record.value.id] = false;
      },
      (err: HttpErrorResponse) => {
        this.utilityService.info("Error: " + err.message, 0)
        this.isDeletingIdRecord[record.value.id] = false;
      }
    )
  }

  createIdRecord() {
    if (this.clientNewIdForm.invalid) {
      this.clientNewIdForm.markAllAsTouched();
      return;
    }
    this.isCreatingIdRecord = true;
    this.clientS
      .createClientIdentification(this.clientNewIdForm.value)
      .subscribe(
        (res) => {
          this.clientIdentificationForm.push(this.getNewRecordForm(res));
          this.isCreatingIdRecord = false;
          this.clientIdentificationForm.reset()
          this.utilityService.info('Client ID created successfully');
        },
        (err: HttpErrorResponse) => {
          this.utilityService.info('Error: ' + err.message, 0);
          this.isCreatingIdRecord = false;
        }
      );
  }

  getNewRecordForm(id) {
    return new FormGroup({
      idExpiryDate: new FormControl(id?.idExpiryDate, Validators.required),
      idIssueAuth: new FormControl(id?.idIssueAuth),
      idIssueDate: new FormControl(id?.idIssueDate, Validators.required),
      idNumber: new FormControl(id?.idNumber, Validators.required),
      idType: new FormControl(
        this.helpersAndConstants.getIdType(id?.idType),
        Validators.required
      ),
      nationality: new FormControl(id?.nationality),
      bvn: new FormControl(id?.bvn),
      nationalInsuranceNumber: new FormControl(id?.nationalInsuranceNumber),
      pensionCommissionNumber: new FormControl(id?.pensionCommissionNumber),
      nationalIdentificationNumber: new FormControl(
        id?.nationalIdentificationNumber
      ),
      id: new FormControl(id?.id),
      // idIssuePlace: new FormControl(id?.idIssuePlace),
      // secondNationality: new FormControl(id?.secondNationality),
      // socialSecurityNo: new FormControl(id?.socialSecurityNo),
    });
  }

  setClientIdentificationForm() {
    this.clientS.getClientIdentification(this.clientNo).subscribe(
      (res: any) => {
        console.log('got client id records from server', res);
        if (Array.isArray(res)) {
          res.forEach((id) => {
            // nationality is gotten from the id endpoint
            if (!this.clientNationality)
              this.clientNationality = id.nationality;
            // TODO when posting id form, remember to pick up nationality from the this.clientNationality
            this.clientIdentificationForm.push(this.getNewRecordForm(id));
          });
        }
        console.log('clientId form', this.clientIdentificationForm.value);
      },
      (err: HttpErrorResponse) =>
        console.log(
          'error fetching identification details for clientNo:' + this.clientNo,
          err
        )
    );
  }

  downloadSignature(event: Event) {
    event.preventDefault();
    const { docKey, fileName } = this.clientSignature;
    const url = `${this.documentsBaseURL}/${docKey}/${fileName}`;
    this.clientS.downloadDocument(url).subscribe(
      (res) =>
        console.log('file successfully downloaded with some response:', res),
      (err: HttpErrorResponse) => {
        this.utilityService.notify(
          'Error occurred while trying to download this document. Try again later',
          0
        );
        console.error('Error downloading file', err);
      }
    );
  }

  setDocumentsBaseURL() {
    this.clientS.getDocumentsBaseURL().subscribe(
      (res: string) => (this.documentsBaseURL = res),
      (err: HttpErrorResponse) =>
        console.error(
          'Error fetching base url for documents storage service',
          err
        )
    );
  }

  uploadDocument(file, subCategory, options?, done?) {
    if (options && options != null && typeof options === 'object') {
      // delete options with no value
      options = Object.entries(options)
        ?.filter(([key, value]) => !!value)
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {});
    }
    // add default options
    options = Object.assign(options || {}, {
      refNo: this.clientNo,
      refCat: 'CLI',
      subCategory: subCategory,
      title: file.name,
    });

    this.docS.upload(file, options).subscribe(
      (res) => {
        this.utilityService.notify('Document uploaded successfully');
        console.log('uploaded document successfully', res);
        done && done();
      },
      (err: HttpErrorResponse) => {
        this.utilityService.notify('Error uploading new document', 0);
        console.error('Error uploading new document', err);
      }
    );
  }

  downloadDocument(event: Event, document) {
    event.preventDefault();
    const { docKey, fileName } = document;
    const url = `${this.documentsBaseURL}/${docKey}/${fileName}`;
    window.open(url);
  }

  setClientPicture() {
    this.clientS.getClientPicture(this.clientNo).subscribe(
      (doc: any) => (this.clientPictureDocument = doc),
      (err: HttpErrorResponse) =>
        console.log(
          'Error fetching picture document for clientNo: ' + this.clientNo,
          err
        )
    );
  }

  onClose() {
    // return client nationality and id count
    this.dialogRef.close({
      nationality: this.clientNationality,
      count: this.clientIdentificationForm.value?.length
    })
  }

  isFieldInvalid(form, fieldName){
    return form.controls[fieldName].touched && form.controls[fieldName].invalid
  }
}
