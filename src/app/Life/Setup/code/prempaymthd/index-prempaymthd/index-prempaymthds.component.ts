import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PayinMethodService } from 'src/app/Services/life/payout-method.service';

@Component({
  selector: 'app-index-prempaymthds',
  templateUrl: './index-prempaymthds.component.html',
  styleUrls: ['./index-prempaymthds.component.scss'],
})
export class IndexCodePremiumPaymentMethodComponent implements OnInit {
  payinMethods: any[] = [];
  code: string = '';

  message = {
    error: false,
    success: false,
    warning: false,
  };

  constructor(
    public router: Router,public route:ActivatedRoute,
    private payinMethodService: PayinMethodService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getPayinMethods();
  }

  getPayinMethods() {
    this.payinMethodService
      .getPayinMethodCodesAndDesc()
      .subscribe((data: any) => {
        this.payinMethods = data;
      });
  }

  fetchPayinMethods(action: string) {
    if (this.code.length > 1) {
      this.snack.open("Processing.....", "Close")
      this.payinMethodService
        .getPayinMethodsByPayinCode(this.code)
        .subscribe((data: any) => {
          localStorage.setItem(action, JSON.stringify(data));
          this.snack.dismiss()          
          this.router.navigate(['../create-prempaymthd'],{relativeTo:this.route, queryParams: {action}});
        },
          (error: any) => {
            this.snack.dismiss()
            this.snack.open(error?.error?.error, "Close", { duration: 5000 })
          });
    } else this.message.error = true;
  }

  show(): void {
    this.fetchPayinMethods('premPayShow');
  }

  clone(): void {
    this.fetchPayinMethods('premPayClone');
  }

}
