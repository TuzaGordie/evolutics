import { Component, OnInit } from '@angular/core';
import { PDService } from '../../policy-desk-extras/policy-desk.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/Services/app.service';

@Component({
  selector: 'app-policy-desk-layout',
  templateUrl: './policy-desk-layout.component.html',
  styleUrls: ['./policy-desk-layout.component.scss'],
})
export class PolicyDeskLayoutComponent implements OnInit {
  routeSub: Subscription;
  constructor(
    public uS: PDService,
    public appS: AppService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {}
  ngAfterViewInit() {}
  ngOnDestroy(): void {}
  back() {
    this.uS.back();
  }
}
