import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InputType, IValidationMessage } from '../../models/index.model';
import { InputService } from './input.service';

@Component({
  selector: 'app-input-basic',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputBasicComponent implements OnInit {
  @Input() accept: string;
  @Input() autocomplete: boolean = true;
  @Input() clearOnDisable: boolean = true;
  @Input() cls: string;
  @Input() colored: boolean = true;
  @Input() contextData: any;
  @Input() debug: boolean;
  @Input() decimalPoints: number;
  @Input() files: File[];
  @Input() form: any;
  @Input() hide: boolean;
  @Input() hint: string;
  @Input() id: string = 'id' + Math.round(Math.random() * 10000);
  @Input() inpCl: string = 'control-bg-gray';
  @Input() label: string;
  @Input() labelField: string;
  @Input() labelType: OptionLabelType; //use this to pick a preset value label group for the options
  @Input() lblCl: string = '2';
  @Input() light: boolean = true;
  @Input() loading: boolean;
  @Input() max: number;
  @Input() mformControl: AbstractControl;
  @Input() min: number;
  @Input() mini: boolean;
  @Input() multiple: boolean;
  @Input() name: string;
  @Input() optionFormatter: (item: any) => string;
  @Input() placeholder: string;
  @Input() prefix: string;
  @Input() readonly: boolean;
  @Input() required?: boolean;
  @Input() showEmptyOption?: boolean = true;
  @Input() showLabel: boolean = true;
  @Input() showValidation: boolean = false;
  @Input() showValidationIcon: boolean;
  @Input() small: boolean;
  @Input() stacked: boolean;
  @Input() suffix: string;
  @Input() theme: InputTheme = 1;
  @Input() translateOptions: boolean = false;
  @Input() valueField: string; //use this to choose a field in the option for modeling
  @Input() vms: IValidationMessage[];
  @Input() xsmall: boolean;
  @Output() mchange = new EventEmitter();
  @Output() mContextChange = new EventEmitter();
  disabled: boolean;
  options: IOption[];
  options$ = new EventEmitter<IOption[]>();
  rawOptions: any[];
  showPassword: boolean;
  type: InputType;
  viewInited: boolean;
  forcePatched: boolean;
  @Input('disabled') set _disabled(v: boolean) {
    this.disabled = v;
    if (v) {
      if (this.debug) debugger;
      if (this.clearOnDisable) this.control?.reset();
      this.control?.disable();
    } else {
      this.control?.enable();
    }
  }
  @Input() customSelectChangeAction: (
    val: string | number,
    options: any[]
  ) => any;
  @Input('options') set _options(v: any[]) {
    // debugger
    this.options = this.iS.optionsFormatter(
      v,
      this.valueField,
      this.optionFormatter,
      this.labelType,
      this.labelField
    );
    this.rawOptions = v;

    this.options$.emit(this.options);
  }
  @Input('type') set _type(v: InputType) {
    this.type = v;
    if (this.forcePatched) {
      this.control.reset();
      this.forcePatched = false;
    }
    if (v == 'checkbox' && (this.value == null || this.value == undefined)) {
      this.control?.patchValue(false);
      this.forcePatched = true;
    }
  }
  __value: string | number;
  @Input('mvalue') set _value(v: string | number) {
    this.__value = v;
  }
  @ViewChild('inp') inpTag: ElementRef<HTMLInputElement>;
  constructor(public iS: InputService) {}

  ngOnInit(): void {
    // if (this.disabled) this._disabled = this.disabled;
  }
  ngAfterViewInit(): void {
    // this.viewInited = true;
  }
  disableControl(control: AbstractControl = this.control) {
    if (!this.disabled) return;
    control?.disable({ emitEvent: false });
  }
  get isRequired() {
    return this.required || this.control?.hasValidator(Validators.required);
  }
  change(e) {
    let val = e;
    if (this.type == 'checkbox') {
      val = e.target.checked;
    } else {
      val = e.target.value;
    }
    if (this.type == 'number') {
      if (this.max && +val > this.max) {
        this.control.setValue(this.max);
      } else if (this.min != null && this.min != undefined && +val < this.min) {
        this.control.setValue(this.min);
      }
      if (this.decimalPoints != undefined && this.decimalPoints != null)
        this.control.setValue((+val).toFixed(this.decimalPoints));
    }
    this.mchange.emit(this.control.value);
    if (this.customSelectChangeAction) {
      this.mContextChange.emit(
        this.customSelectChangeAction(this.control.value, this.options)
      );
    }
  }
  get control(): AbstractControl {
    return this.mformControl || this.form?.controls[this.name];
  }
  get valid() {
    return this.control?.valid && this.control?.dirty;
  }
  get invalid() {
    return this.control?.invalid && this.control?.dirty;
  }
  get value() {
    return this.control?.value;
  }
  get hasValue() {
    return !!this.control?.value?.toString()?.trim();
  }
  get invalidCheckbox() {
    return this.invalid && this.type == 'checkbox';
  }
  upload(e) {
    this.files = e.target.files;
    this.mchange.emit(e);
  }
}
type InputTheme = 1 | 2;
export type OptionLabelType =
  | 'cd'
  | 'cdt'
  | 'cf'
  | 'cmd'
  | 'cn'
  | 'ct'
  | 'gd'
  | 'ha'
  | 'id'
  | 'if'
  | 'ifl'
  | 'it'
  | 'nf'
  | 'td'
  | 'uf'
  | 'ud'
  | 'md';
export interface IOption {
  value: any;
  label: string;
}
