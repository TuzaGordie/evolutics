import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableHttpsComponent } from './table-https.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { LoaderModule } from '../loader/loader.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TablePipesModule } from '../../pipes/table.pipe';
import { RouterModule } from '@angular/router';
import { UtilityPipesModule } from '../../pipes/utility.pipe';
import { DirectivesModule } from '../../directives/index.directive';
@NgModule({
  declarations: [TableHttpsComponent],
  imports: [
    CommonModule,
    DirectivesModule,
    FormsModule,
    LoaderModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
    RouterModule,
    TablePipesModule,
    UtilityPipesModule,
  ],
  exports: [TableHttpsComponent],
})
export class TableHttpsModule {}
