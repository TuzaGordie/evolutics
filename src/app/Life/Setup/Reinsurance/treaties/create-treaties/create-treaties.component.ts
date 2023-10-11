import { Component, OnInit, ViewChild } from '@angular/core';
import { Form } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilityService } from 'src/app/Services/utility.service';
import { ReinsuranceData } from '../reinsurance.interface';
import { ReinsuranceService } from '../reinsurance.service';

@Component({
  selector: 'app-create-treaties',
  templateUrl: './create-treaties.component.html',
  styleUrls: ['./create-treaties.component.scss'],
})
export class CreateSetupsReInsuranceTreatiesComponent implements OnInit {
  @ViewChild('f') form: Form;

  loading = false;
  loadingText = '';

  constructor(
    private reinsuranceService: ReinsuranceService,
    private utility: UtilityService
  ) {}

  public reinsurerCompany: any;
  public treatyDateBasis: any;
  public company: any;
  public reinsPremBasis: any;
  public reinsPremTable: any;
  public reinCommBasis: any;
  public treatyGroup: any;
  public sarBasis: any;
  public linkCoverProduct: any[] = [];
  public reinsCommTable: any;
  public treatyCategory: any;
  public profitSharingList: any;

  coverProductListProduct: any[] = [];
  coverProductListClass: any[] = [];

  public reinsuranceData: ReinsuranceData = {
    treaty: {
      profitSharingCode: '',
      reinsCommBasis: null,
      reinsCommRate: null,
      description: '',
      code: '',
      retention: null,
      reinsCommTable: '',
      catEventLimit: null,
      claimCashCall: null,
      category: '',
      declaredPremium: null,
      treatyDateBasis: '',
      actualPremium: null,
      treatyStartDate: '',
      reinsPremBasis: '',
      reinsPremTable: '',
      treatyEndDate: '',
      reverseReinsLapseSurr: false,
      slidingScaleComm: false,
      termOsClaimAmt: 0,
      provReinsCommRate: 0,
      // Added
      reinsCompany: '',
      treatyGroup: '',
      sarBasis: '',
      id: null,
      // declaredLimit: null,
      reinsPremRate: null,
    },
    treatyReinsCompany: [
      {
        id: null,
        lineNo: null,
        lowerLimit: null,
        noOfLines: null,
        proportion: null,
        reinsCompanyId: null,
        reinsCompanyShare: null,
        upperLimit: 1,
      },
    ],
    treatyAgent: [
      {
        id: null,
        proportion: null,
        reinsAgentNo: '',
      },
    ],
    treatyCovers: [
      {
        id: null,
        coverCode: '',
        linkDate: '',
        prodClass: '',
        productCode: '',
      },
    ],
  };

  disableCodeEdit: boolean = false;

  ngOnInit(): void {
    this.reinsuranceService.geProfitCodeAndDescription().subscribe((res) => {
      this.profitSharingList = res;
    });
    this.reinsuranceService
      .getProviderNoAndFullNameByProviderSubcat('RI')
      .subscribe((res: any) => {
        this.reinsurerCompany = res;
      });
    this.reinsuranceService
      .getGeneralRateCodeAndDescriptionByCategory('C')
      .subscribe((res: any) => {
        this.reinsCommTable = res;
      });
    this.reinsuranceService
      .getCodeAndTitleByCodeSubgroup('TREATY_CATEGORY')
      .subscribe((res: any) => {
        this.treatyCategory = res;
      });
    this.reinsuranceService
      .getCodeAndTitleByCodeSubgroup('TREATY_DATE_BASIS')
      .subscribe((res: any) => {
        this.treatyDateBasis = res;
      });
    this.reinsuranceService
      .getCodeAndTitleByCodeSubgroup('REINS_COMM_BASIS')
      .subscribe((res: any) => {
        this.reinCommBasis = res;
      });
    this.reinsuranceService
      .getCodeAndTitleByCodeSubgroup('TREATY_GROUP')
      .subscribe((res: any) => {
        this.treatyGroup = res;
      });

    this.reinsuranceService
      .getCodeAndTitleByCodeSubgroup('REINS_PREM_BASIS')
      .subscribe((res: any) => {
        this.linkCoverProduct = res;
      });
    this.reinsuranceService
      .getCodeAndTitleByCodeSubgroup('SAR_BASIS')
      .subscribe((res: any) => {
        this.sarBasis = res;
      });
    this.reinsuranceService
      .getGeneralRateCodeAndDescriptionByCategory('R')
      .subscribe((res: any) => {
        this.reinsPremTable = res;
      });
    this.reinsuranceService
      .getCodeAndTitleByCodeSubgroup('REINS_PREM_BASIS')
      .subscribe((res: any) => {
        this.reinsPremBasis = res;
      });
    this.reinsuranceService
      .getCompanyCodeAndDescription()
      .subscribe((res: any) => {
        this.company = res;
      });

    var showTreaty: ReinsuranceData = JSON.parse(
      localStorage.getItem('showTreaty')
    );
    var cloneTreaty: ReinsuranceData = JSON.parse(
      localStorage.getItem('cloneTreaty')
    );

    if (cloneTreaty != null) {
      this.reinsuranceData = cloneTreaty;
      delete this.reinsuranceData.treaty.id;
      delete this.reinsuranceData.treaty.code;

      this.reinsuranceBroker = [];
      this.linkCovers = [];
      this.reinsuranceCompanies = [];

      this.reinsuranceData.treatyAgent.map((treatyAgent) => {
        delete treatyAgent.id,
          this.reinsuranceBroker.push({
            id: null,
            rowId: this.reinsuranceBroker.length + 1,
            proportion: treatyAgent.proportion,
            reinsAgentNo: treatyAgent.reinsAgentNo,
          });
      });

      this.reinsuranceService
        .getProductCoverCodeAndDescription()
        .subscribe((res: any) => {
          this.linkCoverProduct = res;

          this.reinsuranceData.treatyCovers.map((treatyCovers) => {
            delete treatyCovers.id;

            this.linkCovers.push({
              id: null,
              rowId: this.linkCovers.length + 1,
              prodClass: treatyCovers.prodClass,
              productCode: treatyCovers.productCode,
              coverCode: treatyCovers.coverCode,
            });
            this.modelChangeFRiskClassValue(treatyCovers.prodClass);
            this.modelChangeFProductValue(treatyCovers.productCode);
          });
        });

      this.reinsuranceData.treatyReinsCompany.map((treatyReinsCompany) => {
        delete treatyReinsCompany.id,
          this.reinsuranceCompanies.push({
            id: null,
            rowId: this.reinsuranceCompanies.length + 1,
            lineNo: treatyReinsCompany.lineNo,
            reinsCompanyId: treatyReinsCompany.reinsCompanyId,
            lowerLimit: treatyReinsCompany.lowerLimit,
            upperLimit: treatyReinsCompany.upperLimit,
            noOfLines: treatyReinsCompany.noOfLines,
            proportion: treatyReinsCompany.proportion,
            reinsCompanyShare: treatyReinsCompany.reinsCompanyShare,
          });
      });

      localStorage.removeItem('cloneTreaty');
    }

    if (showTreaty != null) {
      this.reinsuranceData = showTreaty;

      this.disableCodeEdit = true;

      this.reinsuranceBroker = [];
      this.linkCovers = [];
      this.reinsuranceCompanies = [];

      this.reinsuranceData.treatyAgent.map((treatyAgent) => {
        this.reinsuranceBroker.push({
          id: treatyAgent.id,
          rowId: this.reinsuranceBroker.length + 1,
          proportion: treatyAgent.proportion,
          reinsAgentNo: treatyAgent.reinsAgentNo,
        });
      });

      this.reinsuranceService
        .getProductCoverCodeAndDescription()
        .subscribe((res: any) => {
          this.linkCoverProduct = res;

          this.reinsuranceData.treatyCovers.map((treatyCovers) => {
            this.linkCovers.push({
              id: treatyCovers.id,
              rowId: this.linkCovers.length + 1,
              prodClass: treatyCovers.prodClass,
              productCode: treatyCovers.productCode,
              coverCode: treatyCovers.coverCode,
            });
            this.modelChangeFRiskClassValue(treatyCovers.prodClass);
            this.modelChangeFProductValue(treatyCovers.productCode);
          });
        });

      this.reinsuranceData.treatyReinsCompany.map((treatyReinsCompany) => {
        this.reinsuranceCompanies.push({
          id: treatyReinsCompany.id,
          rowId: this.reinsuranceCompanies.length + 1,
          lineNo: treatyReinsCompany.lineNo,
          reinsCompanyId: treatyReinsCompany.reinsCompanyId,
          lowerLimit: treatyReinsCompany.lowerLimit,
          upperLimit: treatyReinsCompany.upperLimit,
          noOfLines: treatyReinsCompany.noOfLines,
          proportion: treatyReinsCompany.proportion,
          reinsCompanyShare: treatyReinsCompany.reinsCompanyShare,
        });
      });

      localStorage.removeItem('showTreaty');
    }
  }

  public linkCovers: any = [
    { id: null, rowId: null, prodClass: '', productCode: '', coverCode: '' },
  ];

  public reinsuranceCompanies = [
    {
      id: null,
      lineNo: 1,
      lowerLimit: null,
      noOfLines: null,
      proportion: null,
      reinsCompanyId: null,
      reinsCompanyShare: 100,
      rowId: null,
      upperLimit: null,
    },
  ];

  public reinsuranceBroker: any = [
    {
      id: null,
      rowId: null,
      proportion: 100,
      reinsAgentNo: '',
    },
  ];

  public slidingStateCommission = { provReinCommRate: 0, termOsClaimAmt: 0 };

  addReinsuranceCompanies(
    index: number = this.reinsuranceCompanies?.length || 0
  ) {
    this.reinsuranceCompanies.splice(index, 0, {
      id: null,
      lineNo: index + 1,
      lowerLimit: null,
      noOfLines: null,
      proportion: null,
      reinsCompanyId: null,
      reinsCompanyShare: 100,
      rowId: this.reinsuranceCompanies.length + 1,
      upperLimit: null,
    });
  }

  addReinsuranceBroker() {
    this.reinsuranceBroker.push({
      id: null,
      rowId: this.reinsuranceBroker.length + 1,
      proportion: 100,
      reinsAgentNo: '1',
    });
  }

  addLinkCover() {
    this.linkCovers.push({
      id: null,
      rowId: this.linkCovers.length + 1,
      prodClass: '',
      productCode: '',
      coverCode: '',
    });
  }

  submitReinsuranceCompanies() {
    this.reinsuranceData.treatyReinsCompany = this.reinsuranceCompanies as any;
  }

  submitBroker() {
    this.reinsuranceData.treatyAgent = this.reinsuranceBroker;
  }

  submitProductCovers() {
    this.reinsuranceData.treatyCovers = this.linkCovers;
  }

  deleteLinkCover(i) {
    this.linkCovers.splice(i, 1);
  }
  deleteReinsuranceBroker(i) {
    this.reinsuranceBroker.splice(i, 1);
  }

  deleteReinsuranceCompanies(i: number) {
    this.reinsuranceCompanies.splice(i, 1);
  }

  modelChangeFRiskClassValue(value: any) {
    this.reinsuranceService
      .getProductCodeAndDescriptionByBusLineAndProductClass(value, 'L')
      .subscribe((res: any) => {
        this.coverProductListClass = res;
      });
  }

  modelChangeFProductValue(value: any) {
    this.reinsuranceService
      .getProductCoverCodesBasicAndDescriptionByProductCode(value)
      .subscribe((res: any) => {
        this.coverProductListProduct = res;
      });
  }

  parseDate(dateString: any): Date {
    console.log('dateString', dateString);
    // if (dateString) {
    //   return new Date(dateString);
    // }
    return null;
  }

  createReinsuranceWithData() {
    this.loading = true;
    this.loadingText = 'Saving Treaty.....';
    this.reinsuranceService.createTreaty(this.reinsuranceData).subscribe(
      (data: ReinsuranceData) => {
        this.loading = false;
        this.reinsuranceData.treaty.code = data.treaty.code;
        this.utility.notify('Treaty saved successfully', 1, 5000);
      },
      () => {
        this.loading = false;
        this.utility.notify('Internal server error', 0, 5000);
      }
    );
  }
}
