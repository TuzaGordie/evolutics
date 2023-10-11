import { Component, OnInit } from '@angular/core';
import { FindQuotationService } from '../service/find-quotation.service';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FCInput, IKVP, KVP, TableCol } from '../../../Shared/models/index.model';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-quotation-pricing',
  templateUrl: './quotation-pricing.component.html',
  styleUrls: ['./quotation-pricing.component.scss'],
})
export class LifeQuotationPricingComponent implements OnInit {
  status: boolean = true;
  name = 'Mascar Magic';
  inputs1: FCInput[] = [new FCInput('Cover', null, null, 'select'), new FCInput('Life Assured', null, null, 'select'), new FCInput('Basis')];
  inputs2: FCInput[] = [new FCInput('Reason', null, null, 'select'), new FCInput('Rating %'), new FCInput('Revised Rating Table', null, null, 'select'), new FCInput('Narration'), new FCInput('Total Loading %')];
  form = new FormGroup(this.uS.formFieldsFromArr([...this.inputs1, ...this.inputs2]));
  lbls1: IKVP[] = [new KVP('Current Premium', '2,350,000'), new KVP('Revised Premium', '2,450,000')];
  list = [];
  dCols: TableCol[] = [new TableCol('Cover'), new TableCol('Sum Assured'), new TableCol('Cover Period'), new TableCol('Current Rate'), new TableCol('Current Rate Table'), new TableCol('Current Premium'), new TableCol('Revised Premium')];

  sampleObj = {
    QUOTE_NO: Math.floor(Math.random() * 10),
    AGENT_NAME: 'Random_Name',
    NO_OF_LIVES_COVERED: Math.floor(Math.random() * 10),
    ITERATIONS: Math.floor(Math.random() * 10),
    DAYS_TO_SLA: Math.floor(Math.random() * 20),
    CREATED_DATE_FROM: 'January, 2021',
    UNCOVERED_EXPOSURE: 'Random_value',
  };
  priceInfoList = [];
  constructor(public findQuotationService: FindQuotationService,public uS: UtilityService,) {
    // GENERATE SAMPLE OBJECT
    for (let i = 0; i < 5; i++) {
      this.priceInfoList.push(this.sampleObj);
    }
    console.log(this.dCols);
  }

  ngOnInit(): void {
    this.uS.bindFormControlToInputs([...this.inputs1, ...this.inputs2], this.form);
    this.inputs2[1].cls = 'col-lg-2';
    this.inputs2[2].cls = 'col-lg-2';
    this.list = this.uS.dataGen(
      this.dCols.map((x) => x.f),
      3
    );
  }
  add() {}
}
