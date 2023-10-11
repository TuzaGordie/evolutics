import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-unposted',
  templateUrl: './unposted.component.html',
  styleUrls: ['./unposted.component.scss']
})
export class UnpostedComponent implements OnInit {

  baseUrl = environment.apiBaseUrl + '/rest';
  unPostedData: any[] = []
  loading = false
  loadingText = ""

  constructor(
    private snack: MatSnackBar,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.loadingText = "Fetching Unposted receipts...."
    this.api.get(this.baseUrl + "/receipt/pending")
      .subscribe((data: any) => {
        this.loading = false
        this.snack.dismiss()
        this.unPostedData = data
      }, () => {
        this.loading = false
        this.snack.open("Internal server error.", "Close", { duration: 5000 })
      })
  }

}
