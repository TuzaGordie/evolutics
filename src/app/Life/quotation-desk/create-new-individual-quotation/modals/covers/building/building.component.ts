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
import { QuotationService } from 'src/app/Life/services/quotation-service.service';
import { UtilityService } from 'src/app/Services/utility.service';
declare let $;
@Component({
  selector: 'q-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss'],
})
export class BuildingComponent implements OnInit {
  @Output() saveEvent = new EventEmitter<string>();
  buildingForm: FormGroup;
  code: string;
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
  excessAmount: string | number;
  excessRate: string | number;
  deductible_type: string = 'number';
  deductible_options: any[] = [];
  deductibleAmount: string | number;
  deductibleRate: string | number;

  constructor(
    private quoatationService: QuotationService,
    private fb: FormBuilder,
    private us: UtilityService
  ) {}

  ngOnInit(): void {
    this.buildingForm = this.fb.group({
      limit: new FormControl(null, Validators.required),
      value: new FormControl(null, Validators.required),
      rental: new FormControl(null, Validators.required),
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
    $('#bl_modal').modal('show');
  }
  hide() {
    $('#bl_modal').modal('hide');
    this.saveEvent.emit(this.complete);
  }
  ngOnDestroy(): void {
    $('#bl_modal').modal('hide');
  }
  stop() {
    if (
      this.excess_max ||
      this.excess_min ||
      this.deductible_max ||
      this.deductible_min
    ) {
      let excess = this.buildingForm.get('excess').value;
      let deductible = this.buildingForm.get('deductible').value;
      if (excess && deductible) {
        console.log(Number(excess));
        if (
          Number(excess) <= Number(this.excess_max) &&
          Number(excess) >= Number(this.excess_min) &&
          Number(deductible) <= Number(this.deductible_max) &&
          Number(excess) >= Number(this.deductible_min)
        ) {
          this.hide();
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
      this.hide();
    }
  }

  setField(event, fieldName, field) {
    this.buildingForm.patchValue({
      [fieldName]: field.value,
    });
  }
}
