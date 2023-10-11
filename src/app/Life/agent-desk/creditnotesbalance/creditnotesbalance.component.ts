import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creditnotesbalance',
  templateUrl: './creditnotesbalance.component.html',
  styleUrls: ['./creditnotesbalance.component.css'],
})
export class CreditnotesbalanceComponent implements OnInit {
  creditNotesBalanceList: any[];
  totalUnsettled: number;
  daysOutstanding: number;
  constructor(private router: Router) {}

  ngOnInit(): void {}
  navigateback() {
    // this.router.navigateByUrl("life/agent-desk/view-agent");
  }
}
