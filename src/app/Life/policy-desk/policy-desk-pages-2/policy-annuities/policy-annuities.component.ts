import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/Services/utility.service';
import { TablePlainService } from '../../../../Shared/components/table-plain/table-plain.service';
import { TableCol } from '../../../../Shared/models/index.model';

import { AnnuityDetailsComponent } from './annuity-details/annuity-details.component';
import { CreateNewAnnuityComponent } from './create-new-annuity/create-new-annuity.component';

@Component({
  selector: 'app-policy-annuities',
  templateUrl: './policy-annuities.component.html',
  styleUrls: ['./policy-annuities.component.scss'],
})
export class PolicyAnnuitiesComponent implements OnInit {
  name = 'Mascar Magic';
  jName = 'Mascar Magic2';
  list = [];
  dCols: TableCol[] = [
    new TableCol('Start Date'),
    new TableCol('End Date'),
    new TableCol('Next Pay Amount'),
    new TableCol('Pay Frequency'),
    new TableCol('Type'),
    new TableCol('Payee'),
  ];

  constructor(public pdS: UtilityService, public tS: TablePlainService) {}

  ngOnInit(): void {
    this.list = this.pdS.dataGen(
      this.dCols.map((x) => x.f),
      1
    );
  }

  add() {
    this.pdS.dialogOpener(
      CreateNewAnnuityComponent,
      { height: 'auto', maxHeight: '95vh', width: 'calc(100vw * 0.7569)' },
      () => {}
    );
  }
  details() {
    this.pdS.dialogOpener(
      AnnuityDetailsComponent,
      { height: 'auto', maxHeight: '95vh', width: 'calc(100vw * 0.7569)' },
      () => {}
    );
  }
}
