import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FindRatesService } from '../../service/find-rates.service';
declare var $: any;

@Component({
  selector: 'app-create-general-rates',
  templateUrl: './create-general-rates.component.html',
  styleUrls: ['./create-general-rates.component.scss']
})

export class CreateGeneralRateComponent implements OnInit {

  testList:any=[]
  rateCategoryList:any=[]
  rateGroupList:any=[]
  rateList:any=[]
  ratePartition1:any
  rateRetrieval:any
  valueBasis:any
  valueParam:any
  durationBasisCalc:any
  CreateGenRateForm: any = new FormGroup({})
  postGenList:any
  errorMessage: any;
  code:any;

  nbOfRows:number = 0
  nbOfCols:number = 0
  retrievalMtd:String = "lookup"
  axisXval:String = "vehicle_type"
  axisYval :String = "vehicle_type"
  lookupFieldval:String = "vehicle_type"
  bandingFieldval:String = "vehicle_type"







  // "axisXValue": "string",
  //   "axisYValue": "string",
  //   "bandParameter": "string",
  //   "category": "string",
  //   "code": "string",
  //   "description": "string",
  //   "durationCalcBasis": "string",
  //   "group": "string",
  //   "id": 0,
  //   "key1": "string",
  //   "key2": "string",
  //   "key3": "string",
  //   "key4": "string",
  //   "key5": "string",
  //   "lookupValue": "string",
  //   "retrievalBasis": "string",
  //   "sub_group": "string",
  //   "valueBasis": "string",
  //   "valueParameter": "string",
  //   "versionDate": "string",
  //   "versionDateBasis": "string",
  //   "versionNumber": "string"



  constructor(public findRatesService : FindRatesService, public http:HttpClient) { }

  ngOnInit(): void {

    this.CreateGenRateForm = new FormGroup({
      axisXValue: new FormControl( null),
      axisYValue: new FormControl(null),
      bandParameter: new FormControl(null),
      category: new FormControl(null),
      code: new FormControl(null),
      description: new FormControl(null),
      durationCalcBasis: new FormControl(null),
      key1: new FormControl(null),
      key2: new FormControl(null),
      key3: new FormControl(null),
      key4: new FormControl(null),
      key5: new FormControl(null),
      lookupValue: new FormControl(null),
      retrievalBasis: new FormControl(null),
      sub_group: new FormControl(null),
      valueBasis: new FormControl(null),
      versionDate: new FormControl(null),
      versionDateBasis: new FormControl(null),
      versionNumber: new FormControl(null),
      id: new FormControl(0)


    })


    this.setRateCategory()
    this.setRateGroup()
    this.setRateList()
    this.setRatePartition1()
    this.setRateRetrieval()
    this.setValueBasis()
    this.setValueParam()
    this.setDurationBasis()
    this.onSubmit()


    // this.setFormData(this.findRatesService.getCodeList)
    // console.log("formdata", this.CreateGenRateForm.value)
  }


  onKey(event:any) {const inputValue = event.target.value;}

  onSubmit(){

    this.findRatesService.submitGenrate(this.CreateGenRateForm.value).subscribe( res => {
      this.rateCategoryList = res;
      console.log("post", res)
    })

  }


  // postFormGroup(){
  //   let dataJS = this.CreateGenRateForm.value;
  //   this.http.post('http://localhost:3000/generalRate', this.CreateGenRateForm.value).subscribe(res => {
  //     dataJS = res;
  //     console.log("rate category", res)
  //   })
  // }

  // setFormData(data: any){
  //   this.CreateGenRateForm.get({

  //     axisXValue:data?.axisXValue,
  //     axisYValue:data?.axisYValue,
  //     bandParameter:data?.bandParameter,
  //     category: data?.category,
  //     code:data?.code,
  //     description:data?.description,
  //     durationCalcBasis:data?.durationCalcBasis,
  //     key1:data?.key1,
  //     key2:data?.key2,
  //     key3:data?.key3,
  //     key4:data?.key4,
  //     key5:data?.key5,
  //     lookupValue:data?.lookupValue,
  //     retrievalBasis:data?.retrievalBasis,
  //     sub_group:data?.sub_group,
  //     valueBasis:data?.valueBasis,
  //     versionDate:data?.versionDate,
  //     versionDateBasis:data?.versionDateBasis,
  //     versionNumber:data?.versionNumber
  //   })

  // }

  setRateCategory(){
    this.findRatesService.getCodeList("RATE_CATEGORY").subscribe( res => {
      this.rateCategoryList = res;
      console.log("rate category", res)
    })
  }

  setRateGroup(){
    this.findRatesService.getCodeList("RATE_GROUP").subscribe( res => {
      this.rateGroupList = res;
      console.log("rate group", res)
    })
  }

  setRateList(){
    this.findRatesService.getRateList().subscribe( res => {
      this.rateList = res;
      console.log("rate List", res)
    })
  }

  setRatePartition1(){
    this.findRatesService.getCodeList("RATE_KEYS").subscribe( res => {
      this.ratePartition1 = res;
      console.log("rate partition 1", res)
    })
  }

  setRateRetrieval(){
    this.findRatesService.getCodeList("RATE_RETRIEVAL_BASIS").subscribe( res => {
      this.rateRetrieval = res;
      console.log("rate retrieval 1", res)
    })
  }



  setValueBasis(){
    this.findRatesService.getCodeList("VALUE_BASIS").subscribe( res => {
      this.valueBasis = res;
      console.log("Value Basis", res)
    })
  }

  setValueParam(){
    this.findRatesService.getCodeList("VALUE_FIELD").subscribe( res => {
      this.valueParam = res;
      console.log("Value Parameter", res)
    })
  }

  setDurationBasis(){
    this.findRatesService.getCodeList("DURATION_CALC_BASIS").subscribe( res => {
      this.durationBasisCalc = res;
      console.log("Duration Basis ", res)
    })
  }

  onRateRetrievalBasisChange(selected:String){

    if(selected == "1: Lookup")
    {
      $('#LookupModal').modal('show');
    }
    if(selected == "2: Matrix")
    {
      $('#MatrixModal').modal('show');
    }
  }
  rowCounter() {
    return new Array(this.nbOfRows);
  }

  colCounter() {
    return new Array(this.nbOfCols);
  }

  setRows(num:string){
    this.nbOfRows = Number(num)
  }
  setCols(num:string){
    this.nbOfCols = Number(num)
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
