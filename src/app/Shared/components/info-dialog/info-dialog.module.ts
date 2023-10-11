import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoDialogComponent } from './info-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SadIconComponent } from './sad-icon.component';
import { HappyIconComponent } from './happy-icon.component';
import { InfoIconComponent } from './info-icon.component';
import { BtnModule } from '../btn/btn.module';
import { UtilityPipesModule } from '../../pipes/utility.pipe';
import { DirectivesModule } from '../../directives/index.directive';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    InfoDialogComponent,
    SadIconComponent,
    HappyIconComponent,
    InfoIconComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    BtnModule,
    UtilityPipesModule,
    DirectivesModule,
  ],
  exports: [
    InfoDialogComponent,
    SadIconComponent,
    HappyIconComponent,
    InfoIconComponent,
  ],
})
export class InfoDialogModule {}
