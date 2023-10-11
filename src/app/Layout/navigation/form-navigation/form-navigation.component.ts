import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import {
  faArrowAltCircleLeft,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { AppService } from 'src/app/Services/app.service';

@Component({
  selector: 'app-form-navigation',
  templateUrl: './form-navigation.component.html',
  styleUrls: ['../../form-layout/form-layout.component.scss'],
})
export class FormNavigationComponent implements OnInit {
  faArrowAltCircleLeft = faArrowAltCircleLeft;
  faHome = faHome;
  window_title = '';
  previousUrl: string = '';
  currentUrl: string = '';
  system = 'life';
  @Input() title: string;
  @Input() cashtitle: string;
  @Input() isModal: boolean;
  @Output() close = new EventEmitter();
  constructor(
    public appS: AppService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    if (!this.isModal)
      this._router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          map(() => this._activatedRoute),
          map((route: any) => {
            while (route.firstChild) route = route.firstChild;
            return route;
          }),
          filter((route) => route.outlet === 'primary'),
          mergeMap((route: any) => route.data)
        )
        .subscribe((event: any) => {
          this.window_title = event['title']?.toString();
        });
  }

  ngOnInit(): void {}
  goBack() {
    this.isModal ? this.close.emit() : this.location.back();
  }
}
