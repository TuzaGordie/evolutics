import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/Life/Setup/Product/life-setup-product-code/product-code-extras/product.service';

@Component({
  selector: 'app-policy-details-modal',
  templateUrl: './policy-details-modal.component.html',
  styleUrls: ['./policy-details-modal.component.scss'],
})
export class PolicyDetailsModalComponent implements OnInit {
  policy;
  product;

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private productsService: ProductService
  ) {
    this.policy = data.policy;
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.productsService
      .getProductByCode(this.policy.productCode)
      .subscribe(
        (res) =>
          (this.product = res?.basic
            ? { code: res?.basic?.code, description: res?.basic?.description }
            : null)
      );
  }
}
