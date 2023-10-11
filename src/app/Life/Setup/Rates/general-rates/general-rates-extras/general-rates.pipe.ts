import { CommonModule } from '@angular/common';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import {
  IRateRetrievalBasis,
  RateRetrievalBasis,
  ERateRetrievalBasisCode,
} from 'src/app/Life/Setup/Rates/rates-extras/rates.model';
import { ICodeTitle, InputType } from 'src/app/Shared/models/index.model';
import { UtilityPipesModule } from 'src/app/Shared/pipes/utility.pipe';
import { IRateValuesMetadata } from './general-rates.model';

@Pipe({ name: 'rateMetaDropDown' })
export class RateMetaDropDownPipe implements PipeTransform {
  transform<T>(
    list: any[],
    key: string,
    metadata: IRateValuesMetadata[], isShow: boolean
  ): T[] {
    if (!isShow) return list
    let ret: any[];
    if (!list) {
      ret = this.removeDuplicate(metadata?.map(x => x.keys[key]) as any)?.map(x=>({code:x}))
    } else { ret = list }
    // console.log(list, key, metadata, ret)
    return ret as unknown as T[]
  }
  removeDuplicate(list: any[], code?: string) {
    if (!list) return null
    const ret: any[] = [];
    for (const item of list) {
      if (code ? ret?.find(x => x[code] == item[code]) : ret?.includes(item)) continue;
      ret.push(item)
    }
    return ret
  }
}
@Pipe({ name: 'xAxisLabel' })
export class xAxisLabelPipe implements PipeTransform {
  transform(
    retrievalMtd: string,
    bandingFieldval: string,
    axisXval: string
  ): string {
    if (!retrievalMtd) {
      return '';
    }
    if (retrievalMtd[0] == ERateRetrievalBasisCode.l) {
      return bandingFieldval;
    } else if (retrievalMtd[0] == ERateRetrievalBasisCode.m) {
      return axisXval;
    } else {
      return '';
    }
  }
}
@Pipe({ name: 'yAxisLabel' })
export class yAxisLabelPipe implements PipeTransform {
  transform(
    retrievalMtd: string,
    lookupFieldval: string,
    axisYval: string
  ): string {
    if (!retrievalMtd) {
      return '';
    }
    if (retrievalMtd[0] == ERateRetrievalBasisCode.l) {
      return lookupFieldval;
    } else if (retrievalMtd[0] == ERateRetrievalBasisCode.m) {
      return axisYval;
    } else {
      return '';
    }
  }
}
@Pipe({ name: 'getRateKeyMeta' })
export class GetRateKeyMetaPipe implements PipeTransform {
  transform(rateKey: string): IRateKeyMeta {
    return rateKey
      ? this.keys.find((x) => x.key.toLowerCase() == rateKey.toLowerCase())
      : null;
  }
  formatter1 = (item) => {
    return item?.code + ' - ' + (item?.title || item?.description);
  };
  get keys(): IRateKeyMeta[] {
    return [
      { endpoint: '', code: '1', key: 'No of Members', type: 'number' },
      {
        endpoint: '',
        code: '2',
        key: 'No of Enrolees per Principal Member',
        type: 'number',
      },
      { endpoint: '', code: '3', key: 'No of Assets', type: 'number' },
      {
        endpoint: '',
        code: '4',
        key: 'Age at Issue of Asset (Years)',
        type: 'number',
      },
      {
        endpoint: '',
        code: '5',
        key: 'Age at Issue of Asset + Duration (Years)',
        type: 'number',
      },
      {
        endpoint: '',
        code: '6',
        key: 'Age at Issue of Life Assured',
        type: 'number',
      },
      {
        endpoint: '',
        code: '7',
        key: 'Age of Life Assured + Duration',
        type: 'number',
      },
      { endpoint: '', code: '12', key: 'Policy Term (months)', type: 'number' },
      { endpoint: '', code: '16', key: 'Sum Assured Breaks', type: 'number' },
      { endpoint: '', code: '23', key: 'Loan Interest Rate', type: 'number' },
      {
        endpoint: '',
        code: '24',
        key: 'Policy Duration (months)',
        type: 'number',
      },
      {
        endpoint: '',
        code: '25',
        key: 'Policy Duration (Years)',
        type: 'number',
      },
      { endpoint: '', code: '26', key: 'Policy Term (Years)', type: 'number' },
      { endpoint: '', code: '28', key: 'Premium Payment Term', type: 'number' },
      {
        endpoint: '/rest/agent/setup/type',
        code: '27',
        key: 'Agent Type',
        type: 'select',
      },
      {
        endpoint: '/rest/codes/sub/group/VEHICLE_CATEGORY',
        code: '8',
        key: 'Vehicle Category',
        type: 'select',
        valueField: 'code',
        labelFormatter: this.formatter1,
      },
      {
        endpoint: '/rest/codes/sub/group/VEHICLE_GENRE',
        code: '9',
        key: 'Vehicle Genre',
        type: 'select',
        valueField: 'code',
        labelFormatter: this.formatter1,
      },
      {
        endpoint: '/rest/codes/sub/group/VEHICLE_USAGE',
        code: '10',
        key: 'Vehicle Usage',
        type: 'select',
        valueField: 'code',
        labelFormatter: this.formatter1,
      },
      {
        endpoint: '/rest/codes/sub/group/NATURE_GOODS',
        code: '11',
        key: 'Nature of Goods',
        type: 'select',
        valueField: 'code',
        labelFormatter: this.formatter1,
      },
      {
        endpoint: '/rest/codes/sub/group/SECTOR',
        code: '14',
        key: 'Sector',
        type: 'select',
        valueField: 'code',
        labelFormatter: this.formatter1,
      },
      {
        endpoint: '/rest/codes/sub/group/FREQUENCY',
        code: '15',
        key: 'Premium Payment Frequency',
        type: 'select',
        valueField: 'code',
        labelFormatter: this.formatter1,
      },
      {
        endpoint: '/rest/codes/sub/group/GENDER',
        code: '21',
        key: 'Gender of Assured',
        type: 'select',
        valueField: 'code',
        labelFormatter: this.formatter1,
      },
      {
        endpoint: '/rest/currency',
        code: '13',
        key: 'Policy Currency',
        type: 'select',
        valueField: 'code',
        labelFormatter: this.formatter1,
      },
      {
        endpoint: '/rest/product/covers/annuity/escalation/rate/getAll',
        code: '19',
        key: 'Annuity Reversionary Rate',
        type: 'select',
      },
      {
        endpoint: '/rest/product/covers/annuity/escal/rate',
        code: '17',
        key: 'Annuity Escalation Rate',
        type: 'select',
      },
      {
        endpoint: '/rest/benefit/escal/rate ',
        code: '18',
        key: 'Benefit Escalation Rate',
        type: 'select',
      },
      {
        endpoint: '/rest/vehicle/make/getAll',
        code: '22',
        key: 'Vehicle Make',
        type: 'select',
      },
    ];
  }
}

const pipes = [xAxisLabelPipe, yAxisLabelPipe, GetRateKeyMetaPipe, RateMetaDropDownPipe];
@NgModule({
  declarations: pipes,
  imports: [CommonModule],
  exports: [pipes, UtilityPipesModule],
})
export class GeneralRatesPipesModule { }

interface IRateKeyMeta {
  key: string;
  code: string;
  type: InputType;
  endpoint?: any;
  valueField?: string;
  labelFormatter?: (item) => string;
}
