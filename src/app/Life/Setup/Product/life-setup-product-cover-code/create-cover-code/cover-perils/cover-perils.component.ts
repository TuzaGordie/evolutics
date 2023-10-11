import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindProductService } from '../../../service/find-product.service';
import {
  CreateCoverCode,
  CreatePeril,
  PerilDetails,
  Perils,
} from '../../cover-code';
import { CoverService } from '../../cover-service.service';

@Component({
  selector: 'app-cover-perils',
  templateUrl: './cover-perils.component.html',
  styleUrls: ['./cover-perils.component.scss'],
})
export class CoverPerilsComponent implements OnInit {
  @Input() createCoverCode: CreateCoverCode;
  @Input() action: string;
  @ViewChildren('inp') inputs: QueryList<any>;
  @Input() coverCode: string;

  claimTypesList: any = [];
  perilList: any = [];
  proximateCausesList: any[] = [];
  claimType: string;

  constructor(
    public findProductService: FindProductService,
    private activatedRoute: ActivatedRoute,
    private codeService: CodeService,
    private router: Router,
    private util: UtilityService,
    private companyService: CompanyService,
    public coverService: CoverService
  ) { }
  ngAfterViewInit(): void {
    this.coverService.disableInputs(this.inputs);
  }
  ngOnInit(): void {
    this.setClaimType();
    this.setProximateCause();

    if (!this.coverService.isCreate) {
      this.findProductService
        .getPerils(this.coverCode)
        .subscribe((data: CreatePeril) => {
          if (data.peril != null) {
            this.createCoverCode.perils.peril = data.peril;
            this.setPeril(data.peril.type)
          } else {
            this.createCoverCode.perils.peril = new Perils();
            this.createCoverCode.perils.coversPerilDetails = [
              new PerilDetails(),
            ];
          }

          this.createCoverCode.perils.coversPerilDetails = [];

          data.coversPerilDetails.map((perils) => {
            if (this.action == 'clone') delete perils.id;
            perils.rowId =
              this.createCoverCode.perils.coversPerilDetails.length + 1;
            this.createCoverCode.perils.coversPerilDetails.push(perils);
          });

          if (this.createCoverCode.perils.coversPerilDetails.length < 1)
            this.createCoverCode.perils.coversPerilDetails = [
              new PerilDetails(),
            ];
          this.coverService.disableInputs(this.inputs);
        });
    }

    if (this.createCoverCode.perils.coversPerilDetails.length < 1)
      this.createCoverCode.perils.coversPerilDetails.push(new PerilDetails());

    this.claimType =
      this.createCoverCode.perils.coversPerilDetails[0].type || '';
  }

  @Input() loading = false;
  @Input() loadingText = '';
  getClaimTypeDescription(claimType: string) {
    return this.coverService.claimTypeList.find((x) => x.code == claimType)
      ?.title;
  }
  savePeril() {
    this.loading = true
    this.loadingText = "Saving Cover Perils...."
    this.createCoverCode.perils.peril.code = this.createCoverCode.basic.basic.code

    this.createCoverCode.perils.coversPerilDetails.map(peril => {
      peril.type = this.claimType
      peril.code = this.createCoverCode.basic.basic.code
      return peril
    })

    this.coverService.savePerils(this.createCoverCode.perils)
      .subscribe((data: CreatePeril) => {
        this.createCoverCode.perils.coversPerilDetails = []

        this.loading = false
        this.util.notify("Cover Perils saved successfully!.", 1)
        this.createCoverCode.perils.peril = data.peril

        data.coversPerilDetails.map(details => {
          details.rowId = this.createCoverCode.perils.coversPerilDetails.length + 1
          this.createCoverCode.perils.coversPerilDetails.push(details)
        })

        if (this.createCoverCode.perils.coversPerilDetails.length < 1) this.createCoverCode.perils.coversPerilDetails.push(new PerilDetails())
      }, () => {
        this.util.notify("Unable to save cover peril!.", 0)
        this.loading = false
      })
  }

  setClaimType() {
    this.findProductService.getClaimType().subscribe((res) => {
      this.claimTypesList = res;
    });
  }

  setPeril(value: string) {
    this.findProductService.getCodesByCodeGroupAndCat('PERIL', value.trim())
      .subscribe((res) => {
        this.perilList = res;
      });
  }

  setProximateCause() {
    this.findProductService
      .getProximateCause(this.createCoverCode.perils.peril.perilCode)
      .subscribe((res) => {
        this.proximateCausesList = res;
      });
  }

  addNewPerilRow() {
    var peril = new PerilDetails();
    peril.rowId = this.createCoverCode.perils.coversPerilDetails.length + 1;
    this.createCoverCode.perils.coversPerilDetails.push(peril);
  }

  async removePeril(i: number) {
    if (this.createCoverCode.perils.coversPerilDetails[i].id != null) {
      if (
        await this.util.confirm('Do you want to delete this Peril details?')
      ) {
        this.findProductService
          .removePeril(this.createCoverCode.perils.coversPerilDetails[i].id)
          .subscribe(
            () => {
              this.util.notify('Peril details deleted successfully', 1);
              this.createCoverCode.perils.coversPerilDetails.splice(i, 1);
            },
            () => this.util.notify('Unable to delete Peril details!.', 0)
          );
      }
    } else this.createCoverCode.perils.coversPerilDetails.splice(i, 1);
  }
}
