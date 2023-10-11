import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Form2Service } from '../form2.service';

@Component({
  selector: 'app-employinfo',
  templateUrl: './employinfo.component.html',
  styleUrls: ['./employinfo.component.scss']
})
export class EmployinfoComponent implements OnInit {

  employmentForm:FormGroup=new FormGroup({})
  sectorList:any = []
  employmentStatusList:any = []
  occupationList:any = []
  occupationGroupList:any = []
  constructor(public allFormService: Form2Service) { }

  ngOnInit(): void {
    this.employmentForm = new FormGroup({
      employstatus: new FormControl(null,Validators.required),
      sector: new FormControl(null,Validators.required),
      incomeBand: new FormControl(null,Validators.required),
      occupation: new FormControl(null,Validators.required),
      employerClientNo: new FormControl(null,Validators.required),
      companyName: new FormControl(null,Validators.required),
      ocupationGroup: new FormControl(null)     
      
    })
    this.setSectorList()
    this.setEmploymentStatusList()
    this.setOccupationList()
    this.setOccupationGroupList()
  }
  get validation() { return this.employmentForm?.controls }

  onSubmit(){
    console.log(this.employmentForm)
 this.allFormService.employmentInfo(this.employmentForm.value);
  }
  changeTab(tab:any){
    console.log("tab")
    this.allFormService.tabChange(tab)
    }

setSectorList(){
  this.allFormService.getSectorList().subscribe( res => {
    this.sectorList = res;
    console.log("sectorList",res)
  })
}
setEmploymentStatusList(){
  this.allFormService.getEmploymentStatusList().subscribe( res => {
    this.employmentStatusList = res;
    console.log("employmentStatusList",res)
  })
}
setOccupationList(){
  this.allFormService.getOccupationList().subscribe( res => {
    this.occupationList = res;
    console.log("setOccupationList",res)
  })
}
setOccupationGroupList(){
  this.allFormService.getOccupationGroupList().subscribe( res => {
    this.occupationGroupList = res;
    console.log("setOccupationGroupList",res)
  })
}
}
