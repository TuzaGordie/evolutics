import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UtilityService } from 'src/app/Services/utility.service';
import { AdjustClaimModalComponent } from '../adjust-claim-modal/adjust-claim-modal.component';

@Component({
  selector: 'app-history-modal',
  templateUrl: './history-modal.component.html',
  styleUrls: ['./history-modal.component.scss'],
})
export class HistoryModalComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<HistoryModalComponent>) {}

  ngOnInit(): void {}

  close(action) {
    this.dialogRef.close({ action });
  }
}
