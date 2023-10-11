import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TableCol } from '../models/index.model';

@Pipe({
  name: 'getColFormatted',
})
export class GetColFormattedPipe implements PipeTransform {
  transform(row: any, col: TableCol): string {
    return (col.formatterRow
      ? col.formatterRow(row)
      : col.formatter
      ? col.formatter(row[col.f])
      : row[col.f])||'-';
  }
}

@Pipe({
  name: 'getRawFields',
})
export class GetRawFieldsPipe implements PipeTransform {
  transform(arr: TableCol[], optionsLen: number = 0): string[] {
    const fields = arr.map((r) => r.f);
    optionsLen ? fields.push('option') : null;
    return fields;
  }
}

@Pipe({
  name: 'getHeaders',
})
export class GetHeadersPipe implements PipeTransform {
  transform(arr: TableCol[]): string[] {
    return arr.map((r) => r.t);
  }
}

const pipes = [GetColFormattedPipe, GetHeadersPipe, GetRawFieldsPipe];
@NgModule({
  declarations: pipes,
  exports: pipes,
  imports: [CommonModule],
})
export class TablePipesModule {}
