import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralRatesService } from 'src/app/Life/Setup/Rates/general-rates/general-rates-extras/general-rates.service';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindProductService } from '../../../service/find-product.service';
import { CreateCoverCode, Lapse } from '../../cover-code';
import { CoverService } from '../../cover-service.service';

@Component({
  selector: 'app-cover-lapse',
  templateUrl: './cover-lapse.component.html',
  styleUrls: ['./cover-lapse.component.scss'],
})
export class CoverLapseComponent implements OnInit {
  @Input() createCoverCode: CreateCoverCode;
  @Input() action: string;
  @ViewChildren('inp') inputs: QueryList<any>;
  @Input() coverCode: string;

  lapseValueTableList: any = [];
  reinstatementChargeAmountTableList: any = [];
  lapseValueBasisList: any = [];
  reinstatementIntrestTableList: any = [];

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
    this.setLapseValueTable();
    this.setLapseValueBasis();
    this.setReinstatementChargeAmountTable();
    this.setReinstatementInterestRateTable();

    if (!this.coverService.isCreate) {
      this.findProductService
        .getLapse(this.coverCode)
        .subscribe((data: Lapse) => {
          if (data == null) {
            this.createCoverCode.lapse = new Lapse();
            return;
          }
          this.createCoverCode.lapse = data;
          this.coverService.disableInputs(this.inputs);
        });
    }
  }

  @Input() loading = false;
  @Input() loadingText = '';

  saveLapse() {
    this.loading = true;
    this.loadingText = 'Saving Cover Lapse....';

    this.createCoverCode.lapse.code = this.createCoverCode.basic.basic.code;

    this.coverService.saveLapse(this.createCoverCode.lapse).subscribe(
      (data: Lapse) => {
        this.loading = false;
        this.util.notify('Cover Lapse saved successfully!.', 1);
        this.createCoverCode.lapse = data;
      },
      () => {
        this.util.notify('Unable to save cover lapse!.', 0);
        this.loading = false;
      }
    );
  }

  setLapseValueBasis() {
    this.findProductService.getLapseValueBasis().subscribe((res) => {
      this.lapseValueBasisList = res;
    });
  }

  setLapseValueTable() {
    this.findProductService.getLapseValueTable().subscribe((res) => {
      this.lapseValueTableList = res;
    });
  }

  setReinstatementChargeAmountTable() {
    this.findProductService
      .getReinstatementChargeAmountTable()
      .subscribe((res) => {
        this.reinstatementChargeAmountTableList = res;
      });
  }
  setReinstatementInterestRateTable() {
    this.findProductService
      .getReinstatementInterestRateTable()
      .subscribe((res) => {
        this.reinstatementIntrestTableList = res;
      });
  }
}
