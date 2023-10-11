import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { QuotationService } from 'src/app/General/services/quotation-service.service';
import { UtilityService } from 'src/app/Services/utility.service';
declare let $;
@Component({
  selector: 'q-defense-recourse',
  templateUrl: './defense-recourse.component.html',
  styleUrls: ['./defense-recourse.component.scss'],
})
export class DefenseRecourseComponent implements OnInit {
  @Output() saveEvent = new EventEmitter<string>();
  sumAssuredBasisOptions$ = this.quoatationService.getAssuredBasisOptions();
  sumAssuredMultipleOptions$ =
    this.quoatationService.getAssuredMultipleOptions();
  defenseForm: FormGroup;
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
    this.defenseForm = this.fb.group({
      basis: new FormControl(null, Validators.required),
      assured: new FormControl(null, Validators.required),
      multiple: new FormControl(null, Validators.required),
      excess: new FormControl(null, Validators.required),
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
    console.log('hi');
    $('#dr_modal').modal('show');
  }
  hide() {
    $('#dr_modal').modal('hide');
    this.saveEvent.emit(this.complete);
  }
  ngOnDestroy(): void {
    $('#dr_modal').modal('hide');
  }
  stop() {
    if (
      this.excess_max ||
      this.excess_min ||
      this.deductible_max ||
      this.deductible_min
    ) {
      let excess = this.excessAmount;
      let deductible = this.deductibleAmount;
      if (excess && deductible) {
        console.log(Number(excess));
        if (
          Number(excess) <= Number(this.excess_max) &&
          Number(excess) >= Number(this.excess_min) &&
          Number(deductible) <= Number(this.deductible_max) &&
          Number(excess) >= Number(this.deductible_min)
        ) {
          console.log('success is assured');
          this.hide();
        } else {
          this.us.notify(
            'Your excess or deductible value is in the wrong range.',
            0
          );
        }
      } else {
        console.log(excess);
        this.us.notify('Both excess and deductible values are required.', 0);
      }
    } else {
      this.hide();
    }
  }

  onDeductibleAmountChange(deductibleAmount) {
    this.deductibleAmount = deductibleAmount;
    this.defenseForm.patchValue({
      deductibleAmount,
    });
  }

  onDeductibleRateChange(deductibleRate) {
    this.deductibleRate = deductibleRate;
    this.defenseForm.patchValue({
      deductibleRate,
    });
  }

  onExcessAmountChange(excessAmount) {
    this.excessAmount = excessAmount;
    this.defenseForm.patchValue({
      excessAmount,
    });
  }

  onExcessRateChange(excessRate) {
    this.excessRate = excessRate;
    this.defenseForm.patchValue({
      excessRate,
    });
  }
}
