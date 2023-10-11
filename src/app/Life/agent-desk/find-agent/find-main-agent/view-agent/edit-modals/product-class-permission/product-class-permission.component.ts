import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { IBtn } from 'src/app/Shared/models/index.model';
import { FindMainAgentService } from '../../../service/find-main-agent.service';

@Component({
  selector: 'app-product-class-permission',
  templateUrl: './product-class-permission.component.html',
  styleUrls: ['./product-class-permission.component.scss']
})
export class ProductClassPermissionComponent implements OnInit {
  productClassPermissionForm: FormArray = new FormArray([])
  showNewRecordForm: boolean = false;
  newRecordForm: FormGroup;
  recordStatus = {}
  isLoading: boolean = true;
  isCreating: boolean = false;
  isLoadingProductsList: any = {} // object of booleans. keys are form.value.id
  countriesList: any[]
  productClassesList: any[]
  productsLists: any = {} // object with form.valid.id properties holding list of current products for selected productClasses in the form
  isDeletingRecord = {} // object of record id keys and boolean values
  selectedRecord: any;
  agentNo: string;
  clientNo: string;
  
  constructor(
    private agentService: FindMainAgentService,
    private utilityService: UtilityService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.agentNo = this.route.snapshot.queryParams['agentNo']
    this.setClientNo()
    this.setRecords()
    this.setProductClasses()
    this.initializeAddNewForm()
  }

  initializeAddNewForm(){
    this.newRecordForm = this.getRecordForm({})
  }

  setRecords(){
    this.agentService.getProductClassPermissions(this.agentNo).subscribe(
      (res: any) => {
        if (Array.isArray(res?.content)){
          this.productClassPermissionForm.clear();
          res?.content.forEach(record => {
            this.productClassPermissionForm.push(this.getRecordForm(record))
            this.recordStatus[record.id] = 'VIEW' // display the right buttons
          })
          this.populateProductFields()
        }else{
          console.error("ProductClassPermissions endpoint returned a non-array", res)
        }
      }
    ).add(() => this.isLoading = false)
  }

  getRecordForm(record){
    return new FormGroup({
      agentNo: new FormControl(this.agentNo, Validators.required),
      active: new FormControl(record.active),
      id: new FormControl(record.id),
      productClass: new FormControl(record.productClass, Validators.required),
      product: new FormControl(record.product, Validators.required),
      // updatedBy: new FormControl(record.updatedBy, Validators.required),
      // updatedOn: new FormControl(record.updatedOn, Validators.required),
      clientNo: new FormControl(record.clientNo)
    })
  }

  setProductClasses(){
    this.agentService.getProductClasses().subscribe(
      res => this.productClassesList = res
    )
  }

  onProductClassChange(form){
    this.isLoadingProductsList[form.value.id] = true;
    this.agentService.getProduct(form.value.productClass).subscribe(
      res => {
        this.productsLists[form.value.id] = res
        this.isLoadingProductsList[form.value.id] = false;
      },
      (err: HttpErrorResponse) => {
        this.productsLists[form.value.id] = []
        this.isLoadingProductsList[form.value.id] = false;
      }
    )
  }

  onCreateRecord(){
    if (this.newRecordForm.invalid){
      this.newRecordForm.markAllAsTouched()
      return
    }
    this.isCreating = true

    const payload = {
      ...this.newRecordForm.value,
      clientNo: this.clientNo,
    }
    delete payload.id; // not needed for create

    this.agentService.createProductClassPermission(payload).subscribe(
      (res: any) => {
        this.productClassPermissionForm.push(this.getRecordForm(res))
        this.newRecordForm.reset()
        this.isCreating = false;
      },
      (err: HttpErrorResponse) => {
        console.log("Error creating new ProductClass Permission: ", err)
        this.utilityService.info("Error: " + err.message, 0)
        this.isCreating = false;
      }
    )
  }

  onUpdateRecord(record){
    if(record.invalid) {
      record.markAllAsTouched()
      return
    }
    this.recordStatus[record.value.id] = 'PENDING';

    const payload = {
      ...record.value,
      clientNo: this.clientNo,
    }

    this.agentService.updateProductClassPermission(record.value.id, payload).subscribe(
      (res: any) => {
        this.utilityService.info("Updated successfully")
        this.recordStatus[record.value.id] = 'VIEW';
      },
      (err: HttpErrorResponse) => {
        console.log("Error updating productClassPermission record: ", err)
        this.utilityService.info("Error: " + err.message, 0)
        this.recordStatus[record.value.id] = 'EDITING';
      }
    )
  }

  onSelectRecord(record){
    this.selectedRecord = record
  }

  confirmDeleteRecord(record){
    const btns: IBtn[] = [
      {value: 'Yes', action:() => this.onDeleteRecord(record), type:'primary'},
      {value: 'No', action: ()=>{}}
    ]
    this.utilityService.info("Are you sure you want to delete this record?", 0, '', btns)
  }

  onDeleteRecord(record){
    this.isDeletingRecord[record.value.id] = true;
    this.agentService.deleteProductClassPermission(record.value.id).subscribe(
      (res: any) => {
        this.utilityService.info("Record deleted successfully")
        this.isDeletingRecord[record.value.id] = false;
        this.setRecords() // refresh
      },
      (err: HttpErrorResponse) => {
        console.log("Error deleting productClassPermission record: ", err)
        this.utilityService.info("Error: " + err.message, 0)
        this.isDeletingRecord[record.value.id] = false;
      }
    )
  }

  populateProductFields(){
    this.productClassPermissionForm.controls.forEach((recordForm: FormGroup) => {
      this.onProductClassChange(recordForm)
    })
  }

  getProductClassTitle(record){
    return this.productClassesList?.find(({code, title}) => record.value.productClass == code ? title : '')?.title
  }

  getProductDescription(record){
    return this.productsLists[record.value.id]?.find(({code, description}) => record.value.product == code ? description : '')?.description
  }

  getProductValue(record){
    const description = this.getProductDescription(record)
    return record.value.product + (description ? ' - ' + description : '')
  }

  getProductClassValue(record){
    const title = this.getProductClassTitle(record)
    return record.value.productClass + (title ? ' - ' + title : '')
  }

  setClientNo(){
    this.agentService.getAgentList(this.agentNo).subscribe(
      agent => this.clientNo = agent?.agentInformation?.clientNo
    )
  }
}
