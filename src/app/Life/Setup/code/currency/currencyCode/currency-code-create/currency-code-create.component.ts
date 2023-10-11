import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CodeService } from 'src/app/Services/code.service';
import { CurrencyService } from 'src/app/Services/life/currency.service';
import { Currency } from 'src/app/Shared/models/life/currency/currency';

@Component({
  selector: 'app-currency-code-create',
  templateUrl: './currency-code-create.component.html',
  styleUrls: ['./currency-code-create.component.scss']
})
export class CurrencyCodeCreateComponent implements OnInit {

  @ViewChild('f') form: any;

  numberBasis: any[] = []

  currency = new Currency()

  disableCode: boolean = false

  constructor(
    private currencyService: CurrencyService,
    private codeService: CodeService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getNumberBasis()

    let showCurrencyCode = JSON.parse(localStorage.getItem("showCurrencyCode"))
    let cloneCurrencyCode = JSON.parse(localStorage.getItem("cloneCurrencyCode"))

    if (showCurrencyCode != null) {
      this.disableCode = true
      this.currency = showCurrencyCode
      localStorage.removeItem("showCurrencyCode")
    }

    if (cloneCurrencyCode != null) {
      this.currency = cloneCurrencyCode
      delete this.currency.id
      delete this.currency.code
      localStorage.removeItem("cloneCurrencyCode")
    }
  }

  getNumberBasis() {
    this.codeService.getCodesByCodeSubGroup("NUMBERING_BASIS")
      .subscribe((data: any) => {
        this.numberBasis = data
      })
  }

  createCurrency() {
    if (this.form.valid) {
      this.snack.open("Process.....", "Close")
      this.currencyService.createCurrencyCode(this.currency)
        .subscribe((data: any) => {
          this.snack.dismiss()
          this.snack.open("Currency created successfully!.", "Close", { duration: 5000 })
        },
          (error: any) => {
            this.snack.dismiss()
            this.snack.open(error?.error?.error, "Close", { duration: 5000 })
          })
    } else {
      this.snack.open("Kindly fill all required fields!.", "Close", { duration: 5000 })
    }

  }

}
