import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UtilityService } from 'src/app/Services/utility.service';
import { IdlerService } from './idler.service';

@Component({
  selector: 'app-idler',
  templateUrl: './idler.component.html',
  styleUrls: ['./idler.component.scss'],
})
export class IdlerComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<IdlerComponent>,
    public idlerService: IdlerService,
    public uS: UtilityService
  ) {}

  ngOnInit(): void {}
  close() {
    this.dialogRef.close();
  }
}
