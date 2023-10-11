import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/Services/utility.service';
import { TableCol, IKVP, KVP } from 'src/app/Shared/models/index.model';
import { AddFaculativeComponent } from './add-faculative/add-faculative.component';

@Component({
  selector: 'app-reinsurance-list',
  templateUrl: './reinsurance-list.component.html',
  styleUrls: ['./reinsurance-list.component.scss']
})
export class ReinsuranceListComponent implements OnInit {
  list = [];
  dCols: TableCol[] = [
    new TableCol('Category'),
    new TableCol('Document Title'),
    new TableCol('Document Name'),
    new TableCol('Created By'),
    new TableCol('Created On'),
    new TableCol('Auto'),
    new TableCol('How'),
    new TableCol('Box No'),
    new TableCol('Sum At Risk'),
  ];
  name = 'Mascar Magic';
  heads: IKVP[] = [
    new KVP('Total SAR on policy'),
    new KVP('Retention'),

    new KVP('Total Client SAR'),
  ];

  constructor(public uS: UtilityService) {}

  ngOnInit(): void {
    this.list = this.uS.dataGen(
      this.dCols.map((x) => x.f),
      2
    );
  }
  add() {
    this.uS.dialogOpener(
      AddFaculativeComponent,
      { height: 'calc(100vw * 0.468)', width: 'calc(100vw * 0.5569)' },
      () => {}
    );
  }
}
