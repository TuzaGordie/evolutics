import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { configValidationMessages } from 'src/app/configs/validation-messages.config';
import {
  EValidationType,
  IValidationMessage,
} from 'src/app/Shared/models/index.model';
import { InputBasicComponent } from '../input-basic.component';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss'],
})
export class ValidationMessageComponent implements OnInit {
  validationType: EValidationType;
  @Input('validationKey') set _validationKey(v: EValidationType) {
    this.validationType = v;
    this.validations = configValidationMessages[this.validationType];
  }
  @Input('control') _control: AbstractControl;
  @Input() input: InputBasicComponent;
  @Input('label') _label: string;
  @Input() minLength: number;
  @Input() maxLength: number;
  @Input() customMessage: 'Value is invalid';
  validations: IValidationMessage[];
  constructor() {}

  ngOnInit(): void {
    if (!this.validationType) this._validationKey = EValidationType.normal;
  }
  get label() {
    return this._label || this.input?.label;
  }
  get control() {
    return this._control || this.input?.control;
  }
}

@Pipe({ name: 'errorMessage' })
export class ErrorMessagePipe implements PipeTransform {
  transform(
    errObj: IValidationMessage,
    label?: string,
    maxLength?: number,
    minLength?: number,
    controlMessage?: any
  ): string {
    let msg =
      errObj.type == EValidationType.custom
        ? controlMessage
        : errObj.message
        ? errObj.message.startsWith(' ')
          ? (label || 'Field') + errObj.message
          : errObj.message
        : null;
    msg = msg?.replace('{{maxLength}}', maxLength?.toString());
    msg = msg?.replace('{{minLength}}', minLength?.toString());
    return msg;
  }
}
