import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FindQuotationService } from '../service/find-quotation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeStatusComponent } from '../change-status/change-status.component';
import { AuthoriseQuoteComponent } from '../authorise-quote/authorise-quote.component';
import {
  BtnLg,
  FKVP,
  IBtn,
  ICodeDescription,
  KVP,
  TableCol,
} from 'src/app/Shared/models/index.model';
import { ICover } from 'src/app/Shared/models/covers/cover.interface';
import { PDService } from '../../policy-desk/policy-desk-extras/policy-desk.service';
import { PolicyEndpointsService } from '../../policy-desk/policy-desk-extras/policy-endpoints.service';
import { HtmlerService } from 'src/app/Services/htmler.service';
import { StorageService } from 'src/app/Services/storage.service';
import { StatusService } from 'src/app/Services/status.service';
import { AgentService } from 'src/app/Services/agent.service';
import { ClientService } from 'src/app/Services/client.service';
import { IPolicy } from '../../policy-desk/policy-desk-extras/policy-desk.model';
import { AgentListModalComponent } from '../../life-components/agent-list-modal/agent-list-modal.component';
import { ChangeStatusModalComponent } from '../../policy-desk/policy-desk-pages-2/policy-total-payments-outward/change-status-modal/change-status-modal.component';
import { IQuotation } from '../quotation-desk-extras/quotation-desk.interface';
import { QuotationService } from '../../services/quotation-service.service';
import { DecimalPipe } from '@angular/common';
import { UtilityService } from 'src/app/Services/utility.service';
import { AppService } from 'src/app/Services/app.service';

@Component({
  selector: 'app-view-quotation',
  templateUrl: './view-quotation.component.html',
  styleUrls: ['./view-quotation.component.scss'],
})
export class LifeViewQuotationComponent implements OnInit {
  viewQuotationForm: FormGroup;
  readonlyValue: any;
  quotationInfoList: any = [];

  description: any;

  quoteNo: any;
  clientNo: any = '';
  productCode: any;
  tableLoading: boolean;
  loading: boolean;

  editbankNo = () => {
    this.uS.$('#editbank').modal('show');
  };
  openAgentListDialog = () => {
    this.uS.dialogOpener(
      AgentListModalComponent,
      {
        data: { number: this.policyNo },
        width: 'auto',
        minWidth: '40%',
      },
      (r) => {
        // this.init();
      }
    );
  };

  lbls1: FKVP[] = [
    new FKVP('quoteNo', 'Quote No'),
    new FKVP('policyNo', 'Policy No'),
    new FKVP('policyCode', 'Policy Code'),
  ];
  lbls2: FKVP[] = [
    new FKVP('productCode', 'Product Code'),
    new FKVP('pdsc', 'Product Description'),
    new FKVP('owner', 'Owner'),
    new FKVP('jointOwnerName', 'Joint Owner', true, '', 'text'),
    new FKVP(
      'primaryAgent',
      'Agent',
      true,
      null,
      null,
      null,
      this.openAgentListDialog
    ),
    new FKVP('referrerNo', 'Referrer', true),
    new FKVP('commenceDate', 'Cover Commence', true, '', 'date'),
    new FKVP('renewalDueOn', 'Cover Expires'),
    new FKVP('createdBy', 'Created By'),
    new FKVP('currency', 'Currency'),
    new FKVP(
      'quoteValidDays',
      'Initial Quote Valid Days',
      null,
      null,
      'text',
      'Outstanding Target Contributions'
    ),
    new FKVP('totalSar', 'Total Sum at Risk'),
    new FKVP('annualisedPremium', 'Annualised Premium'),
    new FKVP('premPayTermMo', 'Premium Payment Term'),
    new FKVP('policyTermDays', 'Policy Term'),
    new FKVP('createdOn', 'Created On', true),
    new FKVP('branchCode', 'Branch'),
    new FKVP(
      'payinMethod',
      'Prem. Payment Method',
      null,
      null,
      'text',
      'Annuities'
    ),
    new FKVP('noOfLives', 'Total No of Lives Covered'),
    new FKVP('convertreason', 'Convert Reason'),
    new FKVP('companyCode', 'Company', true),
    new FKVP('inSuspense', 'Suspense', false),
  ];
  lbls3 = [new FKVP('quoteStatus', 'Status')];
  dCols: TableCol[] = [];
  btns1: MIBtn[] = [];

  btns2: IBtn[] = [];

  sampleObj = {
    QUOTE_NO: Math.floor(Math.random() * 10),
    AGENT_NAME: 'Random_Name',
    NO_OF_LIVES_COVERED: Math.floor(Math.random() * 10),
    ITERATIONS: Math.floor(Math.random() * 10),
    DAYS_TO_SLA: Math.floor(Math.random() * 20),
    CREATED_DATE_FROM: 'January, 2021',
    UNCOVERED_EXPOSURE: 'Random_value',
    INITIAL_SUM_ASSURED: 'Random_value',
    SUM_ASSURED: 'Random_value',
    ISSUED_DATE: 'March 2022',
    NEXT_PREM_DUE_DATE: 'March 2023',
  };

  quotation: any;
  outPolicy: IPolicy;
  policyStatus = new FKVP('policyStatus', 'Policy Status', true);
  policyCodes: any[];
  policyNo: any;
  policyCode: any;
  suffix: any;
  covers: ICover[];
  showPager: boolean;
  statuses: ICodeDescription[];
  tableLimit = 10;

  constructor(
    public findQuotationService: FindQuotationService,
    public qs: QuotationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public pS: PDService,
    public uS: UtilityService,
    public peS: PolicyEndpointsService,
    public hS: HtmlerService,
    public sS: StorageService,
    public stS: StatusService,
    public aS: AgentService,
    public cS: ClientService,
    public dP: DecimalPipe,
    public appS: AppService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(async (queryMap) => {
      if (queryMap.has('quoteNo')) {
        this.quoteNo = queryMap.get('quoteNo');
      }
    });

    this.getQuotations();
    this.getQuotationCover();

    try {
      this.init();
    } catch (e) {
      this.uS.notify(e, 0);
      this.uS.back();
    }
  }

  refetch() {
    this.init();
  }

  openStatusDialog = () => {
    this.uS.dialogOpener(
      ChangeStatusModalComponent,
      {
        data: {
          status: this.viewQuotationForm.value.policyStatus,
          options: this.statuses,
        },
        width: 'auto',
        minWidth: '40%',
      },
      (r) => {
        this.init();
      }
    );
  };

  async init() {
    this.loading = true;
    this.quotation = await this.findQuotationService.getQuote(this.quoteNo);
    this.quotation.totalSar = Number.isFinite(this.quotation.totalSar)
      ? this.dP.transform(this.quotation.totalSar, '1.2-2', 'en')
      : this.quotation.totalSar;
    this.quotation.inSuspense = Number.isFinite(this.quotation.inSuspense)
      ? this.dP.transform(this.quotation.inSuspense, '1.2-2', 'en')
      : this.quotation.inSuspense;
    const line = this.appS.getCurrentSystemMetadata.busline;
    switch (line) {
      case 'L':
        this.dCols = [
          new TableCol('Cover Code', 'code'),
          new TableCol('Cover Name', 'coverDescription'),
          new TableCol('Life Assured', 'assured'),
          new TableCol('Issued Age', 'issueAge'),
          new TableCol('Prem Freq', 'coverPremFreq'),
          new TableCol('Prem Method', 'coverPremPayMeth'),
          new TableCol('Periodic Premium', 'coverPremium'),
          new TableCol('Initial Sum Assured', 'initialSumAssured'),
          new TableCol('Details', 'checkbox', null, null, 'checkbox', true),
        ];
        break;
      case 'G':
        this.dCols = [
          new TableCol('Cover Code', 'code'),
          new TableCol('Cover Name', 'coverDescription'),
          new TableCol('Assured', 'assured'),
          new TableCol('Asset', 'assetId'),
          new TableCol('Prem Freq', 'coverPremFreq'),
          new TableCol('Prem Method', 'coverPremPayMeth'),
          new TableCol('Periodic Premium', 'coverPremium'),
          new TableCol('Asset Value', 'asset'),
          new TableCol('Sum Assured', 'sumAssured'),
          new TableCol('Details', 'checkbox', null, null, 'checkbox', true),
        ];
        break;
      default:
        break;
    }
    this.btns1 = [
      new KVP('Documents', 'quotationdocuments'),
      new KVP('Modify', `create-new-individual-quotation/${this.clientNo}`),
      new KVP('Workflows', this.pS.r.pw._),
      new KVP('Pricing', 'quotation-pricing'),
      new KVP('Generate', this.pS.r.pe._),
      new TKVP(
        'Convert To Policy',
        'convert-to-policy',
        null,
        this.quotation?.quoteStatus != 'A'
      ),
      new KVP('Authorize Quote', this.pS.r.pe._),
    ];
    this.quotation['owner'] =
      this.quotation?.ownerClientNo + ' - ' + this.quotation?.ownerName;
    this.quotation['pdsc'] = (
      await this.qs
        .getProductDescription(this.quotation?.productCode)
        .toPromise()
    )[0]?.description;
    console.log(this.quotation);
    this.quotation.primaryAgent =
      this.quotation.primaryAgent +
      ' - ' +
      (await this.aS
        .getAgentNameByAgentNo(this.quotation.primaryAgent)
        .toPromise());
    this.viewQuotationForm = new FormGroup(
      this.uS.objToFormControls(this.quotation)
    );
    this.lbls1.forEach(
      (l) =>
        (l.value =
          this.quotation[l.key] !== 'string'
            ? this.quotation[l.key]
            : '--------')
    );
    this.lbls2.forEach(
      (l) =>
        (l.value =
          this.quotation[l.key] !== 'string'
            ? this.quotation[l.key]
            : '--------')
    );
    this.lbls3.forEach(
      (l) =>
        (l.value =
          this.quotation[l.key] !== 'string'
            ? this.quotation[l.key]
            : '--------')
    );
    this.policyStatus.value = this.quotation[this.policyStatus.key];
    this.peS.getPolicyCodes(this.quotation.policyNo).subscribe((r: any) => {
      this.policyCodes = r;
    });
    this.findQuotationService.getQuoteCover(this.quoteNo).subscribe((r) => {
      this.covers = r;
      this.covers.forEach((cover) => {
        cover.coverPremium = Number.isFinite(cover.coverPremium)
          ? this.dP.transform(cover.coverPremium, '1.2-2', 'en')
          : cover.coverPremium;
        cover.initialSumAssured = Number.isFinite(cover.initialSumAssured)
          ? this.dP.transform(cover.initialSumAssured, '1.2-2', 'en')
          : cover.initialSumAssured;
      });
      this.showPager = r?.length > this.tableLimit;
      this.tableLoading = false;
    });
    this.stS.getPolicyStatuses().subscribe((r) => {
      this.statuses = r;
    });

    //#region LBLS 1 HANDLER

    this.lbls2.find((x) => x.key == 'referrerNo').formatter = (item) =>
      this.cS.getClientNameByNum(item).toPromise();
    //#endregion

    //#region BTNS 2 HANDLER
    this.btns2 = [
      new BtnLg(
        'Total Periodic Premium',
        this.hS.span(
          `${
            (this.quotation?.totalPeriodicPremium || 0).toLocaleString(
              'en-US'
            ) || '-'
          }`
        ),
        'total-periodic-premium'
      ),
      new BtnLg(
        'No of Iterations',
        this.hS.span(
          this.hS.span(
            this.hS.span(
              `${Number(this.quotation?.iterations) || '-'}`,
              'btn-card-value position-static'
            ),
            'd-block btn-card-value-label'
          )
        )
      ),
      new BtnLg(
        'Days to Expiry',
        this.hS.span(
          this.hS.span(
            this.hS.span(
              `${Number(this.quotation?.daysToQuoteExpiry) || '-'}`,
              'btn-card-value position-static'
            ),
            'd-block btn-card-value-label'
          )
        )
      ),
      new BtnLg(
        'Conversion Probability',
        this.hS.span(
          this.hS.span(
            this.hS.span(
              `${Number(this.quotation?.conversionProb) || '-'}%`,
              'btn-card-value position-static'
            ),
            'd-block btn-card-value-label'
          )
        )
      ),
      new BtnLg('Annuity Payee', this.hS.span(`--`), 'annuity-payee'),
      new BtnLg('Payment', this.hS.span(`--`), 'payment'),
      new BtnLg('Relationships', this.hS.span(`--`), 'view-relationships'),
    ];
    //#endregion

    //#region LBLS 2 HANDLER
    this.lbls2.find((x) => x.key == 'createdOn').formatter =
      this.uS.fullDateTime;
    this.lbls2.find((x) => x.key == 'premPayTermMo').formatter =
      this.uS.monthsFormatter;
    this.lbls2.find((x) => x.key == 'policyTermDays').formatter =
      this.uS.daysFormatter;
    //#endregion

    this.loading = false;
  }

  route(item: any) {
    if (item && item.action) {
      this.router.navigate([`../${item.action}`], {
        relativeTo: this.activatedRoute,
        queryParams: {
          policyNo: this.quotation?.policyNo,
          quoteNo: this.quotation?.quoteNo,
          policyCode: this.quotation?.policyCode,
          policyNoSuffix: this.quotation?.suffix,
          clientNo: this.quotation?.ownerClientNo,
          policyID: this.quotation?.id,
          owner: this.quotation?.ownerClientNo,
          pcd: this.quotation?.productCode,
          pfreq: this.quotation?.payinFreq,
        },
      });
    }
  }

  onEdit(value: any) {
    this.readonlyValue = value;
  }
  checkReadonly(value: any) {
    if (value == this.readonlyValue) {
      return false;
    } else {
      return true;
    }
  }
  checkHighlight(value: any) {
    if (value == this.readonlyValue) {
      return true;
    } else {
      return false;
    }
  }
  setFormData(data: any) {
    this.viewQuotationForm.patchValue({
      fullName: data?.OWNER_NAME,
      expiryDate: data?.CREATED_DATE_TO,
      coverCommence: data?.CREATED_DATE_FROM,
      quoteStatus: data?.STATUS,
      quoteValidity: data?.INIT_QUOTE_VALIDITY,
      createdBy: data?.CREATED_BY,
      currencyType: data?.CURRENCY,
      annualisedPayment: data?.ANNUALISED_PAYMENTS,
      jointOwnerName: data?.JOINT_OWNER_NAME,
      premTermPayment: data?.PREM_PAYMENT_TERM,
      policyTerm: data?.POLICY_TERM,
      livesCovered: data?.NO_OF_LIVES_COVERED,
      sumAtRisk: data?.TOTAL_SUM_AT_RISK,
      branch: data?.BRANCH,
      uncoveredExposure: data?.UNCOVERED_EXPOSURE,
      jointOwnerNo: data?.JOINT_OWNER_NO,
      ownerClientNo: data?.OWNER_CLIENT_NO,
      referrerName: data?.REFERRER_NAME,
    });
  }

  changeStatus() {
    this.uS.dialogOpener(
      ChangeStatusComponent,
      { height: 'calc(100vw * 0.3625)', width: 'calc(100vw * 0.6069)' },
      () => {}
    );
  }
  authorise() {
    this.uS
      .confirm('Are you sure you want to authorize this quote?')
      .then((r) => {
        if (r) {
        }
      });
  }

  async getQuotations() {
    let data = await this.findQuotationService.getQuote(this.quoteNo);
    this.quotation = data;
    this.clientNo = this.quotation?.ownerClientNo;
    this.productCode = this.quotation?.productCode;
    this.getProductDescription();

    // this.findQuotationService.getQuote(this.quoteNo).subscribe((data) => {
    //   this.quotation = data;
    //   this.clientNo = this.quotation.ownerClientNo;
    //   this.productCode = this.quotation.productCode;
    //   this.getProductDescription();
    // });
  }

  getQuotationCover() {
    this.findQuotationService.getQuoteCover(this.quoteNo).subscribe((data) => {
      this.quotationInfoList = data;
    });
  }

  getProductDescription() {
    this.findQuotationService
      .getProductDescription(this.quotation?.productCode)
      .subscribe((data) => {
        this.description = data[0]?.description;
      });
  }
}

class TKVP extends KVP {
  disabled?: boolean;
  constructor(
    key: string,
    value: string | number | boolean,
    cls?: string,
    disabled?: boolean
  ) {
    super(key, value, cls);
    this.disabled = disabled ? disabled : false;
  }
}

interface MIBtn extends IBtn {
  disabled?: boolean;
}
