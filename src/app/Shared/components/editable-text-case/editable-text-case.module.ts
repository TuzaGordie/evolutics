import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableTextCaseComponent } from './editable-text-case.component';
import { InputModule } from '../input/input.module';
import { UtilityPipesModule } from '../../pipes/utility.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../../directives/index.directive';

@NgModule({
  declarations: [EditableTextCaseComponent],
  imports: [
    CommonModule,
    InputModule,
    UtilityPipesModule,
    MatTooltipModule,
    RouterModule,
    DirectivesModule,
  ],
  exports: [EditableTextCaseComponent],
})
export class EditableTextCaseModule {}
