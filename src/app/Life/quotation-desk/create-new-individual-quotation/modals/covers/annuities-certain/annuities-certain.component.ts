import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { IndividualAgentService } from 'src/app/Life/agent-desk/new-individual-agent/services/individual-agent.service';
import { CreateAccountModalComponent } from 'src/app/Life/life-components/create-account-modal/create-account-modal.component';
import { QuotationService } from 'src/app/Life/services/quotation-service.service';
import { ICodes } from 'src/app/Life/services/quotation.interface';
import { UtilityService } from 'src/app/Services/utility.service';
declare let $;
@Component({
  selector: 'q-annuities-certain',
  templateUrl: './annuities-certain.component.html',
  styleUrls: ['./annuities-certain.component.scss']
})
export class AnnuitiesCertainComponent implements OnInit {
  @Output() saveEvent = new EventEmitter<string>();
  lifeForm: FormGroup
  benefitPaymentFreqOptions$ = this.quoatationService.getBenefitPaymentFreqOptions()
  complete = null
  assured = null
  assured_disabled = null
  assured_max = null
  assured_min = null
  description: string = ''
  basis_options: ICodes[] = []
  payees: FormArray
  payee: string[] = [''];
  payee_no: string[] = []
  payee_name: string[] = []
  existingAccounts: any[] = []
  loadingAccounts: boolean;
  newBankDetails: any[] = [];
  annutiy_escal_basis_options: ICodes[] = []
  annuity_escalation_value_options: any[] = []
  annuity_term_options: any[] = []
  annuity_frequency_options: any[] = []
  payment_options: any[] = []

  constructor(private quoatationService: QuotationService, private fb: FormBuilder, private us: UtilityService, public individualService: IndividualAgentService) { }

  ngOnInit(): void {
    this.quoatationService.getCodesBySubGroup('TARGET_BASIS').subscribe( data => this.basis_options = data )
    this.quoatationService.getCodesBySubGroup('ANNUITY_ESCAL_BASIS').subscribe( data => this.annutiy_escal_basis_options = data )
    this.payees = this.fb.array([
      new FormGroup ({
        method: new FormControl(null, Validators.required),
        payee: new FormControl(null, Validators.required),
        payee_no: new FormControl(null, Validators.required),
        payee_proportion: new FormControl(100, [Validators.required, Validators.max(100), Validators.min(1)]),
      })
    ])
    this.lifeForm = this.fb.group({
      basis: new FormControl(null, Validators.required),
      target: new FormControl(null, Validators.required),
      annFreq: new FormControl(null, Validators.required),
      escBasis: new FormControl(null, Validators.required),
      escValue: new FormControl(null, Validators.required),
      schedule: new FormControl(null, Validators.required),
      premTerm: new FormControl(null, Validators.required),
      premMonths: new FormControl(null, Validators.required),
      loanTerm: new FormControl(null, Validators.required),
      loanMonths: new FormControl(null, Validators.required),
      term: new FormControl(null, Validators.required),
      method: new FormControl(null, Validators.required),
      payees: this.payees
    })
  }
  payeeUpdate(i) {
    this.payee_no[i] = this.lifeForm.get('payees').value[i].payee_no
    console.log(this.payee_no)
    if (this.payee_no[i] == ''){
      this.existingAccounts[i] = []
    } else {
      this.quoatationService.getClientFullName(this.payee_no[i]).subscribe( data => {
        this.lifeForm.patchValue({payee: data})
        const payees = <FormArray> this.lifeForm.get('payees')
        payees.controls[i].get('payee').setValue(data)
      } )
      this.quoatationService.getBankAccounts(this.payee_no[i]).subscribe( data => {
        console.log(data)
        this.existingAccounts[i] = data
      })
    }
  }
  payeeInc() {
    const value = 100/(this.payees.length + 1)
    const b = new FormGroup({
      method: new FormControl(null, Validators.required),
      payee: new FormControl(null, Validators.required),
      payee_no: new FormControl(null, Validators.required),
      payee_proportion: new FormControl(value, [Validators.required, Validators.max(100), Validators.min(1)]),
    })
    const payees = <FormArray> this.lifeForm.get('payees')
    for (let i = 0; i < this.payees.length; i++) {
      payees.controls[i].get('payee_proportion').setValue(value)
    }
    
    this.payee.push('')
    this.payee_name.push('')
    this.existingAccounts.push([])
    this.payees.push(b)
    console.log(value)
  }
  removePayee(i) {
    if(this.payees.length > 1){
      this.payees.removeAt(i)
      this.payee.splice(i, 1)
      this.payee_name.splice(i, 1)
      this.existingAccounts.splice(i, 1)

      const value = 100/(this.payees.length)
      const payees = <FormArray> this.lifeForm.get('payees')
      for (let i = 0; i < this.payees.length; i++) {
        payees.controls[i].get('payee_proportion').setValue(value)
      }
    }
  }
  getClientAccounts = () => {
    this.loadingAccounts = true;
    this.payee_no.forEach((no, index) => {
      this.individualService
      .getClientBankAccounts(no)
      .toPromise()
      .then((res) => {
        this.newBankDetails[index] = res;
        console.log('newBankDetails', this.newBankDetails[index]);
        this.loadingAccounts = false;
      });

    })
  };
  openCreateAccount() {
    this.us.dialogOpener(
      CreateAccountModalComponent,
      {
        data: { clientNo: this.payee_no },
        minWidth: '70%',
        minHeight: '80%',
        maxHeight: '90%',
      },
      () => {
        this.getClientAccounts();
      }
    )
  }
  show() {
    console.log('hi')
    $('#ac_modal').modal('show')
  }
  hide() {
    $('#ac_modal').modal('hide')
  }
  ngOnDestroy(): void {
    $('#ac_modal').modal('hide')
  }
  stop() {
    this.hide()
    this.saveEvent.emit(this.complete)
  }
}
