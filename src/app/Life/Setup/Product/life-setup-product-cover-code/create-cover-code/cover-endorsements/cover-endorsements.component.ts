import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindProductService } from '../../../service/find-product.service';
import { CreateCoverCode, Endorsements } from '../../cover-code';
import { CoverService } from '../../cover-service.service';

@Component({
  selector: 'app-cover-endorsements',
  templateUrl: './cover-endorsements.component.html',
  styleUrls: ['./cover-endorsements.component.scss']
})
export class CoverEndorsementsComponent implements OnInit {

  @Input() createCoverCode: CreateCoverCode;
  @Input() action: string;  @ViewChildren('inp') inputs:QueryList<any>;
  @Input() coverCode: string

  endorsementScreenList: any = []
  endorsementCalcBasisList: any = []
  endorsementCalcTableList: any = []

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

    this.setEndorsementCalcBasis();
    this.setEndorsementCalcTable();
    this.setEndorsementScreen();

    if (!this.coverService.isCreate) {
      this.findProductService.getEndorsement(this.coverCode)
        .subscribe((data: Endorsements) => {
          if(data == null) {
            this.createCoverCode.endorsements = new Endorsements()
            return  
          }
          this.createCoverCode.endorsements = data;
          this.coverService.disableInputs(this.inputs);
        })
    }
  }


  @Input() loading = false
  @Input() loadingText = ""

  saveEndorsement() {
    this.loading = true
    this.loadingText = "Saving Cover Endorsement...."

    this.createCoverCode.endorsements.code = this.createCoverCode.basic.basic.code

    this.coverService.saveEndorsements(this.createCoverCode.endorsements)
      .subscribe((data: Endorsements) => {
        this.loading = false
        this.util.notify("Cover Endorsement saved successfully!.", 1)
        this.createCoverCode.endorsements = data
      }, () => {
        this.util.notify("Unable to save cover endorsement!.", 0)
        this.loading = false
      })
  }

  setEndorsementCalcTable() {
    this.findProductService.getEndorsementCalcTable().subscribe((res) => {
      this.endorsementCalcTableList = res;
    });
  }

  setEndorsementScreen() {
    this.findProductService.getEndorsementScreen().subscribe((res) => {
      this.endorsementScreenList = res;
    });
  }
  setEndorsementCalcBasis() {
    this.findProductService.getEndorsementCalcBasis().subscribe((res) => {
      this.endorsementCalcBasisList = res;
    });
  }


}
