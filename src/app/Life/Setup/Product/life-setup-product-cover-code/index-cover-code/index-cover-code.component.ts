import { Component, OnInit } from '@angular/core';
import { FindProductService } from '../../service/find-product.service';
import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-index-cover-code',
  templateUrl: './index-cover-code.component.html',
  styleUrls: ['./index-cover-code.component.scss']
})
export class IndexCoverCodeComponent implements OnInit {

  setUpCoverBasisForm: any = FormGroup
  coversList: any = []; 
  insuranceTypeList: any = [];
  productClassList: any = []
  productCovers: any = []
  products: any = []

  insuranceType: string
  cover: string

  selectedProdCode = ''
  covers: any[];

  constructor(private utility: UtilityService, private router: Router, private route: ActivatedRoute, public findProductService: FindProductService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setInsuranceType()
    this.findProductService.getProductCovers().subscribe(r=>this.covers=r)
  }

  setInsuranceType() {
    this.findProductService.getInsuranceType('INS_TYPE').subscribe(res => {
      this.insuranceTypeList = res;
    })
  }

  onSelectInsuranceType() {
    this.findProductService.getProductCoversByInsuranceType(this.insuranceType).subscribe(res => {
      this.productCovers = res
    })
  }

  show(){
    if (this.cover?.length > 0) {
      this.router.navigate(
        ["show"],
        {
          queryParams: {
            code: this.cover
          },
          relativeTo: this.route
        }
      )
    } else {
      this.utility.notify("Select a Cover Code to continue.", 2)
    }
  }

  clone(){
    if (this.cover?.length > 0) {
      this.router.navigate(
        ["clone"],
        {
          queryParams: {
            code: this.cover
          },
          relativeTo: this.route
        }
      )
    } else {
      this.utility.notify("Select a Cover Code to continue.", 2)
    }
  }
}
