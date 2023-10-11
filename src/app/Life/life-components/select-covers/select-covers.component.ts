import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PDService } from '../../policy-desk/policy-desk-extras/policy-desk.service';
import { AddSelectCoverModalComponent } from './add-select-cover-modal/add-select-cover-modal.component';

@Component({
  selector: 'app-select-covers',
  templateUrl: './select-covers.component.html',
  styleUrls: ['./select-covers.component.scss'],
})
export class SelectCoversComponent implements OnInit {
  constructor(private router: Router, public uS: PDService) {}

  ngOnInit(): void {}

  add() {
    this.uS.dialogOpener(
      AddSelectCoverModalComponent,
      { height: 'auto', width: 'calc(100vw * 0.7569)' },
      () => {}
    );
  }
}
