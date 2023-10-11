import {
  IIssueCertificate,
  IPreorderCertificate,
  IRegisterNewCertificate,
  ISetUpCertificate,
} from './../vehicle-extras/vehicle.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { configForms } from 'src/app/Shared/models/form.class';
import { VehicleExtrasService } from '../vehicle-extras/vehicle-extras.service';
import { VehicleService } from '../vehicle-extras/vehicle.service';


@Component({
  selector: 'app-gbsetup-code-vehicle-cert-index',
  templateUrl: './gbsetup-code-vehicle-cert-index.component.html',
  styleUrls: ['./gbsetup-code-vehicle-cert-index.component.scss'],
})
export class GBSetupCodeVehicleCertIndexComponent implements OnInit {
  chartForm: FormGroup;
  registerNew: FormGroup;
  preOrderForm: FormGroup;
  issueCertForm: FormGroup;
  setUpform: FormGroup;
  loading: Boolean;
  lineChartData: ChartDataSets[];

  lineChartLabels: Label[] = ['Registered', 'Issued', 'UnInssued'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'rgba(81,78,245,0.48)',
      backgroundColor: 'rgba(81,78,245,0.38)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'bar';
  agentName: string;
  coporateOfficeName: string;
  constructor(
    public veS: VehicleExtrasService,
    public vS: VehicleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.lineChartData = [{ data: [0, 0, 0], label: 'Performance' }];

    this.chartForm = new FormGroup({
      companyChartCode: configForms.required(),
      certCat: configForms.required(),
      agent:configForms.required(),
      branch:configForms.required()
    });

    this.registerNew = new FormGroup({
      companyCode: configForms.required(),
      certCat: configForms.required(),
      fromRange: configForms.required(),
      toRange: configForms.required(),
      noCert: configForms.required(),
    });

    this.issueCertForm = new FormGroup({
      issueFrom: configForms.required(),
      code: configForms.required(),
      certCat: configForms.required(),
      agentNo: configForms.required(),
      branchCode: configForms.required(),
      certUnConvert: configForms.required(),
      certToBeUsed: configForms.required(),
      fromRange: configForms.required(),
      toRange: configForms.required(),
      cumCertIssue: configForms.default(),
    });

    this.preOrderForm = new FormGroup({
      companyCode: configForms.default(),
      certUnIssue: configForms.default(),
      certUnConvert: configForms.default(),
      reOrderLevel: configForms.default(),
      reOrderRequired: configForms.default(),
      totalAmount: configForms.default(),
      type: configForms.default(),
      currency: configForms.default(),
      changes: configForms.default(),
      payeeNo: configForms.default(),
      payeeName: configForms.default(),
      bankAccount: configForms.default(),
      narration: configForms.default(),
    });

    this.setUpform = new FormGroup({
      companyCode: configForms.required(),
      certCat: configForms.required(),
      reOrderLevel: configForms.required(),
      currency: configForms.required(),
      costPerCert: configForms.required(),
    });
  }

  onSubmit(value: string) {
    this.submit(value);
  }

  populateField(value: string,cCode?:string,certCode?:string) {
    let sumsCode = '';
    console.log("FETCH VALUES"+cCode+certCode);


    if (value === 'chart') {
      //sumsCode = this.chartForm.value?.companyChartCode?.code;
      this.veS.getCertificateSums(cCode,certCode).subscribe((res) => {
        const result = res;
        console.log('CHART VALUE' + JSON.stringify(result));
        let registered = parseInt(result?.certUnConvertSum);
        let issued = parseInt(result?.certIssueSum);
        let unIssued = parseInt(result?.certUnConvertSum);

        this.lineChartData = [
          { data: [registered, issued, unIssued], label: 'Performance' },
        ];
      });
    }
    if (value === 'issue-from') {
      sumsCode = this.issueCertForm.value?.companyCode?.code;
      this.veS.getCertificateSums(sumsCode).subscribe((res) => {
        const result = res;
        this.issueCertForm.patchValue({
          cumCertIssue: result?.certIssueSum,
          certUnConvert: result?.certUnConvertSum,
        });
      });
    }
    if (value === 'pre-order') {
      sumsCode = this.preOrderForm.value?.companyCode?.code;
      this.veS.getCertificateSums(sumsCode).subscribe((res) => {
        const result = res;
        this.preOrderForm.patchValue({
          certUnIssue: result?.certIssueSum,
          certUnConvert: result?.certUnConvertSum,
        });
      });
    }
  }

  private async submit(value) {
    let result = new Promise<any>((resolve, reject) => {});
    switch (value) {
      case 'register-new':
        const registerValue: any = this.registerNew
          .value as IRegisterNewCertificate;
        registerValue.companyCode = registerValue?.companyCode?.code;
        registerValue.certCat = registerValue?.certCat?.code;
        result = this.veS.registerNewCertificates(registerValue);
        break;
      case 'setup':
        let setupValue: any = this.setUpform.value as ISetUpCertificate;
        setupValue.companyCode = setupValue?.companyCode?.code;
        setupValue.certCat = setupValue?.certCat?.code;
        setupValue.currency = setupValue?.currency?.code;
        result = this.veS.submitSetup(setupValue);
        break;
      case 'pre-order':
        let preOderValue: any = this.preOrderForm.value as IPreorderCertificate;
        preOderValue.companyCode = preOderValue?.companyCode?.code;
        preOderValue.type = preOderValue?.type?.code;
        preOderValue.currency = preOderValue?.currency?.code;
        preOderValue.bankAcccount = preOderValue?.bankAcccount?.code;
        result = this.veS.submitPreOrder(preOderValue);
        break;
      case 'issue-cert':
        let issueValue: any = this.issueCertForm.value as IIssueCertificate;
        issueValue.companyCode = issueValue?.companyCode?.code;
        issueValue.certCat = issueValue?.certCat?.code;
        issueValue.branchCode = issueValue?.branchCode?.code;
        result = this.veS.submitIssueCertificate(issueValue);
        break;
      default:
        break;
    }
    try {
      this.loading = false;
      result
        .then((res) => {
          console.log(res);
          this.vS.notify('Successfully Submitted', 1);
        })
        .catch((error) => {
          this.vS.notify('An error occurred', 0);
          console.log(error);
          this.loading = false;
        });
    } catch (e) {
      console.log(e);
    }
  }

  search(value) {
    switch (value) {
      case 'office':
        this.veS
          .getNameByAgentNo(this.issueCertForm?.value?.agentNo)
          .subscribe((res) => {
            this.coporateOfficeName = res;
          });
        break;
      case 'agent':
        this.veS
          .getNameByAgentNo(this.issueCertForm?.value?.agentNo)
          .subscribe((res) => {
            this.agentName = res;
          });
        break;
      default:
        break;
    }
  }
}
