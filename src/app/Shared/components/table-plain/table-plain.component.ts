import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { clone } from 'lodash-es';
import { IRowOption, SortType, TableCol } from '../../models/index.model';

@Component({
  selector: 'table-plain',
  templateUrl: './table-plain.component.html',
  styleUrls: ['./table-plain.component.scss'],
})
export class TablePlainComponent<T> implements OnInit {
  @Input('rowOptions') options: IRowOption[];
  @Input() centerCells: boolean;
  @Input() displayedColumns: TableCol[];
  @Input() distinct = false;
  @Input() idField: string = 'id';
  @Input() noItemTxt: string;
  @Input() nowrap = false;
  @Input() orderDirection: SortType = 'desc';
  @Input() orderField: string;
  @Input() pageSize = 5;
  @Input() pageSizeOptions = [5, 10, 15, 20, 50, 100, 200];
  @Input() resultsLength = 5;
  @Input() showExport = false;
  @Input() showFilter = false;
  @Input() showPager = false;
  @Input() smallerFonts = false;
  @Input('label') text: string;
  @Output('rowClick') _rowClick = new EventEmitter<any>();

  form = new FormGroup({ field: new FormControl(), value: new FormControl() });
  dataSource: MatTableDataSource<any>;
  mutableList: any[];
  defaultFilterPredicate: any;

  @Input() set data(v: T[]) {
    this.dataSource = new MatTableDataSource(v);
    if (this.showPager) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    if (this.showFilter) {
      this.defaultFilterPredicate =
        this.defaultFilterPredicate || this.dataSource.filterPredicate.clone();
      this.dataSource.filterPredicate = (row: any, filter: any) => {
        // debugger
        if (filter.field) {
          return (row[filter.field]?.toLowerCase()?.trim() || '')?.includes(
            filter.value
          );
        } else {
          return this.defaultFilterPredicate(row, filter.value);
        }
      };
    }
    this.mutableList = v;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Output() emitCheckbox = new EventEmitter<{
    field: string;
    item: T;
    value: boolean;
  }>();

  @Output() listMutated = new EventEmitter<T[]>();

  constructor() {}
  ngOnInit() {
    this.form.valueChanges.subscribe((r: { field: string; value: string }) => {
      r.value = r.value?.toLowerCase()?.trim() || '';
      this.dataSource.filter = r as any;
    });
  }
  ngAfterViewInit(): void {
    if (this.showPager) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  get filterOptions() {
    return this.displayedColumns.map((x) => ({ code: x.f, description: x.t }));
  }
  clearFilter() {
    this.form.reset(null);
  }
  outputCheckbox(field: string, item: T, value: any) {
    console.log(field, item, value, this.mutableList);
    const find = this.mutableList?.find(
      (x) => x[this.idField] == item[this.idField]
    );
    if (find) find[field] = value;
    this.emitCheckbox.emit({ field, item, value });
    this.listMutated.emit(this.mutableList);
  }
  rowClick(e) {
    this._rowClick.emit(e);
  }
}
