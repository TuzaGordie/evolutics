import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteNgModelComponent } from './autocomplete-ng-model.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { InputModule } from '../input/input.module';
import { InputNGModelModule } from '../input-NgModel/input-ngmodel.module';
import { UtilityPipesModule } from '../../pipes/utility.pipe';



@NgModule({
  declarations: [
    AutocompleteNgModelComponent
  ],
  imports: [
    CommonModule,InputModule,MatAutocompleteModule,InputNGModelModule,UtilityPipesModule
  ],
  exports: [
    AutocompleteNgModelComponent
  ]
})
export class AutocompleteNgModelModule { }
