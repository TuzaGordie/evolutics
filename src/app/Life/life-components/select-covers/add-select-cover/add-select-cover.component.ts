import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PDService } from 'src/app/Life/policy-desk/policy-desk-extras/policy-desk.service';
import { ScAnnuityCertainComponent } from '../sc-annuity-certain/sc-annuity-certain.component';
import { ScEndowmentComponent } from '../sc-endowment/sc-endowment.component';
import { ScIndividualCreditComponent } from '../sc-individual-credit/sc-individual-credit.component';
import { ScIndividualLifeComponent } from '../sc-individual-life/sc-individual-life.component';
import { ScLifeAnnuityComponent } from '../sc-life-annuity/sc-life-annuity.component';
import { ScSavingsComponent } from '../sc-savings/sc-savings.component';

@Component({
  selector: 'app-add-select-cover',
  templateUrl: './add-select-cover.component.html',
  styleUrls: [
    './add-select-cover.component.scss',
    '../../../policy-desk/policy-desk-comps/policy-desk-layout/policy-desk-layout.component.scss',
  ],
})
export class AddSelectCoverComponent implements OnInit {
  isRp1Check: boolean;
  @Input() main = false;
  // @Output() changerp1 = new EventEmitter<boolean>();
  constructor(public uS: PDService) {}

  ngOnInit(): void {}
  add() {
    this.uS.dialogOpener(
      AddSelectCoverComponent,
      {
        height: 'auto',
        maxHeight: '90vh',
        width: 'calc(100vw * 0.7569)',
        disableClose: true,
      },
      () => {}
    );
  }
  showRp1Modal() {
    this.uS.dialogOpener(
      ScLifeAnnuityComponent,
      {
        height: 'auto',
        maxHeight: '90vh',
        width: 'calc(100vw * 0.7569)',
        disableClose: true,
      },
      (r) => {
        this.changerp1(r);
      }
    );
  }
  showRp2Modal() {
    this.uS.dialogOpener(
      ScAnnuityCertainComponent,
      {
        height: 'auto',
        maxHeight: '90vh',
        width: 'calc(100vw * 0.7569)',
        disableClose: true,
      },
      () => {}
    );
  }
  showRp3Modal() {
    this.uS.dialogOpener(
      ScIndividualLifeComponent,
      {
        height: 'auto',
        maxHeight: '90vh',
        width: 'calc(100vw * 0.7569)',
        disableClose: true,
      },
      () => {}
    );
  }
  showRp4Modal() {
    this.uS.dialogOpener(
      ScIndividualCreditComponent,
      {
        height: 'auto',
        maxHeight: '90vh',
        width: 'calc(100vw * 0.7569)',
        disableClose: true,
      },
      () => {}
    );
  }
  showRp5Modal() {
    this.uS.dialogOpener(
      ScSavingsComponent,
      {
        height: 'auto',
        maxHeight: '90vh',
        width: 'calc(100vw * 0.7569)',
        disableClose: true,
      },
      () => {}
    );
  }
  showRp6Modal() {
    this.uS.dialogOpener(
      ScEndowmentComponent,
      {
        height: 'auto',
        maxHeight: '90vh',
        width: 'calc(100vw * 0.7569)',
        disableClose: true,
      },
      () => {}
    );
  }
  changerp1(status: boolean) {
    this.isRp1Check = status;
  }
  save() {}
  go(route: string) {
    this.uS.go(route);
  }
}
