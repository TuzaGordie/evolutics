import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextCase1Component } from './text-case-1.component';
import { MatIconModule } from '@angular/material/icon';
import { UtilityPipesModule } from '../../pipes/utility.pipe';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../../directives/index.directive';

@NgModule({
  declarations: [TextCase1Component],
  imports: [
    CommonModule,
    MatIconModule,
    UtilityPipesModule,
    RouterModule,
    DirectivesModule,
  ],
  exports: [TextCase1Component],
})
export class TextCase1Module {}
