import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-claim-history-modal',
  templateUrl: './view-claim-history-modal.component.html',
  styleUrls: ['./view-claim-history-modal.component.scss']
})
export class ViewClaimHistoryModalComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<ViewClaimHistoryModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { no:   string }) { }

  ngOnInit(): void {
  }

  close(action?) {
    this.dialogRef.close(action);
  }
}
