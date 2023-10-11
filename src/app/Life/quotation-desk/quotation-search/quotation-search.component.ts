import { Component, OnInit } from '@angular/core';
import { FindQuotationService } from '../service/find-quotation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quotation-search',
  templateUrl: './quotation-search.component.html',
  styleUrls: ['./quotation-search.component.scss'],
})
export class LifeQuotationSearchComponent implements OnInit {
  quotations: any[] = [];
  quotationList: any;

  connection = {
    creating: false,
    error: false,
    retrieving: false,
  };

  constructor(public findQuotationService: FindQuotationService, private router: Router) {}

  ngOnInit(): void {
    this.getQuotations();
  }

  getQuotations() {
    this.connection.creating = true;

    this.quotationList = localStorage.getItem('searchQuotations');
    this.quotations = JSON.parse(this.quotationList);
    console.log('quotations', this.quotations);
  }
}
