import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyService } from 'src/app/Services/life/currency.service';

@Component({
  selector: 'app-currency-code-index',
  templateUrl: './currency-code-index.component.html',
  styleUrls: ['./currency-code-index.component.scss']
})
export class CurrencyCodeIndexComponent implements OnInit {

  currencyCodes: any[] = []
  currencyCode: string = ""

  message = {
    success: false,
    warning: false,
    error: false,
  }

  constructor(
    private currencyService: CurrencyService,
    public router: Router,public route:ActivatedRoute,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getCurrencyCodes()
  }

  fetchCurrency(action: string): void {
    if (this.currencyCode.length > 0) {
      this.snack.open("Processing....", "Close")
      this.currencyService.getCurrencyByCode(this.currencyCode)
        .subscribe((data: any) => {
          this.snack.dismiss()
          localStorage.setItem(action, JSON.stringify(data)) 
          this.router.navigate(['../create'],{relativeTo:this.route});
        }, (error: any) => {
          this.snack.dismiss()
          this.snack.open(error?.error?.error, "Close", { duration: 5000 })
        })
    } else {
      this.message.error = true
    }
  }

  show(): void {
    this.fetchCurrency("showCurrencyCode")
  }

  clone(): void {
    this.fetchCurrency("cloneCurrencyCode")
  }

  getCurrencyCodes() {
    this.currencyService.getCurrency()
      .subscribe((data: any) => {
        this.currencyCodes = data
      })
  }



}
