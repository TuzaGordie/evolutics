import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { TableCol, FCInput } from 'src/app/Shared/models/index.model';

@Component({
  selector: 'app-peril-list',
  templateUrl: './peril-list.component.html',
  styleUrls: ['./peril-list.component.scss']
})
export class PerilListComponent implements OnInit {
  list = [];
  dCols: TableCol[] = [
    new TableCol('Peril'),
    new TableCol('Waiting Period Months'),
    new TableCol('Benefit % of Sum assured on Cover'),
    new TableCol('Full Benefit before U/W completion'),
  ];
  name = 'Straight Line Reducing Monthly';
  input = new FCInput(
    'Claim Type:',
    undefined,
    configForms.required(),
    'select'
  );
  form = new FormGroup(this.uS.formFieldsFromArr([this.input]));
  constructor(public uS: UtilityService) {}

  ngOnInit(): void {
    this.input.form = this.form;
    this.input.formControl = (this.form.get as any)[this.input.name];

    this.list = this.uS.dataGen(
      this.dCols.map((x) => x.f),
      2
    );
  }
}
