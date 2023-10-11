import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CodeService } from 'src/app/Services/code.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { ICodeTitle } from 'src/app/Shared/models/index.model';
import {
  IRateEntry,
  IRateRetrievalBasis,
  ERateRetrievalBasisCode,
} from '../../../rates-extras/rates.model';
import {
  IRateValue,
  IRateValues,
  IRateValuesMetadata,
  IRateValuesQueryMetadata,
} from '../../general-rates-extras/general-rates.model';
import { GeneralRatesService } from '../../general-rates-extras/general-rates.service';
import { InputMatrixComponent } from '../input-matrix/input-matrix.component';
import { UnderwritingTableFormComponent } from './underwriting-table-form/underwriting-table-form.component';

@Component({
  selector: 'app-rate-entry-form',
  templateUrl: './rate-entry-form.component.html',
  styleUrls: ['./rate-entry-form.component.scss'],
})
export class RateEntryFormComponent implements OnInit {
  isShow: boolean;
  @Input() isClone: boolean;
  @Input() isCreate: boolean;
  metadata: IRateValuesMetadata[];
  rows: string[];
  columns: string[];
  isCreationMode: boolean;
  isFiltered: boolean;
  @Input('isShow') set _isShow(v: boolean) {
    this.isShow = v;
    this.showMatrix = !v;
    this.isCreationMode = !this.isShow;
  }
  @Input('rate') set _rates(v: IRateEntry) {
    this.rate = v;
    if (!v) {
      this.form.reset();
      this.form2.reset();
      this.form3.reset();
      this.form4.reset();
      return;
    }
    this.form.patchValue(v);
    if (v.rateVersion?.length == 1) {
      setTimeout(() => {
        this.form3.patchValue({ versionNo: v.rateVersion[0].versionNo });
      }, 1000);
    }
    this.customInput = v?.valueParameter == 'UW';
    if (this.isShow) {
      this.getRateValuesMetadata();
    }
  }
  keyNums = [1, 2, 3, 4, 5];
  rate: IRateEntry;
  rateValues: IRateValues;
  form = new FormGroup({
    axisXValue: new FormControl(null),
    axisYValue: new FormControl(null),
    bandParameter: new FormControl(null),
    category: new FormControl(null),
    code: new FormControl(null),
    description: new FormControl(null),
    durationCalcBasis: new FormControl(null),
    lookupValue: new FormControl(null),
    retrievalBasis: new FormControl(null),
    sub_group: new FormControl(null),
    valueBasis: new FormControl(null),
    versionDateBasis: new FormControl(null),
    id: configForms.default(),
  });
  form2: FormGroup = new FormGroup({
    key1: configForms.default(),
    key2: configForms.default(),
    key3: configForms.default(),
    key4: configForms.default(),
    key5: configForms.default(),
  });
  form3: FormGroup = new FormGroup({
    versionDate: configForms.default(),
    versionNo: configForms.default(),
  });
  form4 = new FormGroup({
    row: configForms.default(),
    column: configForms.default(),
  });
  customInput: boolean;
  loading: boolean;
  showMatrix: boolean;
  retBasisCode = ERateRetrievalBasisCode;
  @ViewChild('inpMatrix') inpMatrix: InputMatrixComponent;
  form3Sub: Subscription;
  form4Sub: Subscription;
  constructor(
    public grS: GeneralRatesService,
    public uS: UtilityService,
    public codeS: CodeService
  ) {}
  ngOnInit(): void {
    this.form3Sub = this.form3.controls.versionNo.valueChanges.subscribe(
      (r) => {
        this.form3.patchValue({
          versionDate: new Date(
            this.rate?.rateVersion?.find((x) => x.versionNo == r)?.versionDate
          )
            ?.toJSON()
            ?.split('T')[0],
        });
      }
    );
    this.form4Sub = this.form4.valueChanges.subscribe((r) => {
      if (!r?.row && !r?.column) {
        this.loadRateValues(this.rateValues?.values[0]?.values);
        this.isFiltered = false;
      } else {
        this.isFiltered = true;
        if (r?.row && r?.column) {
          this.loadRateValues(
            this.rateValues?.values[0]?.values?.filter(
              (x) => x?.colValue == r?.column && x?.rowValue == r?.row
            )
          );
        } else if (r?.row) {
          this.loadRateValues(
            this.rateValues?.values[0]?.values?.filter(
              (x) => x?.rowValue == r?.row
            )
          );
        } else if (r?.column) {
          this.loadRateValues(
            this.rateValues?.values[0]?.values?.filter(
              (x) => x?.colValue == r?.column
            )
          );
        }
      }
    });
  }
  ngOnDestroy(): void {
    this.form3Sub.unsubscribe();
    this.form4Sub.unsubscribe();
  }
  getRateValuesMetadata = () =>
    this.grS.getRateValuesMetadata(this.rate.code).then((r) => {
      this.metadata = r;
      console.log('METADATA', r);
    });
  get rateValueQuery(): IRateValuesQueryMetadata {
    return {
      code: this.rate?.code,
      ratePartition1: this.form2?.value?.key1,
      ratePartition2: this.form2?.value?.key2,
      ratePartition3: this.form2?.value?.key3,
      ratePartition4: this.form2?.value?.key4,
      ratePartition5: this.form2?.value?.key5,
      versionNo: this.form3?.value?.versionNo,
    };
  }
  get ratePartitionsValues() {
    return [
      this.form2?.controls?.key1?.value,
      this.form2?.controls?.key2?.value,
      this.form2?.controls?.key3?.value,
      this.form2?.controls?.key4?.value,
      this.form2?.controls?.key5?.value,
      this.form3?.controls?.versionNo?.value,
    ].filter((x) => x != null);
  }
  get ratePartitions() {
    return [
      this.rate?.ratePartition1,
      this.rate?.ratePartition2,
      this.rate?.ratePartition3,
      this.rate?.ratePartition4,
      this.rate?.ratePartition5,
      // this.rate?.controls?.versionNo?.value,
    ].filter((x) => x);
  }
  get ratePartitionValuesValid() {
    //  if (this.ratePartitionsValues?.length || this.ratePartitions?.length) debugger;
    return this.ratePartitionsValues?.length == this.ratePartitions?.length + 1;
  }
  logPartitions() {
    console.log(this.ratePartitionsValues);
    console.log(this.ratePartitionsValues);
    console.log(this.ratePartitions);
  }

  getRetrievalBasisDesc = (code: string) => {
    return this.codeS
      .getCodesByCodeSubGroup('RATE_RETRIEVAL_BASIS')
      .toPromise()
      .then((res: IRateRetrievalBasis[]) => {
        const label = res?.find((x) => x.code == code);
        return label ? label.code + ' - ' + label.title : '';
      });
  };
  getKeyDescByCode = (code: string) => {
    return this.codeS
      .getCodesByCodeSubGroup('RATE_KEYS')
      .toPromise()
      .then((res: ICodeTitle[]) => {
        const label = res?.find((x) => x.code == code);
        return label ? label.code + ' - ' + label.title : '';
      });
  };

  versionOptionFormatter = (option: IVersion) => {
    return (
      option.versionNo +
      ' - ' +
      new Date(option.versionDate).toLocaleDateString()
    );
  };

  labelFormatter = (option: ICodeTitle): string => {
    return option?.code ? option.code + ' - ' + option.title : (option as any);
  };
  get fileName() {
    return 'Rate_' + this.rate?.code;
  }
  async fetchRateValues() {
    this.loading = true;
    //#region validate rate partition values
    if (!this.ratePartitionValuesValid) {
      this.uS.info('You have to enter a value for all the rate keys selected.');
      this.loading = false;
      return;
    }
    //#endregion
    this.showMatrix = false;
    try {
      this.rateValues = await this.grS.getRateValues(this.rateValueQuery);
      if (this.rateValues) {
        this.inpMatrix
          .parseIncomingRateValues(this.rateValues?.values[0]?.values)
          .then((r) => {
            this.columns = this.inpMatrix.matrix.data[0].slice(1);
            this.rows = this.inpMatrix.matrix.data.slice(1).map((x) => x[0]);
          });
        this.showMatrix = true;
      } else {
        this.showMatrix = false;
        this.uS.notify(
          `There are no rate values matching the parameters chosen`,
          0
        );
      }

      console.log('Fetched Rate Values', this.rateValues);
    } catch (e) {
      console.log(e);
    }
    this.loading = false;
  }
  private loadRateValues(rv: IRateValue[]) {
    this.inpMatrix.parseIncomingRateValues(rv);
    this.showMatrix = true;
  }

  switchToCreateMode() {
    this._isShow = false;
    this.isCreationMode = true;
    this.inpMatrix.reset();
  }
  switchToShowMode() {
    this._isShow = true;
    this.isCreationMode = false;
    this.inpMatrix.reset();
    this.getRateValuesMetadata();
  }

  showUWTable(val: { val: any; col: number; row: number }) {
    if (this.rate.valueParameter == 'UW') {
      this.uS.dialogOpener(
        UnderwritingTableFormComponent,
        {
          height: 'auto',
          maxHeight: '90vh',
          width: '35%',
          maxWidth: '90%',
          data: { ids: val.val },
          disableClose: true,
        },
        (r) => {
          this.inpMatrix.setValue(r, val.col, val.row);
        },
        () => {
          this.inpMatrix.setValue('', val.col, val.row);
        }
      );
    }
  }
  async submit(e: IRateValue[]) {
    // this.form.patchValue(e);
    this.loading = true;
    try {
      if (!this.ratePartitionValuesValid) {
        this.uS.info(
          'You have to enter a value for all the rate keys selected.',
          0
        );
        this.loading = false;
        return;
      }
      const rateValues: IRateValues = {
        code: this.form.value.code,
        retrievalBasis: this.form.value.retrievalBasis,
        values: [
          { keys: this.form2.value, version: this.form3.value, values: e },
        ],
      };
      console.log('rate entry form', rateValues);
      this.rateValues =
        // await (this.rateValues
        //   ? this.grS.updateRateValues(this.rate.code, rateValues)
        //   : this.grS.submitGenRateValues(rateValues));
        await this.grS.submitGenRateValues(rateValues);
      console.log('POST RATEVALUE', this.rateValues);
      this.uS.info('Rate value has been submitted', 1);
    } catch (e) {
      console.log(e);
      this.uS.info(`An error occurred`, 0);
    }
    this.loading = false;
  }
}
interface IVersion {
  versionNo: number;
  versionDate: any;
}
