import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoIconComponent } from './info-icon.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DirectivesModule } from '../../directives/index.directive';
import { UtilityPipesModule } from '../../pipes/utility.pipe';



@NgModule({
  declarations: [
    InfoIconComponent
  ],
  imports: [
    CommonModule,MatTooltipModule,DirectivesModule,UtilityPipesModule
  ],
  exports: [
    InfoIconComponent
  ]
})
export class InfoIconModule { }
