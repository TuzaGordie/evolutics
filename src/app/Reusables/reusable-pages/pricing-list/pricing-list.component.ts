import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';
import { FCInput, IKVP, KVP, TableCol } from 'src/app/Shared/models/index.model';

@Component({
  selector: 'app-pricing-list',
  templateUrl: './pricing-list.component.html',
  styleUrls: ['./pricing-list.component.scss']
})
export class PricingListComponent implements OnInit {
  status: boolean = true;
  name = 'Mascar Magic';
  inputs1: FCInput[] = [
    new FCInput('Cover', null, null, 'select'),
    new FCInput('Life Assured', null, null, 'select'),
    new FCInput('Basis'),
  ];
  inputs2: FCInput[] = [
    new FCInput('Reason', null, null, 'select'),
    new FCInput('Rating %'),
    new FCInput('Revised Rating Table', null, null, 'select'),
    new FCInput('Narration'),
    new FCInput('Total Loading %'),
  ];
  form = new FormGroup(
    this.pdS.formFieldsFromArr([...this.inputs1, ...this.inputs2])
  );
  lbls1: IKVP[] = [
    new KVP('Current Premium', '2,350,000'),
    new KVP('Revised Premium', '2,450,000'),
  ];
  list = [];
  dCols: TableCol[] = [
    new TableCol('Cover'),
    new TableCol('Sum Assured'),
    new TableCol('Cover Period'),
    new TableCol('Current Rate'),
    new TableCol('Current Rate Table'),
    new TableCol('Current Premium'),
    new TableCol('Revised Premium'),
  ];
  constructor(public pdS: UtilityService) {}

  ngOnInit(): void {
    this.pdS.bindFormControlToInputs(
      [...this.inputs1, ...this.inputs2],
      this.form
    );
    this.inputs2[1].cls = 'col-lg-2';
    this.inputs2[2].cls = 'col-lg-2';
    this.list = this.pdS.dataGen(
      this.dCols.map((x) => x.f),
      3
    );
  }
  add() {}
}
