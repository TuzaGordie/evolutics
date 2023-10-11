import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/Services/utility.service';
import { TableCol, IBtn, KVP } from 'src/app/Shared/models/index.model';

@Component({
  selector: 'app-underwriting-list',
  templateUrl: './underwriting-list.component.html',
  styleUrls: ['./underwriting-list.component.scss']
})
export class UnderwritingListComponent implements OnInit {
  list = [];
  dCols: TableCol[] = [
    new TableCol('Code'),
    new TableCol('Description'),
    new TableCol('Cover Code'),
    new TableCol('Assured'),
    new TableCol('Auto Loading'),
  ];
  list2 = [];
  dCols2: TableCol[] = [
    new TableCol('Assured'),
    new TableCol('Requirement'),
    new TableCol('Cover'),
    new TableCol('Provider Assigned'),
    new TableCol('Requested By'),
    new TableCol('Requested On'),
    new TableCol('Status'),
    new TableCol('Updated On'),
  ];
  btns: IBtn[] = [
    new KVP('Risk Survey', null),
    new KVP('Underwriting Decision', null),
    new KVP('Assign Provider', null),
    new KVP('Add Requirement', null),
    new KVP('Add Special Condition', null),
  ];
  constructor(public uS: UtilityService,) {}

  ngOnInit(): void {
    this.list = this.uS.dataGen(
      this.dCols.map((x) => x.f),
      3
    );
    this.list2 = this.uS.dataGen(
      this.dCols2.map((x) => x.f),
      3
    );
  }
}
