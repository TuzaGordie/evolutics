import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/Services/cash/product.service';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { ProcessService } from 'src/app/Services/process.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { PageTemplateComponent } from 'src/app/Shared/components/page-template/page-template.component';
import {
  CreateProcessClaim,
  ProcessClaim,
  ProcessClaimBand,
  ProcessClaimReq,
  ProcessNbReq,
} from '../process-requirement';

@Component({
  selector: 'app-process-design-requirement-claim-create',
  templateUrl: './process-design-requirement-claim-create.component.html',
  styleUrls: ['./process-design-requirement-claim-create.component.scss'],
})
export class ProcessDesignRequirementClaimCreateComponent
  extends PageTemplateComponent
  implements OnInit {
  @ViewChild('f') form: NgForm;
  private nbofclaim: number = 1;
  private nbofclaim2: number = 1;

  loading = false;
  loadingText = '';
  editMode = true;
  showEditButton = false;

  nonCreateMode = false;

  processClaim = new ProcessClaim();
  processClaimBand = new ProcessClaimBand();
  createProcessClaim = new CreateProcessClaim(
    this.processClaim,
    [this.processClaimBand],
    [new ProcessClaimReq()]
  );

  companies: any[] = [];
  claimTypes: any[] = [];
  productFilters: any[] = [];
  productClasses: any[] = [];
  groupConds: any[] = [];
  bandNos: any[] = [];
  claimReqCodes: any[] = [];
  claimReqCodesDesc: any[] = [[]];

  bandNo: number;

  constructor(
    public route: ActivatedRoute,
    public utility: UtilityService,
    private companyService: CompanyService,
    private codeService: CodeService,
    private productService: ProductService,
    private processService: ProcessService
  ) {
    super(route, utility);
  }

  ngOnInit(): void {
    this.companyService.getCompanyCodeAndDesc().subscribe((data: any) => {
      this.companies = data;
    });

    this.codeService
      .getCodesByCodeSubGroup('CLAIM_TYPE')
      .subscribe((data: any) => {
        this.claimTypes = data;
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

    this.codeService
      .getCodesByCodeSubGroup('CLAIM_REQ')
      .subscribe((data: any) => {
        this.claimReqCodes = data;
      });

    // this.route.queryParams
    //   .subscribe(
    //     params => {
    //       const code = params.code
    //       const action = params.action
    //       if (code != null && action != null) {
    //         this.editMode = false; // if show or clone disable all fields until edit button is clicked
    //         this.showEditButton = true;
    //         this.fetchProcessClaim(action, code)
    //       }
    //     }
    //   )

    super.init(async () => {
      if (this.code) {
        await this.fetchProcessClaim(this.code);
        this.loading = false;
        if (this.isShow) this.form.form.disable();
      }
    });
  }

  async fetchProcessClaim(code: string) {
    this.loading = true;
    this.loadingText = 'Fetching Process requirements claim....';
    return this.processService
      .getProcessClaimByProcessCode(code)
      .toPromise()
      .then((data: CreateProcessClaim) => {
        this.loading = false;
        if (this.isShow) {
          this.createProcessClaim.processClaim = data.processClaim;

          this.createProcessClaim.processClaimBand = [];
          this.createProcessClaim.processClaimReq = [];

          data.processClaimBand.map((processClaimBand) => {
            processClaimBand.rowId =
              this.createProcessClaim.processClaimBand.length + 1;
            processClaimBand.bandNo =
              this.createProcessClaim.processClaimBand.length + 1;
            this.createProcessClaim.processClaimBand.push(processClaimBand);
          });

          data.processClaimReq.map((processClaimReq, i) => {
            processClaimReq.rowId =
              this.createProcessClaim.processClaimReq.length + 1;
            this.createProcessClaim.processClaimReq.push(processClaimReq);

            this.selectClaimReqCodesDesc(i, processClaimReq.rowId);
          });

          if (this.createProcessClaim.processClaimReq.length < 1) this.addReq();
          if (this.createProcessClaim.processClaimBand.length < 1)
            this.addBand();

          this.selectProductFilterByProductClass();
        }
        if (this.isClone) {
          this.createProcessClaim.processClaim = data.processClaim;
          delete this.createProcessClaim.processClaim.id;
          delete this.createProcessClaim.processClaim.code;

          this.createProcessClaim.processClaimBand = [];
          this.createProcessClaim.processClaimReq = [];

          data.processClaimBand.map((processClaimBand) => {
            delete processClaimBand.id;
            processClaimBand.rowId =
              this.createProcessClaim.processClaimBand.length + 1;
            processClaimBand.bandNo =
              this.createProcessClaim.processClaimBand.length + 1;
            this.createProcessClaim.processClaimBand.push(processClaimBand);
          });

          data.processClaimReq.map((processClaimReq, i) => {
            delete processClaimReq.id;
            processClaimReq.rowId =
              this.createProcessClaim.processClaimReq.length + 1;
            this.createProcessClaim.processClaimReq.push(processClaimReq);

            this.selectClaimReqCodesDesc(i, processClaimReq.rowId);
          });

          if (this.createProcessClaim.processClaimReq.length < 1) this.addReq();
          if (this.createProcessClaim.processClaimBand.length < 1)
            this.addBand();

          this.selectProductFilterByProductClass();
        }
      })
      .catch((err) =>
        this.utility.notify('Unable to find Process Claim', 0, 3000)
      );
  }

  runBanded() {
    if (this.createProcessClaim.processClaim.banded) {
      this.addBand()
    } else {
      this.createProcessClaim.processClaimBand = []
    }
  }

  selectProductFilterByProductClass() {
    this.productService
      .getProductCodeAndDescByProductCodeByProductsClass(
        this.createProcessClaim.processClaim.prodClass
      )
      .subscribe((data: any) => {
        this.productFilters = data;
      });
  }

  selectClaimReqCodesDesc(i: number, rowId: number) {
    this.claimReqCodesDesc[rowId] = this.claimReqCodes.filter(
      (req) => req.code == this.createProcessClaim.processClaimReq[i].claimReq
    );
  }

  addBand() {
    var processClaimBand = new ProcessClaimBand();
    processClaimBand.rowId =
      this.createProcessClaim.processClaimBand.length + 1;
    processClaimBand.bandNo =
      this.createProcessClaim.processClaimBand.length + 1;
    this.createProcessClaim.processClaimBand.push(processClaimBand);
  }

  removeBand(i: number) {
    if (this.createProcessClaim.processClaimBand[i].id == null)
      this.createProcessClaim.processClaimBand.splice(i, 1);
    else {
      if (
        this.utility.confirm(
          'Do you want to delete this process claim band id: ' +
          this.createProcessClaim.processClaimBand[i].id +
          '?'
        )
      ) {
        this.processService
          .deleteProcessClaimBandById(
            this.createProcessClaim.processClaimBand[i].id
          )
          .subscribe(
            () => {
              this.utility.notify(
                'Process claim band has been deleted successfully',
                1
              );
            },
            () => {
              this.utility.notify('Unable to delete process claim band', 0);
            }
          );
      }
    }
  }

  addReq() {
    var processClaimReq = new ProcessClaimReq();
    processClaimReq.rowId = this.createProcessClaim.processClaimReq.length + 1;
    this.createProcessClaim.processClaimReq.push(processClaimReq);
  }

  removeReq(i: number) {
    if (this.createProcessClaim.processClaimReq[i].id == null)
      this.createProcessClaim.processClaimReq.splice(i, 1);
    else {
      if (
        this.utility.confirm(
          'Do you want to delete this process claim band id: ' +
          this.createProcessClaim.processClaimReq[i].id +
          '?'
        )
      ) {
        this.processService
          .deleteProcessClaimReqById(
            this.createProcessClaim.processClaimReq[i].id
          )
          .subscribe(
            () => {
              this.utility.notify(
                'Process claim req has been deleted successfully',
                1
              );
            },
            () => {
              this.utility.notify('Unable to delete process claim requirement!', 0);
            }
          );
      }
    }
  }

  saveProcessClaim() {
    this.loading = true;
    this.loadingText = 'Saving Process requirements claim....';

    if (!this.createProcessClaim.processClaim.banded) this.createProcessClaim.processClaimBand = []

    this.createProcessClaim.processClaimReq.map((processClaimReq) => {
      processClaimReq.bandNo = this.bandNo;
    });

    this.processService.saveProcessReqClaim(this.createProcessClaim).subscribe(
      (data: any) => {
        this.loading = false;
        this.createProcessClaim.processClaim = data.processClaim;

        this.createProcessClaim.processClaimBand = [];
        this.createProcessClaim.processClaimReq = [];

        data.processClaimBand.map((processClaimBand) => {
          processClaimBand.rowId =
            this.createProcessClaim.processClaimBand.length + 1;
          processClaimBand.bandNo =
            this.createProcessClaim.processClaimBand.length + 1;
          this.createProcessClaim.processClaimBand.push(processClaimBand);
        });

        data.processClaimReq.map((processClaimReq, i) => {
          processClaimReq.rowId =
            this.createProcessClaim.processClaimReq.length + 1;
          this.createProcessClaim.processClaimReq.push(processClaimReq);

          this.selectClaimReqCodesDesc(i, processClaimReq.rowId);
        });

        if (this.createProcessClaim.processClaimReq.length < 1) this.addReq();
        if (this.createProcessClaim.processClaimBand.length < 1) this.addBand();

        this.selectProductFilterByProductClass();
        this.utility.info(
          'Process requirements claim created successfully!',
          1,
          this.createProcessClaim.processClaim.code
        );
      },
      () => {
        this.loading = false;
        this.utility.info('Unable to create process requirements claim', 0);
      }
    );
  }

  setProcessClaimReqDescription(processClaimReq) {
    processClaimReq.description = this.claimReqCodes.find(
      (item) => item.code == processClaimReq.claimReq
    )?.title;
  }

  onProcessClaimReqChange(i, processClaimReq) {
    this.selectClaimReqCodesDesc(i, processClaimReq.rowId);
    this.setProcessClaimReqDescription(processClaimReq);
  }
}
