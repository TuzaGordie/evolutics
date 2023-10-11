import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FCInput } from '../../models/index.model';
import { OptionLabelType } from './input-basic.component';
import { InputService } from './input.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
   @Input() translateOptions: boolean=false;
  @Input('input') inp: FCInput;
  @Input() accept: string;
  @Input() autocomplete: boolean = true;
  @Input() cls?: string;
  @Input() colored: boolean = true;
  @Input() disabled: boolean;
  @Input() files: File[];
  @Input() hint: string;
  @Input() id: string = 'id' + Math.round(Math.random() * 10000);
  @Input() inpCl: string = 'control-bg-gray';
  @Input() labelField: string;
  @Input() labelType: OptionLabelType;
  @Input() lblCl: string = '2';
  @Input() light: boolean = true;
  @Input() loading: boolean;
  @Input() max: number;
  @Input() min: number;
  @Input() mini: boolean;
  @Input() multiple: boolean;
  @Input() optionFormatter: (item: any) => string;
  @Input() options: any[];
  @Input() readonly: boolean;
  @Input() showEmptyOption?: boolean = true;
  @Input() showLabel: boolean = true;
  @Input() showValidation: boolean = false;
  @Input() showValidationIcon: boolean = true;
  @Input() small: boolean;
  @Input() stacked: boolean;
  @Input() theme: InputTheme = 1;
  @Input() valueField: string;
  @Input() xsmall: boolean;
  @Output() mchange = new EventEmitter();
  showPassword: boolean;
  __value: any;
  @Input('value') set _value(v: any) {
    this.__value = v;
  }
  constructor(public iS: InputService) {}

  ngOnInit(): void {}

  change(e) {
    this.mchange.emit(e);
  }
  get control() {
    return this.inp?.form?.controls[this.inp?.name];
  }
  get valid() {
    return this.control.valid && this.control.dirty;
  }
  get invalid() {
    return this.control.invalid && this.control.dirty;
  }
  get form() {
    return this.inp?.form;
  }
  get label() {
    return this.inp?.label;
  }
  get name() {
    return this.inp?.name;
  }
  get placeholder() {
    return this.inp?.placeholder;
  }
  get required() {
    return this.inp?.required;
  }
  get type() {
    return this.inp?.type;
  }
  get isRequired() {
    return this.required || this.control?.hasValidator(Validators.required);
  }
  upload(e) {
    this.files = e.target.files;
    this.mchange.emit(e);
  }
  get value() {
    return this.control?.value;
  }
  get invalidCheckbox() {
    return this.invalid && this.type == 'checkbox';
  }
  log() {
    if (environment.production) console.log(this.form);
  }
}
type InputTheme = 1 | 2;
