import {
  ValidatorFn,
  FormControlOptions,
  AsyncValidatorFn,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { OptionLabelType } from '../components/input/input-basic.component';
import { InputType } from './index.model';

export interface IFormSchema {
  field?: string;
  label?: string;
  validators?: ValidatorFn[]  
  asyncValidators?: AsyncValidatorFn[];
  value?: any;
  type: InputType;
  disabledIf?: (row: any, cellField?: string) => boolean;
  options?: any[];
  valueField?: string;
  labelType?: OptionLabelType;
  labelField?: string;
  optionsFunc?: (
    row: any,
    cellField?: string
  ) => Promise<any[]> | Observable<any[]>;
  optionFormatter?: (item: any) => string;
  decimalPoints?: number;
  hint?: string;
  max?: number;
  min?: number;
  placeholder?: string;
  templateValue?: any;
}
