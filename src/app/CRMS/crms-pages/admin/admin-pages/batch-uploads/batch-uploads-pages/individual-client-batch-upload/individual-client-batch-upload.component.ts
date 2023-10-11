import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { title } from 'process';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CodeService } from 'src/app/Services/code.service';
import { LocationService } from 'src/app/Services/location.service';
import { ICodeTitle } from 'src/app/Shared/models/index.model';
import { BatchUploadBaseComponent } from '../../batch-uploads-comps/batch-upload-base/batch-upload-base.component';
import { BatchUpload } from '../../batch-uploads-extras/batch-uploads.model';

@Component({
  selector: 'app-individual-client-batch-upload',
  templateUrl: './individual-client-batch-upload.component.html',
  styleUrls: ['./individual-client-batch-upload.component.scss'],
})
export class IndividualClientBatchUploadComponent
  extends BatchUploadBaseComponent
  implements OnInit
{
  titles: any[];
  countries: any[];
  label: string;
  constructor(public codeS: CodeService, public locS: LocationService,public route:ActivatedRoute, ) {
    super();
  }

  ngOnInit(): void {
    this.label=this.route.snapshot.data.batchType?.title;
    this.init(
      Promise.all([
        this.codeS.getAllCodeByCodeSubGroup('client_title').toPromise(),
        this.codeS.getAllCodeByCodeSubGroup('marital_status').toPromise(),
        this.locS
          .getCountries()
          .pipe(tap((r) => (this.countries = r)))
          .toPromise(),
      ])
    ).then((rs) => {
      this.titles = rs[0];
      this.schemas = [
        {
          t: 'Title',
          type: 'select',
          options: this.titles,
          labelType: 'ct',
          valueField: 'code',
        },
        {
          field: 'surname',
          t: 'Surname',
          type: 'text',
          validators: [Validators.required],
        },
        {
          field: 'firstname',
          t: 'First Name',
          type: 'text',
          validators: [Validators.required],
        },
        {
          field: 'middlename',
          t: 'Middle Name',
          type: 'text',
        },
        {
          field: 'externalRef',
          t: 'ExternalRef',
          type: 'text',
        },
        {
          field: 'email',
          t: 'Main Email',
          type: 'email',
        },
        {
          field: 'alternateEmail',
          t: 'Alternate Email',
          type: 'email',
        },
        {
          field: 'address',
          t: 'Address',
          type: 'text',
        },
        {
          field: 'addressCountry',
          t: 'Address Country',
          type: 'select',
          options: this.countries,
          labelType: 'cd',
          valueField: 'code',
        },
        {
          field: 'addressRegion',
          t: 'Address Region',
          type: 'select',
          optionsFunc: (row: any) =>
            this.locS.getRegion(row['Address Country']),
          labelType: 'cd',
          valueField: 'code',
          disabledIf: (row: any) => !row['Address Country'],
        },
        {
          field: 'addressCity',
          t: 'Address City',
          type: 'select',
          optionsFunc: (row: any) => this.locS.getStates(row['Address Region']),
          labelType: 'cd',
          valueField: 'code',
          disabledIf: (row: any) => !row['Address Region'],
        },
        {
          field: 'addressTown',
          t: 'Address Town',
          type: 'select',
          optionsFunc: (row: any) => this.locS.getTown(row['Address City']),
          labelType: 'cd',
          valueField: 'code',
          disabledIf: (row: any) => !row['Address City'],
        },
        {
          field: 'addressGeolocation',
          t: 'Address Geolocation',
          type: 'text',
        },
        {
          field: 'dateOfBirth',
          t: 'Date of Birth',
          type: 'date',
        },
        {
          field: 'mainPhoneNo',
          t: 'Main Phone No',
          type: 'tel',
        },
        {
          field: 'Alternate Phone Number',
          t: 'Alternate Phone Number',
          type: 'text',
        },
        { field: 'Nationality', t: 'Nationality', type: 'text' },
        { field: 'Marital status', t: 'Marital status', type: 'text' },
        { field: 'Gender', t: 'Gender', type: 'text' },
        { field: 'ID Number', t: 'ID Number', type: 'text' },
        { field: 'ID Type', t: 'ID Type', type: 'text' },
        { field: 'ID Expiry date', t: 'ID Expiry date', type: 'text' },
        {
          field: 'National Insurance Number',
          t: 'National Insurance Number',
          type: 'text',
        },
        {
          field: 'Pension Commission Number',
          t: 'Pension Commission Number',
          type: 'text',
        },
        {
          field: 'Tax identification Number',
          t: 'Tax identification Number',
          type: 'text',
        },
        {
          field: 'Bank Verification Number',
          t: 'Bank Verification Number',
          type: 'text',
        },
        { field: 'Employment Status', t: 'Employment Status', type: 'text' },
        { field: 'Sector', t: 'Sector', type: 'text' },
        { field: 'Income band', t: 'Income band', type: 'text' },
        { field: 'Occupation Group', t: 'Occupation Group', type: 'text' },
        { field: 'Occupation', t: 'Occupation', type: 'text' },
        { field: 'Employer Client No', t: 'Employer Client No', type: 'text' },
      ];
    });
  }
}
