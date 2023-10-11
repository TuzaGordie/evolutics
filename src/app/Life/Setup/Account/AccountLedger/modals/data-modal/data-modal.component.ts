import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { UtilityService } from 'src/app/Services/utility.service';
import { AccountsService } from '../../../accounts-extras/accounts.service';
import { AddColumnModalComponent } from '../add-column-modal/add-column-modal.component';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-data-modal',
  templateUrl: './data-modal.component.html',
  styleUrls: ['./data-modal.component.scss'],
})
export class DataModalComponent implements OnInit {
  faBars = faBars;
  records;
  query;
  isLoading = true;
  optionalColumns = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) {query},
    public utilityService: UtilityService,
    private accountsService: AccountsService,
  ) {
    this.query = query;
  }

  ngOnInit(): void {
    this.fetchRecords();
  }

  fetchRecords(){
    this.accountsService.getAccountTransList(this.query).subscribe(
      res => {
        this.records = res.content
        this.initializeOptionalColumns()
      }
    ).add(() => this.isLoading = false)
  }

  openAddColumnModal(){
    this.utilityService.dialogOpener(
      AddColumnModalComponent,
      {
        minWidth: '50vw',
        data: {columns: this.optionalColumns}
      },
      (r)=>{}
    )
  }

  exportToExcel() {
    let data = this.records

    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], {type: 'text/csv' })
    saveAs(blob, "Account Ledger Search Results.csv");
  }

  initializeOptionalColumns(){
    const compulsoryColumns = {
      transNo: true,
      accCode: true,
      amount: true,
      reversed: true,
      createdOn: true,
      createdBy: true,
      policyNo: true,
      narration: true
    }

    this.optionalColumns = Object.keys(this.records[0])
      // filter out compulsory columns
      .filter(column => !compulsoryColumns[column])
      // format to proper data structure
      .map( column => ({name: column, title: this.variableToSentence(column), display: false}))
  }

  variableToSentence(name: string){
    // convert a multi-word variable in camelCase to Seperate Words
    const result = name.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
}
