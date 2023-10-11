import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-screenshot1',
  templateUrl: './screenshot1.component.html',
  styleUrls: ['./screenshot1.component.scss']
})
export class Screenshot1Component implements OnInit {

  companyForm:FormGroup=new FormGroup({})
  countryList:any = []
  regionList:any = []
  stateList:any = []
  townList:any = []
  sectorList:any = []
  segmentList:any = []
  emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  constructor(private formService: ServiceService) { }

  ngOnInit(): void {
    this.companyForm = new FormGroup({
      name: new FormControl(null,Validators.required),
      country: new FormControl(null,Validators.required),
      email: new FormControl(null,[Validators.required, Validators.pattern(this.emailRegEx)]),
      phoneNo: new FormControl(null,Validators.required),
      address: new FormControl(null,Validators.required),
      addressCountry: new FormControl(null,Validators.required),
      addressRegion: new FormControl(null,Validators.required),
      addressState: new FormControl(null,Validators.required),
      addressTown: new FormControl(null),
      companyRedg: new FormControl(null,Validators.required),
      seagment: new FormControl(null,Validators.required),
      website: new FormControl(null,[
        Validators.required,
        Validators.pattern("^((www.))([a-zA-z0-9\-_]+)(.com)")
      ]),
      sector: new FormControl(null,Validators.required)
      
    })
    this.setCountryList()
    this.setRegionList()
    this.setStateList()
    this.setTownList()
    this.setSectorList()
    this.setSegmentList()


  }
  get validation() { 
    return this.companyForm?.controls 
   }

  onSubmit(){
    console.log(this.companyForm)
 this.formService.companyInfo(this.companyForm.value);
    let ss1 = { companyInfo: this.companyForm.value}
    console.log(ss1)
  }
  changeTab(tab:any){
    console.log("tab")
    this.formService.tabChange(tab)
    }

    setCountryList(){
      this.formService.getCountryList().subscribe( res => {
        this.countryList = res;
        console.log("countrylist",res)
      })
    }
    setRegionList(){
      let selectedCountry = this.companyForm.get("addressCountry")?.value
      console.log("selected country",selectedCountry)
      this.formService.getRegionList().subscribe( res => {
        this.regionList = res;
        this.regionList=this.regionList.filter((element:any)=>{
          return element.countryID==selectedCountry
        })
        this.companyForm.patchValue({addressRegion:null ,addressState:null ,addressTown:null })
        console.log("regionlist",res)
      })
    }
    setStateList(){
      let selectedRegion = this.companyForm.get("addressRegion")?.value
      console.log("selected region",selectedRegion)
      this.formService.getStateList().subscribe( res => {
        this.stateList = res;
        this.stateList=this.stateList.filter((element:any)=>{
          return element.countryID==selectedRegion
        })
        this.companyForm.patchValue({addressState:null, addressTown:null })
        console.log("statelist",res)
      })
    }
setTownList(){
  let selectedState = this.companyForm.get("addressState")?.value
  console.log("selected State",selectedState)
  this.formService.getTownList().subscribe( res => {
    this.townList = res;
    this.townList=this.townList.filter((element:any)=>{
      return element.countryID==selectedState
    })
    this.companyForm.patchValue({addressTown:null })
    console.log("townlist",res)
  })
}
setSectorList(){
  this.formService.getSectorList().subscribe( res => {
    this.sectorList = res;
    console.log("sectorList",res)
  })
}
setSegmentList(){
  this.formService.getSegmentList().subscribe( res => {
    this.segmentList = res;
    console.log("segmentlist",res)
  })
}
}
