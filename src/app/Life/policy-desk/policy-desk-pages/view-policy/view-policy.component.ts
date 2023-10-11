import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { appRoutes } from 'src/app/configs/app-routes-configs/app-routes.config';
import { AgentListModalComponent } from 'src/app/Life/life-components/agent-list-modal/agent-list-modal.component';
import { AgentService } from 'src/app/Services/agent.service';
import { ClientService } from 'src/app/Services/client.service';
import { StatusService } from 'src/app/Services/status.service';
import { StorageService } from 'src/app/Services/storage.service';
import { ChangeStatusModalComponent } from 'src/app/Shared/components/change-status-modal/change-status-modal.component';
import { ICover } from 'src/app/Shared/models/covers/cover.interface';
import { PolicyCoverTableComponent } from './modal/policy-cover-table/policy-cover-table.component';
import { configForms } from 'src/app/Shared/models/form.class';
import { HtmlerService } from '../../../../Services/htmler.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  BtnLg,
  FCInput,
  FKVP,
  IBtn,
  IKVP,
  ILbl,
  TableCol,
  KVP,
  ICodeDescription,
} from '../../../../Shared/models/index.model';
import { IPolicy } from '../../policy-desk-extras/policy-desk.model';
import { PDService } from '../../policy-desk-extras/policy-desk.service';
import { PolicyEndpointsService } from '../../policy-desk-extras/policy-endpoints.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'view-policy',
  templateUrl: './view-policy.component.html',
  styleUrls: [`./view-policy.component.scss`],
})
export class ViewPolicyComponent implements OnInit {
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
  coversTableDialogRef: MatDialogRef<PolicyCoverTableComponent>;
  openCoverDialog() {
    this.coversTableDialogRef = this.dialog.open(PolicyCoverTableComponent, {
      data: {
        tableLimit: this.tableLimit,
        showPager: this.showPager,
        dCols: this.dCols,
        covers: this.covers,
      },
      width: 'auto',
      minWidth: '60%',
    });
  }

  lbls1: FKVP[] = [
    new FKVP('policyNo', 'Policy No'),
    // new FKVP('ownerClientNo', 'Owner Client Number', true),
    // new FKVP(
    //   'jointOwner',
    //   'Jnt. Owner Client Number',
    //   true,
    //   '',
    //   'text',
    //   'Joint Owner Client Number'
    // ),
    new FKVP('', 'Group No'),
    new FKVP('externalRef', 'External Ref', true),
    new FKVP(
      'agent',
      'Agent',
      true,
      null,
      null,
      null,
      this.openAgentListDialog
    ),
    new FKVP('referrerNo', 'Referrer', true),
  ];
  lbls2: FKVP[] = [
    new FKVP('owner', 'Owner'),
    new FKVP('jointOwner', 'Joint Owner', true, '', 'text'),
    new FKVP('coverEndOn', 'Policy Matures', true, '', 'date'),
    new FKVP('issuedOn', 'Policy Issue Date'),
    new FKVP('currency', 'Currency'),
    new FKVP('premiumDue', 'Outstanding Premiums'),
    new FKVP(
      'premiumTarget',
      'Out. Target Contributions',
      null,
      null,
      'text',
      'Outstanding Target Contributions'
    ),
    new FKVP('totalSar', 'Total Sum at Risk'),
    new FKVP('noOfCovers', 'No of Covers'),
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

    new FKVP('', 'Payer Account', true, null, null, null, this.editbankNo),
    new FKVP('', 'Payee Account', true, null, null, null, this.editbankNo),
    new FKVP('', 'Benefits Assigned To', true),
    new FKVP('branchCode', 'Branch', true, '', 'select'),
    new FKVP('', 'Owner Prop'),
    new FKVP('', 'Non-Medical Limit'),
    new FKVP('totalPeriodicPremium', 'Total Modal Premium'),
    new FKVP('', 'Nil-UWR Limit'),
    new FKVP('loanIntRate', 'Interest (%)', true),
  ];

  dCols: TableCol[] = [
    new TableCol('Cover Code', 'code'),
    new TableCol('Cover Name', 'coverDescription'),
    new TableCol('Life Assured', 'assured'),
    new TableCol('Issued Age', 'issueAge'),
    new TableCol('Current Age'),
    new TableCol(
      'Prem Freq/Method',
      'coverPremPayMeth',
      null,
      (item: ICover) => {
        console.log(item);
        return (
          (item.coverPremFreq ? item.coverPremFreq + ' ' : '') +
          item.coverPremPayMeth
        );
      }
    ),
    new TableCol('Periodic Premium', 'coverPremium', (item) =>
      this.uS.moneyParser(item, ' ')
    ),
    new TableCol('Initial Sum Assured', 'initialSumAssured', (item) =>
      this.uS.moneyParser(item, ' ')
    ),
    new TableCol('Sum Assured', 'sumAssured', (item) =>
      this.uS.moneyParser(item, ' ')
    ),
    new TableCol('Issue On', 'issueOn', this.uS.fullDateTime),
    new TableCol('Next Prem Due Dt', ''),
  ];
  btns1: IBtn[] = [
    new KVP('Documents', this.pS.r.pds.__),
    new KVP('Workflows', this.pS.r.pw._),
    new KVP('Endorsements', this.pS.r.pe._),
    // new KVP('Reinsurance', this.pdS.r.pr._),
    new KVP('Pricing', this.pS.r.pp._),
    new KVP('Add Rider', this.pS.r.par._),
    new KVP('Underwriting', this.pS.r.pu._),
    new KVP('Commissions', this.pS.r.pc._),
    new KVP('Future Actions', this.pS.r.pfa._),
    new KVP('Perils', this.pS.r.pprls._),
  ];
  btns2: IBtn[] = [];
  form: FormGroup = new FormGroup({
    policyCode: new FormControl(),
    policyNoSuffix: new FormControl(),
  });
  policy: IPolicy;
  outPolicy: IPolicy;
  policyStatus = new FKVP('policyStatus', 'Policy Status', true);
  loading: boolean;
  policyCodes: any[];
  policyNoSuffixesList: any[];
  policyNo: any;
  policyCode: any;
  suffix: any;
  covers: ICover[];
  tableLoading: boolean;
  showPager: boolean;
  statuses: ICodeDescription[];
  tableLimit = 10;
  constructor(
    public pS: PDService,
    public uS: UtilityService,
    public peS: PolicyEndpointsService,
    public hS: HtmlerService,
    public activatedRoute: ActivatedRoute,
    public sS: StorageService,
    public stS: StatusService,
    public aS: AgentService,
    public cS: ClientService,
    public dialog: MatDialog
  ) {}
  async init() {
    this.tableLoading = this.loading = true;
    const policyCode = this.form?.value?.policyCode || this.policyCode || 1;
    this.outPolicy = this.policy = await this.peS.getPolicyByNo(
      this.policyNo,
      policyCode,
      this.suffix
    );
    if (!this.policy) {
      await this.uS.info(
        `Policy ${this.policyNo} with code ${policyCode} and suffix ${this.suffix} was not found`,
        0
      );
      this.uS.back();
    }
    this.policy.owner =
      this.policy.ownerClientNo + ' - ' + this.policy.ownerName;
    this.policy.agent =
      this.policy.agentNo +
      ' - ' +
      (await this.aS.getAgentNameByAgentNo(this.policy.agentNo).toPromise());
    this.form = new FormGroup(this.uS.objToFormControls(this.policy));
    this.form.patchValue(this.policy);
    this.lbls1.forEach((l) => (l.value = this.policy[l.key]));
    this.lbls2.forEach((l) => (l.value = this.policy[l.key]));
    this.policyStatus.value = this.policy[this.policyStatus.key];
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

    this.lbls1.find((x) => x.key == 'referrerNo').formatter = (item) =>
      this.cS.getClientNameByNum(item).toPromise();
    //#endregion
    const queryParams = this.activatedRoute.snapshot.queryParamMap;
    const policy = {
      no: queryParams.get('number'),
      code: queryParams.get('code'),
      suffix: queryParams.get('suffix'),
    };
    //#region BTNS 2 HANDLER
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
        this.pS.r.ptpr._
      ),
      new BtnLg('Relationships', this.hS.span(`5`), this.pS.r.pr2._),
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
        this.pS.r.ptpo._
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
        this.pS.r.pa._
      ),
      new BtnLg('Annuity Payments', this.hS.span(`23,100`), this.pS.r.pa2._),
      new BtnLg(
        'Uncovered SAR',
        this.hS.span(this.hS.span('2,000,000')),
        this.pS.r.pr._,
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
        this.pS.r.pcn._
      ),
    ];
    //#endregion

    //#region LBLS 2 HANDLER
    // this.lbls2.find((x) => x.key == 'loanIntRate').formatter =
    //   this.uS.decimalToPercentage;
    // this.lbls2.find((x) => x.key == 'issueDate').formatter =
    //   this.uS.fullDateTime;
    const ownerLbl = this.lbls2.find((x) => x.key == 'owner');
    if (ownerLbl)
      ownerLbl.route = encodeURI(
        '../../client-desk/view-client?clientNo=' + this.policy.ownerClientNo
      );
    this.lbls2.find((x) => x.key == 'coverEndOn').formatter =
      this.uS.fullDateTime;
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
    this.lbls2.find((x) => x.key == 'premiumTarget').formatter = (item) =>
      this.uS.moneyParser(item, ' ');
    this.lbls2.find((x) => x.key == 'totalPeriodicPremium').formatter = (
      item
    ) => this.uS.moneyParser(item, ' ');
    //#endregion

    this.loading = false;
  }
  log() {
    console.log(this.uS, this.uS.environment.activatedRoute);
  }
  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.policyNo = this.activatedRoute.snapshot.queryParams.number;
    this.policyCode = this.activatedRoute.snapshot.queryParams.code;
    this.suffix = this.activatedRoute.snapshot.queryParams.suffix;
    environment.activatedRoute = this.activatedRoute;
    this.fetchPolicyNoSuffixesList();
    this.dCols.find((x) => x.f == 'code').routeFormatter = (row, cell) => {
      return '../../setups/product/product-cover-code/show?code=' + row[cell];
    };
    this.dCols.find((x) => x.f == 'assured').routeFormatter = (row, cell) => {
      return '../../client-desk/view-client?clientNo=' + row[cell];
    };
    this.dCols
      .filter((x) => x.routeFormatter)
      .forEach(
        (x) =>
          (x.action = () => {
            this.coversTableDialogRef.close();
          })
      );
    try {
      this.init();
    } catch (e) {
      this.uS.notify(e, 0);
      this.uS.go(appRoutes.life.policy.find.pub);
      console.log(e);
    }
  }
  fetchPolicyNoSuffixesList() {
    console.log(
      'about to fetch suffixes list with policyNo: ' +
        this.policyNo +
        ' and policyCode: ' +
        this.policyCode
    );
    this.peS
      .getPolicyNoSuffixesList(this.policyNo, this.policyCode)
      .subscribe((res) => (this.policyNoSuffixesList = res));
  }
  notes() {
    this.uS.go(this.pS.r.pn.pub);
  }
  refetch() {
    this.init();
  }
  openStatusDialog = () => {
    this.uS.dialogOpener(
      ChangeStatusModalComponent,
      {
        data: { status: this.form.value.policyStatus, options: this.statuses },
        width: 'auto',
        minWidth: '40%',
      },
      (r) => {
        this.init();
      }
    );
  };
  nnew() {}
  noAct() {}
}
