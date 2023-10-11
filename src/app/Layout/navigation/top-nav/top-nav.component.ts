import { Component, OnInit } from '@angular/core';
import {
  faHeart,
  faTruck,
  faHeartbeat,
  faSquareRootAlt,
  faChartLine,
  faSignal,
  faChartPie,
  faDollyFlatbed,
  faCoins,
  faReceipt,
  faFileWord,
  faChartBar,
  faCopy,
  faUser as faHuman,
} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { configMainMenu } from 'src/app/configs/menu-configs/top-menu.config';
import { AppService } from 'src/app/Services/app.service';
import { MenuItem } from 'src/app/Shared/models/index.model';
import { UtilityService } from 'src/app/Services/utility.service';
import { SearchService } from 'src/app/components/search/search-extras/search.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
  faHeart = faHeart;
  faTruck = faTruck;
  faHeartbeat = faHeartbeat;
  faSquareRootAlt = faSquareRootAlt;
  faDollyFlatbed = faDollyFlatbed;
  faChartLine = faChartLine;
  faChartPie = faChartPie;
  faSignal = faSignal;
  faCoins = faCoins;
  faReceipt = faReceipt;
  faFileWord = faFileWord;
  faChartBar = faChartBar;
  navColor = '';
  system = '';
  faCopy = faCopy;
  faHumn = faHuman;
  routeSub: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public appS: AppService,
    public uS: UtilityService,
    public sS: SearchService
  ) {
    this.routeSub = this.router.events
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
        console.log(event);
        if (event['color'] && event['system']) {
          this.navColor = event['color'].toString();
          this.system = event['system'].toString();
          document.getElementsByTagName('body')[0].className = this.system;
        }
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
  setCurrentMenu(item: MenuItem) {
    this.appS.setCurrentTopMenu(  item.id); 
  }
}
