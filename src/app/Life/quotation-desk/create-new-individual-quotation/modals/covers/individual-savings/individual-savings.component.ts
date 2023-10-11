import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QuotationService } from 'src/app/Life/services/quotation-service.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';
import { ICodes } from 'src/app/Life/services/quotation.interface';
declare let $;
@Component({
  selector: 'q-individual-savings',
  templateUrl: './individual-savings.component.html',
  styleUrls: ['./individual-savings.component.scss'],
})
export class IndividualSavingsComponent implements OnInit {
  @Output() saveEvent = new EventEmitter<string>();
  savingsForm: FormGroup;
  benefitPaymentFreqOptions$ =
    this.quoatationService.getBenefitPaymentFreqOptions();
  complete = null;
  assured = null;
  conmonmax = null;
  conyearmax = null;
  assured_disabled = null;
  assured_max = null;
  assured_min = null;
  description: string = '';
  payees: FormArray;
  payee: string[] = [''];
  payee_no: string[] = [];
  payee_name: string[] = [];
  existingAccounts: any[] = [];
  basis_options: ICodes[] = [];
  defaultPremFreq: any;
  freq_options: any[] = [];

  constructor(
    private quoatationService: QuotationService,
    private fb: FormBuilder,
    private us: UtilityService
  ) {}

  ngOnInit(): void {
    this.quoatationService
      .getCodesBySubGroup('TARGET_BASIS')
      .subscribe((data) => (this.basis_options = data));
    this.quoatationService
      .getCodesBySubGroup('FREQUENCY')
      .subscribe((data) => (this.freq_options = data));
    this.savingsForm = this.fb.group({
      basis: new FormControl('PB', Validators.required),
      target_frequency: new FormControl(null, Validators.required),
      deposit: new FormControl(null, Validators.required),
      target_amount: new FormControl(null, Validators.required),
      convert: new FormControl(null, Validators.required),
      premMonths: new FormControl(null, Validators.required),
      conTerm: new FormControl(null, Validators.required),
      conMonths: new FormControl(null, Validators.required),
      conDays: new FormControl(null, Validators.required),
      benSchedule: new FormControl(null, Validators.required),
    });
  }

  show() {
    $('#is_modal').modal('show');
  }
  hide() {
    $('#is_modal').modal('hide');
  }
  ngOnDestroy(): void {
    $('#is_modal').modal('hide');
  }
  stop() {
    this.hide();
    this.saveEvent.emit(this.complete);
  }
}
