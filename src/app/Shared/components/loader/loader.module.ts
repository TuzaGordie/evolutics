import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';
import { SpinnerComponent } from './spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UtilityPipesModule } from '../../pipes/utility.pipe';
const exports = [LoaderComponent, SpinnerComponent];
@NgModule({
  declarations: exports,
  exports,
  imports: [CommonModule, MatProgressSpinnerModule,UtilityPipesModule],
})
export class LoaderModule {}
