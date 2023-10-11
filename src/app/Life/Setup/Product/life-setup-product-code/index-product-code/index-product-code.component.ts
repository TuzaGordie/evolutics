import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { FindProductService } from '../../service/find-product.service';
import { ProductService } from '../product-code-extras/product.service';
@Component({
  selector: 'app-index-product-code',
  templateUrl: './index-product-code.component.html',
  styleUrls: ['./index-product-code.component.scss'],
})
export class IndexProductCodeComponent implements OnInit {
  form = new FormGroup({
    insuranceType: new FormControl(),
    prodClass: new FormControl(),
    prod: configForms.required(),
  });
  insuranceTypes: any[];
  constructor(public productS: ProductService, public uS: UtilityService) {}

  ngOnInit(): void {
    this.setInsuranceType();
  }
  get selectedProdCode() {
    return this.form.value.prod;
  } 
  setInsuranceType() {
    this.productS.getInsuranceType('INS_TYPE').subscribe((res) => {
      this.insuranceTypes = res;
      console.log('Insurance Type', res);
    });
  }
 
}
