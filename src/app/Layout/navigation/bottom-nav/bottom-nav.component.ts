import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { UsersService } from 'src/app/Services/life/users.service';
import { StorageService } from 'src/app/Services/storage.service';
import { appRoutes } from 'src/app/configs/app-routes-configs/app-routes.config';
import { AppService } from 'src/app/Services/app.service';
import { MenuItem } from 'src/app/Shared/models/index.model';
import { AuthenticationService } from 'src/app/Authentication/auth-extras/authentication.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { NavbarSearchComponent } from 'src/app/components/search/search-components/navbar-search/navbar-search.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
})
export class BottomNavComponent implements OnInit {
  system: string = '';
  navColor = '';
  type = '';
  appRoutes = appRoutes;

  id = 71;
  user = environment.userProfile;

  menu: MenuItem[] = [];
  helpLink = environment.helpLink;
  @ViewChild('search') searchRef: NavbarSearchComponent;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UsersService,
    private storage: StorageService,
    public appS: AppService,
    public authS: AuthenticationService,
    public uS: UtilityService
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route: any) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route: any) => route.data)
      )
      .subscribe((event: any) => {
        // console.log(this.system);
        this.navColor = event['color'].toString();

        // console.log(this.navColor);
        if (event['system']) {
          // this.system = event['system'].toString();
        }

        if (event['type']) {
          this.type = event['type'].toString();
        }
      });
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
 
  }
  signOut() {
    this.uS.startPl();
    this.authS.logout().then(() => this.router.navigateByUrl('/'));
  }
  tractById = (index, item: MenuItem) => {
    return item.id;
  };
}
