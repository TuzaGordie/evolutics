import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';
import { IndividualAgentService } from '../services/individual-agent.service';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss']
})
export class CRMSLicenseComponent implements OnInit {

  licenseForm:any = FormGroup;
  licenseAuthorityList:any = []
  licenseTypeList:any = []
  fileName:any;
  faUpload = faUpload;

  constructor(public individualService:IndividualAgentService) { }

  ngOnInit(): void {
    this.licenseForm = new FormGroup({
      /* country: new FormControl(null,Validators.required),
      sortCode: new FormControl(null), */
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

  onSubmit(){
    console.log(this.licenseForm)
    this.individualService.licenseInfo(this.licenseForm.value);
  }

  setLicenseAuthorityList(){
    this.individualService.getLicenseAuthorityList().subscribe( res => {
      this.licenseAuthorityList = res;
      console.log("licenseAuthorityList",res)
    })
  }

  setLicenseTypeList(){
    this.individualService.getLicenseTypeList().subscribe( res => {
      this.licenseTypeList = res;
      console.log("licenseTypeList",res)
    })
  }

  upload(event:any){
    let file = event.target.files[0];
    console.log("imagefile",file)
    console.log("imagepath",file.name)
    this.fileName = file.name
    /* document.getElementById("filenameifno").innerHTML = this.fileName */
   /*  this.fileName = document.getElementById( 'file-name' );
    this.fileName.textContent = 'File name: ' + file.name; */
  }

  changeTab(tab:any){
    console.log("tab")
    this.individualService.tabChange(tab)
    }
    getImage1(){
      document.getElementById('fileBtnImg1')?.click()
    }
}
