import { Component, Input, OnInit } from '@angular/core';
import { CreateIndividualClientService } from '../create-individual-client.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { configValidationMessages } from 'src/app/configs/validation-messages.config';
import {
  EValidationType,
  ICodeDescription,
  ICodeTitle,
} from 'src/app/Shared/models/index.model';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindClientService } from '../../service/find-client.service';

@Component({
  selector: 'app-personalinfo',
  templateUrl: './personalinfo.component.html',
  styleUrls: ['./personalinfo.component.scss'],
})
export class PersonalinfoComponent implements OnInit {
  @Input('fc') form: FormGroup;
  regionList: ICodeDescription[] = [];
  countryList: ICodeDescription[] = [];
  stateList: ICodeDescription[] = [];
  townList: ICodeDescription[] = [];
  eValidationType = EValidationType;
  maxAltNumAllowed = 3;
  maritalStatuses: ICodeTitle[];
  genders: ICodeTitle[];
  constructor(
    public formService: CreateIndividualClientService,
    public uS: UtilityService,
    public clientS: FindClientService
  ) {}

  ngOnInit(): void {
    this.setCountryList();
    this.setRegionList();
    this.setStateList();
    this.setTownList();
    this.clientS
      .getMaritalStatuses()
      .subscribe((r) => (this.maritalStatuses = r));
    this.clientS.getGenders().subscribe((r) => (this.genders = r));
    this.addPhoneNumberForm();
  }

  get validation() {
    return this.form?.controls;
  }

  get altPhoneNumbersForm() {
    return this.form?.controls.altPhoneNumbers as FormArray;
  }

  addPhoneNumberForm(index = this.altPhoneNumbersForm.controls.length) {
    if (this.altPhoneNumbersForm.controls.length < this.maxAltNumAllowed)
      this.altPhoneNumbersForm.insert(index, new FormControl());
  }
  removePhoneNumberForm(index: number) {
    this.altPhoneNumbersForm.removeAt(index);
  }
  altPhoneNumbersFormLabel(i: number) {
    return this.altPhoneNumbersForm.controls?.length > 1 ? i + 1 : '';
  }
  onSubmit() {
    this.formService.personalInfo(this.form.value);
  }

  changeTab(tab: any) {
    this.formService.tabChange(tab);
  }

  setCountryList() {
    this.formService.getCountryList().subscribe((res) => {
      this.countryList = res;
    });
  }

  setRegionList() {
    if (this.form.get('addressCountry')?.value) {
      this.formService
        .getRegionList(this.form.get('addressCountry')?.value)
        .subscribe((res) => {
          this.regionList = res;
          const addressRegionFC = this.form.get('addressRegion');
          if (!this.regionList.find((x) => x.code == addressRegionFC?.value))
            addressRegionFC.reset();
        });
    }
  }

  setStateList() {
    if (this.form.get('addressRegion')?.value) {
      this.formService
        .getStateList(this.form.get('addressRegion')?.value)
        .subscribe((res) => {
          this.stateList = res;
          const addressStateFC = this.form.get('addressState');
          if (!this.stateList.find((x) => x.code == addressStateFC?.value))
            addressStateFC.reset();
        });
    }
  }

  setTownList() {
    if (this.form.get('addressState')?.value) {
      this.formService
        .getTownList(this.form.get('addressState')?.value)
        .subscribe((res) => {
          this.townList = res;
          const addressTownFC = this.form.get('addressTown');
          if (!this.townList.find((x) => x.code == addressTownFC?.value))
            addressTownFC.reset();
        });
    }
  }
}
