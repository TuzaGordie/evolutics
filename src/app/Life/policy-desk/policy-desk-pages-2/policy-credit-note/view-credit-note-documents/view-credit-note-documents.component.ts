import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UtilityService } from 'src/app/Services/utility.service';
import { TableCol } from '../../../../../Shared/models/index.model';
 

@Component({
  selector: 'app-view-credit-note-documents',
  templateUrl: './view-credit-note-documents.component.html',
  styleUrls: [
    './view-credit-note-documents.component.scss',
    '../../../policy-desk-comps/policy-desk-layout/policy-desk-layout.component.scss',
  ],
})
export class ViewCreditNoteDocumentsComponent implements OnInit {
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
  ];
  constructor(
    public pdS: UtilityService,
    public dialogRef: MatDialogRef<ViewCreditNoteDocumentsComponent>
  ) {}

  ngOnInit(): void {
    this.list = this.pdS.dataGen(
      this.dCols.map((x) => x.f),
      2
    );
  }
  close() {
    this.dialogRef.close();
  }
}
