import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/Services/utility.service';
import { TablePlainService } from '../../../../Shared/components/table-plain/table-plain.service';
import { TableCol } from '../../../../Shared/models/index.model';

import { AddCreditNoteComponent } from './add-credit-note/add-credit-note.component';
import { ViewCreditNoteDocumentsComponent } from './view-credit-note-documents/view-credit-note-documents.component';

@Component({
  selector: 'app-policy-credit-note',
  templateUrl: './policy-credit-note.component.html',
  styleUrls: ['./policy-credit-note.component.scss'],
})
export class PolicyCreditNoteComponent implements OnInit {
  list = [];
  dCols: TableCol[] = [
    new TableCol('CN Number'),
    new TableCol('Policy No'),
    new TableCol('CN Issued On'),
    new TableCol('Amount'),
    new TableCol('Currency'),
    new TableCol('Created By'),
    new TableCol('Cancelled'),
    new TableCol('Cancelled By'),
    new TableCol('Cancellation Reason'),
    new TableCol('DN Number'),
    new TableCol('Settled'),
    new TableCol('Day o/s'),
  ];
  name = 'Mascar Magic';
  num = 555;
  days = 21;
  tot = '2,300,000';
  constructor(public pdS: UtilityService, public tS: TablePlainService) {}

  ngOnInit(): void {
    this.list = this.pdS.dataGen(
      this.dCols.map((x) => x.f),
      3
    );
  }
  add() {
    this.pdS.dialogOpener(
      AddCreditNoteComponent,
      { height: 'auto', width: 'calc(100vw * 0.5569)' },
      () => {}
    );
  }
  view() {
    this.pdS.dialogOpener(
      ViewCreditNoteDocumentsComponent,
      { height: 'calc(100vh * 0.768)', width: 'calc(100vw * 0.8569)' },
      () => {}
    );
  }
}
