import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import {
  IRowOption,
  ISearchResponse,
  SortType,
  TableCol,
} from '../../models/index.model';

@Component({
  selector: 'table-https',
  templateUrl: './table-https.component.html',
  styles: [
    `
      :host ::ng-deep .colour {
        height: 15px;
        width: 15px;
        display: inline-block;
        border-radius: 5px;
      }
      :host ::ng-deep .default.colour {
        background-color: #545454;
      }

      .mat-header-cell {
        color: #1b1a50;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        text-align: center;
      }
      td {
        text-align: left;
      }
    `,
  ],
})
export class TableHttpsComponent implements OnInit {
  @Input() orderField: string;
  @Input() orderDirection: SortType = 'asc';
  @Input() text: string;
  @Input() noItemTxt: string;
  @Input() queryData: any;
  @Input() displayedColumns: TableCol[];
  @Input() observableFunc: (data: any) => Observable<ISearchResponse>;
  @Input() pageSize = 10;
  @Input() showExport = false;
  @Input() pageNumber = 0;
  @Input('rowOptions') options: IRowOption[];
  @Output('rowClick') _rowClick = new EventEmitter();
  form: FormGroup;
  filteredAndPagedResults: Observable<any[]>;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  data: ISearchResponse<any>;

  constructor(public route: ActivatedRoute) {}
  ngOnInit() {
    this.form = new FormGroup({
      pageNumber: new FormControl(this.pageNumber || 0),
      sortBy: new FormControl(),
      sortDirection: new FormControl(),
      pageSize: new FormControl(this.pageSize),
    });
  }
  ngAfterViewInit() {
    this.queryData = this.queryData || this.route.snapshot.queryParams;
    this.paginator.page.subscribe((r) => {
      this.form.patchValue({ pageNumber: r.pageIndex, pageSize: r.pageSize });
    });
    this.sort.sortChange.subscribe((r) => {
      this.form.patchValue({
        sortDirection:
          r.direction == 'asc' ? 'ASC' : r.direction == 'desc' ? 'DESC' : '',
        sortBy: r.active,
      });
    });
    this.filteredAndPagedResults = merge(this.form.valueChanges).pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        const queryData = this.queryData;
        return this.observableFunc({ ...queryData, ...this.form.value });
      }),
      map((data) => {
        // Flip flag to show that loading has finished.
        console.log(data);
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.data = data;
        this.resultsLength = data?.page?.totalElements;
        return data?.page?.content;
      }),
      catchError((e) => {
        console.log(e);
        this.isLoadingResults = false;

        this.isRateLimitReached = true;
        return observableOf([]);
      })
    );
  }

  resetPaging(): void {
    this.paginator.pageIndex = 0;
  }
  rowClick(e) {
    this._rowClick.emit(e);
  }
}
