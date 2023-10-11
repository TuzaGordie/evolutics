import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-underwriting-events',
  templateUrl: './underwriting-events.component.html',
  styleUrls: ['./underwriting-events.component.scss'],
})
export class ClientUnderwritingEventsComponent implements OnInit {
  conditionsReportedCount = 1;

  constructor(private router: Router, public route: ActivatedRoute) {}

  ngOnInit(): void {}

  onAdd() {
    this.conditionsReportedCount++;
  }

  onRemove(item) {
    if (this.conditionsReportedCount > 1) this.conditionsReportedCount--;
  }

  conditionsCounter() {
    return new Array(this.conditionsReportedCount);
  }

  onSearch() {
    this.router.navigate(['/life/pendingpayments']);
  }
}
