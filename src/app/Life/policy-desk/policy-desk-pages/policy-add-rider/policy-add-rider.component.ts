import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';
import { FCInput, IKVP, TableCol } from '../../../../Shared/models/index.model';
import { PDService } from '../../policy-desk-extras/policy-desk.service';

@Component({
  selector: 'app-policy-add-rider',
  templateUrl: './policy-add-rider.component.html',
  styleUrls: ['./policy-add-rider.component.scss'],
})
export class PolicyAddRiderComponent implements OnInit {
  list = [];
  tabs: IKVP[] = [
    { key: 'Basic', value: 'bc' },
    { key: 'Detail', value: 'dtl' },
  ];
  sTab: IKVP;
  dCols: TableCol[] = [
    new TableCol('Cover Code'),
    new TableCol('Cover Name'),
    new TableCol('Status'),
    new TableCol('Premium Frequency Method'),
    new TableCol('Premium'),
    new TableCol('Sum Assured'),
  ];
  list2 = [];
  dCols2: TableCol[] = [
    new TableCol('Select'),
    new TableCol('Cover Code'),
    new TableCol('Cover Name'),
  ];
  inputs: FCInput[] = [
    new FCInput('Application Date'),
    new FCInput('Life Assured', null, null, 'select'),
    new FCInput('Life Assured Name'),
    new FCInput('Sum Assured'),
    new FCInput('Enter a Benefit Schedule'),
    new FCInput('Currency'),
    new FCInput('Base Cover Premium Freq/Method'),
    new FCInput('Rider Premium Freq', null, null, 'select'),
    new FCInput('Rider Premium Method', null, null, 'select'),
    new FCInput('Premium Due'),
  ];
  form = new FormGroup(this.uS.formFieldsFromArr([...this.inputs]));
  polNo = '-';
  cover = '-';
  constructor(public uS: UtilityService) {
    this.sTab = this.tabs[0];
  }

  ngOnInit(): void {
    this.list = this.uS.dataGen(
      this.dCols.map((x) => x.f),
      3
    );
    this.list2 = this.uS.dataGen(
      this.dCols2.map((x) => x.f),
      3
    );
    this.uS.bindFormControlToInputs([...this.inputs], this.form);
  }
  open(tab: IKVP) {
    this.sTab = tab;
  }
  submit() {}
}
