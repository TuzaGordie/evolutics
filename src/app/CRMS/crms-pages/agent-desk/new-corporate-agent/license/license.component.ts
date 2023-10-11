import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';
import {CorporateAgentService} from '../service/corporate-agent.service';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss']
})
export class CRMSLicenseComponent implements OnInit {
  faUpload = faUpload
  licenseForm: any = FormGroup;
  licenseAuthorityList: any = []
  licenseTypeList: any = []
  fileName: any;

  constructor(public corporateService: CorporateAgentService) {
  }

  ngOnInit(): void {
    this.licenseForm = new FormGroup({
      certificateNumber: new FormControl(null),
      licenseAuthourity: new FormControl(null),
      expiryDate: new FormControl(null),
      licensetype: new FormControl(null),
      issueDate: new FormControl(null)
    })

    this.setLicenseAuthorityList()
    this.setLicenseTypeList()
  }

  get validation() {
    /*  console.log("validator",this.newPaymentForm?.controls) */
    return this.licenseForm?.controls
  }

  onSubmit() {
    console.log(this.licenseForm)
    this.corporateService.licenseInfo(this.licenseForm.value);
  }

  setLicenseAuthorityList() {
    this.corporateService.getLicenseAuthorityList().subscribe(res => {
      this.licenseAuthorityList = res;
      console.log("licenseAuthorityList", res)
    })
  }

  setLicenseTypeList() {
    this.corporateService.getLicenseTypeList().subscribe(res => {
      this.licenseTypeList = res;
      console.log("licenseTypeList", res)
    })
  }

  upload(event: any) {
    let file = event.target.files[0];
    console.log("imagefile", file)
    console.log("imagepath", file.name)
    this.fileName = file.name
  }

  changeTab(tab: any) {
    console.log("tab")
    this.corporateService.tabChange(tab)
  }

  getImage1() {
    document.getElementById('fileBtnImg1')?.click()
  }
}
