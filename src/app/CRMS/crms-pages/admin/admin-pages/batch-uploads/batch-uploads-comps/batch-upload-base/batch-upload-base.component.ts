import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IInputTableScheme } from 'src/app/Shared/components/input-table/input-table.model';
import { ITableCol } from 'src/app/Shared/models/index.model';

@Component({
  templateUrl: './batch-upload-base.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BatchUploadBaseComponent {
  schemas: IInputTableScheme[] = [];
  loading: boolean; 

  constructor( ) {}
  ngOnInit(): void { 
  }
  async init<T>(dataFuncs:  Promise<T[]> ) {
    this.loading = true;
    try { 
      const ret= await dataFuncs;
      this.loading = false;
      return ret
    } catch (error) {
      console.error(error);
     throw error
    }
  } 
  
}
