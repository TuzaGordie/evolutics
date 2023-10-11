import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { InputBasicComponent } from './input-basic.component';
import { InputService } from './input.service';

@Component({
  selector: 'app-input-td-rf', //template driven to reactive form
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputTD_RFComponent extends InputBasicComponent {
  validators: ValidatorFn[];
  @Input('validators') set _validators(v: ValidatorFn[]) {
    this.control?.removeValidators(this.validators);
    this.validators = v;
    this.control?.setValidators(v);
    this.control?.updateValueAndValidity();
  }

  asyncValidators: AsyncValidatorFn[];
  @Input('asyncValidators') set _asyncValidators(v: AsyncValidatorFn[]) {
    this.control?.removeValidators(this.asyncValidators);
    this.asyncValidators = v;
    this.control?.setValidators(v);
    this.control?.updateValueAndValidity();
  }

  private model: any;
  @Input('model') set _model(v: any) {
    if (v == this.model) return;
    this.model = v;
    if (this.debug) debugger;
    this.control?.enable();
    this.control?.patchValue(v);
    if (this.disabled) this.control?.disable();
  }
  @Output() modelChange = new EventEmitter();

  constructor(public iS: InputService) {
    super(iS);
    this.name = 'item';
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.form = new FormGroup({
      item: new FormControl(this.model, this.validators, this.asyncValidators),
    });
    this.disableControl();
    this.control?.valueChanges.subscribe((r) => {
      this.modelChange.emit(r);
      this.disableControl();
    });
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
  }
  get invalid() {
    return this.control?.invalid;
  }
}
