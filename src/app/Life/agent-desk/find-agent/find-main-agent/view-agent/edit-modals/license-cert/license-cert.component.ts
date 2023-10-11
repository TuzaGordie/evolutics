import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindMainAgentService } from '../../../service/find-main-agent.service';

@Component({
  selector: 'app-license-cert',
  templateUrl: './license-cert.component.html',
  styleUrls: ['./license-cert.component.scss']
})
export class LicenseCertComponent implements OnInit {
  licenseCertForm: FormGroup;
  recordStatus: 'VIEW' | 'EDITING' | 'PENDING';
  saveStatus: 'CREATE' | 'UPDATE' = 'CREATE';
  isCreating: boolean = false;
  isUpdating: boolean = false;
  agentNo: string;

  countriesList: any[]
  licenseTypesList: any[]
  licenseAuthoritiesList: any[]

  constructor(
    private agentService: FindMainAgentService,
    private route: ActivatedRoute,
    private utilityService: UtilityService,
  ) { }

  ngOnInit(): void {
    this.agentNo = this.route.snapshot.queryParams['agentNo'];
    this.initializeNewRecordForm()
    this.setCountriesList()
    this.setLicenseTypesList()
    this.setLicenseAuthoritiesList()
    this.setLicenseCertForm()
  }

  initializeNewRecordForm(){
    this.licenseCertForm = this.getNewRecordForm({})
  }

  getNewRecordForm(data){
    return new FormGroup({
      id: new FormControl(data.id),
      certificateNumber: new FormControl(data.certificateNumber, Validators.required),
      licenceType: new FormControl(data.licenceType, Validators.required),
      licensedCountry: new FormControl(data.licensedCountry, Validators.required),
      licenseAuthority: new FormControl(data.licenseAuthority, Validators.required),
      active: new FormControl(data.active),
      issueDate: new FormControl(data.issueDate, Validators.required),
      expiryDate: new FormControl(data.expiryDate, Validators.required),
      updatedBy: new FormControl(data.updatedBy, Validators.required),
    })
  }

  onSave(){
    if (this.saveStatus == 'UPDATE'){
      this.onUpdateRecord()
    }else{
      this.onCreateRecord()
    }
  }

  onCreateRecord(){
    if (this.licenseCertForm.invalid){
      this.licenseCertForm.markAllAsTouched()
      return
    }
    this.recordStatus = 'PENDING'
    this.agentService.createLicenseCert(this.licenseCertForm.value).subscribe(
      res => {
        this.licenseCertForm.patchValue(this.getNewRecordForm(res))
        this.utilityService.info("License Cert created successfully")
        this.recordStatus = 'VIEW'
        this.saveStatus = 'UPDATE' // any future save button presses will trigger update not create
      },
      (err: HttpErrorResponse) => {
        console.log("error fetching license cert record", err)
        this.utilityService.info("Error: " + err.message, 0)
        this.recordStatus = 'EDITING'
      }
    )
  }

  onUpdateRecord(){
    if (this.licenseCertForm.invalid){
      this.licenseCertForm.markAllAsTouched()
      return
    }
    this.recordStatus = 'PENDING'
    this.agentService.updateLicenseCert(this.licenseCertForm.value.id, this.licenseCertForm.value).subscribe(
      res => {
        this.licenseCertForm.patchValue(this.getNewRecordForm(res))
        this.utilityService.info("License Cert updated successfully")
        this.recordStatus = 'VIEW'
      },
      (err: HttpErrorResponse) => {
        console.log("error updating license cert record")
        this.utilityService.info("Error: " + err.message, 0)
        this.recordStatus = 'EDITING'
      }
    )
  }

  setCountriesList(){
    this.agentService.getCountriesList().subscribe(
      res => this.countriesList = res
    )
  }

  setLicenseTypesList(){
    this.agentService.getLicenseTypesList().subscribe(
      res => this.licenseTypesList = res
    )
  }

  setLicenseAuthoritiesList(){
    this.agentService.getLicenseAuthoritiesList().subscribe(
      res => this.licenseAuthoritiesList = res
    )
  }

  setLicenseCertForm(){
    console.log("this.agentNo just before fetching license cert ", this.agentNo)
    this.agentService.getLicenseCert(this.agentNo).subscribe(
      res => {
        this.licenseCertForm.patchValue(res)
        this.saveStatus = 'UPDATE' // any future button presses will trigger update not create
      }
    )
  }

  isFieldInvalid(fieldName){
    return this.licenseCertForm.controls[fieldName].touched && this.licenseCertForm.controls[fieldName].invalid
  }
}
