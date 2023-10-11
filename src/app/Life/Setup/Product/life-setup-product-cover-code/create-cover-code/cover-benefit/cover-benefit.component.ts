import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralRatesService } from 'src/app/Life/Setup/Rates/general-rates/general-rates-extras/general-rates.service';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindProductService } from '../../../service/find-product.service';
import {
  Basic,
  Benefit,
  CoverBenefitClaim,
  CoverBenefitFreq,
  CoversAutoSettleCover,
  CoversAutoTerminateCover,
  CoversBenefitEscal,
  CoversBenefitSchedule,
  CoversCoversWaived,
  CoversLoanIntRate,
  CoversSumAssured,
  CoversSumAssuredOpt,
  CreateCoverCode,
  CreateCoversBenefit,
} from '../../cover-code';
import { CoverService } from '../../cover-service.service';

declare var $: any;

@Component({
  selector: 'app-cover-benefit',
  templateUrl: './cover-benefit.component.html',
  styleUrls: ['./cover-benefit.component.scss'],
})
export class CoverBenefitComponent implements OnInit {
  @Input() createCoverCode: CreateCoverCode;
  @Input() action: string;
  @ViewChildren('inp') inputs: QueryList<any>;
  @Input() coverCode: string;
  @Input() isCreate: boolean;

  validators = Validators;

  claimTypeList: any[] = [];
  benifitPaymentList: any[] = [];
  sumAssuredCalcBasisList: any[] = [];
  coversWaivedList: any[] = [];
  claimSettleList: any = [];
  benefitScheduleBasis: any = [];
  coverStatusOnClaim: any = [];
  frequencyOfPayments: any = [];
  benefitPaymentFrequencies: any[] = [];
  noOfPayments: any[] = [];

  claimIndex: number;

  nbofben: number = 1;

  @Input() loading = false;
  @Input() loadingText = '';

  constructor(
    public findProductService: FindProductService,
    private activatedRoute: ActivatedRoute,
    private codeService: CodeService,
    private router: Router,
    private util: UtilityService,
    private companyService: CompanyService,
    public coverService: CoverService,
    public grS: GeneralRatesService
  ) {}
  ngAfterViewInit(): void {
    this.coverService.disableInputs(this.inputs);
  }
  ngOnInit(): void {
    this.setClaim();
    this.setClaimTypes();
    this.setBenifitPaymentBasis();
    this.setSumassuredCalcBasis();
    this.setBenefitScheduleBasis();
    this.setCoverStatusOnClaim();
    this.setFrequencyOfPayments();
    this.setCoversWaived();
    this.setNoOfPayments();
    this.setBenefitFrequency();

    if (!this.coverService.isCreate) {
      this.loading=true;
      this.loadingText='Fetching Cover Benefits'
      this.findProductService
        .getBenefit(this.coverCode)
        .subscribe((data: CreateCoversBenefit) => {
          if (data != null) {
            this.createCoverCode.benefit.coversBenefit = data.coversBenefit;
            this.createCoverCode.benefit.coversSumAssured =
              data.coversSumAssured;
          } else {
            this.createCoverCode.benefit.coversBenefit = new Benefit();
            this.createCoverCode.benefit.coversSumAssured =
              new CoversSumAssured();
          }

          this.createCoverCode.benefit.coversAutoSettleCover = [];
          this.createCoverCode.benefit.coversAutoTerminateCover = [];
          this.createCoverCode.benefit.coverBenefitFreqs = [];
          this.createCoverCode.benefit.coversBenefitEscals = [];
          this.createCoverCode.benefit.coversBenefitSchedules = [];
          this.createCoverCode.benefit.coversCoversWaived = [];
          this.createCoverCode.benefit.coversLoanIntRates = [];
          this.createCoverCode.benefit.coversBenefitClaims = [];
          this.createCoverCode.benefit.coversSumAssuredOpts = [];

          data?.coversAutoSettleCover &&
            data?.coversAutoSettleCover.map((settle) => {
              if (this.coverService.isClone) delete settle.id;
              settle.rowId =
                this.createCoverCode.benefit.coversAutoSettleCover.length + 1;
              this.createCoverCode.benefit.coversAutoSettleCover.push(settle);
            });

          data?.coversAutoTerminateCover &&
            data?.coversAutoTerminateCover.map((coversAutoTerminateCover) => {
              if (this.coverService.isClone) delete coversAutoTerminateCover.id;
              coversAutoTerminateCover.rowId =
                this.createCoverCode.benefit.coversAutoTerminateCover.length +
                1;
              this.createCoverCode.benefit.coversAutoTerminateCover.push(
                coversAutoTerminateCover
              );
            });

          data?.coverBenefitFreqs.map((freq) => {
            if (this.coverService.isClone) delete freq.id;
            freq.rowId =
              this.createCoverCode.benefit.coverBenefitFreqs.length + 1;
            this.createCoverCode.benefit.coverBenefitFreqs.push(freq);
          });

          data?.coversBenefitEscals &&
            data?.coversBenefitEscals.map((coversBenefitEscals) => {
              if (this.coverService.isClone) delete coversBenefitEscals.id;
              coversBenefitEscals.rowId =
                this.createCoverCode.benefit.coversBenefitEscals.length + 1;
              this.createCoverCode.benefit.coversBenefitEscals.push(
                coversBenefitEscals
              );
            });

          data?.coversBenefitSchedules &&
            data?.coversBenefitSchedules.map((coversBenefitSchedules) => {
              if (this.coverService.isClone) delete coversBenefitSchedules.id;
              coversBenefitSchedules.rowId =
                this.createCoverCode.benefit.coversBenefitSchedules.length + 1;
              this.createCoverCode.benefit.coversBenefitSchedules.push(
                coversBenefitSchedules
              );
            });

          data?.coversCoversWaived &&
            data?.coversCoversWaived.map((coversCoversWaived) => {
              if (this.coverService.isClone) delete coversCoversWaived.id;
              coversCoversWaived.rowId =
                this.createCoverCode.benefit.coversCoversWaived.length + 1;
              this.createCoverCode.benefit.coversCoversWaived.push(
                coversCoversWaived
              );
            });

          data?.coversLoanIntRates &&
            data?.coversLoanIntRates.map((coversLoanIntRates) => {
              if (this.coverService.isClone) delete coversLoanIntRates.id;
              coversLoanIntRates.rowId =
                this.createCoverCode.benefit.coversAutoSettleCover.length + 1;
              this.createCoverCode.benefit.coversLoanIntRates.push(
                coversLoanIntRates
              );
            });

          data?.coversBenefitClaims &&
            data?.coversBenefitClaims.map((coversBenefitClaims) => {
              if (this.coverService.isClone) delete coversBenefitClaims.id;
              coversBenefitClaims.rowId =
                this.createCoverCode.benefit.coversBenefitClaims.length + 1;
              this.createCoverCode.benefit.coversBenefitClaims.push(
                coversBenefitClaims
              );
            });

          data?.coversSumAssuredOpts &&
            data?.coversSumAssuredOpts.map((coversSumAssuredOpts) => {
              if (this.coverService.isClone) delete coversSumAssuredOpts.id;
              coversSumAssuredOpts.rowId =
                this.createCoverCode.benefit.coversSumAssuredOpts.length + 1;
              this.createCoverCode.benefit.coversSumAssuredOpts.push(
                coversSumAssuredOpts
              );
            });

          if (this.coverService.isClone) {
            delete this.createCoverCode.benefit.coversSumAssured.id;
            delete this.createCoverCode.benefit.coversBenefit.id;
          }

          if (!this.createCoverCode?.benefit?.coverBenefitFreqs?.length)
            this.createCoverCode.benefit.coverBenefitFreqs = [
              new CoverBenefitFreq(),
            ];
          if (!this.createCoverCode?.benefit?.coversBenefitClaims?.length)
            this.createCoverCode.benefit.coversBenefitClaims.push(
              new CoverBenefitClaim()
            );
          if (!this.createCoverCode?.benefit?.coversAutoSettleCover?.length)
            this.createCoverCode.benefit.coversAutoSettleCover.push(
              new CoversAutoSettleCover()
            );
          if (!this.createCoverCode?.benefit?.coversAutoTerminateCover?.length)
            this.createCoverCode.benefit.coversAutoTerminateCover.push(
              new CoversAutoTerminateCover()
            );
          if (!this.createCoverCode?.benefit?.coversBenefitEscals?.length)
            this.createCoverCode.benefit.coversBenefitEscals.push(
              new CoversBenefitEscal()
            );
          if (!this.createCoverCode?.benefit?.coversBenefitSchedules?.length)
            this.createCoverCode.benefit.coversBenefitSchedules.push(
              new CoversBenefitSchedule()
            );
          if (!this.createCoverCode?.benefit?.coversCoversWaived?.length)
            this.createCoverCode.benefit.coversCoversWaived.push(
              new CoversCoversWaived()
            );
          if (!this.createCoverCode?.benefit?.coversLoanIntRates?.length)
            this.createCoverCode.benefit.coversLoanIntRates.push(
              new CoversLoanIntRate()
            );
          if (!this.createCoverCode?.benefit?.coversSumAssuredOpts?.length)
            this.createCoverCode.benefit.coversSumAssuredOpts.push(
              new CoversSumAssuredOpt()
            );
          this.coverService.disableInputs(this.inputs);
          this.loading=false
        });
    }
  }

  saveBenefits() {
    this.loading = true;
    this.loadingText = 'Saving Benefits.....';

    this.createCoverCode.benefit.coversBenefit.code =
      this.createCoverCode.basic.basic.code;

    this.coverService.saveBenefit(this.createCoverCode.benefit).subscribe(
      (data: CreateCoversBenefit) => {
        this.loading = false;
        this.createCoverCode.benefit.coversBenefit = data.coversBenefit;
        this.createCoverCode.benefit.coversSumAssured = data.coversSumAssured;

        this.createCoverCode.benefit.coversBenefitClaims = [];
        this.createCoverCode.benefit.coverBenefitFreqs = [];
        this.createCoverCode.benefit.coversAutoTerminateCover = [];
        this.createCoverCode.benefit.coversAutoSettleCover = [];
        this.createCoverCode.benefit.coversLoanIntRates = [];
        this.createCoverCode.benefit.coversCoversWaived = [];
        this.createCoverCode.benefit.coversSumAssuredOpts = [];
        this.createCoverCode.benefit.coversBenefitEscals = [];
        this.createCoverCode.benefit.coversBenefitSchedules = [];

        data.coversBenefitClaims.map((benefit) => {
          benefit.rowId =
            this.createCoverCode.benefit.coversBenefitClaims.length + 1;
          this.createCoverCode.benefit.coversBenefitClaims.push(benefit);
        });

        data.coverBenefitFreqs.map((benefit) => {
          benefit.rowId =
            this.createCoverCode.benefit.coverBenefitFreqs.length + 1;
          this.createCoverCode.benefit.coverBenefitFreqs.push(benefit);
        });

        data.coversAutoTerminateCover.map((benefit) => {
          benefit.rowId =
            this.createCoverCode.benefit.coversAutoTerminateCover.length + 1;
          this.createCoverCode.benefit.coversAutoTerminateCover.push(benefit);
        });

        data.coversAutoSettleCover.map((benefit) => {
          benefit.rowId =
            this.createCoverCode.benefit.coversAutoSettleCover.length + 1;
          this.createCoverCode.benefit.coversAutoSettleCover.push(benefit);
        });

        data.coversLoanIntRates.map((benefit) => {
          benefit.rowId =
            this.createCoverCode.benefit.coversLoanIntRates.length + 1;
          this.createCoverCode.benefit.coversLoanIntRates.push(benefit);
        });

        data.coversCoversWaived.map((benefit) => {
          benefit.rowId =
            this.createCoverCode.benefit.coversCoversWaived.length + 1;
          this.createCoverCode.benefit.coversCoversWaived.push(benefit);
        });

        data.coversSumAssuredOpts.map((benefit) => {
          benefit.rowId =
            this.createCoverCode.benefit.coversSumAssuredOpts.length + 1;
          this.createCoverCode.benefit.coversSumAssuredOpts.push(benefit);
        });

        data.coversBenefitEscals.map((benefit) => {
          benefit.rowId =
            this.createCoverCode.benefit.coversBenefitEscals.length + 1;
          this.createCoverCode.benefit.coversBenefitEscals.push(benefit);
        });

        data.coversBenefitSchedules.map((benefit) => {
          benefit.rowId =
            this.createCoverCode.benefit.coversBenefitSchedules.length + 1;
          this.createCoverCode.benefit.coversBenefitSchedules.push(benefit);
        });

        if (
          this.createCoverCode.benefit.coversBenefitClaims &&
          this.createCoverCode.benefit.coversBenefitClaims.length < 1
        )
          this.createCoverCode.benefit.coversBenefitClaims.push(
            new CoverBenefitClaim()
          );
        if (
          this.createCoverCode.benefit.coversAutoSettleCover &&
          this.createCoverCode.benefit.coversAutoSettleCover.length < 1
        )
          this.createCoverCode.benefit.coversAutoSettleCover.push(
            new CoversAutoSettleCover()
          );
        if (
          this.createCoverCode.benefit.coversAutoTerminateCover &&
          this.createCoverCode.benefit.coversAutoTerminateCover.length < 1
        )
          this.createCoverCode.benefit.coversAutoTerminateCover.push(
            new CoversAutoTerminateCover()
          );
        if (
          this.createCoverCode.benefit.coversBenefitEscals &&
          this.createCoverCode.benefit.coversBenefitEscals.length < 1
        )
          this.createCoverCode.benefit.coversBenefitEscals.push(
            new CoversBenefitEscal()
          );
        if (
          this.createCoverCode.benefit.coversBenefitSchedules &&
          this.createCoverCode.benefit.coversBenefitSchedules.length < 1
        )
          this.createCoverCode.benefit.coversBenefitSchedules.push(
            new CoversBenefitSchedule()
          );
        if (
          this.createCoverCode.benefit.coversCoversWaived &&
          this.createCoverCode.benefit.coversCoversWaived.length < 1
        )
          this.createCoverCode.benefit.coversCoversWaived.push(
            new CoversCoversWaived()
          );
        if (
          this.createCoverCode.benefit.coversLoanIntRates &&
          this.createCoverCode.benefit.coversLoanIntRates.length < 1
        )
          this.createCoverCode.benefit.coversLoanIntRates.push(
            new CoversLoanIntRate()
          );
        if (
          this.createCoverCode.benefit.coversSumAssuredOpts &&
          this.createCoverCode.benefit.coversSumAssuredOpts.length < 1
        )
          this.createCoverCode.benefit.coversSumAssuredOpts.push(
            new CoversSumAssuredOpt()
          );

        this.util.notify('Cover benefit saved succesfully!.', 1);
      },
      () => {
        this.util.notify('Unable to save Cover Benefit!.', 0);
        this.loading = false;
      }
    );
  }

  onViewSchedulePayment() {
    $('#exampleModal').modal('show');
  }

  onBenefDetailView(i: number) {
    $('#benefModal' + i).modal('show');
  }

  benCounter() {
    return new Array(this.nbofben);
  }

  addCoversSchedule() {
    var schedule = new CoversBenefitSchedule();
    schedule.rowId =
      this.createCoverCode.benefit.coversBenefitSchedules.length + 1;
    this.createCoverCode.benefit.coversBenefitSchedules.push(schedule);
  }

  setNoOfPayments() {
    this.findProductService.getRateCodeAndDesc().subscribe((data: any) => {
      this.noOfPayments = data;
    });
  }

  setBenefitScheduleBasis() {
    this.codeService
      .getCodesByCodeSubGroup('BEN_SCHEDULE_BASIS')
      .subscribe((data: any) => {
        this.benefitScheduleBasis = data;
      });
  }

  addCoverBenefitFreq() {
    var freq = new CoverBenefitFreq();
    freq.rowId = this.createCoverCode.benefit.coverBenefitFreqs.length + 1;
    this.createCoverCode.benefit.coverBenefitFreqs.push(freq);
  }
  get isFormInvalid() {
    return this.inputs?.some((x) => x.invalid);
  }

  async removeBenefitFreq(i: number) {
    if (this.createCoverCode.benefit.coverBenefitFreqs[i].id != null) {
      if (
        await this.util.confirm('Do you want to delete this Benefit Frequency?')
      ) {
        this.findProductService
          .deleteCoverBenefitClaim(
            this.createCoverCode.benefit.coverBenefitFreqs[i].id
          )
          .subscribe(
            () => {
              this.util.notify('Benefit Frequency deleted successfully', 1);
              this.createCoverCode.benefit.coverBenefitFreqs.splice(i, 1);
            },
            () => this.util.notify('Unable to delete Benefit Frequency!.', 0)
          );
      }
    } else this.createCoverCode.benefit.coverBenefitFreqs.splice(i, 1);
  }

  addCoverBenefitClaim(i: number) {
    var cover = new CoverBenefitClaim();
    cover.rowId = this.createCoverCode.benefit.coversBenefitClaims.length + 1;
    this.createCoverCode.benefit.coversBenefitClaims.splice(i, 0, cover);
  }

  async removeCoverBenefitClaim(i: number) {
    if (this.createCoverCode.benefit.coversBenefitClaims[i].id != null) {
      if (
        await this.util.confirm('Do you want to delete this Benefit Claim?')
      ) {
        this.findProductService
          .deleteCoverBenefitClaim(
            this.createCoverCode.benefit.coversBenefitClaims[i].id
          )
          .subscribe(
            () => {
              this.util.notify('Benefit Claim deleted successfully', 1);
              this.createCoverCode.benefit.coversBenefitClaims.splice(i, 1);
            },
            () => this.util.notify('Unable to delete Benefit Claim!.', 0)
          );
      }
    } else this.createCoverCode.benefit.coversBenefitClaims.splice(i, 1);
  }

  setFrequencyOfPayments() {
    this.findProductService.getFrequencyOfPayments().subscribe((res) => {
      this.frequencyOfPayments = res;
      //console.log('frequency Of Payments', res);
    });
  }

  setBenefitFrequency() {
    this.findProductService.getBenefitPaymentFrequency().subscribe((res) => {
      this.benefitPaymentFrequencies = res;
      //console.log('frequency Of Payments', res);
    });
  }

  setCoverStatusOnClaim() {
    this.findProductService.getCoverStatusOnClaim().subscribe((res) => {
      this.coverStatusOnClaim = res;
      //console.log('CoverStatus On Claim', res);
    });
  }

  async removeCoverSchedule(i: number) {
    if (this.createCoverCode.benefit.coversBenefitSchedules[i].id != null) {
      if (
        await this.util.confirm('Do you want to delete this Benefit Schedule?')
      ) {
        this.findProductService
          .deleteCoverSchedule(
            this.createCoverCode.benefit.coversBenefitSchedules[i].id
          )
          .subscribe(
            () => {
              this.util.notify('Benefit Schedule deleted successfully', 1);
              this.createCoverCode.benefit.coversBenefitSchedules.splice(i, 1);
            },
            () => this.util.notify('Unable to delete Benefit Schedule!.', 0)
          );
      }
    } else this.createCoverCode.benefit.coversBenefitSchedules.splice(i, 1);
  }

  addSettle(i: number) {
    var settle = new CoversAutoSettleCover();
    settle.rowId =
      this.createCoverCode.benefit.coversAutoSettleCover.length + 1;
    this.createCoverCode.benefit.coversAutoSettleCover.splice(i, 0, settle);
  }

  async deleteAutoSettle(i: number) {
    if (this.createCoverCode.benefit.coversAutoSettleCover[i].id != null) {
      if (await this.util.confirm('Do you want to delete this Auto Settle?')) {
        this.findProductService
          .deleteAutoSettle(
            this.createCoverCode.benefit.coversAutoSettleCover[i].id
          )
          .subscribe(
            () => {
              this.util.notify('Auto Settle deleted successfully', 1);
              this.createCoverCode.benefit.coversAutoSettleCover.splice(i, 1);
            },
            () => this.util.notify('Unable to delete Auto Settle!.', 0)
          );
      }
    } else this.createCoverCode.benefit.coversAutoSettleCover.splice(i, 1);
  }

  addNewbenefitAssuredRow(i: number) {
    var assured = new CoversSumAssuredOpt();
    assured.rowId =
      this.createCoverCode.benefit.coversSumAssuredOpts.length + 1;
    this.createCoverCode.benefit.coversSumAssuredOpts.splice(i, 0, assured);
  }

  async deleteNewbenefitAssuredRow(i: number) {
    if (this.createCoverCode.benefit.coversSumAssuredOpts[i].id != null) {
      if (
        await this.util.confirm('Do you want to delete this Benefit Assured?')
      ) {
        this.findProductService
          .deleteNewbenefitAssuredRow(
            this.createCoverCode.benefit.coversSumAssuredOpts[i].id
          )
          .subscribe(
            () => {
              this.util.notify('Benefit Assured deleted successfully', 1);
              this.createCoverCode.benefit.coversSumAssuredOpts.splice(i, 1);
            },
            () => this.util.notify('Unable to delete Benefit Assured!.', 0)
          );
      }
    } else this.createCoverCode.benefit.coversSumAssuredOpts.splice(i, 1);
  }

  addNewbenefitInterestRow(i: number) {
    var interest = new CoversLoanIntRate();
    interest.rowId = this.createCoverCode.benefit.coversLoanIntRates.length + 1;
    this.createCoverCode.benefit.coversLoanIntRates.splice(i, 0, interest);
  }

  async deleteNewbenefitInterestRow(i: number) {
    if (this.createCoverCode.benefit.coversLoanIntRates[i].id != null) {
      if (
        await this.util.confirm('Do you want to delete this Benefit Interest?')
      ) {
        this.findProductService
          .deleteNewbenefitInterestRow(
            this.createCoverCode.benefit.coversLoanIntRates[i].id
          )
          .subscribe(
            () => {
              this.util.notify('Benefit Interest deleted successfully', 1);
              this.createCoverCode.benefit.coversLoanIntRates.splice(i, 1);
            },
            () => this.util.notify('Unable to delete Benefit Interest!.', 0)
          );
      }
    } else this.createCoverCode.benefit.coversLoanIntRates.splice(i, 1);
  }

  addNewCoversWaivedArrayRow(i: number) {
    var waived = new CoversCoversWaived();
    waived.rowId = this.createCoverCode.benefit.coversCoversWaived.length + 1;
    this.createCoverCode.benefit.coversCoversWaived.splice(i, 0, waived);
  }

  async deleteNewCoversWaivedArrayRow(i: number) {
    if (this.createCoverCode.benefit.coversCoversWaived[i].id != null) {
      if (
        await this.util.confirm('Do you want to delete this Benefit Interest?')
      ) {
        this.findProductService
          .deleteNewCoversWaivedArrayRow(
            this.createCoverCode.benefit.coversCoversWaived[i].id
          )
          .subscribe(
            () => {
              this.util.notify('Benefit Interest deleted successfully', 1);
              this.createCoverCode.benefit.coversCoversWaived.splice(i, 1);
            },
            () => this.util.notify('Unable to delete Benefit Interest!.', 0)
          );
      }
    } else this.createCoverCode.benefit.coversCoversWaived.splice(i, 1);
  }

  addTerminate(i: number) {
    var terminate = new CoversAutoTerminateCover();
    terminate.rowId =
      this.createCoverCode.benefit.coversAutoTerminateCover.length + 1;
    this.createCoverCode.benefit.coversAutoTerminateCover.splice(
      i,
      0,
      terminate
    );
  }

  async deleteTerminate(i: number) {
    if (this.createCoverCode.benefit.coversAutoTerminateCover[i].id != null) {
      if (
        await this.util.confirm('Do you want to delete this Benefit Interest?')
      ) {
        this.findProductService
          .deleteTerminate(
            this.createCoverCode.benefit.coversAutoTerminateCover[i].id
          )
          .subscribe(
            () => {
              this.util.notify('Benefit Interest deleted successfully', 1);
              this.createCoverCode.benefit.coversAutoTerminateCover.splice(
                i,
                1
              );
            },
            () => this.util.notify('Unable to delete Benefit Interest!.', 0)
          );
      }
    } else this.createCoverCode.benefit.coversAutoTerminateCover.splice(i, 1);
  }

  addNewsumAssuredEscalationRow(i: number) {
    var esc = new CoversBenefitEscal();
    esc.rowId = this.createCoverCode.benefit.coversBenefitEscals.length + 1;
    this.createCoverCode.benefit.coversBenefitEscals.splice(i, 0, esc);
  }

  async deleteNewsumAssuredEscalationRow(i: number) {
    if (this.createCoverCode.benefit.coversBenefitEscals[i].id != null) {
      if (
        await this.util.confirm('Do you want to delete this Benefit Interest?')
      ) {
        this.findProductService
          .deleteNewsumAssuredEscalationRow(
            this.createCoverCode.benefit.coversBenefitEscals[i].id
          )
          .subscribe(
            () => {
              this.util.notify('Benefit Interest deleted successfully', 1);
              this.createCoverCode.benefit.coversBenefitEscals.splice(i, 1);
            },
            () => this.util.notify('Unable to delete Benefit Interest!.', 0)
          );
      }
    } else this.createCoverCode.benefit.coversBenefitEscals.splice(i, 1);
  }

  setSumassuredCalcBasis() {
    this.findProductService.getSumassuredCalcBasis().subscribe((res) => {
      this.sumAssuredCalcBasisList = res;
    });
  }

  setBenifitPaymentBasis() {
    this.findProductService.getBenifitPaymentBasis().subscribe((res) => {
      this.benifitPaymentList = res;
    });
  }

  setClaimTypes() {
    this.findProductService.getClaimTypes().subscribe((res) => {
      this.coverService.claimTypeList = this.claimTypeList = res;
    });
  }

  setCoversWaived() {
    this.findProductService.getCoversWaived().subscribe((res) => {
      this.coversWaivedList = res;
    });
  }

  setClaim() {
    this.findProductService.getClaim().subscribe((res) => {
      this.claimSettleList = res;
    });
  }
}
