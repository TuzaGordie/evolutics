import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { tap } from 'rxjs/operators';
import { UtilityService } from 'src/app/Services/utility.service';
import { IOption } from 'src/app/Shared/components/input/input-basic.component';
import { configForms } from 'src/app/Shared/models/form.class';
import {
  EPageType,
  ICodeDescription,
  ICodeTitle,
} from 'src/app/Shared/models/index.model';
import { CreateCoverCodeComponent } from '../../../life-setup-product-cover-code/create-cover-code/create-cover-code.component';
import { FindProductService } from '../../../service/find-product.service';
import { IProductCode } from '../../product-code-extras/product-code.interface';
import { ProductService } from '../../product-code-extras/product.service';

@Component({
  selector: 'app-dependent-covers-form',
  templateUrl: './dependent-covers-form.component.html',
  styleUrls: ['./dependent-covers-form.component.scss'],
})
export class DependentCoversFormComponent implements OnInit {
  @Input() isShow: boolean;
  @Input() isEdit: boolean;
  @Input() isClone: boolean;
  @Input() isCreate: boolean;
  @Input() prodCode: string;
  @Input() product: IProductCode;
  @Input() form: FormGroup;
  subgroupForm = new FormGroup({
    subgroupName: new FormControl(),
    subgroupNo: new FormControl(),
  });
  companyList: ICodeDescription[];
  fundingOptions: ICodeTitle[];

  constructor(public fpS: ProductService, public uS: UtilityService) {}

  ngOnInit(): void {
    this.getCompanyList().subscribe();
    this.getFundingOptions();
  }
  getFundingOptions() {
    return this.fpS
      .getCodeLists('FUNDING_OPT')
      .subscribe((r) => (this.fundingOptions = r));
  }
  openAddCover() {
    this.uS
      .pageToModalOpener(CreateCoverCodeComponent, 'Create Cover')
      .subscribe((r) => {
        this.getCompanyList().subscribe((r) => {
          this.uS.notify('Covers list has been updated');
        });
      });
  }
  async initializeArrays(product = this.product) {
    this.coverArray?.reset();
    this.permanentSubgroupsForm?.reset();
    this.subgroupForm?.reset();
    if (this.isCreate) {
      this.addNewCoverArray();
      this.addNewSubCoverArray();
    } else {
      product?.dependentCovers?.cover?.length
        ? product?.dependentCovers?.cover?.forEach((x) =>
            this.addNewCoverArray(x)
          )
        : this.addNewCoverArray();
      product?.dependentCovers?.permanentSubgroups?.length
        ? product?.dependentCovers?.permanentSubgroups?.forEach((x) =>
            this.addNewSubCoverArray(x)
          )
        : this.addNewSubCoverArray();

      this.subgroupForm.patchValue({
        subgroupName:
          this.permanentSubgroupsForm?.controls[0]?.value?.subgroupName,
      });
      console.log('subgroupForm', this.subgroupForm);
      if (this.isShow) {
        this.form?.disable();
        this.subgroupForm?.disable();
      }
    }
    this.subgroupForm.controls.subgroupName.valueChanges.subscribe((r) => {
      this.permanentSubgroupsForm?.controls.forEach((c) => {
        c.patchValue({ subgroupName: r });
      });
      console.log(this.permanentSubgroupsForm.value);
    });
  }
  get subgroupNo() {
    return this.product?.dependentCovers?.permanentSubgroups[0]?.subgroupNo;
  }
  get subgroupName() {
    return this.subgroupForm.controls?.subgroupName?.value;
  }
  get coverArray() {
    return this.form.get('cover') as FormArray;
  }
  get coverArrayValues() {
    return this.coverArray.value as any[];
  }
  addNewCoverArray(e?, index: number = this.coverArray?.length || 0) {
    const form = new FormGroup({
      ageAssuredLimit: configForms.default(),
      availablePostIssue: configForms.boolean(false, false),
      base: new FormControl(index == 0 ? true : false),
      // base: new FormControl(false, this.validateBase.bind(this)),
      blankSumAssured: configForms.boolean(false, false),
      company: configForms.default(),
      coolOffPeriod: configForms.number(false),
      coverCode: configForms.default(),
      cd: configForms.default(e?.coverCode + ' - ' + e?.description),
      description: configForms.default(),
      id: configForms.default(),
      fundingOption: configForms.required(),
      mandatory: configForms.boolean(false, false),
      maxNo: configForms.number(false),
      sumAssuredEqualBaseCoverSumAssured: configForms.boolean(false, false),
    });
    if (e) form.patchValue(e);
    if (!this.isShow) {
      // debugger
      form.controls.base.valueChanges.subscribe((r) => {
        if (r) form.patchValue({ fundingOption: 'M' });
      });
      if(index==0) form.controls.base.patchValue(true);
    }
    this.coverArray.insert(index, form);
  }
  async removeCoverArray(index: number) {
    const id = this.coverArray.controls[index]?.value?.id;
    this.coverArray.removeAt(index);
    if (id) {
      await this.fpS.deleteDependentCovers(id);
    }
  }
  patchCover(
    coverCode: string,
    index: number,
    level: 1 | 2,
    options: ICodeDescription[]
  ) {
    console.log('coverCode', coverCode);
    if (level == 1)
      this.coverArray.controls[index]?.patchValue({
        description: options?.find((x) => x.code == coverCode)?.description,
      });
    else if (level == 2)
      this.permanentSubgroupsForm.controls[index]?.patchValue({
        sgDescription: options?.find((x) => x.code == coverCode)?.description,
      });
    console.log(this.form);
  }
  get permanentSubgroupsForm() {
    return this.form.get('permanentSubgroups') as FormArray;
  }
  get permanentSubgroupsValues() {
    return this.coverArray.value as any[];
  }
  addNewSubCoverArray(
    e?,
    index: number = this.permanentSubgroupsForm?.length || 0
  ) {
    const form = new FormGroup({
      sgAgeAssuredLimit: configForms.default(),
      sgAvailablePostIssue: configForms.boolean(false, false),
      sgBase: new FormControl(index == 0 ? true : false),
      // sgBase: new FormControl(false, this.validateSGBase.bind(this)),
      sgBlankSumAssured: configForms.boolean(false, false),
      sgCompany: configForms.default(),
      sgCoolOffPeriod: configForms.number(false),
      sgCoverCode: configForms.default(),
      cd: configForms.default(e?.sgCoverCode + ' - ' + e?.sgDescription),
      id: configForms.default(),
      sgDescription: configForms.default(),
      sgFundingOption: configForms.required(),
      sgMandatory: configForms.boolean(false, false),
      sgMaxNo: configForms.number(false),
      sgSumAssuredEqualBaseCoverSumAssured: configForms.boolean(false, false),
      subgroupName: configForms.default(this.subgroupName),
      // subgroupNo: configForms.default(this.subgroupNo),
    });
    if (!this.isShow)
      form.controls.sgBase.valueChanges.subscribe((r) => {
        if (r) form.patchValue({ sgFundingOption: 'M' });
      });
    if (e) {
      // debugger
      form.patchValue(e);
    }
    this.permanentSubgroupsForm.insert(index, form);
  }
  async removeSubCoverArray(index: number) {
    const id = this.permanentSubgroupsForm.controls[index]?.value?.id;
    this.permanentSubgroupsForm.removeAt(index);
    if (id) {
      await this.fpS.deleteDependentSubCovers(id);
    }
  }

  pickDescription = (code: string, options: any[]) => {
    return options?.find((x) => x.code == code)?.description;
  };
  getCompanyList = () => {
    return this.fpS.getCompanyList().pipe(
      tap((r) => {
        this.companyList = r;
      })
    );
  };
  validateBase(control: AbstractControl, isSG: boolean) {
    if (!control.value) return null;
    if (isSG) {
      this.permanentSubgroupsForm.controls.forEach((x: FormGroup) =>
        x.controls.sgBase.setValue(false)
      );
      control.patchValue(true);
    } else {
      this.coverArray.controls.find((x: FormGroup) =>
        x.controls.base.setValue(false)
      );
      control.patchValue(true);
    }

    return null;
  }
}
