import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-find-sort-code-modal',
  templateUrl: './find-sort-code-modal.component.html',
  styleUrls: ['./find-sort-code-modal.component.scss']
})
export class FindSortCodeModalComponent implements OnInit {
  constructor(
    public uS: UtilityService, 
    public dialogRef: MatDialogRef<FindSortCodeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { clientNo: string }
  ) {}

  ngOnInit(): void {}

  close(data?: any) {
    this.dialogRef.close(data);
  }
}
