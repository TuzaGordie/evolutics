import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablePlainComponent } from './table-plain.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TablePipesModule } from '../../pipes/table.pipe';
import { TablePlainService } from './table-plain.service';
import { InputNGModelModule } from '../input-NgModel/input-ngmodel.module';
import { LoaderModule } from '../loader/loader.module';
import { SharedModule } from '../../shared.module';
import { UtilityPipesModule } from '../../pipes/utility.pipe';
import { InputModule } from '../input/input.module';
import { BtnModule } from '../btn/btn.module';
import { DirectivesModule } from '../../directives/index.directive';
import { ExportTableModule } from '../export-table/export-table.module';

@NgModule({
  declarations: [TablePlainComponent],
  imports: [
    BtnModule,
    CommonModule,
    DirectivesModule,
    ExportTableModule,
    FormsModule,
    InputModule,
    InputNGModelModule,
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
    TablePipesModule,
    UtilityPipesModule,
  ],
  exports: [TablePlainComponent],
  providers: [TablePlainService],
})
export class TablePlainModule {}
