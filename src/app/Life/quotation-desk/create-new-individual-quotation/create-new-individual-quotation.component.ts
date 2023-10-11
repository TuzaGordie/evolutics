import { formatDate } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { ApiService } from 'src/app/Services/api.service';
import { AppService } from 'src/app/Services/app.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { environment } from 'src/environments/environment';
import { QuotationService } from '../../services/quotation-service.service';
import { CreateQuotationService } from '../service/create-quotation.service';
import { FindQuotationService } from '../service/find-quotation.service';
import { AgentComponent } from './sections/agent/agent.component';
import { BeneficiaryComponent } from './sections/beneficiary/beneficiary.component';
import { CoverDetailsComponent } from './sections/cover-details/cover-details.component';
import { QuotationDeskPaymentTabComponent } from './sections/quotation-desk-payment-tab/quotation-desk-payment-tab.component';
import { QuotationDeskPolicyTabComponent } from './sections/quotation-desk-policy-tab/quotation-desk-policy-tab.component';
import { UnderWritingComponent } from './sections/under-writing/under-writing.component';

declare var $: any;

@Component({
  selector: 'app-create-new-individual-quotation',
  templateUrl: './create-new-individual-quotation.component.html',
  styleUrls: ['./create-new-individual-quotation.component.scss'],
})
export class CreateNewIndividualQuotationComponent implements OnInit {
  @ViewChild('beneficiarySection', { static: true })
  beneficiarySection: BeneficiaryComponent;
  @ViewChild('agentSection', { static: true }) agentSection: AgentComponent;
  @ViewChild('coverSection', { static: true })
  coverSection: CoverDetailsComponent;
  @ViewChild('policySection', { static: true })
  policySection: QuotationDeskPolicyTabComponent;
  @ViewChild('paymentSection', { static: true })
  paymentSection: QuotationDeskPaymentTabComponent;
  @ViewChild('underWritingSection', { static: true })
  underWritingSection: UnderWritingComponent;

  private nbofAgent: number = 1;
  createdCovers: any[] = [
    {
      code: null,
      coverDescription: null,
      premPayMeth: null,
      payG: null,
      sumAssured: null,
      coverPremium: null,
    },
  ];
  isCoverDetailsCheck = {};
  toggleClass: boolean = false;
  toggleClass2: boolean = false;
  paymentMethod: any;
  clientNo: string = null;
  assuredFullName = null;
  defaultDate = new Date();
  client: any = {};
  viewClientForm: FormGroup;
  quotationForm: FormGroup;
  defaultRelationshipToOwner = 'self';
  productCode: string;
  productClass: string;
  currentModalCoverCode: string;
  isCreatingQuotation = false;
  isCreatingPolicyQuotation = false;
  quoteResultScreen: string;
  policyTerm: string = '';
  premiumTerm: string = '';

  // from response after creating new quotation
  quoteNo: string;
  totalPeriodicPremium: number = 0;
  isFinalStage: Boolean = false;

  currencyList = [];
  targetBasesList = [];
  paymentMethodsList = [];
  sourcesOfAnnuityList = [];
  sourcesOfPremiumList = [];
  pensionFundAdministratorsList = [];
  targetContributionFrequenciesList = [];
  annuityAnnualEscalationBasesList = [];
  atMaturityConvertToList = [];
  premiumPaymentFrequenciesList = [];
  outwardPaymentMethodsList = [];
  pricingBasesList = [];
  benefitPaymentFrequenciesList = [];
  loanRepaymentFrequenciesList = [];
  discountCodesList = [];
  coversList = [];
  clientDetails: any;
  queryParams: any;
  isCreatingCoversQuotation: boolean = false;
  policyID: any;
  policyNo: any;
  policyCode: any;
  isCreatingAgentsQuotation: boolean;
  isCreatingClientsQuotation: boolean;
  alpha: any;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    public findQuotationService: FindQuotationService,
    public createQuotationService: CreateQuotationService,
    public appS: AppService,
    public qS: QuotationService,
    public uS: UtilityService,
    public router: Router
  ) {
    this.clientNo = this.activatedRoute.snapshot.queryParams.clientNo;
    this.productCode =
      this.createQuotationService.individualQuotationInfo?.productCode;
    this.productClass =
      this.createQuotationService.individualQuotationInfo?.productClass;
  }

  ngOnInit(): void {
    this.clientDetails = this.activatedRoute.snapshot.data['clientDetails'];
    this.queryParams = this.activatedRoute.snapshot.queryParamMap;
    this.quoteNo = this.queryParams.get('quoteNo');
    if (this.quoteNo) {
      this.coverSection.quoteNo =
        this.agentSection.quoteNo =
        this.underWritingSection.quoteNo =
          this.quoteNo;
    }
    this.qS
      .getProductInfo(this.queryParams.get('pcd'))
      .toPromise()
      .then((data) => {
        // console.log('product info',data)
        this.quoteResultScreen = data.quotationResultScreen;
      });
  }

  openCoverScreen({ coverScreen, code }) {
    if (!coverScreen) {
      this.uS.notify('No Cover Screen associated with this cover', 0);
    }
    $(coverScreen).modal('show');
    this.currentModalCoverCode = code;
  }

  openModal(selector) {
    $(selector).modal('show');
  }

  closeCoverScreen(save: boolean = false) {
    if (save) {
      // save button was clicked
      this.checkCoverDetails(this.currentModalCoverCode);
    } else {
      // cancel button was clicked
      this.unCheckCoverDetails(this.currentModalCoverCode);
    }
  }
  closeQuoteResult() {
    this.router.navigate([`../../view-quotation/`], {
      relativeTo: this.activatedRoute,
      queryParams: { quoteNo: this.quoteNo },
    });
  }
  agentCounter() {
    return new Array(this.nbofAgent);
  }

  agentInc() {
    this.nbofAgent = this.nbofAgent + 1;
  }

  unCheckCoverDetails(code: string) {
    this.isCoverDetailsCheck[code] = false;
  }

  checkCoverDetails(code: string) {
    this.isCoverDetailsCheck[code] = true;
  }

  hideRp1Modal() {
    $('#rt1modal').modal('hide');
  }
  setPlan(element: any) {
    if (
      element.value == 'DDebit' ||
      element.value == 'DD' ||
      element.value == 'D'
    ) {
      $('#paymentMethodModal').modal('show');
    }
  }
  setCurrencyList() {
    this.createQuotationService.getCurrenciesList().subscribe((res: any[]) => {
      this.currencyList = res;
    });
  }
  setDiscountCodesList() {
    this.createQuotationService
      .getDiscountCodesList()
      .subscribe((res: any[]) => {
        this.discountCodesList = res;
      });
  }
  setCoversList() {
    this.createQuotationService
      .getCoversList(this.productCode)
      .subscribe((res: any[]) => {
        this.coversList = res;
      });
  }

  async submitPolicyQuotation() {
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
        issuedOn: null,
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
      const policyResponse = this.qS
        .submitIndividualPolicyQuote(policyData)
        .toPromise();
      await policyResponse
        .then((response) => {
          this.uS.notify('Submitted Policy Successfully', 1);
          this.coverSection.quoteNo =
            this.agentSection.quoteNo =
            this.underWritingSection.quoteNo =
            this.quoteNo =
              response.quoteNo;
          this.alpha = response.alpha;
          this.policyID = response.id;
          this.policyNo = response.policyNo;
          this.policyCode = response.policyCode;
        })
        .catch((error) => {
          console.error(error);
          this.uS.notify('An error occured on submission', 0);
          this.coverSection.quoteNo = null;
        })
        .finally(() => {
          this.isCreatingPolicyQuotation = false;
        });
    } catch (error) {
      this.uS.notify(error, 0);
    }
  }

  async submitCoverInfo() {
    if (!this.coverSection.quoteNo) {
      this.uS.notify('Submit policy quote first', 0);
    } else {
      try {
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
        let commDate = this.policySection.formValue.commencementDate
          ? new Date(this.policySection.formValue.commencementDate)
          : null;

        for (const [
          index,
          cover,
        ] of this.coverSection.formValue.covers.entries()) {
          coverPrem.push(null);
          annuityAmt.push(null);
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
            : this.policySection.formValue.premiumPaymentMethod || 'CH';
          if (this.coverSection.selected[index]) {
            if (!this.coverSection.modal[index]) {
              console.log(index);
              throw 'Fill in the cover details';
            }
            console.log(this.coverSection.modal[index]);
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
              aggSumAssured: null,
              // Number(this.coverSection.modal[index].limit) ||
              // Number(this.coverSection.modal[index].assured) ||
              // Number(this.coverSection.modal[index].target_amount),
              alpha: null,
              anniversary: formatDate(todate, 'YYYY-MM-dd', 'en'),
              applYear: null,
              assetId: null,
              assetRedgNo: null,
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
              coverRenewedOn: null,
              coverStartDate: commDate ? commDate.toISOString() : null,
              coverStatus: null,
              coverTermDays:
                this.coverSection.modal[index].conTerm * 365 ||
                this.policySection.formValue.policyTermYears * 365 +
                  Number(this.policySection.formValue.policyTermDays),
              coverTermMo: Number(this.coverSection.modal[index].conMonths),
              currency: this.policySection.formValue.currency,
              deductMin: null,
              deductRate: null,
              deductible: null,
              definedBen: null,
              depAdmin: null,
              deposit: Number(this.coverSection.modal[index].deposit),
              description:
                this.coverSection.coverScreens[index].info.description,
              discCode: this.policySection.formValue.discountCode,
              emv: null,
              enroleeNo: null,
              enroleeNoSuffix: null,
              escalContinuePost: true,
              excess: null,
              excessMin: null,
              excessRate: null,
              fcl: null,
              funded: null,
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
              issueDate: null,
              issueOn: null,
              // loan_date
              // ? loan_date.toISOString()
              // : todate.toISOString(),
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
              paidFromDate: null,
              paidToDate: null,
              payG: this.policySection.formValue.payAsYouGo || false,
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

        const coverData = this.qS
          .submitIndividualQuoteCovers(coverInfo)
          .toPromise();
        await coverData
          .then(async (response) => {
            console.log(response);
            this.uS.notify('Submitting Cover Details', 2);
            this.createdCovers = response;
            response.forEach((cover, index) => {
              coversAnnuity.push({
                activationEvent: null,
                active: true,
                alpha: null,
                annuityAmt: Number(selectedAnnuityAmt[index]),
                annuityPaySchedule: true,
                annuityTermMo: null,
                annuityType: selectedCoverCodes[index],
                bonusPaymentAmt: null,
                bonusPaymentBasis: null,
                claimNo: null,
                coverCode:
                  selectedCoverScreens[index].info.coverCode ||
                  selectedCoverScreens[index].info.riderCoverCode ||
                  null,
                currency: this.policySection.formValue.currency,
                custodianNo: null,
                deferredPeriodMo: null,
                escalBasis: selectedCoverModals[index].escBasis,
                escalIndex: null,
                escalRate: null,
                fundedPol: null,
                guarPeriod:
                  Number(selectedCoverModals[index].period) ||
                  Number(selectedCoverModals[index].term),
                id: index,
                payFreq: selectedCoverModals[index].annFreq,
                payeeRelOwner: null,
                pfaNo: selectedCoverModals[index].admin,
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
            const coverAnnuityData = this.qS
              .submitIndividualCoversAnnuity(coversAnnuity)
              .toPromise();
            await coverAnnuityData
              .then(() => {
                this.uS.notify('Submitted Cover Details Successfully', 1);
              })
              .catch((e) => {
                console.error(e);
                this.uS.notify('There was an error in details submission', 0);
              });
          })
          .catch((e) => {
            console.error(e);
            this.uS.notify('There was an error in covers submission', 0);
          })
          .finally(() => {
            this.isCreatingCoversQuotation = false;
          });
      } catch (error) {
        console.log(error);
        this.isCreatingCoversQuotation = false;
        this.uS.notify(error, 0);
      }
    }
  }

  async submitAgentInfo() {
    if (!this.agentSection.quoteNo) {
      this.uS.notify('Submit policy quote first', 0);
    } else {
      this.isCreatingAgentsQuotation;
      let agentInfo = [];
      this.coverSection.formValue.covers.forEach((cover, index) => {
        if (this.coverSection.selected[index]) {
          this.agentSection.formValue.agents.forEach((agent, i) => {
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
              primaryAgent: this.agentSection.isPrimary[i],
              quoteNo: this.agentSection.quoteNo,
              referrerNo: this.agentSection.formValue.referrerCode,
            });
          });
        }
      });
      const agentData = this.qS
        .submitIndividualAgentsQuote(agentInfo)
        .toPromise();
      await agentData
        .then(() => {
          this.uS.notify('Submitted Agent Information Successfully', 1);
          switch (this.quoteResultScreen) {
            case 'ANQ':
              $('#AN_result').show();
              break;
            case 'GQ':
              $('#GQ_result').show();
              break;
            case 'SAQ':
              $('#SA_result').show();
              break;
            case 'ICQ':
              $('#IC_result').show();
              break;
            case 'ILQ':
              $('#IL_result').show();
              break;
            default:
              break;
          }

          this.openModal('#submitModal');
        })
        .catch(() => {
          this.uS.notify('There was an error in agent submission', 0);
        })
        .finally(() => {
          this.isCreatingAgentsQuotation = false;
        });
    }
  }

  async submitBeneficiaryInfo() {
    if (!this.beneficiarySection.quoteNo) {
      this.uS.notify('Submit policy quote first', 0);
    } else {
      this.isCreatingClientsQuotation = true;
      let relClients = [];
      let mydate = new Date(Date.now());
      const todate = formatDate(mydate, 'YYYY-MM-dd', 'en');
      relClients.push({
        busLine: this.appS.getCurrentSystemMetadata.busline,
        codeTitle: null,
        enroleeNo: null,
        enroleeNoSuffix: null,
        groupNo: null,
        id: null,
        policyCode: this.policyCode,
        policyGroupId: null,
        policyId: this.policyID,
        policyNo: this.policyNo,
        policyNoSuffix: null,
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
              codeTitle: null,
              enroleeNo: null,
              enroleeNoSuffix: null,
              groupNo: null,
              id: null,
              policyCode: this.policyCode,
              policyGroupId: null,
              policyId: this.policyID,
              policyNo: this.policyNo,
              policyNoSuffix: null,
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
          codeTitle: null,
          enroleeNo: null,
          enroleeNoSuffix: null,
          groupNo: null,
          id: null,
          policyCode: this.policyCode,
          policyGroupId: null,
          policyId: this.policyID,
          policyNo: this.policyNo,
          policyNoSuffix: null,
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
          codeTitle: null,
          enroleeNo: null,
          enroleeNoSuffix: null,
          groupNo: null,
          id: null,
          policyCode: this.policyCode,
          policyGroupId: null,
          policyId: this.policyID,
          policyNo: this.policyNo,
          policyNoSuffix: null,
          quoteNo: this.beneficiarySection.quoteNo,
          relClient: nok.clientNo,
          relDate: todate,
          type: nok.relationship,
        });
      }
      const clientData = this.qS
        .submitIndividualClientsInfo(relClients)
        .toPromise();
      await clientData
        .then(() => {
          this.uS.notify('Submitted successfully', 1);
        })
        .catch(() => {
          this.uS.notify('There was an error in clients submission', 0);
        })
        .finally(() => {
          this.isCreatingClientsQuotation = false;
        });
    }
  }
}
