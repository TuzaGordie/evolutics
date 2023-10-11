import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { configForms } from 'src/app/Shared/models/form.class';
import { FindProductService } from '../../../service/find-product.service';
import { IProductCode } from '../../product-code-extras/product-code.interface';
import { ProductService } from '../../product-code-extras/product.service';

@Component({
  selector: 'app-defaults-form',
  templateUrl: './defaults-form.component.html',
  styleUrls: ['./defaults-form.component.scss'],
})
export class DefaultsFormComponent implements OnInit {
  @Input()isShow: boolean;
  @Input()isEdit: boolean;
  @Input()isClone: boolean;
  @Input() isCreate: boolean;
  @Input() prodCode: string;
  @Input() product: IProductCode;
  @Input() form: FormGroup;

  constructor(public fpS: ProductService) {}

  ngOnInit(): void { 
  }
  initializeArrays(product = this.product) {
    this.benefitPaymentMethodAllowed.reset();
    if (this.isCreate) {
      this.addNewBenefitPaymentMethodAllowed();
    } else { 
      product?.defaults?.benefitPaymentMethodAllowed?.length?product?.defaults?.benefitPaymentMethodAllowed?.forEach((x) => this.addNewBenefitPaymentMethodAllowed(x)): this.addNewBenefitPaymentMethodAllowed();
      if (this.isShow) {
        this.form?.disable();
      }
    }
  }

 

  get benefitPaymentMethodAllowed() {
    return this.form.get('benefitPaymentMethodAllowed') as FormArray;
  }
  addNewBenefitPaymentMethodAllowed(
    code?,
    index: number = this.benefitPaymentMethodAllowed?.length || 0
  ) {
    const form = new FormGroup({
      code: configForms.default(),
    });
    if (code) form.patchValue({ code});
    this.benefitPaymentMethodAllowed.insert(index, form);
  }
  removeBenefitPaymentMethodAllowed(index: number) {
    this.benefitPaymentMethodAllowed.removeAt(index);
  }
}
