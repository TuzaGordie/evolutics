import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { QuotationService } from 'src/app/General/services/quotation-service.service';
import { FindQuotationService } from 'src/app/Life/quotation-desk/service/find-quotation.service';

@Component({
  selector: 'app-quote-finder',
  templateUrl: './quote-finder.component.html',
  styleUrls: ['./quote-finder.component.scss']
})
export class QuoteFinderComponent implements OnInit {
  quoteName;
  quotes: any[] = []
  loading: boolean = false;

  constructor(private quotationService: FindQuotationService, private dialogRef: MatDialogRef<QuoteFinderComponent> ) { }

  ngOnInit(): void {
  }

  findQuote(){
    if (!this.quoteName) return

    this.loading = true
    this.quotationService.findQuotation({ownerName: this.quoteName}).subscribe(
      (res: any[]) => this.quotes = res
    ).add(() => this.loading = false)
  }

  onSelectQuote(quote){
    this.dialogRef.close(quote)
  }

}
