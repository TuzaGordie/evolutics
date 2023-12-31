import { Component, OnInit } from '@angular/core';
import { AppService } from '../Services/app.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(public appS: AppService) {}

  ngOnInit(): void {
    this.appS.setDefaultClass();
  }
}
