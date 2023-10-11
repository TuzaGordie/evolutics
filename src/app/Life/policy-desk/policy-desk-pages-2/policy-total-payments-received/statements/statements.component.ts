import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from '../../../../../Shared/models/form.class';
import { TableCol, FCInput } from '../../../../../Shared/models/index.model';


@Component({
  selector: 'app-statements',
  templateUrl: './statements.component.html',
  styleUrls: ['./statements.component.scss'],
})
export class StatementsComponent implements OnInit {
  list = [];
  dCols: TableCol[] = [
    new TableCol('Trans Date'),
    new TableCol('Eff Date'),
    new TableCol('Trans Type'),
    new TableCol('Receipt No'),
    new TableCol('Payment Method'),
    new TableCol('Ref No'),
    new TableCol('Amount'),
    new TableCol('Reversed'),
  ];
  name = 'Mascar Magic';
  cur = 'NGN';
  inputs: FCInput[] = [
    new FCInput('Statement From Date', undefined, configForms.required()),
    new FCInput('Statement To Date', undefined, configForms.required()),
  ];
  form = new FormGroup(this.pdS.formFieldsFromArr(this.inputs));
  dRows: TableCol[] = [
    new TableCol('Premium Receipts'),
    new TableCol('Other Receipts'),
    new TableCol('Total Interest'),
    new TableCol('Total Fees'),
    new TableCol('Total Risk Premium'),
    new TableCol('Total Payment Inward'),
    new TableCol('Total Payment Outward'),
    new TableCol('Net Total'),
  ];
  list2: { key: string; bbf: string; bcf: string }[] = [];
  constructor(public pdS: UtilityService) {}

  ngOnInit(): void {
    this.inputs.forEach((x) => {
      x.form = this.form;
      x.formControl = (this.form.get as any)[x.name];
    });
    this.list = this.pdS.dataGen(
      this.dCols.map((x) => x.f),
      2
    );
    this.list2 = this.dRows.map((row) => ({
      key: row.t,
      bbf: this.pdS.textGen(),
      bcf: this.pdS.textGen(),
    }));
  }
  gen() {}
}
