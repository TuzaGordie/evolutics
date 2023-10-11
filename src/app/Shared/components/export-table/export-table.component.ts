import { Component, Input, OnInit } from '@angular/core';
import { TableCol } from '../../models/index.model';

@Component({
  selector: 'app-export-table',
  templateUrl: './export-table.component.html',
  styleUrls: ['./export-table.component.scss'],
})
export class ExportTableComponent implements OnInit {
  @Input() data: any[];
  @Input() displayedColumns: TableCol[];
  @Input() label:string
  constructor() {}

  ngOnInit(): void {}
  downloadCSV(data: any[] = this.data, label = this.label) {
    const csvArray =
      `${this.displayedColumns.map((x) => x.t).join(',')}\r\n` +
      data
        .map((x) =>
          this.displayedColumns
            .map((y) => x[y.f])
            .join(',')
        )
        .join('\r\n');
    // console.log(csvArray);
    // debugger

    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = `${this.label} ${new Date().toISOString()} ${
      this.displayedColumns?.length
    }x${data?.length}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
