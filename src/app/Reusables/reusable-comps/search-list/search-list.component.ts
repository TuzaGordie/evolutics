import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { UtilityService } from 'src/app/Services/utility.service';
import { IKVP } from 'src/app/Shared/models/index.model';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
})
export class SearchListComponent implements OnInit {
  @Input() list: any[]; 
  loading: boolean;
  queryObj: any;
  @Input('queryObj') set _queryObj(v: any) {
    this.queryObj = v;
    this.fetchResults();
  }
  @Input() searchFunction: (queryOBJ) => Promise<any[]>;
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public uS: UtilityService
  ) {}

  async ngOnInit(): Promise<void> {
    if (!this.loading) this.fetchResults();
  }
  async fetchResults() {
    this.loading = true;
    try {
      this.queryObj = this.queryObj || this.route.queryParams;
      this.list = await this.searchFunction(this.queryObj);
    } catch (error) {
      this.uS.info(error, 0);
    }
    this.loading = false;
  }
}
 