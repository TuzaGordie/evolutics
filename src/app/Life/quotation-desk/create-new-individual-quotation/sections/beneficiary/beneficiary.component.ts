import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IClientDetails, IAssuredRelToOwner } from 'src/app/General/services/quotation.interface';
import { QuotationService } from 'src/app/Life/services/quotation-service.service';

@Component({
  selector: 'q-individual-beneficiary',
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./beneficiary.component.scss'],
})
export class BeneficiaryComponent implements OnInit {

  clientNo: string
  beneficiaries: FormArray
  legalGuardian: FormGroup
  nextOfKin: FormGroup
  clientDetails: IClientDetails
  bene: any[] = [{firstName: '', surname: '', dateOfBirth: '', email: '', phoneNumber: ''}]
  beneficiaryRelToOwner$: Observable<IAssuredRelToOwner>
  beneRel: string[] = ['']
  legalRel: string = ''
  nokRel: string = ''
  
  legal: any = ''
  nextOK: any = ''
  product: any
  quoteNo: any
  pdsc: string

  beneficiariesForm: FormGroup
  get isValid(){
    return this.beneficiariesForm.valid
  }
  get formValue(){
    return this.beneficiariesForm.value
  }

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private quotationService: QuotationService) {}

  ngOnInit(): void {
    // this.clientDetails = this.route.snapshot.data['clientDetails']
    const queryParams = this.route.snapshot.queryParamMap;
    this.quoteNo = queryParams.get('quoteNo')
    
    this.clientNo = queryParams.get('clientNo')
    console.log('params', this.clientNo)
    this.product = {
      code: queryParams.get('productCode') || queryParams.get('pcd'),
    }
    console.log(this.product)
    this.quotationService.getProductInfo(this.product.code).subscribe(data => this.pdsc = data.description)
    
    this.beneficiaries = this.fb.array([
      new FormGroup({
        clientNo: new FormControl(null),
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
        dob: new FormControl(null, Validators.required),
        email: new FormControl(null, Validators.required),
        phoneNo: new FormControl(null, Validators.required),
        relationship: new FormControl(null, Validators.required),
        share: new FormControl(100, Validators.required),
      })
    ])
    this.legalGuardian = new FormGroup({
      clientNo: new FormControl(null),
      relationship: new FormControl(null, Validators.required),
      fullName: new FormControl(null, Validators.required),
      phoneNo: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
    })
    this.nextOfKin = new FormGroup({
      clientNo: new FormControl(null),
      relationship: new FormControl(null, Validators.required),
      fullName: new FormControl(null, Validators.required),
      phoneNo: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
    })

    this.beneficiariesForm = this.fb.group({
      beneficiaries: this.beneficiaries,
      legalGuardian: this.legalGuardian,
      nextOfKin: this.nextOfKin,
    })

    for (let index = 0; index < 1; index++) {
      this.bene[index] = {firstName: '', surname: '', dateOfBirth: '', email: '', phoneNumber: ''};   
        this.beneRel[index] = '' 
    }
    console.log("Bene, ", this.bene)
  }

  findBeneficiary(i){
    const num = this.beneficiariesForm.get('beneficiaries').value[i].clientNo
    console.log(num)
    // console.log(this.clientNo)
    if (!num) {
      this.bene[i] = {firstName: '', surname: '', dateOfBirth: '', email: '', phoneNumber: ''}
    } else {
      this.quotationService.getClientDetails(num).subscribe(data => {
        //console.log(data)
        this.bene[i] = data ? data : {firstName: '', surname: '', dateOfBirth: '', email: '', phoneNumber: ''}
      },
      error => {
        console.log('here')
        this.bene[i] = {firstName: '', surname: '', dateOfBirth: '', email: '', phoneNumber: ''}
      })
      if (num.toUpperCase() == this.clientNo.toUpperCase()){
        this.beneRel[i] = 'Self'
      } else {
        this.quotationService.getAssuredRelToOwner(this.clientNo, num).subscribe( data => {
          //console.log(data)
          this.beneRel[i] = data?.relationship
        }) 
      } 
    }
    console.log(this.beneficiariesForm.get('beneficiaries').value)
  }
  findLegal(){
    const num = this.beneficiariesForm.get('legalGuardian').value.clientNo
    if (!num){
      this.legal = {firstName: '', surname: '', dateOfBirth: '', email: '', phoneNumber: '', fullName: ''}
    } else {
      this.quotationService.getClientDetails(num).subscribe(data => {
        this.legal = data ? data : {firstName: '', surname: '', dateOfBirth: '', email: '', phoneNumber: '', fullName: ''}
      },
      error => {
        this.legal = {firstName: '', surname: '', dateOfBirth: '', email: '', phoneNumber: '', fullName: ''}
      })
      if (num.toUpperCase() == this.clientNo.toUpperCase()){
        this.legalRel = 'Self'
      } else {
        this.quotationService.getAssuredRelToOwner(this.clientNo, num).subscribe( data => {
          //console.log(data)
          this.legalRel = data?.relationship
        }) 
      }
    }
  }
  findNextOfKin(){
    const num = this.beneficiariesForm.get('nextOfKin').value.clientNo
    if (!num) {
      this.nextOK = {firstName: '', surname: '', dateOfBirth: '', email: '', phoneNumber: '', fullName: ''}
    } else {
      this.quotationService.getClientDetails(num).subscribe(data => {
        this.nextOK = data ? data : {firstName: '', surname: '', dateOfBirth: '', email: '', phoneNumber: '', fullName: ''}
      },
      error => {
        this.nextOK = {firstName: '', surname: '', dateOfBirth: '', email: '', phoneNumber: '', fullName: ''}
      })
      if (num.toUpperCase() == this.clientNo.toUpperCase()){
        this.nokRel = 'Self'
      } else {
        this.quotationService.getAssuredRelToOwner(this.clientNo, num).subscribe( data => {
          //console.log(data)
          this.nokRel = data?.relationship
        }) 
      }
    }
  }
  addBeneficiary(){
    const b = new FormGroup({
      clientNo: new FormControl(this.clientNo),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      phoneNo: new FormControl(null, Validators.required),
      relationship: new FormControl(null, Validators.required),
      share: new FormControl(null, Validators.required),
    })
    this.beneficiaries.push(b)
    this.bene.push({firstName: '', surname: '', dateOfBirth: '', email: '', phoneNumber: ''})
  }
}