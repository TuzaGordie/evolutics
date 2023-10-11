import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { configForms } from 'src/app/Shared/models/form.class';
import { MenuItem } from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import {
  ESearchType,
  ISearchResponse,
} from '../../search-extras/search.interface';
import { SearchService } from '../../search-extras/search.service';
import PS from 'perfect-scrollbar';

@Component({
  selector: 'app-navbar-search',
  templateUrl: './navbar-search.component.html',
  styleUrls: ['./navbar-search.component.scss'],
})
export class NavbarSearchComponent implements OnInit {
  // showSearch = environment.production ? false : true;
  showSearch =false;
  searching = false;
  query = configForms.default();
  mainResults: MenuItem[];
  helpResults: MenuItem[];
  resultLength: number;
  results: ISearchResponse[];
  resultLengthMap = {
    '=1': 'result',
    other: 'results',
  };
  @ViewChild('searchView') searchViewRef: ElementRef<HTMLDivElement>;
  @ViewChild('resultList') resultListRef: ElementRef<HTMLDivElement>;
  ps: PS;
  helpLink = environment.helpLink;
  constructor(public sS: SearchService) {}

  ngOnInit(): void {
    this.query.valueChanges
      .pipe(
        map(async (r) => {
          this.searching = true;
          return this.sS.search(r);
        })
      )
      .subscribe(async (res) => {
        this.searching = false;
        const r = await res;
        this.results = r?.filter((x) => x.menuItems?.length);
        // console.log(r);
        this.resultLength = r?.reduce(
          (total, x) => total + (x.menuItems?.length || 0),
          0
        );
        setTimeout(() => {
          this.ps.update();
        }, 10);
        // console.log(this.ps);
      });
  }
  ngAfterViewInit(): void {
    // if (!environment.production) this.query.patchValue('ag');
    this.ps = new PS(this.resultListRef.nativeElement,{suppressScrollX:true});
  }
  ngOnDestroy(): void {
    this.ps.destroy();
    this.ps = null;
  }
  get queryValue() {
    return this.query.value?.trim();
  }
  openLink() {
    // this.showSearch = false;
  }
  toggleSearch() {
    this.showSearch = !this.showSearch;
    setTimeout(() => {
      this.ps.update();
    }, 600);
  }
  closeSearch() {
    this.showSearch = false;
  }
}
