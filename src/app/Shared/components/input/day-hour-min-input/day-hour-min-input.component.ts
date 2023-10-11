import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';
import { InputType } from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import { InputBasicComponent } from '../input-basic.component';
import { InputService } from '../input.service';

@Component({
  selector: 'app-day-hour-min-input',
  templateUrl: './day-hour-min-input.component.html',
  styleUrls: ['./day-hour-min-input.component.scss'],
})
export class DayHourMinInputComponent extends InputBasicComponent {
  // @Input() format: 'hm' | 'm' | 'dhm' = 'hm';
  subForm = new FormGroup(
    {
      days: new FormControl(null),
      hours: new FormControl(null),
      mins: new FormControl(null),
    },
    this.validateFromParent.bind(this)
  );

  constructor(public iS: InputService, public uS: UtilityService) {
    super(iS);
    this.showLabel = false;
  }

  ngOnInit() {
    this.type = this.type || 'number';
    let allowSync = true;
    this.control?.valueChanges.subscribe((r) => {
      if (allowSync) this.subForm?.patchValue(this.uS.minutesToDayHourMin(+r));
      if (this.control?.disabled && this.subForm?.enabled) {
        this.subForm?.disable();
      } else if (this.control?.enabled && this.subForm?.disabled) {
        this.subForm.enable();
      }
    });
    this.control?.statusChanges.subscribe((r) => {
      this.subForm?.get('days').setErrors(this.control?.errors);
      this.subForm?.get('hours').setErrors(this.control?.errors);
      this.subForm?.get('mins').setErrors(this.control?.errors);
    });
    // this.subForm?.get('days').markAsDirty();
    // this.subForm?.get('hours').markAsDirty();
    // this.subForm?.get('mins').markAsDirty();
    this.subForm?.valueChanges.subscribe((r) => {
      if (this.control?.pristine) this.control?.markAsDirty();
      if (!this.control?.disabled) {
        allowSync = false;
        const time = this.uS.dayHourMinToHourMinutes(
          r?.days,
          r?.hours,
          r?.mins
        );
        this.control?.patchValue(time == '00:00' ? null : time);
        // this.isParentValid();
        allowSync = true;
      }
    });
  }

  // async isParentValid() {
  //   return new Promise((res) => {
  //     if (this.subForm?.pristine) res(null);
  //     else {
  //       setTimeout(() => {
  //         this.subForm?.get('days').setErrors(this.control?.errors);
  //         this.subForm?.get('hours').setErrors(this.control?.errors);
  //         this.subForm?.get('mins').setErrors(this.control?.errors);
  //         const err = this.control?.errors;
  //         res(err);
  //       }, 100);
  //     }
  //   });
  // }
  validateFromParent(form: FormGroup) {
    // debugger
    const controls: { [x: string]: AbstractControl } = {
      days: form.get('days'),
      hours: form.get('hours'),
      mins: form.get('mins'),
    };
    if (controls.days.value || controls.hours.value || controls.mins.value) {
      controls.days.markAsDirty();
      controls.hours.markAsDirty();
      controls.mins.markAsDirty();
    }
    // form?.get('days').markAsDirty();
    form?.get('days').setErrors(this.control?.errors);
    // form?.get('hours').markAsDirty();
    form?.get('hours').setErrors(this.control?.errors);
    // form?.get('mins').markAsDirty();
    form?.get('mins').setErrors(this.control?.errors);
    // return this.control?.errors;
  }
 
}
