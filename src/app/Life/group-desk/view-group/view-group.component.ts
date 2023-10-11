import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentService } from 'src/app/Services/agent.service';
import { ClientService } from 'src/app/Services/client.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { ChangeStatusModalComponent } from 'src/app/Shared/components/change-status-modal/change-status-modal.component';
import { ICover } from 'src/app/Shared/models/covers/cover.interface';
import { configForms } from 'src/app/Shared/models/form.class';
import {
  FKVP,
  IBtn,
  ICodeDescription,
  KVP,
  TableCol,
} from 'src/app/Shared/models/index.model';
import { convertToObject } from 'typescript';
import { AgentListModalComponent } from '../../life-components/agent-list-modal/agent-list-modal.component';
import { FieldAggregateModalComponent } from '../../life-components/field-aggregate-modal/field-aggregate-modal.component';
import { LeadCoinsurerListModalComponent } from '../../life-components/lead-coinsurer-list-modal/lead-coinsurer-list-modal.component';
import { IGroupDesk } from '../group-desk-extras/group-desk.interface';
import { FindGroupService } from '../service/find-group.service';

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.scss'],
})
export class ViewGroupComponent implements OnInit {
  form: FormGroup = new FormGroup({
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
    parentOwner: configForms.default(),
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
  openStatusDialog = () => {
    this.uS.dialogOpener(
      ChangeStatusModalComponent,
      {
        data: { status: this.form.value.status, options: this.statuses },
        width: 'auto',
        minWidth: '40%',
      },
      (r) => {
        this.init();
      }
    );
  };
  openAgentListDialog = () => {
    this.uS.dialogOpener(
      AgentListModalComponent,
      {
        data: { number: this.groupNo },
        width: 'auto',
        minWidth: '40%',
      },
      (r) => {
        // this.init();
      }
    );
  };
  openLeadCoinsurerListDialog = () => {
    this.uS.dialogOpener(
      LeadCoinsurerListModalComponent,
      {
        data: { number: this.groupNo },
        width: 'auto',
        minWidth: '40%',
      },
      (r) => {
        // this.init();
      }
    );
  };
  openFieldAggregateDialog = () => {
    this.uS.dialogOpener(
      FieldAggregateModalComponent,
      {
        data: { number: this.groupNo },
        width: 'auto',
        minWidth: '40%',
      },
      (r) => {
        // this.init();
      }
    );
  };
  lbls1: FKVP[] = [
    // new FKVP('groupOwner', 'Group Owner'),
    new FKVP('group', 'Group'),
    // new FKVP('ownerClientNo', 'Owner Client Number', true),
    new FKVP(
      'agent',
      'Agent',
      false,
      null,
      null,
      null,
      this.openAgentListDialog
    ),

    new FKVP('quoteNo', 'Quote No', false),
    new FKVP('externalRef', 'External Ref', false),
    new FKVP('policyNo', 'Policy No'),
    new FKVP('policyCode', 'Policy Code'),
    new FKVP('referrerNo', 'Referrer', false),
  ];
  lbls2: FKVP[] = [
    new FKVP('parentCompany', 'Parent Owner', true, '', 'text', 'Parent Owner'),
    new FKVP('commenceDate', 'Cover Commence'),
    new FKVP('renewalDueOn', 'Cover Expire'),
    new FKVP('sector', 'Sector'),
    new FKVP('coinsured', 'Coinsured'),
    new FKVP(
      'coInsurer',
      'Lead Coinsurer',
      true,
      null,
      null,
      null,
      this.openLeadCoinsurerListDialog
    ),
    new FKVP('coInsureShare', 'Coinsurance Share'),
    new FKVP('premiumDue', 'Outstanding Premiums'),
    new FKVP('', 'Free Cover Limit', true),
    new FKVP('', 'Payee Account'),
    new FKVP('premFreq', 'Premium Frequency'),
    new FKVP('', 'Branch'), //branchCode
    // new FKVP('', 'No o/s medical Uwr'),
    new FKVP('currency', 'Currency'),
    new FKVP('covers', 'No Of Cover'),
    new FKVP('loanIntRate', 'Interest (%)'),
    new FKVP(
      'aggregateQuote',
      'Aggregate',
      true,
      'Y',
      null,
      null,
      this.openFieldAggregateDialog
    ),
  ];
  lbls3 = [
    new FKVP(
      'quoteStatus',
      'Status',
      true,
      null,
      null,
      null,
      this.openStatusDialog
    ),
  ];
  dCols: TableCol[] = [
    new TableCol('Cover Code', 'code'),
    new TableCol('Cover Name', 'coverDescription'),
    // new TableCol('Life Assured', 'assured'),
    // new TableCol('Issued Age', 'issueAge'),
    // new TableCol('Current Age'),
    new TableCol('SubGroup No', 'subgroupNo'),
    new TableCol('No Assets', 'noAssets'),
    new TableCol('No Members', 'noMembers'),
    new TableCol('Group SA Basis', 'groupSaBasis'),
    new TableCol('Group SA Factor', 'groupSaBasisValue'),

    // new TableCol(
    //   'Prem Freq/Method',
    //   'coverPremPayMeth',
    //   null,
    //   (item: ICover) => {
    //     console.log(item);
    //     return (
    //       (item.coverPremFreq ? item.coverPremFreq + ' / ' : '') +
    //       item.coverPremPayMeth
    //     );
    //   }
    // ),
    new TableCol('Periodic Premium', 'coverPremFreq'),
    new TableCol('Prem Freq', 'premPayFreq'),
    new TableCol('Prem Method', 'coverPremPayMeth'),
    // new TableCol('Initial Sum Assured', 'initialSumAssured', (item) =>
    //   this.uS.moneyParser(item, ' ')
    // ),
    // new TableCol('Sum Assured', 'sumAssured', (item) =>
    //   this.uS.moneyParser(item, ' ')
    // ),
    // new TableCol('Issue On', 'issueOn', this.uS.fullDateTime),
    // new TableCol('Next Prem Due Dt', ''),
    // new TableCol('Details', 'details'),
  ];
  subGroupsForm = new FormGroup({
    value: new FormControl(),
  });
  loading: boolean;
  covers: ICover[];
  tableLoading: boolean;
  showPager: boolean;
  statuses: ICodeDescription[];
  tableLimit = 10;
  groupNo: string;

  subGroups: any[] = [];
  group: IGroupDesk;

  constructor(
    public findGroupService: FindGroupService,
    public uS: UtilityService,
    public route: ActivatedRoute,
    public router: Router,
    public aS: AgentService,
    public cS: ClientService
  ) {}

  async ngOnInit(): Promise<void> {
    let groupData;
    // console.log(groupData)
    this.loading = true;
    this.groupNo = this.route.snapshot.queryParams.groupNo;
    const data = await this.findGroupService
      .getGroupList(this.groupNo)
      .toPromise();
    const [covers, group] = [data.covers, data.group];
    this.subGroups = covers.map(({ subgroupNo }) =>
      subgroupNo ? subgroupNo : group.subGroupNo
    );
    this.subGroups = [...new Set(this.subGroups)];

    this.findGroupService.getGroupList(this.groupNo).subscribe(
      (data) => {
        this.group = data;
        console.log('Returned Data', data);
        groupData = data;

        groupData.policy.groupName = groupData?.policy?.group;
        groupData.policy.coInsurer = groupData?.groupCoins?.coInsurer;
        this.form.patchValue(data);

        this.lbls1.forEach(
          // (x) => (x.value = 'random' + Math.round(Math.random() * 100))
          (x) => {
            let key = x.key;
            if (key == 'policyCode') {
              x.value = data.policy[key];
            } else if (key == 'quoteNo') {
              x.value = data.policy[key];
            } else if (key == 'premFreq') {
              x.value = groupData.group[key];
            } else if (key == 'referrerNo') {
              this.cS
                .getClientNameByNum(data.policy.referrerNo)
                .toPromise()
                .then((r) => {
                  x.value = data.policy.referrerNo + ' - ' + r;
                });
            } else if (key == 'agent') {
              this.aS
                .getAgentNameByAgentNo(data.policy.primaryAgent)
                .toPromise()
                .then((r) => {
                  x.value = data.policy.primaryAgent + ' - ' + r;
                });
            } else {
              x.value = groupData.policy[key];
            }
          }
        );
        this.lbls1.find((x) => x.key == 'group').value =
          data.group.groupNo + ' - ' + data.group.groupOwner;
        this.lbls2.forEach((x) => {
          //console.log(x.key)
          let key = x.key;
          if (key == 'agentNo') {
            x.value = groupData.agentInfo ? groupData.agentInfo.agentNo : '-';
          } else if (key == 'sector') {
            // x.value = groupData.group.sector;
            x.value =
              groupData.group.sector !== 'string'
                ? groupData.group.sector
                : '-';
          } else if (key == 'coinsured') {
            x.value = groupData.group.coinsured;
          } else if (key == 'coInsurer') {
            x.value = groupData.groupCoins[0].coInsurer;
          } else if (key == 'coInsureShare') {
            x.value = groupData.groupCoins[0].coInsureShare;
          } else if (key == 'covers') {
            x.value = groupData.covers.length;
          } else if (key == 'subGroupName') {
            x.value = groupData.group.subGroupName;
          } else if (key == 'parentCompany') {
            x.value =
              groupData.group.parentCompany !== 'string'
                ? groupData.group.parentCompany
                : '-';
          } else if (key == 'aggregateQuote') {
            x.value = groupData.group.aggregateQuote;
          } else if (key == 'subGroupNo') {
            x.value = groupData.group.subGroupNo;
            console.log(x.value + 'XVALUES');
          } else {
            x.value = groupData.policy[key] || '-';
          }

          if (x.value) {
            // console.log(x.value)
          }
        });
        this.covers = groupData.covers;

        for (let i in this.covers) {
          if (this.covers[i].subgroupNo == null) {
            this.covers[i].subgroupNo = groupData?.group?.subGroupNo;
            break;
          }
        }
        // this.covers.forEach(({ subgroupNo }, index) =>
        //   this.subGroups.includes({ label: subgroupNo, value: subgroupNo })
        //     ? ''
        //     : this.subGroups.push({ label: subgroupNo, value: subgroupNo })
        // );

        this.loading = false;
      },
      (err) => {
        console.log(err);
        // this.loading=false;
      }
    );
  }

  assetClicked() {
    this.router.navigate(['../assets'], {
      relativeTo: this.route,
      queryParams: { groupNo: this.groupNo },
    });
  }

  async filterCoversTable() {
    const subGroup = this.subGroupsForm.value.value;
    const data = await this.findGroupService
      .getGroupList(this.groupNo)
      .toPromise();
    let [covers, group] = [data.covers, data.group];
    covers.forEach(
      (cover) =>
        (cover.subgroupNo = cover.subgroupNo
          ? cover.subgroupNo
          : group.subGroupNo)
    );
    const spCovers = subGroup
      ? covers.filter(({ subgroupNo }) => subgroupNo == subGroup)
      : covers;
    this.covers = spCovers as unknown as ICover[];
  }

  init() {}

  get clientNo() {
    return this.group?.policy?.ownerClientNo;
  }
}
