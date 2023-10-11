import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-policy-cover-table',
  templateUrl: './policy-cover-table.component.html',
  styleUrls: ['./policy-cover-table.component.scss'],
})
export class PolicyCoverTableComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public uS: UtilityService,) {}

  ngOnInit(): void {}
}
