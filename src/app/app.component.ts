import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  RouterLinkWithHref,
  NavigationStart,
} from '@angular/router';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UtilityService } from './Services/utility.service';
import { PageLoaderService } from './Services/page-loader.service';
import { environment } from 'src/environments/environment';
import { AppService } from './Services/app.service';
import { SearchService } from './components/search/search-extras/search.service';
import { ChatHelpDeskService } from './components/page-icons/chat-help-desk/chat-help-desk.service';
import { TranslationService } from './Services/translation.service';
import { AuthenticationService } from './Authentication/auth-extras/authentication.service';
import { UserService } from './Services/user.service';
import { DocumentService } from './Services/document.service';
import { CacheUpdaterService } from './Services/cache/cache-updater.service';
import { LocalCacheService } from './Services/cache/local-cache.service';
import { UsermenuService } from './Life/admin/user/usermenu/usermenu-extras/usermenu.service';
import { IdlerService } from './Shared/components/idler/idler.service';
import { clone } from 'lodash-es';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Evolutics ';
  routeSub: Subscription;
  get screenHeight() {
    return window.outerHeight;
  }
  loading = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public appS: AppService,
    public authService: AuthenticationService,
    public chatHelpDeskService: ChatHelpDeskService,
    public pS: PageLoaderService,
    public searchS: SearchService,
    public translateService: TranslationService,
    public uS: UtilityService,
    public userService: UserService,
    public cuS: CacheUpdaterService,
    public lcS: LocalCacheService
  ) {
    console.log('Loaded at', new Date());
    console.log('ALLOWED SYSTEMS', environment.activeSystems);
    this.searchS.buildIndex();
  }
  async ngOnInit() {
    if (this.authService.isLoggedin) {
      this.authService.getAllFromLocal();
      this.authService.getAllFromOnline();
    }
  }
  ngAfterViewInit() {
    this.routeSub = this.router.events
      .pipe(
        tap((event) => {
          if (event instanceof NavigationStart) {
            this.loading = true;
          }
        }),
        filter((event) => event instanceof NavigationEnd),
        tap((event) => {
          this.loading = false;
        }),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      )
      .subscribe((params) => {
        this.appS.pageName = params?.title;
        environment.activatedRoute = null;
        // this.tS.setActive(params.theme as ThemeName);
        // this.app.buildBreadCrumb(this.activatedRoute.root);
        this.uS.scrollToTop();
        this.chatHelpDeskService.reload();
      });
  }
  ngOnDestroy(): void {
    this.appS.pageName = '';
    this.routeSub.unsubscribe();
  }
}
