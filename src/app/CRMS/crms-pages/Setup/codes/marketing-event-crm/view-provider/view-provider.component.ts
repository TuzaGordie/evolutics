import { SetupService } from './../../extras/setup.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-view-provider',
  templateUrl: './view-provider.component.html',
  styleUrls: ['./view-provider.component.scss']
})
export class ViewProviderComponent implements OnInit {
  loading: boolean;
  query: any;
  providerList:any
  constructor(
    public router: Router,
    private uS: UtilityService,
    private setS: SetupService,
    public route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.query = this.route.snapshot.queryParams;
    if (this.query) {
      this.loading = true;
      this.setS.search(this.query).subscribe(
        (r: any) => {
          this.providerList = r?.page?.content;
          console.log("RESULT FROM SERVICE"+JSON.stringify(r))
          this.loading = false;
        },
        (e) => {
          this.loading = false;
        }
      );
    }
  }

}
