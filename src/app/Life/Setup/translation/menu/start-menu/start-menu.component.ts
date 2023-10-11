import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-menu',
  templateUrl: './start-menu.component.html',
  styleUrls: ['./start-menu.component.scss']
})
export class StartTranslationsMenuComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
