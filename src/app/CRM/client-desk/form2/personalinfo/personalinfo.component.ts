import { Component, OnInit } from '@angular/core';
import { Form2Service } from '../form2.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personalinfo',
  templateUrl: './personalinfo.component.html',
  styleUrls: ['./personalinfo.component.scss']
})
export class PersonalinfoComponent implements OnInit {

  personalFormData:FormGroup=new FormGroup({})
  countryList:any = []
  regionList:any = []
  stateList:any = []
  townList:any = []
  nationalityList:any = []
  emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  checkEmail:any
  checkAltEmail:any
  checkPhoneNo:any
  checkAltPhoneNo:any
  constructor(public allFormService: Form2Service) { }

  ngOnInit(): void {
    this.personalFormData = new FormGroup(
      {
      surname: new FormControl(null,Validators.required),
      firstName: new FormControl(null,Validators.required),
      email: new FormControl(null,[Validators.required, Validators.pattern(this.emailRegEx)]),
      phoneNumber: new FormControl(null,Validators.required),
      address: new FormControl(null,Validators.required),
      addressCountry: new FormControl(null,Validators.required),
      addressRegion: new FormControl(null,Validators.required),
      addressState: new FormControl(null,Validators.required),
      addressTown: new FormControl(null),
      middleName: new FormControl(null,Validators.required),
      dob: new FormControl(null,Validators.required),
      alternateEmail: new FormControl(null,[Validators.required, Validators.pattern(this.emailRegEx)]),
      alternatePhoneNo: new FormControl(null,Validators.required),
      maritalStatus: new FormControl(null,Validators.required),
      gender: new FormControl(null,Validators.required),
      clientType: new FormControl(null,Validators.required),
      nationality: new FormControl(null,Validators.required),
    }
  /*   {
      validator: this.ConfirmPasswordValidator("email", "alternateEmail")
    } */
    
    )
    this.setCountryList()
    this.setRegionList()
    this.setStateList()
    this.setTownList()
    this.setNationalityList()

  }

  keyFunc(event:any){
    console.log("altmail",event)
    this.checkEmail = this.personalFormData.value.email
    this.checkAltEmail = this.personalFormData.value.alternateEmail
    console.log("both mail",this.checkEmail,this.checkAltEmail)
  }
  checkPhoneno(event:any){
    console.log("altmail",event)
    this.checkPhoneNo = this.personalFormData.value.phoneNumber
    this.checkAltPhoneNo = this.personalFormData.value.alternatePhoneNo
    console.log("both mail",this.checkPhoneNo,this.checkAltPhoneNo)
  }
/*   ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName]
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmPasswordValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  } */

  get validation() { return this.personalFormData?.controls }

  onSubmit(){
    console.log(this.personalFormData)
 this.allFormService.personalInfo(this.personalFormData.value);
  }
  changeTab(tab:any){
    console.log("tab")
    this.allFormService.tabChange(tab)
    }

    setCountryList(){
      this.allFormService.getCountryList().subscribe( res => {
        this.countryList = res;
        console.log("countrylist",res)
      })
    }
    setRegionList(){
      let selectedCountry = this.personalFormData.get("addressCountry")?.value
      console.log("selected country",selectedCountry)
      this.allFormService.getRegionList().subscribe( res => {
        this.regionList = res;
        this.regionList=this.regionList.filter((element:any)=>{
          return element.countryID==selectedCountry
        })
        this.personalFormData.patchValue({addressRegion:null ,addressState:null ,addressTown:null })
        console.log("regionlist",res)
      })
    }
    setStateList(){
      let selectedRegion = this.personalFormData.get("addressRegion")?.value
      console.log("selected region",selectedRegion)
      this.allFormService.getStateList().subscribe( res => {
        this.stateList = res;
        this.stateList=this.stateList.filter((element:any)=>{
          return element.countryID==selectedRegion
        })
        this.personalFormData.patchValue({addressState:null, addressTown:null })
        console.log("statelist",res)
      })
    }
setTownList(){
  let selectedState = this.personalFormData.get("addressState")?.value
  console.log("selected State",selectedState)
  this.allFormService.getTownList().subscribe( res => {
    this.townList = res;
    this.townList=this.townList.filter((element:any)=>{
      return element.countryID==selectedState
    })
    this.personalFormData.patchValue({addressTown:null })
    console.log("townlist",res)
  })
}
setNationalityList(){
  this.allFormService.getCountryList().subscribe( res => {
    this.nationalityList = res;
    console.log("setNationalityList",res)
  })
}
}