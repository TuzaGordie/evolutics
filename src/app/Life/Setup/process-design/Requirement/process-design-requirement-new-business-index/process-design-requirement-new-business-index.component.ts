import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/Services/cash/product.service';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { ProcessService } from 'src/app/Services/process.service';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-process-design-requirement-new-business-index',
  templateUrl: './process-design-requirement-new-business-index.component.html',
  styleUrls: ['./process-design-requirement-new-business-index.component.scss']
})
export class ProcessDesignRequirementNewBusinessIndexComponent implements OnInit {

  companies: any[] = []
  productCodes: any[] = []
  productClasses: any[] = []
  processCodes: any[] = []

  company: string
  processCode: string
  productClass: string
  productCode: string

  loading = false
  loadingText = ""

  constructor(
    private processService: ProcessService,
    private router: Router,
    private route: ActivatedRoute,
    private utility: UtilityService,
    private companyService: CompanyService,
    private codeService: CodeService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.companyService.getCompanyCodeAndDesc()
    .subscribe((data: any) => {
      this.companies = data
    })

    this.codeService.getCodesByCodeSubGroup("PRODUCT_CLASS")
      .subscribe((data: any) => {
        this.productClasses = data
      })
  }
  

  getProductClass() {
    this.processService.getProcessNbProductClass(this.company)
      .subscribe((data: any) => {
        this.productClasses = data
      })
  }

  getProducts() {
    this.productService.getProductCodeAndDescByProductCodeByProductsClass(this.productClass)
      .subscribe((data: any) => {
        this.productCodes = data
      })
  }

  getProcessCodes() {
    this.processService.getProcessNbProcerssCodeAndDescription(this.productCode)
      .subscribe((data: any) => {
        this.processCodes = data
      })
  }

  fetchProcessNb(action: string) {
    if (this.processCode.length > 0) {
      this.router.navigate(
        [`../${action}`],
        {
          queryParams: {
            code: this.processCode
          },
          relativeTo: this.route
        }
      )
    } else {
      this.utility.notify("Select a Process Code to continue.", 2)
    }
  }

  show() {
    if (!this.processCode) return;
    this.fetchProcessNb("show")
  }

  clone() {
    if (!this.processCode) return;
    this.fetchProcessNb("clone")
  }
}
