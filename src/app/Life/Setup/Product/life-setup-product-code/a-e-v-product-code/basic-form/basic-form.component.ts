import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { configForms } from 'src/app/Shared/models/form.class';
import { ICodeDescription } from 'src/app/Shared/models/index.model';
import { FindProductService } from '../../../service/find-product.service';
import { IProductCode } from '../../product-code-extras/product-code.interface';
import { ProductService } from '../../product-code-extras/product.service';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss'],
})
export class BasicFormComponent implements OnInit {
  @Input() isShow: boolean;
  @Input() isEdit: boolean;
  @Input() isClone: boolean;
  @Input() isCreate: boolean;
  @Input() prodCode: string;
  @Input() product: IProductCode;
  @Input() form: FormGroup;
  currenciesLists: ICodeDescription[];
  companyLists: ICodeDescription[];
  discountLists: ICodeDescription[];
  constructor(public fpS: ProductService) {}

  ngOnInit(): void {
    this.fpS.getCurrenciesList().subscribe((r) => (this.currenciesLists = r));
    this.fpS.getCompanyList().subscribe((r) => (this.companyLists = r));
    this.fpS.getDiscountList().subscribe((r) => (this.discountLists = r));
  }
  initializeArrays(product = this.product) {
    this.currencyAllowed.reset();
    this.companiesAllowed.reset();
    if (this.isCreate) {
      this.addNewCurrencyAllowed();
      this.addNewCompaniesAllowed();
      this.addNewdiscountsAllowed();
    } else {
      product?.basic?.currencyAllowed?.length
        ? product?.basic?.currencyAllowed?.forEach((x) =>
            this.addNewCurrencyAllowed(x)
          )
        : this.addNewCurrencyAllowed();
      product?.basic?.companiesAllowed?.length
        ? product?.basic?.companiesAllowed?.forEach((x) =>
            this.addNewCompaniesAllowed(x)
          )
        : this.addNewCompaniesAllowed();
      product?.basic?.discountsAllowed?.length
        ? product?.basic?.discountsAllowed?.forEach((x) =>
            this.addNewdiscountsAllowed(x)
          )
        : this.addNewdiscountsAllowed();
      // if (this.isEdit) {
      //   this.form.controls.code.disable();
      // }
      if (this.isShow) {
        this.form?.disable();
      }
    }
  }
  get currencyAllowed(): FormArray {
    return this.form.get('currencyAllowed') as FormArray;
  }
  addNewCurrencyAllowed(
    value?,
    index: number = this.currencyAllowed?.length || 0
  ) {
    const form = new FormGroup({
      id: configForms.default(),
      productCode: configForms.default(this.prodCode),
      validCurrency: configForms.default(),
    });
    if (value) form.patchValue(value);
    this.currencyAllowed.insert(index, form);
  }
  async removeCurrencyAllowed(index: number) {
    const id = this.currencyAllowed.controls[index]?.value?.id;
    this.currencyAllowed.removeAt(index);
    if (id) {
      await this.fpS.deleteCurrency(id);
    }
  }

  get companiesAllowed(): FormArray {
    return this.form.get('companiesAllowed') as FormArray;
  }
  addNewCompaniesAllowed(
    value?,
    index: number = this.companiesAllowed?.length || 0
  ) {
    const form = new FormGroup({
      id: configForms.default(),
      productCode: configForms.default(),
      companyCode: new FormControl(null ),
    });
    if (value) form.patchValue(value);
    this.companiesAllowed.insert(index, form);
  }
  async removeCompaniesAllowed(index: number) {
    const id = this.companiesAllowed.controls[index]?.value?.id;
    this.companiesAllowed.removeAt(index);
    if (id) {
      await this.fpS.deleteCompany(id);
    }
  }

  get discountsAllowed(): FormArray {
    return this.form.get('discountsAllowed') as FormArray;
  }
  addNewdiscountsAllowed(
    value?,
    index: number = this.discountsAllowed?.length || 0
  ) {
    const form = new FormGroup({
      id: configForms.default(),
      description: configForms.default(),
      code: configForms.default(),
    });
    if (value) form.patchValue(value);
    this.discountsAllowed.insert(index, form);
  }
  async removediscountsAllowed(index: number) {
    const id = this.discountsAllowed.controls[index]?.value?.id;
    this.discountsAllowed.removeAt(index);
    if (id) {
      await this.fpS.deleteDiscount(id);
    }
  }
  patchDescription(index: number, code: string) {
    this.discountsAllowed.controls[index].patchValue({
      description: this.discountLists.find((x) => x.code == code)?.description,
    });
  }
}
