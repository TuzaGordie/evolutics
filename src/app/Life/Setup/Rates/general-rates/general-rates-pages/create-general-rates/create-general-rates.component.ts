import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { PageService } from 'src/app/Services/page.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { PageTemplateComponent } from 'src/app/Shared/components/page-template/page-template.component';
import { configForms } from 'src/app/Shared/models/form.class';
import { ICodeTitle } from 'src/app/Shared/models/index.model';
import {
  IRateEntry,
  IRateRetrievalBasis,
  IRateVersion,
  RateRetrievalBasis,
  ERateRetrievalBasisCode,
} from '../../../rates-extras/rates.model';
import { LookupDialogBoxComponent } from '../../general-rates-comps/lookup-dialog-box/lookup-dialog-box.component';
import { MatrixDialogBoxComponent } from '../../general-rates-comps/matrix-dialog-box/matrix-dialog-box.component';
import {
  ILookupParams,
  IMatrixParams,
} from '../../general-rates-extras/general-rates.model';
import { GeneralRatesService } from '../../general-rates-extras/general-rates.service';

@Component({
  selector: 'app-create-general-rates',
  templateUrl: './create-general-rates.component.html',
  styleUrls: ['./create-general-rates.component.scss'],
})
export class CreateGeneralRatesComponent
  extends PageTemplateComponent
  implements OnInit
{
  testList: any = [];
  rateCategoryList: any[] = [];
  rateGroupList: any = [];
  ff: any;
  rateList: any = [];
  rateKeys: ICodeTitle[];
  rateRetrievals: IRateRetrievalBasis[];
  valueBasis: any;
  valueParam: any;
  durationBasisCalc: any;
  form = new FormGroup({
    axisXValue: configForms.default(),
    axisYValue: configForms.default(),
    bandParameter: configForms.default(),
    category: configForms.default(),
    code: configForms.default(),
    description: configForms.default(),
    durationCalcBasis: configForms.default(),
    exactAxis: configForms.boolean(false, true),
    exactRule: configForms.default(),
    group: configForms.required(),
    lookupValue: configForms.default(),
    ratePartition1: new FormControl(
      null,
      this.validateRatePartition.bind(this)
    ),
    ratePartition2: new FormControl(
      null,
      this.validateRatePartition.bind(this)
    ),
    ratePartition3: new FormControl(
      null,
      this.validateRatePartition.bind(this)
    ),
    ratePartition4: new FormControl(
      null,
      this.validateRatePartition.bind(this)
    ),
    ratePartition5: new FormControl(
      null,
      this.validateRatePartition.bind(this)
    ),
    rateVersion: new FormArray([]),
    // rateVersion: new FormArray([], this.validateVersion.bind(this)),
    retrievalBasis: configForms.required(),
    sub_group: configForms.default(),
    valueBasis: configForms.default(),
    valueParameter: configForms.default(),
    // rateDivisor: configForms.default(),
    versionDateBasis: configForms.default(),
  });
  postGenList: any;
  errorMessage: any;
  loading: boolean;
  loadingtext: string = 'Loading';
  rate: IRateEntry;
  refreshRRBTooltip: number;

  get retrievalMtd() {
    return this.form.value.retrievalBasis as IRateRetrievalBasis;
  }
  rateRetrievalBasis = RateRetrievalBasis;
  rateRetrievalBasisCode = ERateRetrievalBasisCode;
  private nbofdate: number = 1;
  get lookupParams() {
    return this.form.value as ILookupParams;
  }
  get matrixParams() {
    return this.form.value as IMatrixParams;
  }

  @ViewChild('rateEntryBtn') rateEntryBtnRef: ElementRef<HTMLButtonElement>;

  constructor(
    public grS: GeneralRatesService,
    public http: HttpClient,
    public uS: UtilityService,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public codeS: CodeService,
    public pageS: PageService
  ) {
    super(route, uS);
  }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.grS.getUnderwritingValues;
    const code =
      this.route.snapshot.params.id || this.route.snapshot.queryParams.id;
    if (code) {
      this.rate = await this.grS.getBasicRate(code);
      this.rate.rateVersion.forEach(
        (x) => (x.versionDate = x.versionDate?.split('T')[0])
      );
      if (this.isClone) {
        delete this.rate.code;
      }
      this.form.patchValue(this.rate);
      this.rate.rateVersion.forEach((rv) => this.addVersionRow(rv));
      console.log('RATE', this.rate);
      if (this.isShow) {
        this.form.disable();
      }
      if (this.isClone) {
        delete this.rate;
      }
    } else {
      this.addVersionRow();
    }
    this.form.controls.code.disable();
    //#region VALIDATOR FOR VALUEPARAMETER
    this.formValidators();
    //#endregion
    this.getRateCategory();
    this.getRateGroup();
    this.getRateList();
    this.getRatePartitions();
    this.getRateRetrieval();
    this.getValueBasis();
    this.getValueParam();
    this.getDurationBasis();
    this.loading = false;
    if (!this.isShow) {
      this.form.get('exactAxis').valueChanges.subscribe((r) => {
        if (r == true) {
          this.form.get('exactRule').reset();
          this.form.get('exactRule').disable();
        } else {
          this.form.get('exactRule').enable();
        }
      });
      // this.form.get('exactAxis').updateValueAndValidity();
      this.form
        .get('rateVersion')
        .valueChanges.subscribe((r: IRateVersion[]) => {
          if (r?.length)
            for (let i = 0; i < r.length; i++) {
              const element = r[i];
              if (+element?.versionNo - i != 1) {
                this.versions.controls[i].patchValue({ versionNo: i + 1 });
                return;
              }
            }
        });
      this.form.valueChanges.subscribe((r) => {
        this.isDurationCalcBasisMandatory =
          this.durationCalcBasisMandatoryKeys.some(
            (k) =>
              k == r.axisXValue ||
              k == r.axisYValue ||
              k == r.lookupValue ||
              k == r.ratePartition1 ||
              k == r.ratePartition2 ||
              k == r.ratePartition3 ||
              k == r.ratePartition4 ||
              k == r.ratePartition5
          );
      });
      this.form.updateValueAndValidity();
    }
  }

  private readonly durationCalcBasisMandatoryKeys = [5, 7, 24, 25];
  isDurationCalcBasisMandatory;
  rateRetrievalBasisTooltip = (type: ERateRetrievalBasisCode, refresher) => {
    if (type == ERateRetrievalBasisCode.l) {
      const lv = this.rateKeys?.find(
        (x) => x.code == this.form?.value?.lookupValue
      );
      return `Lookup Field: ${lv?.code} - ${lv?.title}`;
    } else if (type == ERateRetrievalBasisCode.m) {
      const xaxis = this.rateKeys.find(
          (x) => x.code == this.form?.value?.axisXValue
        ),
        yaxis = this.rateKeys.find(
          (x) => x.code == this.form?.value?.axisYValue
        );
      return `Matrix Axis X: ${xaxis?.code} - ${xaxis?.title}\nY: ${yaxis?.code} - ${yaxis?.title}`;
    } else return null;
  };
  //#region RATE KEYS VALIDATION
  validateRatePartition(control: FormControl) {
    // console.log('control', control, control?.value);
    const val = control?.value;
    if (!val) return null;
    if (!control?.dirty) return null;
    if (this.formRatePartitions.filter((x) => x == val)?.length) {
      this.uS.notify(
        `Rate partition with code ${val} exists in multiple places.`,
        0
      );
      return { duplicate: true };
    }
    if (this.formAxis.filter((x) => x == val)?.length) {
      this.uS.notify(`Code ${val} has been used as a rate retrieval basis.`, 0);
      return { duplicate: true };
    }
    return null;
  }
  get formRatePartitions() {
    return [
      this.form?.value?.ratePartition1,
      this.form?.value?.ratePartition2,
      this.form?.value?.ratePartition3,
      this.form?.value?.ratePartition4,
      this.form?.value?.ratePartition5,
    ].filter((x) => x);
  }
  get formAxis() {
    return [
      this.form?.value?.lookupValue,
      this.form?.value?.bandParameter,
      this.form?.value?.axisXValue,
      this.form?.value?.axisYValue,
    ].filter((x) => x);
  }
  //#endregion
  formValidators() {
    this.form.controls.valueParameter.disable();
    this.form.controls.valueBasis.valueChanges.subscribe((r) => {
      if (r != 'LV') {
        this.form.controls.valueParameter.disable();
        this.form.controls.valueParameter.reset();
      } else {
        this.form.controls.valueParameter.enable();
      }
    });
  }
  //#region RATE VERSION VALIDATIONS
  validateVersionNo(control: FormControl) {
    if (control?.pristine && control?.untouched) return null;
    const versionNo: number = control.value;
    // console.log(control);
    if (
      this.versions.controls.filter((x) => x.value.versionNo == versionNo)
        ?.length
    ) {
      this.uS.notify(`Version number "${versionNo}" should only exist once`, 0);
      return { duplicate: true };
    }
    try {
      if (+versionNo < 1) {
        this.uS.notify(`Version number should not be less than 1`, 0);
        return { pattern: true };
      }
    } catch (error) {
      this.uS.notify(`Version number is not valid`, 0);
      return { pattern: true };
    }
    return null;
  }
  validateVersionDate(control: FormControl) {
    if (control?.pristine && control?.untouched) return null;
    const versionDate: string = control.value;
    console.log(control);
    if (
      this.versions.controls.filter((x) => x.value.versionDate == versionDate)
        ?.length
    ) {
      this.uS.notify(`Version date "${versionDate}" should only exist once`, 0);
      return { duplicate: true };
    }
    return null;
  }
  validateVersion(group: FormGroup) {
    if (group?.pristine && group?.untouched) return null;
    const version: IRateVersion = group.value;
    // debugger;
    for (const item of this.versionsValues) {
      if (
        item.versionDate > version.versionDate &&
        item.versionNo < version.versionNo
      ) {
        this.uS.notify(
          `Version number "${version.versionNo}" has an older date than "${item.versionNo}" while having a newer version no`,
          0
        );
        return { invalid: true };
      }
    }
    return null;
  }
  //#endregion

  get versions(): FormArray {
    return this.form.get('rateVersion') as FormArray;
  }
  addVersionRow(v?: IRateVersion, index = this.versions?.length) {
    const form = new FormGroup(
      {
        versionNo: new FormControl(
          index + 1,
          this.validateVersionNo.bind(this)
        ),
        versionDate: new FormControl(null, [Validators.required,this.validateVersionDate.bind(this)]),
        id: new FormControl(),
        code: new FormControl(),
      },
      this.validateVersion.bind(this)
    );
    if (v) form.patchValue(v);
    this.versions.insert(index, form);
  }
  removeVersionRow(index: number) {
    this.versions.removeAt(index);
  }
  get versionsValues(): IRateVersion[] {
    return this.versions.controls.map((x) => x.value).sort2('versionNo');
  }

  //#region MODALS
  get unchosenRateKeys() {
    return this.rateKeys?.filter(
      (x) => !this.formRatePartitions.includes(x.code)
    );
  }
  openRRB() {
    const selected = this.form.value.retrievalBasis;
    if (selected == ERateRetrievalBasisCode.l) this.openLookupModal();
    else if (selected == ERateRetrievalBasisCode.m) this.openMatrixModal();
  }
  private openLookupModal() {
    this.uS.dialogOpener(
      LookupDialogBoxComponent,
      {
        data: {
          lookUpFieldlist: this.unchosenRateKeys,
          value: this.lookupParams,
        },
        disableClose: true,
      },
      (r: ILookupParams) => {
        if (r) {
          this.form.patchValue({
            lookupValue: r.lookupValue,
            bandParameter: r.bandParameter,
            axisXValue: null,
            axisYValue: null,
          });
        }
        this.refreshRRBTooltip = Math.random();
      },
      () => {
        this.form.patchValue({ retrievalBasis: null });
        this.refreshRRBTooltip = Math.random();
      }
    );
  }
  private openMatrixModal() {
    this.uS.dialogOpener(
      MatrixDialogBoxComponent,
      {
        data: {
          lookUpFieldlist: this.unchosenRateKeys,
          value: this.matrixParams,
        },
        disableClose: true,
      },
      (r: IMatrixParams) => {
        if (r) {
          this.form.patchValue({
            axisXValue: r.axisXValue,
            axisYValue: r.axisYValue,
            lookupValue: null,
            bandParameter: null,
          });
        }
        this.refreshRRBTooltip = Math.random();
      },
      () => {
        this.form.patchValue({ retrievalBasis: null });
        this.refreshRRBTooltip = Math.random();
      }
    );
  }
  //#endregion

  //#region meta

  getRateCategory() {
    this.codeS.getCodesByCodeSubGroup('RATE_CATEGORY').subscribe((res) => {
      this.rateCategoryList = res;
      // console.log('rate category', res);
    });
  }

  getRateGroup() {
    this.codeS.getCodesByCodeSubGroup('RATE_GROUP').subscribe((res) => {
      this.rateGroupList = res;
      // console.log('rate group', res);
    });
  }

  getRateList() {
    this.grS.getRateList().subscribe((res) => {
      this.rateList = res;
      // console.log('rate List', res);
    });
  }

  getRatePartitions() {
    this.codeS.getCodesByCodeSubGroup('RATE_KEYS').subscribe((res) => {
      this.rateKeys = res;
      this.refreshRRBTooltip = Math.random();
      // console.log('rate partition ', res);
    });
  }

  getRateRetrieval() {
    this.codeS
      .getCodesByCodeSubGroup('RATE_RETRIEVAL_BASIS')
      .subscribe((res: any) => {
        this.rateRetrievals = res;
        // console.log('rate retrieval 1', res);
      });
  }

  getValueBasis() {
    this.codeS.getCodesByCodeSubGroup('VALUE_BASIS').subscribe((res) => {
      this.valueBasis = res;
      // console.log('Value Basis', res);
    });
  }

  getValueParam() {
    this.codeS.getCodesByCodeSubGroup('VALUE_FIELD').subscribe((res) => {
      this.valueParam = res;
      // console.log('Value Parameter', res);
    });
  }

  getDurationBasis() {
    this.codeS
      .getCodesByCodeSubGroup('DURATION_CALC_BASIS')
      .subscribe((res) => {
        this.durationBasisCalc = res;
        // console.log('Duration Basis ', res);
      });
  }

  onRateRetrievalBasisChange() {
    const selected = this.form.value.retrievalBasis;
    if (!selected)
      this.form.patchValue({
        lookupValue: null,
        bandParameter: null,
        axisXValue: null,
        axisYValue: null,
      });
    else if (selected == ERateRetrievalBasisCode.l) this.openLookupModal();
    else if (selected == ERateRetrievalBasisCode.m) this.openMatrixModal();
  }
  dateCounter() {
    return new Array(this.nbofdate);
  }

  dateInc() {
    this.nbofdate = this.nbofdate + 1;
  }
  //#endregion

  //#region SUBMISSION
  async basicSubmit() {
    this.loading = true;
    try {
      console.log('basis form', this.form.value);
      const data = this.formatForBasicSubmit(this.form.value);
      this.uS.copyPayload(data);
      this.rate = await (!this.rate
        ? this.grS.genRate(data)
        : this.grS.updateRate(this.rate.code, data));
      console.log('POST RATE', this.rate);
      // this.uS.notify('Rate has been generated', 1);
      this.form.reset();
      this.form.patchValue(this.rate);
      this.form.disable();
      setTimeout(() => {
        this.rateEntryBtnRef.nativeElement.click();
      }, 500);
    } catch (e) {
      console.log(e);
      this.uS.notify(e, 0);
    }
    this.loading = false;
  }
  formatForBasicSubmit(data: IRateEntry) {
    data.rateVersion.sort2('versionNo');
    return data;
  }
  async fetchBasicRate() {
    this.loading = true;
    try {
      // this.rate = await this.frS.getGeneralRate(this.rate.code);
    } catch (e) {
      console.log(e);
      this.uS.notify(e, 0);
    }
    this.loading = false;
  }
  //#endregion
}
