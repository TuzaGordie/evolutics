import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { UtilityPipesModule } from '../../pipes/utility.pipe';
import { DirectivesModule } from '../../directives/index.directive';

@NgModule({
  declarations: [ConfirmDialogComponent],
  exports: [ConfirmDialogComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule,UtilityPipesModule,DirectivesModule],
})
export class ConfirmDialogModule {}
