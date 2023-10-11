import { UtilityService } from 'src/app/Services/utility.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuotationService } from '../../services/quotation-service.service';
import { IClientDetails } from '../../services/quotation.interface';
import { GroupAgentComponent } from './sections/agent/agent.component';
import { GroupCoverDetailsComponent } from './sections/cover-details/cover-details.component';
import { EClientType } from 'src/app/Life/client-desk/client-extras/client.interface';
import { GroupQutePolicyComponent } from './sections/quote-policy/quote-policy.component';
import { AppService } from 'src/app/Services/app.service';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-new-group-quotation-gb',
  templateUrl: './new-group-quotation-gb.component.html',
  styleUrls: ['./new-group-quotation-gb.component.scss'],
})
export class NewGroupQuotationGBComponent implements OnInit {
  @ViewChild('GroupPolicySection', { static: true })
  GroupPolicySection: GroupQutePolicyComponent;
  @ViewChild('coverSection', { static: true })
  coverSection: GroupCoverDetailsComponent;
  @ViewChild('groupAgentSection', { static: true })
  groupAgentSection: GroupAgentComponent;
  ownerDetails: IClientDetails;

  private nbofAgent: number = 1;
  assetForm: FormGroup;
  isRp1Check: boolean = false;
  toggleClass: boolean = false;
  toggleClass2: boolean = false;
  paymentMethod: any;
  assets: FormArray;
  client: any[] = [''];
  queryParams;
  isSubGroup: boolean = false;
  isCoinsured: boolean = false;
  private nbofCoin: number = 1;
  private nbofSg: number = 1;
  private nbofRsa: number = 1;
  private nbofMember: number = 1;
  hideBTN: boolean = false;
  ect = EClientType;
  clientDetails: any;
  clientNo: any;
  quoteNo: any;
  policyID: any;
  policyNo: any;
  policyCode: any;
  policyTerm: string;
  utilityService: any;
  isCreatingCoversQuotation: boolean;
  createdCovers: any[];
  premiumTerm: string;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private qs: QuotationService,
    private router: Router,
    private uS: UtilityService,
    private appS: AppService
  ) {}

  ngOnInit(): void {
    this.clientDetails = this.route.snapshot.data['ownerDetails'];
    this.queryParams = this.route.snapshot.queryParamMap;
    this.clientNo = this.clientDetails.clientNo;

    this.ownerDetails = this.route.snapshot.data['ownerDetails'];
    //  debugger
    this.assets = this.fb.array([
      new FormGroup({
        assetId: new FormControl(null, Validators.required),
        redgNo: new FormControl(null, Validators.required),
        sgNo: new FormControl(null, Validators.required),
      }),
    ]);
    this.assetForm = this.fb.group({
      assets: this.assets,
    });
  }

  findAsset(i) {
    const num = this.assetForm.value.assets[i].assetId;
    //console.log(num)
    this.qs.getAssetDetails(num).subscribe((data) => {
      //console.log(data)
      let stuff = data ? data : { registrationNo: '' };
      this.client[i] = stuff;
      //console.log(this.client)
      const assetss = this.assetForm.get('assets');
      assetss.value.forEach((element, index) => {
        if (index == i) {
          element.redgNo = stuff.registrationNo;
        }
      });
      //this.asset[i] = data
      //console.log(this.asset)
    });
  }

  showRp1Modal() {
    $('#rt1modal').modal('show');
  }

  showRp2Modal() {
    $('#rt2modal').modal('show');
  }

  showRp3Modal() {
    $('#rt3modal').modal('show');
  }

  showRp4Modal() {
    $('#rt4modal').modal('show');
  }

  showRp5Modal() {
    $('#rt5modal').modal('show');
  }

  showRp6Modal() {
    $('#rt6modal').modal('show');
  }

  agentCounter() {
    return new Array(this.nbofAgent);
  }

  agentInc() {
    this.nbofAgent = this.nbofAgent + 1;
  }

  uncheckrp1() {
    this.isRp1Check = false;
  }

  checkrp1() {
    this.isRp1Check = true;
  }

  hideRp1Modal() {
    console.log('of');
    $('#rt1modal').modal('hide');
  }
  setPlan(element: any) {
    if (element.value == 'DDebit') {
      $('#paymentMethodModal').modal('show');
    }
  }

  coinCounter() {
    return new Array(this.nbofCoin);
  }

  coinInc() {
    this.nbofCoin = this.nbofCoin + 1;
  }

  sgCounter() {
    return new Array(this.nbofSg);
  }

  sgInc() {
    this.nbofSg = this.nbofSg + 1;
  }

  rsaCounter() {
    return new Array(this.nbofRsa);
  }

  rsaInc() {
    this.nbofRsa = this.nbofRsa + 1;
  }

  memberCounter() {
    return new Array(this.nbofMember);
  }

  memberInc() {
    const b = new FormGroup({
      assetId: new FormControl(null, Validators.required),
    });
    this.client.push('');
    this.assets.push(b);
    this.nbofMember = this.nbofMember + 1;
  }

  save() {
    console.log('COVER SECTION' + JSON.stringify(this.coverSection.formValue));
    console.log(
      'AGENT SECTION' + JSON.stringify(this.groupAgentSection.formValue)
    );
    console.log('here');
    let todate = new Date(Date.now());
    let coverInfo = [];
    let agentInfo = [];
    let groupCoin = [];

    this.coverSection.formValue.coinsurersList.forEach((coin, i) => {
      let lead = i == 0 ? true : false;
      let self = lead;
      groupCoin.push({
        coInsureShare: coin?.share,
        coInsurer: coin.providerName,
        groupNo: 'string',
        leader: lead,
        policyCode: 'string',
        policyGroupId: 0,
        policyNo: 'string',
        quoteNo: 'string',
        self: self,
        seqNo: 'string',
      });
    });

    this.groupAgentSection.formValue.agents.forEach((agent, i) => {
      let primary = i == 0 ? true : false;
      agentInfo.push({
        agentNo: agent?.agentNo,
        agentSplit: agent?.proportion,
        alpha: 'string',
        coverCode: this.coverSection.newCoverScreens[i].info.coverCode,
        holdCommission: false,
        policyCode: 'string',
        policyId: 0,
        policyNo: 'string',
        primaryAgent: primary,
        quoteNo: 'string',
        id: 0,
        referrerNo: this.groupAgentSection.formValue.referrerCode,
      });
    });

    this.coverSection.formValue.covers.forEach((cover, index) => {
      let paymentMethod = this.coverSection.newCoverScreens[index].info
        .fundingOption
        ? 'F'
        : this.coverSection.formValue.premiumPaymentMethod || 'CH';
      if (this.coverSection.selected[index]) {
        coverInfo.push({
          agentNo: 'string',
          aggSumAssured:
            this.coverSection.modal[index].limit ||
            this.coverSection.modal[index].assured,
          alpha: 'string',
          anniversary: '2022-01-15',
          applYear: 0,
          assetId:
            this.coverSection.formValue.assetNo === null
              ? 0
              : this.coverSection.formValue.assetNo,
          assetRedgNo:
            this.coverSection.formValue.redgNo === null
              ? 'string'
              : this.coverSection.formValue.redgNo,
          assured: 'string',
          assuredName:
            this.coverSection.formValue.covers[index].assuredName == null
              ? 'string'
              : this.coverSection.formValue.covers[index].assuredName,
          assuredRelToOwner:
            this.coverSection.formValue.covers[index].assuredRel == null
              ? 'string'
              : this.coverSection.formValue.covers[index].assuredRel,
          base:
            this.coverSection.newCoverScreens[index].info.base == null
              ? true
              : this.coverSection.newCoverScreens[index].info.base,
          benEscalRate: 0,
          benPayBasis: 'string',
          benPayFreq: 'string',
          benPayTermDays: 0,
          benPayTermMo: 0,
          benSchedule: true,
          benScheduleBasis: 'string',
          branchCode: 'string',
          busLine: 'G',
          code:
            this.coverSection.newCoverScreens[index].info.coverCode ||
            this.coverSection.newCoverScreens[index].info.riderCoverCode,
          commEarnBasis: 'string',
          commEarnPeriod: 0,
          commRate: 0,
          commType: 'string',
          companyCode: 'string',
          convertReason: 'string',
          coverDescription:
            this.coverSection.newCoverScreens[index].info.description,
          coverEndDate: '2022-02-28T06:12:07.690Z', //(this.coverSection.formValue.endDate == null) ? "2022-02-28T06:12:07.690Z" : this.coverSection.formValue.endDate,
          coverEndOn: '2022-02-28T06:12:07.690Z', //(this.coverSection.formValue.endDate == null) ? "2022-02-28T06:12:07.690Z" : this.coverSection.formValue.endDate,
          coverNo: 0,
          coverPremFreq: this.coverSection.formValue.premiumPayFreq || 'S',
          coverPremPayMeth:
            this.coverSection.formValue.premiumPaymentMethod || 'CH',
          coverPremium: 0,
          coverRenewalDueOn: '2022-01-15',
          coverRenewedOn:
            this.coverSection.formValue.endDate == null
              ? '2022-02-28T06:12:07.690Z'
              : this.coverSection.formValue.endDate,
          coverStartDate: this.coverSection.formValue.commencementDate,
          coverStatus: 'string',
          coverTermDays: this.coverSection.modal[index].premTerm || 0,
          coverTermMo: this.coverSection.modal[index].premMonths || 0,
          currency: this.coverSection.formValue.currency,
          deductMin: 0,
          deductRate: 0,
          deductible: 0,
          definedBen: 0,
          depAdmin: true,
          deposit: 0,
          description: this.coverSection.coverScreens[index].info.description,
          discCode: this.coverSection.formValue.discountCode,
          emv: 0,
          enroleeNo: 'string',
          enroleeNoSuffix: 0,
          escalContinuePost: true,
          excess: 0,
          excessMin: 0,
          excessRate: 0,
          fcl: 0,
          funded: true,
          gmv: 0,
          groupNo: 'string',
          groupSaBasis: this.coverSection.formValue.covers[index].sa_basis,
          groupSaBasisValue: 'string',
          guarYield: 0,
          inComplete: true,
          initialBaseCoverSa: 0,
          initialSumAssured: 0,
          insType: this.queryParams.get('itype'),
          issueAge: 0,
          issueAssetAge: 0,
          issueDate: '2022-01-15',
          issueOn: '2022-01-15T00:53:07.273Z',
          loanIntRate: 0,
          loanRepayFreq: 'string',
          memberNo: 'string',
          monthlyIncome: 0,
          noAssets: 0,
          noMembers: 0,
          noPayMade: 0,
          noPremPayInLife: 0,
          noPremPayInYr: 0,
          nonMedicalLimit: 0,
          paidFromDate: '2022-01-15',
          paidToDate: '2022-01-15',
          payG:
            this.coverSection.formValue.payAsYouGo == null
              ? true
              : this.coverSection.formValue.payAsYouGo,
          policyCode: 'string',
          policyId: 0,
          policyNo: 'string',
          policyNoSuffix: 0,
          policyTermDays: this.coverSection.formValue.policyTermDays || 0,
          policyTermYears: this.coverSection.formValue.policyTermYears,
          premFactor: 0,
          premPayFreq: 'string',
          premPayMeth: 'CH',
          premPayTermDays:
            this.coverSection.formValue.premiumPaymentTermDays || 0,
          premPayTermMo:
            this.coverSection.formValue.premiumPaymentTermMonths || 0,
          premPayTermYears: this.coverSection.formValue.premiumPaymentTermYears,
          premiumDue: 0,
          premiumPaid: 0,
          premiumTarget: 0,
          premiumToBen: false,
          productClass: this.queryParams.get('pcd'), //this.queryParams.get('pdsc'),
          productCode: this.queryParams.get('pcd'), //this.queryParams.get('pcd'),
          quoteNo: 'string',
          quoteValidBasis: 'string',
          quoteValidDays: 0,
          relLifeAssured: 'string',
          renewalAge: 0,
          renewalAssetAge: 0,
          saBasis: this.coverSection.formValue.covers[index].sa_basis,
          saEscalRate: 0,
          sar: 0,
          seqNo: 0,
          stFactor: 0,
          subgroupName:
            this.coverSection.formValue.subGroupsList[index]?.subGroupName,
          subgroupNo:
            this.coverSection.formValue.subGroupsList[index]?.subGroupNo,
          suffix: 0,
          sumAssured:
            Number(this.coverSection.modal[index].limit) ||
            Number(this.coverSection.modal[index].assured) ||
            0,
          sumAtRisk: 0,
          uncoveredSar: 0,
        });
        coverInfo.push({
          agentNo: '1',
          aggSumAssured:
            this.coverSection.modal[index].limit ||
            this.coverSection.modal[index].assured,
          alpha: 'string',
          anniversary: '2022-01-15',
          applYear: 0,
          assetId:
            this.coverSection.formValue.assetNo === null
              ? 0
              : this.coverSection.formValue.assetNo,
          assetRedgNo:
            this.coverSection.formValue.redgNo === null
              ? 'string'
              : this.coverSection.formValue.redgNo,
          assured: 'string',
          assuredName:
            this.coverSection.formValue.covers[index].assuredName == null
              ? 'string'
              : this.coverSection.formValue.covers[index].assuredName,
          assuredRelToOwner:
            this.coverSection.formValue.covers[index].assuredRel == null
              ? 'string'
              : this.coverSection.formValue.covers[index].assuredRel,
          base:
            this.coverSection.newCoverScreens[index].info.base == null
              ? true
              : this.coverSection.newCoverScreens[index].info.base,
          benEscalRate: 0,
          benPayBasis: 'string',
          benPayFreq: 'string',
          benPayTermDays: 0,
          benPayTermMo: 0,
          benSchedule: true,
          benScheduleBasis: 'string',
          branchCode: 'string',
          busLine: 'G',
          code:
            this.coverSection.newCoverScreens[index].info.coverCode ||
            this.coverSection.newCoverScreens[index].info.riderCoverCode,
          commEarnBasis: 'string',
          commEarnPeriod: 0,
          commRate: 0,
          commType: 'string',
          companyCode: 'string',
          convertReason: 'string',
          coverDescription:
            this.coverSection.newCoverScreens[index].info.description,
          coverEndDate: '2022-02-28T06:12:07.690Z', //(this.coverSection.formValue.endDate == null) ? "2022-02-28T06:12:07.690Z" : this.coverSection.formValue.endDate,
          coverEndOn: '2022-02-28T06:12:07.690Z', //(this.coverSection.formValue.endDate == null) ? "2022-02-28T06:12:07.690Z" : this.coverSection.formValue.endDate,
          coverNo: 0,
          coverPremFreq: this.coverSection.formValue.premiumPayFreq || 'S',
          coverPremPayMeth:
            this.coverSection.formValue.premiumPaymentMethod || 'CH',
          coverPremium: 0,
          coverRenewalDueOn: '2022-01-15',
          coverRenewedOn:
            this.coverSection.formValue.endDate == null
              ? '2022-02-28T06:12:07.690Z'
              : this.coverSection.formValue.endDate,
          coverStartDate: this.coverSection.formValue.commencementDate,
          coverStatus: 'string',
          coverTermDays: this.coverSection.modal[index].premTerm || 0,
          coverTermMo: this.coverSection.modal[index].premMonths || 0,
          currency: this.coverSection.formValue.currency,
          deductMin: 0,
          deductRate: 0,
          deductible: 0,
          definedBen: 0,
          depAdmin: true,
          deposit: 0,
          description: this.coverSection.coverScreens[index].info.description,
          discCode: this.coverSection.formValue.discountCode,
          emv: 0,
          enroleeNo: 'string',
          enroleeNoSuffix: 0,
          escalContinuePost: true,
          excess: 0,
          excessMin: 0,
          excessRate: 0,
          fcl: 0,
          funded: true,
          gmv: 0,
          groupNo: 'string',
          groupSaBasis: this.coverSection.formValue.covers[index].sa_basis,
          groupSaBasisValue: 'string',
          guarYield: 0,
          inComplete: true,
          initialBaseCoverSa: 0,
          initialSumAssured: 0,
          insType: this.queryParams.get('itype'),
          issueAge: 0,
          issueAssetAge: 0,
          issueDate: '2022-01-15',
          issueOn: '2022-01-15T00:53:07.273Z',
          loanIntRate: 0,
          loanRepayFreq: 'string',
          memberNo: 'string',
          monthlyIncome: 0,
          noAssets: 0,
          noMembers: 0,
          noPayMade: 0,
          noPremPayInLife: 0,
          noPremPayInYr: 0,
          nonMedicalLimit: 0,
          paidFromDate: '2022-01-15',
          paidToDate: '2022-01-15',
          payG:
            this.coverSection.formValue.payAsYouGo == null
              ? true
              : this.coverSection.formValue.payAsYouGo,
          policyCode: 'string',
          policyId: 0,
          policyNo: 'string',
          policyNoSuffix: 0,
          policyTermDays: this.coverSection.formValue.policyTermDays || 0,
          policyTermYears: this.coverSection.formValue.policyTermYears,
          premFactor: 0,
          premPayFreq: 'string',
          premPayMeth: 'CH',
          premPayTermDays:
            this.coverSection.formValue.premiumPaymentTermDays || 0,
          premPayTermMo:
            this.coverSection.formValue.premiumPaymentTermMonths || 0,
          premPayTermYears: this.coverSection.formValue.premiumPaymentTermYears,
          premiumDue: 0,
          premiumPaid: 0,
          premiumTarget: 0,
          premiumToBen: false,
          productClass: this.queryParams.get('pcd'), //this.queryParams.get('pdsc'),
          productCode: this.queryParams.get('pcd'), //this.queryParams.get('pcd'),
          quoteNo: 'string',
          quoteValidBasis: 'string',
          quoteValidDays: 0,
          relLifeAssured: 'string',
          renewalAge: 0,
          renewalAssetAge: 0,
          saBasis: this.coverSection.formValue.covers[index].sa_basis,
          saEscalRate: 0,
          sar: 0,
          seqNo: 0,
          stFactor: 0,
          subgroupName:
            this.coverSection.formValue.subGroupsList[index]?.subGroupName,
          subgroupNo:
            this.coverSection.formValue.subGroupsList[index]?.subGroupNo,
          suffix: 0,
          sumAssured:
            Number(this.coverSection.modal[index].limit) ||
            Number(this.coverSection.modal[index].assured) ||
            0,
          sumAtRisk: 0,
          uncoveredSar: 0,
        });
      }
    });

    this.coverSection.formValue.coinsurersList.forEach((element) => {
      groupCoin.push({
        coInsureShare: element?.prodiverFullName,
        coInsurer: element?.share,
        groupNo: 'string',
        leader: element?.lead,
        policyCode: 'string',
        policyGroupId: 0,
        policyNo: 'string',
        quoteNo: 'string',
        self: element?.self,
        // seqNo: "string"
      });
    });

    let data = {
      agentInfo: agentInfo,
      covers: coverInfo,
      group: {
        aggAssetCount: 0,
        aggAverageAge: 0,
        aggEnroleeCount: 0,
        aggSumAssured: 0,
        aggregateQuote: false,
        annualPremium: 0,
        base: true,
        catastrophicEventLimit: 0,
        coinsured: true,
        coverCode: 'string',
        declaration: true,
        fcl: 0,
        groupIssueDate: '2022-01-25T04:54:22.674Z',
        groupNo: 'string',
        groupSaBasis: 'string',
        groupSaBasisValue: 0,
        groupStatus: 'string',
        id: 0,
        maintainedByUser: 'string',
        parentCompany: 'string',
        policyCode: 'string',
        policyId: 0,
        policyNo: 'string',
        prodClass: 'string',
        productCode: 'string',
        quoteNo: 'string',
        relManager: 'string',
        retireAge: 0,
        saBasis: 'string',
        sector: 'string',
        seqNo: 0,
        subGroupName: 'string',
        subGroupNo: 'string',
        subRelManager: 'string',
        groupOwner: 'string',
      },
      groupCoins: groupCoin,
      ownerClientNo: this.ownerDetails.clientNo,
      policy: {
        agentNo: 'string',
        alpha: 'string',
        annualisedPremium: 0,
        annuityOnClaimEscalRate: 0,
        annuityOnClaimFreq: 'string',
        annuityOnClaimTermFreq: 'string',
        annuityOnClaimTermMonths: 0,
        applDate: 'string',
        applOn: '2022-03-01T15:05:29.899Z',
        authBy: 'string',
        authOn: '2022-03-01',
        automaticPremiumLoan: true,
        benefitAssignedTo: 'string',
        branchCode: 'string',
        busLine: 'string',
        clientCategory: 'string',
        code: 'string',
        commenceDate: '2022-03-01',
        commenceOn: '2022-03-01T15:05:29.899Z',
        companyCode: 'string',
        conversionProb: 0,
        convertBasis: 'string',
        convertReason: 'string',
        convertToPolicy: true,
        convertToProd: true,
        convertedBy: 'string',
        convertedOn: '2022-03-01',
        coverCode: 'string',
        coverEndOn:
          this.coverSection.formValue.endDate == null
            ? '2022-02-28T06:12:07.690Z'
            : this.coverSection.formValue.endDate,
        createdBy: 'string',
        createdOn: '2022-03-01T15:05:29.899Z',
        currency: this.coverSection.formValue.currency,
        daysToExpiry: 0,
        daysToQuoteExpiry: 0,
        discCode: true,
        examination: true,
        externalRef:
          this.groupAgentSection.formValue.externalRef == null
            ? 'string'
            : this.groupAgentSection.formValue.externalRef,
        fcl: 'string',
        group: true,
        groupNo: 'string',
        grouped: true,
        id: 0,
        inComplete: true,
        inSuspense: 0,
        insType: 'string',
        issueAge: 0,
        issueOwnerAge: 0,
        issuedOn: '2022-03-01',
        iterations: 0,
        jointOwner: 'string',
        jointOwnerName: 'string',
        loanBalance: 0,
        loanIntRate: 0,
        modifiedOn: '2022-03-01T15:05:29.899Z',
        modifiedUser: 'string',
        noOfAssets: 0,
        noOfCovers: this.coverSection.formValue.covers.length,
        noOfLives: 0,
        nonMedicalLimit: 0,
        outSuspense: 0,
        ownerClientNo: this.ownerDetails.clientNo,
        ownerCrmClientNo: 'string',
        ownerName: this.ownerDetails.fullName,
        ownerPortion: 0,
        paidToDate: '2022-03-01',
        payeeAccount: 'string',
        payerAccount: 'string',
        payinFreq: this.coverSection.formValue.premiumPayFreq,
        payinMethod: this.coverSection.formValue.premiumPaymentMethod,
        policyCode: 'string',
        policyGroupId: 0,
        policyNo: 'string',
        policyNoSuffix: 'string',
        policyStatus: 'string',
        policyTermDays: 0,
        policyTermMo: 0,
        premEscalationRate: 0,
        premFreq: 'string',
        premIndexTable: 'string',
        premPayTermMo: 0,
        premiumDue: 0,
        premiumLoanPeriod: 0,
        premiumPaid: 0,
        premiumTarget: 0,
        primaryAgent: 'string',
        productClass: 'string',
        productCode: 'string',
        quoteAuth: true,
        quoteAuthBy: 'string',
        quoteAuthOn: '2022-03-01T15:05:29.899Z',
        quoteNo: 'string',
        quoteStatus: 'string',
        quoteValidDays: 'string',
        quotedByAgent: true,
        quotedByClient: true,
        quotedByStaff: true,
        quotedOn: '2022-03-01',
        referrerNo: 'string',
        renewalDate: '2022-03-01',
        renewalDueOn: '2022-03-01',
        renewedOn: '2022-03-01',
        rm: this.groupAgentSection.formValue.agents?.relManager,
        saIndexTable: 'string',
        seqNo: 0,
        srm: this.groupAgentSection.formValue.agents?.subRelManager,
        sumAtRisk: 0,
        tmId: 'string',
        totalPeriodicPremium: 0,
        totalSar: 0,
        uwPending: true,
      },
      premFreq: this.coverSection.formValue.premiumPaymentMethod,
    };

    console.log('PROCESSING DATA ' + JSON.stringify(data));

    return this.qs.submitGroupQuote(data).subscribe({
      next: (res: any) => {
        console.log('Result ', res);
        if (res !== null || '') {
          this.router.navigate(['../../../general/group-desk/view-group'], {
            queryParams: { groupNo: res.group.groupNo },
          });
        } else {
          this.uS.notify('An error Occurred');
        }
      },
      error: (err) => {
        console.log('Error ', err);
        this.uS.notify('An error Occurred');
      },
    });
  }

  async submitPolicyQuotation() {
    try {
      console.log(this.coverSection.coverDetailsForm);
      if (!this.GroupPolicySection.formValue.applicationDate)
        throw 'Application Date is Compulsory';
      if (!this.GroupPolicySection.formValue.commencementDate)
        throw 'Commencement Date is Compulsory';
      if (!this.GroupPolicySection.formValue.currency)
        throw 'Currency is Compulsory';
      if (!this.GroupPolicySection.formValue.premiumPaymentMethod)
        throw 'Premium Payment Method is Compulsory';
      if (!this.GroupPolicySection.formValue.premiumPayFreq)
        throw 'Premium Payment Frequency is Compulsory';
      this.policyTerm = String(
        this.GroupPolicySection.formValue.policyTermYears * 365 +
          Number(this.GroupPolicySection.formValue.policyTermDays) +
          this.GroupPolicySection.formValue.policyTermMonths * 30
      );
      this.premiumTerm = String(
        (this.GroupPolicySection.formValue.premiumPaymentTermYears * 12 +
          Number(this.GroupPolicySection.formValue.premiumPaymentTermMonths)) *
          30
      );
      // // this.isCreatingQuotation = true;
      // this.isCreatingPolicyQuotation = true;
      let todate = new Date(Date.now());
      let applDate = this.GroupPolicySection.formValue.applicationDate
        ? new Date(this.GroupPolicySection.formValue.applicationDate)
        : null;
      let commDate = this.GroupPolicySection.formValue.commencementDate
        ? new Date(this.GroupPolicySection.formValue.commencementDate)
        : null;
      let policyData = {
        agentNo: this.groupAgentSection.formValue.agents[0].agentNo,
        alpha: null,
        annualisedPremium: null,
        annuityOnClaimEscalRate: null,
        annuityOnClaimFreq: null,
        annuityOnClaimTermFreq: null,
        annuityOnClaimTermMonths: null,
        applDate: applDate ? applDate.toISOString() : null,
        applOn: applDate ? applDate.toISOString() : null,
        authBy: null,
        authOn: todate.toISOString(),
        automaticPremiumLoan: true,
        benefitAssignedTo: null,
        branchCode: this.groupAgentSection.formValue.branchCode,
        busLine: this.appS.getCurrentSystemMetadata.busline,
        clientCategory: null,
        code: null,
        commenceDate: commDate ? commDate.toISOString() : null,
        commenceOn: commDate ? commDate.toISOString() : null,
        companyCode: null,
        conversionProb: null,
        convertBasis: null,
        convertReason: null,
        convertToPolicy: true,
        convertToProd: true,
        convertedBy: null,
        convertedOn: formatDate(todate, 'YYYY-MM-dd', 'en'),
        coverCode: null,
        coverEndOn: todate.toISOString(),
        createdBy: this.clientNo,
        createdOn: todate.toISOString(),
        currency: this.GroupPolicySection.formValue.currency,
        daysToExpiry: null,
        daysToQuoteExpiry: null,
        discCode: this.GroupPolicySection.formValue.discountCode ? true : false,
        examination: true,
        externalRef: this.groupAgentSection.formValue.externalRef,
        fcl: null,
        group: true,
        groupNo: null,
        grouped: true,
        id: null,
        inComplete: true,
        inSuspense: null,
        insType: null,
        issueAge: null,
        issueOwnerAge: null,
        issuedOn: applDate.toISOString(),
        iterations: null,
        jointOwner: null,
        jointOwnerName: null,
        loanBalance: null,
        loanIntRate: null,
        modifiedOn: todate.toISOString(),
        modifiedUser: null,
        noOfAssets: null,
        noOfCovers: this.coverSection.selected.length,
        noOfLives: null,
        nonMedicalLimit: null,
        outSuspense: null,
        ownerClientNo: this.clientDetails.clientNo,
        ownerCrmClientNo: this.clientNo,
        ownerName: this.clientDetails.fullName,
        ownerPortion: null,
        paidToDate: todate.toISOString(),
        payeeAccount: null,
        payerAccount: this.clientNo,
        payinFreq: this.GroupPolicySection.formValue.premiumPayFreq,
        payinMethod: this.GroupPolicySection.formValue.premiumPaymentMethod,
        policyCode: null,
        policyGroupId: null,
        policyNo: null,
        policyNoSuffix: null,
        policyStatus: null,
        policyTermDays:
          this.GroupPolicySection.formValue.policyTermYears * 365 +
          Number(this.GroupPolicySection.formValue.policyTermDays),
        policyTermMo: Number(
          this.GroupPolicySection.formValue.policyTermMonths
        ),
        premEscalationRate: null,
        premFreq: this.GroupPolicySection.formValue.premiumPayFreq,
        premIndexTable: null,
        premPayTermMo:
          this.GroupPolicySection.formValue.premiumPaymentTermYears * 12 +
          Number(this.GroupPolicySection.formValue.premiumPaymentTermMonths),
        premiumDue: null,
        premiumLoanPeriod: null,
        premiumPaid: null,
        premiumTarget: null,
        primaryAgent:
          this.groupAgentSection.formValue.agents[0].agentNo ||
          this.clientNo ||
          null,
        productClass: this.queryParams.get('pcl'),
        productCode: this.queryParams.get('pcd'),
        quoteAuth: true,
        quoteAuthBy: environment.user?.code,
        quoteAuthOn: todate.toISOString(),
        quoteNo: null,
        quoteStatus: null,
        quoteValidDays: null,
        quotedByAgent: true,
        quotedByClient: true,
        quotedByStaff: true,
        quotedOn: todate.toISOString(),
        referrerNo: this.groupAgentSection.formValue.referrerCode,
        renewalDate: todate.toISOString(),
        renewalDueOn: todate.toISOString(),
        renewedOn: todate.toISOString(),
        rm: null,
        saIndexTable: null,
        seqNo: null,
        srm: null,
        sumAtRisk: null,
        tmId: null,
        totalPeriodicPremium: null,
        totalSar: null,
        uwPending: true,
      };

      const policyResponse = this.qs
        .submitIndividualPolicyQuote(policyData)
        .toPromise();
      await policyResponse
        .then((response) => {
          this.uS.notify('Submitted Policy Successfully', 1);
          this.coverSection.quoteNo =
            // this.groupAgentSection.quoteNo =
            // this.underWritingSection.quoteNo =
            this.quoteNo = response.quoteNo;
          this.policyID = response.id;
          this.policyNo = response.policyNo;
          this.policyCode = response.policyCode;
        })
        .catch((error) => {
          console.error(error);
          this.uS.notify('An error occured on submission', 0);
          // this.coverSection.quoteNo = null;
        })
        .finally(() => {
          // this.isCreatingPolicyQuotation = false;
        });
    } catch (error) {
      console.error(error);
      this.uS.notify(error, 0);
    }
  }

  async submitCoverInfo() {
    if (!this.coverSection.quoteNo) {
      this.utilityService.notify('Submit policy quote first', 0);
    } else {
      this.isCreatingCoversQuotation = true;
      let PremFreq = this.GroupPolicySection.formValue.premiumPayFreq;
      let todate = new Date(Date.now());
      let coverInfo = [];
      let coversAnnuity = [];
      let coverPrem = [];
      let annuityAmt = [];
      let selectedCovers = [];
      let selectedCoverScreens = [];
      let selectedCoverCodes = [];
      let selectedCoverModals = [];
      let selectedAnnuityAmt = [];
      let premToBen;
      let escalRate;
      let escalIndex;

      for (const [
        index,
        cover,
      ] of this.coverSection.formValue.covers.entries()) {
        coverPrem.push('');
        annuityAmt.push('');
        if (!this.coverSection.selected[index]) continue;
        if (this.coverSection.modal[index]) {
          switch (this.coverSection.modal[index].basis) {
            case 'PB':
              premToBen = true;
              coverPrem[index] = this.coverSection.modal[index].target;
              annuityAmt[index] = null;
              break;
            case 'BP':
              premToBen = false;
              coverPrem[index] = null;
              annuityAmt[index] = this.coverSection.modal[index].target;
              break;
            default:
              premToBen = null;
              coverPrem[index] = null;
              annuityAmt[index] = null;
              break;
          }
          switch (this.coverSection.modal[index].escBasis) {
            case 'L':
              escalRate = this.coverSection.modal[index].escValue;
              escalIndex = null;
              break;

            case 'I':
              escalIndex = this.coverSection.modal[index].escValue;
              escalRate = null;
              break;

            default:
              escalRate = escalIndex = null;
              break;
          }
        }

        let paymentMethod = this.coverSection.newCoverScreens[index].info
          .fundingOption
          ? 'F'
          : this.GroupPolicySection.formValue.premiumPaymentMethod || 'CH';
        if (this.coverSection.selected[index]) {
          selectedCovers.push(cover);
          selectedCoverCodes.push(this.coverSection.coverCodes[index]);
          selectedCoverScreens.push(this.coverSection.newCoverScreens[index]);
          selectedCoverModals.push(this.coverSection.modal[index]);
          selectedAnnuityAmt.push(annuityAmt[index]);

          let loan_date = this.coverSection.modal[index].loan_issue
            ? new Date(this.coverSection.modal[index].loan_issue)
            : null;
          coverInfo.push({
            agentNo: this.groupAgentSection.formValue.agents[0].agentNo,
            aggSumAssured:
              Number(this.coverSection.modal[index].limit) ||
              Number(this.coverSection.modal[index].assured) ||
              Number(this.coverSection.modal[index].target_amount),
            alpha: null,
            anniversary: formatDate(todate, 'YYYY-MM-dd', 'en'),
            applYear: null,
            assetId: this.coverSection.formValue.assetNo,
            assetRedgNo: this.coverSection.formValue.redgNo,
            assured: this.coverSection.formValue.covers[index].assuredNo,
            assuredName: this.coverSection.formValue.covers[index].assuredName,
            assuredRelToOwner:
              this.coverSection.formValue.covers[index].assuredRel,
            base: this.coverSection.newCoverScreens[index].info.base == '1',
            benEscalRate: null,
            benPayBasis: null,
            benPayFreq: this.coverSection.modal[index].benPaymentFreq,
            benPayTermDays: this.coverSection.modal[index].benTerm * 365,
            benPayTermMo: this.coverSection.modal[index].benMonths,
            benSchedule: true,
            benScheduleBasis: null,
            branchCode: this.groupAgentSection.formValue.branchCode,
            busLine: this.appS.getCurrentSystemMetadata.busline,
            code:
              this.coverSection.newCoverScreens[index].info.coverCode ||
              this.coverSection.newCoverScreens[index].info.riderCoverCode,
            commEarnBasis: null,
            commEarnPeriod: null,
            commRate: null,
            commType: null,
            companyCode: null,
            convertReason: null,
            coverDescription:
              this.coverSection.newCoverScreens[index].info.description,
            coverEndDate: todate.toISOString(),
            coverEndOn: todate.toISOString(),
            coverNo: null,
            coverPremFreq:
              this.coverSection.modal[index].target_frequency ||
              this.GroupPolicySection.formValue.premiumPayFreq,
            coverPremPayMeth:
              this.GroupPolicySection.formValue.premiumPaymentMethod,
            coverPremium: Number(coverPrem[index]),
            coverRenewalDueOn: formatDate(todate, 'YYYY-MM-dd', 'en'),
            coverRenewedOn: formatDate(todate, 'YYYY-MM-dd', 'en'),
            coverStartDate: formatDate(todate, 'YYYY-MM-dd', 'en'),
            coverStatus: null,
            coverTermDays:
              this.coverSection.modal[index].conTerm * 365 ||
              this.GroupPolicySection.formValue.policyTermYears * 365 +
                Number(this.GroupPolicySection.formValue.policyTermDays),
            coverTermMo: Number(this.coverSection.modal[index].conMonths),
            currency: this.GroupPolicySection.formValue.currency,
            deductMin: null,
            deductRate: null,
            deductible: null,
            definedBen: null,
            depAdmin: true,
            deposit: Number(this.coverSection.modal[index].deposit),
            description: this.coverSection.coverScreens[index].info.description,
            discCode: this.GroupPolicySection.formValue.discountCode,
            emv: null,
            enroleeNo: null,
            enroleeNoSuffix: null,
            escalContinuePost: true,
            excess: null,
            excessMin: null,
            excessRate: null,
            fcl: null,
            funded: true,
            gmv: null,
            groupNo: null,
            groupSaBasis: null,
            groupSaBasisValue: null,
            guarYield: null,
            inComplete: true,
            initialBaseCoverSa: Number(this.coverSection.modal[0].assured),
            initialSumAssured:
              Number(this.coverSection.modal[index].limit) ||
              Number(this.coverSection.modal[index].assured) ||
              Number(this.coverSection.modal[index].target_amount),
            insType: this.queryParams.get('is'),
            issueAge: null,
            issueAssetAge: null,
            issueDate: formatDate(todate, 'YYYY-MM-dd', 'en'),
            issueOn: loan_date ? loan_date.toISOString() : todate.toISOString(),
            loanIntRate: Number(this.coverSection.modal[index].loan_rate),
            loanRepayFreq: this.coverSection.modal[index].loan_freq,
            memberNo: null,
            monthlyIncome: null,
            noAssets: null,
            noMembers: null,
            noPayMade: null,
            noPremPayInLife: null,
            noPremPayInYr: null,
            nonMedicalLimit: null,
            paidFromDate: formatDate(todate, 'YYYY-MM-dd', 'en'),
            paidToDate: formatDate(todate, 'YYYY-MM-dd', 'en'),
            payG: this.GroupPolicySection.formValue.payAsYouGo || false,
            policyCode: this.policyCode,
            policyId: this.policyID,
            policyNo: this.policyNo,
            policyNoSuffix: null,
            policyTermDays: this.policyTerm,
            premFactor: null,
            premPayFreq: PremFreq,
            premPayMeth: null,
            premPayTermDays: this.coverSection.modal[index].premTerm * 365,
            premPayTermMo: Number(this.coverSection.modal[index].premMonths),
            premiumDue: null,
            premiumPaid: null,
            premiumTarget: null,
            premiumToBen: premToBen,
            productClass: this.queryParams.get('pcl'),
            productCode: this.queryParams.get('pcd'),
            quoteNo: this.coverSection.quoteNo,
            quoteValidBasis: null,
            quoteValidDays: null,
            relLifeAssured: null,
            renewalAge: null,
            renewalAssetAge: null,
            saBasis: null,
            saEscalRate: Number(
              this.coverSection.modal[index].escalation_before
            ),
            sar: null,
            seqNo: null,
            stFactor: null,
            subgroupName: null,
            subgroupNo: null,
            suffix: null,
            sumAssured:
              Number(this.coverSection.modal[index].limit) ||
              Number(this.coverSection.modal[index].assured) ||
              Number(this.coverSection.modal[index].target) ||
              Number(this.coverSection.modal[index].target_amount),
            sumAtRisk: null,
            uncoveredSar: null,
          });
        }
      }

      console.log(coverInfo);
      const coverData = this.qs
        .submitIndividualQuoteCovers(coverInfo)
        .toPromise();
      await coverData
        .then(async (response) => {
          this.uS.notify('Submitted covers successfully', 1);
          this.uS.notify('Submitting annuities', 2);
          this.createdCovers = response;
          response.forEach((cover, index) => {
            coversAnnuity.push({
              activationEvent: 'string',
              active: true,
              alpha: 'string',
              annuityAmt: Number(selectedAnnuityAmt[index]) || 0,
              annuityPaySchedule: true,
              annuityTermMo: 0,
              annuityType: selectedCoverCodes[index] || 'string',
              bonusPaymentAmt: 0,
              bonusPaymentBasis: 'string',
              claimNo: 'string',
              coverCode:
                selectedCoverScreens[index].info.coverCode ||
                selectedCoverScreens[index].info.riderCoverCode ||
                'string',
              currency: this.GroupPolicySection.formValue.currency || 'string',
              custodianNo: 'string',
              deferredPeriodMo: 0,
              escalBasis: selectedCoverModals[index].escBasis || 'string',
              escalIndex: 'string',
              escalRate: 0,
              fundedPol: 'string',
              guarPeriod:
                Number(selectedCoverModals[index].period) ||
                Number(selectedCoverModals[index].term),
              id: index,
              payFreq: selectedCoverModals[index].annFreq || 'string',
              payeeRelOwner: 'string',
              pfaNo: selectedCoverModals[index].admin || 'string',
              policyCode: this.policyCode,
              policyCoversId: response[index].id,
              policyId: this.policyID,
              policyNo: this.policyNo,
              policyNoSuffix: response[index].suffix,
              quoteNo: response[index].quoteNo,
              rev: selectedCoverModals[index].proportion ? true : false,
              revRate: selectedCoverModals[index].proportion,
              sourceOfPremium: selectedCoverModals[index].annSource,
            });
          });
          const coverAnnuityData = this.qs
            .submitIndividualCoversAnnuity(coversAnnuity)
            .toPromise();
          await coverAnnuityData
            .then((data) => {
              console.log(data);
              this.uS.notify('Submitted annnuities and covers successfully', 1);
            })
            .catch((error) => {
              console.error(error);
              this.uS.notify('There was an error in annuity submission', 0);
            })
            .finally(() => {
              console.log('finished annuity');
            });
        })
        .catch((error) => {
          console.error(error);
          this.uS.notify('There was an error in cover submission', 0);
        })
        .finally(() => {
          console.log('finished cover');
          this.isCreatingCoversQuotation = false;
        });
    }
  }

  async submitAgentInfo() {
    if (!this.groupAgentSection.quoteNo) {
      this.uS.notify('Submit policy quote first', 0);
    } else {
      let agentInfo = [];
      this.coverSection.formValue.covers.forEach((cover, index) => {
        if (this.coverSection.selected[index]) {
          this.groupAgentSection.formValue.agents.forEach((agent, i) => {
            agentInfo.push({
              agentNo: agent.agentNo,
              agentSplit: agent.proportion,
              alpha: null,
              coverCode:
                this.coverSection.newCoverScreens[index].info.coverCode ||
                this.coverSection.newCoverScreens[index].info.riderCoverCode,
              holdCommission: false,
              policyCode: this.policyCode,
              id: index + i,
              policyId: this.policyID,
              policyNo: this.policyNo,
              primaryAgent: this.groupAgentSection.isPrimary[i],
              quoteNo: this.groupAgentSection.quoteNo,
              referrerNo: this.groupAgentSection.formValue.referrerCode,
            });
          });
        }
      });
      const agentData = this.qs
        .submitIndividualAgentsQuote(agentInfo)
        .toPromise();
      await agentData
        .then(() => {
          this.uS.notify('Submitted Agent Information Successfully', 1);
          // switch (this.quoteResultScreen) {
          //   case 'ANQ':
          //     $('#AN_result').show();
          //     break;
          //   case 'GQ':
          //     $('#GQ_result').show();
          //     break;
          //   case 'SAQ':
          //     $('#SA_result').show();
          //     break;
          //   case 'ICQ':
          //     $('#IC_result').show();
          //     break;
          //   case 'ILQ':
          //     $('#IL_result').show();
          //     break;
          //   default:
          //     break;
          // }

          // this.openModal('#submitModal');
        })
        .catch(() => {
          this.uS.notify('There was an error in agent submission', 0);
        })
        .finally(() => {
          // this.isCreatingAgentsQuotation = false;
        });
    }
  }

  currentTab(value) {
    switch (value) {
      case 'pills-owner':
        this.hideBTN = false;
        break;
      case 'pills-cover':
        this.hideBTN = false;
        break;
      case 'pills-agent':
        this.hideBTN = false;
        break;
    }
  }
}
