import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';
import { CorporateAgentService } from '../service/corporate-agent.service';

@Component({
  selector: 'app-agent-info',
  templateUrl: './agent-info.component.html',
  styleUrls: ['./agent-info.component.scss'],
})
export class CRMSAgentInfoComponent implements OnInit {
  agentInfoForm: any = FormGroup;
  agentTypeList: any = [];
  productList: any = [];
  productClassList: any = [];
  HierarchyList: any = [];
  BranchList: any = [];
  fileName: any;
  hierarchyCode: any;
  faUpload = faUpload;

  constructor(public corporateService: CorporateAgentService) {}

  ngOnInit(): void {
    this.agentInfoForm = new FormGroup({
      /* country: new FormControl(null,Validators.required),
      sortCode: new FormControl(null), */
      agentType: new FormControl(null),
      hierarchyCode: new FormControl(null),
      product: new FormControl(null),
      branch: new FormControl(null),
      productClass: new FormControl(null),
    });
    this.setAgentTypeList();
    this.setProductList();
    this.setProductClassList();
    this.setHierarchyList();
    this.setBranchList();
  }

  get validation() {
    /*  console.log("validator",this.newPaymentForm?.controls) */
    return this.agentInfoForm?.controls;
  }

  onSubmit() {}

  hierarchy() {
    this.corporateService.hierarchyCodeManager(
      this.agentInfoForm.get('hierarchyCode')?.value
    );
  }
  setAgentTypeList() {
    this.corporateService.getAgentTypeList().subscribe((res) => {
      this.agentTypeList = res;
      console.log('agentTypeList', res);
    });
  }

  agentTypeSemt() {
    this.corporateService.agentType(this.agentInfoForm.get('agentType')?.value);
  }
  branchInfo() {
    this.corporateService.branchInfo({
      branchCode: this.agentInfoForm.get('branch')?.value,
    });
  }

  setProductList() {
    // debugger;
    let codeSubgroup = this.agentInfoForm.value.codeSubgroup; //("productClass")?.value1
    let codeCat = this.agentInfoForm.value.codeCat; //("productClass")?.value1
    console.log('selected product', codeSubgroup);
    this.corporateService
      .getProductList(codeSubgroup, codeCat)
      .subscribe((res) => {
        this.productList = res;
        // this.productList=this.productList.filter((element:any)=>{
        //   return element.CODE_CAT==selectedProduct
        // })

        this.corporateService.permissionInfo(
          this.agentInfoForm.value.productClass
        );
        this.agentInfoForm.patchValue({ productQualification: null });
        this.onSubmit();
      });

    /* this.corporateService.getProductList().subscribe( res => {
      this.productList = res;
      console.log("productList",res)
    }) */
  }
  storeProductList() {
    let codeSubgroup = this.agentInfoForm.value.product; //get("product")?.value1
    this.corporateService.productList(codeSubgroup);
  }

  setProductClassList() {
    this.corporateService.getProductClassList().subscribe((res) => {
      this.productClassList = res;
      console.log('productClassList', res);
    });
  }
  setBranchList() {
    this.corporateService.getBranchList().subscribe((res) => {
      this.BranchList = res;
      console.log('BranchList', res);
    });
  }
  setHierarchyList() {
    this.corporateService.getHierarchyList().subscribe((res) => {
      this.HierarchyList = res;
      this.HierarchyList = this.HierarchyList.filter((element: any) => {
        return (
          element.CLIENT_NO ==
          this.corporateService.individualClientInfo?.agent.clientNo
        );
      });
      console.log('selectedSort', this.HierarchyList);
      if (this.HierarchyList) {
        this.hierarchyCode = this.HierarchyList[0].HIERARCHY_CODE;
      } else {
        this.hierarchyCode = 2;
      }
      this.onSubmit();
      console.log('code', this.hierarchyCode);
    });
  }

  upload(event: any) {
    let file = event.target.files[0];
    console.log('imagefile', file);
    console.log('imagepath', file.name);
    this.fileName = file.name;
  }

  changeTab(tab: any) {
    console.log('tab');
    this.corporateService.tabChange(tab);
  }
  getImage() {
    let as = document.getElementById('fileBtnImg')?.click();
  }
}
