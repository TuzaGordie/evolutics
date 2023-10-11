import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IndividualAgentService } from '../services/individual-agent.service';
import {faUpload} from "@fortawesome/free-solid-svg-icons/faUpload";
@Component({
  selector: 'app-agent-info',
  templateUrl: './agent-info.component.html',
  styleUrls: ['./agent-info.component.scss']
})
export class CRMSAgentInfoComponent implements OnInit {

  agentInfoForm:any = FormGroup;
  agentTypeList:any = []
  productList:any = []
  productClassList:any = []
  HierarchyList:any = []
  BranchList:any = []
  fileName:any;
  hierarchyCode:any
  faUpload: any = faUpload;

  constructor(public individualService: IndividualAgentService) { }

  ngOnInit(): void {

    this.agentInfoForm = new FormGroup({
      /* country: new FormControl(null,Validators.required),
      sortCode: new FormControl(null), */
      agentType: new FormControl(null),
      hierachyManager: new FormControl(null),
      productQualification: new FormControl(null),
      branch: new FormControl(null),
      productClassQualification: new FormControl(null)

    })
    this.setAgentTypeList()
    this.setProductList()
    this.setProductClassList()
    this.setHierarchyList()
    this.setBranchList()
  }

  get validation() {
    /*  console.log("validator",this.newPaymentForm?.controls) */
     return this.agentInfoForm?.controls
   }

  onSubmit(){
    console.log(this.agentInfoForm)
    this.individualService.agentInfo(this.agentInfoForm.value);
  }
  setAgentTypeList(){
    this.individualService.getAgentTypeList().subscribe( res => {
      this.agentTypeList = res;
      console.log("agentTypeList",res)
    })
  }
  setProductList(){
    let selectedProduct = this.agentInfoForm.get("productClassQualification")?.value
console.log("selected product",selectedProduct)
this.individualService.getProductList().subscribe( res => {
  this.productList = res;
  this.productList=this.productList.filter((element:any)=>{
    return element.CODE_CAT==selectedProduct
  })
  this.agentInfoForm.patchValue({productQualification:null})
  console.log("product",this.productList)
})
    /* this.individualService.getProductList().subscribe( res => {
      this.productList = res;
      console.log("productList",res)
    }) */
  }
  setProductClassList(){
    this.individualService.getProductClassList().subscribe( res => {
      this.productClassList = res;
      console.log("productClassList",res)
    })
  }
  setBranchList(){
    this.individualService.getBranchList().subscribe( res => {
      this.BranchList = res;
      console.log("BranchList",res)
    })
  }
  setHierarchyList(){
    this.individualService.getHierarchyList().subscribe( res => {
      this.HierarchyList = res;
      this.HierarchyList=this.HierarchyList.filter((element:any)=>{
        return element.CLIENT_NO== this.individualService.individualClientInfo?.CLIENT_NO
      })
      console.log("selectedSort",this.HierarchyList)
      this.hierarchyCode = this.HierarchyList[0].HIERARCHY_CODE
      console.log("code",this.hierarchyCode)
    })
  }


  upload(event:any){
    let file = event.target.files[0];
    console.log("imagefile",file)
    console.log("imagepath",file.name)
  this.fileName = file.name

  }

  changeTab(tab:any){
    console.log("tab")
    this.individualService.tabChange(tab)
    }
    getImage(){
      let as = document.getElementById('fileBtnImg')?.click()
    }
}
