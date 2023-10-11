import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { throwIfEmpty } from 'rxjs/operators';
import { QuotationService } from '../../services/quotation-service.service';
import {
  IClientDetails,
  ICreateQuotePOST,
} from '../../services/quotation.interface';
import { AgentComponent } from './sections/agent/agent.component';
import { BeneficiaryComponent } from './sections/beneficiary/beneficiary.component';
import { CoverDetailsComponent } from './sections/cover-details/cover-details.component';
import { UnderWritingComponent } from './sections/under-writing/under-writing.component';
import { UtilityService } from 'src/app/Services/utility.service';
import { AgentWebLoginComponent } from 'src/app/Life/agent-desk/find-agent/find-main-agent/agentinfo-button/agent-web-login/agent-web-login.component';
import { ThisReceiver } from '@angular/compiler';
import { QuotationGBPolicyTabComponent } from './sections/quotation-gbpolicy-tab/quotation-gbpolicy-tab.component';
import { QuotationGBPaymentTabComponent } from './sections/quotation-gbpayment-tab/quotation-gbpayment-tab.component';
import { AppService } from 'src/app/Services/app.service';
import { formatDate } from '@angular/common';
import { CreateQuotationService } from '../service/create-quotation.service';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
  selector: 'app-create-new-individual-quotation-gb',
  templateUrl: './create-new-individual-quotation-gb.component.html',
  styleUrls: ['./create-new-individual-quotation-gb.component.scss'],
})
export class CreateNewIndividualQuotationGBComponent implements OnInit {
  @ViewChild('beneficiarySection', { static: true })
  beneficiarySection: BeneficiaryComponent;
  @ViewChild('agentSection', { static: true }) agentSection: AgentComponent;
  @ViewChild('coverSection', { static: true })
  coverSection: CoverDetailsComponent;
  @ViewChild('underWritingSection', { static: true })
  underWritingSection: UnderWritingComponent;
  @ViewChild('policySection', { static: true })
  policySection: QuotationGBPolicyTabComponent;
  @ViewChild('paymentSection', { static: true })
  paymentSection: QuotationGBPaymentTabComponent;

  createdQuoteNo: string;
  createdCovers: any[] = [
    {
      code: '',
      coverDescription: '',
      premPayMeth: '',
      payG: '',
      sumAssured: '',
      coverPremium: '',
    },
  ];
  createdPolicy: any;
  premFreq: any = '';
  isCreating;
  isFinalStage: Boolean = false;
  queryParams;
  clientDetails: IClientDetails;
  excessOptions$: Observable<any[]> =
    this.quotationService.getExcessOptions('str');
  deductibleOptions$: Observable<any[]> =
    this.quotationService.getDeductibleOptions('str');
  totalPremium: any;

  toggleClass: boolean = false;
  toggleClass2: boolean = false;
  isCreatingCoversQuotation: boolean = false;
  policyID: any;
  policyNo: any;
  policyCode: any;
  isCreatingAgentsQuotation: boolean;
  isCreatingClientsQuotation: boolean;
  quoteResultScreen: string;

  private nbofContent: number = 1;
  isCreatingPolicyQuotation: boolean;
  clientNo: any;
  productCode: any;
  productClass: any;
  quoteNo: any;
  policyTerm: any;
  premiumTerm: string;
  modify: boolean = false;
  modifyQuote: string;

  constructor(
    private quotationService: QuotationService,
    private route: ActivatedRoute,
    private utilityService: UtilityService,
    private appS: AppService,
    private router: Router,
    private createQuotationService: CreateQuotationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.clientDetails = this.route.snapshot.data['clientDetails'];
    this.queryParams = this.route.snapshot.queryParamMap;
    this.modifyQuote = this.queryParams.get('quoteNo');
    if (this.modifyQuote) {
      this.modify = true;
      this.coverSection.quoteNo =
        this.agentSection.quoteNo =
        this.underWritingSection.quoteNo =
        this.quoteNo =
          this.modifyQuote;
    }
    this.clientNo = this.activatedRoute.snapshot.queryParams.clientNo;
    this.productCode =
      this.createQuotationService.individualQuotationInfo?.productCode;
    this.productClass =
      this.createQuotationService.individualQuotationInfo?.productClass;
    this.quotationService
      .getProductInfo(this.queryParams.get('pcd'))
      .toPromise()
      .then((data) => {
        console.log('product info', data);
        this.quoteResultScreen = data.quotationResultScreen;
      });
  }

  getCoverCodes(covers) {
    return covers
      .map((cover, index): any => {
        if (this.coverSection.selected[index]) {
          return (
            this.coverSection.newCoverScreens[index].info.coverCode ||
            this.coverSection.newCoverScreens[index].info.riderCoverCode
          );
        } else {
          return false;
        }
      })
      .filter((cover) => !!cover); // filter out screens, which returned false in the above step
  }
  getPolicyEndDate() {
    // `${this.coverSection.formValue.policyTermYears}-${this.coverSection.formValue.policyTermMonths}-${this.coverSection.formValue.policyTermDays}`
    // TODO if there are policy term inputs and commencement date; add them together to get end date.
    // default to a year from now
    return new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  }
  // getBaseSumAssured(){
  //   return this.coverSection.newCoverScreens.find(cover => {
  //     return cover.info.base == '1'
  //   })
  // }
  getAgentInfo() {
    const coverCodes = this.getCoverCodes(this.coverSection.formValue.covers);
    const agentInfo = [];
    this.agentSection.formValue.agents.forEach((agent) => {
      coverCodes.forEach((coverCode) => {
        agentInfo.push({
          agentNo: agent.agentNo,
          agentSplit: agent.proportion,
          primaryAgent: agent.primaryAgent,
          alpha: 'string',
          coverCode: coverCode,
          holdCommission: false,
          id: 0,
          policyCode: 'string',
          policyId: 0,
          policyNo: 'string',
          quoteNo: 'string',
          referrerNo: this.agentSection.formValue.referrerNo,
        });
      });
    });
    return agentInfo;
  }

  getCoverInfo() {
    const coverInfo = [];
    const todate = new Date(Date.now());
    const coverEndDate = this.getPolicyEndDate();

    this.coverSection.formValue.covers.forEach((cover, index) => {
      // let paymentMethod = this.coverSection.newCoverScreens[index].info.fundingOption ? 'F' : this.coverSection.formValue.premiumPaymentMethod || "CH"
      if (this.coverSection.selected[index]) {
        coverInfo.push({
          agentNo: this.agentSection.formValue.agents.find(
            (agent) => agent.primaryAgent
          ).agentNo,
          aggSumAssured:
            this.coverSection.modal[index].limit ||
            this.coverSection.modal[index].assured,
          alpha: 'string',
          anniversary: '2022-01-15',
          applYear:
            this.coverSection.formValue.covers[index].applicationDate?.slice(
              -4
            ) || '', // get the year from the application date field
          assetId: this.coverSection.formValue.assetNo
            ? Number(this.coverSection.formValue.assetNo)
            : '',
          assetRedgNo: this.coverSection.formValue.redgNo,
          assured: this.coverSection.formValue.covers[index].assuredNo,
          assuredName: this.coverSection.formValue.covers[index].assuredName,
          assuredRelToOwner:
            this.coverSection.formValue.covers[index].assuredRel,
          base: this.coverSection.newCoverScreens[index].info.base,
          benEscalRate: 0,
          benPayBasis: 'string',
          benPayFreq: 'string',
          benPayTermDays: 0,
          benPayTermMo: 0,
          benSchedule: true,
          benScheduleBasis: 'string',
          branchCode: this.agentSection.formValue.branchCode,
          busLine: 'G',
          code:
            this.coverSection.newCoverScreens[index].info.coverCode ||
            this.coverSection.newCoverScreens[index].info.riderCoverCode,
          commEarnBasis: 'string',
          commEarnPeriod: 0,
          commRate: this.agentSection.formValue.commissionRate,
          commType: 'string',
          companyCode: 'string',
          convertReason: 'string',
          coverDescription:
            this.coverSection.newCoverScreens[index].info.description,
          coverEndDate: coverEndDate,
          coverEndOn: coverEndDate,
          coverNo: 0,
          coverPremFreq: this.coverSection.formValue.premiumPayFreq || 'S',
          coverPremPayMeth:
            this.coverSection.formValue.premiumPaymentMethod || 'CH',
          coverPremium: null,
          coverRenewalDueOn: coverEndDate,
          coverRenewedOn: '',
          coverStartDate:
            this.coverSection.formValue.commencementDate || todate,
          coverTermDays: this.coverSection.modal[index].premTerm || 0,
          coverTermMo: this.coverSection.modal[index].premMonths || 0,
          currency: this.coverSection.formValue.currency,
          deductMin: this.coverSection.modal[index].deductMin,
          deductRate: this.coverSection.modal[index].deductibleRate,
          deductAmount: this.coverSection.modal[index].deductibleAmount,
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
          excessMin: this.coverSection.modal[index].excessMin,
          excessAmount: this.coverSection.modal[index].excessAmount,
          excessRate: this.coverSection.modal[index].excessRate,
          fcl: 0,
          funded: true,
          gmv: 0,
          groupNo: 'string',
          guarYield: 0,
          inComplete: true,
          initialBaseCoverSa: 0,
          initialSumAssured:
            Number(this.coverSection.modal[index].limit) ||
            Number(this.coverSection.modal[index].assured) ||
            0,
          insType: this.queryParams.get('itype'),
          issueAge: 0,
          issueAssetAge: 0,
          issueDate: '2022-01-15',
          issueOn: '2022-01-15T00:53:07.273Z',
          loanIntRate: 0,
          loanRepayFreq: 'string',
          memberNo: 'string',
          monthlyIncome: 0,
          noPremPayInLife: 0,
          noPremPayInYr: 0,
          nonMedicalLimit: 0,
          paidFromDate: '2022-01-15',
          paidToDate: '2022-01-15',
          payG: this.coverSection.formValue.payAsYouGo,
          policyCode: 'string',
          policyId: 0,
          policyNo: 'string',
          policyNoSuffix: 0,
          policyTermDays: this.coverSection.formValue.policyTermDays || 0,
          policyTermMonths: this.coverSection.formValue.policyTermMonths || 0,
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
          premiumToBen: true,
          productClass: this.queryParams.get('pcl'),
          productCode: this.queryParams.get('pcd'),
          quoteNo: 'string',
          quoteValidBasis: 'string',
          quoteValidDays: 0,
          relLifeAssured: 'string',
          renewalAge: 0,
          renewalAssetAge: 0,
          saBasis: 'string',
          saEscalRate: 0,
          sar: 0,
          seqNo: 0,
          stFactor: 0,
          subgroupName: 'string',
          subgroupNo: 'string',
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
    return coverInfo;
  }

  getPolicyBankInformation() {
    return {
      alpha: 'string',
      clientName: this.route.snapshot.data['clientDetails'].fullName,
      clientNo: this.route.snapshot.data['clientDetails'].clientNo,
      clientRelOwner: 'S',
      ddBankNo: 'string',
      ddMandateVerified: true,
      id: 0,
      mandateRef: 'string',
      payFreq: this.coverSection.formValue.premiumPayFreq,
      payorName: this.route.snapshot.data['clientDetails'].fullName,
      payorNo: this.route.snapshot.data['clientDetails'].clientNo,
      payoutBankNo: 'string',
      payoutMethod: this.coverSection.formValue.premiumPaymentMethod,
      policyBenScheduleId: 0,
      policyCode: this.queryParams.get('pcd'),
      policyCoversAnnuityId: 0,
      policyId: 0,
      policyNo: 'string',
      policyNoSuffix: 0,
      prefPayDay: 0,
    };
  }

  getPolicyRelatedClientsInfo() {
    const todate = new Date(Date.now());
    const relatedClients = [];
    const owner = this.route.snapshot.data['clientDetails'];
    const nextOfKin = this.beneficiarySection.nextOfKin.value;
    const beneficiaries = this.beneficiarySection.beneficiaries.value;
    relatedClients.push(owner.clientNo);
    relatedClients.push(nextOfKin.clientNo);
    beneficiaries.forEach((beneficiary) =>
      relatedClients.push(beneficiary.clientNo)
    );

    return relatedClients.map((client) => ({
      busLine: 'G',
      codeTitle: 'string',
      enroleeNo: 0,
      enroleeNoSuffix: 0,
      groupNo: 0,
      id: 0,
      policyCode: 'string',
      policyGroupId: 0,
      policyId: 0,
      policyNo: 'string',
      policyNoSuffix: 0,
      quoteNo: 'string',
      relClient: client,
      relDate: todate,
      type: 'string',
    }));
  }

  getPolicyCoversAnnuities() {
    return [
      {
        activationEvent: 'string',
        active: true,
        alpha: 'string',
        annuityAmt: 0,
        annuityPaySchedule: true,
        annuityTermMo: 0,
        annuityType: 'string',
        bonusPaymentAmt: 0,
        bonusPaymentBasis: 'string',
        claimNo: 'string',
        coverCode: 'string',
        currency: 'string',
        custodianNo: 'string',
        deferredPeriodMo: 0,
        escalBasis: 'string',
        escalIndex: 'string',
        escalRate: 0,
        fundedPol: 'string',
        guarPeriod: 0,
        id: 0,
        payFreq: 'string',
        payeeRelOwner: 'string',
        pfaNo: 'string',
        policyCode: 'string',
        policyCoversId: 0,
        policyId: 0,
        policyNo: 'string',
        policyNoSuffix: 0,
        quoteNo: 'string',
        rev: true,
        revRate: 0,
        sourceOfPremium: 'string',
      },
    ];
  }

  getPolicyAnnuityPayeeList() {
    return [
      {
        alpha: 'string',
        annFreq: 'string',
        bankNo: 'string',
        claimNo: 'string',
        clientNo: 'string',
        currency: 'string',
        finalPayAmt: 0,
        finalPayDate: '2022-03-06T05:16:37.686Z',
        firstPayAmt: 0,
        firstPayDate: '2022-03-06T05:16:37.686Z',
        id: 0,
        lastPayAmt: 0,
        lastPayDate: '2022-03-06T05:16:37.686Z',
        nextPayAmt: 0,
        nextPayDate: '2022-03-06T05:16:37.686Z',
        payeeAmt: 0,
        payeeName: 'string',
        payeeNo: 'string',
        payeePolNo: 'string',
        payeeRelOwner: 'string',
        paymentMethod: 'string',
        policyCode: 'string',
        policyCoversAnnuityId: 0,
        policyId: 0,
        policyNo: 'string',
        proportion: 0,
      },
    ];
  }

  submit() {
    this.isCreating = true;

    let newinput = {
      agentInfo: this.getAgentInfo(),
      covers: this.getCoverInfo(),
      ownerClientNo: this.route.snapshot.data['clientDetails'].clientNo,
      policyBankInformation: this.getPolicyBankInformation(),
      policyRelatedClientsInfo: this.getPolicyRelatedClientsInfo(),
      policyCoversAnnuities: this.getPolicyCoversAnnuities(),
      policyCoversAnnuityPayeeList: this.getPolicyAnnuityPayeeList(),
      premFreq: 'string',
      totalPremium: 0,
    };

    console.log(newinput);
    localStorage.setItem('quote', JSON.stringify(newinput));

    return this.quotationService.submitIndividualQuote(newinput).subscribe({
      next: (res: any) => {
        console.log(res);

        this.isCreating = false;
        this.premFreq = res.premFreq;
        this.createdQuoteNo = res.quoteNo;
        this.createdCovers = res.covers;
        this.createdPolicy = res.policy;
        this.totalPremium = res.totalPremium;
        $('#submitModal').modal('show');
      },
      error: (err) => {
        this.isCreating = undefined;
        console.log(err);
        // this.createdQuoteNo = 'test'
        // this.createdCovers = [{code: 'test', coverDescription: 'test', premPayMeth: 'test', payG: 'test', sumAssured: 'test', coverPremium: 'test'}]
        // $("#submitModal").modal('show')
        this.utilityService.notify(
          'Error creating new quotation ' + err.statusText,
          0
        );
      },
    });
  }

  openModal(selector) {
    $(selector).modal('show');
  }

  closeQuoteResult() {
    this.router.navigate([`../../view-quotation/`], {
      relativeTo: this.activatedRoute,
      queryParams: { quoteNo: this.quoteNo },
    });
  }

  async submitPolicyQuotation() {
    console.log(this.policySection);
    try {
      if (!this.policySection.formValue.applicationDate)
        throw 'Application Date is Compulsory';
      if (
        !(
          this.policySection.formValue.policyTermYears ||
          this.policySection.formValue.policyTermMonths ||
          this.policySection.formValue.policyTermDays
        )
      )
        throw 'Policy Term is Compulsory';
      if (!this.policySection.formValue.commencementDate)
        throw 'Commencement Date is Compulsory';
      if (!this.policySection.formValue.currency)
        throw 'Currency is Compulsory';
      if (!this.policySection.formValue.premiumPaymentMethod)
        throw 'Premium Payment Method is Compulsory';
      if (!this.policySection.formValue.premiumPayFreq)
        throw 'Premium Payment Frequency is Compulsory';
      this.policyTerm = String(
        this.policySection.formValue.policyTermYears * 365 +
          Number(this.policySection.formValue.policyTermDays) +
          this.policySection.formValue.policyTermMonths * 30
      );
      this.premiumTerm = String(
        (this.policySection.formValue.premiumPaymentTermYears * 12 +
          Number(this.policySection.formValue.premiumPaymentTermMonths)) *
          30
      );
      // this.isCreatingQuotation = true;
      this.isCreatingPolicyQuotation = true;
      let todate = new Date(Date.now());
      let applDate = this.policySection.formValue.applicationDate
        ? new Date(this.policySection.formValue.applicationDate)
        : null;
      let commDate = this.policySection.formValue.commencementDate
        ? new Date(this.policySection.formValue.commencementDate)
        : null;
      let policyData = {
        agentNo: this.agentSection.formValue.agents[0].agentNo,
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
        branchCode: this.agentSection.formValue.branchCode,
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
        currency: this.policySection.formValue.currency,
        daysToExpiry: null,
        daysToQuoteExpiry: null,
        discCode: this.policySection.formValue.discountCode ? true : false,
        examination: true,
        externalRef: this.agentSection.formValue.externalRef,
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
        payinFreq: this.policySection.formValue.premiumPayFreq,
        payinMethod: this.policySection.formValue.premiumPaymentMethod,
        policyCode: null,
        policyGroupId: null,
        policyNo: null,
        policyNoSuffix: null,
        policyStatus: null,
        policyTermDays:
          this.policySection.formValue.policyTermYears * 365 +
          Number(this.policySection.formValue.policyTermDays),
        policyTermMo: Number(this.policySection.formValue.policyTermMonths),
        premEscalationRate: null,
        premFreq: this.policySection.formValue.premiumPayFreq,
        premIndexTable: null,
        premPayTermMo:
          this.policySection.formValue.premiumPaymentTermYears * 12 +
          Number(this.policySection.formValue.premiumPaymentTermMonths),
        premiumDue: null,
        premiumLoanPeriod: null,
        premiumPaid: null,
        premiumTarget: null,
        primaryAgent:
          this.agentSection.formValue.agents[0].agentNo ||
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
        referrerNo: this.agentSection.formValue.referrerCode,
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
      const policyResponse = this.quotationService
        .submitIndividualPolicyQuote(policyData)
        .toPromise();
      await policyResponse
        .then((response) => {
          this.utilityService.notify('Submitted Policy Successfully', 1);
          this.coverSection.quoteNo =
            this.agentSection.quoteNo =
            this.underWritingSection.quoteNo =
            this.quoteNo =
              response.quoteNo;
          this.policyID = response.id;
          this.policyNo = response.policyNo;
          this.policyCode = response.policyCode;
        })
        .catch((error) => {
          console.error(error);
          this.utilityService.notify('An error occured on submission', 0);
          this.coverSection.quoteNo = null;
        })
        .finally(() => {
          this.isCreatingPolicyQuotation = false;
        });
    } catch (error) {
      this.utilityService.notify(error, 0);
    }
  }

  async submitCoverInfo() {
    if (!this.coverSection.quoteNo) {
      this.utilityService.notify('Submit policy quote first', 0);
    } else {
      try {
        if (this.modify) {
          if (this.modifyQuote == this.coverSection.quoteNo)
            throw 'Submit Modified Policy First';
        }
        this.isCreatingCoversQuotation = true;
        let PremFreq = this.policySection.formValue.premiumPayFreq;
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

        this.coverSection.formValue.covers.forEach((cover, index) => {
          coverPrem.push('');
          annuityAmt.push('');

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

          let paymentMethod = this.coverSection.newCoverScreens[index].info
            .fundingOption
            ? 'F'
            : this.policySection.formValue.premiumPaymentMethod || 'CH';
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
              agentNo: this.agentSection.formValue.agents[0].agentNo,
              aggSumAssured:
                Number(this.coverSection.modal[index].limit) ||
                Number(this.coverSection.modal[index].slimit) ||
                Number(this.coverSection.modal[index].assured) ||
                Number(this.coverSection.modal[index].target) ||
                Number(this.coverSection.modal[index].amount) ||
                Number(this.coverSection.modal[index].target_amount),
              alpha: null,
              anniversary: formatDate(todate, 'YYYY-MM-dd', 'en'),
              applYear: null,
              assetId: this.coverSection.formValue.assetNo,
              assetRedgNo: this.coverSection.formValue.redgNo,
              assured: this.coverSection.formValue.covers[index].assuredNo,
              assuredName:
                this.coverSection.formValue.covers[index].assuredName,
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
              branchCode: this.agentSection.formValue.branchCode,
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
                this.policySection.formValue.premiumPayFreq,
              coverPremPayMeth:
                this.policySection.formValue.premiumPaymentMethod,
              coverPremium: Number(coverPrem[index]),
              coverRenewalDueOn: formatDate(todate, 'YYYY-MM-dd', 'en'),
              coverRenewedOn: formatDate(todate, 'YYYY-MM-dd', 'en'),
              coverStartDate: formatDate(todate, 'YYYY-MM-dd', 'en'),
              coverStatus: null,
              coverTermDays:
                this.coverSection.modal[index].conTerm * 365 ||
                this.policySection.formValue.policyTermYears * 365 +
                  Number(this.policySection.formValue.policyTermDays),
              coverTermMo: Number(this.coverSection.modal[index].conMonths),
              currency: this.policySection.formValue.currency,
              deductMin: null,
              deductRate: null,
              deductible: this.coverSection.modal[index].deductible,
              definedBen: null,
              depAdmin: true,
              deposit: Number(this.coverSection.modal[index].deposit),
              description:
                this.coverSection.coverScreens[index].info.description,
              discCode: this.policySection.formValue.discountCode,
              emv: null,
              enroleeNo: null,
              enroleeNoSuffix: null,
              escalContinuePost: true,
              excess: this.coverSection.modal[index].excess,
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
                Number(this.coverSection.modal[index].slimit) ||
                Number(this.coverSection.modal[index].assured) ||
                Number(this.coverSection.modal[index].target) ||
                Number(this.coverSection.modal[index].amount) ||
                Number(this.coverSection.modal[index].target_amount),
              insType: this.queryParams.get('is'),
              issueAge: null,
              issueAssetAge: null,
              issueDate: formatDate(todate, 'YYYY-MM-dd', 'en'),
              issueOn: loan_date
                ? loan_date.toISOString()
                : todate.toISOString(),
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
              payG: this.policySection.formValue.payAsYouGo || false,
              policyCode: this.policyCode,
              policyId: this.policyID,
              policyNo: this.policyNo,
              policyNoSuffix: null,
              policyTermDays: this.policyTerm,
              premFactor: null,
              premPayFreq: PremFreq,
              premPayMeth: this.policySection.formValue.premiumPaymentMethod,
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
                Number(this.coverSection.modal[index].slimit) ||
                Number(this.coverSection.modal[index].assured) ||
                Number(this.coverSection.modal[index].target) ||
                Number(this.coverSection.modal[index].amount) ||
                Number(this.coverSection.modal[index].target_amount),
              sumAtRisk: null,
              uncoveredSar: null,
            });
          }
        });

        const coverData = this.quotationService
          .submitIndividualQuoteCovers(coverInfo)
          .toPromise();
        await coverData
          .then(async (response) => {
            this.utilityService.notify('Submitting...', 2);
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
                currency: this.policySection.formValue.currency || 'string',
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
            const coverAnnuityData = this.quotationService
              .submitIndividualCoversAnnuity(coversAnnuity)
              .toPromise();
            await coverAnnuityData
              .then((data) => {
                console.log(data);
                this.utilityService.notify(
                  'Submitted cover details successfully',
                  1
                );
              })
              .catch((error) => {
                console.error(error);
                this.utilityService.notify(
                  'There was an error in covers submission',
                  0
                );
              })
              .finally(() => {
                console.log('finished annuity');
              });
          })
          .catch((error) => {
            console.error(error);
            this.utilityService.notify(
              'There was an error in covers submission',
              0
            );
          })
          .finally(() => {
            console.log('finished cover');
            this.isCreatingCoversQuotation = false;
          });
      } catch (error) {
        this.utilityService.notify(error, 0);
      }
    }
  }

  async submitAgentInfo() {
    if (!this.agentSection.quoteNo) {
      this.utilityService.notify('Submit policy quote first', 0);
    } else {
      try {
        if (this.modify) {
          if (this.modifyQuote == this.agentSection.quoteNo)
            throw 'Submit Modified Policy First';
        }

        this.isCreatingAgentsQuotation;
        let agentInfo = [];
        this.coverSection.formValue.covers.forEach((cover, index) => {
          if (this.coverSection.selected[index]) {
            this.agentSection.formValue.agents.forEach((agent, i) => {
              agentInfo.push({
                agentNo: agent.agentNo,
                agentSplit: agent.proportion,
                alpha: 'string',
                coverCode:
                  this.coverSection.newCoverScreens[index].info.coverCode ||
                  this.coverSection.newCoverScreens[index].info.riderCoverCode,
                holdCommission: false,
                policyCode: this.policyCode,
                id: index + i,
                policyId: this.policyID,
                policyNo: this.policyNo,
                primaryAgent: this.agentSection.isPrimary[i],
                quoteNo: this.agentSection.quoteNo,
                referrerNo: this.agentSection.formValue.referrerCode,
              });
            });
          }
        });
        console.log(agentInfo);
        const agentData = this.quotationService
          .submitIndividualAgentsQuote(agentInfo)
          .toPromise();
        await agentData
          .then((response) => {
            console.log(response);
            this.utilityService.notify('Submitted Agent Info successfully', 1);

            console.log('quote result', this.quoteResultScreen);
            switch (this.quoteResultScreen) {
              case 'AN':
                $('#AN_result').show();
                break;
              default:
                break;
            }

            this.openModal('#submitModal');
          })
          .catch((error) => {
            console.error(error);
            this.utilityService.notify(
              'There was an error in agent submission',
              0
            );
          })
          .finally(() => {
            console.log('finished agent');
            this.isCreatingAgentsQuotation = false;
          });
      } catch (error) {
        this.utilityService.notify(error, 0);
      }
    }
  }

  async submitPaymentInfo() {
    console.log('payment');
  }

  async submitBeneficiaryInfo() {
    if (!this.beneficiarySection.quoteNo) {
      this.utilityService.notify('Submit policy quote first', 0);
    } else {
      this.isCreatingClientsQuotation = true;
      let relClients = [];
      let mydate = new Date(Date.now());
      const todate = formatDate(mydate, 'YYYY-MM-dd', 'en');
      relClients.push({
        busLine: this.appS.getCurrentSystemMetadata.busline,
        codeTitle: 'string',
        enroleeNo: 0,
        enroleeNoSuffix: 0,
        groupNo: 0,
        id: 0,
        policyCode: this.policyCode,
        policyGroupId: 0,
        policyId: this.policyID,
        policyNo: this.policyNo,
        policyNoSuffix: 0,
        quoteNo: this.beneficiarySection.quoteNo,
        relClient: this.activatedRoute.snapshot.data['clientDetails'].clientNo,
        relDate: todate,
        type: 'S',
      });
      this.beneficiarySection.formValue.beneficiaries.forEach(
        (beneficiary, index) => {
          if (
            beneficiary.clientNo !=
            this.activatedRoute.snapshot.data['clientDetails'].clientNo
          ) {
            relClients.push({
              busLine: this.appS.getCurrentSystemMetadata.busline,
              codeTitle: 'string',
              enroleeNo: 0,
              enroleeNoSuffix: 0,
              groupNo: 0,
              id: 0,
              policyCode: this.policyCode,
              policyGroupId: 0,
              policyId: this.policyID,
              policyNo: this.policyNo,
              policyNoSuffix: 0,
              quoteNo: this.beneficiarySection.quoteNo,
              relClient: beneficiary.clientNo,
              relDate: todate,
              type: beneficiary.relationship,
            });
          }
        }
      );
      let legGuard = this.beneficiarySection.formValue.legalGuardian;
      if (
        legGuard.clientNo !=
        this.activatedRoute.snapshot.data['clientDetails'].clientNo
      ) {
        relClients.push({
          busLine: this.appS.getCurrentSystemMetadata.busline,
          codeTitle: 'string',
          enroleeNo: 0,
          enroleeNoSuffix: 0,
          groupNo: 0,
          id: 0,
          policyCode: this.policyCode,
          policyGroupId: 0,
          policyId: this.policyID,
          policyNo: this.policyNo,
          policyNoSuffix: 0,
          quoteNo: this.beneficiarySection.quoteNo,
          relClient: legGuard.clientNo,
          relDate: todate,
          type: legGuard.relationship,
        });
      }
      let nok = this.beneficiarySection.formValue.nextOfKin;
      if (
        nok.clientNo !=
        this.activatedRoute.snapshot.data['clientDetails'].clientNo
      ) {
        relClients.push({
          busLine: this.appS.getCurrentSystemMetadata.busline,
          codeTitle: 'string',
          enroleeNo: 0,
          enroleeNoSuffix: 0,
          groupNo: 0,
          id: 0,
          policyCode: this.policyCode,
          policyGroupId: 0,
          policyId: this.policyID,
          policyNo: this.policyNo,
          policyNoSuffix: 0,
          quoteNo: this.beneficiarySection.quoteNo,
          relClient: nok.clientNo,
          relDate: todate,
          type: nok.relationship,
        });
      }
      console.log(relClients);
      const clientData = this.quotationService
        .submitIndividualClientsInfo(relClients)
        .toPromise();
      await clientData
        .then((response) => {
          console.log(response);
          this.utilityService.notify('Submitted successfully', 1);
        })
        .catch((error) => {
          console.error(error);
          this.utilityService.notify(
            'There was an error in clients submission',
            0
          );
        })
        .finally(() => {
          console.log('finished clients');
          this.isCreatingClientsQuotation = false;
        });
    }
  }

  contentCounter() {
    return new Array(this.nbofContent);
  }

  contentInc() {
    this.nbofContent = this.nbofContent + 1;
  }
}
