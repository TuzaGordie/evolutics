import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QuotationService } from 'src/app/General/services/quotation-service.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NumberValueAccessor,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { UtilityService } from 'src/app/Services/utility.service';

declare let $;
@Component({
  selector: 'q-motor-third-party',
  templateUrl: './motor-third-party.component.html',
  styleUrls: ['./motor-third-party.component.scss'],
})
export class MotorThirdPartyComponent {
  @Output() saveEvent = new EventEmitter<string>();
  faSave = faSave;
  thirdPartyForm: FormGroup;
  code: string;
  excess_display: string | number = '';
  deductible_display: string | number = '';
  excess: any = { code: '' };
  deductible: any = { code: '' };
  excess_disabled: boolean = true;
  deductible_disabled: boolean = true;
  excess_min = null;
  deductible_min = null;
  excess_max = null;
  deductible_max = null;
  complete = null;
  mvAdj = null;
  description: string = '';
  assured: string = '';
  assured_min: string = '';
  assured_max: string = '';
  assured_options: string[] = [];
  assured_value_disabled = false;
  excess_type: string = 'number';
  excess_options: any[];
  excessAmount: string | number;
  excessRate: string | number;
  deductible_type: string = 'number';
  deductible_options: any[];
  deductibleAmount: string | number;
  deductibleRate: string | number;

  constructor(
    private quotationService: QuotationService,
    private fb: FormBuilder,
    private us: UtilityService
  ) {}
  ngOnInit(): void {
    this.thirdPartyForm = this.fb.group({
      limit: new FormControl(null, Validators.required),
      slimit: new FormControl(null, Validators.required),
      value: new FormControl(null, Validators.required),
      excess: new FormControl(this.excess_display, Validators.required),
      excessAmount: new FormControl(this.excessAmount, Validators.required),
      excessRate: new FormControl(this.excessRate, Validators.required),
      excessOptAmount: new FormControl(null, Validators.required),
      excessOptRate: new FormControl(null, Validators.required),
      deductible: new FormControl(this.deductible_display, Validators.required),
      deductibleAmount: new FormControl(
        this.deductibleAmount,
        Validators.required
      ),
      deductibleRate: new FormControl(this.deductibleRate, Validators.required),
      deductibleOptAmount: new FormControl(null, Validators.required),
      deductibleOptRate: new FormControl(null, Validators.required),
    });
  }

  show() {
    $('#tp_modal').modal('show');
    if (!((this.excess_max && this.excess_min) || this.excess_display))
      this.thirdPartyForm.patchValue({ excess: '0' });
    if (
      !((this.deductible_max && this.deductible_min) || this.deductible_display)
    )
      this.thirdPartyForm.patchValue({ deductible: '0' });
  }
  hide() {
    $('#tp_modal').modal('hide');
    this.saveEvent.emit(this.complete);
  }
  ngOnDestroy(): void {
    $('#tp_modal').modal('hide');
  }
  stop() {
    let excess = this.excessAmount;
    let deductible = this.deductibleAmount;
    let limit = this.thirdPartyForm.get('limit').value;
    if (this.excess_max || this.excess_min) {
      if (excess) {
        if (
          !(
            Number(excess) <= Number(this.excess_max) &&
            Number(excess) >= Number(this.excess_min)
          )
        ) {
          this.us.notify('Your excess value is in the wrong range.', 0);
          return false;
        }
      } else if (!excess) {
        this.us.notify('The excess value is required.', 0);
        return false;
      }
    }
    if (this.deductible_max || this.deductible_min) {
      if (deductible) {
        if (
          !(
            Number(deductible) <= Number(this.deductible_max) &&
            Number(deductible) >= Number(this.deductible_min)
          )
        ) {
          this.us.notify('Your deductible value is in the wrong range.', 0);
          return false;
        }
      } else if (!deductible) {
        this.us.notify('The deductible value is required.', 0);
        return false;
      }
    }
    if (this.assured_max || this.assured_min) {
      if (limit) {
        if (
          !(
            Number(limit) <= Number(this.assured_max) &&
            Number(limit) >= Number(this.assured_min)
          )
        ) {
          this.us.notify('Your limit value is in the wrong range.', 0);
          return false;
        }
      } else if (!limit) {
        this.us.notify('The limit value is required.', 0);
        return false;
      }
    }

    this.hide();
    return true;
  }
  onDeductibleAmountChange(deductibleAmount) {
    this.deductibleAmount = deductibleAmount;
    this.thirdPartyForm.patchValue({
      deductibleAmount,
    });
  }

  onDeductibleRateChange(deductibleRate) {
    this.deductibleRate = deductibleRate;
    this.thirdPartyForm.patchValue({
      deductibleRate,
    });
  }

  onExcessAmountChange(excessAmount) {
    this.excessAmount = excessAmount;
    this.thirdPartyForm.patchValue({
      excessAmount,
    });
  }

  onExcessRateChange(excessRate) {
    this.excessRate = excessRate;
    this.thirdPartyForm.patchValue({
      excessRate,
    });
  }
}
