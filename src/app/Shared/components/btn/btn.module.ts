import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BtnComponent } from './btn.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UtilityPipesModule } from '../../pipes/utility.pipe';
import { DirectivesModule } from '../../directives/index.directive';
import { BtnLgComponent } from './btn-lg/btn-lg.component';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BtnComponent, BtnLgComponent],
  imports: [CommonModule, FontAwesomeModule,MatTooltipModule,UtilityPipesModule,DirectivesModule,MatRippleModule,RouterModule],
  exports: [BtnComponent, BtnLgComponent],
})
export class BtnModule {}
