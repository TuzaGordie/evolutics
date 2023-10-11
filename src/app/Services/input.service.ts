import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { IFormSchema } from '../Shared/models/form-schema.model';
import { FCInput } from '../Shared/models/index.model';

@Injectable({
  providedIn: 'root',
})
export class InputService {
  constructor() {}
  formFieldsFromFCInputsArr(inputs: FCInput[]) {
    const controls: {
      [key: string]: AbstractControl;
    } = {};
    for (const inp of inputs) {
      controls[inp.name] = inp.formControl;
    }

    return controls;
  }
  formSchemaToFormControls(inputs: IFormSchema[]) {
    const controls: {
      [key: string]: AbstractControl;
    } = {};
    for (const inp of inputs) {
      controls[inp.field] = new FormControl(
        inp.value,
        inp.validators?.map((v) => v.bind(this)),
        inp.asyncValidators?.map((v) => v.bind(this))
      );
    }

    return controls;
  }
  formFieldsFromObj(obj: any) {
    const controls: {
      [key: string]: AbstractControl;
    } = {};
    for (const inp in obj) {
      controls[inp] = new FormControl(obj[inp]);
    }

    return controls;
  }

  bindFormControlToInputs = (inputs: FCInput[], form: FormGroup) => {
    inputs.forEach((x) => {
      x.form = form;
      x.formControl = form.controls[x.name];
    });
  };
}
