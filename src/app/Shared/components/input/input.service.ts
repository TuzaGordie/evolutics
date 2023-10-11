import { Injectable } from '@angular/core';
import { ICodeTitle } from '../../models/index.model';
import {
  OptionLabeller,
  OptionsFormatter,
} from '../../pipes/inputs-pipes.pipe';
import { IOption, OptionLabelType } from './input-basic.component';

@Injectable({
  providedIn: 'root',
})
export class InputService {
  readonly optionLabellerFunctions;
  constructor() {
    const labeller = (field1: string, field2: string) => {
      field1 = field1?.toString()?.trim();
      field2 = field2?.toString()?.trim();
      if (field1!=null && field2!=null) return field1 + ' - ' + field2;
      else return field1 || field2;
    };
    this.optionLabellerFunctions = {
      cd: (option: any) =>labeller(option?.code,option?.description)    ,
      cdt: (option: any) =>labeller(option?.code,option?.description||option?.title)    ,
      cf: (option: any) => option?.code + ' - ' + option?.fullName,
      cmd: (option: any) => option?.company + ' - ' + option?.description,
      cn: (option: any) => option?.code + ' - ' + option?.name,
      ct: (option: ICodeTitle) => labeller( option?.code, option?.title),
      gd: (option: any) => option?.group + ' - ' + option?.description,
      ha: (option: any) => option?.hierAgentNo + ' - ' + option?.agentName,
      id: (option: any) => option?.id + ' - ' + option?.description,
      if: (option: any) => option?.id + ' - ' + option?.fullName,
      ifl: (option: any) =>
        `${option?.userId} - ${option?.firstName} ${option?.lastName}`,
      it: (option: any) => option?.id + ' - ' + option?.title,
      md: (option: any) => option?.mktEventCode + ' - ' + option?.description,
      nf: (option: any) => option?.no + ' - ' + option?.fullName,
      td: (option: any) => option?.type + ' - ' + option?.description,
      ud: (option: any) => option?.userMenu + ' - ' + option?.description,
      uf: (option: any) => option?.userName + ' - ' + option?.fullName,
    };
  }
  optionsFormatter = (
    options: any[],
    valueField?: string,
    formatter?,
    optionType?: OptionLabelType,
    labelField?: string
  ) => {
    if (!options?.length) return [];
    if (formatter)
      return options.map((option) => ({
        value: valueField ? option[valueField] : option,
        label: formatter(option),
      }));
    if (optionType)
      return options.map((option) => ({
        value: valueField ? option[valueField] : option,
        label: this.optionLabellerFunctions[optionType](option),
      }));
    if (labelField)
      return options.map((option) => ({
        value: valueField ? option[valueField] : option,
        label: option[labelField],
      }));
    return options.map((option) => ({ value: option, label: option }));
  };
  trackByValue(index, item: IOption) {
    return item.value;
  }
}
