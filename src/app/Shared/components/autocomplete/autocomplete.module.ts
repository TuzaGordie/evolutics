import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './autocomplete.component';
import { InputModule } from '../input/input.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { UtilityPipesModule } from '../../pipes/utility.pipe';


@NgModule({
  declarations: [
    AutocompleteComponent
  ],
  imports: [
    CommonModule,InputModule,MatAutocompleteModule,UtilityPipesModule
  ],
  exports: [
    AutocompleteComponent
  ]
})
export class AutocompleteModule { }
