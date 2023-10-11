import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { AddDocumentModalComponent } from 'src/app/Reusables/reusable-comps/add-document-modal/add-document-modal.component';
import { UtilityService } from 'src/app/Services/utility.service';
import {
  ICodeDescription,
  IDocMetadata,
} from 'src/app/Shared/models/index.model';
import { IndividualAgentService } from '../services/individual-agent.service';

@Component({
  selector: 'app-agent-info',
  templateUrl: './agent-info.component.html',
  styleUrls: ['./agent-info.component.scss'],
})
export class AgentInfoComponent implements OnInit {
  @Input() agentInformation: FormGroup;
  /*  agentInfoForm:any = FormGroup; */
  agentTypeList: any[] = []; 
  productClassList: any = [];
  productQualification: any[] = [];
  HierarchyList: any[] = [];
  BranchList: any[] = [];
  managerList: any []= [];
  fileName: any;
  hierarchyManager: any;
  faUpload = faUpload;
  private nbofTable: number = 1;
  private nbofTable2: number = 1;
  codeOfProduct: any = [];
  companyList: ICodeDescription[];
  file: File;
  fileMetadata: IDocMetadata;
  get agentName() {
    return this.agentInformation?.value?.name;
  }
  constructor(
    public individualService: IndividualAgentService,
    public uS: UtilityService
  ) {}

  ngOnInit(): void {
    /*  this.agentInfoForm = new FormGroup({
      agentType: new FormControl(null),
      hierarchyCode: new FormControl(null),
      product: new FormControl(null),
      branch: new FormControl(null),
      productClass: new FormControl(null)

    }) */
    this.setAgentTypeList();
    /*  this.setProductList(); */
    this.setProductClassList();
    this.setHierarchyList();
    this.setBranchList();
    this.getCompanyList();

    this.setAgentTypeList2();
    /*  this.addProduct() */
  }

  get validation() {
    /*  console.log("validator",this.newPaymentForm?.controls) */
    return this.agentInformation?.controls;
  }
  get productListFormArray() {
    return this.agentInformation.get('productList') as FormArray;
  }

  setAgentName(event: any) {
    this.agentInformation.patchValue({
      hierarchyAgentType: null,
      hierarchyManager: null,
    });
    let code = this.agentInformation?.value?.hierarchyAgentNo;
    if (!code)
      this.agentInformation.patchValue({
        name: null,
      });
    this.individualService.getAgentName(code).subscribe(
      (res) => {
        this.agentInformation.patchValue({ name: res });
        console.log('agentName', res);
      },
      (err) => {
        console.log(err);
      }
    );
  } 
  addProduct(index: number=this.productListFormArray?.length) {
    let data = new FormGroup({
      productClass: new FormControl('', Validators.required),
      product: new FormControl('', Validators.required),
    });
    this.productListFormArray.insert(index, data);
  }
  removeProduct(index: number) {
   this.productListFormArray.removeAt(index);
  }  
  setAgentTypeList() {
    this.individualService.getAgentTypeList().subscribe((res) => {
      this.agentTypeList = res; 
    });
  }
  setAgentTypeList2() {
    this.individualService.getAgentTypeList2().subscribe((res) => {
      this.agentTypeList = res;
      console.log('--2-agentTypeList', res);
    });
  } 
  getProductCode=(productCls:string)=>{
    // debugger
    return  this.individualService.getProductList(productCls )
  }
 
  setProductClassList() {
    this.individualService.getProductClassList().subscribe((res) => {
      this.productClassList = res;
      console.log('productClassList', res);
    });
  }
  setBranchList() {
    this.individualService.getBranchList().subscribe((res) => {
      this.BranchList = res;
      console.log('BranchList', res);
    });
  }
  getCompanyList() {
    this.individualService.getCompanyList().subscribe((res) => {
      this.companyList = res;
      console.log('companyList', res);
    });
  }
  setHierarchyList() {
    this.individualService.getHierarchyList().subscribe((res: any) => {
      this.HierarchyList = res;
      this.HierarchyList = this.HierarchyList.filter((element: any) => {
        return (
          element.CLIENT_NO ==
          this.individualService.individualClientInfo?.agent?.clientNo
        );
      });
      console.log('selectedSort', this.HierarchyList);
      if (this.HierarchyList?.length) {
        this.hierarchyManager = this.HierarchyList[0].HIERARCHY_CODE;
      } else {
        this.hierarchyManager = 2;
      }
      console.log('code', this.hierarchyManager);
    });
  }

  setManagerList() {
    console.log(' manager', this.agentInformation?.value);
    let codeSubgroup = this.agentInformation?.value?.hierarchyAgentType;
    console.log('selected manager', codeSubgroup);
    this.individualService
      .getManagerList(codeSubgroup)
      .subscribe((res: any) => {
        console.log('manager list', res);
        this.managerList = res;
      });
  }

  openAddDocumentModal() {
    this.uS.dialogOpener(
      AddDocumentModalComponent,
      {
        width: '50%',
        maxWidth: '90%',
        maxHeight: '90vh',
        data: {
          document: this.fileMetadata,
          file: this.file,
        },
      },
      (r: { metadataForm: FormGroup; metadata: IDocMetadata; file: File }) => { 
        this.file = r.file;
        this.fileMetadata = r.metadata;
      }
    );
  }

  changeTab(tab: any) {
    console.log('tab');
    this.individualService.tabChange(tab);
  }
  tableCounter() {
    return new Array(this.nbofTable);
  }

  tableInc() {
    /*  this.nbofTable = this.nbofTable + 1; */
  }

  table2Counter() {
    return new Array(this.nbofTable2);
  }

  table2Inc() {
    this.nbofTable2 = this.nbofTable2 + 1;
  }
}
