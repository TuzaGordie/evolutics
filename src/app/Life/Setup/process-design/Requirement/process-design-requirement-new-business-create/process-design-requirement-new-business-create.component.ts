import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { ProcessService } from 'src/app/Services/process.service';
import { ProductService } from 'src/app/Services/cash/product.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { Codes } from 'src/app/Shared/models/life/setup/codes/Codes';
import {
  CreateProcessNb,
  ProcessClaim,
  ProcessClaimReq,
  ProcessNb,
  ProcessNbBand,
  ProcessNbReq,
} from '../process-requirement';
import { PageTemplateComponent } from 'src/app/Shared/components/page-template/page-template.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-process-design-requirement-new-business-create',
  templateUrl:
    './process-design-requirement-new-business-create.component.html',
  styleUrls: [
    './process-design-requirement-new-business-create.component.scss',
  ],
})
export class ProcessDesignRequirementNewBusinessCreateComponent
  extends PageTemplateComponent
  implements OnInit {
  private nbofclaim: number = 2;
  private nbofclaim2: number = 2;

  companies: any[] = [];
  productClasses: any[] = [];
  products: any[] = [];
  groupConds: any[] = [];
  bandNos: any[] = [];
  nbReqs: any[] = [];
  nbReqDesc: any[] = [[]];


  processNb = new ProcessNb();
  processNbReq = new ProcessNbReq();
  processNbBand = new ProcessNbBand();
  createProcessNb = new CreateProcessNb(
    this.processNb,
    [this.processNbReq],
    [this.processNbBand]
  );

  bandNo: number;
  loading = false;
  loadingText = '';
  @ViewChild('f') form: NgForm;
  constructor(
    private companyService: CompanyService,
    private processService: ProcessService,
    public utility: UtilityService,
    private codeService: CodeService,
    private productService: ProductService,
    public route: ActivatedRoute
  ) {
    super(route, utility);
  }

  ngOnInit(): void {
    this.companyService.getCompanyCodeAndDesc().subscribe((data: any) => {
      this.companies = data;
    });

    this.codeService
      .getCodesByCodeSubGroup('PRODUCT_CLASS')
      .subscribe((data: any) => {
        this.productClasses = data;
      });

    this.codeService
      .getCodesByCodeSubGroup('GROUP_CONDITION')
      .subscribe((data: any) => {
        this.groupConds = data;
      });

    this.codeService.getCodesByCodeSubGroup('NB_REQ').subscribe((data: any) => {
      this.nbReqs = data;
    });

    this.route.queryParams.subscribe((params) => {
      const code = params.code;
      if (code != null && !this.isCreate) {
        this.fetchProcessNb(code);
      }
    });
  }

  fetchProcessNb(code: string) {
    this.loading = true;
    this.loadingText = 'Fetching Process New Business...';
    this.processService.fetchProcessNbByCode(code).subscribe(
      (data: CreateProcessNb) => {
        this.loading = false;



        this.createProcessNb.processNb = data.processNb;

        if (this.isClone) {
          delete this.createProcessNb.processNb.code;
          delete this.createProcessNb.processNb.id;
        }

        this.createProcessNb.processNbBand = [];
        this.createProcessNb.processNbReq = [];

        data.processNbBand.map((processNbBand) => {
          if (this.isClone) delete processNbBand.id;
          processNbBand.rowId = this.createProcessNb.processNbBand.length + 1;
          processNbBand.bandNo = this.createProcessNb.processNbBand.length + 1;
          this.createProcessNb.processNbBand.push(processNbBand);
        });

        data.processNbReq.map((processNbReq, i) => {
          if (this.isClone) delete processNbReq.id;
          processNbReq.rowId = this.createProcessNb.processNbReq.length + 1;
          this.createProcessNb.processNbReq.push(processNbReq);

          this.selectClaimReqCodesDesc(i);
        });

        if (this.createProcessNb.processNbReq.length < 1) this.addReq();
        if (this.createProcessNb.processNbBand.length < 1) this.addBand();

        this.getProductCodes();
      },
      () => {
        this.loading = false;
        this.utility.notify('Unable to find Process NB!.', 0);
      }
    );
  }

  getProductCodes() {
    this.productService
      .getProductCodeAndDescByProductCodeByProductsClass(
        this.createProcessNb.processNb.productClass
      )
      .subscribe((data: any) => {
        this.products = data;
      });
  }

  selectClaimReqCodesDesc(i: number) {
    var req = this.nbReqs.find(
      (req) => req.code == this.createProcessNb.processNbReq[i].nbReq
    );
    this.createProcessNb.processNbReq[i].description = req.title;
  }

  addReq(i = this.createProcessNb.processNbReq?.length || 0) {
    var processNbReq = new ProcessNbReq();
    processNbReq.rowId = this.createProcessNb.processNbReq.length + 1;
    this.createProcessNb.processNbReq.splice(i, 0, processNbReq);
  }

  removeReq(i: number) {
    if (this.createProcessNb.processNbReq[i].id == null)
      this.createProcessNb.processNbReq.splice(i, 1);
    else {
      if (
        this.utility.confirm(
          'Do you want to delete this process new business req?'
        )
      ) {
        this.processService
          .deleteProcessNbReqById(this.createProcessNb.processNbReq[i].id)
          .subscribe(
            (data: any) => {
              this.utility.notify(
                'Process new business req deleted successfully!.',
                1
              );
            },
            () => {
              this.utility.notify(
                'Unable to delete process new business req!.',
                0
              );
            }
          );
      }
    }
  }

  addBand() {
    var processNbBand = new ProcessNbBand();
    processNbBand.rowId = this.createProcessNb.processNbBand.length + 1;
    processNbBand.bandNo = this.createProcessNb.processNbBand.length + 1;
    this.createProcessNb.processNbBand.push(processNbBand);
  }

  removeBand(i: number) {
    if (this.createProcessNb.processNbBand[i].id == null) {
      this.createProcessNb.processNbBand.splice(i, 1);

      this.createProcessNb.processNbBand.map((band, i) => {
        band.bandNo = i + 1;
        return band;
      });
    } else {
      if (
        this.utility.confirm(
          'Do you want to delete this process new business band?'
        )
      ) {
        this.processService
          .deleteProcessNbBandById(this.createProcessNb.processNbBand[i].id)
          .subscribe(
            (data: any) => {
              this.utility.notify(
                'Deleted process new business band successfully!.',
                1
              );
            },
            () => {
              this.utility.notify(
                'Unable to delete process new business band!.',
                0
              );
            }
          );
      }
    }
  }

  saveProcessNb() {
    this.loading = true;
    this.loadingText = 'Saving Process New Business...';

    if (!this.createProcessNb.processNb.banded) this.createProcessNb.processNbBand = []
    
    this.createProcessNb.processNbReq.map((processNbReq) => {
      processNbReq.bandNo = this.bandNo;
      return processNbReq;
    });

    this.processService.saveProcessNb(this.createProcessNb).subscribe(
      (data: any) => {
        this.loading = false;
        this.createProcessNb = data;
        this.utility.info(
          'Process new Business saved successfully!.',
          1,
          this.createProcessNb.processNb.code
        );
      },
      () => {
        this.loading = false;
        this.utility.info('Unable to save process new business!.', 0);
      }
    );
  }
}
