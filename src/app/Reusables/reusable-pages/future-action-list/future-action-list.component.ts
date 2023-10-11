import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { TableCol, FCInput } from 'src/app/Shared/models/index.model';

@Component({
  selector: 'app-future-action-list',
  templateUrl: './future-action-list.component.html',
  styleUrls: ['./future-action-list.component.scss']
})
export class FutureActionListComponent implements OnInit {
  list = [];
  dCols: TableCol[] = [
    new TableCol('Date'),
    new TableCol('Cover No'),
    new TableCol('Action'),
    new TableCol('Sub Action'),
    new TableCol('Description'),
  ];
  name = 'Mascar Magic';
  jname = 'xxxxx';
  inputs: FCInput[] = [
    new FCInput(
      'Document Category Filter',
      undefined,
      configForms.required(),
      'select'
    ),
  ];
  form = new FormGroup(this.uS.formFieldsFromArr(this.inputs));
  constructor(public uS: UtilityService) {}

  ngOnInit(): void {
    this.inputs.forEach((x) => {
      x.form = this.form;
      x.formControl = (this.form.get as any)[x.name];
    });
    this.list = this.uS.dataGen(
      this.dCols.map((x) => x.f),
      2
    );
  }
}
