import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent implements OnInit {
  config: { status: string; message: string };

  constructor(public route: ActivatedRoute,public uS: UtilityService,) {}

  ngOnInit(): void {
    this.config = this.route.snapshot.data.config;
  }
  back(){
    this.uS.back()
  }
}
