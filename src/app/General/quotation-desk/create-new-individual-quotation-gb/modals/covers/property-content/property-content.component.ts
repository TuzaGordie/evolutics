import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QuotationService } from 'src/app/General/services/quotation-service.service';
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

declare let $;
@Component({
  selector: 'q-property-content',
  templateUrl: './property-content.component.html',
  styleUrls: ['./property-content.component.scss'],
})
export class PropertyContentComponent {
  @Output() saveEvent = new EventEmitter<string>();
  propertyForm: FormGroup;
  contentCatOptions$ = this.quoatationService.getContentCatOptions();
  excess_display: string | number = '';
  deductible_display: string | number = '';
  excess: any = { code: '' };
  deductible: any = { code: '' };
  excess_disabled: boolean = false;
  deductible_disabled: boolean = false;
  excess_min = null;
  deductible_min = null;
  excess_max = null;
  deductible_max = null;
  complete = null;
  description: string = '';
  excess_type: string = 'number';
  excess_options: any[] = [];
  excessAmount: string | number | Event;
  excessRate: string | number | Event;
  deductible_type: string = 'number';
  deductible_options: any[] = [];
  deductibleAmount: string | number | Event;
  deductibleRate: string | number | Event;

  constructor(
    private quoatationService: QuotationService,
    private fb: FormBuilder,
    private us: UtilityService
  ) {}
  ngOnInit(): void {
    this.propertyForm = this.fb.group({
      category: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      purValue: new FormControl(null, Validators.required),
      marValue: new FormControl(null, Validators.required),
      count: new FormControl(null, Validators.required),
      year: new FormControl(null, Validators.required),
      excess: new FormControl(null, Validators.required),
      excessAmount: new FormControl(this.excessAmount, Validators.required),
      excessRate: new FormControl(this.excessRate, Validators.required),
      excessOptAmount: new FormControl(null, Validators.required),
      excessOptRate: new FormControl(null, Validators.required),
      deductible: new FormControl(null, Validators.required),
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
    $('#pc_modal').modal('show');
  }
  hide() {
    $('#pc_modal').modal('hide');
    this.saveEvent.emit(this.complete);
  }
  ngOnDestroy(): void {
    $('#pc_modal').modal('hide');
  }
  stop() {
    if (this.excess_max || this.excess_min) {
      let excess = this.excessAmount;
      if (excess) {
        if (
          !(
            Number(excess) <= Number(this.excess_max) &&
            Number(excess) >= Number(this.excess_min)
          )
        ) {
          this.us.notify('Your excess value is in the wrong range.', 0);
          return;
        }
      } else {
        this.us.notify('Excess value is required.', 0);
        return;
      }
    }
    if (this.deductible_max || this.deductible_min) {
      let deductible = this.deductibleAmount;

      if (deductible) {
        if (
          !(
            Number(deductible) <= Number(this.deductible_max) &&
            Number(deductible) >= Number(this.deductible_min)
          )
        ) {
          this.us.notify('Your deductible value is in the wrong range.', 0);
          return;
        }
      } else {
        this.us.notify('Deductible value is required.', 0);
        return;
      }
    }

    this.hide();
  }

  onDeductibleAmountChange(deductibleAmount) {
    this.deductibleAmount = deductibleAmount;
    this.propertyForm.patchValue({
      deductibleAmount,
    });
  }

  onDeductibleRateChange(deductibleRate) {
    this.deductibleRate = deductibleRate;
    this.propertyForm.patchValue({
      deductibleRate,
    });
  }

  onExcessAmountChange(excessAmount) {
    this.excessAmount = excessAmount;
    this.propertyForm.patchValue({
      excessAmount,
    });
  }

  onExcessRateChange(excessRate) {
    this.excessRate = excessRate;
    this.propertyForm.patchValue({
      excessRate,
    });
  }
}
