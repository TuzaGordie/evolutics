import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuotationService } from 'src/app/General/services/quotation-service.service';

@Component({
  selector: 'app-client-finder',
  templateUrl: './client-finder.component.html',
  styleUrls: ['./client-finder.component.scss']
})
export class ClientFinderComponent implements OnInit {
  clientName;
  clients: any[] = []
  loading: boolean = false;

  constructor(
    private quotationService: QuotationService,
    private dialogRef: MatDialogRef<ClientFinderComponent>,
  ) { }

  ngOnInit(): void {
  }

  findClient(){
    if (!this.clientName) return

    this.loading = true
    this.quotationService.findClientByName(this.clientName).subscribe(
      res => this.clients = res
    ).add(() => this.loading = false)
  }

  onSelectClient(client){
    this.dialogRef.close({
      clientNo: client.clientNo,
      clientName: this.getFullName(client)
    })
  }

  getFullName({surname, middleName, firstName}){
    firstName = firstName ? `${firstName} ` : '';
    middleName = middleName ? `${middleName} ` : '';
    surname = surname ? surname : '';
    return firstName + middleName + surname;
  }
}
