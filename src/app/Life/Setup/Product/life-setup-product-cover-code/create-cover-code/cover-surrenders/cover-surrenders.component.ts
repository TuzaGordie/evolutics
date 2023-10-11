import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralRatesService } from 'src/app/Life/Setup/Rates/general-rates/general-rates-extras/general-rates.service';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindProductService } from '../../../service/find-product.service';
import { CreateCoverCode, Surrenders } from '../../cover-code';
import { CoverService } from '../../cover-service.service';

@Component({
  selector: 'app-cover-surrenders',
  templateUrl: './cover-surrenders.component.html',
  styleUrls: ['./cover-surrenders.component.scss'],
})
export class CoverSurrendersComponent implements OnInit {
  @Input() createCoverCode: CreateCoverCode;
  @Input() action: string;
  @ViewChildren('inp') inputs: QueryList<any>;
  @Input() coverCode: string;

  monthsToPartialSurrenderTableList: any = [];
  maxPartialSurrenderBasisList: any = [];
  surrenderPayBasisList: any = [];

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
    this.setMonthsPartialSurrenderTable();
    this.setMaxpartialCalcBasis();
    this.setSurrenderValueTable();

    if (!this.coverService.isCreate) {
      this.findProductService
        .getSurrenders(this.coverCode)
        .subscribe((data: Surrenders) => {
          if (data == null) {
            this.createCoverCode.surrenders = new Surrenders();
            return;
          }
          this.createCoverCode.surrenders = data;
          this.coverService.disableInputs(this.inputs);
        });
    }
  }

  @Input() loading = false;
  @Input() loadingText = '';

  saveSurrender() {
    this.loading = true;
    this.loadingText = 'Saving Cover Surrender....';

    this.createCoverCode.surrenders.code =
      this.createCoverCode.basic.basic.code;

    this.coverService.saveSurrenders(this.createCoverCode.surrenders).subscribe(
      (data: Surrenders) => {
        this.loading = false;
        this.util.notify('Cover Surrender saved successfully!.');
        this.createCoverCode.surrenders = data;
      },
      () => {
        this.util.notify('Unable to save cover surrender!.', 0);
        this.loading = false;
      }
    );
  }

  setMonthsPartialSurrenderTable() {
    this.findProductService
      .getMonthsPartialSurrenderTable()
      .subscribe((res) => {
        this.monthsToPartialSurrenderTableList = res;
      });
  }

  setMaxpartialCalcBasis() {
    this.findProductService.getMaxpartialCalcBasis().subscribe((res) => {
      this.maxPartialSurrenderBasisList = res;
    });
  }

  setSurrenderValueTable() {
    this.findProductService.getSurrenderValueTable().subscribe((res) => {
      this.surrenderPayBasisList = res;
    });
  }
}
