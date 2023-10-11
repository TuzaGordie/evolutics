import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AppService } from 'src/app/Services/app.service';
import {
  faArrowAltCircleLeft,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-layout',
  templateUrl: './form-layout.component.html',
  styleUrls: ['./form-layout.component.scss'],
})
export class FormLayoutComponent implements OnInit {
  faArrowAltCircleLeft = faArrowAltCircleLeft;
  faHome = faHome;
  @Input() title: string = '';
  constructor(
    public appS: AppService,
    private location: Location,
    public router: Router
  ) {}

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }
  goHome() {
    this.router.navigateByUrl(this.appS.getCurrentSystemMetadata.appRoute.pub);
  }
}
