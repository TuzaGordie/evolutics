import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdSharedModule } from '../../policy-desk/policy-desk-extras/pd-shared.module';
import { RouterModule } from '@angular/router';
import { ScLifeAnnuityComponent } from './sc-life-annuity/sc-life-annuity.component';
import { ScAnnuityCertainComponent } from './sc-annuity-certain/sc-annuity-certain.component';
import { ScIndividualLifeComponent } from './sc-individual-life/sc-individual-life.component';
import { ScIndividualCreditComponent } from './sc-individual-credit/sc-individual-credit.component';
import { ScSavingsComponent } from './sc-savings/sc-savings.component';
import { ScEndowmentComponent } from './sc-endowment/sc-endowment.component';
import { SelectCoversComponent } from './select-covers.component';
import { AddSelectCoverComponent } from './add-select-cover/add-select-cover.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddSelectCoverModalComponent } from './add-select-cover-modal/add-select-cover-modal.component';

@NgModule({
  declarations: [
    SelectCoversComponent,
    ScLifeAnnuityComponent,
    ScAnnuityCertainComponent,
    ScIndividualLifeComponent,
    ScIndividualCreditComponent,
    ScSavingsComponent,
    ScEndowmentComponent,
    AddSelectCoverComponent,
    AddSelectCoverModalComponent,
  ],
  imports: [CommonModule, PdSharedModule, RouterModule, MatDialogModule],
  exports: [
    SelectCoversComponent,
    ScLifeAnnuityComponent,
    ScAnnuityCertainComponent,
    ScIndividualLifeComponent,
    ScIndividualCreditComponent,
    ScSavingsComponent,
    ScEndowmentComponent,
    AddSelectCoverComponent,
    AddSelectCoverModalComponent,
  ],
})
export class SelectCoversModule {}
