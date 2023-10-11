import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IClientDetails, IAssuredRelToOwner } from 'src/app/General/services/quotation.interface';
import { QuotationService } from 'src/app/General/services/quotation-service.service';

@Component({
  selector: 'g-beneficiary',
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./beneficiary.component.scss'],
})
export class BeneficiaryComponent implements OnInit {

  clientNo: string
  beneficiaries: FormArray
  legalGuardian: FormGroup
  nextOfKin: FormGroup
  clientDetails: IClientDetails
  bene: any[] = ['']
  beneficiaryRelToOwner$: Observable<IAssuredRelToOwner>
  beneRel: string[] = ['']
  legalRel: string = ''
  nokRel: string = ''
  
  legal: any = ''
  nextOK: any = ''

  beneficiariesForm: FormGroup
  get isValid(){
    return this.beneficiariesForm.valid
  }
  get formValue(){
    return this.beneficiariesForm.value
  }

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private quotationService: QuotationService) {}

  ngOnInit(): void {
    this.clientDetails = this.route.snapshot.data['clientDetails']
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

    // for (let index = 0; index < 1; index++) {
    //   this.bene[index] = this.clientDetails;   
    //   this.quotationService.getAssuredRelToOwner(this.clientNo, this.clientNo).subscribe( data => {
    //     this.beneRel[index] = data.relationship
    //   }) 
    // }
    //console.log("Bene, ", this.bene)
  }

  findBeneficiary(i){
    const num = this.beneficiariesForm.get('beneficiaries').value[i].clientNo
    //console.log(num)
    this.quotationService.getClientDetails(num).subscribe(data => {
      //console.log(data)
      this.bene[i] = data
    })
    if (num == this.clientDetails.clientNo){
      this.beneRel[i] = 'Self'
    } else {
      this.quotationService.getAssuredRelToOwner(this.clientDetails.clientNo, num).subscribe( data => {
        //console.log(data)
        this.beneRel[i] = data.relationship
      }) 
    } 
    console.log(this.beneficiariesForm.get('beneficiaries').value)
  }
  findLegal(){
    const num = this.beneficiariesForm.get('legalGuardian').value.clientNo
    this.quotationService.getClientDetails(num).subscribe(data => {
      this.legal = data
    })
    if (num == this.clientDetails.clientNo){
      this.legalRel = 'Self'
    } else {
      this.quotationService.getAssuredRelToOwner(this.clientDetails.clientNo, num).subscribe( data => {
        //console.log(data)
        this.legalRel = data.relationship
      }) 
    }
  }
  findNextOfKin(){
    const num = this.beneficiariesForm.get('nextOfKin').value.clientNo
    this.quotationService.getClientDetails(num).subscribe(data => {
      this.nextOK = data
    })
    if (num == this.clientDetails.clientNo){
      this.nokRel = 'Self'
    } else {
      this.quotationService.getAssuredRelToOwner(this.clientDetails.clientNo, num).subscribe( data => {
        //console.log(data)
        this.nokRel = data.relationship
      }) 
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
  }
}
