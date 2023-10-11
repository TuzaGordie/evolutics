import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { UtilityService } from 'src/app/Services/utility.service';
import { IFormSchema } from 'src/app/Shared/models/form-schema.model';
import { ISearchResponse, TableCol } from 'src/app/Shared/models/index.model';
import { ISearchFormSchema } from './find-item.model';

@Component({
  selector: 'app-find-item',
  templateUrl: './find-item.component.html',
  styleUrls: ['./find-item.component.scss'],
})
export class FindItemComponent implements OnInit {
  formSchema: ISearchFormSchema[];
  searchForm: FormGroup;
  data: any[];
  @Input('formSchema') set _formSchema(v: ISearchFormSchema[]) {
    this.init(v);
  }
  @Input() isTablePaginated = false;
  @Input() showExport = true;
  @Input() showFilter = true;
  @Input() displayedColumns: TableCol[];
  @Input() pageSize = 10;
  @Input() searchObservableFunc: (data: any) => Observable<ISearchResponse>;
  @Input() orderField: string;
  @Input() searchFunction: (data: any) => Observable<any>;
  @Output('rowClick') _rowClick = new EventEmitter<any>();
  loading: boolean;
  constructor(public uS: UtilityService) {}

  ngOnInit(): void {}
  init(schema: ISearchFormSchema[]) {
    this.formSchema = schema;
    this.searchForm = new FormGroup(this.uS.formSchemaToFormControls(schema));
  }
  async search() {
    try {
      this.loading = true;
      const data = await this.searchFunction(
        this.searchForm?.value
      ).toPromise();
      this.data = data;
    } catch (error) {
      console.error(Error);
    }
    this.loading = false;
  }
  rowClick(e) {
    this._rowClick.emit(e);
  }
}
