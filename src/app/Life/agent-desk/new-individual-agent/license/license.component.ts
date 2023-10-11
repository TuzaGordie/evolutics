import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { IndividualAgentService } from '../services/individual-agent.service';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss'],
})
export class LicenseComponent implements OnInit {
  @Input() licenseForm = new FormGroup({
    certificateNumber: new FormControl(null),
    licenseAuthority: new FormControl(null),
    expiryDate: new FormControl(null),
    licenceType: new FormControl(null),
    issueDate: new FormControl(null),
  }); 
  licenseAuthorityList: any = [];
  licenseTypeList: any = [];  
  file: File;

  constructor(public individualService: IndividualAgentService) {}

  ngOnInit(): void {
    this.setLicenseAuthorityList();
    this.setLicenseTypeList();
  }

  get validation() { 
    return this.licenseForm?.controls;
  }
 
  setLicenseAuthorityList() {
    this.individualService.getLicenseAuthorityList().subscribe((res) => {
      this.licenseAuthorityList = res; 
    });
  }

  setLicenseTypeList() {
    this.individualService.getLicenseTypeList().subscribe((res) => {
      this.licenseTypeList = res; 
    });
  }

  upload(event: any) { 
    this.file=(event.target.files[0]); 
  }

  changeTab(tab: any) { 
    this.individualService.tabChange(tab);
  } 
}
