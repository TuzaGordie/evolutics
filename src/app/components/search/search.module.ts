import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarSearchComponent } from './search-components/navbar-search/navbar-search.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  SystemColourCodePipe,
  SystemLinkPipe,
} from './search-extras/search.pipe';
import { SearchCaseDirective } from './search-extras/search.directive';
import { UtilityPipesModule } from 'src/app/Shared/pipes/utility.pipe';

@NgModule({
  declarations: [
    NavbarSearchComponent,
    SystemColourCodePipe,
    SystemLinkPipe,
    SearchCaseDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule,
    UtilityPipesModule,
  ],
  exports: [NavbarSearchComponent],
})
export class SearchModule {}
