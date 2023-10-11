import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {IPolicy} from 'src/app/Life/policy-desk/policy-desk-extras/policy-desk.model';
import {PDService} from 'src/app/Life/policy-desk/policy-desk-extras/policy-desk.service';
import {PolicyEndpointsService} from 'src/app/Life/policy-desk/policy-desk-extras/policy-endpoints.service';
import {AgentService} from 'src/app/Services/agent.service';
import {ClientService} from 'src/app/Services/client.service';
import {HtmlerService} from 'src/app/Services/htmler.service';
import {ProductService} from 'src/app/Services/product.service';
import {StatusService} from 'src/app/Services/status.service';
import {StorageService} from 'src/app/Services/storage.service';
import {ChangeStatusModalComponent} from 'src/app/Shared/components/change-status-modal/change-status-modal.component';
import {ICover} from 'src/app/Shared/models/covers/cover.interface';
import {configForms} from 'src/app/Shared/models/form.class';
import {
  BtnLg,
  FKVP,
  ICodeDescription,
  TableCol,
} from 'src/app/Shared/models/index.model';

@Component({
  selector: 'app-view-policy-gb',
  templateUrl: './view-policy-gb.component.html',
  styleUrls: ['./view-policy-gb.component.scss'],
})
export class GeneralViewPolicyGBComponent implements OnInit {
  loading: boolean;
  policyNo: string;
  policyCode: string;
  suffix: string;

  editbankNo = () => {
    this.uS.$('#editbank').modal('show');
  };
  lbls1: FKVP[] = [
    new FKVP('policyNo', 'Policy No'),
    new FKVP('ownerClientNo', 'Owner Client Number', true),

    new FKVP('', 'Group No'),
    new FKVP('externalRef', 'External Ref', true),
    new FKVP('agentNo', 'Agent', true),
    new FKVP('referrerNo', 'Referrer', true),
  ];
  lbls2: FKVP[] = [
    new FKVP('ownerName', 'Owner Full Name'),
    new FKVP('coverEndOn', 'Policy Matures', true, '', 'date'),
    new FKVP('issuedOn', 'Policy Issued On'),
    new FKVP('currency', 'Currency'),
    new FKVP('totalPeriodicPremium', 'Total Modal Premium'),
    new FKVP('noOfCovers', 'No of Covers'),
    new FKVP('premiumDue', 'Outstanding Premiums'),
    new FKVP('totalSar', 'Total Sum at Risk'),
    new FKVP('', 'Deposit Balance'),
    new FKVP('annualisedPremium', 'Annualised Premium'),
    new FKVP('premPayTermMo', 'Premium Payment Term', true),
    new FKVP('policyTermDays', 'Policy Term'),
    new FKVP(
      '',
      'Prem. Payment Method',
      null,
      null,
      'text',
      'Premium Payment Method'
    ),
    new FKVP('', 'Payee Account', true, null, null, null, this.editbankNo),
    new FKVP('', 'Payer Account', true, null, null, null, this.editbankNo),
    new FKVP('', 'Benefits Assigned To', true),
    new FKVP('branchCode', 'Branch', true, '', 'select'),
  ];
  lbls3: FKVP[] = [
    new FKVP('policyStatus', 'Policy Status', true),
    new FKVP('productCode', 'Product Code'),
    new FKVP('productName', 'Product Name'),
  ];

  dCols: TableCol[] = [
    new TableCol('Cover Code', 'code'),
    new TableCol('Cover Name', 'coverDescription'),
    new TableCol('Assured', 'assured'),
    new TableCol('Asset No', 'assetRedgNo'),
    new TableCol('Asset Property', null),
    new TableCol(
      'Prem Freq/Method',
      'coverPremPayMeth',
      null,
      (item: ICover) => {
        return (
          (item.coverPremFreq ? item.coverPremFreq + ' ' : '') +
          item.coverPremPayMeth
        );
      }
    ),
    new TableCol('Deductible', 'deductible'),
    new TableCol('Excess', 'excess'),
    new TableCol('PAYG', 'payg'),
    new TableCol('Periodic Premium', 'coverPremFreq'),
    new TableCol('Sum Assured', 'sumAssured', (item) =>
      this.uS.moneyParser(item, ' ')
    ),
    new TableCol('Issue On', 'issueOn', this.uS.fullDateTime),
    new TableCol('Next Prem Due Dt', ''),
    new TableCol('Details', 'details'),
  ];
  form = new FormGroup({
    agentNo: configForms.default(),
    alpha: configForms.default(),
    annualisedPremium: configForms.default(),
    annuityOnClaimEscalRate: configForms.default(),
    annuityOnClaimFreq: configForms.default(),
    annuityOnClaimTermFreq: configForms.default(),
    annuityOnClaimTermMonths: configForms.default(),
    applDate: configForms.default(),
    authBy: configForms.default(),
    authOn: configForms.default(),
    automaticPremiumLoan: configForms.default(),
    branchCode: configForms.default(),
    busLine: configForms.default(),
    clientCategory: configForms.default(),
    code: configForms.default(),
    commenceDate: configForms.default(),
    companyCode: configForms.default(),
    conversionProb: configForms.default(),
    convertBasis: configForms.default(),
    convertedBy: configForms.default(),
    convertedOn: configForms.default(),
    convertReason: configForms.default(),
    convertToPolicy: configForms.default(),
    convertToProd: configForms.default(),
    coverCode: configForms.default(),
    coverEndOn: configForms.default(),
    createdBy: configForms.default(),
    createdOn: configForms.default(),
    currency: configForms.default(),
    daysToExpiry: configForms.default(),
    daysToQuoteExpiry: configForms.default(),
    discCode: configForms.default(),
    examination: configForms.default(),
    externalRef: configForms.default(),
    grouped: configForms.default(),
    id: configForms.default(),
    inComplete: configForms.default(),
    insType: configForms.default(),
    inSuspense: configForms.default(),
    issueAge: configForms.default(),
    issueDate: configForms.default(),
    issuedOn: configForms.default(),
    issueOwnerAge: configForms.default(),
    iterations: configForms.default(),
    jointOwner: configForms.default(),
    jointOwnerName: configForms.default(),
    loanIntRate: configForms.default(),
    modifiedOn: configForms.default(),
    modifiedUser: configForms.default(),
    noOfAssets: configForms.default(),
    noOfCovers: configForms.default(),
    noOfLives: configForms.default(),
    outSuspense: configForms.default(),
    ownerClientNo: configForms.default(),
    ownerCrmClientNo: configForms.default(),
    ownerName: configForms.default(),
    paidToDate: configForms.default(),
    payinFreq: configForms.default(),
    payinMethod: configForms.default(),
    policyCode: configForms.default(),
    policyGroupId: configForms.default(),
    policyNo: configForms.default(),
    policyNoSuffix: configForms.default(),
    policyStatus: configForms.default(),
    policyTermDays: configForms.default(),
    policyTermMo: configForms.default(),
    premEscalationRate: configForms.default(),
    premFreq: configForms.default(),
    premIndexTable: configForms.default(),
    premiumDue: configForms.default(),
    premiumLoanPeriod: configForms.default(),
    premiumPaid: configForms.default(),
    premiumTarget: configForms.default(),
    premPayTermMo: configForms.default(),
    productClass: configForms.default(),
    productCode: configForms.default(),
    quoteAuth: configForms.default(),
    quoteAuthBy: configForms.default(),
    quoteAuthOn: configForms.default(),
    quotedByAgent: configForms.default(),
    quotedByClient: configForms.default(),
    quotedByStaff: configForms.default(),
    quotedOn: configForms.default(),
    quoteNo: configForms.default(),
    quoteStatus: configForms.default(),
    quoteValidDays: configForms.default(),
    referrerNo: configForms.default(),
    renewalDate: configForms.default(),
    renewalDueOn: configForms.default(),
    renewedOn: configForms.default(),
    rm: configForms.default(),
    saIndexTable: configForms.default(),
    seqNo: configForms.default(),
    sumAtRisk: configForms.default(),
    tmId: configForms.default(),
    totalPeriodicPremium: configForms.default(),
    totalSar: configForms.default(),
    uwPending: configForms.default(),
  });
  policy: IPolicy;
  outPolicy: IPolicy;
  policyCodes: any[];
  covers: ICover[];
  tableLoading: boolean;
  showPager: boolean;
  statuses: ICodeDescription[];
  tableLimit = 10;
  btns2: any[];
  constructor(
    public uS: PDService,
    public peS: PolicyEndpointsService,
    public hS: HtmlerService,
    public activatedRoute: ActivatedRoute,
    public sS: StorageService,
    public stS: StatusService,
    public aS: AgentService,
    public cS: ClientService,
    public prodS: ProductService
  ) {
  }

  async init() {
    this.tableLoading = this.loading = true;
    this.outPolicy = this.policy = await this.peS.getPolicyByNo(
      this.policyNo,
      this.form.value.policyCode || this.policyCode || 1,
      this.suffix
    );
    this.form.patchValue(this.policy);
    this.lbls1.forEach((l) => (l.value = this.policy[l.key]));
    this.lbls2.forEach((l) => (l.value = this.policy[l.key]));
    this.lbls3.forEach((l) => (l.value = this.policy[l.key]));
    this.peS.getPolicyCodes(this.policyNo).subscribe((r: any) => {
      this.policyCodes = r;
    });
    this.peS.getCovers(this.policyNo, this.policyCode).subscribe((r) => {
      this.covers = r;
      console.log(r);
      this.showPager = r?.length > this.tableLimit;
      this.tableLoading = false;
    });
    this.stS.getPolicyStatuses().subscribe((r) => {
      this.statuses = r;
    });
    console.log('POLICY', this.policy);

    //#region LBLS 1 HANDLER
    this.lbls1.find((x) => x.key == 'agentNo').formatter = (item) =>
      this.aS.getAgentNameByAgentNo(item).toPromise();
    this.lbls1.find((x) => x.key == 'referrerNo').formatter = (item) =>
      this.cS.getClientNameByNum(item).toPromise();
    //#endregion

    //#region LBLS 2 HANDLER
    // this.lbls2.find((x) => x.key == 'issuedOn').formatter =
    //   this.uS.fullDateTime;
    this.lbls2.find((x) => x.key == 'coverEndOn').formatter =
      this.uS.fullDateTime;
    this.lbls2.find((x) => x.key == 'premPayTermMo').formatter =
      this.uS.monthsFormatter;
    this.lbls2.find((x) => x.key == 'policyTermDays').formatter =
      this.uS.daysFormatter;
    this.lbls2.find((x) => x.key == 'totalSar').formatter = (item) =>
      this.uS.moneyParser(item, ' ');
    this.lbls2.find((x) => x.key == 'premiumDue').formatter = (item) =>
      this.uS.moneyParser(item, ' ');
    this.lbls2.find((x) => x.key == 'totalPeriodicPremium').formatter = (
      item
    ) => this.uS.moneyParser(item, ' ');
    //#endregion
    const queryParams = this.activatedRoute.snapshot.queryParamMap;
    const policy = {
      no: queryParams.get('number'),
      code: queryParams.get('code'),
      suffix: queryParams.get('suffix'),
    };
    this.btns2 = [
      new BtnLg(
        'Total Payments Received',
        this.hS.span(
          Number(
            await this.peS
              .getTransactionSum(
                null,
                'POL',
                `${policy.no}_${policy.code}_${policy.suffix}`
              )
              .toPromise()
          ).toLocaleString('en-us')
        ),
        this.uS.r.ptpr._
      ),
      new BtnLg('Relationships', this.hS.span(`5`), this.uS.r.pr2._),
      new BtnLg(
        'Payments Outward',
        this.hS.span(
          this.hS.span(
            'Paid - ' +
              this.hS.span('234,000', 'btn-card-value position-static'),
            'd-block btn-card-value-label'
          ) +
            this.hS.span(
              'Pending - ' +
                this.hS.span('100,000', 'btn-card-value position-static'),
              'd-block btn-card-value-label'
            ),
          'text-light'
        ),
        this.uS.r.ptpo._
      ),
      new BtnLg(
        'Accounts',
        this.hS.span(
          this.hS.span(
            'Suspense - ' +
              this.hS.span('23,100', 'btn-card-value position-static'),
            'd-block btn-card-value-label'
          )
        ),
        this.uS.r.pa._
      ),
      new BtnLg('No of Assets', this.hS.span(`23,100`), this.uS.r.pa2._),
      new BtnLg(
        'Uncovered SAR',
        this.hS.span(this.hS.span('2,000,000')),
        this.uS.r.pr._,
        'red'
      ),
      new BtnLg(
        'Credit Note',
        this.hS.span(
          this.hS.span(
            'Amount o/s - ' +
              this.hS.span('34,500', 'btn-card-value position-static'),
            'd-block btn-card-value-label'
          ) +
            this.hS.span(
              'Days o/s - ' +
                this.hS.span('13', 'btn-card-value position-static'),
              'd-block btn-card-value-label'
            ),
          'text-light'
        ),
        this.uS.r.pcn._
      ),
    ];
    //#region LBLS 3 HANDLER
    this.lbls3.find((x) => x.key == 'productName').formatter = (item) =>
      this.prodS.getProductDescByProdCode(this.policy.productCode);
    this.lbls3.find((x) => x.key == 'policyStatus').action =
      this.openStatusDialog;
    //#endregion
    this.loading = false;
  }

  async ngOnInit() {
    this.uS.stopPl();
    this.loading = true;
    console.log('PARAMS', this.activatedRoute.snapshot.params);
    this.policyNo = this.activatedRoute.snapshot.queryParams.number;
    this.policyCode = this.activatedRoute.snapshot.queryParams.code;
    this.suffix = this.activatedRoute.snapshot.queryParams.suffix;
    this.dCols.find((x) => x.f == 'details').type = 'checkbox';
    this.dCols.find((x) => x.f == 'payg').type = 'checkbox';
    try {
      this.init();
    } catch (e) {
      this.uS.notify(e, 0);
      this.uS.go('../find-policy', {relativeTo: this.activatedRoute});
      console.log(e);
    }
  }

  notes() {
    this.uS.go(this.uS.r.pn.pub);
  }

  openStatusDialog = () => {
    this.uS.dialogOpener(
      ChangeStatusModalComponent,
      {
        data: {status: this.form.value.policyStatus, options: this.statuses},
        width: 'auto',
        minWidth: '40%',
      },
      (r) => {
        this.init();
      }
    );
  };

  refetch() {
    this.init();
  }

  generateDocumentsParams() {
    const policyNo = this.form.controls.policyNo.value;
    const policyCode = this.form.controls.policyCode.value;
    const policyNoSuffix = this.form.controls.policyNoSuffix.value;
    this.sS.saveItem('policyNo', policyNo);
    this.sS.saveItem('policyCode', policyCode);
    this.sS.saveItem('policyNoSuffix', policyNoSuffix);
  }
}
