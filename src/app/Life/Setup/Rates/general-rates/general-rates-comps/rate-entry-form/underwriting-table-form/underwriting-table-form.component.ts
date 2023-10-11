import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { configForms } from 'src/app/Shared/models/form.class';
import { ICodeTitle, TableCol } from 'src/app/Shared/models/index.model';
import { ILookupParams } from '../../../general-rates-extras/general-rates.model'; 
import { IUnderwritingVal } from '../../../../rates-extras/rates.model';
import { GeneralRatesService } from '../../../general-rates-extras/general-rates.service';
import { clone, cloneDeep } from 'lodash-es';
@Component({
  selector: 'app-underwriting-table-form',
  templateUrl: './underwriting-table-form.component.html',
  styleUrls: ['./underwriting-table-form.component.scss'],
})
export class UnderwritingTableFormComponent implements OnInit {
  list: IUnderwritingVal[];
  dCols: TableCol[] = [
    new TableCol('Code', 'code'),
    new TableCol('Company', 'companyCode'),
    new TableCol('Description', 'description'),
    new TableCol('Action', 'value',null,null,'checkbox'),
  ];
  constructor(
    public frS: GeneralRatesService,
    public dialogRef: MatDialogRef<UnderwritingTableFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { ids: string }
  ) {}

  ngOnInit(): void {
    this.frS.getUnderwritingValues().then((r) => {
     this.list = (this.data.ids)? this.parseInput(cloneDeep(r)):cloneDeep(r);
    });
  }
  patchList(list: IUnderwritingVal[]) {
    console.log(list, this.list);
  }
  close() {
    this.dialogRef.close(this.data.ids);
  }
  private parseResponse() {
    return this.list
      .filter((x) => x['value'])
      .map((x) => x.code)
      .join(',');
  }
  private parseInput(list:IUnderwritingVal[]) {
    const codes = this.data?.ids?.split(',') || [];
    for (const code of codes) { 
      try {
        list.find((x) => x.code == code)['value'] = true;
      } catch (error) {
        console.error(error);
        console.log(code);
      }
    }
    return list
  }
  save() {
    this.dialogRef.close(this.parseResponse());
  }
}
