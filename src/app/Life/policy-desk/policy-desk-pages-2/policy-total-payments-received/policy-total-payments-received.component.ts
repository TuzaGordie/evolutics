import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { TablePlainService } from '../../../../Shared/components/table-plain/table-plain.service';
import {
  IKVP,
  TableCol,
  KVP,
  InputType,
} from '../../../../Shared/models/index.model';
import { PDService } from '../../policy-desk-extras/policy-desk.service';
import { PolicyEndpointsService } from '../../policy-desk-extras/policy-endpoints.service';

@Component({
  selector: 'app-policy-total-payments-received',
  templateUrl: './policy-total-payments-received.component.html',
  styleUrls: ['./policy-total-payments-received.component.scss'],
})
export class PolicyTotalPaymentsReceivedComponent implements OnInit {
  transactions: any[] = [];
  tableLoading: boolean = true;
  list1 = [];
  list2 = [];
  colorCode = (val: string) => this.tS.formatToColours(val);
  dCols1: TableCol[] = [
    new TableCol('Receipt Category'),
    new TableCol('Total Posted'),
    new TableCol('Currency'),
    new TableCol('Total Reconciled'),
    new TableCol('In Suspense'),
  ];
  dCols2: MTableCol[] = [
    new MTableCol('Receipt No', 'receiptNo'),
    new MTableCol('Gross Amount', 'amount'),
    new MTableCol('Amount Received', 'netAmount'),
    new MTableCol(
      'Deductions',
      'dedSource',
      null,
      null,
      'checkbox',
      true,
      null,
      null,
      'deduction'
    ),
    new MTableCol('Type', 'payInType'),
    new MTableCol('Reason', 'reason'),
    new MTableCol(
      'Reconciled',
      'reconciled',
      null,
      null,
      'checkbox',
      true,
      null,
      null,
      'reconciled'
    ),
    new MTableCol(
      'Canceled',
      'cancel',
      null,
      null,
      'checkbox',
      true,
      null,
      null,
      'canceled'
    ),
    new MTableCol('Dates', '', null, null, null, null, 'calendar'),
    new MTableCol('Users', '', null, null, null, null, 'user'),

    // new TableCol('Created On'),
    // new TableCol('Reconciled On'),
    // new TableCol('Effective On'),
    // new TableCol('Ref No'),
    // new TableCol('Currency'),
    // new TableCol('Source'),
    new MTableCol('Receiving Bank', 'bankCode'),
    new MTableCol('Details', '', null, null, null, null, 'detail'),
    // new TableCol('Reconciled By'),
    // new TableCol('Reversed'),
    // new TableCol('Payer No'),
  ];
  name = 'Mascar Magic';
  constructor(
    public pdS: PDService,
    public uS: UtilityService,
    public tS: TablePlainService,
    public aR: ActivatedRoute,
    public pS: PolicyEndpointsService
  ) {}

  async ngOnInit(): Promise<void> {
    console.log(this.dCols2);
    const queryParams = this.aR.snapshot.queryParamMap;
    const policy = {
      no: queryParams.get('policyNo'),
      code: queryParams.get('policyCode'),
      suffix: queryParams.get('policyNoSuffix'),
      client: queryParams.get('clientNo'),
    };

    const transactions = this.pS
      .getTransactions(policy.no)
      .toPromise()
      .then((data) => {
        this.tableLoading = false;
        data.forEach((element) => {
          element.amount = element.amount.toLocaleString('en-US');
          element.netAmount = element.netAmount.toLocaleString('en-US');
        });
        this.transactions = data;
      })
      .catch((e) => (this.tableLoading = false));
    await transactions;
    this.list1 = this.uS.dataGen(
      this.dCols1.map((x) => x.f),
      2
    );
    // this.list2 = this.uS.dataGen(
    //   this.dCols2.map((x) => x.f),
    //   2
    // );
  }
  statement() {
    this.uS.go(this.pdS.r.ps.pub);
  }
  statementRoute = this.pdS.r.ps._;
  ppfs() {
    // this.pdS.go(this.pdS.r.ps.pub);
  }
}

export class MTableCol extends TableCol {
  otype?: string;
  rawInput?: any;
  extras?: string;
  constructor(
    t: string,
    f?: string,
    formatter?: (val: any) => string,
    formatterRow?: (row: any) => string,
    type?: InputType,
    checked?: boolean,
    otype?: string,
    rawInput?: any,
    extras?: string
  ) {
    super(t, f, formatter, formatterRow, type, checked);
    this.otype = otype;
    this.rawInput = rawInput;
    this.extras = extras;
  }
}
