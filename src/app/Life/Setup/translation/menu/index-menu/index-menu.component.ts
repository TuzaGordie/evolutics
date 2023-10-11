import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-menu',
  templateUrl: './index-menu.component.html',
  styleUrls: ['./index-menu.component.scss']
})
export class IndexTranslationsMenuComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
