import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/Services/life/company.service';
import { StorageService } from 'src/app/Services/storage.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { ProcessActionService } from '../processAction.service';

@Component({
  selector: 'app-index-process-actions',
  templateUrl: './index-process-actions.component.html',
  styleUrls: ['./index-process-actions.component.scss'],
})
export class IndexProcessActionsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private processActionService: ProcessActionService,
    private util: UtilityService,
  ) {}

  public processCodeArray: any[] = [];
  public processCodeValue: string = null;

  ngOnInit(): void {
    this.processActionService.getProcessCodes().subscribe(
      res => this.processCodeArray = res
    )
  }

  show() {
    if (!this.processCodeValue) {
      this.util.notify('Please select a process code', 0, 5000, 'fail');
      return;
    }
    this.router.navigate(['../show'], {
      queryParams: { code: this.processCodeValue },
      relativeTo: this.route,
    });
  }

  clone() {
    if (!this.processCodeValue) {
      this.util.notify('Please select a process code', 0, 5000, 'fail');
      return;
    }
    this.router.navigate(['../clone'], {
      queryParams: { code: this.processCodeValue },
      relativeTo: this.route,
    });
  }
}
