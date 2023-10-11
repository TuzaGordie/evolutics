import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FindRatesService } from '../service/find-rates.service';

@Component({
  selector: 'app-show-general-rates',
  templateUrl: './show-general-rates.component.html',
  styleUrls: ['./show-general-rates.component.scss']
})
export class ShowGeneralRatesComponent implements OnInit {

  testList:any=[]
  viewTestForm:any = FormGroup
  retrievalMtd:String = "lookup"
  axisXval:String = "vehicle_type"
  axisYval :String = "vehicle_type"
  lookupFieldval:String = "vehicle_type"
  bandingFieldval:String = "vehicle_type"



  constructor(public findRatesService : FindRatesService) { }

  ngOnInit(): void {

    this.setTestList()
    this.viewTestForm = new FormGroup({
      testDescription: new FormControl(null)
    })

    this.setFormData(this.findRatesService.getTestList)
    console.log("formdata", this.viewTestForm.value)
  }

  setTestList(){
    this.findRatesService.getTestList().subscribe( res => {
      this.testList = res;
      console.log("rate category",res)
    })
  }

  setFormData(data: any){
    this.viewTestForm.patchValue({
      testDescription: data?.STATUS
    })

  }

  onRetrievalSelected(value:String)
  {
    this.retrievalMtd = value
  }
  setAxisx(value:String){
    this.axisXval = value
  }
  setAxisy(value:String){
    this.axisYval = value
  }

  setLookupField(value: string) {
    this.lookupFieldval = value
  }
  setBandingField(value: string) {
    this.bandingFieldval = value
  }
}
