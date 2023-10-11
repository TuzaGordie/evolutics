import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent } from './core/button/button.component';
import { DirectivesModule } from '../directives/index.directive';
import { UtilityPipesModule } from '../pipes/utility.pipe';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [ButtonComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    UtilityPipesModule,
    MatRippleModule,
  ],
  exports: [ButtonComponent],
})
export class ComponentsModule {}
