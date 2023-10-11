import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { InputType } from '../../models/index.model';
import { IOption } from '../input/input-basic.component';
import { InputService } from '../input/input.service';

@Component({
  selector: 'app-input-ngmodel',
  templateUrl: './input-ngmodel.component.html',
  styleUrls: ['./input-ngmodel.component.scss'],
})
export class InputNGModelComponent implements OnInit {
  __value: string | number;
  @Input('mvalue') set _value(v: string | number) {
    this.__value = v;
  }
  @Input() cls?: string;
  @Input() colored: boolean = true;
  @Input() disabled: boolean;
  @Input() hide: boolean;
  @Input() hint: string;
  @Input() id: string = 'id' + Math.round(Math.random() * 10000);
  @Input() inpCl: string = 'control-bg-gray';
  @Input() label: string;
  @Input() lblCl: string = '2';
  @Input() lblPosition: 'left' | 'right';
  @Input() mini: boolean;
  @Input() light: boolean = true;
  @Input() name: string;
  @Input() model: any;

  @Output() modelChange = new EventEmitter();
  @Input() optionFormatter: (item: any) => string;
  options: IOption[];
  options$ = new EventEmitter<IOption[]>();
  @Input('options') set _options(v: any[]) {
    this.options = this.iS.optionsFormatter(
      v,
      this.valueField,
      this.optionFormatter,
      this.labelType,
      this.labelField
    );
    this.options.sort2('value').sort2('value', true);

    this.options$.emit(this.options);
  }
  @Input() checked?: boolean;
  @Input() contextData: any;
  @Input() decimalPoints: number;
  @Input() labelField: string;
  @Input() max: number;
  @Input() min: number;
  @Input() placeholder: string;
  @Input() prefix: string;
  @Input() readonly: boolean;
  @Input() required?: boolean;
  @Input() showEmptyOption?: boolean = true;
  @Input() showLabel: boolean = true;
  @Input() showValidation: boolean;
  @Input() showValidationIcon: boolean = true;
  @Input() small: boolean;
  @Input() stacked: boolean;
  @Input() suffix: string;
  @Input() theme: InputTheme = 1;
  @Input() type: InputType;
  @Input() valueField: string; //use this to choose a field in the option for modeling
  @Input() labelType: ValueType; //use this to pick a preset value label group for the options
  @Input() xsmall: boolean;
  showPassword:boolean
  @Output() mchange = new EventEmitter();
  value: any;
  @ViewChild('labelEl') labelRef: ElementRef<HTMLLabelElement>;
  constructor(public iS: InputService) {}

  ngOnInit(): void {}
  change(e) {
    let val = e;
    if (this.type == 'checkbox') {
      val = e.target.checked;
    } else {
      val = e.target.value;
    }
    if (this.type == 'number') {
      if (this.max && +val > this.max) {
        this.model=(this.max);
      } else if (this.min != null && this.min != undefined && +val < this.min) {
        this.model=(this.min);
      }
      if (this.decimalPoints != undefined && this.decimalPoints != null)
      this.model=((+val).toFixed(this.decimalPoints));
    }
    this.value = val;
    this.mchange.emit(val);
    this.modelChange.emit(val);
  }
  upload(e) {
    this.mchange.emit(e);
  }
  log() {
    if (!environment.production) console.log(this.value);
  }
}
type InputTheme = 1 | 2;
export type ValueType = 'ct' | 'cd';
