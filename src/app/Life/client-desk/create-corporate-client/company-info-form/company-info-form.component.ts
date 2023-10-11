import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';
import { EValidationType, ICodeDescription, ICodeTitle } from 'src/app/Shared/models/index.model';
import { CreateCorporateClientService } from '../create-corporate-client.service';

@Component({
  selector: 'app-company-info-form',
  templateUrl: './company-info-form.component.html',
  styleUrls: ['./company-info-form.component.scss'],
})
export class CompanyInfoFormComponent implements OnInit {
  @Input() form:FormGroup;
  eValidationType = EValidationType;
  regionList: ICodeDescription[] = [];
  countryList: ICodeDescription[] = [];
  stateList: ICodeDescription[] = [];
  townList: ICodeDescription[] = [];
  sectorList: ICodeTitle[] = [];
  segmentList: ICodeTitle[] = [];

  constructor(private formService: CreateCorporateClientService,public uS: UtilityService) {}

  ngOnInit(): void {
    this.setCountryList();
    this.setRegionList();
    this.setStateList();
    this.setTownList();
    this.setSectorList();
    this.setSegmentList();
  }
  get validation() {
    return this.form?.controls;
  }

  onSubmit() {
    console.log(this.form);
    this.formService.companyInfo(this.form.value);
    let ss1 = { companyInfo: this.form.value };
    console.log(ss1);
  }
  changeTab(tab: any) {
    console.log('tab');
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
  setSectorList() {
    this.formService.getSectorList().subscribe((res) => {
      this.sectorList = res;
      console.log('sectorList', res);
    });
  }
  setSegmentList() {
    this.formService.getSegmentList().subscribe((res) => {
      this.segmentList = res;
      console.log('segmentlist', res);
    });
  }
}

