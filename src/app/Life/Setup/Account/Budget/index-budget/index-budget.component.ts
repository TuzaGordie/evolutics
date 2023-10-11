import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-index-budget',
  templateUrl: './index-budget.component.html',
  styleUrls: ['./index-budget.component.scss'],
})
export class IndexBudgetComponent implements OnInit {
  constructor(
    private util: UtilityService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {}

  show(code: string) {
    if (!code) {
      this.util.notify('Please select a company', 0, 5000, 'fail');
      return;
    }
    this.router.navigate(['../show'], {
      queryParams: { code: code },
      relativeTo: this.route,
    });
  }

  clone(code: string) {
    if (!code) {
      this.util.notify('Please select a company', 0, 5000, 'fail');
      return;
    }
    this.router.navigate(['../clone'], {
      queryParams: { code: code },
      relativeTo: this.route,
    });
  }
}
