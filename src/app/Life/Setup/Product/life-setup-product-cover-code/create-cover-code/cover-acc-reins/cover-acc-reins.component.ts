import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindProductService } from '../../../service/find-product.service';
import {
  AccReins,
  CreateAcct,
  CreateCoverCode,
  Treaty,
} from '../../cover-code';
import { CoverService } from '../../cover-service.service';

@Component({
  selector: 'app-cover-acc-reins',
  templateUrl: './cover-acc-reins.component.html',
  styleUrls: ['./cover-acc-reins.component.scss'],
})
export class CoverAccReinsComponent implements OnInit {
  @Input() createCoverCode: CreateCoverCode;

  reinsuranceTreatyList: any[] = [];
  treaty = new Treaty();
  accRein = new AccReins();

  @Input() action: string;
  @ViewChildren('inp') inputs:QueryList<any>;
  @Input() coverCode: string;

  constructor(
    public findProductService: FindProductService,
    private activatedRoute: ActivatedRoute,
    private codeService: CodeService,
    private router: Router,
    private util: UtilityService,
    private companyService: CompanyService,
    public coverService: CoverService
  ) {}
  ngAfterViewInit(): void {
    this.coverService.disableInputs(this.inputs);
  } 
  ngOnInit(): void {
    this.setReinsuranceTreatyList();

    if (!this.coverService.isCreate) {
      this.findProductService
        .getAccount(this.coverCode)
        .subscribe((data: CreateAcct) => {
          if (data == null || data.acct == null) {
            this.createCoverCode.accReins.acct = new AccReins();
            this.createCoverCode.accReins.treaties = [new Treaty()];
            return;
          }
          this.createCoverCode.accReins.acct = data.acct;

          data.treaties.map((treaty) => {
            treaty.rowId = this.createCoverCode.accReins.treaties.length + 1;
            this.createCoverCode.accReins.treaties.push(treaty);
          });

          if (this.createCoverCode.accReins.treaties.length < 1)
            this.createCoverCode.accReins.treaties = [new Treaty()];
          this.coverService.disableInputs(this.inputs);
        });
    }

    if (this.createCoverCode.accReins == null)
      this.createCoverCode.accReins = new CreateAcct(this.accRein, [
        this.treaty,
      ]);
    if (this.createCoverCode.accReins.treaties.length < 1)
      this.createCoverCode.accReins.treaties = [new Treaty()];
  }

  @Input() loading = false;
  @Input() loadingText = '';

  saveAccReins() {
    this.loading = true;
    this.loadingText = 'Saving Cover Acc Reins....';

    this.createCoverCode.accReins.acct.code =
      this.createCoverCode.basic.basic.code;

    this.createCoverCode.accReins.treaties.map((treaty) => {
      var treatyListIndex = this.reinsuranceTreatyList.findIndex(
        (treatyList) => {
          return treatyList.code == treaty.treatyCode;
        }
      );
      if (treatyListIndex > -1)
        treaty.description =
          this.reinsuranceTreatyList[treatyListIndex].description;

      treaty.coverBasicId = this.createCoverCode.basic.basic.id;
      return treaty;
    });

    this.coverService.saveAccReins(this.createCoverCode.accReins).subscribe(
      (data: CreateAcct) => {
        this.loading = false;
        this.util.notify('Cover Acc Reins saved successfully!.');
        this.createCoverCode.accReins.acct = data.acct;

        this.createCoverCode.accReins.treaties = [];

        data.treaties.map((treaty) => {
          treaty.rowId = this.createCoverCode.accReins.treaties.length + 1;
          this.createCoverCode.accReins.treaties.push(treaty);
        });
      },
      () => {
        this.util.notify('Unable to save cover acc reins!.', 0);
        this.loading = false;
      }
    );
  }

  setReinsuranceTreatyList() {
    this.findProductService.getReinsuranceTreatyList().subscribe((res) => {
      this.reinsuranceTreatyList = res;
      //console.log('Reinsurance Treaty list', res);
    });
  }

  addNewAccountRow(i) {
    var treaty = new Treaty();
    treaty.rowId = this.createCoverCode.accReins.treaties.length + 1;
    this.createCoverCode.accReins.treaties.splice(i, 0,treaty);
  }

  async removeAccount(i: number) {
    if (this.createCoverCode.accReins.treaties[i].id != null) {
      if (await this.util.confirm('Do you want to delete this Acc Reins?')) {
        this.findProductService
          .removePeril(this.createCoverCode.accReins.treaties[i].id)
          .subscribe(
            () => {
              this.util.notify('Acc Reins deleted successfully', 1);
              this.createCoverCode.accReins.treaties.splice(i, 1);
            },
            () => this.util.notify('Unable to delete Acc Reins!.', 0)
          );
      }
    } else this.createCoverCode.accReins.treaties.splice(i, 1);
  }
}
