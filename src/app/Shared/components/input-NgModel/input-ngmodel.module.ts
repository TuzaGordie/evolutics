import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { InputNGModelComponent } from './input-ngmodel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputPipesModule } from 'src/app/Shared/pipes/inputs-pipes.pipe';
import { ValidationMessageNgmodelComponent } from './validation-message-ngmodel/validation-message-ngmodel.component';
import { UtilityPipesModule } from '../../pipes/utility.pipe';

@NgModule({
  declarations: [InputNGModelComponent, ValidationMessageNgmodelComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputPipesModule,UtilityPipesModule],
  exports: [InputNGModelComponent, FormsModule, ReactiveFormsModule, ValidationMessageNgmodelComponent],
  providers: [TitleCasePipe]
})
export class InputNGModelModule {}
