import { CommonModule } from '@angular/common';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormsModule } from '@angular/forms';
import { IOption, OptionLabelType } from '../components/input/input-basic.component';
import { InputService } from '../components/input/input.service';
import { ICodeTitle } from '../models/index.model';

@Pipe({
  name: 'filterOptions',
})
export class FilterOptions implements PipeTransform {
  transform(arr: any[] = [], query: string, field: string = 'label') {
    query = query?.toLowerCase()?.trim();
    arr = arr ? arr : [];
    return [
      ...arr.filter((x) => x[field].toLowerCase().startsWith(query)),
      ...(arr
        .filter((x) => !x[field].toLowerCase().startsWith(query))
        ?.filter((x) => x[field].toLowerCase().includes(query)) || []),
    ];
  }
}

@Pipe({ name: 'optioner' })
export class OptionerPipe implements PipeTransform {
  transform(
    options: any[],
    labelField,
    idField?,
    basic?: boolean
  ): { value: any; label: string }[] {
    if (options) {
      if (labelField && idField) {
        return basic
          ? options.map((x) => ({
              label: this.arrToStr(labelField, x),
              value: x[idField],
            }))
          : options.map((x) => ({
              label: this.arrToStr(labelField, x),
              value: x,
            }));
      } else {
        return options.map((x) => ({
          label: x,
          value: x,
        }));
      }
    } else {
      return [];
    }
  }
  arrToStr(labelField: string, x) {
    const fs = labelField.split('|');
    if (fs.length > 1) {
      let l = '';
      fs.forEach((field) => {
        l += x[field] + ' ';
      });
      return l;
    } else {
      return x[labelField];
    }
  }
}

@Pipe({
  name: 'validationMsg',
})
export class ValidationMsg implements PipeTransform {
  transform(message: string, prefix?: string, suffix?: string): string {
    return (
      (prefix ? prefix + ' ' : '') + message + (suffix ? ' ' + suffix : '')
    );
  }
}

@Pipe({
  name: 'validator',
})
export class Validator implements PipeTransform {
  transform(validation, control: AbstractControl, update?) {
    return (
      control &&
      control?.hasError(validation?.type) &&
      (control?.touched || control?.dirty)
    );
  }
}
@Pipe({
  name: 'optionLabeller',
})
export class OptionLabeller implements PipeTransform {
  transform(
    option: any,
    formatter?,
    optionType?: OptionLabelType,
    labelField?: string
  ): string {
    if (formatter) return formatter(option);
    if (optionType) return this.iS.optionLabellerFunctions[optionType](option);
    if (labelField) return option[labelField];
    return option;
  }
  constructor(public iS: InputService) {}
}
@Pipe({
  name: 'optionsFormatter',
})
export class OptionsFormatter implements PipeTransform {
  transform(
    options: any[],
    valueField?: string,
    formatter?,
    optionType?: OptionLabelType,
    labelField?: string
  ): IOption[] {
    return this.iS.optionsFormatter(
      options,
      valueField,
      formatter,
      optionType,
      labelField
    );
  }
  constructor(public iS: InputService) {}
}

@Pipe({ name: 'inputClass' })
export class InputClassPipe implements PipeTransform {
  transform(
    inpCl: string,
    valid?: boolean,
    invalid?: boolean,
    showValidation?: boolean
  ) {
    let cls = inpCl + ' form-control';
    if (showValidation) {
      cls += valid ? ' bordercheck' : invalid ? ' borderuncheck' : '';
    }
    return cls;
  }
}

const comps = [
  FilterOptions,
  Validator,
  ValidationMsg,
  OptionerPipe,
  OptionLabeller,
  OptionsFormatter,
  InputClassPipe,
];
const modules = [FormsModule];
@NgModule({
  declarations: comps,
  imports: [CommonModule, ...modules],
  exports: [...comps, ...modules],
})
export class InputPipesModule {}
